import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import {
  createEvent,
  listUpcomingEvents,
  updateEvent,
  deleteEvent,
} from "@/lib/google/calendar";

// GET /api/calendar — list upcoming events
export async function GET(request: NextRequest) {
  await requireAdmin();

  const { searchParams } = request.nextUrl;
  const max = parseInt(searchParams.get("max") || "10");

  const events = await listUpcomingEvents(max);
  return NextResponse.json(events);
}

// POST /api/calendar — create an event
export async function POST(request: NextRequest) {
  await requireAdmin();

  const body = await request.json();

  if (!body.title || !body.startDateTime || !body.endDateTime) {
    return NextResponse.json(
      { error: "title, startDateTime, and endDateTime are required" },
      { status: 400 }
    );
  }

  const event = await createEvent({
    title: body.title,
    description: body.description,
    location: body.location,
    startDateTime: body.startDateTime,
    endDateTime: body.endDateTime,
    attendeeEmail: body.attendeeEmail,
  });

  if (!event) {
    return NextResponse.json(
      { error: "Google Calendar not configured" },
      { status: 503 }
    );
  }

  return NextResponse.json(event, { status: 201 });
}

// PATCH /api/calendar — update an event
export async function PATCH(request: NextRequest) {
  await requireAdmin();

  const body = await request.json();

  if (!body.eventId) {
    return NextResponse.json(
      { error: "eventId is required" },
      { status: 400 }
    );
  }

  const event = await updateEvent(body.eventId, {
    title: body.title,
    description: body.description,
    location: body.location,
    startDateTime: body.startDateTime,
    endDateTime: body.endDateTime,
  });

  if (!event) {
    return NextResponse.json(
      { error: "Google Calendar not configured" },
      { status: 503 }
    );
  }

  return NextResponse.json(event);
}

// DELETE /api/calendar — delete an event
export async function DELETE(request: NextRequest) {
  await requireAdmin();

  const { searchParams } = request.nextUrl;
  const eventId = searchParams.get("eventId");

  if (!eventId) {
    return NextResponse.json(
      { error: "eventId query param is required" },
      { status: 400 }
    );
  }

  await deleteEvent(eventId);
  return NextResponse.json({ success: true });
}
