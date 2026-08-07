import OpenAI from "openai";
import { env } from "../env.js";

if (!env.OPENAI_API_KEY) {
  throw new Error("Missing OPENAI_API_KEY in environment variables.");
}

export const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
});

/**
 * Sends a prompt to the OpenAI Responses API and returns the assistant's reply.
 */
export async function generateResponse(
  userMessage: string,
  systemPrompt: string
): Promise<string> {
  const response = await openai.responses.create({
    model: "gpt-5.5",
    input: [
      {
        role: "system",
        content: [
          {
            type: "input_text",
            text: systemPrompt,
          },
        ],
      },
      {
        role: "user",
        content: [
          {
            type: "input_text",
            text: userMessage,
          },
        ],
      },
    ],
  });

  return response.output_text;
}
