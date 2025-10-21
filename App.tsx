
import React, { useState, useEffect } from 'react';
import type { Language } from './types';
import Header from './components/Header';
import Chatbot from './components/Chatbot';

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'fa' ? 'rtl' : 'ltr';
  }, [language]);

  return (
    <div className={`font-sans antialiased text-stone-800 dark:text-stone-200 min-h-screen transition-colors duration-300 ${language === 'fa' ? 'font-[Vazirmatn]' : 'font-[Poppins]'}`}>
      <div 
        className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] dark:bg-stone-950">
      </div>
      <div className="relative flex flex-col h-screen p-4 md:p-6 lg:p-8">
        <Header language={language} setLanguage={setLanguage} />
        <main className="flex-grow flex flex-col items-center justify-center">
          <Chatbot language={language} />
        </main>
      </div>
    </div>
  );
};

export default App;
