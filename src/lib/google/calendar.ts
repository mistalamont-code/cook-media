import { google } from "googleapis";
import { getAuthenticatedClient } from "./auth";

function getCalendar() {
  const auth = getAuthenticatedClient();
  if (!auth) return null;
  return google.calendar({ version: "v3", auth });
}

/** Create a calendar event for a booked client */
export async function createEvent({
  title,
  description,
  location,
  startDateTime,
  endDateTime,
  attendeeEmail,
}: {
  title: string;
  description?: string;
  location?: string;
  startDateTime: string; // ISO 8601
  endDateTime: string;   // ISO 8601
  attendeeEmail?: string;
}) {
  const calendar = getCalendar();
  if (!calendar) {
    console.log("[Calendar] No auth — skipping event creation:", title);
    return null;
  }

  const event = await calendar.events.insert({
    calendarId: "primary",
    requestBody: {
      summary: title,
      description,
      location,
      start: { dateTime: startDateTime, timeZone: "America/New_York" },
      end: { dateTime: endDateTime, timeZone: "America/New_York" },
      attendees: attendeeEmail ? [{ email: attendeeEmail }] : undefined,
      reminders: {
        useDefault: false,
        overrides: [
          { method: "email", minutes: 1440 }, // 1 day before
          { method: "popup", minutes: 60 },    // 1 hour before
        ],
      },
    },
  });

  console.log("[Calendar] Event created:", event.data.id);
  return event.data;
}

/** List upcoming events */
export async function listUpcomingEvents(maxResults = 10) {
  const calendar = getCalendar();
  if (!calendar) {
    console.log("[Calendar] No auth — skipping event list");
    return [];
  }

  const res = await calendar.events.list({
    calendarId: "primary",
    timeMin: new Date().toISOString(),
    maxResults,
    singleEvents: true,
    orderBy: "startTime",
  });

  return res.data.items || [];
}

/** Update an existing calendar event */
export async function updateEvent(
  eventId: string,
  updates: {
    title?: string;
    description?: string;
    location?: string;
    startDateTime?: string;
    endDateTime?: string;
  }
) {
  const calendar = getCalendar();
  if (!calendar) {
    console.log("[Calendar] No auth — skipping event update:", eventId);
    return null;
  }

  const event = await calendar.events.patch({
    calendarId: "primary",
    eventId,
    requestBody: {
      ...(updates.title && { summary: updates.title }),
      ...(updates.description && { description: updates.description }),
      ...(updates.location && { location: updates.location }),
      ...(updates.startDateTime && {
        start: { dateTime: updates.startDateTime, timeZone: "America/New_York" },
      }),
      ...(updates.endDateTime && {
        end: { dateTime: updates.endDateTime, timeZone: "America/New_York" },
      }),
    },
  });

  return event.data;
}

/** Delete a calendar event */
export async function deleteEvent(eventId: string) {
  const calendar = getCalendar();
  if (!calendar) {
    console.log("[Calendar] No auth — skipping event delete:", eventId);
    return;
  }

  await calendar.events.delete({
    calendarId: "primary",
    eventId,
  });

  console.log("[Calendar] Event deleted:", eventId);
}
