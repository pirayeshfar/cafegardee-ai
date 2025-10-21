
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
       <div className="flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-amber-600">
          <path d="M11.25 4.533A9.707 9.707 0 0 0 6 3a9.735 9.735 0 0 0-3.25.555.75.75 0 0 0-.5.707v1.285a.75.75 0 0 0 .75.75h.25a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 0 .75.75h.5a.75.75 0 0 0 .75-.75v-3.5a.75.75 0 0 1 .75-.75h.25a.75.75 0 0 0 .75-.75V6.31a.75.75 0 0 0-.5-.707ZM12.75 4.533A9.707 9.707 0 0 1 18 3a9.735 9.735 0 0 1 3.25.555.75.75 0 0 1 .5.707v1.285a.75.75 0 0 1-.75.75h-.25a.75.75 0 0 0-.75.75v3.5a.75.75 0 0 1-.75.75h-.5a.75.75 0 0 1-.75-.75v-3.5a.75.75 0 0 0-.75-.75h-.25a.75.75 0 0 1-.75-.75V6.31a.75.75 0 0 1 .5-.707Z" />
          <path fillRule="evenodd" d="M12 21a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 1 1.5 0v4.5A.75.75 0 0 1 12 21ZM8.25 21a.75.75 0 0 1-.75-.75v-1.5a.75.75 0 0 1 1.5 0v1.5A.75.75 0 0 1 8.25 21ZM15.75 21a.75.75 0 0 1-.75-.75v-1.5a.75.75 0 0 1 1.5 0v1.5A.75.75 0 0 1 15.75 21Z" clipRule="evenodd" />
          <path d="M12 2.25a8.25 8.25 0 0 0-8.25 8.25c0 1.944 1.135 3.805 3.276 5.294.225.154.524.154.75 0 2.14-1.489 3.276-3.35 3.276-5.294A8.25 8.25 0 0 0 12 2.25Z" />
        </svg>
        <h1 className="text-xl md:text-2xl font-bold text-stone-800 dark:text-stone-100">{t('appTitle', language)}</h1>
      </div>
      <LanguageSwitcher language={language} setLanguage={setLanguage} />
    </header>
  );
};

export default Header;
