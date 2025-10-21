
import React from 'react';
import type { Language } from '../types';
import LanguageSwitcher from './LanguageSwitcher';
import { t } from '../lib/i18n';

interface HeaderProps {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const Header: React.FC<HeaderProps> = ({ language, setLanguage }) => {
  return (
    <header className="flex justify-between items-center w-full max-w-5xl mx-auto px-4 py-2 flex-shrink-0">
       <div className="flex items-center gap-3">
        {/* The user's logo is now used here. Place logo.png in the public directory. */}
        <img src="/logo.png" alt="Cafegardee Logo" className="w-10 h-10 object-contain" />
        <h1 className="text-xl md:text-2xl font-bold text-stone-800 dark:text-stone-100">{t('appTitle', language)}</h1>
      </div>
      <LanguageSwitcher language={language} setLanguage={setLanguage} />
    </header>
  );
};

export default Header;