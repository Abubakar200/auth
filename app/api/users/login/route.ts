import { connect } from "@/dbConfig/db";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { email, password } = body;
    const user = await User.findOne({ email });

    if (!user) {
      return new NextResponse("User not found, Unauthorized", { status: 401 });
    }

    const validPassword = await bcryptjs.compare(password, user.password);

    if (!validPassword) {
      return new NextResponse("Invalid Credientials", { status: 401 });
    }

    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    const token = await jwt.sign(tokenData, process.env.SECRET_KEY!, {
      expiresIn: "1d",
    });

    const response = NextResponse.json({
      message: "Login Successfully",
      success: true,
    });
    response.cookies.set("token", token, { httpOnly: true});

    return response
  } catch (error) {
    console.log("[LOGIN]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
