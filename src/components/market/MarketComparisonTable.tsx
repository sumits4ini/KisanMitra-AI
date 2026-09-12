import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import type { MandiCalculationResult } from '../../types';
import { Trophy, Check, TrendingUp } from 'lucide-react';

interface MarketComparisonTableProps {
  mandis: MandiCalculationResult[];
  onSelectMandi: (mandi: MandiCalculationResult) => void;
}

export const MarketComparisonTable: React.FC<MarketComparisonTableProps> = ({
  mandis,
  onSelectMandi,
}) => {
  const { t, language } = useLanguage();

  const lowestNet = Math.min(...mandis.map(m => m.netReturn));

  return (
    <div className="bg-white border border-stone-200 rounded-3xl p-5 sm:p-7 shadow-xs overflow-hidden">
      <div className="mb-4">
        <h3 className="text-lg font-black text-stone-900 tracking-tight">
          {t.market.comparisonTitle}
        </h3>
        <p className="text-xs text-stone-500 font-medium">
          {t.market.comparisonSubtitle}
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[640px]">
          <thead>
            <tr className="border-b border-stone-200 text-stone-500 text-[11px] font-black uppercase tracking-wider">
              <th className="py-3.5 px-3">{t.market.mandiCol}</th>
              <th className="py-3.5 px-3">{t.market.distanceCol}</th>
              <th className="py-3.5 px-3">{t.market.priceCol}</th>
              <th className="py-3.5 px-3">{t.market.grossCol}</th>
              <th className="py-3.5 px-3">{t.market.transportCol}</th>
              <th className="py-3.5 px-3">{t.market.chargesCol}</th>
              <th className="py-3.5 px-3">{t.market.netReturnCol}</th>
              <th className="py-3.5 px-3">{t.market.advantageCol}</th>
              <th className="py-3.5 px-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100 text-xs">
            {mandis.map(m => {
              const mandiName = language === 'hi' ? m.nameHindi : m.name;
              const mandiCode = language === 'hi' ? m.codeHindi : m.code;
              const diffVsLowest = m.netReturn - lowestNet;

              return (
                <tr
                  key={m.id}
                  className={`transition-colors ${
                    m.isBestOption
                      ? 'bg-emerald-50/60 font-medium'
                      : 'hover:bg-stone-50/70'
                  }`}
                >
                  {/* Mandi Name + Badge */}
                  <td className="py-4 px-3">
                    <div className="flex items-center space-x-2">
                      {m.isBestOption && (
                        <Trophy className="w-4 h-4 text-amber-500 flex-shrink-0" />
                      )}
                      <div>
                        <span className="font-extrabold text-stone-900 block text-sm">
                          {mandiCode} &bull; {mandiName}
                        </span>
                        {m.isBestOption && (
                          <span className="text-[10px] font-black text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full inline-block mt-0.5">
                            {t.market.bestOptionBadge}
                          </span>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* Distance */}
                  <td className="py-4 px-3 font-semibold text-stone-600">
                    {m.distanceKm} km
                  </td>

                  {/* Mandi Rate */}
                  <td className="py-4 px-3">
                    <span className="font-black text-stone-900 text-sm">
                      ₹{m.pricePerQuintal.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[10px] text-stone-400 block">
                      {t.market.perQuintal}
                    </span>
                  </td>

                  {/* Gross Revenue */}
                  <td className="py-4 px-3 font-bold text-stone-700">
                    ₹{m.grossRevenue.toLocaleString('en-IN')}
                  </td>

                  {/* Transport */}
                  <td className="py-4 px-3 font-bold text-rose-600">
                    -₹{m.transportCost.toLocaleString('en-IN')}
                  </td>

                  {/* Other Charges */}
                  <td className="py-4 px-3 font-bold text-amber-700">
                    -₹{m.otherCharges.toLocaleString('en-IN')}
                  </td>

                  {/* Estimated Net Return */}
                  <td className="py-4 px-3">
                    <span
                      className={`text-sm sm:text-base font-black ${
                        m.isBestOption ? 'text-emerald-800' : 'text-stone-900'
                      }`}
                    >
                      ₹{m.netReturn.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[10px] text-stone-500 block font-semibold">
                      (₹{m.netPerQuintal.toLocaleString('en-IN')} / qtl)
                    </span>
                  </td>

                  {/* Advantage vs lowest */}
                  <td className="py-4 px-3">
                    {diffVsLowest > 0 ? (
                      <span className="inline-flex items-center text-xs font-black text-emerald-700 bg-emerald-100/70 px-2 py-1 rounded-lg">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        +₹{diffVsLowest.toLocaleString('en-IN')}
                      </span>
                    ) : (
                      <span className="text-stone-400 text-xs font-semibold">
                        {language === 'hi' ? 'आधार दर' : 'Baseline'}
                      </span>
                    )}
                  </td>

                  {/* Action Button */}
                  <td className="py-4 px-3 text-right">
                    <button
                      type="button"
                      onClick={() => onSelectMandi(m)}
                      className={`px-3 py-1.5 rounded-xl font-black text-xs transition-all cursor-pointer ${
                        m.isBestOption
                          ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
                          : 'bg-stone-100 hover:bg-stone-200 text-stone-800'
                      }`}
                    >
                      {language === 'hi' ? 'चुनें' : 'Select'}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
        <div className="flex items-center space-x-1">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>
            {language === 'hi'
              ? 'सभी कटौतियों (मंडी सेस, हम्माली व तुलाई) का सटीक समायोजन'
              : 'All deductions include APMC mandi cess, loading/unloading, and weighbridge charges.'}
          </span>
        </div>
      </div>
    </div>
  );
};
