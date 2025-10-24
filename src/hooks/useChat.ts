import { useState, useCallback } from 'react';
import type { Message, Language } from '../types';
import { getBotResponse } from '../services/geminiService';
import { t } from '../lib/i18n';

interface Location {
  lat: number;
  lng: number;
}

export const useChat = (language: Language) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const addBotMessage = useCallback((text: string, type: Message['type'] = 'text') => {
    const botMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'bot',
      type,
    };
    setMessages(prev => [...prev, botMessage]);
  }, []);

  const sendMessage = useCallback(async (userText: string, aiPrompt?: string, location?: Location) => {
    const textForAI = aiPrompt || userText;
    if (isLoading || !userText.trim()) return;

    const userMessage: Message = { id: Date.now().toString(), text: userText, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    const loadingMessageId = (Date.now() + 1).toString();
    setMessages(prev => [...prev, { id: loadingMessageId, text: '...', sender: 'bot', type: 'loading' }]);

    try {
      const responseText = await getBotResponse(textForAI, language, location);
      const botMessage: Message = { id: (Date.now() + 2).toString(), text: responseText, sender: 'bot' };
      setMessages(prev => prev.map(msg => msg.id === loadingMessageId ? botMessage : msg));
    } catch (error) {
      console.error(error);
      const errorMessage: Message = { 
        id: (Date.now() + 2).toString(), 
        text: t('errorMessage', language), 
        sender: 'bot', 
        type: 'error' 
      };
      setMessages(prev => prev.map(msg => msg.id === loadingMessageId ? errorMessage : msg));
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, language]);
  
  const clearMessages = () => setMessages([]);

  return { messages, isLoading, sendMessage, clearMessages, addBotMessage };
};
