"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

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
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", notes: "" });
  const [formError, setFormError] = useState("");
  const [formSubmitting, setFormSubmitting] = useState(false);

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

  async function handleCreateClient() {
    setFormSubmitting(true);
    setFormError("");
    try {
      const res = await fetch("/api/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to create client");
      }
      const newClient = await res.json();
      setClients((prev) => [{ ...newClient, _count: newClient._count ?? { inquiries: 0, proposals: 0 } }, ...prev]);
      setShowForm(false);
      setFormData({ name: "", email: "", phone: "", notes: "" });
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setFormSubmitting(false);
    }
  }

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
        <Button
          variant={showForm ? "ghost" : "primary"}
          size="sm"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Cancel" : "Add Client"}
        </Button>
      </div>

      {showForm && (
        <div className="rounded-xl border border-white/8 bg-brand-card p-5 space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-brand-text-muted">New Client</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              label="Name"
              id="new-client-name"
              placeholder="e.g., Jane Smith"
              value={formData.name}
              onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
              required
            />
            <Input
              label="Email"
              id="new-client-email"
              type="email"
              placeholder="e.g., jane@example.com"
              value={formData.email}
              onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
              required
            />
            <Input
              label="Phone (optional)"
              id="new-client-phone"
              type="tel"
              placeholder="e.g., (814) 555-1234"
              value={formData.phone}
              onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))}
            />
          </div>
          <Textarea
            label="Notes (optional)"
            id="new-client-notes"
            placeholder="Any notes about this client..."
            value={formData.notes}
            onChange={(e) => setFormData((p) => ({ ...p, notes: e.target.value }))}
            rows={2}
          />
          {formError && (
            <p className="text-sm text-brand-error bg-red-500/10 rounded-lg p-3" role="alert">{formError}</p>
          )}
          <div className="flex gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setShowForm(false);
                setFormData({ name: "", email: "", phone: "", notes: "" });
                setFormError("");
              }}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={handleCreateClient}
              disabled={formSubmitting || !formData.name || !formData.email}
            >
              {formSubmitting ? "Creating..." : "Create Client"}
            </Button>
          </div>
        </div>
      )}

      <div className="overflow-x-auto rounded-xl border border-white/8 bg-brand-card">
        <table className="w-full text-sm">
          <thead className="border-b border-white/8 bg-white/3">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-brand-text-muted">Name</th>
              <th className="px-4 py-3 text-left font-medium text-brand-text-muted">Email</th>
              <th className="px-4 py-3 text-left font-medium text-brand-text-muted">Phone</th>
              <th className="px-4 py-3 text-center font-medium text-brand-text-muted">Inquiries</th>
              <th className="px-4 py-3 text-center font-medium text-brand-text-muted">Proposals</th>
              <th className="px-4 py-3 text-right font-medium text-brand-text-muted"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/8">
            {loading ? (
              <tr><td colSpan={6} className="px-4 py-8 text-center text-brand-text-muted">Loading...</td></tr>
            ) : clients.length === 0 ? (
              <tr><td colSpan={6} className="px-4 py-8 text-center text-brand-text-muted">No clients found</td></tr>
            ) : (
              clients.map((client) => (
                <tr key={client.id} className="hover:bg-white/5">
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
