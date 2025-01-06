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
                projectType: true,
                teamName: true,
                id: true,
                submission: true
            },
        });
        
        if (!team) {
            return new Response(JSON.stringify({ error: "Email not found" }), {
                status: 404,
            });
        }

        return new Response(JSON.stringify({
            message: "Project type and team name retrieved", 
            projectType: team.projectType,
            teamName: team.teamName,
            submission: team.submission || null,
        }), {
            status: 200,
        });
    } catch (error) {
        console.log("Error retrieving project type and team name:", error);
        return new Response(JSON.stringify({ error: "An error occurred" }), {
            status: 500,
        });
    }
}
