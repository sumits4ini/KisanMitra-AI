import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useApp } from '../../context/AppContext';
import { DEFAULT_DEMO_ACTIVITIES } from '../../data/demoFarmer';
import { Clock, Stethoscope, Store, Droplets, Calendar, ArrowRight } from 'lucide-react';

export const RecentActivitySection: React.FC = () => {
  const { t, language } = useLanguage();
  const { setTab } = useApp();

  const activities = DEFAULT_DEMO_ACTIVITIES;

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'diagnosis':
        return <Stethoscope className="w-4 h-4 text-emerald-700" />;
      case 'market':
        return <Store className="w-4 h-4 text-teal-700" />;
      case 'irrigation':
        return <Droplets className="w-4 h-4 text-blue-700" />;
      case 'inspection':
        return <Calendar className="w-4 h-4 text-amber-700" />;
      default:
        return <Clock className="w-4 h-4 text-stone-700" />;
    }
  };

  const getStatusBadge = (activity: typeof activities[0]) => {
    const badgeText = language === 'hi' ? activity.badgeHi : activity.badgeEn;
    if (!badgeText) return null;

    if (activity.status === 'positive') {
      return (
        <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 border border-emerald-200 px-2 py-0.5 rounded-full">
          {badgeText}
        </span>
      );
    }
    if (activity.status === 'warning') {
      return (
        <span className="text-[10px] font-bold text-amber-800 bg-amber-100 border border-amber-200 px-2 py-0.5 rounded-full">
          {badgeText}
        </span>
      );
    }
    return (
      <span className="text-[10px] font-bold text-stone-700 bg-stone-100 border border-stone-200 px-2 py-0.5 rounded-full">
        {badgeText}
      </span>
    );
  };

  return (
    <div className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-7 shadow-xs space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-stone-100">
        <div className="flex items-center space-x-2">
          <Clock className="w-4 h-4 text-emerald-600" />
          <h2 className="text-base sm:text-lg font-black text-stone-900">
            {t.dashboard.recentActivityTitle}
          </h2>
        </div>
        <p className="text-xs text-stone-500 font-medium">
          {t.dashboard.recentActivitySubtitle}
        </p>
      </div>

      {/* Activity Timeline List */}
      <div className="divide-y divide-stone-100">
        {activities.map(activity => (
          <div 
            key={activity.id}
            className="py-3.5 first:pt-1 last:pb-1 flex items-start space-x-3.5 group"
          >
            {/* Type Icon */}
            <div className="w-8 h-8 rounded-xl bg-stone-50 border border-stone-200 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-2xs group-hover:scale-105 transition-transform">
              {getActivityIcon(activity.type)}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center justify-between gap-1">
                <h3 className="text-sm font-bold text-stone-900">
                  {language === 'hi' ? activity.titleHi : activity.titleEn}
                </h3>
                <div className="flex items-center space-x-2">
                  {getStatusBadge(activity)}
                  <span className="text-[11px] font-medium text-stone-400">
                    {language === 'hi' ? activity.timeHi : activity.timeEn}
                  </span>
                </div>
              </div>
              <p className="text-xs text-stone-600 mt-0.5 leading-relaxed">
                {language === 'hi' ? activity.descHi : activity.descEn}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom link to My Crops history */}
      <div className="pt-2 border-t border-stone-100 text-right">
        <button
          type="button"
          onClick={() => setTab('my-crops')}
          className="text-xs font-bold text-emerald-700 hover:text-emerald-800 inline-flex items-center space-x-1"
        >
          <span>{language === 'hi' ? 'सभी फसल इतिहास देखें' : 'View Full Crop Timeline'}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
