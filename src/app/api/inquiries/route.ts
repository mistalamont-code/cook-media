import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { ServiceType, InquiryStatus } from "@/generated/prisma/client";
import { sendEmail } from "@/lib/google/gmail";
import { inquiryConfirmationEmail, inquiryNotificationEmail } from "@/lib/email-templates";
import { requireAdmin } from "@/lib/auth";

// POST /api/inquiries — Public: submit inquiry form
export async function POST(request: NextRequest) {
  const body = await request.json();

  // Validate required fields
  if (!body.name || !body.email || !body.serviceType) {
    return NextResponse.json(
      { error: "Name, email, and service type are required" },
      { status: 400 }
    );
  }

  if (!Object.values(ServiceType).includes(body.serviceType)) {
    return NextResponse.json(
      { error: "Invalid service type" },
      { status: 400 }
    );
  }

  let inquiry;
  try {
    inquiry = await prisma.inquiry.create({
      data: {
        serviceType: body.serviceType as ServiceType,
        name: body.name,
        email: body.email,
        phone: body.phone || null,
        message: body.message || null,
        referralSource: body.referralSource || null,
        eventDate: body.eventDate ? new Date(body.eventDate) : null,
        venue: body.venue || null,
        guestCount: body.guestCount ? parseInt(body.guestCount) : null,
        partnerName: body.partnerName || null,
        packageInterest: body.packageInterest || null,
        eventType: body.eventType || null,
        attendees: body.attendees ? parseInt(body.attendees) : null,
        servicesNeeded: body.servicesNeeded || [],
        topic: body.topic || null,
        audience: body.audience || null,
      },
    });
  } catch (err) {
    console.error("[Inquiry] Failed to create:", err);
    const message =
      err instanceof Error ? err.message : "Failed to create inquiry";
    return NextResponse.json({ error: message }, { status: 500 });
  }

  // Send confirmation email to client (fire-and-forget)
  sendEmail({
    to: body.email,
    subject: "Thanks for reaching out to COOK/Media!",
    html: inquiryConfirmationEmail(body.name, body.serviceType),
  }).catch((err) => console.error("[Email] Failed to send confirmation:", err));

  // Send notification email to Corey (fire-and-forget)
  sendEmail({
    to: "corey@cook-media.com",
    subject: `New Inquiry: ${body.name} — ${body.serviceType.replace("_", " ")}`,
    html: inquiryNotificationEmail({
      name: body.name,
      email: body.email,
      phone: body.phone,
      serviceType: body.serviceType,
      eventDate: body.eventDate,
      venue: body.venue,
      message: body.message,
    }),
  }).catch((err) => console.error("[Email] Failed to send notification:", err));

  return NextResponse.json({ id: inquiry.id }, { status: 201 });
}

// GET /api/inquiries — Admin: list inquiries with optional filters
export async function GET(request: NextRequest) {
  await requireAdmin();

  const { searchParams } = request.nextUrl;
  const status = searchParams.get("status");
  const serviceType = searchParams.get("serviceType");
  const search = searchParams.get("search");

  const where: Record<string, unknown> = {};

  if (status && Object.values(InquiryStatus).includes(status as InquiryStatus)) {
    where.status = status;
  }
  if (serviceType && Object.values(ServiceType).includes(serviceType as ServiceType)) {
    where.serviceType = serviceType;
  }
  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { email: { contains: search, mode: "insensitive" } },
      { venue: { contains: search, mode: "insensitive" } },
    ];
  }

  const inquiries = await prisma.inquiry.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: { client: { select: { id: true, name: true } } },
  });

  return NextResponse.json(inquiries);
}
