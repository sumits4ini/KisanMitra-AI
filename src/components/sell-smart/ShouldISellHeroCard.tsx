import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import type { SellSmartDecision } from '../../types';
import {
  Sparkles,
  CheckCircle2,
  TrendingUp,
  AlertCircle,
  Clock,
  ShieldAlert,
  ShieldCheck,
  Scale,
} from 'lucide-react';

interface ShouldISellHeroCardProps {
  decision: SellSmartDecision;
}

export const ShouldISellHeroCard: React.FC<ShouldISellHeroCardProps> = ({ decision }) => {
  const { t, language } = useLanguage();

  const headline = language === 'hi' ? decision.headlineHi : decision.headlineEn;
  const reason = language === 'hi' ? decision.reasonHi : decision.reasonEn;
  const badge = language === 'hi' ? decision.badgeHi : decision.badgeEn;
  const riskLabel = language === 'hi' ? decision.riskLabelHi : decision.riskLabelEn;
  const holdingWindow = language === 'hi' ? decision.holdingWindowTextHi : decision.holdingWindowTextEn;

  // Visual gradient theme based on recommendation
  const gradientClass =
    decision.recommendation === 'SELL NOW'
      ? 'from-emerald-950 via-teal-900 to-emerald-900 border-emerald-500/40'
      : decision.recommendation === 'WAIT'
      ? 'from-amber-950 via-orange-900 to-stone-900 border-amber-500/40'
      : 'from-stone-950 via-amber-950 to-teal-950 border-amber-500/40';

  return (

    <div
      className={`relative overflow-hidden bg-gradient-to-br ${gradientClass} text-white rounded-3xl p-6 sm:p-9 shadow-2xl border-2 transition-all duration-300`}
    >
      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -mr-24 -mt-24"></div>

      <div className="relative z-10 space-y-6">
        {/* Top Badges & Confidence */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center space-x-1.5 bg-amber-400 text-stone-950 text-xs font-black uppercase tracking-wider px-3.5 py-1 rounded-full shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-stone-950" />
              <span>AI Decision Engine</span>
            </span>

            <span className="inline-flex items-center space-x-1.5 bg-white/15 backdrop-blur-md border border-white/20 text-white text-xs font-black px-3 py-1 rounded-full">
              <span>{badge}</span>
            </span>
          </div>

          <div className="flex items-center space-x-2 bg-black/30 backdrop-blur-md border border-white/10 px-3.5 py-1.5 rounded-full">
            <span className="text-[11px] font-bold text-stone-300 uppercase tracking-wider">
              {t.sellSmart.confidence}:
            </span>
            <span className="text-sm font-black text-amber-300">
              {decision.confidencePercent}%
            </span>
          </div>
        </div>

        {/* Main Recommendation Headline */}
        <div>
          <span className="text-xs font-black uppercase tracking-wider text-amber-300/90 block mb-1">
            {t.sellSmart.recommendationLabel}
          </span>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white flex items-center gap-3">
            {decision.recommendation === 'WAIT' && <Clock className="w-8 h-8 sm:w-12 sm:h-12 text-amber-400 flex-shrink-0 animate-pulse" />}
            {decision.recommendation === 'SELL NOW' && <ShieldCheck className="w-8 h-8 sm:w-12 sm:h-12 text-emerald-400 flex-shrink-0" />}
            {decision.recommendation === 'SELL PARTIALLY' && <Scale className="w-8 h-8 sm:w-12 sm:h-12 text-amber-300 flex-shrink-0" />}
            <span>{headline}</span>
          </h2>
        </div>

        {/* Reason Box (Highlighted clearly as required by prompt) */}
        <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-4 sm:p-5 space-y-1.5">
          <div className="flex items-center space-x-2 text-amber-300 text-xs font-black uppercase tracking-wider">
            <CheckCircle2 className="w-4 h-4 text-amber-400" />
            <span>{t.sellSmart.reasonLabel}</span>
          </div>
          <p className="text-white text-sm sm:text-lg font-semibold leading-relaxed">
            "{reason}"
          </p>
        </div>

        {/* 4 Required Decision Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
          {/* 1. Estimated Price Range */}
          <div className="bg-black/30 backdrop-blur-md border border-white/10 rounded-2xl p-4 space-y-1">
            <span className="text-[11px] font-extrabold uppercase text-stone-300 block flex items-center space-x-1">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
              <span>{t.sellSmart.estimatedPriceRange}</span>
            </span>
            <div className="text-xl sm:text-2xl font-black text-white">
              ₹{decision.estimatedPriceRange.min.toLocaleString('en-IN')} &ndash; ₹{decision.estimatedPriceRange.max.toLocaleString('en-IN')}
            </div>
            <span className="text-[11px] text-stone-400 font-semibold block">
              {t.market.perQuintal}
            </span>
          </div>

          {/* 2. Risk Level */}
          <div className="bg-black/30 backdrop-blur-md border border-white/10 rounded-2xl p-4 space-y-1">
            <span className="text-[11px] font-extrabold uppercase text-stone-300 block flex items-center space-x-1">
              {decision.riskLevel === 'Low' ? (
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              ) : decision.riskLevel === 'Moderate' ? (
                <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
              ) : (
                <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
              )}
              <span>{t.sellSmart.riskLevel}</span>
            </span>
            <div
              className={`text-xl sm:text-2xl font-black ${
                decision.riskLevel === 'Low'
                  ? 'text-emerald-300'
                  : decision.riskLevel === 'Moderate'
                  ? 'text-amber-300'
                  : 'text-rose-300'
              }`}
            >
              {decision.riskLevel}
            </div>
            <span className="text-[11px] text-stone-300 font-medium block truncate">
              {riskLabel}
            </span>
          </div>

          {/* 3. Estimated Additional Return */}
          <div className="bg-black/30 backdrop-blur-md border border-white/10 rounded-2xl p-4 space-y-1">
            <span className="text-[11px] font-extrabold uppercase text-stone-300 block flex items-center space-x-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{t.sellSmart.estimatedAdditionalReturn}</span>
            </span>
            <div className="text-xl sm:text-2xl font-black text-amber-300">
              +{decision.estimatedAdditionalReturn > 0
                ? `₹${decision.estimatedAdditionalReturn.toLocaleString('en-IN')}`
                : '₹0'}
            </div>
            <span className="text-[11px] text-amber-200/80 font-semibold block">
              {t.sellSmart.extraProfitBadge}
            </span>
          </div>

          {/* 4. Holding Window */}
          <div className="bg-black/30 backdrop-blur-md border border-white/10 rounded-2xl p-4 space-y-1">
            <span className="text-[11px] font-extrabold uppercase text-stone-300 block flex items-center space-x-1">
              <Clock className="w-3.5 h-3.5 text-stone-300" />
              <span>{t.sellSmart.holdingWindow}</span>
            </span>
            <div className="text-sm sm:text-base font-black text-white leading-snug">
              {holdingWindow}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
