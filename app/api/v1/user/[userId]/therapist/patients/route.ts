import dbConnect from "@/lib/dbConnect";
import { PatientModel } from "@/models/patient";
import { TherapistModel } from "@/models/therapist";
import UserModel from "@/models/user";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export interface IParams {
  userId: string;
}

// ----------------------------- POST ----------------------------- //
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<IParams> }
) {
  dbConnect();
  try {
    const { userId } = await params;
    const { patientId } = await request.json();

    if (!mongoose.Types.ObjectId.isValid(patientId)) {
      return NextResponse.json({
        message: "Please provide a valid patient ID format",
        status: 400,
        success: false,
      });
    }

    const therapist = await TherapistModel.findOne({ user: userId });
    const user = await UserModel.findById(patientId);

    if (!user) {
      return NextResponse.json({
        message: "No user found with this ID",
        status: 404,
        success: false,
      });
    }

    // Prevent duplicate push
    if (!therapist.patients.includes(patientId)) {
      therapist.patients.push(patientId);
      await therapist.save();
    }

    return NextResponse.json({
      message: "Role Updated Successfully",
      status: 200,
      success: true,
    });
  } catch (error) {
    console.error("Patient creation error:", error);
    return NextResponse.json({
      error: "Internal Server Error",
      status: 500,
      success: false,
    });
  }
}

// ----------------------------- GET ----------------------------- //
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<IParams> }
) {
  dbConnect();
  try {
    const { userId: therapistId } = await params;

    if (!mongoose.Types.ObjectId.isValid(therapistId)) {
      return NextResponse.json({
        message: "Please provide a valid therapist ID format",
        status: 400,
        success: false,
      });
    }

    const therapist = await TherapistModel.findOne({
      user: therapistId,
    }).populate("patients");

    if (!therapist) {
      return NextResponse.json({
        message: "Therapist not found",
        status: 404,
        success: false,
      });
    }

    // Merge user info from `therapist.patients` and injury/treatmentPlan from `PatientModel`
    const fullPatients = await Promise.all(
      therapist.patients.map(async (user: any) => {
        const extraInfo = await PatientModel.findOne({ user: user._id });

        return {
          _id: user._id,
          name: user.name,
          email: user.email,
          image: user.image,
          injury: extraInfo?.injury || null,
          treatmentPlan: extraInfo?.treatmentPlan || null,
        };
      })
    );

    return NextResponse.json({
      patients: fullPatients,
      message: "Patients Information fetched successfully",
      status: 200,
      success: true,
    });
  } catch (error) {
    console.log("Fetch patients error:", error);
    return NextResponse.json({
      error: "Internal Server Error",
      status: 500,
      success: false,
    });
  }
}
