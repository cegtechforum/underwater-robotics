import nodemailer from "nodemailer";
import crypto from "crypto";
import prisma from "@/lib/prisma";

export async function POST(req) {
  const { email } = await req.json();

  if (!email) {
    return new Response(JSON.stringify({ error: "Email is required" }), {
      status: 400,
    });
  }

  try {
    const user = await prisma.Team.findUnique({
      where: { email },
    });

    if (!user) {
      return new Response(JSON.stringify({ error: "Email not found" }), {
        status: 404,
      });
    }

    const otp = crypto.randomInt(100000, 999999).toString();
    const now = new Date();
    const expiresAt = new Date(now.getTime() + 5 * 60000);

    await prisma.OTP.upsert({
      where: { email },
      update: { otp, expiresAt },
      create: { email, otp, expiresAt },
    });

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const htmlEmail = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Underwater Robotics Verification</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&display=swap" rel="stylesheet">
  <style>
    body, html {
      margin: 0;
      padding: 0;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      line-height: 1.6;
      background-color: #f4f7f6;
    }
    .email-container {
      max-width: 600px;
      margin: 0 auto;
      background: linear-gradient(135deg, #ffffff 0%, #f0f4f8 100%);
      border-radius: 16px;
      box-shadow: 
        0 15px 35px rgba(0, 0, 0, 0.05),
        0 5px 15px rgba(0, 0, 0, 0.03);
      overflow: hidden;
    }
    .email-header {
      background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
      color: white;
      text-align: center;
      padding: 30px 20px;
      position: relative;
      overflow: hidden;
    }
    .email-header::before {
      content: '';
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: repeating-linear-gradient(
        45deg,
        rgba(255,255,255,0.05) 0,
        rgba(255,255,255,0.05) 10px,
        transparent 10px,
        transparent 20px
      );
      transform: rotate(-45deg);
    }
    .logo {
      font-weight: 600;
      font-size: 24px;
      margin-bottom: 10px;
      letter-spacing: 1px;
    }
    .otp-section {
      text-align: center;
      padding: 30px 20px;
      background: white;
      margin: 20px;
      border-radius: 12px;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
    }
    .otp-code {
      font-size: 40px;
      font-weight: 600;
      letter-spacing: 12px;
      color: #2c3e50;
      background-color: #f0f4f8;
      padding: 20px;
      border-radius: 10px;
      display: inline-block;
      margin: 20px 0;
      border: 2px dashed #3498db;
    }
    .details {
      color: #7f8c8d;
      font-size: 14px;
      margin-top: 20px;
      text-align: center;
    }
    .footer {
      background-color: #f1f4f6;
      padding: 15px;
      text-align: center;
      font-size: 12px;
      color: #95a5a6;
      border-top: 1px solid #ecf0f1;
    }
    @media only screen and (max-width: 600px) {
      .otp-code {
        font-size: 28px;
        letter-spacing: 8px;
      }
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="email-header">
      <div class="logo">Underwater Robotics</div>
      <h1 style="margin: 0; font-size: 22px; font-weight: 300;">Authentication Verification</h1>
    </div>
    
    <div class="otp-section">
      <h2 style="color: #2c3e50; margin-bottom: 20px;">Verify Your Identity</h2>
      <p>To complete your authentication, use the following One-Time Password:</p>
      
      <div class="otp-code">
        ${otp}
      </div>
      
      <div class="details">
        <p>🕒 This code will expire in 5 minutes.</p>
        <p>For your security, do not share this code with anyone</p>
      </div>
    </div>
    
    <div class="footer">
      <p>© ${new Date().getFullYear()} CEG Tech Forum. All rights reserved.</p>
      <p>If you did not request this verification, please contact our support team immediately at techteam@cegtechforum.in</p>
    <p style="color: #666; font-style: italic;">This is an automated message. Please do not reply to this email as it is sent from an unmonitored address.</p>
</div>
  </div>
</body>
</html>
    `;
    await transporter.sendMail({
      from: `Underwater Robotics <${process.env.SMTP_USER}>`,
      to: email,
      subject: "🔒 Your One-Time Password for Underwater Robotics",
      html: htmlEmail,
    });

    return new Response(JSON.stringify({ message: "OTP sent successfully" }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error sending OTP:", error);
    return new Response(JSON.stringify({ error: "Failed to send OTP" }), {
      status: 500,
    });
  }
}
