import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import type { FarmCrop } from '../../types';
import { AlertTriangle, ShieldCheck, AlertCircle, ArrowRight } from 'lucide-react';

interface CropCardProps {
  crop: FarmCrop;
  onSelectCrop: (crop: FarmCrop) => void;
}

export const CropCard: React.FC<CropCardProps> = ({ crop, onSelectCrop }) => {
  const { t, language } = useLanguage();

  const getStatusBadge = () => {
    if (crop.healthStatus === 'Healthy') {
      return (
        <span className="text-xs font-black uppercase text-emerald-800 bg-emerald-100 border border-emerald-300 px-3 py-1 rounded-full flex items-center space-x-1">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>{t.myCrops.statusHealthy}</span>
        </span>
      );
    }
    if (crop.healthStatus === 'Needs Attention') {
      return (
        <span className="text-xs font-black uppercase text-amber-900 bg-amber-100 border border-amber-300 px-3 py-1 rounded-full flex items-center space-x-1">
          <AlertTriangle className="w-3.5 h-3.5 text-amber-700" />
          <span>{t.myCrops.statusNeedsAttention}</span>
        </span>
      );
    }
    return (
      <span className="text-xs font-black uppercase text-red-900 bg-red-100 border border-red-300 px-3 py-1 rounded-full flex items-center space-x-1">
        <AlertCircle className="w-3.5 h-3.5 text-red-700" />
        <span>{t.myCrops.statusHighRisk}</span>
      </span>
    );
  };

  return (
    <div 
      onClick={() => onSelectCrop(crop)}
      className="bg-white border-2 border-stone-200 hover:border-emerald-500 rounded-3xl p-6 shadow-xs hover:shadow-lg transition-all duration-200 cursor-pointer group flex flex-col justify-between"
    >
      <div>
        {/* Header: Variety, Crop Name, Status */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
              {crop.variety}
            </span>
            <h3 className="text-2xl font-black text-stone-900 mt-1 tracking-tight group-hover:text-emerald-800 transition-colors">
              {language === 'hi' ? crop.hindiName : crop.name}
            </h3>
            <p className="text-xs text-stone-500 font-medium">
              {t.myCrops.areaLabel}: <strong className="text-stone-800">{crop.acreage} {t.dashboard.acres}</strong> &bull; Sown: {crop.sowingDate}
            </p>
          </div>

          <div className="flex flex-col items-end space-y-1">
            {getStatusBadge()}
            <span className="text-[11px] text-stone-400 font-medium">
              Stage: {language === 'hi' ? crop.stageHindi : crop.stage}
            </span>
          </div>
        </div>

        {/* Health Score Meter */}
        <div className="bg-stone-50 border border-stone-200/80 rounded-2xl p-4 mb-4">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-bold text-stone-600 uppercase">
              {t.myCrops.healthLabel}
            </span>
            <span className="text-2xl font-black text-stone-900">
              {crop.healthScore}<span className="text-xs font-normal text-stone-400">/100</span>
            </span>
          </div>
          <div className="w-full bg-stone-200 h-2.5 rounded-full overflow-hidden p-0.5">
            <div 
              className={`h-full rounded-full transition-all duration-1000 ${
                crop.healthScore >= 85
                  ? 'bg-emerald-500'
                  : crop.healthScore >= 70
                  ? 'bg-amber-500'
                  : 'bg-red-500'
              }`}
              style={{ width: `${crop.healthScore}%` }}
            />
          </div>
        </div>

        {/* Details Grid: Disease risk, Last diagnosis, Next check */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 py-3 border-y border-stone-100 text-xs">
          {/* Disease Risk */}
          <div className="p-2.5 bg-stone-50 rounded-xl">
            <span className="text-stone-400 block text-[10px] uppercase font-bold">
              {t.myCrops.diseaseRiskLabel}
            </span>
            <span className="font-extrabold text-stone-800 capitalize mt-0.5 block">
              {crop.diseaseRisk === 'medium' ? (language === 'hi' ? 'मध्यम जोखिम' : 'Medium') : crop.diseaseRisk === 'low' ? (language === 'hi' ? 'कम जोखिम' : 'Low') : (language === 'hi' ? 'उच्च जोखिम' : 'High')}
            </span>
          </div>

          {/* Last Diagnosis */}
          <div className="p-2.5 bg-stone-50 rounded-xl sm:col-span-1">
            <span className="text-stone-400 block text-[10px] uppercase font-bold">
              {t.myCrops.lastDiagnosisLabel}
            </span>
            <span className="font-extrabold text-stone-800 truncate mt-0.5 block" title={crop.lastDiagnosis}>
              {language === 'hi' ? crop.lastDiagnosisHindi : crop.lastDiagnosis}
            </span>
          </div>

          {/* Next Check */}
          <div className="p-2.5 bg-stone-50 rounded-xl">
            <span className="text-stone-400 block text-[10px] uppercase font-bold">
              {t.myCrops.nextCheckLabel}
            </span>
            <span className="font-extrabold text-stone-800 mt-0.5 block">
              {crop.nextCheckDate}
            </span>
          </div>
        </div>
      </div>

      {/* Footer CTA: View Detailed Health Page */}
      <div className="mt-4 pt-3 flex items-center justify-between text-xs font-bold text-emerald-700 group-hover:text-emerald-800">
        <span>{t.myCrops.viewDetailedHealth}</span>
        <div className="w-7 h-7 rounded-full bg-emerald-50 group-hover:bg-emerald-100 flex items-center justify-center group-hover:translate-x-1 transition-all">
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
};
