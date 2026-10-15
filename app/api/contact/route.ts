import { NextResponse } from "next/server";
import { ConfidentialClientApplication } from "@azure/msal-node";
import { clientIp, isRateLimited } from "@/lib/rate-limit";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MIN_FILL_TIME_MS = 5000;

type ContactPayload = {
  name?: string;
  company?: string;
  email?: string;
  enq?: string;
  context?: string;
  message?: string;
  // Bot-detection fields, not real contact data — see the honeypot/timing
  // check below.
  hp?: string;
  elapsedMs?: number;
};

const FALLBACK_EMAIL = "info@automateit.tech";

// Structured, single-line JSON logs for every outcome of this route. They
// land in Vercel → Project → Logs (filter by "contact" or a ref), which only
// members of the Vercel team can see — nothing here is ever sent to the
// visitor apart from the short `ref`. Deliberately no message bodies, names,
// secrets or full email addresses: just enough to diagnose a failure.
type LogLevel = "info" | "warn" | "error";
function log(level: LogLevel, ref: string, event: string, details: Record<string, unknown> = {}) {
  const line = JSON.stringify({ scope: "contact", ref, event, ...details });
  if (level === "error") console.error(line);
  else if (level === "warn") console.warn(line);
  else console.log(line);
}

function errorDetails(err: unknown) {
  if (err && typeof err === "object") {
    const e = err as { name?: string; message?: string; errorCode?: string; subError?: string };
    return { errName: e.name, errCode: e.errorCode, errSubCode: e.subError, errMessage: e.message?.slice(0, 500) };
  }
  return { errMessage: String(err).slice(0, 500) };
}

function failure(ref: string, status: number, error: string) {
  return NextResponse.json({ error, ref }, { status });
}

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
    throw new GraphError(response.status, errorText);
  }
}

// Carries Graph's own error code (e.g. MailboxNotEnabledForRESTAPI,
// ErrorAccessDenied, ResourceNotFound) so the log says *why* sending failed.
class GraphError extends Error {
  status: number;
  graphCode?: string;
  constructor(status: number, body: string) {
    let graphCode: string | undefined;
    let graphMessage = body;
    try {
      const parsed = JSON.parse(body) as { error?: { code?: string; message?: string } };
      graphCode = parsed.error?.code;
      graphMessage = parsed.error?.message ?? body;
    } catch {
      // Non-JSON body — keep the raw text.
    }
    super(`Graph sendMail failed: ${status} ${graphMessage}`.slice(0, 500));
    this.name = "GraphError";
    this.status = status;
    this.graphCode = graphCode;
  }
}

export async function POST(req: Request) {
  // Short ID shown to the visitor on failure and stamped on every log line,
  // so a screenshot of the error can be matched to the exact log entries.
  const ref = crypto.randomUUID().slice(0, 8);
  log("info", ref, "received", {
    host: req.headers.get("host"),
    vercelEnv: process.env.VERCEL_ENV ?? "unknown",
    userAgent: req.headers.get("user-agent")?.slice(0, 300),
  });

  if (isRateLimited(clientIp(req))) {
    log("warn", ref, "rate_limited");
    return failure(ref, 429, "Too many requests. Please try again later.");
  }

  let payload: ContactPayload;
  try {
    payload = await req.json();
  } catch {
    log("warn", ref, "invalid_body", { contentType: req.headers.get("content-type") });
    return failure(ref, 400, "Invalid request body");
  }

  // Honeypot + minimum-fill-time bot check. A real visitor never sees or
  // fills the honeypot field (hidden from sighted and screen-reader users
  // alike — see the form). 5 seconds is safe even with browser autofill:
  // autofill can populate name/email/company instantly, but the message
  // field still requires genuinely typing a real sentence, which autofill
  // can't do. `elapsedMs` is measured entirely on the visitor's own clock
  // (render → submit), so a device clock that's out of sync with the server
  // can't make a real person look like a bot. Respond as if it succeeded
  // either way, so scripted submitters get no signal that they were caught —
  // but log it, since a false positive is otherwise invisible.
  const isHoneypotFilled = Boolean(payload.hp?.trim());
  const filledTooFast = typeof payload.elapsedMs === "number" && payload.elapsedMs < MIN_FILL_TIME_MS;
  if (isHoneypotFilled || filledTooFast) {
    log("warn", ref, "dropped_as_bot", {
      honeypotFilled: isHoneypotFilled,
      elapsedMs: payload.elapsedMs,
    });
    return NextResponse.json({ message: "Enquiry sent" });
  }

  const name = payload.name?.trim() ?? "";
  const company = payload.company?.trim() ?? "";
  const email = payload.email?.trim() ?? "";
  const message = payload.message?.trim() ?? "";
  const enq = payload.enq === "Partner" ? "Partner" : "Customer";
  const context = payload.context?.trim() ?? "";

  if (
    !name ||
    name.length > 200 ||
    company.length > 200 ||
    !email ||
    email.length > 320 ||
    !EMAIL_RE.test(email) ||
    message.length < 10 ||
    message.length > 5000 ||
    context.length > 200
  ) {
    log("warn", ref, "validation_failed", {
      nameMissing: !name,
      nameTooLong: name.length > 200,
      companyTooLong: company.length > 200,
      emailInvalid: !email || email.length > 320 || !EMAIL_RE.test(email),
      messageLength: message.length,
      contextTooLong: context.length > 200,
    });
    return failure(ref, 400, "Missing or invalid fields");
  }

  const emailDomain = email.split("@")[1];
  const unavailable = `Sorry, we couldn't send your enquiry just now. Please email us directly at ${FALLBACK_EMAIL}.`;

  // Names only, never values — tells you at a glance whether this
  // deployment (e.g. a Preview URL) is missing env vars.
  const missingEnv = ["TENANT_ID", "CLIENT_ID", "CLIENT_SECRET", "EMAIL_USER", "CONTACT_EMAIL_TO"].filter(
    (key) => !process.env[key]
  );
  if (missingEnv.length) {
    log("error", ref, "missing_config", { missingEnv, vercelEnv: process.env.VERCEL_ENV ?? "unknown" });
    return failure(ref, 500, unavailable);
  }

  const emailUser = process.env.EMAIL_USER!;
  const recipient =
    enq === "Partner"
      ? process.env.CONTACT_EMAIL_PARTNER || process.env.CONTACT_EMAIL_TO!
      : process.env.CONTACT_EMAIL_TO!;

  let accessToken: string;
  try {
    accessToken = await getAccessToken();
  } catch (err) {
    // AADSTS7000222 = client secret expired; AADSTS7000215 = wrong secret;
    // AADSTS700016 = wrong CLIENT_ID / TENANT_ID.
    log("error", ref, "auth_failed", errorDetails(err));
    return failure(ref, 500, unavailable);
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
    log("error", ref, "send_failed", {
      ...errorDetails(err),
      graphStatus: err instanceof GraphError ? err.status : undefined,
      graphCode: err instanceof GraphError ? err.graphCode : undefined,
      enq,
    });
    return failure(ref, 500, unavailable);
  }
  log("info", ref, "sent", { enq, emailDomain });

  const paragraph = (text: string) =>
    `<p style="font-family:Arial,sans-serif;font-size:16px;line-height:1.6;color:#1a1a1a;margin:0 0 16px;">${text}</p>`;

  const confirmation =
    enq === "Partner"
      ? {
          subject: "Thanks for your interest in partnering with AutomateIT",
          headerTitle: "Let’s grow together.",
          intro: paragraph(
            `Hi ${safeName},<br /><br />Thanks for your interest in partnering with AutomateIT. We&rsquo;ve received your enquiry and aim to respond within 24 hours to talk through bringing managed automation to your clients.`
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
    log("warn", ref, "confirmation_failed", {
      ...errorDetails(err),
      graphStatus: err instanceof GraphError ? err.status : undefined,
      graphCode: err instanceof GraphError ? err.graphCode : undefined,
      emailDomain,
    });
  }

  return NextResponse.json({ message: "Enquiry sent" });
}
