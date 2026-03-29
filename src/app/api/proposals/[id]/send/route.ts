import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { sendEmail } from "@/lib/google/gmail";
import { proposalEmail } from "@/lib/email-templates";
import { appendInvoiceRow } from "@/lib/google/sheets";
import { formatCurrencyShort } from "@/lib/utils";

// POST /api/proposals/[id]/send — Send proposal email, update status, sync to Sheets
export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await requireAdmin();
  const { id } = await params;

  const proposal = await prisma.proposal.findUnique({
    where: { id },
    include: { client: true, package: true },
  });

  if (!proposal) {
    return NextResponse.json({ error: "Proposal not found" }, { status: 404 });
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const proposalUrl = `${appUrl}/proposal/${proposal.token}`;

  // Send email via Gmail
  await sendEmail({
    to: proposal.client.email,
    subject: `Your COOK/Media Proposal — ${proposal.package.name}`,
    html: proposalEmail(proposal.client.name, proposalUrl),
  });

  // Update proposal status
  const updated = await prisma.proposal.update({
    where: { id },
    data: { status: "SENT", sentAt: new Date() },
  });

  // Sync to Google Sheets (fire-and-forget)
  const retainer = Math.round(proposal.totalPrice / 2);
  appendInvoiceRow({
    date: new Date().toISOString().split("T")[0],
    clientName: proposal.client.name,
    serviceType: proposal.package.serviceType,
    packageName: proposal.package.name,
    amount: formatCurrencyShort(proposal.totalPrice),
    retainer: formatCurrencyShort(retainer),
    balance: formatCurrencyShort(proposal.totalPrice - retainer),
    status: "Proposal Sent",
  }).catch((err) => console.error("[Sheets] Failed to sync invoice:", err));

  return NextResponse.json({
    ...updated,
    proposalUrl,
  });
}
