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
        console.error("API_KEY environment variable is not set on the server.");
        return res.status(500).json({ error: "Server configuration error: API key not found." });
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
    
    const response = await ai.models.generateContent({
      model,
      contents: { parts: [{ text: prompt }] },
      config: requestConfig,
    });
    
    const text = response.text;

    if (!text || text.trim() === '') {
         console.warn("Gemini API returned an empty response.");
         const fallbackText = lang === 'fa' 
            ? 'متاسفانه نتوانستم پاسخ مناسبی پیدا کنم. لطفاً سوال خود را به شکل دیگری بپرسید.'
            : 'Sorry, I couldn\'t find a suitable response. Please try asking in a different way.';
        return res.status(200).json({ text: fallbackText });
    }

    return res.status(200).json({ text: text.trim() });

  } catch (error) {
    console.error("Error in /api/generate:", error);
    const message = error instanceof Error ? error.message : "An unknown error occurred";
    return res.status(500).json({ error: "Failed to get response from AI", details: message });
  }
}
