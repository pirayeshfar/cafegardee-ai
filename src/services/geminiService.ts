
import { GoogleGenAI } from "@google/genai";
import type { GenerateContentConfig } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

export const getBotResponse = async (prompt: string, language: string): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash';

    const systemInstruction = `You are Cafégardee, an AI guide to the world of flavors.
You are an expert on cafes, restaurants, and drink recipes.
Your tone is friendly, helpful, and slightly enthusiastic, like a passionate foodie.
You must respond in the user's language. The user's language code is: ${language}.
When asked for places, provide a list with names, a short description, and if possible, an address.`;
    
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
    
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    if (groundingChunks?.length) {
      const sourceUrls = new Set<string>();
      for (const chunk of groundingChunks) {
          if (chunk.maps?.uri) {
              sourceUrls.add(chunk.maps.uri);
          }
          if (chunk.maps?.placeAnswerSources?.reviewSnippets) {
              for (const snippet of chunk.maps.placeAnswerSources.reviewSnippets) {
                  if ((snippet as any).source?.uri) {
                      sourceUrls.add((snippet as any).source.uri);
                  }
              }
          }
      }
      
      if (sourceUrls.size > 0) {
          responseText += '\n\nSources:\n' + Array.from(sourceUrls).join('\n');
      }
    }
    
    return responseText;
  } catch (error) {
    console.error("Error getting response from Gemini:", error);
    throw new Error("Failed to get response from AI");
  }
};
