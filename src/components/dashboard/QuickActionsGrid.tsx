import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useApp } from '../../context/AppContext';
import { Stethoscope, Store, Calculator, Bot, ArrowUpRight } from 'lucide-react';

export const QuickActionsGrid: React.FC = () => {
  const { t } = useLanguage();
  const { setTab } = useApp();

  const actions = [
    {
      id: 'diagnose',
      title: t.dashboard.actionDiagnose,
      subtitle: t.dashboard.actionDiagnoseSub,
      icon: Stethoscope,
      tab: 'crop-doctor' as const,
      color: 'emerald',
      bgColor: 'bg-emerald-50 hover:bg-emerald-100/60',
      borderColor: 'border-emerald-200 hover:border-emerald-400',
      iconBg: 'bg-emerald-600 text-white',
    },
    {
      id: 'market',
      title: t.dashboard.actionMarket,
      subtitle: t.dashboard.actionMarketSub,
      icon: Store,
      tab: 'market' as const,
      color: 'teal',
      bgColor: 'bg-teal-50 hover:bg-teal-100/60',
      borderColor: 'border-teal-200 hover:border-teal-400',
      iconBg: 'bg-teal-600 text-white',
    },
    {
      id: 'profit',
      title: t.dashboard.actionProfit,
      subtitle: t.dashboard.actionProfitSub,
      icon: Calculator,
      tab: 'sell-smart' as const,
      color: 'amber',
      bgColor: 'bg-amber-50 hover:bg-amber-100/60',
      borderColor: 'border-amber-200 hover:border-amber-400',
      iconBg: 'bg-amber-500 text-white',
    },
    {
      id: 'ask-ai',
      title: t.dashboard.actionAskAI,
      subtitle: t.dashboard.actionAskAISub,
      icon: Bot,
      tab: 'ai-assistant' as const,
      color: 'indigo',
      bgColor: 'bg-indigo-50 hover:bg-indigo-100/60',
      borderColor: 'border-indigo-200 hover:border-indigo-400',
      iconBg: 'bg-indigo-600 text-white',
    },
  ];

  return (
    <div className="space-y-3">
      <h2 className="text-sm font-extrabold uppercase tracking-wider text-stone-500">
        {t.dashboard.quickActionsTitle}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {actions.map(action => {
          const Icon = action.icon;
          return (
            <button
              key={action.id}
              type="button"
              onClick={() => setTab(action.tab)}
              className={`p-5 rounded-3xl border-2 ${action.borderColor} ${action.bgColor} text-left transition-all duration-200 shadow-xs hover:shadow-md hover:-translate-y-0.5 flex flex-col justify-between group cursor-pointer touch-target min-h-[140px]`}
            >
              <div className="flex items-center justify-between w-full mb-3">
                <div className={`w-12 h-12 rounded-2xl ${action.iconBg} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="w-8 h-8 rounded-full bg-white/80 border border-stone-200/60 flex items-center justify-center text-stone-400 group-hover:text-stone-900 group-hover:bg-white transition-colors">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>

              <div>
                <h3 className="font-extrabold text-base text-stone-900 tracking-tight leading-snug">
                  {action.title}
                </h3>
                <p className="text-xs text-stone-600 font-medium mt-1 leading-relaxed">
                  {action.subtitle}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
