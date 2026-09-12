import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useApp } from '../../context/AppContext';
import type { DiagnosisResult } from '../../types';
import { FindExpertModal } from './FindExpertModal';
import { 
  ShieldAlert, 
  CheckCircle2, 
  Clock, 
  UserCheck, 
  BellRing, 
  Check, 
  ShieldCheck
} from 'lucide-react';

interface TreatmentProtectionGuidanceProps {
  result: DiagnosisResult;
}

export const TreatmentProtectionGuidance: React.FC<TreatmentProtectionGuidanceProps> = ({ result }) => {
  const { t, language } = useLanguage();
  const { notifications } = useApp();

  const [expertModalOpen, setExpertModalOpen] = useState(false);
  const [reminderSet, setReminderSet] = useState(false);

  const handleSetReminder = () => {
    setReminderSet(true);
    // Trigger a visual confirmation and schedule a local notification
    const reminderItem = {
      id: 'reminder_' + Date.now(),
      type: 'reminder' as const,
      titleEn: `Recheck ${result.crop} Foliage`,
      titleHi: `${result.cropHindi || result.crop} के पत्तों की पुनः जांच`,
      messageEn: `Scheduled inspection for ${result.disease} progression. Verify that concentric ring spots have stabilized.`,
      messageHi: `${result.diseaseHindi} के लक्षणों की पुनः जांच का समय। देखें कि क्या छल्लेदार धब्बे सूख गए हैं।`,
      timestamp: 'Scheduled (3 Days)',
      read: false,
      severity: 'info' as const,
    };
    notifications.unshift(reminderItem);
  };

  return (
    <div className="space-y-6 pt-4 border-t-2 border-stone-200">
      <div className="bg-gradient-to-br from-emerald-900 via-teal-900 to-green-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-1.5 text-xs font-black uppercase tracking-wider text-emerald-300 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-500/30 mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
              <span>Step-By-Step Agronomic Plan</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {t.treatment.sectionTitle}
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100 font-medium mt-1 max-w-xl">
              {t.treatment.sectionSubtitle}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setExpertModalOpen(true)}
            className="bg-amber-400 hover:bg-amber-300 text-stone-950 font-black text-xs sm:text-sm px-5 py-3 rounded-2xl shadow-lg transition-all flex items-center justify-center space-x-2 flex-shrink-0 cursor-pointer touch-target self-start sm:self-auto"
          >
            <UserCheck className="w-4 h-4 text-stone-950" />
            <span>{t.treatment.findExpertBtn}</span>
          </button>
        </div>
      </div>

      {/* 1. What Happened? */}
      <div className="bg-white border border-stone-200 rounded-3xl p-6 shadow-xs">
        <h3 className="text-base font-black text-stone-900 flex items-center space-x-2 mb-2">
          <span className="w-7 h-7 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xs">
            1
          </span>
          <span>{t.treatment.whatHappenedTitle}</span>
        </h3>
        <p className="text-xs sm:text-sm text-stone-700 leading-relaxed pl-9">
          {language === 'hi' ? result.whatHappenedHi : result.whatHappenedEn}
        </p>
      </div>

      {/* 2. Immediate Actions */}
      <div className="bg-white border border-stone-200 rounded-3xl p-6 shadow-xs">
        <h3 className="text-base font-black text-stone-900 flex items-center space-x-2 mb-3">
          <span className="w-7 h-7 rounded-xl bg-red-100 text-red-700 flex items-center justify-center font-bold text-xs">
            2
          </span>
          <span>{t.treatment.immediateTitle}</span>
        </h3>
        <div className="space-y-2.5 pl-9">
          {(language === 'hi' ? result.immediateActionsHi : result.immediateActionsEn).map((action, idx) => (
            <div key={idx} className="flex items-start space-x-3 bg-red-50/50 p-3 rounded-xl border border-red-100">
              <span className="w-5 h-5 rounded-full bg-red-600 text-white font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <span className="text-xs sm:text-sm text-stone-800 font-medium leading-relaxed">
                {action}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Prevention */}
      <div className="bg-white border border-stone-200 rounded-3xl p-6 shadow-xs">
        <h3 className="text-base font-black text-stone-900 flex items-center space-x-2 mb-3">
          <span className="w-7 h-7 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
            3
          </span>
          <span>{t.treatment.preventionTitle}</span>
        </h3>
        <div className="space-y-2.5 pl-9">
          {(language === 'hi' ? result.preventionHi : result.preventionEn).map((prev, idx) => (
            <div key={idx} className="flex items-start space-x-3 bg-emerald-50/40 p-3 rounded-xl border border-emerald-100">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <span className="text-xs sm:text-sm text-stone-800 font-medium leading-relaxed">
                {prev}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Treatment Guidance */}
      <div className="bg-white border-2 border-teal-500/80 rounded-3xl p-6 sm:p-7 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h3 className="text-base font-black text-stone-900 flex items-center space-x-2">
            <span className="w-7 h-7 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-xs">
              4
            </span>
            <span>{t.treatment.treatmentGuidanceTitle}</span>
          </h3>
          <span className="text-[11px] font-bold text-teal-800 bg-teal-50 border border-teal-200 px-3 py-1 rounded-full self-start sm:self-auto">
            Scientific Categories
          </span>
        </div>

        {/* Responsible Safety Box */}
        <div className="bg-amber-50 border border-amber-300 rounded-2xl p-4 flex items-start space-x-3 text-xs text-amber-950 font-medium shadow-2xs">
          <ShieldAlert className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-bold text-amber-900">{t.treatment.safetyBoxTitle}</p>
            <p className="leading-relaxed">"{t.treatment.safetyBoxNotice}"</p>
          </div>
        </div>

        {/* Categories Cards */}
        {result.treatmentGuidance && result.treatmentGuidance.length > 0 ? (
          <div className="space-y-4 pt-2">
            {result.treatmentGuidance.map((item, idx) => (
              <div 
                key={idx}
                className="bg-stone-50 border border-stone-200 rounded-2xl p-4 sm:p-5 space-y-3"
              >
                <div className="flex items-start justify-between gap-2 border-b border-stone-200/80 pb-2.5">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-teal-800 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded">
                      Category {idx + 1}
                    </span>
                    <h4 className="font-extrabold text-sm sm:text-base text-stone-900 mt-1">
                      {language === 'hi' ? item.categoryHi : item.categoryEn}
                    </h4>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  {/* Purpose */}
                  <div>
                    <strong className="text-stone-500 block text-[11px] uppercase mb-0.5">
                      {t.treatment.purposeLabel}:
                    </strong>
                    <p className="text-stone-800 font-medium">
                      {language === 'hi' ? item.purposeHi : item.purposeEn}
                    </p>
                  </div>

                  {/* Application Guidance */}
                  <div>
                    <strong className="text-stone-500 block text-[11px] uppercase mb-0.5">
                      {t.treatment.applicationLabel}:
                    </strong>
                    <p className="text-stone-800 font-medium">
                      {language === 'hi' ? item.applicationGuidanceHi : item.applicationGuidanceEn}
                    </p>
                  </div>
                </div>

                {/* Important Precautions */}
                <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl text-xs text-stone-800">
                  <strong className="text-amber-900 font-bold block mb-0.5">
                    ⚠ {t.treatment.precautionsLabel}:
                  </strong>
                  <p className="font-medium text-stone-700">
                    {language === 'hi' ? item.precautionsHi : item.precautionsEn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-6 text-center text-xs text-stone-500 bg-stone-50 rounded-2xl">
            No chemical treatment recommended for healthy crop. Continue normal field scouting.
          </div>
        )}
      </div>

      {/* 5. Recheck Reminder Banner */}
      <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-50 border-2 border-blue-200 rounded-3xl p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start space-x-3.5">
          <div className="w-11 h-11 rounded-2xl bg-blue-600 text-white flex items-center justify-center flex-shrink-0 shadow-md">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-blue-800 bg-blue-100 px-2 py-0.5 rounded">
                Inspection Window: {result.recheckDays || 3} Days
              </span>
              <h3 className="text-base font-black text-stone-900">
                {t.treatment.recheckTitle}
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-stone-700 mt-1 leading-relaxed">
              {language === 'hi' ? result.recheckGuidanceHi : result.recheckGuidanceEn}
            </p>
          </div>
        </div>

        {/* Set Reminder Button */}
        <div className="flex-shrink-0">
          <button
            type="button"
            onClick={handleSetReminder}
            disabled={reminderSet}
            className={`font-black text-xs sm:text-sm px-5 py-3 rounded-2xl shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer touch-target ${
              reminderSet
                ? 'bg-blue-100 text-blue-900 border border-blue-300'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {reminderSet ? <Check className="w-4 h-4" /> : <BellRing className="w-4 h-4" />}
            <span>{reminderSet ? t.treatment.recheckReminderSet : t.treatment.recheckReminderBtn}</span>
          </button>
        </div>
      </div>

      {/* Find Expert Modal */}
      <FindExpertModal
        isOpen={expertModalOpen}
        onClose={() => setExpertModalOpen(false)}
        cropName={language === 'hi' ? result.cropHindi : result.crop}
      />
    </div>
  );
};
