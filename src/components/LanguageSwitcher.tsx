import React from 'react';
import type { Language } from '../types';

interface LanguageSwitcherProps {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ language, setLanguage }) => {
  const isEnglish = language === 'en';

  const toggleLanguage = () => {
    setLanguage(isEnglish ? 'fa' : 'en');
  };

  return (
    <div
      onClick={toggleLanguage}
      className="flex items-center justify-around w-[72px] h-9 px-2 bg-stone-200 dark:bg-stone-800 rounded-full cursor-pointer transition-colors duration-300 ease-in-out"
      role="switch"
      aria-checked={!isEnglish}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleLanguage();
        }
      }}
      aria-label={`Switch to ${isEnglish ? 'Persian' : 'English'}`}
    >
      <span className={`text-sm font-bold transition-colors duration-300 ${isEnglish ? 'text-stone-800 dark:text-stone-100' : 'text-stone-500 dark:text-stone-400'}`}>
        EN
      </span>
      <span className={`text-sm font-bold transition-colors duration-300 ${!isEnglish ? 'text-stone-800 dark:text-stone-100' : 'text-stone-500 dark:text-stone-400'}`}>
        FA
      </span>
    </div>
  );
};

export default LanguageSwitcher;
