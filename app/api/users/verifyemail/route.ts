import { connect } from "@/dbConfig/db";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel.js";

connect();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { token } = body;

    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return new NextResponse("Invalid Token", { status: 400 });
    }

    (user.isVerified = true),
      (user.verifyToken = undefined),
      (user.verifyTokenExpiry = undefined);

    await user.save();

    return NextResponse.json({
      message: "Email verified successfully",
      success: true,
    });
    
  } catch (error) {
    console.log("[VERIFYEMAIL]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
