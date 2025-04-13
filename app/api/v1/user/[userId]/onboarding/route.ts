import dbConnect from "@/lib/dbConnect";
import { PatientModel } from "@/models/patient";
import { TherapistModel } from "@/models/therapist";
import UserModel from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
export interface IParams {
  userId: string;
}
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<IParams> }
) {
  dbConnect();
  try {
    const { role, specialization, licenseNumber, injury } =
      await request.json();
    const { userId } = await params;
    if (!userId) {
      return NextResponse.json({
        error: "No user found",
        status: 404,
        success: false,
      });
    }

    const user = await UserModel.findById(userId);
    if (!user) {
      return NextResponse.json({
        error: "No user found",
        status: 404,
        success: false,
      });
    }

    user.role = role;
    user.isOnboarded = true;
    if (role === "patient") {
      console.log("----------------Patient", injury);
      if (!injury) {
        return NextResponse.json({
          error: "Injury is required",
          status: 400,
          success: false,
        });
      }
      const newPatient = new PatientModel({
        user: userId,
        injury: injury,
        treatmentPlan: "",
      });
      await newPatient.save();
    }

    if (role === "therapist") {
      if (!specialization) {
        return NextResponse.json({
          error: "Specialization is required",
          status: 400,
          success: false,
        });
      }
      if (!licenseNumber) {
        return NextResponse.json({
          error: "licenseNumber is required",
          status: 400,
          success: false,
        });
      }
      const newTherapist = new TherapistModel({
        user: userId,
        specialization: specialization,
        licenseNumber: licenseNumber,
        patients: [],
      });
      await newTherapist.save();
    }

    await user.save();
    return NextResponse.json({
      message: "Role Updated Succesfully",
      status: 201,
      success: true,
    });
  } catch (err) {
    console.error("Patient creation error:", err);
    return NextResponse.json({
      error: "Internal Server Error",
      status: 500,
      success: false,
    });
  }
}
