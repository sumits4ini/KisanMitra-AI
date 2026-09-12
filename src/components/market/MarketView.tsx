import React, { useState, useMemo } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useApp } from '../../context/AppContext';
import {
  calculateAllMarkets,
  PROTOTYPE_MARKET_NOTICE,
} from '../../services/marketIntelligenceService';
import { MarketInputsBar } from './MarketInputsBar';
import { BestMarketCard } from './BestMarketCard';
import { MandiCard } from './MandiCard';
import { MarketComparisonTable } from './MarketComparisonTable';
import { SellingPlanModal } from './SellingPlanModal';
import { ProfitCalculatorModal } from './ProfitCalculatorModal';
import type { MandiCalculationResult } from '../../types';
import {
  Store,
  LayoutGrid,
  Table as TableIcon,
  AlertTriangle,
  Info,
} from 'lucide-react';

export const MarketView: React.FC = () => {
  const { t, language } = useLanguage();
  const { setTab, user } = useApp();

  // Market inputs state
  const [selectedCrop, setSelectedCrop] = useState<string>('Tomato');
  const [quantity, setQuantity] = useState<number>(20);
  const [location, setLocation] = useState<string>(
    user ? `${user.location}, ${user.state}` : 'Karnal, Haryana'
  );

  // View mode: 'cards' | 'table'
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');

  // Modals state
  const [isSellingPlanOpen, setIsSellingPlanOpen] = useState(false);
  const [isProfitCalcOpen, setIsProfitCalcOpen] = useState(false);
  const [selectedTargetMandiId, setSelectedTargetMandiId] = useState<string | null>(null);

  // Run dynamic calculation for all markets
  const computedMandis: MandiCalculationResult[] = useMemo(() => {
    return calculateAllMarkets(selectedCrop, quantity, location);
  }, [selectedCrop, quantity, location]);

  // Identify best option
  const bestMandi = useMemo(() => {
    return computedMandis.find(m => m.isBestOption) || computedMandis[0];
  }, [computedMandis]);

  // Current active target mandi (defaults to best option)
  const activeMandi = useMemo(() => {
    if (selectedTargetMandiId) {
      const found = computedMandis.find(m => m.id === selectedTargetMandiId);
      if (found) return found;
    }
    return bestMandi;
  }, [selectedTargetMandiId, computedMandis, bestMandi]);

  const handleSelectMandi = (mandi: MandiCalculationResult) => {
    setSelectedTargetMandiId(mandi.id);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-20 lg:pb-12">
      {/* 1. Header */}
      <div className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3.5">
            <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-800 flex items-center justify-center flex-shrink-0 shadow-xs">
              <Store className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
                {t.market.title}
              </h1>
              <p className="text-xs sm:text-sm font-medium text-stone-600 mt-0.5">
                {t.market.subtitle}
              </p>
            </div>
          </div>

          {/* Quick Tab indicator */}
          <div className="flex items-center space-x-2 self-start sm:self-auto">
            <button
              type="button"
              onClick={() => setViewMode('cards')}
              className={`px-3 py-2 rounded-xl text-xs font-black flex items-center space-x-1.5 transition-all cursor-pointer ${
                viewMode === 'cards'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
              <span>{t.market.cardsView}</span>
            </button>

            <button
              type="button"
              onClick={() => setViewMode('table')}
              className={`px-3 py-2 rounded-xl text-xs font-black flex items-center space-x-1.5 transition-all cursor-pointer ${
                viewMode === 'table'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
              }`}
            >
              <TableIcon className="w-4 h-4" />
              <span>{t.market.tableView}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Benchmark Sample Market Data Notice */}
      <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 sm:p-5 shadow-xs">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-amber-400 text-stone-950 font-black text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full">
                {language === 'hi' ? PROTOTYPE_MARKET_NOTICE.badgeHi : PROTOTYPE_MARKET_NOTICE.badgeEn}
              </span>
              <span className="text-xs font-bold text-amber-900">
                {language === 'hi' ? 'बाजार दर सूचना' : 'Market Price Advisory'}
              </span>
            </div>
            <p className="text-xs text-amber-900 font-medium leading-relaxed">
              {language === 'hi' ? PROTOTYPE_MARKET_NOTICE.noticeHi : PROTOTYPE_MARKET_NOTICE.noticeEn}
            </p>
          </div>
        </div>
      </div>

      {/* 3. Inputs Bar: Crop, Quantity, Farmer Location */}
      <MarketInputsBar
        selectedCrop={selectedCrop}
        onCropChange={setSelectedCrop}
        quantity={quantity}
        onQuantityChange={setQuantity}
        location={location}
        onLocationChange={setLocation}
      />

      {/* 4. Highlight the Best Market (🏆 Best Option) with explicit reason and buttons */}
      <BestMarketCard
        bestMandi={bestMandi}
        onViewSellingPlan={() => setIsSellingPlanOpen(true)}
        onCalculateProfit={() => setIsProfitCalcOpen(true)}
      />

      {/* 5. Market Cards or Side-by-Side Comparison Table */}
      {viewMode === 'cards' ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-base font-black text-stone-900 tracking-tight">
              {language === 'hi' ? 'सभी मंडियों का विस्तृत विवरण' : 'All Nearby Mandi Options'}
            </h3>
            <span className="text-xs font-bold text-stone-500">
              {computedMandis.length} {language === 'hi' ? 'मंडियां उपलब्ध' : 'mandis analyzed'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {computedMandis.map(mandi => (
              <MandiCard
                key={mandi.id}
                mandi={mandi}
                onSelectMandi={handleSelectMandi}
              />
            ))}
          </div>
        </div>
      ) : (
        <MarketComparisonTable
          mandis={computedMandis}
          onSelectMandi={handleSelectMandi}
        />
      )}

      {/* 6. Realistic Formula Transparency Footer */}
      <div className="bg-stone-100/80 border border-stone-200 rounded-2xl p-4 flex items-center justify-between text-xs text-stone-600">
        <div className="flex items-center space-x-2">
          <Info className="w-4 h-4 text-emerald-700 flex-shrink-0" />
          <span>
            <strong>{language === 'hi' ? 'शुद्ध कमाई सूत्र:' : 'Net Calculation Formula:'}</strong>{' '}
            {language === 'hi'
              ? 'शुद्ध बचत = कुल बिक्री - ढुलाई खर्च - (मंडी सेस + हम्माली + कांटा पर्ची)'
              : 'Net In-Hand = Gross Revenue - Transport Cost - (Mandi Cess + Handling + Weighbridge)'}
          </span>
        </div>
        <div className="hidden sm:block text-stone-500 text-[11px] font-semibold">
          {language === 'hi' ? 'पारदर्शी गणना' : 'Transparent Logistics Formula'}
        </div>
      </div>

      {/* 7. Modals */}
      <SellingPlanModal
        isOpen={isSellingPlanOpen}
        onClose={() => setIsSellingPlanOpen(false)}
        mandi={activeMandi}
        cropName={selectedCrop}
        quantity={quantity}
        onNavigateToSellSmart={() => setTab('sell-smart')}
      />

      <ProfitCalculatorModal
        isOpen={isProfitCalcOpen}
        onClose={() => setIsProfitCalcOpen(false)}
        mandi={activeMandi}
        cropName={selectedCrop}
        quantity={quantity}
      />
    </div>
  );
};
