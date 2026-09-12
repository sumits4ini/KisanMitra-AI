import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useApp } from '../../context/AppContext';
import { AlertTriangle, ArrowRight, Bot, Stethoscope, Sparkles } from 'lucide-react';

export const TodaysAdviceCard: React.FC = () => {
  const { t, language } = useLanguage();
  const { setTab } = useApp();

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-amber-50 via-amber-50/70 to-orange-50/50 border-2 border-amber-300 rounded-3xl p-6 sm:p-7 shadow-sm">
      {/* Background icon decoration */}
      <div className="absolute -right-4 -bottom-4 text-amber-200/40 pointer-events-none">
        <Sparkles className="w-36 h-36" />
      </div>

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 text-white flex items-center justify-center shadow-md flex-shrink-0">
            <AlertTriangle className="w-6 h-6" />
          </div>

          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-black uppercase tracking-wider text-amber-900 bg-amber-200/80 px-2.5 py-0.5 rounded-md">
                {language === 'hi' ? 'दैनिक चेतावनी' : 'Daily Advisory'}
              </span>
              <h3 className="text-lg sm:text-xl font-black text-stone-900">
                {t.dashboard.todaysAdviceTitle}
              </h3>
            </div>

            <p className="text-stone-800 text-sm sm:text-base font-medium leading-relaxed">
              "{t.dashboard.todaysAdviceDesc}"
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-2.5 flex-shrink-0">
          <button
            type="button"
            onClick={() => setTab('crop-doctor')}
            className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm px-4 py-3 rounded-xl shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer touch-target"
          >
            <Stethoscope className="w-4 h-4" />
            <span>{t.dashboard.todaysAdviceAction}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={() => setTab('ai-assistant')}
            className="bg-white hover:bg-stone-50 border border-stone-200 text-stone-800 font-bold text-xs sm:text-sm px-4 py-3 rounded-xl shadow-2xs transition-all flex items-center justify-center space-x-2 cursor-pointer touch-target"
          >
            <Bot className="w-4 h-4 text-indigo-600" />
            <span>{language === 'hi' ? 'AI से परामर्श करें' : 'Ask AI Questions'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
