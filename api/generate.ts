import { GoogleGenAI } from "@google/genai";

type Language = 'en' | 'fa';
type Location = { lat: number, lng: number };

const getSystemInstruction = (lang: Language): string => {
    if (lang === 'fa') {
        return "شما 'کافه گردی' هستید، یک دستیار هوش مصنوعی دوستانه و آگاه. هدف شما کمک به کاربران برای کشف کافه‌ها و رستوران‌ها و ارائه دستورالعمل‌های دقیق برای انواع قهوه، چای و سایر نوشیدنی‌ها است. همیشه با لحنی گرم و صمیمی پاسخ دهید. اگر کاربر در مورد مکان‌های نزدیک سوال کرد، از ابزار Google Maps برای ارائه پیشنهادات دقیق و مرتبط استفاده کنید. همیشه فقط به زبان فارسی پاسخ دهید.";
    }
    return "You are 'Cafegardee', a friendly and knowledgeable AI assistant. Your purpose is to help users discover cafes and restaurants, and to provide detailed recipes for a wide variety of coffees, teas, and other beverages. Always respond in a warm and inviting tone. If the user asks for nearby places, use the Google Maps tool to give accurate and relevant suggestions. Always respond only in English.";
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

        const requestPayload: any = {
            model: 'gemini-2.5-flash',
            contents: [{ role: 'user', parts: [{ text: prompt }] }],
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

        const response = await ai.models.generateContent(requestPayload);
        
        let text = response.text;

        // Per API requirements, we must display grounding sources if they are returned.
        const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
        if (groundingChunks && groundingChunks.length > 0) {
            const sources = groundingChunks
                .flatMap((chunk: any) => chunk.maps ? [{ title: chunk.maps.title, uri: chunk.maps.uri }] : [])
                .filter((source: any, index: number, self: any[]) => 
                    source.uri && index === self.findIndex((s) => s.uri === source.uri)
                );
        
            if (sources.length > 0) {
                const sourcesHeader = lang === 'fa' ? '\n\n**منابع:**' : '\n\n**Sources:**';
                const sourcesList = sources.map((source: any) => `* [${source.title || 'View on Google Maps'}](${source.uri})`).join('\n');
                text = text + sourcesHeader + '\n' + sourcesList;
            }
        }


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