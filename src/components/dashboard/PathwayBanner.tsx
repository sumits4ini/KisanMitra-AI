import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useApp } from '../../context/AppContext';
import { Sprout, Store, TrendingUp, ArrowRight, CheckCircle2 } from 'lucide-react';

export const PathwayBanner: React.FC = () => {
  const { t, language } = useLanguage();
  const { setTab } = useApp();

  return (
    <div className="bg-white border-2 border-stone-200/80 rounded-3xl p-6 sm:p-7 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
        <div>
          <span className="text-xs font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
            KisanMitra AI Advantage
          </span>
          <h2 className="text-lg sm:text-xl font-black text-stone-900 mt-1">
            {t.dashboard.workflowTitle}
          </h2>
        </div>
        <p className="text-xs text-stone-500 font-medium">
          {language === 'hi' ? '3 चरणों में अधिकतम मुनाफा' : '3 Connected Steps to Maximize Return'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 relative">
        {/* Step 1: Crop Health */}
        <div 
          onClick={() => setTab('crop-doctor')}
          className="bg-emerald-50/60 hover:bg-emerald-50 border border-emerald-200 rounded-2xl p-4.5 transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-black text-sm shadow-xs">
                1
              </div>
              <span className="text-emerald-700 group-hover:translate-x-1 transition-transform">
                <ArrowRight className="w-4 h-4" />
              </span>
            </div>
            <h3 className="font-extrabold text-base text-emerald-950 flex items-center space-x-1.5">
              <Sprout className="w-4 h-4 text-emerald-600" />
              <span>{t.dashboard.workflowStep1}</span>
            </h3>
            <p className="text-xs text-emerald-800/90 font-medium mt-1 leading-relaxed">
              {t.dashboard.workflowStep1Desc}
            </p>
          </div>
          <div className="mt-3 pt-2 border-t border-emerald-100 flex items-center text-[11px] font-bold text-emerald-700">
            <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
            <span>Tomato: 82/100 (Blight managed)</span>
          </div>
        </div>

        {/* Step 2: Market Intelligence */}
        <div 
          onClick={() => setTab('market')}
          className="bg-teal-50/60 hover:bg-teal-50 border border-teal-200 rounded-2xl p-4.5 transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 rounded-xl bg-teal-600 text-white flex items-center justify-center font-black text-sm shadow-xs">
                2
              </div>
              <span className="text-teal-700 group-hover:translate-x-1 transition-transform">
                <ArrowRight className="w-4 h-4" />
              </span>
            </div>
            <h3 className="font-extrabold text-base text-teal-950 flex items-center space-x-1.5">
              <Store className="w-4 h-4 text-teal-600" />
              <span>{t.dashboard.workflowStep2}</span>
            </h3>
            <p className="text-xs text-teal-800/90 font-medium mt-1 leading-relaxed">
              {t.dashboard.workflowStep2Desc}
            </p>
          </div>
          <div className="mt-3 pt-2 border-t border-teal-100 flex items-center text-[11px] font-bold text-teal-700">
            <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
            <span>Azadpur Mandi (+₹3,500 net advantage)</span>
          </div>
        </div>

        {/* Step 3: Maximized Net Profit */}
        <div 
          onClick={() => setTab('sell-smart')}
          className="bg-amber-50/60 hover:bg-amber-50 border border-amber-200 rounded-2xl p-4.5 transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center font-black text-sm shadow-xs">
                3
              </div>
              <span className="text-amber-700 group-hover:translate-x-1 transition-transform">
                <ArrowRight className="w-4 h-4" />
              </span>
            </div>
            <h3 className="font-extrabold text-base text-amber-950 flex items-center space-x-1.5">
              <TrendingUp className="w-4 h-4 text-amber-600" />
              <span>{t.dashboard.workflowStep3}</span>
            </h3>
            <p className="text-xs text-amber-800/90 font-medium mt-1 leading-relaxed">
              {t.dashboard.workflowStep3Desc}
            </p>
          </div>
          <div className="mt-3 pt-2 border-t border-amber-100 flex items-center text-[11px] font-bold text-amber-700">
            <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
            <span>Recommendation: Partial sale + Hold</span>
          </div>
        </div>
      </div>
    </div>
  );
};
