import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useApp } from '../../context/AppContext';
import type { FarmCrop } from '../../types';
import { FarmHealthSummaryBanner } from './FarmHealthSummaryBanner';
import { CropCard } from './CropCard';
import { CropHealthDetailPage } from './CropHealthDetailPage';
import { CropHealthHistoryTable } from './CropHealthHistoryTable';
import { Wheat, Plus } from 'lucide-react';

export const MyCropsView: React.FC = () => {
  const { t } = useLanguage();
  const { crops, setTab } = useApp();

  const [selectedCrop, setSelectedCrop] = useState<FarmCrop | null>(null);

  if (selectedCrop) {
    return (
      <CropHealthDetailPage
        crop={selectedCrop}
        onBack={() => setSelectedCrop(null)}
      />
    );
  }

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-20 lg:pb-12 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 shadow-xs">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
            <Wheat className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-stone-900">
              {t.myCrops.title}
            </h1>
            <p className="text-sm font-medium text-stone-600">
              {t.myCrops.subtitle}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setTab('crop-doctor')}
          className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold px-4 py-2.5 rounded-xl shadow-xs transition-colors flex items-center space-x-1.5 self-start sm:self-auto touch-target"
        >
          <Plus className="w-4 h-4" />
          <span>Add / Inspect Crop</span>
        </button>
      </div>

      {/* 1. Farm Health Summary Banner (Healthy, Needs Attention, High Risk) */}
      <FarmHealthSummaryBanner />

      {/* 2. Crop Cards Grid (Crop, Area, Health, Disease Risk, Last Diagnosis, Next Check) */}
      <div className="space-y-3">
        <h2 className="text-sm font-extrabold uppercase tracking-wider text-stone-500">
          Field Crops ({crops.length})
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {crops.map((crop) => (
            <CropCard
              key={crop.id}
              crop={crop}
              onSelectCrop={setSelectedCrop}
            />
          ))}
        </div>
      </div>

      {/* 3. Crop Health & Treatment History Table */}
      <CropHealthHistoryTable />
    </div>
  );
};
