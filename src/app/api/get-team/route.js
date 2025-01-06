import prisma from "@/lib/prisma";

export async function POST(req) {
    const { email } = await req.json();

    if (!email) {
        return new Response(JSON.stringify({ error: "Email is required" }), {
            status: 400,
        });
    }

    try {
        const team = await prisma.Team.findUnique({
            where: { email },
            select: {
                teamName: true,
                collegeName: true,
                district: true,
                email: true,
                mentorName: true,
                mentorEmail: true,
                mentorPhone: true,
                teamMembers: {
                    select: {
                        name: true,
                        rollNo: true,
                        phone: true,
                        email: true,
                    },
                },
            },
        });

        if (!team) {
            return new Response(JSON.stringify({ error: "Email not found" }), {
                status: 404,
            });
        }

        const modifiedTeam = {
            ...team,
            mentorName: team.mentorName || null,
            mentorEmail: team.mentorEmail || null,
            mentorPhone: team.mentorPhone || null
        };

        return new Response(JSON.stringify({
            message: "Team and team member details retrieved successfully",
            team: modifiedTeam,
        }), {
            status: 200,
        });
    } catch (error) {
        console.error("Error retrieving team and member details:", error);
        return new Response(JSON.stringify({ error: "An error occurred" }), {
            status: 500,
        });
    }
}