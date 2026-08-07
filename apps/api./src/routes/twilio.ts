import { Router, Request, Response } from "express";
import twilio from "twilio";

const router = Router();

/**
 * Incoming phone call.
 *
 * Instead of speaking directly to the caller,
 * Twilio connects the call to our realtime WebSocket server.
 */
router.post("/voice", (req: Request, res: Response) => {
  const response = new twilio.twiml.VoiceResponse();

  response.say(
    {
      voice: "Polly.Joanna",
    },
    "Welcome to Guard Landscaping. Please hold while I connect you to our AI assistant."
  );

  response.connect().stream({
    url: `wss://${req.headers.host}/media-stream`,
  });

  res.type("text/xml");
  res.send(response.toString());
});

export default router;
