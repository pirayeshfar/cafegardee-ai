import { GoogleGenAI } from "@google/genai";

// This is a Vercel Edge Function for speed
export const config = {
  runtime: 'edge',
};

// Helper function to get system instruction based on language
const getSystemInstruction = (lang: string): string => {
    if (lang === 'fa') {
        return "شما 'کافه گردی' هستید، یک دستیار هوش مصنوعی دوستانه و آگاه. هدف شما کمک به کاربران برای کشف کافه‌ها و رستوران‌ها و ارائه دستورالعمل‌های دقیق برای انواع قهوه، چای و سایر نوشیدنی‌ها است. همیشه با لحنی گرم و صمیمی پاسخ دهید. اگر کاربر در مورد مکان‌های نزدیک سوال کرد، از اطلاعات مکان ارائه شده برای ارائه پیشنهادات مرتبط استفاده کنید. همیشه فقط به زبان فارسی پاسخ دهید.";
    }
    return "You are 'Cafegardee', a friendly and knowledgeable AI assistant. Your purpose is to help users discover cafes and restaurants, and to provide detailed recipes for a wide variety of coffees, teas, and other beverages. Always respond in a warm and inviting tone. If the user asks for nearby places, use the provided location information to give relevant suggestions. Always respond only in English.";
};

// The main function that handles incoming requests
export default async function handler(request: Request) {
  // Only allow POST requests
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
  }

  // Securely get the API key from environment variables on the server
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.error('API_KEY environment variable not set');
    return new Response(JSON.stringify({ error: 'API key not configured on the server' }), { status: 500 });
  }

  try {
    // Get the prompt and language from the request body
    const { prompt, lang } = await request.json();

    if (!prompt || !lang) {
        return new Response(JSON.stringify({ error: 'Missing prompt or language in request body' }), { status: 400 });
    }

    // Initialize the Gemini AI client
    const ai = new GoogleGenAI({ apiKey });
    
    // Call the Gemini API
    const geminiResponse = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            systemInstruction: getSystemInstruction(lang),
        }
    });

    // Send the successful response back to the client
    return new Response(JSON.stringify({ text: geminiResponse.text }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        // Allow cross-origin requests, useful for development
        'Access-Control-Allow-Origin': '*', 
      },
    });

  } catch (error) {
    console.error("Error in Vercel API route:", error);
    return new Response(JSON.stringify({ error: 'Failed to get response from AI model' }), { status: 500 });
  }
}
