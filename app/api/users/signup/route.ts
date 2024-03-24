import { connect } from "@/dbConfig/db";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel.js";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST(req: NextRequest) {
  try {
    const body =await req.json();
    const { username, email, password } = body;

    const user = await User.findOne({ email });

    if (user) {
      return new NextResponse("Email already in use", { status: 400 });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save()
    // console.log(savedUser);
    
    await  sendEmail({
        email,
        emailType: 'VERIFY',
        userId: savedUser._id
    })
    return NextResponse.json({
        message: "User created successfully! Please check your email to verify.",
        success: true,
        savedUser
    })

  } catch (error) {
    console.log("[SIGNUP]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
