import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { email, currentPassword, newPassword } = await req.json();

    if (!email || !currentPassword || !newPassword) {
      return new Response(
        JSON.stringify({ error: "All fields are required" }),
        {
          status: 400,
        }
      );
    }

    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
    if (!passwordRegex.test(newPassword)) {
      return new Response(
        JSON.stringify({
          error:
            "Password must include a capital letter, number, special character, and be at least 8 characters long.",
        }),
        { status: 400 }
      );
    }

    const user = await prisma.Team.findUnique({ where: { email } });
    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
      });
    }

    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password
    );
    if (!isPasswordValid) {
      return new Response(
        JSON.stringify({ error: "Current password is incorrect" }),
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.Team.update({
      where: { email },
      data: { password: hashedPassword },
    });

    return new Response(
      JSON.stringify({ message: "Password changed successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error changing password:", error);
    return new Response(
      JSON.stringify({ error: "Failed to change password" }),
      {
        status: 500,
      }
    );
  }
}
