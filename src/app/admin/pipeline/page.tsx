"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Select } from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface PipelineInquiry {
  id: string;
  name: string;
  email: string;
  serviceType: string;
  status: string;
  eventDate: string | null;
  createdAt: string;
}

const columns = [
  { status: "NEW", label: "New", color: "bg-brand-purple" },
  { status: "CONTACTED", label: "Contacted", color: "bg-brand-gold" },
  { status: "PROPOSAL_SENT", label: "Proposal Sent", color: "bg-amber-500" },
  { status: "BOOKED", label: "Booked", color: "bg-brand-success" },
  { status: "COMPLETED", label: "Completed", color: "bg-emerald-600" },
  { status: "ARCHIVED", label: "Archived", color: "bg-gray-400" },
];

const serviceTypeLabel: Record<string, string> = {
  WEDDING: "Wedding",
  LIVE_SOUND: "Live Sound",
  SPEAKING_BOOK: "Speaking",
};

const statusOptions = columns.map((c) => ({ value: c.status, label: c.label }));

export default function PipelinePage() {
  const [inquiries, setInquiries] = useState<PipelineInquiry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/inquiries")
      .then((r) => r.json())
      .then(setInquiries)
      .finally(() => setLoading(false));
  }, []);

  async function updateStatus(id: string, status: string) {
    await fetch(`/api/inquiries/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setInquiries((prev) =>
      prev.map((inq) => (inq.id === id ? { ...inq, status } : inq))
    );
  }

  if (loading) return <p className="text-brand-text-muted">Loading pipeline...</p>;

  return (
    <div className="flex gap-4 overflow-x-auto pb-4 -mx-6 px-6">
      {columns.map((col) => {
        const items = inquiries.filter((inq) => inq.status === col.status);
        return (
          <div key={col.status} className="flex-shrink-0 w-72">
            {/* Column header */}
            <div className="flex items-center gap-2 mb-3">
              <div className={cn("w-2.5 h-2.5 rounded-full", col.color)} />
              <h3 className="text-sm font-semibold text-brand-text">{col.label}</h3>
              <span className="text-xs text-brand-text-muted bg-gray-100 rounded-full px-2 py-0.5">
                {items.length}
              </span>
            </div>

            {/* Cards */}
            <div className="space-y-2">
              {items.length === 0 ? (
                <div className="rounded-lg border border-dashed border-brand-border p-4 text-center text-xs text-brand-text-muted">
                  No inquiries
                </div>
              ) : (
                items.map((inq) => (
                  <div
                    key={inq.id}
                    className="rounded-lg border border-brand-border bg-white p-3 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <Link
                        href={`/admin/inquiries/${inq.id}`}
                        className="text-sm font-medium text-brand-text hover:text-brand-purple"
                      >
                        {inq.name}
                      </Link>
                      <Badge variant="outline" className="text-[10px] ml-2">
                        {serviceTypeLabel[inq.serviceType]}
                      </Badge>
                    </div>
                    {inq.eventDate && (
                      <p className="text-xs text-brand-text-muted mb-2">
                        {new Date(inq.eventDate).toLocaleDateString()}
                      </p>
                    )}
                    <Select
                      options={statusOptions}
                      value={inq.status}
                      onChange={(e) => updateStatus(inq.id, e.target.value)}
                      className="text-xs py-1"
                    />
                  </div>
                ))
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
