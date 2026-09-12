import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useApp } from '../../context/AppContext';
import type { DiagnosisResult } from '../../types';
import { 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  RefreshCw, 
  BookmarkCheck, 
  Store, 
  ShieldAlert, 
  Sparkles
} from 'lucide-react';

interface DiagnosisCardProps {
  result: DiagnosisResult;
  onAnalyzeAnother: () => void;
}

export const DiagnosisCard: React.FC<DiagnosisCardProps> = ({
  result,
  onAnalyzeAnother,
}) => {
  const { t, language } = useLanguage();
  const { saveDiagnosis, setTab } = useApp();
  
  const [whyExpanded, setWhyExpanded] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    saveDiagnosis(result);
    setIsSaved(true);
    setTimeout(() => {
      // Keep state saved
    }, 2000);
  };

  const getSeverityBadge = () => {
    if (result.severity === 'None (Healthy)') {
      return (
        <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-black px-3 py-1 rounded-full uppercase">
          {language === 'hi' ? result.severityHindi : result.severity}
        </span>
      );
    }
    if (result.severity === 'Moderate' || result.severity === 'Mild') {
      return (
        <span className="bg-amber-100 text-amber-900 border border-amber-300 text-xs font-black px-3 py-1 rounded-full uppercase">
          {language === 'hi' ? result.severityHindi : result.severity}
        </span>
      );
    }
    return (
      <span className="bg-red-100 text-red-900 border border-red-300 text-xs font-black px-3 py-1 rounded-full uppercase">
        {language === 'hi' ? result.severityHindi : result.severity}
      </span>
    );
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-3 duration-300">
      {/* Toast Alert when Saved */}
      {isSaved && (
        <div className="bg-emerald-600 text-white p-3.5 rounded-2xl shadow-lg flex items-center justify-between text-xs sm:text-sm font-bold">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
            <span>{t.cropDoctor.diagnosisSavedToast}</span>
          </div>
          <button
            type="button"
            onClick={() => setTab('my-crops')}
            className="underline text-emerald-100 hover:text-white ml-2 text-xs"
          >
            {language === 'hi' ? 'मेरी फसलें देखें' : 'View in My Crops'}
          </button>
        </div>
      )}

      {/* Main Result Card */}
      <div className="bg-white border-2 border-emerald-500/80 rounded-3xl p-6 sm:p-8 shadow-md">
        {/* Top Header Badge */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-stone-100">
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-xs font-black uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              {t.cropDoctor.whatWeFound}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold text-stone-500">
              {t.dashboard.mainCrop}: <strong className="text-stone-900">{language === 'hi' ? result.cropHindi : result.crop}</strong>
            </span>
          </div>
        </div>

        {/* Diagnosis Core Banner: Disease name, Confidence, Severity, Health score */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center py-6">
          {/* Left Column: Leaf Image with Zoom */}
          <div className="lg:col-span-4">
            <div className="relative rounded-2xl overflow-hidden shadow border border-stone-200 aspect-square max-w-[220px] mx-auto">
              <img
                src={result.imageUrl}
                alt={result.disease}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 left-2 right-2 bg-stone-950/80 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-1 rounded-lg text-center truncate">
                {language === 'hi' ? result.diseaseHindi : result.disease}
              </div>
            </div>
          </div>

          {/* Middle & Right Columns: Problem, Confidence, Health Score */}
          <div className="lg:col-span-8 space-y-4">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                {getSeverityBadge()}
                <span className="bg-blue-50 text-blue-800 border border-blue-200 text-xs font-extrabold px-3 py-0.5 rounded-full">
                  {t.cropDoctor.confidenceScore}: {result.confidence}%
                </span>
                {result.scientificName && (
                  <span className="text-xs text-stone-400 italic">
                    ({result.scientificName})
                  </span>
                )}
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-stone-900">
                {language === 'hi' ? result.diseaseHindi : result.disease}
              </h2>
            </div>

            {/* Visual Health Gauge: e.g. 68/100 */}
            <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-extrabold text-stone-600 uppercase">
                  {t.cropDoctor.cropHealthScore}
                </span>
                <div className="flex items-baseline space-x-1">
                  <span className="text-2xl sm:text-3xl font-black text-stone-900">
                    {result.healthScore}
                  </span>
                  <span className="text-sm font-bold text-stone-400">/100</span>
                </div>
              </div>

              <div className="w-full bg-stone-200 h-3 rounded-full overflow-hidden p-0.5">
                <div
                  className={`h-full rounded-full transition-all duration-1000 ${
                    result.healthScore >= 80
                      ? 'bg-emerald-500'
                      : result.healthScore >= 60
                      ? 'bg-amber-500'
                      : 'bg-red-500'
                  }`}
                  style={{ width: `${result.healthScore}%` }}
                />
              </div>

              <p className="text-[11px] text-stone-500 mt-2">
                {result.healthScore >= 80 
                  ? 'Foliage in strong condition. Minimal risk to market yield.'
                  : 'Foliar disease active. Early treatment will prevent progression to fruits.'}
              </p>
            </div>
          </div>
        </div>

        {/* Symptoms & Contributing Conditions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-stone-100">
          {/* Symptoms */}
          <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200/80">
            <h3 className="font-extrabold text-sm text-stone-900 mb-2.5 flex items-center space-x-1.5">
              <span className="text-amber-600">🔍</span>
              <span>{t.cropDoctor.symptomsTitle}</span>
            </h3>
            <ul className="space-y-2 text-xs font-medium text-stone-700">
              {(language === 'hi' ? result.symptomsHi : result.symptomsEn).map((sym, idx) => (
                <li key={idx} className="flex items-start space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 flex-shrink-0" />
                  <span>{sym}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contributing Conditions */}
          <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200/80">
            <h3 className="font-extrabold text-sm text-stone-900 mb-2.5 flex items-center space-x-1.5">
              <span className="text-blue-600">🌧</span>
              <span>{t.cropDoctor.contributingTitle}</span>
            </h3>
            <ul className="space-y-2 text-xs font-medium text-stone-700">
              {(language === 'hi' ? result.contributingConditionsHi : result.contributingConditionsEn).map((cond, idx) => (
                <li key={idx} className="flex items-start space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                  <span>{cond}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 13. Expandable "Why did AI detect this?" section */}
        <div className="mt-5 border border-stone-200 rounded-2xl overflow-hidden">
          <button
            type="button"
            onClick={() => setWhyExpanded(!whyExpanded)}
            className="w-full px-4 py-3.5 bg-stone-50 hover:bg-stone-100 flex items-center justify-between text-left transition-colors cursor-pointer"
          >
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span className="font-bold text-xs sm:text-sm text-stone-900">
                {t.cropDoctor.whyAiTitle}
              </span>
            </div>
            <div className="flex items-center space-x-1 text-xs text-stone-500 font-semibold">
              <span className="hidden sm:inline">{t.cropDoctor.whyAiSubtitle}</span>
              {whyExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </div>
          </button>

          {whyExpanded && (
            <div className="p-4 bg-white text-xs sm:text-sm text-stone-700 leading-relaxed border-t border-stone-100 animate-in fade-in duration-150">
              <p>
                {language === 'hi' ? result.whyAiDetectedHi : result.whyAiDetectedEn}
              </p>
            </div>
          )}
        </div>

        {/* Agricultural Safety Warning Banner */}
        <div className="mt-5 bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start space-x-3 text-xs text-amber-900 font-medium">
          <ShieldAlert className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <p>
            <strong>{t.cropDoctor.safetyWarningTitle}:</strong> {t.safetyNoticeFull}
          </p>
        </div>

        {/* Bottom Action Buttons */}
        <div className="mt-6 pt-4 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={onAnalyzeAnother}
            className="bg-white hover:bg-stone-50 border border-stone-200 text-stone-800 font-bold text-xs sm:text-sm px-4 py-3 rounded-xl shadow-2xs transition-colors flex items-center space-x-2 cursor-pointer touch-target"
          >
            <RefreshCw className="w-4 h-4 text-stone-500" />
            <span>{t.cropDoctor.analyzeAnother}</span>
          </button>

          <div className="flex flex-wrap gap-2.5">
            <button
              type="button"
              onClick={handleSave}
              disabled={isSaved}
              className={`font-bold text-xs sm:text-sm px-5 py-3 rounded-xl transition-all flex items-center space-x-2 cursor-pointer touch-target ${
                isSaved
                  ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                  : 'bg-emerald-700 hover:bg-emerald-800 text-white shadow-md'
              }`}
            >
              <BookmarkCheck className="w-4 h-4" />
              <span>{isSaved ? 'Saved to My Crops' : t.cropDoctor.saveDiagnosis}</span>
            </button>

            <button
              type="button"
              onClick={() => setTab('market')}
              className="bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-xl shadow-md transition-all flex items-center space-x-2 cursor-pointer touch-target"
            >
              <Store className="w-4 h-4" />
              <span>{t.cropDoctor.viewMarketPlan}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
