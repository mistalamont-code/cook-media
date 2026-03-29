"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

interface Inquiry {
  id: string;
  name: string;
  email: string;
  serviceType: string;
  status: string;
  eventDate: string | null;
  createdAt: string;
  client: { id: string; name: string } | null;
}

const statusBadgeVariant: Record<string, "default" | "red" | "success" | "warning" | "error"> = {
  NEW: "red",
  CONTACTED: "red",
  PROPOSAL_SENT: "warning",
  BOOKED: "success",
  COMPLETED: "success",
  DECLINED: "error",
  ARCHIVED: "default",
};

const serviceTypeLabel: Record<string, string> = {
  WEDDING: "Wedding",
  LIVE_SOUND: "Live Sound",
  SPEAKING_BOOK: "Speaking / Book",
};

const statusOptions = [
  { value: "", label: "All Statuses" },
  { value: "NEW", label: "New" },
  { value: "CONTACTED", label: "Contacted" },
  { value: "PROPOSAL_SENT", label: "Proposal Sent" },
  { value: "BOOKED", label: "Booked" },
  { value: "COMPLETED", label: "Completed" },
  { value: "DECLINED", label: "Declined" },
  { value: "ARCHIVED", label: "Archived" },
];

const serviceTypeOptions = [
  { value: "", label: "All Services" },
  { value: "WEDDING", label: "Wedding" },
  { value: "LIVE_SOUND", label: "Live Sound" },
  { value: "SPEAKING_BOOK", label: "Speaking / Book" },
];

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("");
  const [serviceFilter, setServiceFilter] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchInquiries() {
      setLoading(true);
      const params = new URLSearchParams();
      if (statusFilter) params.set("status", statusFilter);
      if (serviceFilter) params.set("serviceType", serviceFilter);
      if (search) params.set("search", search);

      const res = await fetch(`/api/inquiries?${params}`);
      const data = await res.json();
      setInquiries(data);
      setLoading(false);
    }

    const debounce = setTimeout(fetchInquiries, 300);
    return () => clearTimeout(debounce);
  }, [statusFilter, serviceFilter, search]);

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-wrap items-end gap-4">
        <div className="flex-1 min-w-[200px]">
          <Input
            placeholder="Search by name, email, or venue..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Select
          options={statusOptions}
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        />
        <Select
          options={serviceTypeOptions}
          value={serviceFilter}
          onChange={(e) => setServiceFilter(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-white/8 bg-brand-card">
        <table className="w-full text-sm">
          <thead className="border-b border-white/8 bg-white/3">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-brand-text-muted">Name</th>
              <th className="px-4 py-3 text-left font-medium text-brand-text-muted">Service</th>
              <th className="px-4 py-3 text-left font-medium text-brand-text-muted">Status</th>
              <th className="px-4 py-3 text-left font-medium text-brand-text-muted">Event Date</th>
              <th className="px-4 py-3 text-left font-medium text-brand-text-muted">Submitted</th>
              <th className="px-4 py-3 text-right font-medium text-brand-text-muted"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/8">
            {loading ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-brand-text-muted">
                  Loading...
                </td>
              </tr>
            ) : inquiries.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-brand-text-muted">
                  No inquiries found
                </td>
              </tr>
            ) : (
              inquiries.map((inq) => (
                <tr key={inq.id} className="hover:bg-white/5">
                  <td className="px-4 py-3">
                    <div>
                      <p className="font-medium text-brand-text">{inq.name}</p>
                      <p className="text-xs text-brand-text-muted">{inq.email}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant="outline">{serviceTypeLabel[inq.serviceType] || inq.serviceType}</Badge>
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={statusBadgeVariant[inq.status] || "default"}>
                      {inq.status.replace("_", " ")}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-brand-text-muted">
                    {inq.eventDate
                      ? new Date(inq.eventDate).toLocaleDateString()
                      : "—"}
                  </td>
                  <td className="px-4 py-3 text-brand-text-muted">
                    {new Date(inq.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link href={`/admin/inquiries/${inq.id}`}>
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
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
