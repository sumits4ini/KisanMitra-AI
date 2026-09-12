import React, { useState, useMemo } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useApp } from '../../context/AppContext';
import {
  DEFAULT_SELL_SMART_INPUTS,
  evaluateSellDecision,
} from '../../services/sellSmartService';
import { SellSmartInputsCard } from './SellSmartInputsCard';
import { ShouldISellHeroCard } from './ShouldISellHeroCard';
import { SmartSellingPlanCard } from './SmartSellingPlanCard';
import type { SellSmartInputs } from '../../types';
import { TrendingUp, Compass } from 'lucide-react';

export const SellSmartView: React.FC = () => {
  const { t } = useLanguage();
  const { setTab } = useApp();

  const [inputs, setInputs] = useState<SellSmartInputs>({
    ...DEFAULT_SELL_SMART_INPUTS,
  });

  const handleInputChange = (updated: Partial<SellSmartInputs>) => {
    setInputs(prev => ({ ...prev, ...updated }));
  };

  const handleApplyScenario = (scenario: 'tomato_split' | 'hold_grain' | 'perishable_rush') => {
    if (scenario === 'tomato_split') {
      setInputs({
        crop: 'Tomato',
        quantityQuintals: 20,
        currentPrice: 2250,
        expectedTrend: 'rising',
        estimatedShelfLifeDays: 3,
        storageAvailability: 'shaded_crates',
        transportCost: 4000,
        marketDemand: 'high',
        targetMandi: 'Azadpur Terminal Mandi, Delhi',
      });
    } else if (scenario === 'hold_grain') {
      setInputs({
        crop: 'Wheat',
        quantityQuintals: 50,
        currentPrice: 2450,
        expectedTrend: 'rising',
        estimatedShelfLifeDays: 180,
        storageAvailability: 'ventilated_shed',
        transportCost: 3500,
        marketDemand: 'high',
        targetMandi: 'Karnal APMC Mandi',
      });
    } else if (scenario === 'perishable_rush') {
      setInputs({
        crop: 'Tomato',
        quantityQuintals: 20,
        currentPrice: 2100,
        expectedTrend: 'falling',
        estimatedShelfLifeDays: 1,
        storageAvailability: 'none',
        transportCost: 3800,
        marketDemand: 'weak',
        targetMandi: 'Sonipat Sub-Mandi',
      });
    }
  };

  // Re-run evaluation whenever inputs change
  const decision = useMemo(() => {
    return evaluateSellDecision(inputs);
  }, [inputs]);

  return (
    <div className="space-y-7 max-w-7xl mx-auto pb-20 lg:pb-12">
      {/* 1. Header */}
      <div className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3.5">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center flex-shrink-0 shadow-xs">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
                {t.sellSmart.title}
              </h1>
              <p className="text-xs sm:text-sm font-medium text-stone-600 mt-0.5">
                {t.sellSmart.subtitle}
              </p>
            </div>
          </div>

          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 bg-amber-50 border border-amber-200 rounded-full self-start sm:self-auto text-xs font-black text-amber-900">
            <Compass className="w-3.5 h-3.5 text-amber-600 animate-spin" />
            <span>AI Predictive Decision Engine</span>
          </div>
        </div>
      </div>

      {/* 2. Interactive Inputs & Simulation Controller */}
      <SellSmartInputsCard
        inputs={inputs}
        onChange={handleInputChange}
        onApplyScenario={handleApplyScenario}
      />

      {/* 3. Hero Visual Recommendation Card: "Should I Sell Now?" */}
      <ShouldISellHeroCard decision={decision} />

      {/* 4. SMART SELLING PLAN */}
      <SmartSellingPlanCard
        decision={decision}
        cropName={inputs.crop}
        onNavigateToMarket={() => setTab('market')}
      />
    </div>
  );
};
