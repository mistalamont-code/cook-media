import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { createClientFolders } from "@/lib/google/drive";

// GET /api/clients — Admin: list clients
export async function GET(request: NextRequest) {
  await requireAdmin();

  const search = request.nextUrl.searchParams.get("search");

  const where = search
    ? {
        OR: [
          { name: { contains: search, mode: "insensitive" as const } },
          { email: { contains: search, mode: "insensitive" as const } },
        ],
      }
    : {};

  const clients = await prisma.client.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: {
      _count: { select: { inquiries: true, proposals: true } },
    },
  });

  return NextResponse.json(clients);
}

// POST /api/clients — Admin: create client
export async function POST(request: NextRequest) {
  await requireAdmin();
  const body = await request.json();

  if (!body.name || !body.email) {
    return NextResponse.json(
      { error: "Name and email are required" },
      { status: 400 }
    );
  }

  // Create Drive folder for client (fire-and-forget)
  let driveFolderId: string | null = null;
  try {
    const folders = await createClientFolders(body.name);
    driveFolderId = folders.rootId;
  } catch (err) {
    console.error("[Drive] Failed to create client folders:", err);
  }

  const client = await prisma.client.create({
    data: {
      name: body.name,
      email: body.email,
      phone: body.phone || null,
      notes: body.notes || null,
      driveFolderId,
    },
  });

  // If inquiryId provided, link the inquiry to this client
  if (body.inquiryId) {
    await prisma.inquiry.update({
      where: { id: body.inquiryId },
      data: { clientId: client.id },
    });
  }

  return NextResponse.json(client, { status: 201 });
}
