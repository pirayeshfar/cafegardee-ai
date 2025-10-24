
import React from 'react';
import type { Language } from '../types';

interface LanguageSwitcherProps {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ language, setLanguage }) => {
  const commonButtonClasses = 'z-10 w-1/2 text-center text-sm font-bold py-1.5 rounded-full transition-all duration-300 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-stone-800';
  
  return (
    <div className="relative flex w-[80px] h-9 items-center rounded-full bg-stone-200 dark:bg-stone-800 p-1">
      <span
        aria-hidden="true"
        className="absolute left-1 h-7 w-[34px] rounded-full bg-amber-500 shadow-md transition-transform duration-300 ease-in-out"
        style={{
          transform: language === 'fa' ? 'translateX(36px)' : 'translateX(0px)',
        }}
      />
      <button
        onClick={() => setLanguage('en')}
        className={`${commonButtonClasses} ${language === 'en' ? 'text-white' : 'text-stone-500 dark:text-stone-400'}`}
        aria-pressed={language === 'en'}
        aria-label="Switch to English"
      >
        EN
      </button>
      <button
        onClick={() => setLanguage('fa')}
        className={`${commonButtonClasses} ${language === 'fa' ? 'text-white' : 'text-stone-500 dark:text-stone-400'}`}
        aria-pressed={language === 'fa'}
        aria-label="Switch to Persian"
      >
        FA
      </button>
    </div>
  );
};

export default LanguageSwitcher;
