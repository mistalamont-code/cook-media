"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrencyShort } from "@/lib/utils";

interface ProposalDetail {
  id: string;
  token: string;
  status: string;
  packagePrice: number;
  totalPrice: number;
  customNotes: string | null;
  validUntil: string | null;
  sentAt: string | null;
  viewedAt: string | null;
  createdAt: string;
  client: { id: string; name: string; email: string };
  package: { id: string; name: string; deliverables: string[]; serviceType: string };
  addOns: Array<{ price: number; addOn: { name: string } }>;
}

const statusBadge: Record<string, "default" | "red" | "success" | "error"> = {
  DRAFT: "default",
  SENT: "red",
  VIEWED: "red",
  ACCEPTED: "success",
  DECLINED: "error",
  EXPIRED: "default",
};

export default function ProposalDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [proposal, setProposal] = useState<ProposalDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    fetch(`/api/proposals/${id}`)
      .then((r) => r.json())
      .then(setProposal)
      .finally(() => setLoading(false));
  }, [id]);

  async function sendProposal() {
    setSending(true);
    const res = await fetch(`/api/proposals/${id}/send`, { method: "POST" });
    const data = await res.json();
    setProposal((prev) => prev ? { ...prev, status: data.status, sentAt: data.sentAt } : prev);
    setSending(false);
  }

  if (loading) return <p className="text-brand-text-muted">Loading...</p>;
  if (!proposal) return <p className="text-brand-error">Proposal not found</p>;

  const appUrl = typeof window !== "undefined" ? window.location.origin : "";
  const publicUrl = `${appUrl}/proposal/${proposal.token}`;

  return (
    <div className="max-w-3xl space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold">Proposal for {proposal.client.name}</h2>
          <p className="text-brand-text-muted">{proposal.client.email}</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant={statusBadge[proposal.status] || "default"} className="text-sm px-3 py-1">
            {proposal.status}
          </Badge>
          {proposal.status === "DRAFT" && (
            <Button onClick={sendProposal} disabled={sending}>
              {sending ? "Sending..." : "Send Proposal"}
            </Button>
          )}
        </div>
      </div>

      {/* Timeline */}
      <div className="flex gap-6 text-sm text-brand-text-muted">
        <span>Created: {new Date(proposal.createdAt).toLocaleDateString()}</span>
        {proposal.sentAt && <span>Sent: {new Date(proposal.sentAt).toLocaleDateString()}</span>}
        {proposal.viewedAt && <span>Viewed: {new Date(proposal.viewedAt).toLocaleDateString()}</span>}
      </div>

      {/* Public Link */}
      {proposal.status !== "DRAFT" && (
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-brand-text-muted mb-2">Public proposal link:</p>
            <a
              href={publicUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-brand-red hover:underline break-all"
            >
              {publicUrl}
            </a>
          </CardContent>
        </Card>
      )}

      {/* Package Details */}
      <Card>
        <CardHeader><CardTitle>{proposal.package.name}</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <ul className="space-y-1.5">
            {proposal.package.deliverables.map((d, i) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                <span className="text-brand-red">✓</span> {d}
              </li>
            ))}
          </ul>
          <div className="flex justify-between text-sm border-t border-white/8 pt-3">
            <span>Package Price</span>
            <span className="font-medium">{formatCurrencyShort(proposal.packagePrice)}</span>
          </div>

          {proposal.addOns.length > 0 && (
            <>
              <p className="text-sm font-medium text-brand-text-muted pt-2">Add-ons</p>
              {proposal.addOns.map((a, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <span>{a.addOn.name}</span>
                  <span>{formatCurrencyShort(a.price)}</span>
                </div>
              ))}
            </>
          )}

          <div className="flex justify-between border-t border-white/8 pt-3">
            <span className="text-lg font-bold">Total</span>
            <span className="text-lg font-bold text-brand-red">{formatCurrencyShort(proposal.totalPrice)}</span>
          </div>
          <p className="text-xs text-brand-text-muted">
            50% retainer ({formatCurrencyShort(Math.round(proposal.totalPrice / 2))}) due to reserve date.
            Balance due before event.
          </p>
        </CardContent>
      </Card>

      {proposal.customNotes && (
        <Card>
          <CardHeader><CardTitle>Notes</CardTitle></CardHeader>
          <CardContent>
            <p className="text-sm whitespace-pre-wrap">{proposal.customNotes}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
