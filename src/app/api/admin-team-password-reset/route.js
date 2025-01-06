import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { email, newPassword } = await req.json();

    if (!email || !newPassword) {
      return new Response(
        JSON.stringify({ error: "All fields are required" }),
        { status: 400 }
      );
    }

    if (newPassword.length < 8) {
      return new Response(
        JSON.stringify({ error: "Password must be at least 8 characters long" }),
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
      { status: 500 }
    );
  }
}
