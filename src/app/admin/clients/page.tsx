"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  createdAt: string;
  _count: { inquiries: number; proposals: number };
}

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);

    const debounce = setTimeout(() => {
      setLoading(true);
      fetch(`/api/clients?${params}`)
        .then((res) => res.json())
        .then(setClients)
        .finally(() => setLoading(false));
    }, 300);

    return () => clearTimeout(debounce);
  }, [search]);

  return (
    <div className="space-y-6">
      <div className="flex items-end gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search clients..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-brand-border bg-white">
        <table className="w-full text-sm">
          <thead className="border-b border-brand-border bg-gray-50/50">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-brand-text-muted">Name</th>
              <th className="px-4 py-3 text-left font-medium text-brand-text-muted">Email</th>
              <th className="px-4 py-3 text-left font-medium text-brand-text-muted">Phone</th>
              <th className="px-4 py-3 text-center font-medium text-brand-text-muted">Inquiries</th>
              <th className="px-4 py-3 text-center font-medium text-brand-text-muted">Proposals</th>
              <th className="px-4 py-3 text-right font-medium text-brand-text-muted"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-border">
            {loading ? (
              <tr><td colSpan={6} className="px-4 py-8 text-center text-brand-text-muted">Loading...</td></tr>
            ) : clients.length === 0 ? (
              <tr><td colSpan={6} className="px-4 py-8 text-center text-brand-text-muted">No clients found</td></tr>
            ) : (
              clients.map((client) => (
                <tr key={client.id} className="hover:bg-gray-50/50">
                  <td className="px-4 py-3 font-medium">{client.name}</td>
                  <td className="px-4 py-3 text-brand-text-muted">{client.email}</td>
                  <td className="px-4 py-3 text-brand-text-muted">{client.phone || "—"}</td>
                  <td className="px-4 py-3 text-center">{client._count.inquiries}</td>
                  <td className="px-4 py-3 text-center">{client._count.proposals}</td>
                  <td className="px-4 py-3 text-right">
                    <Link href={`/admin/clients/${client.id}`}>
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
