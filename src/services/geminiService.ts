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
    console.error("Error calling backend API endpoint:", error);
    // Rethrow a user-friendly error
    throw new Error("Failed to get response from AI");
  }
};
