import React from 'react';
import type { Language } from '../types';
import LanguageSwitcher from './LanguageSwitcher';
import { t } from '../lib/i18n';

interface HeaderProps {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const Header: React.FC<HeaderProps> = ({ language, setLanguage }) => {
  const titleClasses = language === 'fa' 
    ? "text-xl md:text-2xl font-bold text-stone-800 dark:text-stone-100"
    : "font-display text-2xl md:text-3xl font-bold text-stone-800 dark:text-stone-100 tracking-tight";

  return (
    <header className="flex justify-between items-center w-full max-w-5xl mx-auto px-4 py-2 flex-shrink-0">
       <div className="flex items-center gap-3">
        <div className="w-10 h-10 flex items-center justify-center" aria-hidden="true">
          <i className="fa-solid fa-coffee-bean text-3xl text-amber-600 dark:text-amber-500"></i>
        </div>
        <h1 className={titleClasses}>{t('appTitle', language)}</h1>
      </div>
      <LanguageSwitcher language={language} setLanguage={setLanguage} />
    </header>
  );
};

export default Header;