import dbConnect from "@/lib/dbConnect";
import { PatientModel } from "@/models/patient";
import { PlanModel } from "@/models/plan";
import { TherapistModel } from "@/models/therapist";
import UserModel from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
export interface IParams {
  tid: string;
}
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<IParams> }
) {
  dbConnect();
  try {
    const {
      title,
      durationWeeks,
      daysPerWeek,
      weeklySchedule,
      startDate,
      isTemplate,
      assignedTo,
    } = await request.json();
    const { tid } = await params;
    if (!tid) {
      return NextResponse.json({
        error: "Provide Therapist id",
        status: 404,
        success: false,
      });
    }

    const therapist = await TherapistModel.findOne({ user: tid });
    if (!therapist) {
      return NextResponse.json({
        error: "No user found",
        status: 404,
        success: false,
      });
    }

    const newPlan = await PlanModel.create({
      title,
      durationWeeks,
      daysPerWeek,
      weeklySchedule,
      startDate,
      createdBy: tid,
      assignedTo,
      isTemplate,
    });

    return NextResponse.json({
      message: "Plan Created Succesfully",
      status: 201,
      success: true,
      newPlan,
    });
  } catch (err) {
    console.error("Plan creation error:", err);
    return NextResponse.json({
      error: "Internal Server Error",
      status: 500,
      success: false,
    });
  }
}
