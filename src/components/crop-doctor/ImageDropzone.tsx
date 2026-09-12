import React, { useRef } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { SAMPLE_LEAVES, type SampleLeaf } from '../../services/cropDoctorService';
import { Upload, Camera, Sparkles, RefreshCw, CheckCircle2 } from 'lucide-react';

interface ImageDropzoneProps {
  imagePreview: string | null;
  onImageSelected: (imageUrl: string) => void;
  onSampleSelected: (sample: SampleLeaf) => void;
  disabled?: boolean;
}

export const ImageDropzone: React.FC<ImageDropzoneProps> = ({
  imagePreview,
  onImageSelected,
  onSampleSelected,
  disabled = false,
}) => {
  const { t, language } = useLanguage();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onImageSelected(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTriggerUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-4">
      <label className="block text-xs font-black uppercase tracking-wider text-stone-500">
        {t.cropDoctor.step2}
      </label>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Dropzone or Preview Area */}
      {!imagePreview ? (
        <div 
          onClick={handleTriggerUpload}
          className="border-2 border-dashed border-emerald-400/80 hover:border-emerald-600 bg-emerald-50/20 hover:bg-emerald-50/40 rounded-3xl p-6 sm:p-10 text-center transition-all cursor-pointer group"
        >
          <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform shadow-xs">
            <Upload className="w-8 h-8" />
          </div>

          <h3 className="font-extrabold text-base sm:text-lg text-stone-900 mb-1">
            {t.cropDoctor.uploadPrompt}
          </h3>
          <p className="text-xs text-stone-500 max-w-sm mx-auto mb-4">
            {t.cropDoctor.uploadSubtext}
          </p>

          <div className="flex flex-wrap justify-center gap-2.5">
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); handleTriggerUpload(); }}
              className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-xs transition-colors flex items-center space-x-1.5 touch-target"
            >
              <Upload className="w-4 h-4" />
              <span>{t.cropDoctor.uploadButton}</span>
            </button>

            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); handleTriggerUpload(); }}
              className="bg-white hover:bg-stone-50 border border-stone-200 text-stone-800 font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-2xs transition-colors flex items-center space-x-1.5 touch-target"
            >
              <Camera className="w-4 h-4 text-emerald-700" />
              <span>{t.cropDoctor.cameraButton}</span>
            </button>
          </div>
        </div>
      ) : (
        /* Image Preview Box */
        <div className="relative bg-stone-950 rounded-3xl overflow-hidden shadow-md max-w-md mx-auto aspect-square flex items-center justify-center border border-stone-800">
          <img
            src={imagePreview}
            alt="Leaf to diagnose"
            className="w-full h-full object-cover"
          />

          {/* Target Reticle Overlay */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            <div className="w-48 h-48 border-2 border-emerald-400/80 rounded-2xl relative shadow-lg">
              <span className="absolute -top-1 -left-1 w-4 h-4 border-t-4 border-l-4 border-emerald-400" />
              <span className="absolute -top-1 -right-1 w-4 h-4 border-t-4 border-r-4 border-emerald-400" />
              <span className="absolute -bottom-1 -left-1 w-4 h-4 border-b-4 border-l-4 border-emerald-400" />
              <span className="absolute -bottom-1 -right-1 w-4 h-4 border-b-4 border-r-4 border-emerald-400" />
            </div>
          </div>

          {/* Change Photo Overlay Button */}
          <button
            type="button"
            disabled={disabled}
            onClick={handleTriggerUpload}
            className="absolute bottom-3 right-3 bg-stone-900/80 hover:bg-stone-900 text-white text-xs font-bold px-3 py-2 rounded-xl backdrop-blur-md border border-white/20 flex items-center space-x-1.5 transition-all cursor-pointer shadow-md"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>{t.cropDoctor.changeImage}</span>
          </button>
        </div>
      )}

      {/* Sample Leaf Inspection Gallery */}
      <div className="pt-2">
        <div className="flex items-center space-x-1.5 text-xs font-black uppercase tracking-wider text-stone-500 mb-2.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>{t.cropDoctor.orChooseSample}</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {SAMPLE_LEAVES.map(sample => (
            <button
              key={sample.id}
              type="button"
              disabled={disabled}
              onClick={() => onSampleSelected(sample)}
              className={`p-2 rounded-2xl border text-left transition-all flex items-center space-x-3 group ${
                imagePreview === sample.imageUrl
                  ? 'border-emerald-600 bg-emerald-50/80 shadow-xs ring-2 ring-emerald-500/20'
                  : 'border-stone-200 bg-white hover:border-emerald-300 hover:bg-emerald-50/20'
              } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <img
                src={sample.imageUrl}
                alt={sample.nameEn}
                className="w-12 h-12 rounded-xl object-cover border border-stone-200 flex-shrink-0 group-hover:scale-105 transition-transform"
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-1.5 py-0.2 rounded">
                    {sample.tag}
                  </span>
                  {imagePreview === sample.imageUrl && (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  )}
                </div>
                <p className="text-xs font-bold text-stone-900 truncate mt-0.5">
                  {language === 'hi' ? sample.nameHi : sample.nameEn}
                </p>
                <p className="text-[11px] text-stone-500 truncate">
                  {language === 'hi' ? sample.expectedDiseaseHi : sample.expectedDiseaseEn}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
