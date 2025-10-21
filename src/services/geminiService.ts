import { GoogleGenAI } from "@google/genai";
import type { Language } from '../types';

const getSystemInstruction = (lang: Language): string => {
    if (lang === 'fa') {
        return "شما 'کافه گردی' هستید، یک دستیار هوش مصنوعی دوستانه و آگاه. هدف شما کمک به کاربران برای کشف کافه‌ها و رستوران‌ها و ارائه دستورالعمل‌های دقیق برای انواع قهوه، چای و سایر نوشیدنی‌ها است. همیشه با لحنی گرم و صمیمی پاسخ دهید. اگر کاربر در مورد مکان‌های نزدیک سوال کرد، از اطلاعات مکان ارائه شده برای ارائه پیشنهادات مرتبط استفاده کنید. همیشه فقط به زبان فارسی پاسخ دهید.";
    }
    return "You are 'Cafegardee', a friendly and knowledgeable AI assistant. Your purpose is to help users discover cafes and restaurants, and to provide detailed recipes for a wide variety of coffees, teas, and other beverages. Always respond in a warm and inviting tone. If the user asks for nearby places, use the provided location information to give relevant suggestions. Always respond only in English.";
};

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getBotResponse = async (prompt: string, lang: Language): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            systemInstruction: getSystemInstruction(lang),
        }
    });

    return response.text;
    
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to get response from AI");
  }
};
