import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

// GET /api/proposals/[id]
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await requireAdmin();
  const { id } = await params;

  const proposal = await prisma.proposal.findUnique({
    where: { id },
    include: {
      client: true,
      package: true,
      addOns: { include: { addOn: true } },
    },
  });

  if (!proposal) {
    return NextResponse.json({ error: "Proposal not found" }, { status: 404 });
  }

  return NextResponse.json(proposal);
}

// PATCH /api/proposals/[id]
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await requireAdmin();
  const { id } = await params;
  const body = await request.json();

  const proposal = await prisma.proposal.update({
    where: { id },
    data: {
      ...(body.status !== undefined && { status: body.status }),
      ...(body.customNotes !== undefined && { customNotes: body.customNotes }),
      ...(body.validUntil !== undefined && { validUntil: new Date(body.validUntil) }),
    },
  });

  return NextResponse.json(proposal);
}
