import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  dbConnect();
  try {
    // Extract `name` from query params
    const { searchParams } = new URL(request.url);
    const name = searchParams.get("name");

    if (!name) {
      return NextResponse.json({
        error: "Name missing",
        status: 400,
        success: false,
      });
    }

    const users = await UserModel.find({
      name: { $regex: name, $options: "i" },
      role: "patient",
    })
      .limit(10) // return max 10 users
      .sort({ createdAt: -1 }); // newest first

    if (!users) {
      return NextResponse.json({
        message: "No user of specified name found",
        status: 400,
        success: false,
      });
    }

    return NextResponse.json({
      message: "Users Found",
      status: 200,
      success: true,
      users,
    });
  } catch (error) {
    console.error("Error getting User", error);
    return NextResponse.json({
      error: "Internal Server Error",
      status: 500,
      success: false,
    });
  }
}
