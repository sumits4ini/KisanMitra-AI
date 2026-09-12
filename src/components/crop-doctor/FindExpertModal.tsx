import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Phone, MessageSquare, MapPin, UserCheck, X, ShieldCheck } from 'lucide-react';

interface FindExpertModalProps {
  isOpen: boolean;
  onClose: () => void;
  cropName: string;
}

export const FindExpertModal: React.FC<FindExpertModalProps> = ({
  isOpen,
  onClose,
  cropName,
}) => {
  const { t, language } = useLanguage();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-stone-200">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-green-800 text-white p-6 flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-2">
              <UserCheck className="w-5 h-5 text-emerald-300" />
              <h2 className="text-lg font-black text-white">
                {t.treatment.expertModalTitle}
              </h2>
            </div>
            <p className="text-xs text-emerald-100 mt-0.5">
              {t.treatment.expertModalSubtitle} ({cropName})
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          {/* 1. Kisan Call Centre Hotline */}
          <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200 flex items-start justify-between gap-3">
            <div>
              <span className="text-[10px] font-black uppercase text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                Govt. Toll-Free
              </span>
              <h3 className="font-extrabold text-sm text-stone-900 mt-1">
                {t.treatment.kisanCallCenter}
              </h3>
              <p className="text-xs text-emerald-800 font-bold mt-0.5">
                📞 {t.treatment.kisanCallNumber}
              </p>
              <p className="text-[11px] text-stone-600 mt-1">
                Free agricultural advisory service operated by the Ministry of Agriculture. Available in Hindi & all Indian languages.
              </p>
            </div>
            <a
              href="tel:18001801551"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-3.5 py-2 rounded-xl shadow-xs transition-colors flex-shrink-0 flex items-center space-x-1"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{t.treatment.callNow}</span>
            </a>
          </div>

          {/* 2. Krishi Vigyan Kendra */}
          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 flex items-start justify-between gap-3">
            <div>
              <span className="text-[10px] font-black uppercase text-blue-800 bg-blue-100 px-2 py-0.5 rounded">
                Local Research Centre
              </span>
              <h3 className="font-extrabold text-sm text-stone-900 mt-1">
                {t.treatment.localKVK}
              </h3>
              <p className="text-xs text-stone-600 flex items-center space-x-1 mt-0.5">
                <MapPin className="w-3 h-3 text-stone-400" />
                <span>{t.treatment.localKVKDesc}</span>
              </p>
              <p className="text-[11px] text-stone-500 mt-1">
                Walk-in plant disease diagnostics, leaf tissue testing, and certified seed/pesticide recommendations.
              </p>
            </div>
            <a
              href="tel:01842259000"
              className="bg-stone-800 hover:bg-stone-900 text-white font-bold text-xs px-3.5 py-2 rounded-xl shadow-xs transition-colors flex-shrink-0 flex items-center space-x-1"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{language === 'hi' ? 'कॉल करें' : 'Call'}</span>
            </a>
          </div>

          {/* 3. Verified Plant Pathologist Agronomist */}
          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 flex items-start justify-between gap-3">
            <div>
              <span className="text-[10px] font-black uppercase text-indigo-800 bg-indigo-100 px-2 py-0.5 rounded">
                Verified Agronomist
              </span>
              <h3 className="font-extrabold text-sm text-stone-900 mt-1">
                {t.treatment.verifiedExpert}
              </h3>
              <p className="text-[11px] text-stone-600 mt-0.5">
                Haryana Agricultural Extension Officer. Specializes in solanaceous vegetables and cereal crop pathology.
              </p>
            </div>
            <button
              type="button"
              onClick={() => alert(language === 'hi' ? 'कृषि विस्तार अधिकारी से सीधा व्हाट्सएप संपर्क जोड़ा जा रहा है...' : 'Connecting directly with verified agricultural extension officer via WhatsApp...')}
              className="bg-green-600 hover:bg-green-700 text-white font-bold text-xs px-3.5 py-2 rounded-xl shadow-xs transition-colors flex-shrink-0 flex items-center space-x-1"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </button>
          </div>

          {/* Safety Reminder */}
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-[11px] text-amber-900 font-medium flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-amber-700 flex-shrink-0" />
            <span>Always carry a photo or fresh leaf sample when consulting extension officers.</span>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-stone-50 border-t border-stone-100 text-right">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-stone-200 hover:bg-stone-300 text-stone-800 font-bold text-xs rounded-xl transition-colors"
          >
            {t.treatment.closeModal}
          </button>
        </div>
      </div>
    </div>
  );
};
