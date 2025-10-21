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
    // The API key MUST be provided by the execution environment.
    // The hosting platform (like AI Studio) is responsible for injecting it.
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      console.error("API_KEY environment variable is not set. The application cannot contact the AI service.");
      // This error will be shown to the user in the chat window.
      throw new Error("API key is not configured. Please contact the administrator.");
    }

    const ai = new GoogleGenAI({ apiKey });
    
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            systemInstruction: getSystemInstruction(lang),
        }
    });

    const text = response.text;
    
    // Defensive check to ensure we received a valid text response.
    if (typeof text !== 'string' || text.trim() === '') {
        console.warn("Received an empty or invalid response from Gemini API:", response);
        // Fallback message in the correct language.
        return lang === 'fa' 
            ? 'متاسفانه نتوانستم پاسخ مناسبی پیدا کنم. لطفاً سوال خود را به شکل دیگری بپرسید.'
            : 'Sorry, I couldn\'t find a suitable response. Please try asking in a different way.';
    }

    return text;
    
  } catch (error) {
    console.error("An error occurred while calling the Gemini API:", error);
    // Re-throwing the error ensures the UI can catch it and display a generic error message.
    throw new Error("Failed to get response from the AI model.");
  }
};
