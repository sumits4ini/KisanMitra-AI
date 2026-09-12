import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useApp } from '../../context/AppContext';
import { Wheat, ArrowRight, Plus } from 'lucide-react';

export const MyCropsView: React.FC = () => {
  const { t, language } = useLanguage();
  const { crops, setTab } = useApp();

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-20 lg:pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 shadow-xs">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
            <Wheat className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-stone-900">
              {t.myCrops.title}
            </h1>
            <p className="text-sm font-medium text-stone-600">
              {t.myCrops.subtitle}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setTab('crop-doctor')}
          className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold px-4 py-2.5 rounded-xl shadow-xs transition-colors flex items-center space-x-1.5 self-start sm:self-auto touch-target"
        >
          <Plus className="w-4 h-4" />
          <span>Add / Inspect Crop</span>
        </button>
      </div>

      {/* Crops List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {crops.map((crop) => (
          <div 
            key={crop.id}
            className="bg-white border border-stone-200 rounded-2xl p-6 shadow-xs hover:border-emerald-300 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                    {crop.variety}
                  </span>
                  <h2 className="text-xl font-bold text-stone-900 mt-1">
                    {language === 'hi' ? crop.hindiName : crop.name}
                  </h2>
                  <p className="text-xs text-stone-500">
                    {crop.acreage} {t.dashboard.acres} &bull; Sown: {crop.sowingDate}
                  </p>
                </div>

                <div className="text-right">
                  <span className="text-2xl font-black text-stone-900">{crop.healthScore}%</span>
                  <p className="text-[10px] font-bold text-emerald-700 uppercase">{crop.healthStatus}</p>
                </div>
              </div>

              {/* Status Pills */}
              <div className="grid grid-cols-3 gap-2 py-3 border-y border-stone-100 text-xs">
                <div>
                  <span className="text-stone-400 block text-[11px]">Disease Risk</span>
                  <span className="font-bold text-stone-700 capitalize">{crop.diseaseRisk}</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[11px]">Water</span>
                  <span className="font-bold text-stone-700 capitalize">{crop.waterStatus}</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[11px]">Market Demand</span>
                  <span className="font-bold text-stone-700 capitalize">{crop.marketOpportunity}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-2 flex items-center justify-between">
              <span className="text-xs text-stone-400">
                Last checked: {crop.lastCheckedDate}
              </span>
              <button
                type="button"
                onClick={() => setTab('crop-doctor')}
                className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center space-x-1"
              >
                <span>Diagnose Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
