import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

// GET /api/proposals — Admin: list proposals
export async function GET() {
  await requireAdmin();

  const proposals = await prisma.proposal.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      client: { select: { id: true, name: true, email: true } },
      package: { select: { id: true, name: true } },
    },
  });

  return NextResponse.json(proposals);
}

// POST /api/proposals — Admin: create proposal with snapshotted prices
export async function POST(request: NextRequest) {
  await requireAdmin();
  const body = await request.json();

  if (!body.clientId || !body.packageId) {
    return NextResponse.json(
      { error: "Client and package are required" },
      { status: 400 }
    );
  }

  // Fetch the package for price snapshot
  const pkg = await prisma.package.findUnique({
    where: { id: body.packageId },
  });

  if (!pkg) {
    return NextResponse.json({ error: "Package not found" }, { status: 404 });
  }

  // Fetch add-ons for price snapshots
  let addOnSnapshots: { addOnId: string; price: number }[] = [];
  let addOnsTotal = 0;

  if (body.addOnIds && Array.isArray(body.addOnIds) && body.addOnIds.length > 0) {
    const addOns = await prisma.addOn.findMany({
      where: { id: { in: body.addOnIds } },
    });
    addOnSnapshots = addOns.map((a) => ({ addOnId: a.id, price: a.price }));
    addOnsTotal = addOns.reduce((sum, a) => sum + a.price, 0);
  }

  const totalPrice = pkg.price + addOnsTotal;

  const proposal = await prisma.proposal.create({
    data: {
      clientId: body.clientId,
      packageId: body.packageId,
      packagePrice: pkg.price,
      totalPrice,
      customNotes: body.customNotes || null,
      validUntil: body.validUntil ? new Date(body.validUntil) : null,
      addOns: {
        create: addOnSnapshots.map((a) => ({
          addOnId: a.addOnId,
          price: a.price,
        })),
      },
    },
    include: {
      client: true,
      package: true,
      addOns: { include: { addOn: true } },
    },
  });

  return NextResponse.json(proposal, { status: 201 });
}
