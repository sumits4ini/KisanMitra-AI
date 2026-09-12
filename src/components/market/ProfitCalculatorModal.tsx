import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import type { MandiCalculationResult } from '../../types';
import { X, Coins, Sparkles } from 'lucide-react';


interface ProfitCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  mandi: MandiCalculationResult;
  cropName: string;
  quantity: number;
}

export const ProfitCalculatorModal: React.FC<ProfitCalculatorModalProps> = ({
  isOpen,
  onClose,
  mandi,
  cropName,
  quantity,
}) => {
  const { t, language } = useLanguage();

  // Benchmark default cultivation costs (seeds, fertilizer, labor, irrigation)
  const defaultCostPerQtl =
    cropName === 'Tomato'
      ? 950
      : cropName === 'Wheat'
      ? 1100
      : cropName === 'Rice'
      ? 1600
      : cropName === 'Mustard'
      ? 2200
      : cropName === 'Potato'
      ? 650
      : 2800; // Cotton

  const [costPerQuintal, setCostPerQuintal] = useState<number>(defaultCostPerQtl);

  if (!isOpen) return null;

  const totalCultivationCost = quantity * costPerQuintal;
  const netMandiReturn = mandi.netReturn;
  const finalProfit = netMandiReturn - totalCultivationCost;
  const profitPerQuintal = Math.round(finalProfit / Math.max(1, quantity));
  const roiPercent =
    totalCultivationCost > 0
      ? Math.round((finalProfit / totalCultivationCost) * 100)
      : 0;

  const mandiName = language === 'hi' ? mandi.nameHindi : mandi.name;
  const mandiCode = language === 'hi' ? mandi.codeHindi : mandi.code;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-stone-900 text-white p-6 relative">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center space-x-2 text-amber-300 text-xs font-black uppercase tracking-wider mb-1">
            <Coins className="w-4 h-4 text-amber-300" />
            <span>{language === 'hi' ? 'खेत का वास्तविक मुनाफा' : 'Farm Net Income Engine'}</span>
          </div>
          <h2 className="text-2xl font-black tracking-tight">
            {t.market.profitModalTitle}
          </h2>
          <p className="text-emerald-200 text-xs font-medium mt-1">
            {t.market.profitModalSubtitle}
          </p>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Target Mandi Baseline */}
          <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div>
              <span className="text-[11px] font-black uppercase text-stone-500 block">
                {language === 'hi' ? 'चयनित मंडी शुद्ध प्राप्ति' : 'Selected Mandi Net Revenue'}
              </span>
              <p className="text-base font-black text-stone-900">
                {mandiCode} &bull; {mandiName}
              </p>
              <p className="text-xs text-stone-600 font-medium">
                {quantity} {t.market.quintals} {cropName} &bull; ₹{mandi.pricePerQuintal}/qtl
              </p>
            </div>
            <div className="text-left sm:text-right">
              <span className="text-xs font-bold text-stone-500 block">
                {t.market.mandiNetRevenue}
              </span>
              <span className="text-2xl font-black text-emerald-800">
                ₹{netMandiReturn.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          {/* Interactive Slider / Input for Cultivation Cost */}
          <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <label className="text-xs font-black text-amber-950 uppercase tracking-wider block">
                  {t.market.cultivationCostLabel}
                </label>
                <p className="text-[11px] text-amber-800 font-medium">
                  {language === 'hi'
                    ? 'बीज, जैविक/रासायनिक खाद, सिंचाई, जुताई व फसल तुड़ाई मजदूरी'
                    : 'Seeds, fertilizer, irrigation, pest control, and labor per quintal'}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-black text-amber-950">₹</span>
                <input
                  type="number"
                  min="200"
                  max="10000"
                  step="50"
                  value={costPerQuintal}
                  onChange={e => setCostPerQuintal(Math.max(0, parseInt(e.target.value, 10) || 0))}
                  className="w-24 bg-white border border-amber-300 focus:ring-2 focus:ring-amber-500 text-amber-950 font-black text-base rounded-xl px-3 py-1.5 text-center shadow-xs"
                />
                <span className="text-xs font-bold text-amber-800">/ qtl</span>
              </div>
            </div>

            {/* Slider */}
            <div>
              <input
                type="range"
                min="300"
                max="3000"
                step="50"
                value={costPerQuintal}
                onChange={e => setCostPerQuintal(parseInt(e.target.value, 10))}
                className="w-full accent-amber-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-amber-800 font-bold mt-1">
                <span>₹300 (कम लागत)</span>
                <span>₹1,500 (मध्यम)</span>
                <span>₹3,000 (उच्च लागत)</span>
              </div>
            </div>
          </div>

          {/* Calculation Breakdown Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Total Cultivation Expenses */}
            <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4">
              <span className="text-xs font-black text-stone-500 uppercase block">
                {t.market.totalProductionCost}
              </span>
              <p className="text-xs text-stone-500 font-medium mt-0.5">
                {quantity} {t.market.quintals} &times; ₹{costPerQuintal}
              </p>
              <div className="text-2xl font-black text-rose-600 mt-2">
                -₹{totalCultivationCost.toLocaleString('en-IN')}
              </div>
            </div>

            {/* Mandi Net Revenue */}
            <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4">
              <span className="text-xs font-black text-stone-500 uppercase block">
                {t.market.mandiNetRevenue}
              </span>
              <p className="text-xs text-stone-500 font-medium mt-0.5">
                {language === 'hi' ? 'ढुलाई व मंडी शुल्क कटने के बाद' : 'After freight & APMC cess'}
              </p>
              <div className="text-2xl font-black text-stone-900 mt-2">
                +₹{netMandiReturn.toLocaleString('en-IN')}
              </div>
            </div>
          </div>

          {/* Final Farmer Net Profit Hero */}
          <div className="bg-gradient-to-br from-emerald-600 to-teal-700 text-white rounded-2xl p-6 shadow-lg relative overflow-hidden">
            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-black text-emerald-100 uppercase tracking-wider block">
                  {t.market.finalFarmerProfit}
                </span>
                <div className="text-4xl sm:text-5xl font-black text-white mt-1">
                  ₹{finalProfit.toLocaleString('en-IN')}
                </div>
                <p className="text-xs font-bold text-emerald-100 mt-1">
                  (₹{profitPerQuintal.toLocaleString('en-IN')} {language === 'hi' ? 'प्रति क्विंटल शुद्ध लाभ' : 'net profit per quintal'})
                </p>
              </div>

              <div className="bg-white/15 backdrop-blur-md border border-white/20 rounded-2xl p-4 text-center flex-shrink-0">
                <span className="text-[11px] font-black uppercase text-amber-300 block">
                  {t.market.roiLabel}
                </span>
                <span className="text-3xl font-black text-white block mt-0.5">
                  +{roiPercent}%
                </span>
                <span className="text-[10px] text-emerald-100 font-semibold block mt-0.5">
                  {language === 'hi' ? 'लागत पर मुनाफा' : 'on investment'}
                </span>
              </div>
            </div>
          </div>

          {/* Advisory Box */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-start space-x-3">
            <Sparkles className="w-5 h-5 text-emerald-700 flex-shrink-0 mt-0.5" />
            <div>
              <span className="text-xs font-black text-emerald-900 uppercase block">
                {language === 'hi' ? 'AI लाभ विश्लेषण' : 'AI Profit Margin Assessment'}
              </span>
              <p className="text-xs text-emerald-800 font-medium mt-0.5">
                {t.market.profitGoodAdvice}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 bg-stone-50 border-t border-stone-200 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-black text-xs cursor-pointer transition-all"
          >
            {t.market.modalClose}
          </button>
        </div>
      </div>
    </div>
  );
};
