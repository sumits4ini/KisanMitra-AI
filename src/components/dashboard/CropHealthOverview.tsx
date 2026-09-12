import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useApp } from '../../context/AppContext';
import { Sprout, ShieldAlert, Droplets, TrendingUp, ChevronRight, Activity } from 'lucide-react';

export const CropHealthOverview: React.FC = () => {
  const { t, language } = useLanguage();
  const { crops, setTab } = useApp();

  const activeCrop = crops[0] || {
    name: 'Tomato',
    hindiName: 'टमाटर',
    variety: 'Abhinav Hybrid',
    healthScore: 82,
    healthStatus: 'good',
    diseaseRisk: 'medium',
    waterStatus: 'good',
    marketOpportunity: 'high',
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-extrabold uppercase tracking-wider text-stone-500 flex items-center space-x-1.5">
          <Activity className="w-4 h-4 text-emerald-600" />
          <span>{t.dashboard.cropHealth} &amp; {language === 'hi' ? 'खेत की स्थिति' : 'Field Status'}</span>
        </h2>
        <button
          type="button"
          onClick={() => setTab('my-crops')}
          className="text-xs font-bold text-emerald-700 hover:text-emerald-800 hover:underline flex items-center space-x-0.5"
        >
          <span>{t.dashboard.viewDetails}</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 3. Crop Health Card (Tomato - Health 82/100, Status: Good) */}
        <div 
          onClick={() => setTab('crop-doctor')}
          className="bg-white border-2 border-emerald-500/80 hover:border-emerald-600 rounded-3xl p-5 shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-stone-500 uppercase tracking-wide">
                {t.dashboard.cropHealth}
              </span>
              <div className="w-9 h-9 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
                <Sprout className="w-5 h-5" />
              </div>
            </div>

            <p className="text-xs font-bold text-emerald-800 mb-1">
              {language === 'hi' ? activeCrop.hindiName : activeCrop.name}
            </p>

            <div className="flex items-baseline space-x-2">
              <span className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">
                {activeCrop.healthScore}
              </span>
              <span className="text-sm font-extrabold text-stone-400">
                {t.dashboard.cropHealthScoreUnit}
              </span>
              <span className="ml-auto text-xs font-extrabold text-emerald-700 bg-emerald-100 border border-emerald-200 px-2.5 py-1 rounded-full">
                {t.dashboard.statusGood}
              </span>
            </div>

            {/* Visual Health Gauge Bar */}
            <div className="w-full bg-stone-100 h-2.5 rounded-full mt-3 overflow-hidden p-0.5 border border-stone-200/60">
              <div 
                className="bg-gradient-to-r from-green-500 to-emerald-600 h-full rounded-full transition-all duration-1000"
                style={{ width: `${activeCrop.healthScore}%` }}
              />
            </div>
          </div>

          <p className="text-[11px] text-stone-600 font-medium mt-3.5 leading-snug">
            {t.dashboard.cropHealthDesc}
          </p>
        </div>

        {/* 4. Disease Risk: Medium */}
        <div 
          onClick={() => setTab('crop-doctor')}
          className="bg-white border border-amber-300 hover:border-amber-400 rounded-3xl p-5 shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-stone-500 uppercase tracking-wide">
                {t.dashboard.diseaseRisk}
              </span>
              <div className="w-9 h-9 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
                <ShieldAlert className="w-5 h-5" />
              </div>
            </div>

            <p className="text-xs font-bold text-stone-600 mb-1">
              {language === 'hi' ? 'फफूंद / झुलसा' : 'Fungal / Blight'}
            </p>

            <div className="flex items-baseline justify-between">
              <span className="text-2xl sm:text-3xl font-black text-amber-700 tracking-tight">
                {t.dashboard.statusModerate}
              </span>
              <span className="text-xs font-bold text-amber-800 bg-amber-100 border border-amber-200 px-2.5 py-1 rounded-full">
                Moderate
              </span>
            </div>

            <div className="w-full bg-stone-100 h-2.5 rounded-full mt-3 overflow-hidden p-0.5 border border-stone-200/60">
              <div 
                className="bg-gradient-to-r from-amber-400 to-amber-500 h-full rounded-full transition-all duration-1000"
                style={{ width: '45%' }}
              />
            </div>
          </div>

          <p className="text-[11px] text-stone-600 font-medium mt-3.5 leading-snug">
            {t.dashboard.diseaseRiskDesc}
          </p>
        </div>

        {/* 5. Water Status: Good */}
        <div className="bg-white border border-blue-200 hover:border-blue-300 rounded-3xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-stone-500 uppercase tracking-wide">
                {t.dashboard.waterStatus}
              </span>
              <div className="w-9 h-9 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center shadow-2xs">
                <Droplets className="w-5 h-5" />
              </div>
            </div>

            <p className="text-xs font-bold text-stone-600 mb-1">
              {language === 'hi' ? 'जड़ क्षेत्र नमी' : 'Soil Moisture'}
            </p>

            <div className="flex items-baseline justify-between">
              <span className="text-2xl sm:text-3xl font-black text-blue-900 tracking-tight">
                {t.dashboard.statusGood}
              </span>
              <span className="text-xs font-bold text-blue-800 bg-blue-50 border border-blue-200 px-2.5 py-1 rounded-full">
                74% Moist
              </span>
            </div>

            <div className="w-full bg-stone-100 h-2.5 rounded-full mt-3 overflow-hidden p-0.5 border border-stone-200/60">
              <div 
                className="bg-gradient-to-r from-blue-400 to-blue-600 h-full rounded-full transition-all duration-1000"
                style={{ width: '74%' }}
              />
            </div>
          </div>

          <p className="text-[11px] text-stone-600 font-medium mt-3.5 leading-snug">
            {t.dashboard.waterStatusDesc}
          </p>
        </div>

        {/* 6. Market Opportunity: Good */}
        <div 
          onClick={() => setTab('market')}
          className="bg-white border-2 border-teal-500/80 hover:border-teal-600 rounded-3xl p-5 shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-stone-500 uppercase tracking-wide">
                {t.dashboard.marketOpportunity}
              </span>
              <div className="w-9 h-9 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
                <TrendingUp className="w-5 h-5" />
              </div>
            </div>

            <p className="text-xs font-bold text-stone-600 mb-1">
              {language === 'hi' ? 'आजादपुर मंडी' : 'Azadpur Mandi'}
            </p>

            <div className="flex items-baseline justify-between">
              <span className="text-2xl sm:text-3xl font-black text-teal-900 tracking-tight">
                {t.dashboard.statusGood}
              </span>
              <span className="text-xs font-extrabold text-teal-800 bg-teal-100 border border-teal-200 px-2.5 py-1 rounded-full">
                +₹250/qtl
              </span>
            </div>

            <div className="w-full bg-stone-100 h-2.5 rounded-full mt-3 overflow-hidden p-0.5 border border-stone-200/60">
              <div 
                className="bg-gradient-to-r from-teal-400 to-emerald-600 h-full rounded-full transition-all duration-1000"
                style={{ width: '85%' }}
              />
            </div>
          </div>

          <p className="text-[11px] text-stone-600 font-medium mt-3.5 leading-snug">
            {t.dashboard.marketOppDesc}
          </p>
        </div>
      </div>
    </div>
  );
};
