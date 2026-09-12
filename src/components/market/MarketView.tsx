import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useApp } from '../../context/AppContext';
import { Store, ArrowUpRight } from 'lucide-react';

export const MarketView: React.FC = () => {
  const { t } = useLanguage();
  const { setTab } = useApp();

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-20 lg:pb-10">
      {/* Header */}
      <div className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 shadow-xs">
        <div className="flex items-center space-x-3 mb-2">
          <div className="w-10 h-10 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center">
            <Store className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-stone-900">
              {t.market.title}
            </h1>
            <p className="text-sm font-medium text-stone-600">
              {t.market.subtitle}
            </p>
          </div>
        </div>
      </div>

      {/* Comparison Preview Banner */}
      <div className="bg-gradient-to-r from-teal-900 to-emerald-900 text-white rounded-3xl p-6 sm:p-8 shadow-lg">
        <div className="max-w-2xl space-y-3">
          <span className="bg-amber-400 text-stone-950 text-xs font-black uppercase px-3 py-1 rounded-full">
            AI Mandi Engine
          </span>
          <h2 className="text-2xl sm:text-3xl font-black">
            Karnal vs Azadpur vs Sonipat Mandi
          </h2>
          <p className="text-teal-100 text-sm leading-relaxed">
            Market B (Azadpur) offers ₹2,250/qtl compared to local ₹1,900/qtl. Even after ₹4,000 diesel & transport costs for 20 quintals, you earn +₹3,500 more net profit!
          </p>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => setTab('sell-smart')}
              className="bg-white hover:bg-stone-100 text-teal-950 font-extrabold text-sm px-5 py-2.5 rounded-xl shadow transition-all inline-flex items-center space-x-2"
            >
              <span>View Smart Selling Plan</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Preview Market Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Mandi A */}
        <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-xs">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-bold text-stone-900 text-base">Karnal Mandi</h3>
            <span className="text-xs font-bold text-stone-500">18 km away</span>
          </div>
          <p className="text-2xl font-black text-stone-900 mb-2">₹2,000 <span className="text-xs font-normal text-stone-500">/ quintal</span></p>
          <p className="text-xs text-stone-600">Transport: ~₹1,800 for 20 qtl</p>
          <p className="text-xs font-bold text-stone-800 mt-2">Est. Net Return: ₹37,200</p>
        </div>

        {/* Mandi B (Highlighted) */}
        <div className="bg-white border-2 border-emerald-500 rounded-2xl p-5 shadow-md relative">
          <div className="absolute -top-3 right-4 bg-emerald-600 text-white text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full shadow-xs">
            Best Net Return
          </div>
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-bold text-emerald-950 text-base">Azadpur Mandi</h3>
            <span className="text-xs font-bold text-emerald-700">45 km away</span>
          </div>
          <p className="text-2xl font-black text-emerald-800 mb-2">₹2,250 <span className="text-xs font-normal text-stone-500">/ quintal</span></p>
          <p className="text-xs text-stone-600">Transport: ~₹4,000 for 20 qtl</p>
          <p className="text-xs font-bold text-emerald-800 mt-2">Est. Net Return: ₹40,000 (+₹3,500)</p>
        </div>

        {/* Mandi C */}
        <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-xs">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-bold text-stone-900 text-base">Sonipat Mandi</h3>
            <span className="text-xs font-bold text-stone-500">10 km away</span>
          </div>
          <p className="text-2xl font-black text-stone-900 mb-2">₹1,900 <span className="text-xs font-normal text-stone-500">/ quintal</span></p>
          <p className="text-xs text-stone-600">Transport: ~₹1,200 for 20 qtl</p>
          <p className="text-xs font-bold text-stone-800 mt-2">Est. Net Return: ₹36,500</p>
        </div>
      </div>
    </div>
  );
};
