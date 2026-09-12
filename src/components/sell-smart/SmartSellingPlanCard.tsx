import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import type { SellSmartDecision } from '../../types';
import {
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Send,
  Sparkles,
} from 'lucide-react';


interface SmartSellingPlanCardProps {
  decision: SellSmartDecision;
  cropName: string;
  onNavigateToMarket: () => void;
}

export const SmartSellingPlanCard: React.FC<SmartSellingPlanCardProps> = ({
  decision,
  cropName,
  onNavigateToMarket,
}) => {
  const { t, language } = useLanguage();
  const [isConfirmed, setIsConfirmed] = useState(false);

  const { plan } = decision;
  const b1 = plan.batch1;
  const b2 = plan.batch2;

  const handleConfirm = () => {
    setIsConfirmed(true);
    setTimeout(() => {
      setIsConfirmed(false);
    }, 4000);
  };

  return (
    <div className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-100 gap-2">
        <div>
          <span className="text-xs font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-0.5 rounded-full inline-block mb-1.5">
            {t.sellSmart.smartSellingPlanTitle}
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">
            {language === 'hi'
              ? `अनुशंसित स्मार्ट बिक्री योजना (${b1.quintals + b2.quintals} क्विंटल ${cropName})`
              : `Recommended Smart Selling Plan (${b1.quintals + b2.quintals} Quintals ${cropName})`}
          </h3>
          <p className="text-xs text-stone-500 font-medium mt-0.5">
            {t.sellSmart.smartSellingPlanSub}
          </p>
        </div>
      </div>

      {/* Confirmation Banner */}
      {isConfirmed && (
        <div className="bg-emerald-50 border-2 border-emerald-500 rounded-2xl p-4 flex items-center space-x-3 text-emerald-900 animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          <span className="text-xs sm:text-sm font-bold">
            {t.sellSmart.planConfirmedToast}
          </span>
        </div>
      )}

      {/* The Two Batches (Formatted cleanly as in prompt example) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Batch 1: Sell Now */}
        <div className="border-2 border-emerald-300 bg-emerald-50/40 rounded-3xl p-5 sm:p-6 space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-emerald-900 bg-emerald-200/80 px-2.5 py-1 rounded-full">
              {t.sellSmart.batch1Header}
            </span>
            <span className="text-xs font-black text-emerald-800">
              ₹{b1.expectedRate.toLocaleString('en-IN')}/qtl
            </span>
          </div>

          {/* Example Format: 12 quintals → Market B → Sell now */}
          <div className="pt-1">
            <div className="text-lg sm:text-xl font-black text-stone-900 flex items-center space-x-2 flex-wrap">
              <span className="text-emerald-900 font-extrabold">{b1.quintals} {t.market.quintals}</span>
              <ArrowRight className="w-4 h-4 text-stone-400" />
              <span className="text-stone-900">Market B</span>
              <ArrowRight className="w-4 h-4 text-stone-400" />
              <span className="text-emerald-700 font-black">
                {language === 'hi' ? b1.actionHi : b1.actionEn}
              </span>
            </div>
            <p className="text-xs font-bold text-stone-500 mt-1">
              {language === 'hi' ? b1.timingHi : b1.timingEn}
            </p>
          </div>

          <p className="text-xs text-stone-700 leading-relaxed font-medium">
            {language === 'hi' ? b1.rationaleHi : b1.rationaleEn}
          </p>

          <div className="pt-2 border-t border-emerald-200 flex justify-between items-center text-xs">
            <span className="text-stone-600 font-semibold">
              {language === 'hi' ? 'किश्त 1 शुद्ध आय:' : 'Batch 1 Net Return:'}
            </span>
            <span className="text-sm font-black text-emerald-900">
              ₹{b1.netEstimatedReturn.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        {/* Batch 2: Hold */}
        <div className="border-2 border-amber-300 bg-amber-50/40 rounded-3xl p-5 sm:p-6 space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-amber-900 bg-amber-200/80 px-2.5 py-1 rounded-full">
              {t.sellSmart.batch2Header}
            </span>
            <span className="text-xs font-black text-amber-800">
              ₹{b2.expectedRate.toLocaleString('en-IN')}/qtl
            </span>
          </div>

          {/* Example Format: 8 quintals → Market B → Hold for 1–2 days */}
          <div className="pt-1">
            <div className="text-lg sm:text-xl font-black text-stone-900 flex items-center space-x-2 flex-wrap">
              <span className="text-amber-900 font-extrabold">{b2.quintals} {t.market.quintals}</span>
              <ArrowRight className="w-4 h-4 text-stone-400" />
              <span className="text-stone-900">Market B</span>
              <ArrowRight className="w-4 h-4 text-stone-400" />
              <span className="text-amber-700 font-black">
                {language === 'hi' ? b2.actionHi : b2.actionEn}
              </span>
            </div>
            <p className="text-xs font-bold text-stone-500 mt-1">
              {language === 'hi' ? b2.timingHi : b2.timingEn}
            </p>
          </div>

          <p className="text-xs text-stone-700 leading-relaxed font-medium">
            {language === 'hi' ? b2.rationaleHi : b2.rationaleEn}
          </p>

          <div className="pt-2 border-t border-amber-200 flex justify-between items-center text-xs">
            <span className="text-stone-600 font-semibold">
              {language === 'hi' ? 'किश्त 2 शुद्ध आय:' : 'Batch 2 Net Return:'}
            </span>
            <span className="text-sm font-black text-amber-900">
              ₹{b2.netEstimatedReturn.toLocaleString('en-IN')}
            </span>
          </div>
        </div>
      </div>

      {/* 3 Required Financial Comparison Metrics */}
      <div className="bg-stone-900 text-white rounded-3xl p-6 shadow-md">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 text-center sm:text-left divide-y sm:divide-y-0 sm:divide-x divide-stone-800">
          {/* Estimated Current Return */}
          <div className="sm:pr-4 space-y-1">
            <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block">
              {t.sellSmart.estimatedCurrentReturn}
            </span>
            <div className="text-2xl sm:text-3xl font-black text-stone-200">
              ₹{plan.currentReturn.toLocaleString('en-IN')}
            </div>
            <span className="text-[10px] text-stone-400 font-medium block">
              {language === 'hi' ? 'यदि आज पूरी फसल बेची जाए' : 'If 100% sold today'}
            </span>
          </div>

          {/* Estimated Optimized Return */}
          <div className="pt-3 sm:pt-0 sm:px-4 space-y-1">
            <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block">
              {t.sellSmart.estimatedOptimizedReturn}
            </span>
            <div className="text-2xl sm:text-3xl font-black text-emerald-300">
              ₹{plan.optimizedReturn.toLocaleString('en-IN')}
            </div>
            <span className="text-[10px] text-emerald-200/80 font-medium block">
              {language === 'hi' ? 'स्मार्ट किश्त वितरण के साथ' : 'With AI 2-phase split plan'}
            </span>
          </div>

          {/* Potential Difference */}
          <div className="pt-3 sm:pt-0 sm:pl-4 space-y-1">
            <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider block flex items-center justify-center sm:justify-start space-x-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{t.sellSmart.potentialDifference}</span>
            </span>
            <div className="text-2xl sm:text-3xl font-black text-amber-300">
              +₹{plan.potentialDifference.toLocaleString('en-IN')}
            </div>
            <span className="text-[10px] text-amber-200/80 font-medium block">
              {t.sellSmart.extraProfitBadge}
            </span>
          </div>
        </div>
      </div>

      {/* Mandatory Disclaimer explicitly required in prompt */}
      <div className="bg-amber-50/80 border border-amber-300 rounded-2xl p-4 sm:p-5 flex items-start space-x-3 text-amber-950">
        <AlertTriangle className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <p className="text-xs font-black uppercase tracking-wider text-amber-900">
            "{t.sellSmart.forecastDisclaimer}"
          </p>
          <p className="text-[11px] font-medium text-amber-800 leading-relaxed">
            {t.sellSmart.forecastDisclaimerSub}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
        <button
          type="button"
          onClick={onNavigateToMarket}
          className="w-full sm:w-auto px-5 py-3 rounded-2xl border border-stone-300 hover:bg-stone-100 text-stone-700 font-extrabold text-xs transition-all cursor-pointer text-center"
        >
          {t.sellSmart.backToMarketBtn}
        </button>

        <button
          type="button"
          onClick={handleConfirm}
          className="w-full sm:w-auto bg-emerald-700 hover:bg-emerald-800 text-white font-black text-xs px-6 py-3 rounded-2xl shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer hover:scale-[1.01] active:scale-[0.99]"
        >
          <Send className="w-4 h-4" />
          <span>{t.sellSmart.confirmScheduleBtn}</span>
        </button>
      </div>
    </div>
  );
};
