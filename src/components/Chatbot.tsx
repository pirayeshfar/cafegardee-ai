import React, { useState, useRef, useEffect, memo } from 'react';
import { marked } from 'marked';
import type { Language, Message } from '../types';
import { useChat } from '../hooks/useChat';
import { useTypingEffect } from '../hooks/useTypingEffect';
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
  const isBot = message.sender === 'bot';

  const isReadyForTyping = isBot && message.type !== 'loading' && message.type !== 'error';
  const typedText = useTypingEffect(message.text, isReadyForTyping ? 30 : 0);

  const containerClasses = `flex mb-4 items-end ${isUser ? 'justify-end' : 'justify-start'}`;
  const messageClasses = `prose prose-sm md:prose-base dark:prose-invert max-w-md lg:max-w-lg xl:max-w-2xl px-4 py-3 rounded-2xl ${
    isUser
      ? 'bg-amber-500 text-white rounded-br-none'
      : 'bg-stone-200 dark:bg-stone-800 text-stone-800 dark:text-stone-200 rounded-bl-none'
  }`;
  
  const renderer = new marked.Renderer();
  // Open links in a new tab
  renderer.link = (href: string, title: string | null, text: string) => `<a href="${href}" title="${title || ''}" target="_blank" rel="noopener noreferrer">${text}</a>`;
  marked.setOptions({ renderer });


  const getRenderedHtml = () => {
    try {
      const textToRender = isUser ? message.text : typedText;
      const parsedText = isBot ? marked.parse(textToRender) as string : textToRender;
      return parsedText;
    } catch (e) {
      console.error("Error parsing markdown:", e);
      return isUser ? message.text : typedText; // Fallback to plain text
    }
  };

  return (
    <li className={containerClasses} aria-label={`Message from ${message.sender}`}>
        {!isUser && (
            <div className="w-8 h-8 rounded-full bg-amber-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0 me-2" aria-hidden="true">
                G
            </div>
        )}
      <div className={`${messageClasses} ${message.type === 'error' ? 'bg-red-500 text-white prose-p:text-white prose-strong:text-white' : ''}`}>
        {message.type === 'loading' ? <LoadingIndicator /> : <div dangerouslySetInnerHTML={{ __html: getRenderedHtml() }} />}
      </div>
    </li>
  );
});

const Chatbot: React.FC<ChatbotProps> = ({ language }) => {
  const [input, setInput] = useState('');
  const { messages, isLoading, sendMessage, clearMessages } = useChat(language);
  const [isChatActive, setIsChatActive] = useState(false);
  const [isFindingLocation, setIsFindingLocation] = useState(false);
  const messagesEndRef = useRef<HTMLLIElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  useEffect(() => {
    if (isChatActive) {
        clearMessages();
        setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isChatActive, language]);

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
        const locationPrompt = `${t('locationPromptPart1', language)} ${t('locationPromptLat', language)}: ${latitude}, ${t('locationPromptLng', language)}: ${longitude}.`;
        sendMessage(locationPrompt, { lat: latitude, lng: longitude });
        setIsFindingLocation(false);
      },
      (error) => {
        console.error("Geolocation error:", error);
        // Create a temporary error message to show in the chat
        const errorMessage: Message = {
            id: Date.now().toString(),
            text: t('locationError', language),
            sender: 'bot',
            type: 'error',
        };
        // This is a way to inject a message without going through the hook's full flow
        (messages as Message[]).push(errorMessage); 
        setIsFindingLocation(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };
  
  if (!isChatActive) {
      return (
        <div className="w-full max-w-2xl text-center cursor-pointer" onClick={() => setIsChatActive(true)}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-orange-600 dark:from-amber-400 dark:to-orange-500">
                {t('welcomeTitle', language)}
            </h1>
            <p className="text-stone-600 dark:text-stone-400 mb-8 md:text-lg">{t('welcomeSubtitle', language)}</p>
             <div className="relative w-full">
                <i className="fa-solid fa-magnifying-glass absolute top-1/2 left-5 -translate-y-1/2 text-stone-400 rtl:left-auto rtl:right-5"></i>
                <div
                    className="w-full text-sm sm:text-base md:text-lg px-14 py-4 bg-white dark:bg-stone-800 rounded-full shadow-lg border border-transparent hover:shadow-xl transition-shadow text-stone-500 text-left rtl:text-right"
                >
                    {t('placeholder', language)}
                </div>
             </div>
        </div>
      );
  }

  return (
    <div className="flex flex-col h-full w-full max-w-4xl bg-white/50 dark:bg-stone-900/50 backdrop-blur-sm border border-stone-200 dark:border-stone-800 rounded-2xl shadow-2xl overflow-hidden">
      <ul 
        className="flex-1 overflow-y-auto p-4 sm:p-6"
        aria-live="polite"
        role="log"
      >
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}
         <li ref={messagesEndRef} className="h-0" />
      </ul>
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