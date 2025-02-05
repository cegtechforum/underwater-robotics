import prisma from "@/lib/prisma";

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const skip = parseInt(url.searchParams.get('skip') || '0');
    const take = 50;

    const totalCount = await prisma.Team.count();

    const teams = await prisma.Team.findMany({
      skip,
      take,
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
    //   orderBy: {
    //     teamName: 'asc'
    //   }
    });

    const modifiedTeams = teams.map((team) => ({
      ...team,
      mentorName: team.mentorName || null,
      mentorEmail: team.mentorEmail || null,
      mentorPhone: team.mentorPhone || null,
      submission: team.submission || null,
    }));

    return new Response(
      JSON.stringify({
        message: "Teams fetched successfully",
        teams: modifiedTeams,
        hasMore: skip + take < totalCount,
        totalCount
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=30'
        }
      }
    );
  } catch (error) {
    console.error("Error fetching teams:", error);
    return new Response(
      JSON.stringify({ 
        error: "An error occurred while fetching teams",
        details: process.env.NODE_ENV === 'development' ? error.message : undefined 
      }),
      { status: 500 }
    );
  }
}