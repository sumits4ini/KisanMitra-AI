import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Scan, Sparkles } from 'lucide-react';

export const ScanningOverlay: React.FC = () => {
  const { t } = useLanguage();
  const [stepIndex, setStepIndex] = useState(0);

  const steps = [
    t.cropDoctor.analyzingStep1,
    t.cropDoctor.analyzingStep2,
    t.cropDoctor.analyzingStep3,
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setStepIndex(prev => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 400);
    return () => clearInterval(timer);
  }, [steps.length]);

  return (
    <div className="relative bg-stone-950/90 text-white rounded-3xl p-8 sm:p-12 text-center shadow-2xl overflow-hidden border border-emerald-500/40">
      {/* Animated laser scan line */}
      <div 
        className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_15px_#34d399] animate-bounce"
        style={{ animationDuration: '1.2s' }}
      />

      <div className="relative z-10 max-w-sm mx-auto space-y-4">
        <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-4 border-emerald-500/20 border-t-emerald-400 animate-spin" />
          <Scan className="w-9 h-9 text-emerald-400 animate-pulse" />
        </div>

        <div>
          <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-emerald-300 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-500/30 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>AI NEURAL VISION</span>
          </div>

          <h3 className="text-xl font-black text-white">
            {t.cropDoctor.analyzingTitle}
          </h3>

          <p className="text-xs sm:text-sm text-emerald-200/90 font-medium min-h-[20px] transition-all">
            {steps[stepIndex]}
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-stone-800 h-2 rounded-full overflow-hidden p-0.5 border border-stone-700">
          <div 
            className="bg-emerald-400 h-full rounded-full transition-all duration-300"
            style={{ width: `${((stepIndex + 1) / steps.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};
