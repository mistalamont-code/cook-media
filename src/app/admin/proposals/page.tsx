"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCurrencyShort } from "@/lib/utils";

interface Proposal {
  id: string;
  status: string;
  totalPrice: number;
  createdAt: string;
  sentAt: string | null;
  client: { id: string; name: string; email: string };
  package: { id: string; name: string };
}

const statusBadge: Record<string, "default" | "red" | "success" | "error"> = {
  DRAFT: "default",
  SENT: "red",
  VIEWED: "red",
  ACCEPTED: "success",
  DECLINED: "error",
  EXPIRED: "default",
};

export default function ProposalsPage() {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/proposals")
      .then((res) => res.json())
      .then(setProposals)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Link href="/admin/proposals/new">
          <Button>New Proposal</Button>
        </Link>
      </div>

      <div className="overflow-x-auto rounded-xl border border-white/8 bg-brand-card">
        <table className="w-full text-sm">
          <thead className="border-b border-white/8 bg-white/3">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-brand-text-muted">Client</th>
              <th className="px-4 py-3 text-left font-medium text-brand-text-muted">Package</th>
              <th className="px-4 py-3 text-left font-medium text-brand-text-muted">Total</th>
              <th className="px-4 py-3 text-left font-medium text-brand-text-muted">Status</th>
              <th className="px-4 py-3 text-left font-medium text-brand-text-muted">Created</th>
              <th className="px-4 py-3 text-right font-medium text-brand-text-muted"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/8">
            {loading ? (
              <tr><td colSpan={6} className="px-4 py-8 text-center text-brand-text-muted">Loading proposals...</td></tr>
            ) : proposals.length === 0 ? (
              <tr><td colSpan={6} className="px-4 py-8 text-center text-brand-text-muted">No proposals sent yet.</td></tr>
            ) : (
              proposals.map((p) => (
                <tr key={p.id} className="hover:bg-white/5">
                  <td className="px-4 py-3">
                    <p className="font-medium">{p.client.name}</p>
                    <p className="text-xs text-brand-text-muted">{p.client.email}</p>
                  </td>
                  <td className="px-4 py-3">{p.package.name}</td>
                  <td className="px-4 py-3 font-medium">{formatCurrencyShort(p.totalPrice)}</td>
                  <td className="px-4 py-3">
                    <Badge variant={statusBadge[p.status] || "default"}>{p.status}</Badge>
                  </td>
                  <td className="px-4 py-3 text-brand-text-muted">
                    {new Date(p.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link href={`/admin/proposals/${p.id}`}>
                      <Button variant="ghost" size="sm">View</Button>
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
