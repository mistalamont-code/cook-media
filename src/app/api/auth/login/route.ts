import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

// Simple auth stub — replace with Clerk or a real auth provider later
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "corey@cook-media.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "cookmedia2026";

export async function POST(request: NextRequest) {
  const body = await request.json();

  if (body.email === ADMIN_EMAIL && body.password === ADMIN_PASSWORD) {
    const cookieStore = await cookies();
    cookieStore.set("admin_session", "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
}
