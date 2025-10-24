import type { Language } from '../types';

interface Location {
  lat: number;
  lng: number;
}

export const getBotResponseStream = async (
  prompt: string, 
  lang: Language, 
  location: Location | undefined,
  onChunk: (chunk: string) => void,
  onComplete: () => void,
  onError: (error: Error) => void,
) => {
  try {
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt, lang, location }),
    });

    if (!response.ok || !response.body) {
      const errorText = await response.text();
      console.error('API Error Response Text:', errorText);
      throw new Error(`API request failed with status ${response.status}: ${errorText}`);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      onChunk(decoder.decode(value, { stream: true }));
    }
    
    onComplete();
    
  } catch (error) {
    console.error("Error calling backend API stream:", error);
    onError(error instanceof Error ? error : new Error("Failed to get response from AI"));
  }
};