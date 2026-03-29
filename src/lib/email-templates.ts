/** Branded HTML email templates for Cook Media */

export function inquiryConfirmationEmail(name: string, serviceType: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background:#FAFAF8;font-family:'Inter',Arial,sans-serif;">
  <div style="max-width:560px;margin:40px auto;background:#FFFFFF;border-radius:12px;overflow:hidden;border:1px solid #E5E7EB;">
    <div style="background:#6B2D8B;padding:32px;text-align:center;">
      <h1 style="margin:0;font-family:'Playfair Display',Georgia,serif;color:#FFFFFF;font-size:28px;">
        COOK<span style="color:#D4A843;">/</span>Media
      </h1>
    </div>
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
    </div>
    <div style="padding:24px 32px;background:#FAFAF8;border-top:1px solid #E5E7EB;text-align:center;">
      <p style="margin:0;color:#6B7280;font-size:12px;">
        Cook Media LLC &bull; Erie, PA
      </p>
    </div>
  </div>
</body>
</html>`;
}

export function proposalEmail(clientName: string, proposalUrl: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background:#FAFAF8;font-family:'Inter',Arial,sans-serif;">
  <div style="max-width:560px;margin:40px auto;background:#FFFFFF;border-radius:12px;overflow:hidden;border:1px solid #E5E7EB;">
    <div style="background:#6B2D8B;padding:32px;text-align:center;">
      <h1 style="margin:0;font-family:'Playfair Display',Georgia,serif;color:#FFFFFF;font-size:28px;">
        COOK<span style="color:#D4A843;">/</span>Media
      </h1>
    </div>
    <div style="padding:32px;">
      <h2 style="margin:0 0 16px;font-family:'Playfair Display',Georgia,serif;color:#1A1A2E;font-size:22px;">
        Your proposal is ready, ${clientName}!
      </h2>
      <p style="color:#6B7280;font-size:15px;line-height:1.6;margin:0 0 24px;">
        We've put together a custom package based on your needs. Click below to view the full details, pricing, and deliverables.
      </p>
      <div style="text-align:center;margin:0 0 24px;">
        <a href="${proposalUrl}" style="display:inline-block;background:#6B2D8B;color:#FFFFFF;padding:14px 32px;border-radius:8px;font-size:15px;font-weight:600;text-decoration:none;">
          View Your Proposal
        </a>
      </div>
      <p style="color:#6B7280;font-size:14px;line-height:1.6;margin:0;">
        Questions? Simply reply to this email — Corey reads every one.
      </p>
    </div>
    <div style="padding:24px 32px;background:#FAFAF8;border-top:1px solid #E5E7EB;text-align:center;">
      <p style="margin:0;color:#6B7280;font-size:12px;">
        Cook Media LLC &bull; Erie, PA
      </p>
    </div>
  </div>
</body>
</html>`;
}
