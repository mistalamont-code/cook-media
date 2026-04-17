/** Branded HTML email templates for Cook Media */

const HEADER_BG = "#0A0A0A";
const ACCENT = "#C41E2A";
const BODY_BG = "#FAFAF8";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function humanizeEnum(value: string): string {
  return value.replace(/_/g, " ");
}

function formatDate(value: string): string {
  const iso = /^\d{4}-\d{2}-\d{2}$/.test(value) ? `${value}T00:00:00` : value;
  const d = new Date(iso);
  if (isNaN(d.getTime())) return value;
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function emailShell(content: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background:${BODY_BG};font-family:'Inter',Arial,sans-serif;">
  <div style="max-width:560px;margin:40px auto;background:#FFFFFF;border-radius:12px;overflow:hidden;border:1px solid #E5E7EB;">
    <div style="background:${HEADER_BG};padding:32px;text-align:center;">
      <h1 style="margin:0;font-family:'Playfair Display',Georgia,serif;color:#FFFFFF;font-size:28px;">
        COOK<span style="color:${ACCENT};">/</span>Media
      </h1>
    </div>
    ${content}
    <div style="padding:24px 32px;background:#FAFAF8;border-top:1px solid #E5E7EB;text-align:center;">
      <p style="margin:0;color:#6B7280;font-size:12px;">
        Cook Media LLC &bull; Erie, PA
      </p>
    </div>
  </div>
</body>
</html>`;
}

export function inquiryConfirmationEmail(name: string, serviceType: string): string {
  const safeName = escapeHtml(name);
  const safeService = escapeHtml(humanizeEnum(serviceType).toLowerCase());
  return emailShell(`
    <div style="padding:32px;">
      <h2 style="margin:0 0 16px;font-family:'Playfair Display',Georgia,serif;color:#1A1A2E;font-size:22px;">
        Thanks for reaching out, ${safeName}!
      </h2>
      <p style="color:#6B7280;font-size:15px;line-height:1.6;margin:0 0 16px;">
        We received your ${safeService} inquiry and are excited to learn more about your vision.
        Corey will personally review your details and get back to you within 24-48 hours.
      </p>
      <p style="color:#6B7280;font-size:15px;line-height:1.6;margin:0 0 24px;">
        <strong style="color:#1A1A2E;">What happens next:</strong>
      </p>
      <ol style="color:#6B7280;font-size:15px;line-height:1.8;margin:0 0 24px;padding-left:20px;">
        <li>Corey reviews your inquiry</li>
        <li>You'll receive a custom proposal tailored to your needs</li>
        <li>We'll schedule a call to discuss the details</li>
      </ol>
      <p style="color:#6B7280;font-size:14px;line-height:1.6;margin:0;">
        In the meantime, feel free to reply to this email with any questions.
      </p>
    </div>`);
}

export function inquiryNotificationEmail(inquiry: {
  name: string;
  email: string;
  phone?: string | null;
  serviceType: string;
  eventDate?: string | null;
  venue?: string | null;
  message?: string | null;
}): string {
  const safeName = escapeHtml(inquiry.name);
  const safeEmail = escapeHtml(inquiry.email);
  const safeService = escapeHtml(humanizeEnum(inquiry.serviceType));
  const safePhone = inquiry.phone ? escapeHtml(inquiry.phone) : null;
  const safePhoneHref = inquiry.phone
    ? escapeHtml(inquiry.phone.replace(/[^\d+]/g, ""))
    : null;
  const safeEventDate = inquiry.eventDate ? escapeHtml(formatDate(inquiry.eventDate)) : null;
  const safeVenue = inquiry.venue ? escapeHtml(inquiry.venue) : null;
  const safeMessage = inquiry.message
    ? escapeHtml(inquiry.message).replace(/\n/g, "<br>")
    : null;

  const details = [
    `<strong>Name:</strong> ${safeName}`,
    `<strong>Email:</strong> <a href="mailto:${safeEmail}" style="color:${ACCENT};">${safeEmail}</a>`,
    safePhone ? `<strong>Phone:</strong> <a href="tel:${safePhoneHref}" style="color:${ACCENT};">${safePhone}</a>` : null,
    `<strong>Service:</strong> ${safeService}`,
    safeEventDate ? `<strong>Event Date:</strong> ${safeEventDate}` : null,
    safeVenue ? `<strong>Venue:</strong> ${safeVenue}` : null,
    safeMessage ? `<strong>Message:</strong> ${safeMessage}` : null,
  ].filter(Boolean);

  const dashboardUrl = escapeHtml(
    `${process.env.NEXT_PUBLIC_APP_URL ?? ""}/admin/inquiries`
  );

  return emailShell(`
    <div style="padding:32px;">
      <h2 style="margin:0 0 16px;font-family:'Playfair Display',Georgia,serif;color:#1A1A2E;font-size:22px;">
        New Inquiry Received
      </h2>
      <p style="color:#6B7280;font-size:15px;line-height:1.6;margin:0 0 24px;">
        A new inquiry was just submitted on your website.
      </p>
      <div style="background:#F9FAFB;border:1px solid #E5E7EB;border-radius:8px;padding:20px;margin:0 0 24px;">
        ${details.map((d) => `<p style="color:#374151;font-size:14px;line-height:1.8;margin:0 0 8px;">${d}</p>`).join("")}
      </div>
      <div style="text-align:center;">
        <a href="${dashboardUrl}" style="display:inline-block;background:${ACCENT};color:#FFFFFF;padding:14px 32px;border-radius:8px;font-size:15px;font-weight:600;text-decoration:none;">
          View in Dashboard
        </a>
      </div>
    </div>`);
}

export function proposalEmail(clientName: string, proposalUrl: string): string {
  const safeName = escapeHtml(clientName);
  const safeUrl = escapeHtml(proposalUrl);
  return emailShell(`
    <div style="padding:32px;">
      <h2 style="margin:0 0 16px;font-family:'Playfair Display',Georgia,serif;color:#1A1A2E;font-size:22px;">
        Your proposal is ready, ${safeName}!
      </h2>
      <p style="color:#6B7280;font-size:15px;line-height:1.6;margin:0 0 24px;">
        We've put together a custom package based on your needs. Click below to view the full details, pricing, and deliverables.
      </p>
      <div style="text-align:center;margin:0 0 24px;">
        <a href="${safeUrl}" style="display:inline-block;background:${ACCENT};color:#FFFFFF;padding:14px 32px;border-radius:8px;font-size:15px;font-weight:600;text-decoration:none;">
          View Your Proposal
        </a>
      </div>
      <p style="color:#6B7280;font-size:14px;line-height:1.6;margin:0;">
        Questions? Simply reply to this email — Corey reads every one.
      </p>
    </div>`);
}
