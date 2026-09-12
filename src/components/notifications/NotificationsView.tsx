import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useApp } from '../../context/AppContext';
import {
  Bell,
  ShieldAlert,
  CloudRain,
  TrendingUp,
  Check,
  Trash2,
  Calendar,
  ArrowRight,
  Filter,
} from 'lucide-react';
import type { NavigationTab } from '../../types';

export const NotificationsView: React.FC = () => {
  const { t, language } = useLanguage();
  const { 
    notifications, 
    markNotificationRead, 
    markAllNotificationsRead, 
    clearNotifications,
    setTab
  } = useApp();

  const [activeFilter, setActiveFilter] = useState<'all' | 'disease' | 'market' | 'weather' | 'reminder'>('all');

  const getIcon = (type: string) => {
    switch (type) {
      case 'disease':
        return <ShieldAlert className="w-5 h-5 text-amber-600" />;
      case 'weather':
        return <CloudRain className="w-5 h-5 text-blue-600" />;
      case 'market':
        return <TrendingUp className="w-5 h-5 text-emerald-600" />;
      case 'reminder':
        return <Calendar className="w-5 h-5 text-purple-600" />;
      default:
        return <Bell className="w-5 h-5 text-stone-600" />;
    }
  };

  const filtered = notifications.filter(n => {
    if (activeFilter === 'all') return true;
    return n.type === activeFilter;
  });

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-20 lg:pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-stone-200 rounded-3xl p-6 sm:p-7 shadow-xs">
        <div className="flex items-center space-x-3.5">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center flex-shrink-0 shadow-xs">
            <Bell className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
              {t.notifications.title}
            </h1>
            <p className="text-xs sm:text-sm font-medium text-stone-600 mt-0.5">
              {t.notifications.subtitle}
            </p>
          </div>
        </div>

        {notifications.length > 0 && (
          <div className="flex items-center space-x-2 self-start sm:self-auto">
            <button
              type="button"
              onClick={markAllNotificationsRead}
              className="text-xs font-black text-stone-700 bg-stone-100 hover:bg-stone-200 px-3.5 py-2 rounded-xl transition-all flex items-center space-x-1.5 cursor-pointer shadow-2xs"
            >
              <Check className="w-3.5 h-3.5" />
              <span>{t.notifications.markAllRead}</span>
            </button>
            <button
              type="button"
              onClick={clearNotifications}
              className="text-xs font-black text-rose-700 bg-rose-50 hover:bg-rose-100 px-3.5 py-2 rounded-xl transition-all flex items-center space-x-1.5 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>{t.notifications.clearAll}</span>
            </button>
          </div>
        )}
      </div>

      {/* Filter Chips */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1">
        <span className="text-xs font-extrabold text-stone-400 flex items-center mr-1">
          <Filter className="w-3.5 h-3.5 mr-1" />
          Filter:
        </span>
        {[
          { id: 'all', labelEn: 'All Alerts', labelHi: 'सभी अलर्ट' },
          { id: 'disease', labelEn: 'Disease Alerts', labelHi: 'रोग अलर्ट' },
          { id: 'market', labelEn: 'Market Price Alerts', labelHi: 'मंडी अलर्ट' },
          { id: 'weather', labelEn: 'Weather Alerts', labelHi: 'मौसम अलर्ट' },
          { id: 'reminder', labelEn: 'Crop Check Reminders', labelHi: 'फसल जांच' },
        ].map(cat => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setActiveFilter(cat.id as any)}
            className={`px-3 py-1.5 rounded-xl text-xs font-black whitespace-nowrap transition-all cursor-pointer ${
              activeFilter === cat.id
                ? 'bg-stone-900 text-white shadow-xs'
                : 'bg-white border border-stone-200 text-stone-600 hover:bg-stone-50'
            }`}
          >
            {language === 'hi' ? cat.labelHi : cat.labelEn}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="space-y-3.5">
        {filtered.length === 0 ? (
          <div className="bg-white border border-stone-200 rounded-3xl p-12 text-center text-stone-500">
            <Bell className="w-12 h-12 mx-auto mb-3 text-stone-300" />
            <p className="text-base font-bold text-stone-700">{t.notifications.noNotifications}</p>
          </div>
        ) : (
          filtered.map(item => (
            <div
              key={item.id}
              className={`p-5 rounded-3xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                item.read 
                  ? 'bg-white border-stone-200 text-stone-600' 
                  : item.type === 'disease'
                  ? 'bg-amber-50/50 border-amber-300 shadow-xs'
                  : item.type === 'market'
                  ? 'bg-emerald-50/50 border-emerald-300 shadow-xs'
                  : item.type === 'weather'
                  ? 'bg-blue-50/50 border-blue-300 shadow-xs'
                  : 'bg-purple-50/50 border-purple-300 shadow-xs'
              }`}
            >
              <div className="flex items-start space-x-4 flex-1">
                <div className="w-11 h-11 rounded-2xl bg-white border border-stone-200 flex items-center justify-center flex-shrink-0 shadow-2xs mt-0.5">
                  {getIcon(item.type)}
                </div>

                <div className="flex-1 space-y-1">
                  <div className="flex items-center space-x-2">
                    <h3 className="text-sm sm:text-base font-black text-stone-900">
                      {language === 'hi' ? item.titleHi : item.titleEn}
                    </h3>
                    {!item.read && (
                      <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                    )}
                  </div>
                  <p className="text-xs text-stone-700 leading-relaxed font-medium">
                    {language === 'hi' ? item.messageHi : item.messageEn}
                  </p>
                  <span className="text-[11px] font-bold text-stone-400 block pt-0.5">
                    {item.timestamp}
                  </span>
                </div>
              </div>

              {/* Action Buttons: Mark read & direct route */}
              <div className="flex items-center space-x-2 self-end sm:self-center pt-2 sm:pt-0">
                {!item.read && (
                  <button
                    type="button"
                    onClick={() => markNotificationRead(item.id)}
                    className="text-[11px] font-bold text-stone-600 hover:text-stone-900 bg-white border border-stone-200 px-2.5 py-1.5 rounded-xl cursor-pointer"
                  >
                    {language === 'hi' ? 'पढ़ा हुआ' : 'Mark Read'}
                  </button>
                )}

                {item.actionTab && (
                  <button
                    type="button"
                    onClick={() => {
                      markNotificationRead(item.id);
                      setTab(item.actionTab as NavigationTab);
                    }}
                    className={`text-xs font-black px-3.5 py-2 rounded-xl flex items-center space-x-1.5 transition-all cursor-pointer shadow-xs ${
                      item.type === 'disease'
                        ? 'bg-amber-600 hover:bg-amber-700 text-white'
                        : item.type === 'market'
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                        : item.type === 'weather'
                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                        : 'bg-purple-600 hover:bg-purple-700 text-white'
                    }`}
                  >
                    <span>{language === 'hi' ? item.actionLabelHi : item.actionLabelEn}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

