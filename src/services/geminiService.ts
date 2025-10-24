import type { Language } from '../types';

export const getBotResponse = async (prompt: string, lang: Language): Promise<string> => {
  try {
    // We send a request to our own backend endpoint, which securely handles the API key and call.
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt, lang }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: "API request failed with an unreadable error." }));
      // Propagate the error message from our own backend.
      throw new Error(errorData.error || "The server returned an error.");
    }

    const data = await response.json();
    
    if (typeof data.text !== 'string') {
        console.error("Invalid response format from server:", data);
        throw new Error("Received an invalid response format from the server.");
    }

    return data.text;
    
  } catch (error) {
    console.error("Error calling the backend API endpoint (/api/generate):", error);
    // This error will be caught by the useChat hook and displayed to the user.
    throw new Error("Failed to get response from AI");
  }
};
