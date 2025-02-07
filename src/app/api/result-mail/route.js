import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

const createTransporter = () => {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    pool: true,
    maxConnections: 5,
  });
};

export async function POST(req) {
  let transporter = null;

  try {
    const { emails } = await req.json();

    if (!emails || !Array.isArray(emails) || emails.length === 0) {
      return NextResponse.json(
        { error: "No email addresses provided" },
        { status: 400 }
      );
    }

    transporter = createTransporter();

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
            font-family: 'Segoe UI', Arial, sans-serif;
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
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .email-header {
            background: linear-gradient(135deg, #034694 0%, #1e40af 100%);
            color: #ffffff;
            text-align: center;
            padding: 32px 24px;
        }
        .email-header h1 {
            font-size: 28px;
            margin: 0;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        .email-header p {
            margin: 8px 0 0;
            opacity: 0.9;
            font-size: 16px;
        }
        .email-body {
            padding: 40px 32px;
        }
        .greeting {
            font-size: 18px;
            margin-bottom: 24px;
        }
        .result-box {
            background-color: #f0f7ff;
            border-radius: 8px;
            padding: 24px;
            margin: 24px 0;
            border-left: 4px solid #034694;
        }
        .message-box {
            background-color: #f8fafc;
            border-radius: 8px;
            padding: 20px;
            margin: 16px 0;
            border-left: 4px solid #0284c7;
        }
        .button-container {
            text-align: center;
            margin: 32px 0;
        }
        .view-button {
            display: inline-block;
            background: linear-gradient(135deg, #034694 0%, #1e40af 100%);
            color: #ffffff !important;
            padding: 14px 32px;
            text-decoration: none;
            border-radius: 6px;
            font-weight: bold;
            transition: transform 0.2s;
        }
        .view-button:hover {
            transform: translateY(-2px);
        }
        .next-steps {
            background-color: #f8fafc;
            border-radius: 8px;
            padding: 24px;
            margin: 24px 0;
        }
        .next-steps h2 {
            color: #034694;
            font-size: 20px;
            margin: 0 0 16px;
        }
        .next-steps ul {
            margin: 0;
            padding-left: 24px;
            color: #4a5568;
        }
        .next-steps ul li {
            margin-bottom: 12px;
        }
        .event-section {
            background-color: #ffffff;
            border-radius: 8px;
            padding: 24px;
            margin: 24px 0;
            border: 1px solid #e2e8f0;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }
        .event-section h2 {
            color: #034694;
            font-size: 22px;
            margin: 0 0 16px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            text-align: center;
        }
        .event-content {
            display: grid;
            grid-template-columns: 1fr;
            gap: 24px;
            align-items: center;
            text-align: center;
        }
        .event-logo {
            width: 280px;
            height: auto;
            margin: 24px auto;
            display: block;
        }
        .event-description {
            color: #4a5568;
            margin: 0;
            line-height: 1.6;
            font-size: 16px;
        }
        .event-date {
            font-weight: bold;
            color: #034694;
            margin: 0;
            font-size: 18px;
            padding: 16px 0;
        }
        .event-button {
            display: inline-block;
            background: linear-gradient(135deg, #034694 0%, #1e40af 100%);
            color: #ffffff !important;
            padding: 12px 28px;
            text-decoration: none;
            border-radius: 6px;
            font-weight: bold;
            transition: transform 0.2s;
            width: auto;
            text-align: center;
        }
        .event-button:hover {
            transform: translateY(-2px);
        }
        .contact-info {
            background-color: #f8fafc;
            border-radius: 8px;
            padding: 20px;
            margin: 24px 0;
        }
        .contact-info p {
            margin: 8px 0;
            color: #4a5568;
        }
        .contact-email {
            color: #034694;
            text-decoration: none;
            font-weight: 500;
        }
        .email-footer {
            background-color: #f8fafc;
            text-align: center;
            padding: 24px;
            border-top: 1px solid #e2e8f0;
            color: #666666;
        }
        .email-footer p {
            margin: 8px 0;
            font-size: 14px;
        }

        /* Responsive Styles */
        @media (max-width: 600px) {
            .email-body {
                padding: 24px 16px;
            }
            .event-section {
                padding: 16px;
            }
            .event-content {
                gap: 16px;
            }
            .event-logo {
                width: 220px;
                margin: 16px auto;
            }
            .event-description {
                font-size: 15px;
            }
            .event-date {
                font-size: 16px;
                padding: 12px 0;
            }
            .event-button {
                display: block;
                width: 100%;
                box-sizing: border-box;
                padding: 14px 20px;
            }
            .view-button {
                display: block;
                width: 100%;
                box-sizing: border-box;
                text-align: center;
            }
        }

        @media (min-width: 601px) {
            .event-content {
                grid-template-columns: repeat(2, 1fr);
                text-align: left;
            }
            .event-logo {
                grid-row: span 3;
                justify-self: center;
            }
            .event-description {
                grid-column: 2;
            }
            .event-date {
                grid-column: 2;
            }
            .event-button {
                grid-column: 2;
                justify-self: start;
            }
        }
    </style>
</head>
<body>
    <div class="email-wrapper">
        <div class="email-container">
            <!-- Header -->
            <div class="email-header">
                <h1>Round 1 Results</h1>
                <p>Underwater Robotics 2025</p>
            </div>

            <!-- Body -->
            <div class="email-body">
                <p class="greeting">Dear Team,</p>

                <p>Thank you for your dedication and active participation in Round 1 of the Underwater Robotics Competition. We appreciate the time, effort, and creativity you've invested in this competition.</p>

                <div class="result-box">
                    <h2 style="color: #034694; margin-top: 0;">Round 1 Results Have Been Announced</h2>
                    <p>The results for Round 1 have been finalized and are now available for viewing. Each submission was carefully evaluated.</p>
                </div>

                <div class="message-box">
                    <p><strong>To All Participants:</strong> Your participation has contributed significantly to the success of this competition. The depth of technical knowledge and creativity displayed across all submissions reflects the bright future of underwater robotics. We sincerely appreciate your participation and the quality of your submissions.</p>
                    
                    <p><strong>To Qualified Teams:</strong> We extend our sincere congratulations on your advancement to the next phase of the competition. Your submission demonstrated exceptional technical proficiency, innovative problem-solving approaches, and a clear understanding of underwater robotics principles. We anticipate your continued excellence as you progress to more advanced challenges.</p>
                    
                    <p><strong>To Teams Not Advancing:</strong> We strongly encourage you to maintain your innovative spirit and consider this experience as a stepping stone in your technical journey. Your dedication to underwater robotics is commendable, and we encourage you to continue pursuing your passion in this field. Your dedication to the field is valued, and we look forward to your participation in future technological endeavors.</p>
                </div>

                <div class="button-container">
                    <a href="https://underwaterrobotics.kurukshetraceg.org.in/" class="view-button">
                        View Results
                    </a>
                </div>

                <div class="next-steps">
                    <h2>Important Information</h2>
                    <ul>
                        <li>For selected participants, the Round 2 tab will be opened on the portal for next steps.</li>
                        <li>Stay connected with us for updates on future events and workshops.</li>
                    </ul>
                </div>

                <div class="event-section">
                    <h2>Upcoming Event</h2>
                    <div class="event-content">
                        <img src="https://kurukshetraceg.org.in/klogo1.png" alt="Kurukshetra 2025" class="event-logo">
                        <div class="event-description">
                            <strong>Kurukshetra</strong>, CEG Tech Forum's international techno-management festival, attracts participants nationwide. With the caption "Battle of Brains," it features events, workshops, and lectures, showcasing teamwork, dedication, and a relentless drive for excellence.
                        </div>
                        <div class="event-date">
                            February 20 - 23, 2025
                        </div>
                        <a href="https://kurukshetraceg.org.in/" class="event-button">
                            Visit Website
                        </a>
                    </div>
                </div>

                <div class="contact-info">
                    <h2 style="color: #034694; margin-top: 0;">Contact Information</h2>
                    <p>For event-related inquiries:<br>
                    <a href="mailto:underwaterrobotics@cegtechforum.in" class="contact-email">underwaterrobotics@cegtechforum.in</a></p>
                    
                    <p>For technical support:<br>
                    <a href="mailto:techteam@cegtechforum.in" class="contact-email">techteam@cegtechforum.in</a></p>
                </div>

                <p>Best regards,<br>CEG Tech Forum</p>
            </div>

            <!-- Footer -->
            <div class="email-footer">
                <p>© 2025 CEG Tech Forum</p>
                <p>This is an automated message. Please do not reply to this email.</p>
            </div>
        </div>
    </div>
</body>
</html>
`;

    const results = await Promise.all(
      emails.map(async (email) => {
        try {
          const mailOptions = {
            from: `Underwater Robotics <${process.env.SMTP_USER}>`,
            to: email,
            subject: "Announcement: Round 1 Results",
            html: htmlTemplate,
          };

          await transporter.sendMail(mailOptions);
          return { email, status: "success" };
        } catch (error) {
          console.error(`Failed to send to ${email}:`, error);
          return {
            email,
            status: "failed",
            error: error.message,
          };
        }
      })
    );

    const successCount = results.filter((r) => r.status === "success").length;
    const failedCount = results.filter((r) => r.status === "failed").length;

    return NextResponse.json({
      message: `Emails sent: ${successCount} successful, ${failedCount} failed`,
      results,
    });
  } catch (error) {
    console.error("Email sending error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  } finally {
    if (transporter) {
      try {
        await transporter.close();
      } catch (error) {
        console.error("Error closing transporter:", error);
      }
    }
  }
}
