import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useApp } from '../../context/AppContext';
import { Calendar, ArrowRight } from 'lucide-react';

export const CropHealthHistoryTable: React.FC = () => {
  const { t, language } = useLanguage();
  const { savedDiagnoses, setTab } = useApp();

  // Combine demo baseline history with any live saved diagnoses
  const defaultHistory = [
    {
      id: 'hist_demo_1',
      date: 'Today, 08:30 AM',
      crop: 'Tomato',
      cropHindi: 'टमाटर',
      diagnosis: 'Early Blight (Alternaria solani)',
      diseaseHindi: 'अगेती झुलसा (Early Blight)',
      severity: 'Moderate',
      severityHindi: 'मध्यम',
      healthScore: 68,
      recommendedActionEn: 'Prune infected lower foliage immediately and apply approved contact protective fungicide as per product label.',
      recommendedActionHi: 'निचले संक्रमित पत्ते काटकर हटाएं और उत्पाद लेबल के अनुसार अनुमोदित संपर्क फफूंदनाशक का छिड़काव करें।',
      imageUrl: '/images/leaf_early_blight.jpg',
    },
    {
      id: 'hist_demo_2',
      date: '2 Days Ago',
      crop: 'Wheat',
      cropHindi: 'गेहूं',
      diagnosis: 'Stripe Rust (Yellow Rust)',
      diseaseHindi: 'पीला रतुआ (Stripe Rust)',
      severity: 'Moderate',
      severityHindi: 'मध्यम',
      healthScore: 71,
      recommendedActionEn: 'Apply triazole group fungicide in 200L water/acre with flat fan nozzle as per local agricultural recommendations.',
      recommendedActionHi: 'कृषि अनुशंसा अनुसार 200 लीटर पानी प्रति एकड़ में फ्लैट फैन नोजल से अनुमोदित ट्रायजोल फफूंदनाशक का छिड़काव करें।',
      imageUrl: '/images/leaf_wheat_rust.jpg',
    },
    {
      id: 'hist_demo_3',
      date: '10 Days Ago',
      crop: 'Tomato',
      cropHindi: 'टमाटर',
      diagnosis: 'Healthy Foliage',
      diseaseHindi: 'स्वस्थ पत्ता (कोई रोग नहीं)',
      severity: 'None (Healthy)',
      severityHindi: 'उत्तम (रोगमुक्त)',
      healthScore: 94,
      recommendedActionEn: 'Routine weekly scouting. Continue regular drip irrigation and weed management.',
      recommendedActionHi: 'साप्ताहिक निरीक्षण जारी रखें। नियमित ड्रिप सिंचाई और खरपतवार नियंत्रण बनाए रखें।',
      imageUrl: '/images/leaf_healthy.jpg',
    },
  ];

  // Map any user saved diagnoses from current session
  const dynamicHistory = savedDiagnoses.map(d => ({
    id: d.id,
    date: d.timestamp,
    crop: d.crop,
    cropHindi: d.cropHindi,
    diagnosis: d.disease,
    diseaseHindi: d.diseaseHindi,
    severity: d.severity,
    severityHindi: d.severityHindi,
    healthScore: d.healthScore,
    recommendedActionEn: d.recommendedActionEn || 'Follow product label and consult agricultural expert.',
    recommendedActionHi: d.recommendedActionHi || 'उत्पाद लेबल के अनुसार उपयोग करें और कृषि विशेषज्ञ से सलाह लें।',
    imageUrl: d.imageUrl,
  }));

  // Deduplicate by ID
  const allHistory = [
    ...dynamicHistory,
    ...defaultHistory.filter(def => !dynamicHistory.some(dyn => dyn.diagnosis.includes(def.crop))),
  ];

  const getSeverityBadge = (severity: string, severityHi: string) => {
    if (severity.includes('Healthy') || severity.includes('None')) {
      return (
        <span className="text-[10px] font-black uppercase text-emerald-800 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded-full">
          {language === 'hi' ? severityHi : severity}
        </span>
      );
    }
    if (severity.includes('Moderate') || severity.includes('Medium')) {
      return (
        <span className="text-[10px] font-black uppercase text-amber-800 bg-amber-100 border border-amber-300 px-2 py-0.5 rounded-full">
          {language === 'hi' ? severityHi : severity}
        </span>
      );
    }
    return (
      <span className="text-[10px] font-black uppercase text-red-800 bg-red-100 border border-red-300 px-2 py-0.5 rounded-full">
        {language === 'hi' ? severityHi : severity}
      </span>
    );
  };

  return (
    <div className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-stone-100">
        <div>
          <h3 className="text-base sm:text-lg font-black text-stone-900 flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-emerald-600" />
            <span>{t.treatment.historyTableTitle}</span>
          </h3>
          <p className="text-xs text-stone-500 mt-0.5">
            {t.treatment.historyTableSubtitle}
          </p>
        </div>

        <button
          type="button"
          onClick={() => setTab('crop-doctor')}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-3.5 py-2 rounded-xl transition-colors inline-flex items-center space-x-1.5 self-start sm:self-auto"
        >
          <span>New Leaf Scan</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Desktop & Tablet Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-stone-200 text-[11px] font-black uppercase tracking-wider text-stone-500 bg-stone-50/80">
              <th className="py-3 px-3 rounded-l-xl">{t.treatment.dateCol}</th>
              <th className="py-3 px-3">{t.treatment.cropCol}</th>
              <th className="py-3 px-3">{t.treatment.diagnosisCol}</th>
              <th className="py-3 px-3">{t.treatment.severityCol}</th>
              <th className="py-3 px-3 rounded-r-xl">{t.treatment.actionCol}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100 text-xs">
            {allHistory.map(row => (
              <tr key={row.id} className="hover:bg-stone-50/60 transition-colors">
                {/* Date */}
                <td className="py-3.5 px-3 font-semibold text-stone-500 whitespace-nowrap">
                  {row.date}
                </td>

                {/* Crop */}
                <td className="py-3.5 px-3 font-bold text-stone-900 whitespace-nowrap">
                  {language === 'hi' ? row.cropHindi : row.crop}
                </td>

                {/* Diagnosis */}
                <td className="py-3.5 px-3">
                  <div className="flex items-center space-x-2.5">
                    {row.imageUrl && (
                      <img
                        src={row.imageUrl}
                        alt={row.diagnosis}
                        className="w-9 h-9 rounded-xl object-cover border border-stone-200 flex-shrink-0"
                      />
                    )}
                    <div>
                      <strong className="block font-bold text-stone-900">
                        {language === 'hi' ? row.diseaseHindi : row.diagnosis}
                      </strong>
                      <span className="text-[11px] font-semibold text-emerald-700">
                        Health: {row.healthScore}/100
                      </span>
                    </div>
                  </div>
                </td>

                {/* Severity */}
                <td className="py-3.5 px-3 whitespace-nowrap">
                  {getSeverityBadge(row.severity, row.severityHindi)}
                </td>

                {/* Recommended Action */}
                <td className="py-3.5 px-3 max-w-xs font-medium text-stone-700 leading-relaxed">
                  {language === 'hi' ? row.recommendedActionHi : row.recommendedActionEn}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card List */}
      <div className="md:hidden space-y-3">
        {allHistory.map(row => (
          <div key={row.id} className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-stone-400">{row.date}</span>
              {getSeverityBadge(row.severity, row.severityHindi)}
            </div>

            <div className="flex items-center space-x-3">
              {row.imageUrl && (
                <img
                  src={row.imageUrl}
                  alt={row.diagnosis}
                  className="w-12 h-12 rounded-xl object-cover border border-stone-200 flex-shrink-0"
                />
              )}
              <div>
                <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                  {language === 'hi' ? row.cropHindi : row.crop}
                </span>
                <h4 className="font-bold text-sm text-stone-900 mt-1">
                  {language === 'hi' ? row.diseaseHindi : row.diagnosis}
                </h4>
                <span className="text-[11px] text-stone-500">
                  Health: <strong>{row.healthScore}/100</strong>
                </span>
              </div>
            </div>

            <div className="pt-2 border-t border-stone-200/60 text-xs text-stone-700">
              <strong className="text-stone-900 block mb-0.5">{t.treatment.actionCol}:</strong>
              <p>{language === 'hi' ? row.recommendedActionHi : row.recommendedActionEn}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
