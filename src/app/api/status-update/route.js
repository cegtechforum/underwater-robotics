import prisma from "@/lib/prisma";

export async function POST(req) {
  try {
    const { email, status } = await req.json();

    if (!email || !status) {
      return new Response(
        JSON.stringify({ error: "Email and status are required" }),
        { status: 400 }
      );
    }

    if (!["PENDING", "APPROVED", "REJECTED"].includes(status)) {
      return new Response(JSON.stringify({ error: "Invalid status value" }), {
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

    const updatedSubmission = await prisma.submission.update({
      where: { teamId: team.id },
      data: { status },
    });

    return new Response(
      JSON.stringify({
        message: "Status updated successfully",
        submission: updatedSubmission,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating status:", error);
    return new Response(JSON.stringify({ error: "Failed to update status" }), {
      status: 500,
    });
  }
}
