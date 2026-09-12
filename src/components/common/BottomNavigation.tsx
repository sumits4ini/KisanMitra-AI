import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useApp } from '../../context/AppContext';
import type { NavigationTab } from '../../types';
import { Sprout, Stethoscope, Store, Bot, User } from 'lucide-react';

export const BottomNavigation: React.FC = () => {
  const { t } = useLanguage();
  const { currentTab, setTab } = useApp();

  const tabs: { id: NavigationTab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'dashboard', label: t.nav.dashboard, icon: Sprout },
    { id: 'crop-doctor', label: t.nav.cropDoctor, icon: Stethoscope },
    { id: 'market', label: t.nav.market, icon: Store },
    { id: 'ai-assistant', label: t.nav.aiAssistant, icon: Bot },
    { id: 'profile', label: t.nav.profile, icon: User },
  ];

  return (
    <nav 
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-stone-200 px-2 py-1 shadow-lg"
      aria-label="Mobile Bottom Navigation"
    >
      <div className="grid grid-cols-5 gap-1">
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setTab(tab.id)}
              className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl transition-all touch-target ${
                isActive
                  ? 'text-emerald-700 font-bold bg-emerald-50/80 scale-102'
                  : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              <Icon className={`w-5 h-5 mb-1 ${isActive ? 'text-emerald-600 stroke-[2.5]' : 'stroke-2'}`} />
              <span className="text-[10px] leading-tight truncate max-w-full">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
