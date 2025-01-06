import prisma from "@/lib/prisma";
import { PDFDocument } from "pdf-lib";

export async function POST(req) {
  try {
    const { email, fileContent, fileName } = await req.json();

    if (!email || !fileContent) {
      return new Response(
        JSON.stringify({ error: "Email and file are required" }),
        {
          status: 400,
        }
      );
    }

    const team = await prisma.Team.findUnique({
      where: { email },
      select: {
        projectType: true,
        teamName: true,
        id: true,
      },
    });

    if (!team) {
      return new Response(JSON.stringify({ error: "Team not found" }), {
        status: 404,
      });
    }

    const fileBuffer = Buffer.from(fileContent, "base64");
    const compressedPdf = await compressPdf(fileBuffer);

    const submission = await prisma.submission.update({
      where: { teamId: team.id },
      data: {
        round2_pdf: compressedPdf,
      },
    });

    return new Response(
      JSON.stringify({
        message: "Round 2 submission successful",
        projectType: team.projectType,
        teamName: team.teamName,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing submission:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
}

/**
 * @param {Uint8Array} pdfBytes - The original PDF as Uint8Array
 * @returns {Promise<Buffer>} - Compressed PDF as Buffer
 */
async function compressPdf(pdfBytes) {
  try {
    const originalPdf = await PDFDocument.load(pdfBytes);
    const compressedPdf = await PDFDocument.create();

    if (originalPdf.getTitle()) {
      compressedPdf.setTitle(originalPdf.getTitle());
    }
    compressedPdf.setAuthor("Submission System");

    for (let i = 0; i < originalPdf.getPageCount(); i++) {
      const [copiedPage] = await compressedPdf.copyPages(originalPdf, [i]);

      compressedPdf.addPage(copiedPage);
    }

    const compressedPdfBytes = await compressedPdf.save({
      useObjectStreams: true,
      updateFieldAppearances: false,
      compress: true,
    });

    return Buffer.from(compressedPdfBytes);
  } catch (error) {
    console.error("Error compressing PDF:", error);

    if (error instanceof Error) {
      console.error("Error name:", error.name);
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    }

    throw new Error(`Failed to compress PDF: ${error.message}`);
  }
}
