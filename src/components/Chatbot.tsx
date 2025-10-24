import React, { useState, useRef, useEffect, memo } from 'react';
import { marked } from 'marked';
import type { Language, Message } from '../types';
import { useChat } from '../hooks/useChat';
import { t } from '../lib/i18n';

interface ChatbotProps {
  language: Language;
}

const LoadingIndicator: React.FC = () => (
  <div className="flex items-center space-x-1 rtl:space-x-reverse">
    <div className="w-2 h-2 bg-stone-500 rounded-full animate-pulse [animation-delay:-0.3s]"></div>
    <div className="w-2 h-2 bg-stone-500 rounded-full animate-pulse [animation-delay:-0.15s]"></div>
    <div className="w-2 h-2 bg-stone-500 rounded-full animate-pulse"></div>
  </div>
);

const ChatMessage: React.FC<{ message: Message }> = memo(({ message }) => {
  const isUser = message.sender === 'user';

  const containerClasses = `flex w-full mb-4 items-end ${isUser ? 'justify-end' : 'justify-start'}`;
  const messageClasses = `prose prose-sm md:prose-base dark:prose-invert max-w-full px-4 py-3 rounded-2xl ${
    isUser
      ? 'bg-amber-500 text-white rounded-br-none'
      : 'bg-stone-200 dark:bg-stone-800 text-stone-800 dark:text-stone-200 rounded-bl-none'
  }`;
  
  const renderer = new marked.Renderer();
  renderer.link = (href: string, title: string | null, text: string) => `<a href="${href}" title="${title || ''}" target="_blank" rel="noopener noreferrer">${text}</a>`;
  marked.setOptions({ renderer });


  const getRenderedHtml = () => {
    try {
      // Use message.text directly. Streaming updates the text prop.
      const parsedText = message.sender === 'bot' ? marked.parse(message.text) as string : message.text.replace(/</g, "&lt;").replace(/>/g, "&gt;");
      return parsedText;
    } catch (e) {
      console.error("Error parsing markdown:", e);
      return message.text;
    }
  };

  return (
    <div className={containerClasses} aria-label={`Message from ${message.sender}`}>
        {!isUser && (
            <div className="w-8 h-8 rounded-full bg-amber-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0 me-2" aria-hidden="true">
                G
            </div>
        )}
      <div className={`${messageClasses} ${message.type === 'error' ? 'bg-red-500 text-white prose-p:text-white prose-strong:text-white' : ''}`}>
        {message.type === 'loading' ? <LoadingIndicator /> : <div dangerouslySetInnerHTML={{ __html: getRenderedHtml() }} />}
      </div>
    </div>
  );
});

const Chatbot: React.FC<ChatbotProps> = ({ language }) => {
  const [input, setInput] = useState('');
  const { messages, isLoading, sendMessage, clearMessages, setBotMessage } = useChat(language);
  const [isFindingLocation, setIsFindingLocation] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  useEffect(() => {
    clearMessages();
    setInput('');
  }, [language, clearMessages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessage(input);
    setInput('');
  };

  const handleLocationClick = () => {
    if (isFindingLocation || isLoading) return;
    setIsFindingLocation(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const locationPromptForAI = `${t('locationPromptPart1', language)} ${t('locationPromptLat', language)}: ${latitude}, ${t('locationPromptLng', language)}: ${longitude}.`;
        const userMessageText = t('findNearMe', language);
        
        sendMessage(userMessageText, locationPromptForAI, { lat: latitude, lng: longitude });
        setIsFindingLocation(false);
      },
      (error) => {
        console.error("Geolocation error:", error);
        setBotMessage(t('locationError', language), 'error');
        setIsFindingLocation(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };
  
  return (
    <div className="flex flex-col h-full w-full max-w-4xl bg-white/50 dark:bg-stone-900/50 backdrop-blur-sm border border-stone-200 dark:border-stone-800 rounded-2xl shadow-2xl overflow-hidden">
      <div className="flex-1 overflow-y-auto p-4 sm:p-6">
        {messages.length === 0 && (
           <div className="w-full text-center">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-orange-600 dark:from-amber-400 dark:to-orange-500">
                    {t('welcomeTitle', language)}
                </h1>
                <p className="text-stone-600 dark:text-stone-400 mb-8 md:text-lg">{t('welcomeSubtitle', language)}</p>
            </div>
        )}
        
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}
         <div ref={messagesEndRef} />
      </div>
      <div className="border-t border-stone-200 dark:border-stone-800 p-4">
        {messages.length === 0 && (
             <button
                onClick={handleLocationClick}
                disabled={isLoading || isFindingLocation}
                className="mb-2 w-full text-center px-4 py-2 bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300 rounded-lg hover:bg-amber-200 dark:hover:bg-amber-900 transition-colors text-sm disabled:opacity-50 disabled:cursor-wait"
              >
                <i className={`fa-solid ${isFindingLocation ? 'fa-spinner fa-spin' : 'fa-location-crosshairs'} me-2`}></i>
                {isFindingLocation ? t('findingLocation', language) : t('findNearMe', language)}
              </button>
        )}
        <form onSubmit={handleSubmit} className="flex items-center gap-3">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t('placeholder', language)}
            className="flex-1 w-full px-4 py-3 bg-stone-100 dark:bg-stone-800 rounded-full border border-stone-300 dark:border-stone-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
            disabled={isLoading}
            aria-label={t('placeholder', language)}
          />
          <button
            type="submit"
            aria-label={t('send', language)}
            className="w-12 h-12 flex items-center justify-center bg-amber-500 text-white rounded-full hover:bg-amber-600 disabled:bg-stone-400 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
            disabled={isLoading || !input.trim()}
          >
            <i className="fa-solid fa-paper-plane"></i>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chatbot;