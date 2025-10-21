
import React from 'react';
import type { Language } from '../types';

interface LanguageSwitcherProps {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ language, setLanguage }) => {
  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'fa' : 'en';
    setLanguage(newLanguage);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center justify-center w-24 h-10 px-3 bg-stone-200 dark:bg-stone-800 rounded-full text-sm font-semibold text-stone-700 dark:text-stone-300 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 dark:focus:ring-offset-stone-900"
      aria-label={`Switch to ${language === 'en' ? 'Persian' : 'English'}`}
    >
      <span className={`transition-transform duration-300 ${language === 'en' ? 'translate-x-0' : 'translate-x-full'}`}>
        {language === 'en' ? 'EN' : 'FA'}
      </span>
      <span className="mx-2 text-stone-400 dark:text-stone-600">|</span>
      <span className={`transition-transform duration-300 ${language === 'en' ? '-translate-x-full' : 'translate-x-0'}`}>
        {language === 'en' ? 'FA' : 'EN'}
      </span>
    </button>
  );
};

export default LanguageSwitcher;
