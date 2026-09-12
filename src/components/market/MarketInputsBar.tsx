import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { SUPPORTED_CROPS_FOR_MARKET, DEMO_FARMER_LOCATIONS } from '../../services/marketIntelligenceService';
import { MapPin, Scale, Sprout } from 'lucide-react';

interface MarketInputsBarProps {
  selectedCrop: string;
  onCropChange: (crop: string) => void;
  quantity: number;
  onQuantityChange: (qty: number) => void;
  location: string;
  onLocationChange: (loc: string) => void;
}

const QUICK_QUANTITY_PRESETS = [10, 20, 50, 100];

export const MarketInputsBar: React.FC<MarketInputsBarProps> = ({
  selectedCrop,
  onCropChange,
  quantity,
  onQuantityChange,
  location,
  onLocationChange,
}) => {
  const { t, language } = useLanguage();

  return (
    <div className="bg-white border border-stone-200 rounded-3xl p-5 sm:p-7 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-5 border-b border-stone-100 gap-2">
        <div>
          <h2 className="text-lg font-black text-stone-900 tracking-tight flex items-center space-x-2">
            <span>{t.market.inputsTitle}</span>
          </h2>
          <p className="text-xs text-stone-500 font-medium mt-0.5">
            {t.market.inputsSubtitle}
          </p>
        </div>
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-emerald-50 text-emerald-800 text-xs font-bold rounded-full self-start sm:self-auto">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>
            {quantity} {t.market.quintals} &bull; {language === 'hi' ? 'लाइव गणना' : 'Real-time Net Return'}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* 1. Crop Selector */}
        <div>
          <label className="block text-xs font-extrabold text-stone-700 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
            <Sprout className="w-4 h-4 text-emerald-600" />
            <span>{t.market.inputCropLabel}</span>
          </label>
          <div className="relative">
            <select
              value={selectedCrop}
              onChange={e => onCropChange(e.target.value)}
              className="w-full bg-stone-50 hover:bg-stone-100/70 border border-stone-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 text-stone-900 font-bold text-sm rounded-2xl px-4 py-3 appearance-none cursor-pointer transition-all"
            >
              {SUPPORTED_CROPS_FOR_MARKET.map(crop => (
                <option key={crop.id} value={crop.id}>
                  {language === 'hi' ? crop.nameHi : crop.nameEn} (₹{crop.modalBasePrice.toLocaleString('en-IN')}/qtl)
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-stone-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* 2. Quantity Selector + Presets */}
        <div>
          <label className="block text-xs font-extrabold text-stone-700 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
            <Scale className="w-4 h-4 text-emerald-600" />
            <span>{t.market.inputQuantityLabel}</span>
          </label>
          <div className="flex items-center space-x-2">
            <div className="relative flex-1">
              <input
                type="number"
                min="1"
                max="500"
                value={quantity}
                onChange={e => {
                  const val = parseInt(e.target.value, 10);
                  onQuantityChange(isNaN(val) ? 1 : Math.max(1, Math.min(500, val)));
                }}
                className="w-full bg-stone-50 hover:bg-stone-100/70 border border-stone-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 text-stone-900 font-black text-base rounded-2xl px-4 py-2.5 transition-all"
              />
              <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-stone-500 pointer-events-none">
                {t.market.quintals}
              </span>
            </div>
          </div>

          {/* Quick presets */}
          <div className="flex items-center space-x-1.5 mt-2">
            <span className="text-[11px] font-bold text-stone-400">
              {t.market.quantityPresets}
            </span>
            {QUICK_QUANTITY_PRESETS.map(preset => (
              <button
                key={preset}
                type="button"
                onClick={() => onQuantityChange(preset)}
                className={`px-2 py-0.5 rounded-lg text-xs font-black transition-all ${
                  quantity === preset
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                }`}
              >
                {preset}q
              </button>
            ))}
          </div>
        </div>

        {/* 3. Farmer Location */}
        <div>
          <label className="block text-xs font-extrabold text-stone-700 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
            <MapPin className="w-4 h-4 text-emerald-600" />
            <span>{t.market.inputLocationLabel}</span>
          </label>
          <div className="relative">
            <select
              value={location}
              onChange={e => onLocationChange(e.target.value)}
              className="w-full bg-stone-50 hover:bg-stone-100/70 border border-stone-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 text-stone-900 font-bold text-sm rounded-2xl px-4 py-3 appearance-none cursor-pointer transition-all"
            >
              {DEMO_FARMER_LOCATIONS.map(loc => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-stone-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
