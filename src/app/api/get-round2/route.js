import prisma from "@/lib/prisma";

export async function GET() {
    try {
        const teams = await prisma.Team.findMany({
            where: {
                submission: {
                  status: {
                    in: ["PENDING", "APPROVED"],
                  },
                },
              },
            select: {
                teamName: true,
                collegeName: true,
                district: true,
                email: true,
                mentorName: true,
                mentorEmail: true,
                mentorPhone: true,
                projectType: true,
                teamMembers: {
                    select: {
                        name: true,
                        rollNo: true,
                        email: true,
                        phone: true,
                    },
                },
                submission: {
                    select: {
                        status: true,
                        round1_pdf: true,
                        round2_pdf: true,
                    },
                },
            },
        });

        const modifiedTeams = teams.map((team) => ({
            ...team,
            mentorName: team.mentorName || null,
            mentorEmail: team.mentorEmail || null,
            mentorPhone: team.mentorPhone || null,
            submission: team.submission ? {
                status: team.submission.status,
                round1: team.submission.round1_pdf ? true : null,
                round2: team.submission.round2_pdf ? true : null,
            } : null,
        }));

        return new Response(
            JSON.stringify({
                message: "Teams fetched successfully",
                teams: modifiedTeams,
            }),
            {
                status: 200,
            }
        );
    } catch (error) {
        console.error("Error fetching teams:", error);
        return new Response(
            JSON.stringify({ error: "An error occurred while fetching teams" }),
            { status: 500 }
        );
    }
}