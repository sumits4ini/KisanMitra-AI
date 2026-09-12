import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import type { MandiCalculationResult } from '../../types';
import { Trophy, Truck, ChevronDown, ChevronUp, ArrowRight, ShieldCheck } from 'lucide-react';

interface MandiCardProps {
  mandi: MandiCalculationResult;
  onSelectMandi: (mandi: MandiCalculationResult) => void;
}

export const MandiCard: React.FC<MandiCardProps> = ({ mandi, onSelectMandi }) => {
  const { t, language } = useLanguage();
  const [showBreakdown, setShowBreakdown] = useState(false);

  const mandiName = language === 'hi' ? mandi.nameHindi : mandi.name;
  const mandiCode = language === 'hi' ? mandi.codeHindi : mandi.code;

  return (
    <div
      className={`relative bg-white rounded-3xl p-5 sm:p-6 transition-all duration-200 border-2 ${
        mandi.isBestOption
          ? 'border-emerald-500 shadow-lg ring-4 ring-emerald-500/10'
          : 'border-stone-200 hover:border-stone-300 shadow-xs'
      }`}
    >
      {/* Top Best Option Flag */}
      {mandi.isBestOption && (
        <div className="absolute -top-3.5 left-6 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-sm flex items-center space-x-1">
          <Trophy className="w-3.5 h-3.5 text-amber-300" />
          <span>{t.market.bestOptionBadge}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex justify-between items-start pt-1 mb-3">
        <div>
          <span className="text-xs font-black text-stone-500 uppercase tracking-wider block">
            {mandiCode}
          </span>
          <h3 className="text-lg sm:text-xl font-black text-stone-900 leading-tight">
            {mandiName}
          </h3>
        </div>
        <span className="text-xs font-bold text-stone-600 bg-stone-100 px-2.5 py-1 rounded-full flex-shrink-0">
          {mandi.distanceKm} {t.market.kmAway}
        </span>
      </div>

      {/* Mandi Price */}
      <div className="bg-stone-50 rounded-2xl p-3.5 mb-4 border border-stone-100 flex items-baseline justify-between">
        <div>
          <span className="text-[11px] font-bold uppercase text-stone-500 block">
            {language === 'hi' ? 'मंडी दर' : 'Mandi Base Rate'}
          </span>
          <div className="flex items-baseline space-x-1">
            <span className="text-2xl sm:text-3xl font-black text-stone-900">
              ₹{mandi.pricePerQuintal.toLocaleString('en-IN')}
            </span>
            <span className="text-xs font-bold text-stone-500">
              {t.market.perQuintal}
            </span>
          </div>
        </div>
        <div className="text-right">
          <span className="text-[11px] font-bold text-stone-500 block">
            {language === 'hi' ? 'रुझान' : 'Trend'}
          </span>
          <span
            className={`text-xs font-black inline-flex items-center ${
              mandi.trend === 'up'
                ? 'text-emerald-700'
                : mandi.trend === 'down'
                ? 'text-rose-600'
                : 'text-stone-700'
            }`}
          >
            {mandi.trend === 'up' && `▲ +${mandi.trendPercent}%`}
            {mandi.trend === 'down' && `▼ ${mandi.trendPercent}%`}
            {mandi.trend === 'stable' && `— ${language === 'hi' ? 'स्थिर' : 'Stable'}`}
          </span>
        </div>
      </div>

      {/* The 4 Calculated Values:
          Gross Revenue
          Transport Cost
          Other Estimated Charges
          Estimated Net Return
      */}
      <div className="space-y-2.5 text-xs font-medium text-stone-600 border-b border-stone-100 pb-4">
        <div className="flex justify-between items-center">
          <span className="text-stone-600 font-bold">{t.market.grossRevenue}:</span>
          <span className="font-extrabold text-stone-900 text-sm">
            ₹{mandi.grossRevenue.toLocaleString('en-IN')}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-stone-600 font-bold flex items-center space-x-1">
            <Truck className="w-3.5 h-3.5 text-stone-400" />
            <span>{t.market.transportCost}:</span>
          </span>
          <span className="font-extrabold text-rose-600 text-sm">
            -₹{mandi.transportCost.toLocaleString('en-IN')}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <button
            type="button"
            onClick={() => setShowBreakdown(!showBreakdown)}
            className="text-stone-600 hover:text-stone-900 font-bold flex items-center space-x-1 underline decoration-dotted decoration-stone-400 cursor-pointer"
          >
            <span>{t.market.otherCharges}:</span>
            {showBreakdown ? (
              <ChevronUp className="w-3 h-3 text-stone-500" />
            ) : (
              <ChevronDown className="w-3 h-3 text-stone-500" />
            )}
          </button>
          <span className="font-extrabold text-amber-700 text-sm">
            -₹{mandi.otherCharges.toLocaleString('en-IN')}
          </span>
        </div>

        {/* Expandable Other Charges Breakdown */}
        {showBreakdown && (
          <div className="bg-amber-50/70 border border-amber-200/70 rounded-xl p-2.5 text-[11px] space-y-1 text-amber-900 mt-1 animate-fadeIn">
            <div className="flex justify-between">
              <span>{t.market.mandiCess} ({mandi.mandiCessPercent}%):</span>
              <span className="font-bold">₹{mandi.mandiCess.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between">
              <span>{t.market.handlingFee} (₹{mandi.handlingPerQuintal}/qtl):</span>
              <span className="font-bold">₹{mandi.handlingCost.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between">
              <span>{t.market.weighingFee}:</span>
              <span className="font-bold">₹{mandi.weighingFee.toLocaleString('en-IN')}</span>
            </div>
          </div>
        )}
      </div>

      {/* Estimated Net Return Section */}
      <div className="pt-4">
        <div className="flex justify-between items-end mb-2">
          <div>
            <span className="text-[11px] font-black uppercase text-stone-500 block">
              {t.market.estimatedNetReturn}
            </span>
            <div className="text-2xl sm:text-3xl font-black text-emerald-800 leading-tight">
              ₹{mandi.netReturn.toLocaleString('en-IN')}
            </div>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-bold uppercase text-stone-400 block">
              {t.market.netRatePerQuintal}
            </span>
            <span className="text-xs font-black text-stone-700">
              ₹{mandi.netPerQuintal.toLocaleString('en-IN')} {t.market.perQuintal}
            </span>
          </div>
        </div>

        {/* Action Button */}
        <button
          type="button"
          onClick={() => onSelectMandi(mandi)}
          className={`w-full mt-2 py-2.5 px-4 rounded-xl text-xs font-black flex items-center justify-center space-x-1.5 transition-all cursor-pointer ${
            mandi.isBestOption
              ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm'
              : 'bg-stone-100 hover:bg-stone-200 text-stone-800'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>{language === 'hi' ? 'इस मंडी का चयन करें' : 'Choose Target Mandi'}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
