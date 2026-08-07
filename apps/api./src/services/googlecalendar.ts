import { google } from "googleapis";
import { env } from "../env.js";

const auth = new google.auth.OAuth2(
  env.GOOGLE_CLIENT_ID,
  env.GOOGLE_CLIENT_SECRET,
  env.GOOGLE_REDIRECT_URI
);

export const calendar = google.calendar({
  version: "v3",
  auth,
});

export async function getAvailableEvents() {
  const now = new Date();

  const response = await calendar.events.list({
    calendarId: "primary",
    timeMin: now.toISOString(),
    maxResults: 20,
    singleEvents: true,
    orderBy: "startTime",
  });

  return response.data.items || [];
}

export async function createAppointment({
  customerName,
  phone,
  address,
  service,
  start,
  end,
}: {
  customerName: string;
  phone: string;
  address: string;
  service: string;
  start: string;
  end: string;
}) {
  const event = await calendar.events.insert({
    calendarId: "primary",
    requestBody: {
      summary: `${service} - ${customerName}`,
      description: `
Customer: ${customerName}

Phone: ${phone}

Address: ${address}

Service: ${service}
      `,
      start: {
        dateTime: start,
      },
      end: {
        dateTime: end,
      },
    },
  });

  return event.data;
}
