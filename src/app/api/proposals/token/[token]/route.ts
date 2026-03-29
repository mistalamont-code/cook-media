import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// GET /api/proposals/token/[token] — Public: fetch proposal by shareable token
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;

  const proposal = await prisma.proposal.findUnique({
    where: { token },
    include: {
      client: { select: { name: true } },
      package: { select: { name: true, deliverables: true, serviceType: true } },
      addOns: { include: { addOn: { select: { name: true } } } },
    },
  });

  if (!proposal) {
    return NextResponse.json({ error: "Proposal not found" }, { status: 404 });
  }

  // Track first view
  if (!proposal.viewedAt) {
    await prisma.proposal.update({
      where: { token },
      data: { viewedAt: new Date(), status: proposal.status === "SENT" ? "VIEWED" : proposal.status },
    });
  }

  return NextResponse.json(proposal);
}
