"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrencyShort } from "@/lib/utils";

interface ClientDetail {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  notes: string | null;
  driveFolderId: string | null;
  createdAt: string;
  inquiries: Array<{
    id: string;
    serviceType: string;
    status: string;
    eventDate: string | null;
    createdAt: string;
  }>;
  proposals: Array<{
    id: string;
    status: string;
    totalPrice: number;
    createdAt: string;
    package: { name: string };
  }>;
}

export default function ClientDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [client, setClient] = useState<ClientDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", notes: "" });

  useEffect(() => {
    fetch(`/api/clients/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setClient(data);
        setForm({
          name: data.name,
          email: data.email,
          phone: data.phone || "",
          notes: data.notes || "",
        });
      })
      .finally(() => setLoading(false));
  }, [id]);

  async function saveChanges() {
    const res = await fetch(`/api/clients/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const updated = await res.json();
    setClient((prev) => (prev ? { ...prev, ...updated } : prev));
    setEditing(false);
  }

  if (loading) return <p className="text-brand-text-muted">Loading...</p>;
  if (!client) return <p className="text-brand-error">Client not found</p>;

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold">{client.name}</h2>
          <p className="text-brand-text-muted">{client.email}</p>
        </div>
        <Button variant="outline" onClick={() => setEditing(!editing)}>
          {editing ? "Cancel" : "Edit"}
        </Button>
      </div>

      {editing && (
        <Card>
          <CardContent className="space-y-4 pt-6">
            <Input label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <Input label="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <Input label="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            <Textarea label="Notes" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} rows={4} />
            <Button onClick={saveChanges}>Save Changes</Button>
          </CardContent>
        </Card>
      )}

      {!editing && client.notes && (
        <Card>
          <CardHeader><CardTitle>Notes</CardTitle></CardHeader>
          <CardContent>
            <p className="text-sm whitespace-pre-wrap">{client.notes}</p>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        {/* Inquiries */}
        <Card>
          <CardHeader><CardTitle>Inquiries ({client.inquiries.length})</CardTitle></CardHeader>
          <CardContent>
            {client.inquiries.length === 0 ? (
              <p className="text-sm text-brand-text-muted">No inquiries</p>
            ) : (
              <div className="space-y-3">
                {client.inquiries.map((inq) => (
                  <Link key={inq.id} href={`/admin/inquiries/${inq.id}`} className="flex items-center justify-between rounded-lg border border-white/8 p-3 hover:bg-white/5">
                    <div>
                      <Badge variant="outline" className="text-xs">{inq.serviceType.replace("_", " ")}</Badge>
                      <p className="text-xs text-brand-text-muted mt-1">{new Date(inq.createdAt).toLocaleDateString()}</p>
                    </div>
                    <Badge variant={inq.status === "BOOKED" ? "success" : "default"}>{inq.status}</Badge>
                  </Link>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Proposals */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Proposals ({client.proposals.length})</CardTitle>
              <Link href={`/admin/proposals/new?clientId=${client.id}`}>
                <Button size="sm">New Proposal</Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {client.proposals.length === 0 ? (
              <p className="text-sm text-brand-text-muted">No proposals</p>
            ) : (
              <div className="space-y-3">
                {client.proposals.map((prop) => (
                  <Link key={prop.id} href={`/admin/proposals/${prop.id}`} className="flex items-center justify-between rounded-lg border border-white/8 p-3 hover:bg-white/5">
                    <div>
                      <p className="text-sm font-medium">{prop.package.name}</p>
                      <p className="text-xs text-brand-text-muted">{formatCurrencyShort(prop.totalPrice)}</p>
                    </div>
                    <Badge variant={prop.status === "ACCEPTED" ? "success" : prop.status === "SENT" ? "accent" : "default"}>
                      {prop.status}
                    </Badge>
                  </Link>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
