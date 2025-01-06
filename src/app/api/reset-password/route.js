import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req) {
  const { email, otp, newPassword } = await req.json();

  if (!email || !otp || !newPassword) {
    return new Response(JSON.stringify({ error: "All fields are required" }), {
      status: 400,
    });
  }

  const passwordRegex =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
  if (!passwordRegex.test(newPassword)) {
    return new Response(
      JSON.stringify({
        message:
          "Password validation error. Fullfil the conditions given below!",
      }),
      { status: 400 }
    );
  }

  try {
    const otpRecord = await prisma.OTP.findUnique({ where: { email } });

    if (
      !otpRecord ||
      otpRecord.otp !== otp ||
      otpRecord.expiresAt < new Date()
    ) {
      return new Response(JSON.stringify({ error: "Invalid or expired OTP" }), {
        status: 400,
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.Team.update({
      where: { email },
      data: { password: hashedPassword },
    });

    await prisma.OTP.delete({ where: { email } });

    return new Response(
      JSON.stringify({ message: "Password reset successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error resetting password:", error);
    return new Response(JSON.stringify({ error: "Failed to reset password" }), {
      status: 500,
    });
  }
}
