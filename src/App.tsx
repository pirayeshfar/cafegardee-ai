import React, { useState, useEffect } from 'react';
import type { Language } from './types';
import Header from './components/Header';
import SplashScreen from './components/SplashScreen';
import RecipeBrowser from './components/RecipeBrowser';

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>('en');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Hide the splash screen after the animation duration
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500); // Adjust time to match splash screen animation

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'fa' ? 'rtl' : 'ltr';
  }, [language]);

  return (
    <div className={`antialiased text-stone-800 dark:text-stone-200 min-h-screen transition-colors duration-300 ${language === 'fa' ? 'font-vazir' : 'font-sans'}`}>
      <SplashScreen isVisible={isLoading} />
      
      <div className={`transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <div 
          className="absolute inset-0 -z-10 h-full w-full bg-stone-100 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] dark:bg-stone-950">
        </div>
        <div className="relative flex flex-col min-h-screen p-2 sm:p-4 md:p-6">
          <Header language={language} setLanguage={setLanguage} />
          <main className="flex-grow flex flex-col items-center w-full px-4">
            <RecipeBrowser language={language} />
          </main>
        </div>
      </div>
    </div>
  );
};

export default App;
