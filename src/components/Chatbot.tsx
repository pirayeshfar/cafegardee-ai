
import React, { useState, useRef, useEffect } from 'react';
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

const ChatMessage: React.FC<{ message: Message }> = ({ message }) => {
  const isUser = message.sender === 'user';
  
  const containerClasses = `flex mb-4 items-end animate-fade-in-up ${isUser ? 'justify-end' : 'justify-start'}`;
  
  const messageClasses = `max-w-md lg:max-w-lg xl:max-w-2xl px-4 py-3 rounded-2xl shadow-md ${
    isUser
      ? 'bg-amber-500 text-white rounded-br-none'
      : 'bg-stone-200 dark:bg-stone-800 text-stone-800 dark:text-stone-200 rounded-bl-none'
  }`;

  return (
    <div className={containerClasses}>
        {!isUser && (
            <div className="w-8 h-8 rounded-full bg-amber-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0 me-3 rtl:me-0 rtl:ms-3">
                G
            </div>
        )}
      <div className={`${messageClasses} ${message.type === 'error' ? 'bg-red-500 !text-white' : ''}`}>
        {message.type === 'loading' ? <LoadingIndicator /> : <p className="text-sm md:text-base whitespace-pre-wrap">{message.text}</p>}
      </div>
       {isUser && (
            <div className="w-8 h-8 rounded-full bg-stone-300 dark:bg-stone-700 flex items-center justify-center text-stone-600 dark:text-stone-300 font-bold text-sm flex-shrink-0 ms-3 rtl:ms-0 rtl:me-3">
                <i className="fa-solid fa-user"></i>
            </div>
        )}
    </div>
  );
};

const Chatbot: React.FC<ChatbotProps> = ({ language }) => {
  const [input, setInput] = useState('');
  const { messages, isLoading, sendMessage, clearMessages } = useChat(language);
  const [isChatActive, setIsChatActive] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  useEffect(() => {
    if (isChatActive) {
        clearMessages();
        // Send a default starter message from the bot when chat becomes active
        sendMessage("سلام");
        setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isChatActive, language]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
    setInput('');
  };

  const handleLocationClick = () => {
    sendMessage(t('findingLocation', language));
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const locationPrompt = `Find cafes and restaurants near me. My current location is latitude: ${latitude}, longitude: ${longitude}.`;
        sendMessage(locationPrompt);
      },
      (error) => {
        console.error("Geolocation error:", error);
        sendMessage(t('locationError', language));
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };
  
  if (!isChatActive) {
      return (
        <div className="w-full max-w-2xl text-center cursor-pointer animate-fade-in-up" onClick={() => setIsChatActive(true)}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-orange-600 dark:from-amber-400 dark:to-orange-500">
                {t('welcomeTitle', language)}
            </h1>
            <p className="text-stone-600 dark:text-stone-400 mb-8 md:text-lg">{t('welcomeSubtitle', language)}</p>
             <div className="relative w-full group">
                <i className="fa-solid fa-magnifying-glass absolute top-1/2 left-5 -translate-y-1/2 text-stone-400 rtl:left-auto rtl:right-5 transition-transform group-hover:scale-110"></i>
                <div
                    className="w-full text-sm sm:text-base md:text-lg pl-14 pr-4 rtl:pr-14 rtl:pl-4 py-4 bg-white dark:bg-stone-800 rounded-full shadow-lg border border-transparent group-hover:shadow-xl group-hover:border-amber-500/50 transition-all text-stone-500 text-left rtl:text-right"
                >
                    {t('placeholder', language)}
                </div>
             </div>
        </div>
      );
  }

  return (
    <div className="flex flex-col h-[85vh] w-full max-w-4xl bg-white/50 dark:bg-stone-900/50 backdrop-blur-sm border border-stone-200 dark:border-stone-800 rounded-2xl shadow-2xl overflow-hidden animate-fade-in-up">
      <div className="flex-1 overflow-y-auto p-4 sm:p-6">
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}
         <div ref={messagesEndRef} />
      </div>
      <div className="border-t border-stone-200 dark:border-stone-800 p-4 bg-white/50 dark:bg-stone-900/50">
        {messages.length <= 2 && (
             <button
                onClick={handleLocationClick}
                className="mb-3 w-full text-center px-4 py-2 bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300 rounded-lg hover:bg-amber-200 dark:hover:bg-amber-900 transition-colors text-sm"
              >
                <i className="fa-solid fa-location-crosshairs me-2"></i>
                {t('findNearMe', language)}
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
          />
          <button
            type="submit"
            className="w-12 h-12 flex-shrink-0 flex items-center justify-center bg-amber-500 text-white rounded-full hover:bg-amber-600 disabled:bg-stone-400 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 active:scale-95"
            disabled={isLoading || !input.trim()}
            aria-label={t('send', language)}
          >
            <i className="fa-solid fa-paper-plane"></i>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chatbot;
