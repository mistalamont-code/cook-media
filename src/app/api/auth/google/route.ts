import { NextResponse } from "next/server";
import { getConsentUrl } from "@/lib/google/auth";

export async function GET() {
  const url = getConsentUrl();
  return NextResponse.redirect(url);
}
