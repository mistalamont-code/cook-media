import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { InquiryStatus } from "@/generated/prisma/client";
import { requireAdmin } from "@/lib/auth";
import { createEvent } from "@/lib/google/calendar";

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

  // Fetch current inquiry to check if status is actually changing to BOOKED
  const current = await prisma.inquiry.findUnique({ where: { id } });

  const inquiry = await prisma.inquiry.update({
    where: { id },
    data: updateData,
    include: { client: true },
  });

  // Auto-create calendar event when status changes to BOOKED
  if (
    body.status === "BOOKED" &&
    current?.status !== "BOOKED" &&
    inquiry.eventDate
  ) {
    const eventEnd = new Date(inquiry.eventDate);
    eventEnd.setHours(eventEnd.getHours() + 4); // Default 4-hour event

    createEvent({
      title: `COOK/Media — ${inquiry.name}`,
      description: [
        `Service: ${inquiry.serviceType}`,
        inquiry.venue ? `Venue: ${inquiry.venue}` : null,
        inquiry.email ? `Contact: ${inquiry.email}` : null,
        inquiry.phone ? `Phone: ${inquiry.phone}` : null,
      ]
        .filter(Boolean)
        .join("\n"),
      location: inquiry.venue || undefined,
      startDateTime: inquiry.eventDate.toISOString(),
      endDateTime: eventEnd.toISOString(),
      attendeeEmail: inquiry.email,
    }).catch((err) =>
      console.error("[Calendar] Failed to create booking event:", err)
    );
  }

  return NextResponse.json(inquiry);
}
