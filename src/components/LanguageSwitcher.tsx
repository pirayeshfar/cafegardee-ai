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
      className="relative flex items-center w-[72px] h-9 p-1 bg-stone-200 dark:bg-stone-800 rounded-full cursor-pointer transition-colors duration-300 ease-in-out"
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
      <span
        aria-hidden="true"
        className="absolute h-7 w-7 bg-amber-500 rounded-full shadow-md transition-transform duration-300 ease-in-out"
        style={{ transform: isEnglish ? 'translateX(2px)' : 'translateX(34px)' }}
      />
      <div className="flex justify-around w-full">
        <span className={`relative z-10 text-xs font-bold transition-colors duration-300 ${isEnglish ? 'text-white' : 'text-stone-500 dark:text-stone-400'}`}>
          EN
        </span>
        <span className={`relative z-10 text-xs font-bold transition-colors duration-300 ${!isEnglish ? 'text-white' : 'text-stone-500 dark:text-stone-400'}`}>
          FA
        </span>
      </div>
    </div>
  );
};

export default LanguageSwitcher;