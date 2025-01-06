import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { otp } = await req.json();
  const emailck = req.cookies.get("email");
  const email = emailck.value;

  if (!email || !otp) {
    return NextResponse.json(
      { message: "Email and OTP are required" },
      { status: 400 }
    );
  }

  try {
    const otpRecord = await prisma.OTP.findUnique({
      where: { email },
    });

    if (!otpRecord) {
      return NextResponse.json(
        { message: "OTP record not found!" },
        { status: 400 }
      );
    }

    if (otpRecord.otp !== otp) {
      return NextResponse.json({ message: "Invalid OTP!" }, { status: 400 });
    }

    const otpExpirationTime = new Date(otpRecord.expiresAt);
    const currentTime = new Date();

    if (otpExpirationTime < currentTime) {
      return NextResponse.json({ message: "OTP has expired!" }, { status: 400 });
    }

    return NextResponse.json(
      { message: "OTP verified successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return NextResponse.json(
      { error: "Failed to verify OTP" },
      { status: 500 }
    );
  }
}
