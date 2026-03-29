"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface InquiryDetail {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  serviceType: string;
  status: string;
  eventDate: string | null;
  venue: string | null;
  guestCount: number | null;
  partnerName: string | null;
  eventType: string | null;
  attendees: number | null;
  topic: string | null;
  audience: string | null;
  message: string | null;
  createdAt: string;
  client: { id: string; name: string; email: string } | null;
  clientId: string | null;
}

const statusOptions = [
  { value: "NEW", label: "New" },
  { value: "CONTACTED", label: "Contacted" },
  { value: "PROPOSAL_SENT", label: "Proposal Sent" },
  { value: "BOOKED", label: "Booked" },
  { value: "COMPLETED", label: "Completed" },
  { value: "DECLINED", label: "Declined" },
  { value: "ARCHIVED", label: "Archived" },
];

const serviceTypeLabel: Record<string, string> = {
  WEDDING: "Wedding",
  LIVE_SOUND: "Live Sound / AV",
  SPEAKING_BOOK: "Speaking / Book",
};

export default function InquiryDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [inquiry, setInquiry] = useState<InquiryDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [converting, setConverting] = useState(false);

  useEffect(() => {
    fetch(`/api/inquiries/${id}`)
      .then((res) => res.json())
      .then(setInquiry)
      .finally(() => setLoading(false));
  }, [id]);

  async function updateStatus(status: string) {
    const res = await fetch(`/api/inquiries/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    const data = await res.json();
    setInquiry(data);
  }

  async function convertToClient() {
    if (!inquiry) return;
    setConverting(true);

    const res = await fetch("/api/clients", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: inquiry.name,
        email: inquiry.email,
        phone: inquiry.phone,
        inquiryId: inquiry.id,
      }),
    });

    if (res.ok) {
      const client = await res.json();
      router.push(`/admin/clients/${client.id}`);
    }
    setConverting(false);
  }

  if (loading) return <p className="text-brand-text-muted">Loading...</p>;
  if (!inquiry) return <p className="text-brand-error">Inquiry not found</p>;

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold">{inquiry.name}</h2>
          <p className="text-brand-text-muted">{inquiry.email}</p>
          {inquiry.phone && <p className="text-sm text-brand-text-muted">{inquiry.phone}</p>}
        </div>
        <div className="flex items-center gap-3">
          <Select
            options={statusOptions}
            value={inquiry.status}
            onChange={(e) => updateStatus(e.target.value)}
          />
          {!inquiry.clientId && (
            <Button onClick={convertToClient} disabled={converting}>
              {converting ? "Converting..." : "Convert to Client"}
            </Button>
          )}
          {inquiry.clientId && (
            <Button
              variant="outline"
              onClick={() => router.push(`/admin/clients/${inquiry.clientId}`)}
            >
              View Client
            </Button>
          )}
        </div>
      </div>

      {/* Details */}
      <div className="grid gap-6 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Inquiry Details</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-3 text-sm">
              <div>
                <dt className="text-brand-text-muted">Service Type</dt>
                <dd>
                  <Badge variant="red">
                    {serviceTypeLabel[inquiry.serviceType]}
                  </Badge>
                </dd>
              </div>
              {inquiry.eventDate && (
                <div>
                  <dt className="text-brand-text-muted">Event Date</dt>
                  <dd>{new Date(inquiry.eventDate).toLocaleDateString()}</dd>
                </div>
              )}
              {inquiry.venue && (
                <div>
                  <dt className="text-brand-text-muted">Venue</dt>
                  <dd>{inquiry.venue}</dd>
                </div>
              )}
              {inquiry.partnerName && (
                <div>
                  <dt className="text-brand-text-muted">Partner</dt>
                  <dd>{inquiry.partnerName}</dd>
                </div>
              )}
              {inquiry.guestCount && (
                <div>
                  <dt className="text-brand-text-muted">Guest Count</dt>
                  <dd>{inquiry.guestCount}</dd>
                </div>
              )}
              {inquiry.eventType && (
                <div>
                  <dt className="text-brand-text-muted">Event Type</dt>
                  <dd>{inquiry.eventType}</dd>
                </div>
              )}
              {inquiry.attendees && (
                <div>
                  <dt className="text-brand-text-muted">Attendees</dt>
                  <dd>{inquiry.attendees}</dd>
                </div>
              )}
              {inquiry.topic && (
                <div>
                  <dt className="text-brand-text-muted">Topic</dt>
                  <dd>{inquiry.topic}</dd>
                </div>
              )}
              {inquiry.audience && (
                <div>
                  <dt className="text-brand-text-muted">Audience</dt>
                  <dd>{inquiry.audience}</dd>
                </div>
              )}
              <div>
                <dt className="text-brand-text-muted">Submitted</dt>
                <dd>{new Date(inquiry.createdAt).toLocaleDateString()}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        {inquiry.message && (
          <Card>
            <CardHeader>
              <CardTitle>Message</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-brand-text whitespace-pre-wrap">
                {inquiry.message}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
