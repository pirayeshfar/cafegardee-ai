import { GoogleGenAI } from "@google/genai";

type Language = 'en' | 'fa';

const getSystemInstruction = (lang: Language): string => {
    if (lang === 'fa') {
        return "شما 'کافه گردی' هستید، یک دستیار هوش مصنوعی دوستانه و آگاه. هدف شما کمک به کاربران برای کشف کافه‌ها و رستوران‌ها و ارائه دستورالعمل‌های دقیق برای انواع قهوه، چای و سایر نوشیدنی‌ها است. همیشه با لحنی گرم و صمیمی پاسخ دهید. اگر کاربر در مورد مکان‌های نزدیک سوال کرد، از اطلاعات مکان ارائه شده برای ارائه پیشنهادات مرتبط استفاده کنید. همیشه فقط به زبان فارسی پاسخ دهید.";
    }
    return "You are 'Cafegardee', a friendly and knowledgeable AI assistant. Your purpose is to help users discover cafes and restaurants, and to provide detailed recipes for a wide variety of coffees, teas, and other beverages. Always respond in a warm and inviting tone. If the user asks for nearby places, use the provided location information to give relevant suggestions. Always respond only in English.";
};

// This serverless function acts as a secure backend proxy to the Google Gemini API.
export default async function handler(request: Request) {
    if (request.method !== 'POST') {
        return new Response(JSON.stringify({ error: "Method not allowed" }), {
            status: 405,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    try {
        const { prompt, lang } = await request.json() as { prompt: string, lang: Language };

        if (!prompt || !lang) {
            return new Response(JSON.stringify({ error: "Missing prompt or language in request body" }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }
        
        const apiKey = process.env.API_KEY;
        if (!apiKey) {
            console.error("API_KEY environment variable is not set on the server.");
            return new Response(JSON.stringify({ error: "Server configuration error: API key not found." }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const ai = new GoogleGenAI({ apiKey });

        // Use the dedicated Chat API for a more robust conversational experience
        const chat = ai.chats.create({
            model: 'gemini-2.5-flash',
            config: {
                systemInstruction: getSystemInstruction(lang),
            },
        });
        
        const response = await chat.sendMessage({ message: prompt });
        const text = response.text;

        // Provide a fallback if the response is empty
        if (typeof text !== 'string' || text.trim() === '') {
             const fallbackText = lang === 'fa' 
                ? 'متاسفانه نتوانستم پاسخ مناسبی پیدا کنم. لطفاً سوال خود را به شکل دیگری بپرسید.'
                : 'Sorry, I couldn\'t find a suitable response. Please try asking in a different way.';
            return new Response(JSON.stringify({ text: fallbackText }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        return new Response(JSON.stringify({ text }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error) {
        console.error("Error in /api/generate handler:", error);
        return new Response(JSON.stringify({ error: "An internal error occurred while contacting the AI service." }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
