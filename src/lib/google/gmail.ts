import { google } from "googleapis";
import { getAuthenticatedClient } from "./auth";

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

/** Send an email from Corey's Gmail account */
export async function sendEmail({ to, subject, html }: EmailOptions): Promise<boolean> {
  const auth = getAuthenticatedClient();

  if (!auth) {
    console.log(`[Gmail Stub] Would send to: ${to}`);
    console.log(`[Gmail Stub] Subject: ${subject}`);
    console.log(`[Gmail Stub] Body preview: ${html.substring(0, 200)}...`);
    return false;
  }

  const gmail = google.gmail({ version: "v1", auth });

  const message = [
    `To: ${to}`,
    `Subject: ${subject}`,
    "MIME-Version: 1.0",
    'Content-Type: text/html; charset="UTF-8"',
    "",
    html,
  ].join("\r\n");

  const encodedMessage = Buffer.from(message)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

  await gmail.users.messages.send({
    userId: "me",
    requestBody: { raw: encodedMessage },
  });

  return true;
}
