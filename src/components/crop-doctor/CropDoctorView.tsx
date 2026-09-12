import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { CropSelector } from './CropSelector';
import { ImageDropzone } from './ImageDropzone';
import { ScanningOverlay } from './ScanningOverlay';
import { DiagnosisCard } from './DiagnosisCard';
import { analyzeCropImage, type SampleLeaf } from '../../services/cropDoctorService';
import type { DiagnosisResult } from '../../types';
import { Stethoscope, Sparkles, ArrowRight } from 'lucide-react';

export const CropDoctorView: React.FC = () => {
  const { t } = useLanguage();

  const [selectedCrop, setSelectedCrop] = useState<'Tomato' | 'Wheat' | 'Rice' | 'Cotton' | 'Mustard' | 'Potato'>('Tomato');
  const [imagePreview, setImagePreview] = useState<string | null>('/images/leaf_early_blight.jpg');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [diagnosisResult, setDiagnosisResult] = useState<DiagnosisResult | null>(null);

  const handleSampleSelected = (sample: SampleLeaf) => {
    setSelectedCrop(sample.crop);
    setImagePreview(sample.imageUrl);
    setDiagnosisResult(null);
  };

  const handleImageSelected = (url: string) => {
    setImagePreview(url);
    setDiagnosisResult(null);
  };

  const handleAnalyze = async () => {
    if (!imagePreview) return;
    setIsAnalyzing(true);
    try {
      const result = await analyzeCropImage(selectedCrop, imagePreview);
      setDiagnosisResult(result);
    } catch (err) {
      console.error('Diagnostic error:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleAnalyzeAnother = () => {
    setDiagnosisResult(null);
    setImagePreview(null);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-20 lg:pb-12 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-green-900 text-white rounded-3xl p-6 sm:p-8 shadow-lg border border-emerald-700/60">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-2xl">
            <div className="inline-flex items-center space-x-1.5 text-xs font-black uppercase tracking-wider text-emerald-300 bg-emerald-950/70 px-3 py-1 rounded-full border border-emerald-500/30">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>AI Crop Pathology Engine</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {t.cropDoctor.title}
            </h1>
            <p className="text-emerald-100 text-xs sm:text-sm font-medium leading-relaxed">
              {t.cropDoctor.subtitle}
            </p>
          </div>

          <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center flex-shrink-0">
            <Stethoscope className="w-8 h-8 text-emerald-300" />
          </div>
        </div>
      </div>

      {/* Main Workflow Area */}
      {!diagnosisResult && !isAnalyzing && (
        <div className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
          {/* 1. Crop Selector */}
          <CropSelector
            selectedCrop={selectedCrop}
            onSelectCrop={setSelectedCrop}
            disabled={isAnalyzing}
          />

          {/* 2. Image Dropzone, Camera, and Preloaded Samples */}
          <div className="pt-2 border-t border-stone-100">
            <ImageDropzone
              imagePreview={imagePreview}
              onImageSelected={handleImageSelected}
              onSampleSelected={handleSampleSelected}
              disabled={isAnalyzing}
            />
          </div>

          {/* 3. Primary Analyze Button */}
          <div className="pt-4 border-t border-stone-100 text-center">
            <button
              type="button"
              disabled={!imagePreview || isAnalyzing}
              onClick={handleAnalyze}
              className={`w-full sm:w-auto min-w-[280px] font-black text-base sm:text-lg py-4 px-8 rounded-2xl shadow-xl transition-all flex items-center justify-center space-x-3 mx-auto touch-target ${
                imagePreview
                  ? 'bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-700 hover:from-emerald-700 hover:to-green-800 text-white shadow-emerald-700/30 hover:scale-102 active:scale-98 cursor-pointer'
                  : 'bg-stone-200 text-stone-400 cursor-not-allowed shadow-none'
              }`}
            >
              <Stethoscope className="w-5 h-5 text-white" />
              <span>{t.cropDoctor.analyzeButton}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Loading State Overlay during Analysis */}
      {isAnalyzing && (
        <ScanningOverlay />
      )}

      {/* Diagnosis Result View */}
      {diagnosisResult && (
        <DiagnosisCard
          result={diagnosisResult}
          onAnalyzeAnother={handleAnalyzeAnother}
        />
      )}
    </div>
  );
};
