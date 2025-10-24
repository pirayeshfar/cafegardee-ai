import { GoogleGenAI, GenerateContentRequest } from '@google/genai';
import type { Language } from '../types';

interface Location {
  lat: number;
  lng: number;
}

const getSystemInstruction = (lang: Language): string => {
    if (lang === 'fa') {
        return "شما 'کافه گردی' هستید، یک دستیار هوش مصنوعی دوستانه و آگاه. هدف شما کمک به کاربران برای کشف کافه‌ها و رستوران‌ها و ارائه دستورالعمل‌های دقیق برای انواع قهوه، چای و سایر نوشیدنی‌ها است. همیشه با لحنی گرم و صمیمی پاسخ دهید. اگر کاربر در مورد مکان‌های نزدیک سوال کرد، از ابزار Google Maps برای ارائه پیشنهادات دقیق و مرتبط استفاده کنید. همیشه فقط به زبان فارسی پاسخ دهید و پاسخ‌ها را با فرمت Markdown ارائه دهید.";
    }
    return "You are 'Cafegardee', a friendly and knowledgeable AI assistant. Your purpose is to help users discover cafes and restaurants, and to provide detailed recipes for a wide variety of coffees, teas, and other beverages. Always respond in a warm and inviting tone. If the user asks for nearby places, use the Google Maps tool to give accurate and relevant suggestions. Always respond only in English and format your responses using Markdown.";
};

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
const model = 'gemini-2.5-flash';

export const getBotResponse = async (prompt: string, lang: Language, location?: Location): Promise<string> => {
  try {
    const request: GenerateContentRequest = {
      model,
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      config: {
        systemInstruction: getSystemInstruction(lang),
      },
    };

    if (location && typeof location.lat === 'number' && typeof location.lng === 'number') {
      request.config.tools = [{ googleMaps: {} }];
      request.config.toolConfig = {
        retrievalConfig: {
          latLng: {
            latitude: location.lat,
            longitude: location.lng,
          },
        },
      };
    }
    
    const response = await ai.models.generateContent(request);
    const text = response.text?.trim();

    if (!text) {
         console.warn("Gemini API returned an empty or invalid response text.");
         const fallbackText = lang === 'fa' 
            ? 'متاسفانه نتوانستم پاسخ مناسبی پیدا کنم. لطفاً سوال خود را به شکل دیگری بپرسید.'
            : 'Sorry, I couldn\'t find a suitable response. Please try asking in a different way.';
        return fallbackText;
    }

    return text;

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to get response from AI");
  }
};
