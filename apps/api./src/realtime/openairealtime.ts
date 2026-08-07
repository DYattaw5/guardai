import WebSocket from "ws";
import { env } from "../env.js";

const REALTIME_MODEL = "gpt-realtime";

export class OpenAIRealtimeClient {
  private ws: WebSocket | null = null;

  constructor(
    private onMessage: (message: any) => void
  ) {}

  connect() {
    this.ws = new WebSocket(
      `wss://api.openai.com/v1/realtime?model=${REALTIME_MODEL}`,
      {
        headers: {
          Authorization: `Bearer ${env.OPENAI_API_KEY}`,
          "OpenAI-Beta": "realtime=v1"
        }
      }
    );

    this.ws.on("open", () => {
      console.log("✅ Connected to OpenAI Realtime");

      this.initializeSession();
    });

    this.ws.on("message", (data) => {
      try {
        const message = JSON.parse(data.toString());

        this.onMessage(message);

      } catch (err) {
        console.error("Realtime Parse Error", err);
      }
    });

    this.ws.on("close", () => {
      console.log("Realtime connection closed.");
    });

    this.ws.on("error", (err) => {
      console.error(err);
    });
  }

  initializeSession() {
    if (!this.ws) return;

    this.ws.send(
      JSON.stringify({
        type: "session.update",
        session: {
          instructions:
            "You are the AI receptionist for Guard Landscaping. Speak naturally, be friendly, schedule appointments, collect customer information, and never mention you are using AI unless asked.",

          voice: "alloy",

          modalities: ["text", "audio"],

          input_audio_format: "g711_ulaw",

          output_audio_format: "g711_ulaw",

          temperature: 0.7
        }
      })
    );
  }

  send(event: any) {
    if (!this.ws) return;

    this.ws.send(JSON.stringify(event));
  }

  disconnect() {
    this.ws?.close();
  }
}
