import type { Language } from '../types';

interface Location {
  lat: number;
  lng: number;
}

export const getBotResponse = async (prompt: string, lang: Language, location?: Location): Promise<string> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 20000); // 20-second timeout

  try {
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt, lang, location }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'API request failed with non-JSON response' }));
        console.error('API Error Response:', errorData);
        throw new Error(errorData.error || `API request failed with status ${response.status}`);
    }

    const data = await response.json();
    if (data.error) {
        throw new Error(data.error);
    }
    
    return data.text;
    
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === 'AbortError') {
      console.error("Fetch request timed out.");
      throw new Error("TIMEOUT");
    }
    console.error("Error calling backend API endpoint:", error);
    throw new Error("Failed to get response from AI");
  }
};