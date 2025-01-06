import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { z } from "zod";

const TeamRegistrationSchema = z.object({
  teamName: z.string().min(2, "Team name must be at least 2 characters"),
  collegeName: z.string().min(2, "College name must be at least 2 characters"),
  district: z.string().min(2, "District must be at least 2 characters"),
  email: z.string().email("Invalid team member email format"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])/,
      "Password must include a capital letter, number, and special character"
    ),
  projectType: z.enum(["PROJECT_PROPOSAL", "SIMULATION", "HARDWARE_DEMO"]),
  teamMembers: z
    .array(
      z.object({
        name: z.string().min(2, "Member name must be at least 2 characters"),
        rollNo: z.string().min(2, "Roll number is required"),
        phone: z
          .string()
          .min(6, "Phone number must be at least 6 characters")
          .max(20, "Phone number must not exceed 20 characters"),
        email: z.string().email("Invalid email format"),
      })
    )
    .min(2, "At least 2 team members are required")
    .max(4, "A maximum of 4 team members is allowed"),
  mentorName: z.string().optional(),
  mentorEmail: z.string().optional(),
  mentorPhone: z.string().optional(),
});

export async function POST(request) {
  try {
    const data = await request.json();
    if (!data) {
      return NextResponse.json(
        { message: "Request body is null or undefined", status: "error" },
        { status: 400 }
      );
    }

    const validatedData = TeamRegistrationSchema.parse(data);

    const existingTeam = await prisma.team.findUnique({
      where: { email: validatedData.email },
    });

    if (existingTeam) {
      return NextResponse.json(
        { message: "A team with this email already exists", status: "error" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(validatedData.password, 10);

    const createdTeam = await prisma.$transaction(async (tx) => {
      return await tx.team.create({
        data: {
          teamName: validatedData.teamName,
          collegeName: validatedData.collegeName,
          district: validatedData.district,
          email: validatedData.email,
          password: hashedPassword,
          mentorName: validatedData.mentorName,
          mentorEmail: validatedData.mentorEmail,
          mentorPhone: validatedData.mentorPhone,
          projectType: validatedData.projectType,
          teamMembers: {
            create: validatedData.teamMembers,
          },
        },
        include: { teamMembers: true },
      });
    });

    return NextResponse.json(
      {
        message: "Team registered successfully",
        status: "success",
        teamId: createdTeam.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration Error:", error);

    if (error instanceof z.ZodError) {
      const errorsToReturn = error.errors.map((err) => {
        if (err.path[0] === 'teamMembers') {
          const memberIndex = err.path[1];
          const memberField = err.path[err.path.length - 1];
          
          return {
            field: `email-${memberIndex}`,
            message: err.message
          };
        }
        
        return {
          field: err.path[err.path.length - 1],
          message: err.message
        };
      });

      return NextResponse.json(
        {
          message: "Validation error occurred",
          status: "error",
          errors: errorsToReturn,
        },
        { status: 400 }
      );
    }

    if (error.code === "P2002") {
      return NextResponse.json(
        {
          message: "A team member with this email already exists",
          status: "error",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Internal Server Error", status: "error" },
      { status: 500 }
    );
  }
}