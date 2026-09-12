import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { TrendingUp } from 'lucide-react';

export const SellSmartView: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-20 lg:pb-10">
      {/* Header */}
      <div className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 shadow-xs">
        <div className="flex items-center space-x-3 mb-2">
          <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-stone-900">
              {t.sellSmart.title}
            </h1>
            <p className="text-sm font-medium text-stone-600">
              {t.sellSmart.subtitle}
            </p>
          </div>
        </div>
      </div>

      {/* Should I Sell Now? Hero Card */}
      <div className="bg-gradient-to-br from-amber-500 via-amber-600 to-orange-600 text-white rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <span className="bg-white/20 backdrop-blur-md text-white text-xs font-black uppercase px-3 py-1 rounded-full">
              AI Decision Engine
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
              WAIT 1–2 DAYS (OR PARTIAL SALE)
            </h2>
            <p className="text-amber-100 text-sm max-w-xl font-medium leading-relaxed">
              "Expected price improvement in Azadpur may outweigh the holding period, provided harvested tomatoes are properly ventilated and disease-free."
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl text-center flex-shrink-0">
            <span className="block text-xs font-bold text-amber-200 uppercase">AI Confidence</span>
            <span className="text-3xl font-black text-white">76%</span>
            <span className="block text-[11px] text-amber-100 mt-1">Price trend: Bullish (+8%)</span>
          </div>
        </div>
      </div>

      {/* Split Selling Plan */}
      <div className="bg-white border border-stone-200 rounded-3xl p-6 shadow-xs">
        <h3 className="text-lg font-bold text-stone-900 mb-2">
          Recommended Smart Selling Plan (20 Quintals Tomato)
        </h3>
        <p className="text-xs text-stone-500 mb-4">
          Balances cash flow immediately while capturing anticipated mandi price gains.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="border border-emerald-200 bg-emerald-50/50 p-4 rounded-2xl">
            <span className="text-xs font-bold text-emerald-800 uppercase">Sell Now (Batch 1)</span>
            <p className="text-xl font-extrabold text-stone-900 mt-1">12 Quintals &rarr; Azadpur Mandi</p>
            <p className="text-xs text-stone-600 mt-1">Secures immediate working capital and reduces perishable storage load.</p>
          </div>
          <div className="border border-amber-200 bg-amber-50/50 p-4 rounded-2xl">
            <span className="text-xs font-bold text-amber-800 uppercase">Hold 1-2 Days (Batch 2)</span>
            <p className="text-xl font-extrabold text-stone-900 mt-1">8 Quintals &rarr; Expected +₹180/qtl</p>
            <p className="text-xs text-stone-600 mt-1">Projected additional return: +₹3,200.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
