import twilio from "twilio";
import { env } from "../env.js";

if (
  !env.TWILIO_ACCOUNT_SID ||
  !env.TWILIO_AUTH_TOKEN ||
  !env.TWILIO_PHONE_NUMBER
) {
  throw new Error(
    "Missing Twilio environment variables. Check your .env file."
  );
}

export const twilioClient = twilio(
  env.TWILIO_ACCOUNT_SID,
  env.TWILIO_AUTH_TOKEN
);

export const twilioPhoneNumber = env.TWILIO_PHONE_NUMBER;

/**
 * Send an SMS message.
 */
export async function sendSMS(
  to: string,
  message: string
) {
  return await twilioClient.messages.create({
    body: message,
    from: twilioPhoneNumber,
    to,
  });
}

/**
 * Generate TwiML that speaks to the caller.
 */
export function createVoiceResponse(message: string): string {
  const response = new twilio.twiml.VoiceResponse();

  response.say(
    {
      voice: "Polly.Joanna",
    },
    message
  );

  return response.toString();
}

/**
 * Generate TwiML that asks a question and records speech input.
 */
export function createGatherResponse(
  message: string,
  actionUrl: string
): string {
  const response = new twilio.twiml.VoiceResponse();

  const gather = response.gather({
    input: ["speech"],
    speechTimeout: "auto",
    action: actionUrl,
    method: "POST",
  });

  gather.say(
    {
      voice: "Polly.Joanna",
    },
    message
  );

  return response.toString();
}

/**
 * Forward the current call to another phone number.
 */
export function createTransferResponse(
  phoneNumber: string
): string {
  const response = new twilio.twiml.VoiceResponse();

  response.say(
    {
      voice: "Polly.Joanna",
    },
    "Please hold while I connect your call."
  );

  response.dial(phoneNumber);

  return response.toString();
}
