import { useState, useCallback } from 'react';
import type { Message, Language } from '../types';
import { getBotResponse } from '../services/geminiService';
import { t } from '../lib/i18n';

interface Location {
  lat: number;
  lng: number;
}

export const useChat = (language: Language) => {
  const [query, setQuery] = useState<Message | null>(null);
  const [response, setResponse] = useState<Message | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const clearChat = useCallback(() => {
    setQuery(null);
    setResponse(null);
  }, []);

  const sendQuery = useCallback(async (userText: string, aiPrompt?: string, location?: Location) => {
    const textForAI = aiPrompt || userText;
    if (isLoading || !userText.trim()) return;

    // Clear previous Q&A and set the new user query
    setResponse(null);
    setQuery({ id: 'user-query', text: userText, sender: 'user' });
    setIsLoading(true);

    // Set a temporary loading message
    setResponse({ id: 'bot-loading', text: '...', sender: 'bot', type: 'loading' });

    try {
      const responseText = await getBotResponse(textForAI, language, location);
      setResponse({ id: 'bot-response', text: responseText, sender: 'bot' });
    } catch (error) {
      console.error(error);
      setResponse({ 
        id: 'bot-error', 
        text: t('errorMessage', language), 
        sender: 'bot', 
        type: 'error' 
      });
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, language]);

  const setBotMessage = useCallback((text: string, type: Message['type'] = 'text') => {
    setResponse(null);
    setQuery(null);
    setResponse({
      id: 'bot-message',
      text,
      sender: 'bot',
      type,
    });
  }, []);

  return { query, response, isLoading, sendQuery, clearChat, setBotMessage };
};
