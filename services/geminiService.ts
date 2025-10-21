import type { Language } from '../types';

export const getBotResponse = async (prompt: string, lang: Language): Promise<string> => {
  try {
    // We now send a request to our own backend endpoint
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt, lang }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "API request failed");
    }

    const data = await response.json();
    return data.text;
    
  } catch (error) {
    console.error("Error calling our API endpoint:", error);
    throw new Error("Failed to get response from AI");
  }
};
