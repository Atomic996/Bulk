
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const parseTwitterLinks = async (rawText: string) => {
  if (!process.env.API_KEY) {
      console.warn("No API Key found, skipping Gemini link parsing.");
      return [];
  }

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Extract valid Twitter/X profile URLs from the following text and return them as a JSON array of objects with 'url' and 'handle' properties. Text: ${rawText}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            url: { type: Type.STRING },
            handle: { type: Type.STRING }
          },
          required: ["url", "handle"]
        }
      }
    }
  });

  try {
    return JSON.parse(response.text || "[]");
  } catch (e) {
    console.error("Failed to parse Gemini response", e);
    return [];
  }
};
