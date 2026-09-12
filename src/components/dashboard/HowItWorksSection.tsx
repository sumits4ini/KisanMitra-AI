import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useApp } from '../../context/AppContext';
import {
  Camera,
  Search,
  ShieldCheck,
  Store,
  TrendingUp,
  ArrowRight,
  RotateCcw,
} from 'lucide-react';

import type { NavigationTab } from '../../types';

export const HowItWorksSection: React.FC = () => {
  const { t, language } = useLanguage();
  const { setTab, resetDemo, user } = useApp();

  const steps: {
    num: number;
    title: string;
    desc: string;
    icon: React.ComponentType<{ className?: string }>;
    tab: NavigationTab;
    color: string;
    btnLabel: string;
  }[] = [
    {
      num: 1,
      title: t.dashboard.step1Title,
      desc: t.dashboard.step1Desc,
      icon: Camera,
      tab: 'crop-doctor',
      color: 'from-emerald-500 to-teal-600',
      btnLabel: language === 'hi' ? 'स्कैन शुरू करें' : 'Start Scan',
    },
    {
      num: 2,
      title: t.dashboard.step2Title,
      desc: t.dashboard.step2Desc,
      icon: Search,
      tab: 'crop-doctor',
      color: 'from-teal-500 to-cyan-600',
      btnLabel: language === 'hi' ? 'निदान देखें' : 'View Diagnosis',
    },
    {
      num: 3,
      title: t.dashboard.step3Title,
      desc: t.dashboard.step3Desc,
      icon: ShieldCheck,
      tab: 'crop-doctor',
      color: 'from-cyan-500 to-blue-600',
      btnLabel: language === 'hi' ? 'सुरक्षा नियम' : 'Safety Rules',
    },
    {
      num: 4,
      title: t.dashboard.step4Title,
      desc: t.dashboard.step4Desc,
      icon: Store,
      tab: 'market',
      color: 'from-amber-500 to-orange-600',
      btnLabel: language === 'hi' ? 'मंडी तुलना' : 'Compare Mandis',
    },
    {
      num: 5,
      title: t.dashboard.step5Title,
      desc: t.dashboard.step5Desc,
      icon: TrendingUp,
      tab: 'sell-smart',
      color: 'from-emerald-600 to-green-700',
      btnLabel: language === 'hi' ? 'स्मार्ट बिक्री' : 'Smart Plan',
    },
  ];

  return (
    <div className="bg-white border-2 border-stone-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
      {/* 30-Second Overview Banner (Judge Communication) */}
      <div className="bg-gradient-to-r from-emerald-950 via-teal-900 to-stone-900 text-white rounded-2xl p-5 sm:p-6 shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center space-x-2">
              <span className="bg-amber-400 text-stone-950 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full tracking-wider">
                {t.dashboard.howItWorksBadge}
              </span>
              <span className="text-xs font-bold text-emerald-300">
                {t.dashboard.howItWorksTitle}
              </span>
            </div>
            {/* The Explicit Judge Innovation Equation */}
            <h2 className="text-base sm:text-xl font-black text-white tracking-tight">
              {t.dashboard.corePathway}
            </h2>
            <p className="text-xs text-stone-300 font-medium">
              {t.dashboard.howItWorksSubtitle}
            </p>
          </div>

          {/* Quick Reset Demo Button for Judges */}
          {user?.isDemo && (
            <button
              type="button"
              onClick={resetDemo}
              className="self-start md:self-center bg-white/10 hover:bg-white/20 border border-white/20 text-white font-extrabold text-xs px-4 py-2.5 rounded-xl transition-all flex items-center space-x-2 cursor-pointer flex-shrink-0"
              title="Reset all demo crops, diagnoses, and notifications back to Ramesh Kumar default"
            >
              <RotateCcw className="w-3.5 h-3.5 text-amber-300" />
              <span>{t.dashboard.resetDemoBtn}</span>
            </button>
          )}
        </div>
      </div>

      {/* 5 Connected Steps Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        {steps.map(s => {
          const Icon = s.icon;
          return (
            <div
              key={s.num}
              onClick={() => setTab(s.tab)}
              className="bg-stone-50 hover:bg-white border border-stone-200 hover:border-emerald-500 hover:shadow-md rounded-2xl p-4 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div
                    className={`w-8 h-8 rounded-xl bg-gradient-to-br ${s.color} text-white flex items-center justify-center font-black text-xs shadow-xs`}
                  >
                    {s.num}
                  </div>
                  <Icon className="w-4 h-4 text-stone-400 group-hover:text-emerald-600 transition-colors" />
                </div>

                <h3 className="font-extrabold text-sm text-stone-900 leading-snug">
                  {s.title}
                </h3>
                <p className="text-[11px] text-stone-600 font-medium leading-relaxed">
                  {s.desc}
                </p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-stone-200 flex items-center justify-between text-[11px] font-black text-emerald-800 group-hover:text-emerald-900">
                <span>{s.btnLabel}</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
