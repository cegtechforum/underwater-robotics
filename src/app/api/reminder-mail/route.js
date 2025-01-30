import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { emails } = await req.json();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const htmlTemplate = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            color: #333333;
            line-height: 1.6;
        }
        .email-wrapper {
            width: 100%;
            background-color: #f4f4f4;
            padding: 24px 0;
        }
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .email-header {
            background-color: #1a56db;
            color: #ffffff;
            text-align: center;
            padding: 24px;
        }
        .email-header h1 {
            font-size: 24px;
            margin: 0;
        }
        .email-body {
            padding: 32px 24px;
        }
        .email-body p {
            margin: 16px 0;
        }
        .deadline-box {
            background-color: #f8fafc;
            border-left: 4px solid #1a56db;
            padding: 16px;
            margin: 24px 0;
            font-weight: bold;
            color: #1a56db;
        }
        .notes {
            margin: 24px 0;
        }
        .notes h2 {
            color: #1a56db;
            font-size: 18px;
            margin-bottom: 16px;
        }
        .notes ul {
            margin: 0;
            padding-left: 24px;
            color: #4a5568;
        }
        .notes ul li {
            margin-bottom: 8px;
        }
        .help-box {
            background-color: #f8fafc;
            padding: 16px;
            border-radius: 4px;
            margin: 24px 0;
        }
        .help-box h3 {
            color: #1a56db;
            margin: 0 0 8px 0;
            font-size: 16px;
        }
        .email-footer {
            background-color: #f8fafc;
            text-align: center;
            padding: 16px;
            border-top: 1px solid #e2e8f0;
            font-size: 12px;
            color: #666666;
        }
        .email-footer p {
            margin: 0;
            font-style: italic;
        }
    </style>
</head>
<body>
    <div class="email-wrapper">
        <div class="email-container">
            <!-- Header -->
            <div class="email-header">
                <h1>Project Submission Reminder</h1>
            </div>

            <!-- Body -->
            <div class="email-body">
                <p>Dear Team,</p>

                <div class="deadline-box">
                    DEADLINE: February 5th, 2025, 11:59 PM IST
                </div>

                <p>We hope this email finds you well. This is a friendly reminder about your upcoming project submission deadline.</p>
                <p style="color: #666666; font-style: italic;">If you have already submitted your project, please disregard this message.</p>

                <div class="notes">
                    <h2>Important Notes:</h2>
                    <ul>
                        <li>Submissions will not be accepted after the deadline.</li>
                        <li>Ensure all project materials are complete and properly formatted.</li>
                        <li>Double-check all submission requirements.</li>
                        <li>Make sure to test your project thoroughly before submission.</li>
                    </ul>
                </div>

                <div class="help-box">
                    <h3>Need Help?</h3>
                    <p>If you encounter any technical issues or have questions, please reach out to our support team immediately.</p>
                </div>

                <p>Best regards,<br>The Organization Team</p>
            </div>

            <!-- Footer -->
            <div class="email-footer">
                <p>This is an automated message. Please do not reply to this email as it is sent from an unmonitored address.</p>
            </div>
        </div>
    </div>
</body>
</html>
`;

    if (!emails || !Array.isArray(emails) || emails.length === 0) {
      return NextResponse.json(
        { error: "No email addresses provided" },
        { status: 400 }
      );
    }

    const emailPromises = emails.map(async (email) => {
      const mailOptions = {
        from: `Underwater Robotics <${process.env.SMTP_USER}>`,
        to: email,
        subject: "IMPORTANT: Project Submission Deadline Reminder",
        html: htmlTemplate,
      };

      try {
        await transporter.sendMail(mailOptions);
        return { email, status: "success" };
      } catch (error) {
        console.error(`Failed to send email to ${email}:`, error);
        return { 
          email, 
          status: "failed", 
          error: error.message 
        };
      }
    });

    const results = await Promise.all(emailPromises);

    const successCount = results.filter(r => r.status === "success").length;
    const failedCount = results.filter(r => r.status === "failed").length;

    return NextResponse.json({
      message: `Emails sent: ${successCount} successful, ${failedCount} failed`,
      results
    });
  } catch (error) {
    console.error("Email sending error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
