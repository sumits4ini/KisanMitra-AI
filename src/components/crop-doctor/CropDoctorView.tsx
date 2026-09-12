import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Stethoscope, Upload, Camera, ShieldAlert } from 'lucide-react';

export const CropDoctorView: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-20 lg:pb-10">
      {/* Header Banner */}
      <div className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 shadow-xs">
        <div className="flex items-center space-x-3 mb-2">
          <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
            <Stethoscope className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-stone-900">
              {t.cropDoctor.title}
            </h1>
            <p className="text-sm font-medium text-stone-600">
              {t.cropDoctor.subtitle}
            </p>
          </div>
        </div>
      </div>

      {/* Upload / Camera UI preview */}
      <div className="bg-white border-2 border-dashed border-emerald-300/80 rounded-3xl p-8 sm:p-12 text-center shadow-xs">
        <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4">
          <Upload className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-stone-900 mb-1">
          Upload Leaf Photo or Select Sample
        </h2>
        <p className="text-sm text-stone-500 max-w-md mx-auto mb-6">
          Take a clear close-up picture of any diseased or yellowing leaf to identify blight, curl virus, or powdery mildew.
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          <button
            type="button"
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-2.5 rounded-xl shadow-md transition-all flex items-center space-x-2"
          >
            <Upload className="w-4 h-4" />
            <span>Upload Image</span>
          </button>
          <button
            type="button"
            className="bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold px-5 py-2.5 rounded-xl transition-all flex items-center space-x-2"
          >
            <Camera className="w-4 h-4" />
            <span>Take Photo</span>
          </button>
        </div>

        {/* Preloaded sample leaf teaser */}
        <div className="mt-8 pt-6 border-t border-stone-100 max-w-md mx-auto">
          <p className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-3">
            Instant Test Samples Available
          </p>
          <div className="flex justify-center space-x-3">
            <div className="flex items-center space-x-2 bg-stone-50 border border-stone-200 px-3 py-1.5 rounded-lg text-xs font-medium text-stone-700">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <span>Tomato Early Blight</span>
            </div>
            <div className="flex items-center space-x-2 bg-stone-50 border border-stone-200 px-3 py-1.5 rounded-lg text-xs font-medium text-stone-700">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Healthy Leaf</span>
            </div>
          </div>
        </div>
      </div>

      {/* Safety Notice Card */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start space-x-3 text-amber-900 text-xs font-medium">
        <ShieldAlert className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <p>
          <strong>Safety Note:</strong> {t.safetyNoticeFull}
        </p>
      </div>
    </div>
  );
};
