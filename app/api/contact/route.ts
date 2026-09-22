import { NextResponse } from "next/server";
import { ConfidentialClientApplication } from "@azure/msal-node";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type ContactPayload = {
  name?: string;
  company?: string;
  email?: string;
  enq?: string;
  context?: string;
  message?: string;
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

async function getAccessToken() {
  const clientId = process.env.CLIENT_ID;
  const clientSecret = process.env.CLIENT_SECRET;
  const tenantId = process.env.TENANT_ID;

  if (!clientId || !clientSecret || !tenantId) {
    throw new Error("Missing CLIENT_ID, CLIENT_SECRET or TENANT_ID");
  }

  const cca = new ConfidentialClientApplication({
    auth: {
      clientId,
      clientSecret,
      authority: `https://login.microsoftonline.com/${tenantId}`,
    },
  });

  const result = await cca.acquireTokenByClientCredential({
    scopes: ["https://graph.microsoft.com/.default"],
  });

  if (!result?.accessToken) {
    throw new Error("Failed to acquire Microsoft Graph access token");
  }

  return result.accessToken;
}

async function sendMail(accessToken: string, emailUser: string, message: Record<string, unknown>) {
  const response = await fetch(`https://graph.microsoft.com/v1.0/users/${emailUser}/sendMail`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message, saveToSentItems: "false" }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Graph sendMail failed: ${response.status} ${errorText}`);
  }
}

export async function POST(req: Request) {
  let payload: ContactPayload;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const name = payload.name?.trim() ?? "";
  const company = payload.company?.trim() ?? "";
  const email = payload.email?.trim() ?? "";
  const message = payload.message?.trim() ?? "";
  const enq = payload.enq === "Partner" ? "Partner" : "Customer";
  const context = payload.context?.trim() ?? "";

  if (!name || !EMAIL_RE.test(email) || message.length < 10) {
    return NextResponse.json({ error: "Missing or invalid fields" }, { status: 400 });
  }

  const emailUser = process.env.EMAIL_USER;
  const recipient =
    enq === "Partner"
      ? process.env.CONTACT_EMAIL_PARTNER || process.env.CONTACT_EMAIL_TO
      : process.env.CONTACT_EMAIL_TO;

  if (!emailUser || !recipient) {
    console.error("Contact form is missing EMAIL_USER or CONTACT_EMAIL_TO configuration");
    return NextResponse.json({ error: "Contact form is not configured" }, { status: 500 });
  }

  let accessToken: string;
  try {
    accessToken = await getAccessToken();
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to authenticate with email service" }, { status: 500 });
  }

  const safeName = escapeHtml(name);
  const safeCompany = escapeHtml(company);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");
  const safeContext = escapeHtml(context);

  const singleLine = (value: string) => value.replace(/[\r\n]+/g, " ").trim();
  const subjectParts = [`New ${enq} Enquiry`, singleLine(company), singleLine(name)].filter(Boolean);
  const subject = subjectParts.join(" — ");

  function field(label: string, value: string) {
    if (!value) return "";
    return `
      <tr>
        <td style="padding:14px 0;border-bottom:1px solid #e5e9ee;">
          <div style="font-family:Arial,sans-serif;font-size:12px;letter-spacing:0.06em;text-transform:uppercase;color:#5e6a76;font-weight:600;margin-bottom:4px;">${label}</div>
          <div style="font-family:Arial,sans-serif;font-size:16px;line-height:1.5;color:#1a1a1a;white-space:pre-line;">${value}</div>
        </td>
      </tr>`;
  }

  // Shared branded shell (blue header bar + white card) for every outbound
  // email, so the internal notification and the visitor-facing confirmation
  // look consistently like AutomateIT rather than generic system mail.
  function brandedEmail(headerTitle: string, bodyHtml: string) {
    return `
      <div style="font-family:Arial,sans-serif;background:#f4f6f8;padding:32px 16px;">
        <div style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:8px;overflow:hidden;border:1px solid #e5e9ee;">
          <div style="background:#004AAD;padding:22px 28px;">
            <div style="font-family:Arial,sans-serif;font-size:15px;font-weight:800;letter-spacing:-0.02em;color:#ffffff;">AutomateIT</div>
            <div style="font-family:Arial,sans-serif;font-size:20px;font-weight:700;color:#ffffff;margin-top:6px;">${headerTitle}</div>
          </div>
          <div style="padding:24px 28px 8px;">
            ${bodyHtml}
          </div>
          <div style="padding:16px 28px;background:#f4f6f8;font-family:Arial,sans-serif;font-size:12px;color:#5e6a76;margin-top:16px;">
            AutomateIT — Reduce Costs. Unlock Growth.
          </div>
        </div>
      </div>
    `;
  }

  try {
    await sendMail(accessToken, emailUser, {
      subject,
      body: {
        contentType: "HTML",
        content: brandedEmail(
          "New Website Enquiry",
          `<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            ${field("Name", safeName)}
            ${field("Company", safeCompany)}
            ${field("Enquiry Type", enq)}
            ${field("Email", safeEmail)}
            ${field("Message", safeMessage)}
            ${context ? field("Subject", safeContext) : ""}
          </table>`
        ),
      },
      toRecipients: [{ emailAddress: { address: recipient } }],
      replyTo: [{ emailAddress: { address: email, name } }],
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to send enquiry" }, { status: 500 });
  }

  const paragraph = (text: string) =>
    `<p style="font-family:Arial,sans-serif;font-size:16px;line-height:1.6;color:#1a1a1a;margin:0 0 16px;">${text}</p>`;

  const confirmation =
    enq === "Partner"
      ? {
          subject: "Thanks for your interest in partnering with AutomateIT",
          headerTitle: "Let’s grow together.",
          intro: paragraph(
            `Hi ${safeName},<br /><br />Thanks for your interest in partnering with AutomateIT. We&rsquo;ve received your enquiry and aim to respond within 24 hours to talk through bringing managed automation to your clients, with AutomateIT handling the delivery.`
          ),
        }
      : {
          subject: "Thanks for contacting AutomateIT",
          headerTitle: "Let’s unlock your savings.",
          intro: paragraph(
            `Hi ${safeName},<br /><br />Thanks for getting in touch. We&rsquo;ve received your enquiry and aim to respond within 24 hours to arrange a conversation about your processes, where cost is going, and which opportunities are worth pursuing.`
          ),
        };

  try {
    await sendMail(accessToken, emailUser, {
      subject: confirmation.subject,
      body: {
        contentType: "HTML",
        content: brandedEmail(
          confirmation.headerTitle,
          `${confirmation.intro}
          ${paragraph(`<strong>Your message:</strong><br />${safeMessage}`)}
          ${paragraph("Best regards,<br />The AutomateIT Team")}`
        ),
      },
      toRecipients: [{ emailAddress: { address: email } }],
    });
  } catch (err) {
    // Non-fatal — the enquiry itself already reached the team.
    console.error("Failed to send confirmation email:", err);
  }

  return NextResponse.json({ message: "Enquiry sent" });
}
