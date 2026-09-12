import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Globe } from 'lucide-react';

interface LanguageSwitcherProps {
  className?: string;
  lightMode?: boolean;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ 
  className = '', 
  lightMode = false 
}) => {
  const { language, setLanguage } = useLanguage();

  return (
    <div 
      className={`inline-flex items-center p-1 rounded-full border transition-all ${
        lightMode
          ? 'bg-white/90 border-stone-200 shadow-sm'
          : 'bg-stone-900/60 border-white/20 backdrop-blur-md text-white'
      } ${className}`}
      role="group"
      aria-label="Language selection"
    >
      <div className="flex items-center pl-2 pr-1 text-xs font-semibold">
        <Globe className={`w-3.5 h-3.5 mr-1 ${lightMode ? 'text-emerald-700' : 'text-emerald-400'}`} />
      </div>
      <button
        type="button"
        onClick={() => setLanguage('en')}
        className={`px-3 py-1 text-xs font-bold rounded-full transition-all touch-target flex items-center justify-center ${
          language === 'en'
            ? 'bg-emerald-600 text-white shadow-sm'
            : lightMode
            ? 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
            : 'text-stone-300 hover:text-white hover:bg-white/10'
        }`}
        aria-pressed={language === 'en'}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLanguage('hi')}
        className={`px-3 py-1 text-xs font-bold rounded-full transition-all touch-target flex items-center justify-center ${
          language === 'hi'
            ? 'bg-emerald-600 text-white shadow-sm'
            : lightMode
            ? 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
            : 'text-stone-300 hover:text-white hover:bg-white/10'
        }`}
        aria-pressed={language === 'hi'}
      >
        हिंदी
      </button>
    </div>
  );
};
