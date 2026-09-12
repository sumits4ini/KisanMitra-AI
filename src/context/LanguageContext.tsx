import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Language } from '../types';
import { en } from '../locales/en';
import { hi } from '../locales/hi';

type TranslationsType = typeof en;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: TranslationsType;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('kisanmitra_lang');
    return (saved === 'hi' || saved === 'en') ? saved : 'en';
  });

  useEffect(() => {
    localStorage.setItem('kisanmitra_lang', language);
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const toggleLanguage = () => {
    setLanguageState(prev => (prev === 'en' ? 'hi' : 'en'));
  };

  const t = language === 'hi' ? (hi as TranslationsType) : en;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
