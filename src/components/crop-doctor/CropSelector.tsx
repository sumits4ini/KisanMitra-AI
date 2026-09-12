import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { SUPPORTED_CROPS } from '../../services/cropDoctorService';

interface CropSelectorProps {
  selectedCrop: 'Tomato' | 'Wheat' | 'Rice' | 'Cotton' | 'Mustard' | 'Potato';
  onSelectCrop: (crop: 'Tomato' | 'Wheat' | 'Rice' | 'Cotton' | 'Mustard' | 'Potato') => void;
  disabled?: boolean;
}

export const CropSelector: React.FC<CropSelectorProps> = ({ 
  selectedCrop, 
  onSelectCrop,
  disabled = false 
}) => {
  const { t, language } = useLanguage();

  return (
    <div className="space-y-2">
      <label className="block text-xs font-black uppercase tracking-wider text-stone-500">
        {t.cropDoctor.step1} &mdash; {t.cropDoctor.selectCropPrompt}
      </label>

      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
        {SUPPORTED_CROPS.map(crop => {
          const isSelected = selectedCrop === crop.id;
          return (
            <button
              key={crop.id}
              type="button"
              disabled={disabled}
              onClick={() => onSelectCrop(crop.id as any)}
              className={`p-2.5 rounded-2xl border-2 transition-all flex flex-col items-center justify-center space-y-1 touch-target ${
                isSelected
                  ? 'border-emerald-600 bg-emerald-50/90 text-emerald-950 font-black shadow-xs scale-102'
                  : 'border-stone-200 bg-white hover:border-stone-300 text-stone-700 font-bold'
              } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <span className="text-2xl sm:text-3xl" role="img" aria-label={crop.nameEn}>
                {crop.icon}
              </span>
              <span className="text-xs tracking-tight text-center leading-tight">
                {language === 'hi' ? crop.nameHi : crop.nameEn}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
