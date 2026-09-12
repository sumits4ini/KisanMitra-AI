import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import type { MandiCalculationResult } from '../../types';
import { Trophy, ArrowUpRight, Calculator, Sparkles, TrendingUp, Truck, CheckCircle2 } from 'lucide-react';

interface BestMarketCardProps {
  bestMandi: MandiCalculationResult;
  onViewSellingPlan: () => void;
  onCalculateProfit: () => void;
}

export const BestMarketCard: React.FC<BestMarketCardProps> = ({
  bestMandi,
  onViewSellingPlan,
  onCalculateProfit,
}) => {
  const { t, language } = useLanguage();

  const mandiName = language === 'hi' ? bestMandi.nameHindi : bestMandi.name;
  const mandiCode = language === 'hi' ? bestMandi.codeHindi : bestMandi.code;
  const bestReason = language === 'hi' ? bestMandi.bestReasonHi : bestMandi.bestReasonEn;

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-emerald-950 via-teal-900 to-stone-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border-2 border-emerald-500/40">
      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        {/* Left column: Best Option Details & Reason */}
        <div className="space-y-4 max-w-2xl">
          {/* Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center space-x-1.5 bg-amber-400 text-stone-950 text-xs font-black uppercase tracking-wider px-3.5 py-1 rounded-full shadow-xs">
              <Trophy className="w-3.5 h-3.5 text-stone-950" />
              <span>{t.market.bestOptionBadge}</span>
            </span>

            <span className="inline-flex items-center space-x-1 bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold px-3 py-1 rounded-full">
              <Sparkles className="w-3 h-3 text-emerald-300" />
              <span>
                {bestMandi.additionalProfitVsSecondBest && bestMandi.additionalProfitVsSecondBest > 0
                  ? `+₹${bestMandi.additionalProfitVsSecondBest.toLocaleString('en-IN')} ${
                      language === 'hi' ? 'अतिरिक्त शुद्ध मुनाफा' : 'higher net profit'
                    }`
                  : language === 'hi'
                  ? 'सर्वोच्च शुद्ध कमाई'
                  : 'Highest Net In-Hand'}
              </span>
            </span>
          </div>

          {/* Mandi Title & Rate */}
          <div>
            <div className="flex items-baseline space-x-3">
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                {mandiCode} &bull; {mandiName}
              </h2>
            </div>
            <p className="text-emerald-300/90 text-sm font-semibold mt-1 flex items-center space-x-2">
              <span>{bestMandi.distanceKm} {t.market.kmAway}</span>
              <span>&bull;</span>
              <span className="text-white font-extrabold">
                ₹{bestMandi.pricePerQuintal.toLocaleString('en-IN')} {t.market.perQuintal}
              </span>
              <span>&bull;</span>
              <span className="inline-flex items-center text-emerald-400 text-xs font-bold">
                <TrendingUp className="w-3.5 h-3.5 mr-0.5" />
                +{bestMandi.trendPercent}% {language === 'hi' ? 'बाजार मांग' : 'trend'}
              </span>
            </p>
          </div>

          {/* Explicit AI Reason required by prompt */}
          <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-4 space-y-1.5">
            <div className="flex items-center space-x-2 text-amber-300 text-xs font-black uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
              <span>{t.market.reasonTitle}</span>
            </div>
            <p className="text-stone-100 text-sm sm:text-base font-medium leading-snug">
              "{bestReason}"
            </p>
          </div>

          {/* Quick deductions summary pills */}
          <div className="grid grid-cols-3 gap-2 pt-1 text-center">
            <div className="bg-black/25 rounded-xl p-2.5 border border-white/5">
              <span className="text-[10px] font-bold uppercase text-stone-400 block">
                {t.market.grossRevenue}
              </span>
              <span className="text-xs sm:text-sm font-black text-stone-200">
                ₹{bestMandi.grossRevenue.toLocaleString('en-IN')}
              </span>
            </div>
            <div className="bg-black/25 rounded-xl p-2.5 border border-white/5">
              <span className="text-[10px] font-bold uppercase text-stone-400 block flex items-center justify-center space-x-1">
                <Truck className="w-2.5 h-2.5 text-stone-400" />
                <span>{t.market.transportCost}</span>
              </span>
              <span className="text-xs sm:text-sm font-black text-rose-300">
                -₹{bestMandi.transportCost.toLocaleString('en-IN')}
              </span>
            </div>
            <div className="bg-black/25 rounded-xl p-2.5 border border-white/5">
              <span className="text-[10px] font-bold uppercase text-stone-400 block">
                {t.market.otherCharges}
              </span>
              <span className="text-xs sm:text-sm font-black text-amber-300">
                -₹{bestMandi.otherCharges.toLocaleString('en-IN')}
              </span>
            </div>
          </div>
        </div>

        {/* Right column: Net Return Card & Required Action Buttons */}
        <div className="flex flex-col justify-between space-y-4 bg-emerald-900/40 backdrop-blur-md border border-emerald-500/30 rounded-2xl p-5 lg:min-w-[300px]">
          <div>
            <span className="text-xs font-black text-emerald-300 uppercase tracking-wider block">
              {t.market.estimatedNetReturn}
            </span>
            <div className="mt-1 flex items-baseline space-x-2">
              <span className="text-4xl sm:text-5xl font-black text-white tracking-tight">
                ₹{bestMandi.netReturn.toLocaleString('en-IN')}
              </span>
            </div>
            <p className="text-xs font-bold text-emerald-300/80 mt-1">
              (₹{bestMandi.netPerQuintal.toLocaleString('en-IN')} {t.market.netRatePerQuintal})
            </p>
          </div>

          {/* The two explicit buttons requested in prompt:
              "Add: View Selling Plan"
              "Add: Calculate Profit"
          */}
          <div className="space-y-2.5 pt-2">
            <button
              type="button"
              onClick={onViewSellingPlan}
              className="w-full bg-white hover:bg-stone-100 text-stone-950 font-black text-sm px-4 py-3 rounded-xl shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer hover:shadow-lg hover:scale-[1.01] active:scale-[0.99]"
            >
              <span>{t.market.viewSellingPlanBtn}</span>
              <ArrowUpRight className="w-4 h-4 text-stone-950" />
            </button>

            <button
              type="button"
              onClick={onCalculateProfit}
              className="w-full bg-emerald-700/80 hover:bg-emerald-600/90 text-white font-black text-sm px-4 py-3 rounded-xl border border-emerald-400/40 shadow-xs transition-all flex items-center justify-center space-x-2 cursor-pointer hover:scale-[1.01] active:scale-[0.99]"
            >
              <Calculator className="w-4 h-4 text-amber-300" />
              <span>{t.market.calculateProfitBtn}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
