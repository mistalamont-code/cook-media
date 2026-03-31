/** Branded HTML email templates for Cook Media */

const HEADER_BG = "#0A0A0A";
const ACCENT = "#C41E2A";
const BODY_BG = "#FAFAF8";

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
  return emailShell(`
    <div style="padding:32px;">
      <h2 style="margin:0 0 16px;font-family:'Playfair Display',Georgia,serif;color:#1A1A2E;font-size:22px;">
        Thanks for reaching out, ${name}!
      </h2>
      <p style="color:#6B7280;font-size:15px;line-height:1.6;margin:0 0 16px;">
        We received your ${serviceType.toLowerCase().replace("_", " ")} inquiry and are excited to learn more about your vision.
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
  const details = [
    `<strong>Name:</strong> ${inquiry.name}`,
    `<strong>Email:</strong> <a href="mailto:${inquiry.email}" style="color:${ACCENT};">${inquiry.email}</a>`,
    inquiry.phone ? `<strong>Phone:</strong> <a href="tel:${inquiry.phone}" style="color:${ACCENT};">${inquiry.phone}</a>` : null,
    `<strong>Service:</strong> ${inquiry.serviceType.replace("_", " ")}`,
    inquiry.eventDate ? `<strong>Event Date:</strong> ${inquiry.eventDate}` : null,
    inquiry.venue ? `<strong>Venue:</strong> ${inquiry.venue}` : null,
    inquiry.message ? `<strong>Message:</strong> ${inquiry.message}` : null,
  ].filter(Boolean);

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
        <a href="${process.env.NEXT_PUBLIC_APP_URL || "https://cook-media.vercel.app"}/admin/inquiries" style="display:inline-block;background:${ACCENT};color:#FFFFFF;padding:14px 32px;border-radius:8px;font-size:15px;font-weight:600;text-decoration:none;">
          View in Dashboard
        </a>
      </div>
    </div>`);
}

export function proposalEmail(clientName: string, proposalUrl: string): string {
  return emailShell(`
    <div style="padding:32px;">
      <h2 style="margin:0 0 16px;font-family:'Playfair Display',Georgia,serif;color:#1A1A2E;font-size:22px;">
        Your proposal is ready, ${clientName}!
      </h2>
      <p style="color:#6B7280;font-size:15px;line-height:1.6;margin:0 0 24px;">
        We've put together a custom package based on your needs. Click below to view the full details, pricing, and deliverables.
      </p>
      <div style="text-align:center;margin:0 0 24px;">
        <a href="${proposalUrl}" style="display:inline-block;background:${ACCENT};color:#FFFFFF;padding:14px 32px;border-radius:8px;font-size:15px;font-weight:600;text-decoration:none;">
          View Your Proposal
        </a>
      </div>
      <p style="color:#6B7280;font-size:14px;line-height:1.6;margin:0;">
        Questions? Simply reply to this email — Corey reads every one.
      </p>
    </div>`);
}
