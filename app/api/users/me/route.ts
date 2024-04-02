import { connect } from "@/dbConfig/db";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel.js";
import { getData } from "@/helpers/getData";

connect();

export async function POST(req: NextRequest) {
  try {
    const userId = await getData(req);
  
    const user = await User.findOne({
      _id: userId,
    }).select("-password");
    if (!user) {
      return new NextResponse("Id not found", { status: 400 });
    }
    return NextResponse.json({
      message: "User found",
      data: user
    })
  } catch (error) {
    console.log("[GETDATA]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
