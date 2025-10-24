import { useState, useCallback } from 'react';
import type { Message, Language } from '../types';
import { getBotResponseStream } from '../services/geminiService';
import { t } from '../lib/i18n';

interface Location {
  lat: number;
  lng: number;
}

export const useChat = (language: Language) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = useCallback(async (userText: string, aiPrompt?: string, location?: Location) => {
    const textForAI = aiPrompt || userText;
    if (isLoading || !userText.trim()) return;

    const userMessage: Message = { id: Date.now().toString(), text: userText, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    const botMessageId = (Date.now() + 1).toString();
    // Add a placeholder bot message which will be updated
    setMessages(prev => [...prev, { id: botMessageId, text: '', sender: 'bot', type: 'loading' }]);
    
    let accumulatedText = '';

    getBotResponseStream(
      textForAI,
      language,
      location,
      (chunk) => { // onChunk
        accumulatedText += chunk;
        setMessages(prev => prev.map(msg => 
          msg.id === botMessageId 
            ? { ...msg, text: accumulatedText, type: 'text' } // Update message in-place
            : msg
        ));
      },
      () => { // onComplete
        setIsLoading(false);
      },
      (error) => { // onError
        console.error(error);
        const errorMessage: Message = { 
          id: botMessageId, 
          text: t('errorMessage', language), 
          sender: 'bot', 
          type: 'error' 
        };
        setMessages(prev => prev.map(msg => msg.id === botMessageId ? errorMessage : msg));
        setIsLoading(false);
      }
    );
  }, [isLoading, language]);
  
  const setBotMessage = useCallback((text: string, type: Message['type'] = 'text') => {
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      text,
      sender: 'bot',
      type,
    }]);
  }, []);

  const clearMessages = () => setMessages([]);

  return { messages, isLoading, sendMessage, clearMessages, setBotMessage };
};