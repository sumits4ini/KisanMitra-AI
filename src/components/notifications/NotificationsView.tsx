import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useApp } from '../../context/AppContext';
import { Bell, ShieldAlert, CloudRain, TrendingUp, Check, Trash2 } from 'lucide-react';

export const NotificationsView: React.FC = () => {
  const { t, language } = useLanguage();
  const { 
    notifications, 
    markNotificationRead, 
    markAllNotificationsRead, 
    clearNotifications 
  } = useApp();

  const getIcon = (type: string) => {
    switch (type) {
      case 'disease':
        return <ShieldAlert className="w-5 h-5 text-amber-600" />;
      case 'weather':
        return <CloudRain className="w-5 h-5 text-blue-600" />;
      case 'market':
        return <TrendingUp className="w-5 h-5 text-emerald-600" />;
      default:
        return <Bell className="w-5 h-5 text-stone-600" />;
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-20 lg:pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-stone-200 rounded-3xl p-6 shadow-xs">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
            <Bell className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-stone-900">
              {t.notifications.title}
            </h1>
            <p className="text-sm font-medium text-stone-600">
              {t.notifications.subtitle}
            </p>
          </div>
        </div>

        {notifications.length > 0 && (
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={markAllNotificationsRead}
              className="text-xs font-bold text-stone-700 bg-stone-100 hover:bg-stone-200 px-3 py-2 rounded-xl transition-colors flex items-center space-x-1"
            >
              <Check className="w-3.5 h-3.5" />
              <span>{t.notifications.markAllRead}</span>
            </button>
            <button
              type="button"
              onClick={clearNotifications}
              className="text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 px-3 py-2 rounded-xl transition-colors flex items-center space-x-1"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>{t.notifications.clearAll}</span>
            </button>
          </div>
        )}
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {notifications.length === 0 ? (
          <div className="bg-white border border-stone-200 rounded-3xl p-12 text-center text-stone-500">
            <Bell className="w-12 h-12 mx-auto mb-3 text-stone-300" />
            <p className="text-base font-bold text-stone-700">{t.notifications.noNotifications}</p>
          </div>
        ) : (
          notifications.map(item => (
            <div
              key={item.id}
              onClick={() => markNotificationRead(item.id)}
              className={`p-4 rounded-2xl border transition-all flex items-start space-x-4 cursor-pointer ${
                item.read 
                  ? 'bg-white border-stone-200 text-stone-600' 
                  : 'bg-amber-50/40 border-amber-300 shadow-xs text-stone-900'
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-white border border-stone-200 flex items-center justify-center flex-shrink-0 shadow-2xs">
                {getIcon(item.type)}
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold">
                    {language === 'hi' ? item.titleHi : item.titleEn}
                  </h3>
                  <span className="text-[11px] text-stone-400">{item.timestamp}</span>
                </div>
                <p className="text-xs mt-1 text-stone-600 leading-relaxed">
                  {language === 'hi' ? item.messageHi : item.messageEn}
                </p>
              </div>

              {!item.read && (
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 flex-shrink-0 mt-1.5" />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
