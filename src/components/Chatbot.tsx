import React, { useState, useRef, useEffect, memo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
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
      ? 'bg-amber-500 text-white rounded-br-none prose-p:text-white prose-headings:text-white prose-strong:text-white prose-a:text-white prose-a:underline'
      : 'bg-stone-200 dark:bg-stone-800 text-stone-800 dark:text-stone-200 rounded-bl-none'
  }`;

  return (
    <div className={containerClasses} aria-label={`Message from ${message.sender}`}>
        {!isUser && (
            <div className="w-8 h-8 rounded-full bg-amber-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0 me-2" aria-hidden="true">
                G
            </div>
        )}
      <div className={`${messageClasses} ${message.type === 'error' ? 'bg-red-500 !text-white prose-p:text-white prose-strong:text-white' : ''}`}>
        {message.type === 'loading' ? <LoadingIndicator /> : (
          <ReactMarkdown 
            remarkPlugins={[remarkGfm]}
            components={{
              a: ({node, ...props}) => <a {...props} target="_blank" rel="noopener noreferrer" />
            }}
          >
            {message.text}
          </ReactMarkdown>
        )}
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
    sendMessage(input, input);
    setInput('');
  };
  
  const handlePromptStarter = (prompt: string) => {
    sendMessage(prompt, prompt);
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

  const PromptStarter: React.FC<{ icon: string; text: string; onClick: () => void; disabled: boolean }> = ({ icon, text, onClick, disabled }) => (
     <button
      onClick={onClick}
      disabled={disabled}
      className="p-3 bg-stone-100 dark:bg-stone-800/50 rounded-lg text-left w-full hover:bg-stone-200 dark:hover:bg-stone-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <p className="font-semibold text-sm text-stone-700 dark:text-stone-300"><i className={`fa-solid ${icon} me-3 text-amber-500`}></i>{text}</p>
    </button>
  );
  
  return (
    <div className="flex flex-col h-full w-full max-w-4xl bg-white/50 dark:bg-stone-900/50 backdrop-blur-sm border border-stone-200 dark:border-stone-800 rounded-2xl shadow-2xl overflow-hidden">
      <header className="flex items-center justify-between p-3 border-b border-stone-200 dark:border-stone-800 flex-shrink-0">
         <h2 className="font-bold text-lg text-stone-700 dark:text-stone-200">{t('appTitle', language)} AI</h2>
         <button 
          onClick={clearMessages}
          aria-label={t('newChat', language)}
          className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-stone-200 dark:hover:bg-stone-800 transition-colors text-stone-500 dark:text-stone-400"
         >
           <i className="fa-solid fa-arrows-rotate"></i>
         </button>
      </header>

      <div className="flex-1 overflow-y-auto p-4 sm:p-6">
        {messages.length === 0 && (
           <div className="w-full text-center animate-fade-in-up">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-orange-600 dark:from-amber-400 dark:to-orange-500">
                    {t('welcomeTitle', language)}
                </h1>
                <p className="text-stone-600 dark:text-stone-400 mb-8 md:text-lg">{t('welcomeSubtitle', language)}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-lg mx-auto">
                    <PromptStarter icon="fa-map-location-dot" text={t('promptStarter1', language)} onClick={handleLocationClick} disabled={isLoading || isFindingLocation} />
                    <PromptStarter icon="fa-martini-glass" text={t('promptStarter2', language)} onClick={() => handlePromptStarter(t('promptStarter2', language))} disabled={isLoading} />
                    <PromptStarter icon="fa-mug-saucer" text={t('promptStarter3', language)} onClick={() => handlePromptStarter(t('promptStarter3', language))} disabled={isLoading} />
                    <PromptStarter icon="fa-seedling" text={t('promptStarter4', language)} onClick={() => handlePromptStarter(t('promptStarter4', language))} disabled={isLoading} />
                </div>
            </div>
        )}
        
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}
         <div ref={messagesEndRef} />
      </div>

      <div className="border-t border-stone-200 dark:border-stone-800 p-4">
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
