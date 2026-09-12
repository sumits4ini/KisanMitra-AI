import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useApp } from '../../context/AppContext';
import { Bell, ShieldAlert, TrendingUp, CloudRain, ChevronRight } from 'lucide-react';

export const DashboardAlerts: React.FC = () => {
  const { t, language } = useLanguage();
  const { notifications, markNotificationRead, setTab } = useApp();

  // Show up to 2 most recent notifications on dashboard
  const displayAlerts = notifications.slice(0, 2);

  const getIcon = (type: string) => {
    switch (type) {
      case 'disease':
        return <ShieldAlert className="w-5 h-5 text-amber-600" />;
      case 'market':
        return <TrendingUp className="w-5 h-5 text-emerald-600" />;
      case 'weather':
        return <CloudRain className="w-5 h-5 text-blue-600" />;
      default:
        return <Bell className="w-5 h-5 text-stone-600" />;
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-extrabold uppercase tracking-wider text-stone-500 flex items-center space-x-1.5">
          <Bell className="w-4 h-4 text-amber-600" />
          <span>{t.dashboard.alertsTitle}</span>
        </h2>
        <button
          type="button"
          onClick={() => setTab('notifications')}
          className="text-xs font-bold text-emerald-700 hover:text-emerald-800 hover:underline flex items-center space-x-0.5"
        >
          <span>{t.dashboard.viewAllAlerts}</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {displayAlerts.length === 0 ? (
          <div className="col-span-2 bg-white border border-stone-200 rounded-2xl p-4 text-center text-xs text-stone-500">
            {t.notifications.noNotifications}
          </div>
        ) : (
          displayAlerts.map(alert => (
            <div
              key={alert.id}
              onClick={() => markNotificationRead(alert.id)}
              className={`p-4 rounded-2xl border transition-all flex items-start space-x-3.5 cursor-pointer shadow-xs ${
                alert.read
                  ? 'bg-white border-stone-200'
                  : 'bg-gradient-to-r from-amber-50/70 to-orange-50/50 border-amber-300'
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-white border border-stone-200 shadow-2xs flex items-center justify-center flex-shrink-0">
                {getIcon(alert.type)}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <h3 className="text-sm font-bold text-stone-900 truncate">
                    {language === 'hi' ? alert.titleHi : alert.titleEn}
                  </h3>
                  <span className="text-[10px] font-semibold text-stone-400 flex-shrink-0">
                    {alert.timestamp}
                  </span>
                </div>
                <p className="text-xs text-stone-600 mt-1 line-clamp-2 leading-relaxed">
                  {language === 'hi' ? alert.messageHi : alert.messageEn}
                </p>
              </div>

              {!alert.read && (
                <span className="w-2 h-2 rounded-full bg-amber-500 flex-shrink-0 mt-1.5" />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
