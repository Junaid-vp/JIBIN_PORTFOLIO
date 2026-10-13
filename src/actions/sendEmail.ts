"use server";

import { Resend } from "resend";
import { portfolioData } from "@/data/portfolioData";

const resend = new Resend(process.env.RESEND_API_KEY);

function generateEmailHtml({
  name,
  email,
  message,
  projectType,
  budget,
  timeline,
  fileName,
}: {
  name: string;
  email: string;
  message: string;
  projectType: string;
  budget: string;
  timeline: string;
  fileName?: string;
}) {
  const formattedMessage = message
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\n/g, "<br/>");

  const timestamp = new Date().toLocaleString("en-US", {
    timeZone: "Asia/Kolkata",
    dateStyle: "medium",
    timeStyle: "short",
  });

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Project Inquiry</title>
</head>
<body style="margin: 0; padding: 0; background-color: #F4EFEB; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1E2022; -webkit-font-smoothing: antialiased;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #F4EFEB; padding: 40px 15px;">
    <tr>
      <td align="center">
        <!-- Main Container -->
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #FFFFFF; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.06); border: 1px solid #E5DFD5;">
          
          <!-- Top Accent Gold Line -->
          <tr>
            <td style="height: 5px; background: linear-gradient(90deg, #A67E50, #C59B63, #E1C195);"></td>
          </tr>

          <!-- Header -->
          <tr>
            <td style="background-color: #0E1410; padding: 32px 36px; text-align: left;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <div style="font-family: Georgia, serif; font-size: 26px; font-weight: bold; color: #FFFFFF; letter-spacing: 2px; margin-bottom: 4px;">
                      JJ <span style="font-size: 14px; font-family: -apple-system, sans-serif; color: #C59B63; font-weight: 500; letter-spacing: 1.5px; text-transform: uppercase; margin-left: 8px;">Jibin Johnson</span>
                    </div>
                    <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: #8F9A92;">
                      Portfolio Inquiry &bull; BI &amp; Data Analytics
                    </div>
                  </td>
                  <td align="right" valign="middle">
                    <span style="display: inline-block; padding: 5px 12px; background-color: rgba(34, 197, 94, 0.15); border: 1px solid rgba(34, 197, 94, 0.35); border-radius: 20px; font-size: 11px; color: #4ade80; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">
                      New Lead
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Title Banner -->
          <tr>
            <td style="padding: 28px 36px 12px 36px; border-bottom: 1px solid #F0ECE4;">
              <div style="font-size: 12px; text-transform: uppercase; letter-spacing: 1.5px; color: #A67E50; font-weight: 700; margin-bottom: 6px;">
                Incoming Project Request
              </div>
              <h1 style="font-family: Georgia, serif; font-size: 24px; font-weight: normal; color: #111813; margin: 0 0 8px 0; line-height: 1.25;">
                ${name} wants to connect with you.
              </h1>
              <p style="font-size: 14px; color: #64748B; margin: 0; line-height: 1.5;">
                A new inquiry was submitted via the contact form on your portfolio website.
              </p>
            </td>
          </tr>

          <!-- Key Details Grid -->
          <tr>
            <td style="padding: 24px 36px;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #FAF8F5; border-radius: 12px; border: 1px solid #ECE6DB; overflow: hidden;">
                
                <!-- Client Details Row -->
                <tr>
                  <td width="50%" style="padding: 16px 20px; border-bottom: 1px solid #ECE6DB; border-right: 1px solid #ECE6DB;">
                    <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #8C8275; font-weight: 600; margin-bottom: 4px;">
                      Client Name
                    </div>
                    <div style="font-size: 15px; font-weight: 600; color: #121614;">
                      ${name}
                    </div>
                  </td>
                  <td width="50%" style="padding: 16px 20px; border-bottom: 1px solid #ECE6DB;">
                    <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #8C8275; font-weight: 600; margin-bottom: 4px;">
                      Email Address
                    </div>
                    <div style="font-size: 14px; font-weight: 500;">
                      <a href="mailto:${email}" style="color: #A67E50; text-decoration: none;">${email}</a>
                    </div>
                  </td>
                </tr>

                <!-- Project Specs Row -->
                <tr>
                  <td width="50%" style="padding: 16px 20px; border-bottom: 1px solid #ECE6DB; border-right: 1px solid #ECE6DB;">
                    <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #8C8275; font-weight: 600; margin-bottom: 4px;">
                      Project Type
                    </div>
                    <div style="display: inline-block; padding: 4px 10px; background-color: rgba(197, 155, 99, 0.15); border: 1px solid rgba(197, 155, 99, 0.4); border-radius: 6px; font-size: 13px; font-weight: 600; color: #8C6233;">
                      ${projectType}
                    </div>
                  </td>
                  <td width="50%" style="padding: 16px 20px; border-bottom: 1px solid #ECE6DB;">
                    <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #8C8275; font-weight: 600; margin-bottom: 4px;">
                      Budget Range
                    </div>
                    <div style="font-size: 14px; font-weight: 600; color: #121614;">
                      ${budget || "Not specified"}
                    </div>
                  </td>
                </tr>

                <!-- Timeline & Attachment Row -->
                <tr>
                  <td width="50%" style="padding: 16px 20px; border-right: 1px solid #ECE6DB;">
                    <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #8C8275; font-weight: 600; margin-bottom: 4px;">
                      Timeline
                    </div>
                    <div style="font-size: 14px; font-weight: 500; color: #2C3531;">
                      ${timeline || "Not specified"}
                    </div>
                  </td>
                  <td width="50%" style="padding: 16px 20px;">
                    <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #8C8275; font-weight: 600; margin-bottom: 4px;">
                      Attachment
                    </div>
                    <div style="font-size: 13px; font-weight: 500; color: ${fileName ? "#166534" : "#8C8275"};">
                      ${fileName ? `&#128206; ${fileName}` : "None attached"}
                    </div>
                  </td>
                </tr>

              </table>
            </td>
          </tr>

          <!-- Message Box -->
          <tr>
            <td style="padding: 0 36px 28px 36px;">
              <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; color: #8C8275; font-weight: 700; margin-bottom: 8px;">
                Message Content
              </div>
              <div style="background-color: #FAF8F5; border-left: 4px solid #C59B63; border-top: 1px solid #ECE6DB; border-right: 1px solid #ECE6DB; border-bottom: 1px solid #ECE6DB; border-radius: 0 10px 10px 0; padding: 20px; font-size: 14px; line-height: 1.65; color: #2C3531; font-family: -apple-system, sans-serif;">
                ${formattedMessage}
              </div>
            </td>
          </tr>

          <!-- Quick Action Button -->
          <tr>
            <td style="padding: 0 36px 36px 36px;" align="center">
              <a href="mailto:${email}?subject=Re: Project Discussion — ${encodeURIComponent(name)}" style="display: block; width: 100%; box-sizing: border-box; background-color: #C59B63; color: #0E1410; text-align: center; font-weight: 700; font-size: 15px; padding: 14px 24px; border-radius: 10px; text-decoration: none; letter-spacing: 0.5px; box-shadow: 0 4px 12px rgba(197, 155, 99, 0.25);">
                Reply Directly to ${name} &rarr;
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #F8F5EE; padding: 20px 36px; border-top: 1px solid #ECE6DB; text-align: center;">
              <div style="font-size: 12px; color: #78716C; margin-bottom: 4px;">
                Received on ${timestamp} IST &bull; Jibin Johnson Portfolio
              </div>
              <div style="font-size: 11px; color: #A8A29E;">
                This message was securely transmitted through Resend via your website contact form.
              </div>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

export async function sendEmail(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;
  const projectType = (formData.get("projectType") as string) || "Not specified";
  const budget = (formData.get("budget") as string) || "Not specified";
  const timeline = (formData.get("timeline") as string) || "Not specified";
  const file = formData.get("file") as File | null;

  if (!name || !email || !message) {
    return { error: "Please fill in all required fields (Name, Email, and Message)." };
  }

  try {
    const attachments: Array<{ filename: string; content: Buffer }> = [];
    let fileName: string | undefined = undefined;

    if (file && file.size > 0 && typeof file.arrayBuffer === "function") {
      try {
        const arrayBuffer = await file.arrayBuffer();
        fileName = file.name;
        attachments.push({
          filename: file.name,
          content: Buffer.from(arrayBuffer),
        });
      } catch (attachErr) {
        console.warn("Could not process attachment:", attachErr);
      }
    }

    const htmlContent = generateEmailHtml({
      name,
      email,
      message,
      projectType,
      budget,
      timeline,
      fileName,
    });

    const textContent = `New Project Inquiry from ${name}
=======================================
Name: ${name}
Email: ${email}
Project Type: ${projectType}
Budget Range: ${budget}
Timeline: ${timeline}
Attachment: ${fileName || "None"}

Message:
${message}

---------------------------------------
Sent via Jibin Johnson Portfolio Contact Form
`;

    const emailPayload: any = {
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: portfolioData.identity.email,
      subject: `New Project Inquiry from ${name} [${projectType}]`,
      replyTo: email,
      text: textContent,
      html: htmlContent,
    };

    if (attachments.length > 0) {
      emailPayload.attachments = attachments;
    }

    const data = await resend.emails.send(emailPayload);

    if (data.error) {
      console.warn("Resend email warning:", data.error);
      return { error: data.error.message || "Failed to send message. Please contact directly via email." };
    }

    return { success: true };
  } catch (error: any) {
    console.error("sendEmail error:", error);
    return { error: error.message || "An unexpected error occurred while sending your message." };
  }
}
