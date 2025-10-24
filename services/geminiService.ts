// Fix: Implemented the getBotResponse function to resolve the "not a module" error.
import { GoogleGenAI } from "@google/genai";
import type { GenerateContentConfig } from "@google/genai";

// Per instructions, the API key must be from `process.env.API_KEY` and is assumed to be available.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

export const getBotResponse = async (prompt: string, language: string): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash';

    const systemInstruction = `You are Cafégardee, an AI guide to the world of flavors.
You are an expert on cafes, restaurants, and drink recipes.
Your tone is friendly, helpful, and slightly enthusiastic, like a passionate foodie.
You must respond in the user's language. The user's language code is: ${language}.
When asked for places, provide a list with names, a short description, and if possible, an address.`;
    
    // Per guidelines, use Maps Grounding for location queries.
    const config: GenerateContentConfig = {
        systemInstruction: systemInstruction,
        tools: [{ googleMaps: {} }],
    };
    
    const latLngMatch = prompt.match(/latitude: ([-.\d]+), longitude: ([-.\d]+)/);
    if (latLngMatch) {
      const latitude = parseFloat(latLngMatch[1]);
      const longitude = parseFloat(latLngMatch[2]);
      config.toolConfig = {
          retrievalConfig: {
            latLng: {
              latitude,
              longitude,
            }
          }
        };
    }

    const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config,
    });
    
    let responseText = response.text;
    
    // Per guidelines, grounding sources must be displayed.
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    if (groundingChunks?.length) {
      const sourceUrls = new Set<string>();
      for (const chunk of groundingChunks) {
          if (chunk.maps?.uri) {
              sourceUrls.add(chunk.maps.uri);
          }
          if (chunk.maps?.placeAnswerSources?.reviewSnippets) {
              for (const snippet of chunk.maps.placeAnswerSources.reviewSnippets) {
                  // Fix: Correctly access the URI from the review snippet's source property. The property is `source.uri`, not `uri`.
                  if (snippet.source?.uri) {
                      sourceUrls.add(snippet.source.uri);
                  }
              }
          }
      }
      
      if (sourceUrls.size > 0) {
          // The UI component for messages renders text with `whitespace-pre-wrap`, so newlines will work.
          // It doesn't render markdown, so just listing the URLs is best.
          responseText += '\n\nSources:\n' + Array.from(sourceUrls).join('\n');
      }
    }
    
    return responseText;
  } catch (error) {
    console.error("Error getting response from Gemini:", error);
    throw new Error("Failed to get response from AI");
  }
};
