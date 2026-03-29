import { google } from "googleapis";

const SCOPES = [
  "https://www.googleapis.com/auth/gmail.send",
  "https://www.googleapis.com/auth/drive.file",
  "https://www.googleapis.com/auth/spreadsheets",
];

function getOAuth2Client() {
  return new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/google/callback`
  );
}

/** Get an authenticated OAuth2 client using the stored refresh token */
export function getAuthenticatedClient() {
  const client = getOAuth2Client();
  const refreshToken = process.env.GOOGLE_REFRESH_TOKEN;

  if (!refreshToken) {
    console.warn("[Google Auth] No refresh token configured. Google integrations will be skipped.");
    return null;
  }

  client.setCredentials({ refresh_token: refreshToken });
  return client;
}

/** Generate the OAuth consent URL for initial setup */
export function getConsentUrl() {
  const client = getOAuth2Client();
  return client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
    prompt: "consent",
  });
}

/** Exchange an authorization code for tokens */
export async function exchangeCodeForTokens(code: string) {
  const client = getOAuth2Client();
  const { tokens } = await client.getToken(code);
  return tokens;
}
