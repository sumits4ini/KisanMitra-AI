import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { ShieldCheck, FileText, PhoneCall, X } from 'lucide-react';

export type LegalModalType = 'privacy' | 'terms' | 'contact' | null;

interface LegalModalProps {
  type: LegalModalType;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ type, onClose }) => {
  const { language } = useLanguage();

  if (!type) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-stone-200 relative">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 text-stone-400 hover:text-stone-700 p-1.5 rounded-xl hover:bg-stone-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {type === 'privacy' && (
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-black text-stone-900">
                  {language === 'hi' ? 'गोपनीयता नीति (Privacy Policy)' : 'Privacy Policy'}
                </h3>
                <p className="text-xs text-stone-500 font-medium">
                  {language === 'hi' ? 'किसानमित्र AI डेटा सुरक्षा' : 'KisanMitra AI Data Protection'}
                </p>
              </div>
            </div>

            <div className="text-xs text-stone-600 space-y-2.5 leading-relaxed bg-stone-50 p-4 rounded-2xl border border-stone-200/80">
              <p>
                {language === 'hi'
                  ? 'किसानमित्र AI में आपके खेत का विवरण, फसल की तस्वीरें और स्थान डेटा पूरी तरह गोपनीय रखे जाते हैं।'
                  : 'At KisanMitra AI, your farm details, crop images, and location metrics are treated with complete confidentiality.'}
              </p>
              <p>
                {language === 'hi'
                  ? 'फसल की तस्वीरें केवल AI रोग निदान मॉडल द्वारा संसाधित की जाती हैं और इन्हें किसी तीसरे पक्ष को बेचा नहीं जाता।'
                  : 'Crop leaf photographs are processed strictly for real-time pathology evaluation and are never sold to third-party commercial brokers.'}
              </p>
              <p>
                {language === 'hi'
                  ? 'स्थान डेटा का उपयोग केवल आपके निकटतम एपीएमसी मंडियों की दूरी और ढुलाई खर्च की सही गणना के लिए किया जाता है।'
                  : 'Location parameters are utilized exclusively for estimating realistic road freight distances to nearby APMC mandis.'}
              </p>
            </div>
          </div>
        )}

        {type === 'terms' && (
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-black text-stone-900">
                  {language === 'hi' ? 'सेवा की शर्तें (Terms of Service)' : 'Terms of Service'}
                </h3>
                <p className="text-xs text-stone-500 font-medium">
                  {language === 'hi' ? 'जिम्मेदार कृषि सलाह' : 'Responsible Agricultural Decision Support'}
                </p>
              </div>
            </div>

            <div className="text-xs text-stone-600 space-y-2.5 leading-relaxed bg-stone-50 p-4 rounded-2xl border border-stone-200/80">
              <p>
                {language === 'hi'
                  ? 'किसानमित्र AI एक डिजिटल कृषि निर्णय सहायता मंच है। यह प्रमाणित सरकारी कृषि विस्तार अधिकारियों का पूर्ण विकल्प नहीं है।'
                  : 'KisanMitra AI is an agronomic decision-support platform designed to augment, not replace, certified agricultural extension officers.'}
              </p>
              <p>
                {language === 'hi'
                  ? 'केवल अपनी फसल और क्षेत्र के लिए केंद्रीय/राज्य स्तर पर अनुमोदित उत्पादों का उपयोग करें। उत्पाद लेबल के निर्देशों का अनिवार्य रूप से पालन करें।'
                  : 'Use only products approved for your crop and region. Follow the product label instructions and consult qualified agronomy professionals when needed.'}
              </p>
              <p>
                {language === 'hi'
                  ? 'मंडी भाव व बिक्री पूर्वानुमान अनुमानित हैं और दैनिक आवक तथा स्पॉट नीलामी की बोलियों पर निर्भर करते हैं।'
                  : 'Market forecasts and estimated net returns are informational estimates and are not guaranteed.'}
              </p>
            </div>
          </div>
        )}

        {type === 'contact' && (
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                <PhoneCall className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-black text-stone-900">
                  {language === 'hi' ? 'संपर्क व किसान सहायता' : 'Farmer Support & Contact'}
                </h3>
                <p className="text-xs text-stone-500 font-medium">
                  {language === 'hi' ? 'सहायता केंद्र व विशेषज्ञ परामर्श' : 'Helpline & Extension Support'}
                </p>
              </div>
            </div>

            <div className="text-xs text-stone-600 space-y-3 bg-stone-50 p-4 rounded-2xl border border-stone-200/80">
              <div className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-stone-200">
                <span className="font-bold text-stone-800">
                  {language === 'hi' ? 'किसान कॉल सेंटर (टोल-फ्री)' : 'Kisan Call Centre (Toll-Free)'}
                </span>
                <a href="tel:18001801551" className="text-emerald-700 font-extrabold hover:underline">
                  1800-180-1551
                </a>
              </div>

              <div className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-stone-200">
                <span className="font-bold text-stone-800">
                  {language === 'hi' ? 'आधिकारिक सहायता ईमेल' : 'Official Support Email'}
                </span>
                <span className="text-stone-700 font-medium font-mono">
                  support@kisanmitra.ai
                </span>
              </div>

              <div className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-stone-200">
                <span className="font-bold text-stone-800">
                  {language === 'hi' ? 'मुख्यालय' : 'Headquarters'}
                </span>
                <span className="text-stone-700 font-medium">
                  New Delhi / Karnal, Haryana
                </span>
              </div>
            </div>
          </div>
        )}

        <div className="mt-5 pt-3 border-t border-stone-100 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors cursor-pointer"
          >
            {language === 'hi' ? 'बंद करें' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
