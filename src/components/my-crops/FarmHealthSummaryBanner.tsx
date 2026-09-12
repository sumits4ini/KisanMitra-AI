import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, AlertCircle, AlertTriangle, Activity, Sprout } from 'lucide-react';

export const FarmHealthSummaryBanner: React.FC = () => {
  const { t, language } = useLanguage();
  const { crops, user } = useApp();

  const totalAcreage = crops.reduce((acc, c) => acc + (c.acreage || 0), 0) || (user?.landSizeAcres || 5);
  const avgHealth = Math.round(crops.reduce((acc, c) => acc + c.healthScore, 0) / (crops.length || 1));

  const healthyCount = crops.filter(c => c.healthStatus === 'Healthy').length;
  const attentionCount = crops.filter(c => c.healthStatus === 'Needs Attention').length;
  const highRiskCount = crops.filter(c => c.healthStatus === 'High Risk').length;

  return (
    <div className="bg-gradient-to-br from-emerald-900 via-green-900 to-teal-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-emerald-700/60">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-1.5 text-xs font-black uppercase tracking-wider text-emerald-300 bg-emerald-950/80 px-3.5 py-1.5 rounded-full border border-emerald-500/30">
            <Activity className="w-3.5 h-3.5 text-amber-300" />
            <span>{t.myCrops.farmHealthOverview}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            {language === 'hi' ? 'खेत का कुल स्वास्थ्य स्कोर' : 'Overall Farm Health Status'}
          </h2>

          <p className="text-xs sm:text-sm text-emerald-100 font-medium max-w-xl">
            {language === 'hi' 
              ? `${user?.location || 'करनाल'} खेत पर ${totalAcreage} एकड़ में 3 सक्रिय फसलें। गेहूं उत्तम स्थिति में है और टमाटर में प्रारंभिक फफूंद नियंत्रण जारी है।`
              : `${totalAcreage} total acres across ${crops.length} active crops in ${user?.location || 'Karnal'}. Wheat is in peak health while tomato is under active blight management.`}
          </p>
        </div>

        {/* Big Average Farm Health Score */}
        <div className="flex items-center space-x-6 bg-white/10 backdrop-blur-md border border-white/15 p-5 rounded-2xl flex-shrink-0">
          <div>
            <span className="text-xs font-bold text-emerald-200 uppercase block">
              {t.myCrops.averageHealth}
            </span>
            <div className="flex items-baseline space-x-1">
              <span className="text-4xl font-black text-white tracking-tight">{avgHealth}</span>
              <span className="text-sm font-bold text-emerald-300">/100</span>
            </div>
            <span className="text-[11px] font-extrabold text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded-full mt-1 inline-block border border-amber-400/30">
              {t.myCrops.statusNeedsAttention}
            </span>
          </div>

          <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center">
            <Sprout className="w-8 h-8 text-emerald-300" />
          </div>
        </div>
      </div>

      {/* Visual Status Grid: Healthy, Needs Attention, High Risk */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6 pt-5 border-t border-emerald-800/80 text-xs">
        {/* Healthy */}
        <div className="bg-emerald-950/60 border border-emerald-500/30 rounded-2xl p-3.5 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-500 text-stone-950 flex items-center justify-center font-black">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-extrabold text-white">{t.myCrops.statusHealthy}</p>
              <p className="text-[11px] text-emerald-300">{healthyCount} {language === 'hi' ? 'फसल' : 'Crop'}</p>
            </div>
          </div>
          <span className="text-xl font-black text-emerald-300">{healthyCount}</span>
        </div>

        {/* Needs Attention */}
        <div className="bg-emerald-950/60 border border-amber-500/30 rounded-2xl p-3.5 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500 text-stone-950 flex items-center justify-center font-black">
              <AlertTriangle className="w-5 h-5 text-stone-950" />
            </div>
            <div>
              <p className="font-extrabold text-white">{t.myCrops.statusNeedsAttention}</p>
              <p className="text-[11px] text-amber-300">{attentionCount} {language === 'hi' ? 'फसलें' : 'Crops'}</p>
            </div>
          </div>
          <span className="text-xl font-black text-amber-300">{attentionCount}</span>
        </div>

        {/* High Risk */}
        <div className="bg-emerald-950/60 border border-red-500/30 rounded-2xl p-3.5 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-red-600 text-white flex items-center justify-center font-black">
              <AlertCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-extrabold text-white">{t.myCrops.statusHighRisk}</p>
              <p className="text-[11px] text-stone-300">{highRiskCount} {language === 'hi' ? 'फसल' : 'Crops'}</p>
            </div>
          </div>
          <span className="text-xl font-black text-stone-300">{highRiskCount}</span>
        </div>
      </div>
    </div>
  );
};
