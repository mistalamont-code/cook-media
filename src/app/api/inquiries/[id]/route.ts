import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { InquiryStatus } from "@/generated/prisma/client";
import { requireAdmin } from "@/lib/auth";

// GET /api/inquiries/[id] — Admin: single inquiry
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await requireAdmin();
  const { id } = await params;

  const inquiry = await prisma.inquiry.findUnique({
    where: { id },
    include: { client: true },
  });

  if (!inquiry) {
    return NextResponse.json({ error: "Inquiry not found" }, { status: 404 });
  }

  return NextResponse.json(inquiry);
}

// PATCH /api/inquiries/[id] — Admin: update inquiry (status, notes, link client)
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await requireAdmin();
  const { id } = await params;
  const body = await request.json();

  const updateData: Record<string, unknown> = {};

  if (body.status && Object.values(InquiryStatus).includes(body.status)) {
    updateData.status = body.status;
  }
  if (body.clientId !== undefined) {
    updateData.clientId = body.clientId;
  }

  const inquiry = await prisma.inquiry.update({
    where: { id },
    data: updateData,
    include: { client: true },
  });

  return NextResponse.json(inquiry);
}
