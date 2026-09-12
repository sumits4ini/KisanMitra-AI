import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import type { MandiCalculationResult } from '../../types';
import { X, Calendar, Truck, ArrowRight, TrendingUp, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface SellingPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  mandi: MandiCalculationResult;
  cropName: string;
  quantity: number;
  onNavigateToSellSmart: () => void;
}

export const SellingPlanModal: React.FC<SellingPlanModalProps> = ({
  isOpen,
  onClose,
  mandi,
  cropName,
  quantity,
  onNavigateToSellSmart,
}) => {
  const { t, language } = useLanguage();

  if (!isOpen) return null;

  const batch1Qty = Math.round(quantity * 0.6);
  const batch2Qty = quantity - batch1Qty;

  const mandiName = language === 'hi' ? mandi.nameHindi : mandi.name;
  const mandiCode = language === 'hi' ? mandi.codeHindi : mandi.code;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-900 to-teal-900 text-white p-6 relative">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
          <span className="text-amber-300 text-xs font-black uppercase tracking-wider block mb-1">
            {language === 'hi' ? 'स्मार्ट फसल विपणन रणनीति' : 'AI Strategic Dispatch Plan'}
          </span>
          <h2 className="text-2xl font-black tracking-tight">
            {t.market.sellingPlanModalTitle}
          </h2>
          <p className="text-emerald-200 text-xs font-medium mt-1">
            {cropName} &bull; {quantity} {t.market.quintals} &bull; {mandiCode} ({mandiName})
          </p>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Target Mandi Summary */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-emerald-800 uppercase block">
                {language === 'hi' ? 'लक्षित मंडी (सर्वश्रेष्ठ विकल्प)' : 'Selected High-Value Mandi'}
              </span>
              <p className="text-lg font-black text-emerald-950 mt-0.5">
                {mandiCode} &bull; {mandiName}
              </p>
              <p className="text-xs text-emerald-700 font-medium">
                {mandi.distanceKm} km &bull; ₹{mandi.pricePerQuintal}/qtl &bull; {t.market.estimatedNetReturn}: ₹{mandi.netReturn.toLocaleString('en-IN')}
              </p>
            </div>
            <span className="text-2xl font-black text-emerald-800">
              ₹{mandi.netPerQuintal}/qtl
            </span>
          </div>

          {/* Split Strategy Batches */}
          <div className="space-y-3">
            <h3 className="text-sm font-black text-stone-900 uppercase tracking-wider flex items-center space-x-1.5">
              <Calendar className="w-4 h-4 text-emerald-600" />
              <span>{language === 'hi' ? 'फसल बिक्री की 2-किश्त योजना' : '2-Phase Split Dispatch Strategy'}</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Batch 1 */}
              <div className="border border-emerald-300 bg-emerald-50/50 rounded-2xl p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-emerald-800 uppercase">
                    {t.market.batch1Title}
                  </span>
                  <span className="bg-emerald-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full">
                    {batch1Qty} {t.market.quintals}
                  </span>
                </div>
                <p className="text-xs text-stone-700 leading-relaxed font-medium">
                  {language === 'hi'
                    ? `${batch1Qty} क्विंटल उपज आज ही ${mandiName} भेजें। इससे तुरंत नकदी मिलेगी और खराब होने का खतरा टलेगा।`
                    : `Dispatch ${batch1Qty} quintals today to ${mandi.name} to cover working expenses and eliminate perishable storage risk.`}
                </p>
                <div className="text-[11px] font-bold text-emerald-800 pt-1 flex items-center space-x-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{language === 'hi' ? 'अनुमानित आय: ₹' + (batch1Qty * mandi.netPerQuintal).toLocaleString('en-IN') : `Est. In-hand: ₹${(batch1Qty * mandi.netPerQuintal).toLocaleString('en-IN')}`}</span>
                </div>
              </div>

              {/* Batch 2 */}
              <div className="border border-amber-300 bg-amber-50/50 rounded-2xl p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-amber-800 uppercase">
                    {t.market.batch2Title}
                  </span>
                  <span className="bg-amber-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full">
                    {batch2Qty} {t.market.quintals}
                  </span>
                </div>
                <p className="text-xs text-stone-700 leading-relaxed font-medium">
                  {language === 'hi'
                    ? `${batch2Qty} क्विंटल उपज 24-48 घंटे रोकें; आजादपुर मंडी में मध्य-सप्ताह के भाव उछाल से +₹3,200 अधिक मिल सकते हैं।`
                    : `Hold ${batch2Qty} quintals for 24-48 hours; mid-week terminal auction arrival dips could yield +₹3,200 extra profit.`}
                </p>
                <div className="text-[11px] font-bold text-amber-800 pt-1 flex items-center space-x-1">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>{language === 'hi' ? 'अतिरिक्त लाभ क्षमता: +₹3,200' : 'Upside gain potential: +₹3,200'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Vehicle and Handling Guidance */}
          <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4 space-y-2">
            <div className="flex items-center space-x-2 text-stone-800 text-xs font-extrabold uppercase">
              <Truck className="w-4 h-4 text-emerald-600" />
              <span>{t.market.vehicleRecommendation}</span>
            </div>
            <p className="text-xs text-stone-600 font-medium">
              {t.market.vehicleDetails} &bull; {language === 'hi' ? 'लोडिंग सुबह 4 बजे करें ताकि मंडी में 7 बजे सुबह पहली नीलामी में पहुंच सकें।' : 'Pack early morning (4 AM) to reach mandi in time for the 7 AM prime auction.'}
            </p>
          </div>

          {/* Crop Health Connection */}
          <div className="bg-blue-50/70 border border-blue-200/70 rounded-2xl p-4 flex items-start space-x-3">
            <ShieldCheck className="w-5 h-5 text-blue-700 flex-shrink-0 mt-0.5" />
            <div>
              <span className="text-xs font-black text-blue-900 uppercase block">
                {t.market.qualityNotice}
              </span>
              <p className="text-xs text-blue-800 font-medium mt-0.5">
                {t.market.qualityNoticeDesc}
              </p>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 bg-stone-50 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-stone-300 hover:bg-stone-100 text-stone-700 font-bold text-xs cursor-pointer transition-all"
          >
            {t.market.modalClose}
          </button>

          <button
            type="button"
            onClick={() => {
              onClose();
              onNavigateToSellSmart();
            }}
            className="w-full sm:w-auto bg-emerald-700 hover:bg-emerald-800 text-white font-black text-xs px-5 py-2.5 rounded-xl shadow-xs transition-all flex items-center justify-center space-x-2 cursor-pointer"
          >
            <span>{language === 'hi' ? 'विस्तृत Sell Smart मॉड्यूल देखें' : 'Open Full Sell Smart Forecast'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
