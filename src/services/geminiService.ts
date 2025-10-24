import type { Language } from '../types';

interface Location {
  lat: number;
  lng: number;
}

export const getBotResponse = async (prompt: string, lang: Language, location?: Location): Promise<string> => {
  try {
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt, lang, location }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "API request failed");
    }

    const data = await response.json();
    return data.text;
    
  } catch (error) {
    console.error("Error calling the backend API:", error);
    throw new Error("Failed to get response from AI");
  }
};