
import React, { useState, useEffect } from 'react';
import type { Language } from './types';
import Header from './components/Header';
import Chatbot from './components/Chatbot';
import SplashScreen from './components/SplashScreen';
import RecipeBrowser from './components/RecipeBrowser';
import { t } from './lib/i18n';

type View = 'chat' | 'recipes';

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>('fa');
  const [isLoading, setIsLoading] = useState(true);
  const [view, setView] = useState<View>('chat');

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

  const commonButtonClasses = 'w-1/2 text-center text-sm font-bold py-2 px-4 rounded-full transition-all duration-300 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-stone-950';
  const activeButtonClasses = 'bg-amber-500 text-white shadow';
  const inactiveButtonClasses = 'bg-transparent text-stone-500 dark:text-stone-400';

  return (
    <div className={`antialiased text-stone-800 dark:text-stone-200 min-h-screen transition-colors duration-300 ${language === 'fa' ? 'font-vazir' : 'font-sans'}`}>
      <SplashScreen isVisible={isLoading} />
      
      <div className={`transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <div 
          className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] dark:bg-stone-950">
        </div>
        <div className="relative flex flex-col min-h-screen p-2 sm:p-4 md:p-6">
          <Header language={language} setLanguage={setLanguage} />
          
          <div className="flex justify-center my-4">
            <div className="flex w-48 items-center rounded-full bg-stone-200 dark:bg-stone-800 p-1">
                <button
                    onClick={() => setView('chat')}
                    className={`${commonButtonClasses} ${view === 'chat' ? activeButtonClasses : inactiveButtonClasses}`}
                    aria-pressed={view === 'chat'}
                >
                    {t('chat', language)}
                </button>
                <button
                    onClick={() => setView('recipes')}
                    className={`${commonButtonClasses} ${view === 'recipes' ? activeButtonClasses : inactiveButtonClasses}`}
                    aria-pressed={view === 'recipes'}
                >
                    {t('recipes', language)}
                </button>
            </div>
          </div>

          <main className="flex-grow flex flex-col items-center justify-center">
            {view === 'chat' ? (
              <Chatbot language={language} />
            ) : (
              <RecipeBrowser language={language} />
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default App;
