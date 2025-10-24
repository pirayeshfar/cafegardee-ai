import { GoogleGenAI } from '@google/genai';
import type { VercelRequest, VercelResponse } from '@vercel/node';

type Language = 'en' | 'fa';

interface Location {
  lat: number;
  lng: number;
}

const getSystemInstruction = (lang: Language): string => {
    if (lang === 'fa') {
        return "You are 'Cafegardee', a friendly and knowledgeable AI assistant. Your purpose is to help users discover cafes and restaurants, and to provide detailed recipes for a wide variety of coffees, teas, and other beverages. Always respond in a warm and inviting tone. If the user asks for nearby places, use the Google Maps tool to give accurate and relevant suggestions. Always respond only in Persian and format your responses using Markdown.";
    }
    return "You are 'Cafegardee', a friendly and knowledgeable AI assistant. Your purpose is to help users discover cafes and restaurants, and to provide detailed recipes for a wide variety of coffees, teas, and other beverages. Always respond in a warm and inviting tone. If the user asks for nearby places, use the Google Maps tool to give accurate and relevant suggestions. Always respond only in English and format your responses using Markdown.";
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { prompt, lang, location } = req.body as { prompt: string; lang: Language; location?: Location };
    
    if (!prompt || !lang) {
      return res.status(400).json({ error: 'Missing prompt or lang in request body' });
    }

    if (!process.env.API_KEY) {
        console.error("CRITICAL: API_KEY environment variable is not set on the server.");
        return res.status(500).json({ error: "Server configuration error: The API_KEY environment variable is not set. Please configure it in your hosting provider's settings." });
    }

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const model = 'gemini-2.5-flash';
    
    const requestConfig: {
      systemInstruction: string;
      tools?: any[];
      toolConfig?: any;
    } = {
      systemInstruction: getSystemInstruction(lang),
    };

    if (location && typeof location.lat === 'number' && typeof location.lng === 'number') {
      requestConfig.tools = [{ googleMaps: {} }];
      requestConfig.toolConfig = {
        retrievalConfig: {
          latLng: {
            latitude: location.lat,
            longitude: location.lng,
          },
        },
      };
    }
    
    const stream = await ai.models.generateContentStream({
      model,
      contents: { parts: [{ text: prompt }] },
      config: requestConfig,
    });
    
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Transfer-Encoding', 'chunked');

    for await (const chunk of stream) {
      if (chunk.text) {
        res.write(chunk.text);
      }
    }

    res.end();

  } catch (error) {
    console.error("Error in /api/generate handler:", error);
    // If headers are already sent, we can't send a JSON error. Just end the stream.
    if (!res.headersSent) {
      const message = error instanceof Error ? error.message : "An unknown error occurred";
      res.status(500).json({ error: "Failed to get response from AI", details: message });
    } else {
      res.end();
    }
  }
}
