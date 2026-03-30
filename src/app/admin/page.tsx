"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrencyShort } from "@/lib/utils";

interface Inquiry {
  id: string;
  name: string;
  status: string;
  serviceType: string;
  eventDate: string | null;
}

interface Proposal {
  id: string;
  status: string;
  totalPrice: number;
  client: { name: string };
  package: { name: string };
}

interface CalendarEvent {
  id: string;
  summary: string;
  location?: string;
  start: { dateTime?: string; date?: string };
  end: { dateTime?: string; date?: string };
}

const serviceLabel: Record<string, string> = {
  WEDDING: "Wedding",
  LIVE_SOUND: "Live Sound",
  SPEAKING_BOOK: "Speaking",
};

export default function AdminDashboard() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/inquiries").then((r) => r.json()),
      fetch("/api/proposals").then((r) => r.json()),
      fetch("/api/calendar?max=5").then((r) => r.json().catch(() => [])),
    ])
      .then(([inq, prop, ev]) => {
        setInquiries(inq);
        setProposals(Array.isArray(prop) ? prop : []);
        setEvents(Array.isArray(ev) ? ev : []);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="text-brand-text-muted">Loading dashboard...</p>;
  }

  const newInquiries = inquiries.filter((i) => i.status === "NEW").length;
  const booked = inquiries.filter((i) => i.status === "BOOKED").length;
  const pendingProposals = proposals.filter(
    (p) => p.status === "SENT" || p.status === "VIEWED"
  ).length;
  const bookedRevenue = proposals
    .filter((p) => p.status === "ACCEPTED")
    .reduce((sum, p) => sum + p.totalPrice, 0);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold font-heading text-brand-text">
        Dashboard
      </h1>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          label="New Inquiries"
          value={newInquiries}
          href="/admin/inquiries"
        />
        <StatCard
          label="Pending Proposals"
          value={pendingProposals}
          href="/admin/proposals"
        />
        <StatCard
          label="Booked Events"
          value={booked}
          href="/admin/pipeline"
        />
        <StatCard
          label="Booked Revenue"
          value={formatCurrencyShort(bookedRevenue)}
          href="/admin/proposals"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Upcoming Events */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Upcoming Events</CardTitle>
              <Badge variant="outline" className="text-[10px]">
                Google Calendar
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            {events.length === 0 ? (
              <p className="text-sm text-brand-text-muted">
                No upcoming events.{" "}
                {!events.length && (
                  <span>Connect Google Calendar to see your schedule.</span>
                )}
              </p>
            ) : (
              <div className="space-y-3">
                {events.map((event) => {
                  const start = event.start.dateTime || event.start.date || "";
                  const dateStr = start
                    ? new Date(start).toLocaleDateString("en-US", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                      })
                    : "";
                  const timeStr =
                    event.start.dateTime
                      ? new Date(event.start.dateTime).toLocaleTimeString(
                          "en-US",
                          { hour: "numeric", minute: "2-digit" }
                        )
                      : "All day";

                  return (
                    <div
                      key={event.id}
                      className="flex items-start gap-3 rounded-lg border border-white/8 bg-brand-surface p-3"
                    >
                      <div className="flex flex-col items-center min-w-[48px] rounded bg-brand-red/10 px-2 py-1">
                        <span className="text-[10px] uppercase text-brand-red font-semibold">
                          {dateStr.split(",")[0]}
                        </span>
                        <span className="text-lg font-bold text-brand-text leading-tight">
                          {start ? new Date(start).getDate() : ""}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-brand-text truncate">
                          {event.summary}
                        </p>
                        <p className="text-xs text-brand-text-muted">
                          {dateStr} &middot; {timeStr}
                        </p>
                        {event.location && (
                          <p className="text-xs text-brand-text-muted truncate mt-0.5">
                            {event.location}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Inquiries */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Inquiries</CardTitle>
              <Link
                href="/admin/inquiries"
                className="text-xs text-brand-red hover:text-brand-red-light"
              >
                View all
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {inquiries.length === 0 ? (
              <p className="text-sm text-brand-text-muted">
                No inquiries yet.
              </p>
            ) : (
              <div className="space-y-2">
                {inquiries.slice(0, 5).map((inq) => (
                  <Link
                    key={inq.id}
                    href={`/admin/inquiries/${inq.id}`}
                    className="flex items-center justify-between rounded-lg border border-white/8 bg-brand-surface p-3 hover:bg-white/5 transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div>
                        <p className="text-sm font-medium text-brand-text truncate">
                          {inq.name}
                        </p>
                        <p className="text-xs text-brand-text-muted">
                          {serviceLabel[inq.serviceType] || inq.serviceType}
                          {inq.eventDate &&
                            ` \u00B7 ${new Date(inq.eventDate).toLocaleDateString()}`}
                        </p>
                      </div>
                    </div>
                    <StatusDot status={inq.status} />
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

function StatCard({
  label,
  value,
  href,
}: {
  label: string;
  value: string | number;
  href: string;
}) {
  return (
    <Link href={href}>
      <Card hover>
        <p className="text-xs text-brand-text-muted uppercase tracking-wider mb-1">
          {label}
        </p>
        <p className="text-2xl font-bold text-brand-text tabular-nums">
          {value}
        </p>
      </Card>
    </Link>
  );
}

function StatusDot({ status }: { status: string }) {
  const colors: Record<string, string> = {
    NEW: "bg-brand-red",
    CONTACTED: "bg-amber-500",
    PROPOSAL_SENT: "bg-blue-500",
    BOOKED: "bg-brand-success",
    COMPLETED: "bg-emerald-600",
    ARCHIVED: "bg-gray-400",
    DECLINED: "bg-gray-400",
  };

  return (
    <span
      className={`w-2 h-2 rounded-full shrink-0 ${colors[status] || "bg-gray-400"}`}
      title={status}
    />
  );
}
