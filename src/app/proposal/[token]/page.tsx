"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ProposalPreview } from "@/components/proposal-preview";
import Link from "next/link";

interface PublicProposal {
  id: string;
  status: string;
  packagePrice: number;
  totalPrice: number;
  customNotes: string | null;
  validUntil: string | null;
  client: { name: string };
  package: { name: string; deliverables: string[]; serviceType: string };
  addOns: Array<{ price: number; addOn: { name: string } }>;
}

export default function PublicProposalPage() {
  const { token } = useParams<{ token: string }>();
  const [proposal, setProposal] = useState<PublicProposal | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`/api/proposals/token/${token}`)
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(setProposal)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [token]);

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-bg flex items-center justify-center">
        <p className="text-brand-text-muted">Loading your proposal...</p>
      </div>
    );
  }

  if (error || !proposal) {
    return (
      <div className="min-h-screen bg-brand-bg flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">Proposal Not Found</h1>
        <p className="text-brand-text-muted">This link may have expired or is invalid.</p>
        <Link href="/" className="text-brand-red hover:underline text-sm">
          Visit cook-media.com
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-bg py-8 px-4">
      <ProposalPreview
        data={{
          clientName: proposal.client.name,
          packageName: proposal.package.name,
          packagePrice: proposal.packagePrice,
          totalPrice: proposal.totalPrice,
          deliverables: proposal.package.deliverables,
          addOns: proposal.addOns.map((a) => ({
            name: a.addOn.name,
            price: a.price,
          })),
          customNotes: proposal.customNotes,
          serviceType: proposal.package.serviceType,
          validUntil: proposal.validUntil,
        }}
      />
    </div>
  );
}
