import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useApp } from '../../context/AppContext';
import { Wheat, ArrowRight, Plus, Stethoscope } from 'lucide-react';

export const MyCropsView: React.FC = () => {
  const { t, language } = useLanguage();
  const { crops, savedDiagnoses, setTab } = useApp();

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-20 lg:pb-12 animate-in fade-in duration-200">
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

      {/* Active Crops Cards */}
      <div className="space-y-3">
        <h2 className="text-sm font-extrabold uppercase tracking-wider text-stone-500">
          {language === 'hi' ? 'खेत में सक्रिय फसलें' : 'Active Field Crops'}
        </h2>
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
                    <h3 className="text-xl font-bold text-stone-900 mt-1">
                      {language === 'hi' ? crop.hindiName : crop.name}
                    </h3>
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

      {/* Saved Crop Diagnoses & Health History */}
      <div className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex items-center space-x-2">
          <Stethoscope className="w-5 h-5 text-emerald-600" />
          <h2 className="text-lg font-black text-stone-900">
            {language === 'hi' ? 'सहेजे गए AI फसल रोग निदान इतिहास' : 'Saved AI Diagnosis & Health History'}
          </h2>
        </div>

        {savedDiagnoses.length === 0 ? (
          <div className="p-8 text-center bg-stone-50 border border-stone-200/60 rounded-2xl">
            <Stethoscope className="w-10 h-10 text-stone-300 mx-auto mb-2" />
            <p className="text-sm font-bold text-stone-700">
              {language === 'hi' ? 'अभी तक कोई निदान सहेजा नहीं गया है।' : 'No saved diagnoses yet.'}
            </p>
            <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
              {language === 'hi' 
                ? 'AI क्रॉप डॉक्टर में पत्ते की जांच करें और "जांच परिणाम सहेजें" पर क्लिक करें।' 
                : 'Inspect a leaf in the AI Crop Doctor and click "Save Diagnosis to My Crops".'}
            </p>
            <button
              type="button"
              onClick={() => setTab('crop-doctor')}
              className="mt-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2 rounded-xl transition-colors inline-flex items-center space-x-1.5"
            >
              <span>{language === 'hi' ? 'जांच शुरू करें' : 'Start Diagnosis'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <div className="divide-y divide-stone-100">
            {savedDiagnoses.map((diag) => (
              <div key={diag.id} className="py-4 first:pt-1 last:pb-1 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center space-x-3.5">
                  <img
                    src={diag.imageUrl}
                    alt={diag.disease}
                    className="w-14 h-14 rounded-2xl object-cover border border-stone-200 flex-shrink-0 shadow-2xs"
                  />
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                        {language === 'hi' ? diag.cropHindi : diag.crop}
                      </span>
                      <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                        {diag.confidence}% Confidence
                      </span>
                    </div>
                    <h4 className="text-sm sm:text-base font-bold text-stone-900 mt-1">
                      {language === 'hi' ? diag.diseaseHindi : diag.disease}
                    </h4>
                    <p className="text-xs text-stone-500">
                      Severity: {diag.severity} &bull; Recorded: {diag.timestamp}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 self-end sm:self-center">
                  <div className="text-right">
                    <span className="text-xs text-stone-400 block">Health Score</span>
                    <span className="text-xl font-black text-stone-900">{diag.healthScore}/100</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setTab('crop-doctor')}
                    className="bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold px-3 py-2 rounded-xl transition-colors"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
