import { GoogleGenAI, Content } from "@google/genai";

type Language = 'en' | 'fa';
type Location = { lat: number, lng: number };

const getSystemInstruction = (lang: Language): string => {
    if (lang === 'fa') {
        return "شما 'کافه گردی' هستید، یک دستیار هوش مصنوعی دوستانه و آگاه. هدف شما کمک به کاربران برای کشف کافه‌ها و رستوران‌ها و ارائه دستورالعمل‌های دقیق برای انواع قهوه، چای و سایر نوشیدنی‌ها است. همیشه با لحنی گرم و صمیمی پاسخ دهید. اگر کاربر در مورد مکان‌های نزدیک سوال کرد، از ابزار Google Maps برای ارائه پیشنهادات دقیق و مرتبط استفاده کنید. همیشه فقط به زبان فارسی پاسخ دهید و پاسخ‌ها را با فرمت Markdown ارائه دهید.";
    }
    return "You are 'Cafegardee', a friendly and knowledgeable AI assistant. Your purpose is to help users discover cafes and restaurants, and to provide detailed recipes for a wide variety of coffees, teas, and other beverages. Always respond in a warm and inviting tone. If the user asks for nearby places, use the Google Maps tool to give accurate and relevant suggestions. Always respond only in English and format your responses using Markdown.";
};

// This serverless function acts as a secure backend proxy to the Google Gemini API.
export default async function handler(request: Request) {
    console.log("Received request for /api/generate");
    if (request.method !== 'POST') {
        return new Response(JSON.stringify({ error: "Method not allowed" }), {
            status: 405,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    try {
        const { prompt, lang, location } = await request.json() as { prompt: string, lang: Language, location?: Location };

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

        const contents: Content[] = [{ role: 'user', parts: [{ text: prompt }] }];

        const requestPayload: any = {
            model: 'gemini-2.5-flash',
            contents: contents,
            config: {
                systemInstruction: getSystemInstruction(lang),
            },
        };
        
        // If location data is provided, enhance the request with Google Maps grounding.
        if (location && typeof location.lat === 'number' && typeof location.lng === 'number') {
            requestPayload.config.tools = [{ googleMaps: {} }];
            requestPayload.config.toolConfig = {
                retrievalConfig: {
                    latLng: {
                        latitude: location.lat,
                        longitude: location.lng,
                    },
                },
            };
        }
        
        console.log("Sending request to Gemini API...");
        const response = await ai.models.generateContent(requestPayload);
        console.log("Received response from Gemini API.");
        
        const text = response.text?.trim();

        // Provide a fallback if the response is empty
        if (!text) {
             console.warn("Gemini API returned an empty or invalid response text.");
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