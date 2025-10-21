import { GoogleGenAI } from "@google/genai";
import type { Language } from '../types';

// Helper function to get system instruction based on language
const getSystemInstruction = (lang: Language): string => {
    if (lang === 'fa') {
        return "شما 'کافه گردی' هستید، یک دستیار هوش مصنوعی دوستانه و آگاه. هدف شما کمک به کاربران برای کشف کافه‌ها و رستوران‌ها و ارائه دستورالعمل‌های دقیق برای انواع قهوه، چای و سایر نوشیدنی‌ها است. همیشه با لحنی گرم و صمیمی پاسخ دهید. اگر کاربر در مورد مکان‌های نزدیک سوال کرد، از اطلاعات مکان ارائه شده برای ارائه پیشنهادات مرتبط استفاده کنید. همیشه فقط به زبان فارسی پاسخ دهید.";
    }
    return "You are 'Cafegardee', a friendly and knowledgeable AI assistant. Your purpose is to help users discover cafes and restaurants, and to provide detailed recipes for a wide variety of coffees, teas, and other beverages. Always respond in a warm and inviting tone. If the user asks for nearby places, use the provided location information to give relevant suggestions. Always respond only in English.";
};

// This function now handles the direct API call
export const getBotResponse = async (prompt: string, lang: Language): Promise<string> => {
  try {
    // API key is securely provided by the execution environment
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      console.error("API_KEY is not set in the environment variables.");
      throw new Error("API key not configured.");
    }

    // Initialize the Gemini AI client for each request to ensure the latest key is used
    const ai = new GoogleGenAI({ apiKey });
    
    // Call the Gemini API directly from the client-side
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
