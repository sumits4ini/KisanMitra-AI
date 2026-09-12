import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useApp } from '../../context/AppContext';
import type { FarmCrop } from '../../types';
import { 
  ArrowLeft, 
  Stethoscope, 
  AlertTriangle, 
  ShieldCheck, 
  AlertCircle, 
  Calendar, 
  Clock, 
  Sparkles, 
  ArrowRight
} from 'lucide-react';

interface CropHealthDetailPageProps {
  crop: FarmCrop;
  onBack: () => void;
}

export const CropHealthDetailPage: React.FC<CropHealthDetailPageProps> = ({ crop, onBack }) => {
  const { t, language } = useLanguage();
  const { savedDiagnoses, setTab } = useApp();

  // Filter diagnoses related to this crop
  const cropDiagnoses = savedDiagnoses.filter(d => 
    d.crop.toLowerCase() === crop.name.toLowerCase()
  );

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

  const handleScanNow = () => {
    setTab('crop-doctor');
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-20 lg:pb-12 animate-in fade-in duration-200">
      {/* Back Button & Top Navigation */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="bg-white hover:bg-stone-100 text-stone-800 font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-stone-200 shadow-2xs transition-all flex items-center space-x-2 cursor-pointer touch-target"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t.myCrops.backToCrops}</span>
        </button>

        <button
          type="button"
          onClick={handleScanNow}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-xs transition-colors flex items-center space-x-1.5 touch-target"
        >
          <Stethoscope className="w-4 h-4" />
          <span>{t.myCrops.rescanCropBtn}</span>
        </button>
      </div>

      {/* Header Banner: 1. Crop Overview */}
      <div className="bg-gradient-to-r from-emerald-900 to-green-900 text-white rounded-3xl p-6 sm:p-8 shadow-lg border border-emerald-700/60">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-0.5 rounded-full">
                {crop.variety}
              </span>
              {getStatusBadge()}
            </div>

            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              {language === 'hi' ? crop.hindiName : crop.name}
            </h1>

            <p className="text-xs sm:text-sm text-emerald-100 font-medium mt-1">
              {t.myCrops.stageLabel}: <strong className="text-white">{language === 'hi' ? crop.stageHindi : crop.stage}</strong>
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="grid grid-cols-2 gap-3 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15 text-xs text-emerald-100">
            <div>
              <span className="text-[11px] text-emerald-300 block">{t.myCrops.areaLabel}</span>
              <strong className="text-white text-base">{crop.acreage} {t.dashboard.acres}</strong>
            </div>
            <div>
              <span className="text-[11px] text-emerald-300 block">{t.myCrops.sowingDateLabel}</span>
              <strong className="text-white text-base">{crop.sowingDate}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* 2 & 7. Health Score & Simple Health Trend Visualization */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* 2. Health Score Card */}
        <div className="lg:col-span-5 bg-white border border-stone-200 rounded-3xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-stone-500">
              {t.myCrops.healthScoreTab}
            </span>

            <div className="flex items-baseline space-x-2 mt-3">
              <span className="text-5xl font-black text-stone-900 tracking-tight">
                {crop.healthScore}
              </span>
              <span className="text-xl font-bold text-stone-400">/100</span>
            </div>

            {/* Health Bar */}
            <div className="w-full bg-stone-100 h-3.5 rounded-full mt-4 overflow-hidden p-0.5 border border-stone-200/60">
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

          <div className="mt-6 pt-4 border-t border-stone-100 text-xs text-stone-600 space-y-1.5">
            <p><strong>Last Recorded Diagnosis:</strong> {language === 'hi' ? crop.lastDiagnosisHindi : crop.lastDiagnosis}</p>
            <p><strong>Inspection Status:</strong> {crop.lastCheckedDate}</p>
          </div>
        </div>

        {/* 7. Simple Health Trend Visualization (Farmer-Friendly, No Complex Multi-Axis) */}
        <div className="lg:col-span-7 bg-white border border-stone-200 rounded-3xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-stone-500">
                {t.myCrops.trendTab}
              </span>
              <h3 className="font-black text-stone-900 text-base mt-0.5">
                {t.myCrops.weeklyProgression}
              </h3>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
              Stable
            </span>
          </div>

          {/* Simple Visual Bar Chart */}
          <div className="pt-2">
            <div className="grid grid-cols-4 gap-3 items-end h-36 border-b border-stone-200 pb-2">
              {crop.healthTrend.map((point, idx) => {
                const heightPercent = Math.max(30, point.score);
                const isLatest = idx === crop.healthTrend.length - 1;
                return (
                  <div key={idx} className="flex flex-col items-center h-full justify-end group">
                    <span className="text-xs font-bold text-stone-900 mb-1.5 opacity-90 group-hover:scale-110 transition-transform">
                      {point.score}%
                    </span>
                    <div 
                      className={`w-full max-w-[48px] rounded-t-xl transition-all duration-700 ${
                        isLatest
                          ? 'bg-gradient-to-t from-emerald-600 to-green-500 shadow-md'
                          : 'bg-stone-200 hover:bg-stone-300'
                      }`}
                      style={{ height: `${heightPercent}%` }}
                    />
                  </div>
                );
              })}
            </div>

            <div className="grid grid-cols-4 gap-3 text-center text-[11px] font-bold text-stone-400 pt-2">
              {crop.healthTrend.map((point, idx) => (
                <span key={idx}>{point.date}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 5. AI Recommendations Card */}
      <div className="bg-gradient-to-br from-amber-50 via-stone-50 to-emerald-50 border-2 border-amber-200/80 rounded-3xl p-6 shadow-xs space-y-3">
        <h3 className="font-black text-stone-900 text-base flex items-center space-x-2">
          <Sparkles className="w-5 h-5 text-amber-600" />
          <span>{t.myCrops.aiRecommendationsTab}</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {(language === 'hi' ? crop.aiRecommendationsHi : crop.aiRecommendationsEn).map((rec, idx) => (
            <div key={idx} className="p-3.5 bg-white rounded-2xl border border-stone-200 shadow-2xs text-xs font-medium text-stone-800 leading-relaxed flex items-start space-x-2.5">
              <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <span>{rec}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 3 & 4. Diagnosis History & Treatment History */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 3. Diagnosis History */}
        <div className="bg-white border border-stone-200 rounded-3xl p-6 shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-stone-100">
            <h3 className="font-black text-stone-900 text-base flex items-center space-x-2">
              <Stethoscope className="w-5 h-5 text-emerald-600" />
              <span>{t.myCrops.diagnosisHistoryTab}</span>
            </h3>
            <span className="text-xs font-bold text-stone-400">
              {cropDiagnoses.length + 1} Records
            </span>
          </div>

          <div className="divide-y divide-stone-100 text-xs">
            {/* Baseline Diagnosis */}
            <div className="py-3 flex items-start space-x-3">
              <img
                src={crop.imageUrl}
                alt={crop.name}
                className="w-12 h-12 rounded-xl object-cover border border-stone-200 flex-shrink-0"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-stone-900">
                    {language === 'hi' ? crop.lastDiagnosisHindi : crop.lastDiagnosis}
                  </h4>
                  <span className="text-[10px] text-stone-400">{crop.lastCheckedDate}</span>
                </div>
                <p className="text-[11px] text-stone-600 mt-0.5">
                  Severity: {crop.diseaseRisk === 'medium' ? 'Moderate' : 'Low'} &bull; Score: {crop.healthScore}/100
                </p>
              </div>
            </div>

            {/* Any live saved diagnoses */}
            {cropDiagnoses.map(diag => (
              <div key={diag.id} className="py-3 flex items-start space-x-3">
                <img
                  src={diag.imageUrl}
                  alt={diag.disease}
                  className="w-12 h-12 rounded-xl object-cover border border-stone-200 flex-shrink-0"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-stone-900">
                      {language === 'hi' ? diag.diseaseHindi : diag.disease}
                    </h4>
                    <span className="text-[10px] text-stone-400">{diag.timestamp}</span>
                  </div>
                  <p className="text-[11px] text-stone-600 mt-0.5">
                    Severity: {diag.severity} &bull; Confidence: {diag.confidence}% &bull; Score: {diag.healthScore}/100
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Treatment History */}
        <div className="bg-white border border-stone-200 rounded-3xl p-6 shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-stone-100">
            <h3 className="font-black text-stone-900 text-base flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-teal-600" />
              <span>{t.myCrops.treatmentHistoryTab}</span>
            </h3>
            <span className="text-xs font-bold text-stone-400">
              {crop.treatmentHistory.length} Actions
            </span>
          </div>

          <div className="divide-y divide-stone-100 text-xs">
            {crop.treatmentHistory.map(item => (
              <div key={item.id} className="py-3 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded">
                    {language === 'hi' ? item.categoryHi : item.categoryEn}
                  </span>
                  <span className="text-[10px] font-medium text-stone-400">{item.date}</span>
                </div>
                <h4 className="font-bold text-stone-900 text-xs">
                  {language === 'hi' ? item.actionHi : item.actionEn}
                </h4>
                <p className="text-[11px] text-stone-600">
                  {language === 'hi' ? item.notesHi : item.notesEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 6. Recheck Reminders Banner */}
      <div className="bg-white border-2 border-blue-200 rounded-3xl p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start space-x-3.5">
          <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center flex-shrink-0">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-blue-800 bg-blue-100 px-2 py-0.5 rounded">
                Active Schedule
              </span>
              <h3 className="text-base font-black text-stone-900">
                {t.myCrops.recheckRemindersTab}: {crop.nextCheckDate}
              </h3>
            </div>
            <p className="text-xs text-stone-600 mt-1">
              {language === 'hi'
                ? `अगले 3 दिनों में ${crop.hindiName} के पत्तों की पुनः जांच करें और फफूंद प्रसार की स्थिति देखें।`
                : `Inspect lower foliage of ${crop.name} within 3 days to verify disease containment.`}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleScanNow}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs sm:text-sm px-6 py-3 rounded-xl shadow-md transition-all flex items-center justify-center space-x-2 flex-shrink-0 touch-target"
        >
          <Stethoscope className="w-4 h-4" />
          <span>{t.myCrops.rescanCropBtn}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
