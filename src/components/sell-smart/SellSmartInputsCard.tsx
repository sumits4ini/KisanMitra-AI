import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import type { SellSmartInputs, PriceTrendType, StorageType, MarketDemandType } from '../../types';
import {
  STORAGE_OPTIONS,
  DEMAND_OPTIONS,
  TREND_OPTIONS,
} from '../../services/sellSmartService';
import { Sliders, Sparkles, TrendingUp, Warehouse, DollarSign, Scale, Clock, Truck } from 'lucide-react';

interface SellSmartInputsCardProps {
  inputs: SellSmartInputs;
  onChange: (updated: Partial<SellSmartInputs>) => void;
  onApplyScenario: (scenario: 'tomato_split' | 'hold_grain' | 'perishable_rush') => void;
}

export const SellSmartInputsCard: React.FC<SellSmartInputsCardProps> = ({
  inputs,
  onChange,
  onApplyScenario,
}) => {
  const { t, language } = useLanguage();

  return (
    <div className="bg-white border border-stone-200 rounded-3xl p-5 sm:p-7 shadow-xs space-y-5">
      {/* Header with quick scenarios */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-100 gap-3">
        <div>
          <h2 className="text-lg font-black text-stone-900 tracking-tight flex items-center space-x-2">
            <Sliders className="w-5 h-5 text-amber-600" />
            <span>{t.sellSmart.inputsHeader}</span>
          </h2>
          <p className="text-xs text-stone-500 font-medium mt-0.5">
            {t.sellSmart.inputsSub}
          </p>
        </div>

        {/* 1-click Simulation Presets */}
        <div className="flex flex-wrap items-center gap-1.5 self-start sm:self-auto">
          <span className="text-[11px] font-bold text-stone-400 mr-1 flex items-center">
            <Sparkles className="w-3 h-3 text-amber-500 mr-1" />
            {t.sellSmart.scenarios}
          </span>

          <button
            type="button"
            onClick={() => onApplyScenario('tomato_split')}
            className="text-[11px] font-extrabold bg-amber-100 hover:bg-amber-200 text-amber-900 px-2.5 py-1 rounded-lg transition-all cursor-pointer"
          >
            {t.sellSmart.scenarioTomatoSplit}
          </button>

          <button
            type="button"
            onClick={() => onApplyScenario('hold_grain')}
            className="text-[11px] font-extrabold bg-emerald-100 hover:bg-emerald-200 text-emerald-900 px-2.5 py-1 rounded-lg transition-all cursor-pointer"
          >
            {t.sellSmart.scenarioHoldGrain}
          </button>

          <button
            type="button"
            onClick={() => onApplyScenario('perishable_rush')}
            className="text-[11px] font-extrabold bg-rose-100 hover:bg-rose-200 text-rose-900 px-2.5 py-1 rounded-lg transition-all cursor-pointer"
          >
            {t.sellSmart.scenarioPerishableRush}
          </button>
        </div>
      </div>

      {/* Grid of Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 1. Current Price */}
        <div>
          <label className="block text-xs font-extrabold text-stone-700 uppercase tracking-wider mb-1.5 flex items-center space-x-1">
            <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
            <span>{t.sellSmart.currentPrice}</span>
          </label>
          <div className="relative">
            <input
              type="number"
              step="25"
              min="500"
              max="15000"
              value={inputs.currentPrice}
              onChange={e => onChange({ currentPrice: Math.max(100, parseInt(e.target.value, 10) || 0) })}
              className="w-full bg-stone-50 border border-stone-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 text-stone-900 font-black text-sm rounded-xl px-3 py-2.5"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-stone-400 pointer-events-none">
              / qtl
            </span>
          </div>
        </div>

        {/* 2. Expected Trend */}
        <div>
          <label className="block text-xs font-extrabold text-stone-700 uppercase tracking-wider mb-1.5 flex items-center space-x-1">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
            <span>{t.sellSmart.expectedTrend}</span>
          </label>
          <div className="grid grid-cols-3 gap-1">
            {TREND_OPTIONS.map(tr => (
              <button
                key={tr.id}
                type="button"
                onClick={() => onChange({ expectedTrend: tr.id as PriceTrendType })}
                className={`py-2 px-1 text-[11px] font-black rounded-xl border transition-all cursor-pointer text-center ${
                  inputs.expectedTrend === tr.id
                    ? tr.id === 'rising'
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                      : tr.id === 'falling'
                      ? 'bg-rose-600 text-white border-rose-600 shadow-xs'
                      : 'bg-stone-800 text-white border-stone-800 shadow-xs'
                    : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200'
                }`}
              >
                {tr.id === 'rising' ? '▲ +8%' : tr.id === 'falling' ? '▼ -6%' : '— 0%'}
              </button>
            ))}
          </div>
        </div>

        {/* 3. Crop Quantity */}
        <div>
          <label className="block text-xs font-extrabold text-stone-700 uppercase tracking-wider mb-1.5 flex items-center space-x-1">
            <Scale className="w-3.5 h-3.5 text-emerald-600" />
            <span>{t.sellSmart.cropQuantity}</span>
          </label>
          <div className="relative">
            <input
              type="number"
              min="1"
              max="500"
              value={inputs.quantityQuintals}
              onChange={e => onChange({ quantityQuintals: Math.max(1, parseInt(e.target.value, 10) || 1) })}
              className="w-full bg-stone-50 border border-stone-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 text-stone-900 font-black text-sm rounded-xl px-3 py-2.5"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-stone-400 pointer-events-none">
              qtl
            </span>
          </div>
        </div>

        {/* 4. Estimated Shelf Life */}
        <div>
          <label className="block text-xs font-extrabold text-stone-700 uppercase tracking-wider mb-1.5 flex items-center space-x-1">
            <Clock className="w-3.5 h-3.5 text-emerald-600" />
            <span>{t.sellSmart.shelfLife}</span>
          </label>
          <div className="relative">
            <input
              type="number"
              min="1"
              max="365"
              value={inputs.estimatedShelfLifeDays}
              onChange={e => onChange({ estimatedShelfLifeDays: Math.max(1, parseInt(e.target.value, 10) || 1) })}
              className="w-full bg-stone-50 border border-stone-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 text-stone-900 font-black text-sm rounded-xl px-3 py-2.5"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-stone-400 pointer-events-none">
              {t.sellSmart.shelfLifeDays}
            </span>
          </div>
        </div>

        {/* 5. Storage Availability */}
        <div>
          <label className="block text-xs font-extrabold text-stone-700 uppercase tracking-wider mb-1.5 flex items-center space-x-1">
            <Warehouse className="w-3.5 h-3.5 text-emerald-600" />
            <span>{t.sellSmart.storageType}</span>
          </label>
          <select
            value={inputs.storageAvailability}
            onChange={e => onChange({ storageAvailability: e.target.value as StorageType })}
            className="w-full bg-stone-50 border border-stone-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 text-stone-900 font-bold text-xs rounded-xl px-3 py-2.5 cursor-pointer"
          >
            {STORAGE_OPTIONS.map(st => (
              <option key={st.id} value={st.id}>
                {language === 'hi' ? st.nameHi : st.nameEn}
              </option>
            ))}
          </select>
        </div>

        {/* 6. Transportation Cost */}
        <div>
          <label className="block text-xs font-extrabold text-stone-700 uppercase tracking-wider mb-1.5 flex items-center space-x-1">
            <Truck className="w-3.5 h-3.5 text-emerald-600" />
            <span>{t.sellSmart.transportCost}</span>
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-stone-400 pointer-events-none">
              ₹
            </span>
            <input
              type="number"
              step="100"
              min="0"
              max="25000"
              value={inputs.transportCost}
              onChange={e => onChange({ transportCost: Math.max(0, parseInt(e.target.value, 10) || 0) })}
              className="w-full bg-stone-50 border border-stone-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 text-stone-900 font-black text-sm rounded-xl pl-6 pr-3 py-2.5"
            />
          </div>
        </div>

        {/* 7. Market Demand */}
        <div className="sm:col-span-2">
          <label className="block text-xs font-extrabold text-stone-700 uppercase tracking-wider mb-1.5 flex items-center space-x-1">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
            <span>{t.sellSmart.marketDemand}</span>
          </label>
          <select
            value={inputs.marketDemand}
            onChange={e => onChange({ marketDemand: e.target.value as MarketDemandType })}
            className="w-full bg-stone-50 border border-stone-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 text-stone-900 font-bold text-xs rounded-xl px-3 py-2.5 cursor-pointer"
          >
            {DEMAND_OPTIONS.map(dm => (
              <option key={dm.id} value={dm.id}>
                {language === 'hi' ? dm.nameHi : dm.nameEn}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
