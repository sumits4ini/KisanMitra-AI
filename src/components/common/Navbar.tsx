import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useApp } from '../../context/AppContext';
import type { NavigationTab } from '../../types';
import { LanguageSwitcher } from './LanguageSwitcher';
import { 
  Sprout, 
  Stethoscope, 
  Store, 
  TrendingUp, 
  Bot, 
  Bell, 
  User, 
  RotateCcw, 
  Menu, 
  X,
  Wheat,
  ShieldCheck
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { t, language } = useLanguage();
  const { 
    user, 
    currentTab, 
    setTab, 
    unreadCount, 
    resetDemo, 
    logout 
  } = useApp();
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { tab: 'dashboard' as NavigationTab, label: t.nav.dashboard, icon: Sprout },
    { tab: 'crop-doctor' as NavigationTab, label: t.nav.cropDoctor, icon: Stethoscope },
    { tab: 'my-crops' as NavigationTab, label: t.nav.myCrops, icon: Wheat },
    { tab: 'market' as NavigationTab, label: t.nav.market, icon: Store },
    { tab: 'sell-smart' as NavigationTab, label: t.nav.sellSmart, icon: TrendingUp },
    { tab: 'ai-assistant' as NavigationTab, label: t.nav.aiAssistant, icon: Bot },
    { tab: 'notifications' as NavigationTab, label: t.nav.notifications, icon: Bell, badge: unreadCount },
    { tab: 'profile' as NavigationTab, label: t.nav.profile, icon: User },
  ];

  const handleTabClick = (tab: NavigationTab) => {
    setTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-xs">
      {/* Top Banner for Safety Guidance & Language */}
      <div className="bg-emerald-950 text-emerald-100 text-xs py-1.5 px-4 border-b border-emerald-900/50">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-2 text-stone-300">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
            <span className="text-[11px] font-medium truncate max-w-xl">
              {language === 'hi'
                ? 'उत्पाद लेबल व स्थानीय कृषि दिशानिर्देशों के अनुसार केवल अनुमोदित कृषि उत्पादों का उपयोग करें।'
                : 'Use approved agricultural products according to their labels and local agricultural guidance.'}
            </span>
          </div>

          <div className="flex items-center space-x-3 ml-auto">
            {user?.isDemo && (
              <button
                type="button"
                onClick={resetDemo}
                title={t.nav.resetDemo}
                className="flex items-center space-x-1 text-emerald-300 hover:text-white transition-colors text-[11px] font-medium bg-emerald-900/80 hover:bg-emerald-800 px-2.5 py-0.5 rounded cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>{t.nav.resetDemo}</span>
              </button>
            )}
            <LanguageSwitcher lightMode={false} className="scale-90" />
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Tagline */}
          <button 
            type="button" 
            onClick={() => setTab('dashboard')}
            className="flex items-center space-x-3 text-left group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-green-700 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <Sprout className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xl font-extrabold text-stone-900 tracking-tight">
                  {t.appName}
                </span>
              </div>
              <p className="text-[11px] font-medium text-emerald-700 leading-none">
                {t.tagline}
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = currentTab === item.tab;
              return (
                <button
                  key={item.tab}
                  type="button"
                  onClick={() => handleTabClick(item.tab)}
                  className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-700 font-bold shadow-xs'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-600' : 'text-stone-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-2">
            {/* Notifications Bell */}
            <button
              type="button"
              onClick={() => handleTabClick('notifications')}
              className="relative p-2 rounded-lg text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors touch-target flex items-center justify-center"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Profile Avatar Button */}
            <button
              type="button"
              onClick={() => handleTabClick('profile')}
              className={`flex items-center space-x-2 p-1.5 pl-2 rounded-lg border transition-all ${
                currentTab === 'profile'
                  ? 'border-emerald-600 bg-emerald-50'
                  : 'border-stone-200 hover:border-stone-300 bg-stone-50'
              }`}
            >
              <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                {user?.name ? user.name[0] : 'K'}
              </div>
              <span className="hidden md:inline text-xs font-bold text-stone-800 pr-1 truncate max-w-[90px]">
                {user?.name || 'Farmer'}
              </span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-stone-600 hover:text-stone-900 hover:bg-stone-100 touch-target flex items-center justify-center"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Slide-down Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-200 bg-white shadow-xl animate-in slide-in-from-top-2 duration-150">
          <div className="px-4 pt-3 pb-4 space-y-1">
            <div className="px-3 py-2 bg-stone-50 rounded-lg mb-2 flex items-center justify-between">
              <div>
                <p className="text-xs text-stone-500">{user?.location || 'Haryana'}</p>
                <p className="text-sm font-bold text-stone-900">{user?.name || 'Farmer'}</p>
              </div>
              <button
                type="button"
                onClick={logout}
                className="text-xs text-red-600 font-semibold hover:underline"
              >
                {t.nav.logout}
              </button>
            </div>

            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = currentTab === item.tab;
              return (
                <button
                  key={item.tab}
                  type="button"
                  onClick={() => handleTabClick(item.tab)}
                  className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-left text-sm font-semibold transition-colors ${
                    isActive
                      ? 'bg-emerald-600 text-white'
                      : 'text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}

            <div className="pt-2 border-t border-stone-100 space-y-1">
              <button
                type="button"
                onClick={() => handleTabClick('profile')}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-left text-sm font-semibold ${
                  currentTab === 'profile' ? 'bg-emerald-600 text-white' : 'text-stone-700 hover:bg-stone-100'
                }`}
              >
                <User className="w-5 h-5" />
                <span>{t.nav.profile}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
