import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useApp } from '../../context/AppContext';
import { MapPin, Sprout, ArrowRight, Layers, Sparkles } from 'lucide-react';

export const FarmSummaryHeader: React.FC = () => {
  const { t, language } = useLanguage();
  const { user, crops, setTab } = useApp();

  const activeCrop = crops[0] || {
    name: 'Tomato',
    hindiName: 'टमाटर',
    variety: 'Abhinav Hybrid',
    acreage: 5,
  };

  const farmerName = user?.name || (language === 'hi' ? 'किसान' : 'Farmer');

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-emerald-850 via-emerald-800 to-green-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-emerald-700/50">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        {/* Left: Greeting & Farm Specifications */}
        <div className="space-y-4">
          {/* Tagline / Subtitle badge */}
          <div className="inline-flex items-center space-x-2 bg-emerald-950/60 border border-emerald-400/30 text-emerald-200 text-xs font-bold px-3.5 py-1.5 rounded-full backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
            <span>{t.tagline}</span>
          </div>

          {/* 1. Greeting: Namaste, Farmer 👋 */}
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
              {t.dashboard.greeting.replace('{name}', farmerName)}
            </h1>
            <p className="text-emerald-100 text-sm sm:text-base font-medium mt-1">
              {language === 'hi' 
                ? 'आपका खेत समृद्ध हो रहा है, और आपकी संभावनाएं भी।' 
                : 'Your farm is growing, and so are your possibilities.'}
            </p>
          </div>

          {/* 2. Farm Summary: Location, Farm Size, Main Crop */}
          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs sm:text-sm font-semibold text-emerald-100">
            {/* Location */}
            <div className="flex items-center space-x-1.5 bg-white/10 hover:bg-white/15 px-3 py-1.5 rounded-xl border border-white/15 backdrop-blur-xs transition-colors">
              <MapPin className="w-4 h-4 text-amber-300 flex-shrink-0" />
              <span>
                {t.dashboard.farmLocation}: <strong className="text-white">{user?.location || 'Karnal'}, {user?.state || 'Haryana'}</strong>
              </span>
            </div>

            {/* Farm Size */}
            <div className="flex items-center space-x-1.5 bg-white/10 hover:bg-white/15 px-3 py-1.5 rounded-xl border border-white/15 backdrop-blur-xs transition-colors">
              <Layers className="w-4 h-4 text-emerald-300 flex-shrink-0" />
              <span>
                {t.dashboard.landArea}: <strong className="text-white">{user?.landSizeAcres || 5} {t.dashboard.acres}</strong>
              </span>
            </div>

            {/* Main Crop */}
            <div className="flex items-center space-x-1.5 bg-white/10 hover:bg-white/15 px-3 py-1.5 rounded-xl border border-white/15 backdrop-blur-xs transition-colors">
              <Sprout className="w-4 h-4 text-green-300 flex-shrink-0" />
              <span>
                {t.dashboard.mainCrop}: <strong className="text-white">{language === 'hi' ? activeCrop.hindiName : `${activeCrop.name} (${activeCrop.variety})`}</strong>
              </span>
            </div>
          </div>
        </div>

        {/* Right: Check My Crop Primary Call To Action */}
        <div className="flex-shrink-0">
          <button
            type="button"
            onClick={() => setTab('crop-doctor')}
            className="w-full sm:w-auto bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 hover:from-amber-300 hover:to-amber-200 text-stone-950 font-black text-base px-7 py-4 rounded-2xl shadow-xl shadow-amber-950/20 hover:shadow-2xl hover:scale-102 active:scale-98 transition-all flex items-center justify-center space-x-3 group cursor-pointer touch-target"
          >
            <span className="text-lg">📷</span>
            <span className="tracking-tight">{t.dashboard.checkMyCropBtn}</span>
            <ArrowRight className="w-5 h-5 text-emerald-950 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
