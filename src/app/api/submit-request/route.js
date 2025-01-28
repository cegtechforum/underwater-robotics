import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { email, message } = await req.json();

    if (!email) {
      return new Response(
        JSON.stringify({ error: "User is not authenticated" }),
        { status: 401 }
      );
    }

    if (!message || message.trim().length === 0) {
      return new Response(
        JSON.stringify({ error: "Message content is required" }),
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const emailTemplate = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Support Request Notification</title>
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
          .logo {
            font-weight: 600;
            font-size: 24px;
            margin-bottom: 10px;
            letter-spacing: 1px;
          }
          .support-section {
            padding: 30px 20px;
            background: white;
            margin: 20px;
            border-radius: 12px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
          }
          .support-details {
            background-color: #f0f4f8;
            border-radius: 10px;
            padding: 20px;
            margin: 20px 0;
            border-left: 4px solid #3498db;
          }
          .detail-row {
            margin-bottom: 10px;
            color: #2c3e50;
          }
          .detail-label {
            font-weight: 600;
            color: #3498db;
            margin-right: 10px;
          }
          .message-content {
            background-color: #ffffff;
            border: 1px solid #ecf0f1;
            border-radius: 8px;
            padding: 15px;
            margin-top: 15px;
            color: #34495e;
            font-style: italic;
          }
          .footer {
            background-color: #f1f4f6;
            padding: 15px;
            text-align: center;
            font-size: 12px;
            color: #95a5a6;
            border-top: 1px solid #ecf0f1;
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="email-header">
            <div class="logo">Support Center</div>
            <h1 style="margin: 0; font-size: 22px; font-weight: 300;">New Support Request</h1>
          </div>
          
          <div class="support-section">
            <h2 style="color: #2c3e50; margin-bottom: 20px;">Incoming Support Request</h2>
            
            <div class="support-details">
              <div class="detail-row">
                <span class="detail-label">From:</span>
                <span>${email}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Received:</span>
                <span>${new Date().toLocaleString()}</span>
              </div>
            </div>
            
            <div class="message-content">
              ${message}
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    const mailOptions = {
      from: email,
      to: "underwaterrobotics@cegtechforum.in",
      cc: "techteam@cegtechforum.in",
      replyTo: email,
      subject: "Support Request",
      html: emailTemplate,
    };

    await transporter.sendMail(mailOptions);

    return new Response(
      JSON.stringify({ message: "Support request submitted successfully!" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending support request:", error);
    return new Response(
      JSON.stringify({ error: "Failed to submit support request" }),
      { status: 500 }
    );
  }
}
