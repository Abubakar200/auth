import { connect } from "@/dbConfig/db";
import { NextRequest, NextResponse } from "next/server";

connect()

export async function GET(req: NextRequest){
    try {
        const response = NextResponse.json({
            message: "Logout successfully",
            success: true
        })

        response.cookies.set("token", "", {
            httpOnly: true,
            expires: new Date(0)
        })

        return response
    } catch (error) {
        console.log("[LOGOUT]", error);
    return new NextResponse("Internal error", { status: 500 });
    }
}