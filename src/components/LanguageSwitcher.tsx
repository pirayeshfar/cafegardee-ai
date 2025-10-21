import React from 'react';
import type { Language } from '../types';

interface LanguageSwitcherProps {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ language, setLanguage }) => {
  const isEnglish = language === 'en';

  return (
    <div className="relative flex w-[80px] h-9 items-center rounded-full bg-stone-200 dark:bg-stone-800 p-1">
      <span
        className="absolute left-1 h-7 w-[34px] rounded-full bg-amber-500 shadow-md transition-transform duration-300 ease-in-out"
        style={{
          transform: isEnglish ? 'translateX(0px)' : 'translateX(36px)',
        }}
      />
      
      <button
        onClick={() => setLanguage('en')}
        className={`z-10 flex-1 text-sm font-bold transition-colors duration-300 ${isEnglish ? 'text-white' : 'text-stone-500 dark:text-stone-400'}`}
        aria-pressed={isEnglish}
        aria-label="Switch to English"
      >
        EN
      </button>
      <button
        onClick={() => setLanguage('fa')}
        className={`z-10 flex-1 text-sm font-bold transition-colors duration-300 ${!isEnglish ? 'text-white' : 'text-stone-500 dark:text-stone-400'}`}
        aria-pressed={!isEnglish}
        aria-label="Switch to Persian"
      >
        FA
      </button>
    </div>
  );
};

export default LanguageSwitcher;