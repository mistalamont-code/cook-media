import { NextRequest, NextResponse } from "next/server";
import { exchangeCodeForTokens } from "@/lib/google/auth";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");

  if (!code) {
    return NextResponse.json({ error: "Missing authorization code" }, { status: 400 });
  }

  const tokens = await exchangeCodeForTokens(code);

  // In production, store the refresh token securely.
  // For now, display it so Corey can add it to .env
  return NextResponse.json({
    message: "Google OAuth successful! Copy the refresh_token below into your .env file as GOOGLE_REFRESH_TOKEN",
    refresh_token: tokens.refresh_token,
    access_token: tokens.access_token ? "✓ received" : "✗ missing",
    scope: tokens.scope,
  });
}
