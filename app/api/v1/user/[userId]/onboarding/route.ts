import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/user";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";
interface IParams {
  userId: string;
}
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<IParams> }
) {
  dbConnect();
  try {
    const { role } = await request.json();
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
    await user.save();
    return NextResponse.json({
      message: "Role Updated Succesfully",
      status: 201,
      success: true,
    });
  } catch (error) {
    return NextResponse.json({
      error: "Internal Server Error",
      status: 500,
      success: false,
    });
  }
}
