
import { useState, useCallback } from 'react';
import type { Message, Language } from '../types';
import { getBotResponse } from '../services/geminiService';
import { t } from '../lib/i18n';

export const useChat = (language: Language) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const initializeChat = useCallback(() => {
    const welcomeMessage: Message = {
        id: Date.now().toString(),
        text: t('welcomeSubtitle', language),
        sender: 'bot'
    };
    setMessages([welcomeMessage]);
  }, [language]);

  const sendMessage = useCallback(async (text: string) => {
    if (isLoading || !text.trim()) return;

    const userMessage: Message = { id: Date.now().toString(), text, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    const loadingMessageId = (Date.now() + 1).toString();
    setMessages(prev => [...prev, { id: loadingMessageId, text: '...', sender: 'bot', type: 'loading' }]);

    try {
      const responseText = await getBotResponse(text, language);
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
  
  return { messages, isLoading, sendMessage, initializeChat };
};