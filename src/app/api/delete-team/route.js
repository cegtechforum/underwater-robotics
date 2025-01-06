import prisma from "@/lib/prisma";

export async function DELETE(req) {
  try {
    const { email } = await req.json();

    if (!email) {
      return new Response(JSON.stringify({ error: "Email is required" }), {
        status: 400,
      });
    }

    const team = await prisma.Team.findUnique({
      where: { email },
    });

    if (!team) {
      return new Response(JSON.stringify({ error: "Team not found" }), {
        status: 404,
      });
    }

    await prisma.Team.delete({
      where: { email },
    });

    return new Response(
      JSON.stringify({ message: "Team deleted successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting team:", error);
    return new Response(JSON.stringify({ error: "Failed to delete team" }), {
      status: 500,
    });
  }
}
