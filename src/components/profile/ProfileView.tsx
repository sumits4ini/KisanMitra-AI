import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useApp } from '../../context/AppContext';
import { Globe, Bell, Navigation, RotateCcw, LogOut } from 'lucide-react';

export const ProfileView: React.FC = () => {
  const { t, language, setLanguage } = useLanguage();
  const { user, resetDemo, logout, updateFarmerSettings } = useApp();

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-20 lg:pb-10">
      {/* Header */}
      <div className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 shadow-xs">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-600 to-green-600 text-white flex items-center justify-center font-black text-2xl shadow-md">
            {user?.name ? user.name[0] : 'R'}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl font-black text-stone-900">{user?.name}</h1>
              {user?.isDemo && (
                <span className="bg-amber-100 text-amber-900 border border-amber-300 text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full">
                  {t.common.demoBadge}
                </span>
              )}
            </div>
            <p className="text-xs font-semibold text-emerald-700 mt-0.5">
              {user?.location}, {user?.state || 'Haryana'} &bull; {user?.landSizeAcres} {t.dashboard.acres}
            </p>
          </div>
        </div>
      </div>

      {/* Profile Details Card */}
      <div className="bg-white border border-stone-200 rounded-3xl p-6 shadow-xs space-y-4">
        <h2 className="text-sm font-extrabold uppercase tracking-wider text-stone-500">
          {t.profile.farmerDetails}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
            <span className="text-xs text-stone-500 block mb-0.5">{t.profile.fullName}</span>
            <span className="font-bold text-sm text-stone-800">{user?.name}</span>
          </div>

          <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
            <span className="text-xs text-stone-500 block mb-0.5">{t.profile.phone}</span>
            <span className="font-bold text-sm text-stone-800">{user?.phone}</span>
          </div>

          <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
            <span className="text-xs text-stone-500 block mb-0.5">{t.profile.location}</span>
            <span className="font-bold text-sm text-stone-800">{user?.location}, {user?.state || 'Haryana'}</span>
          </div>

          <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
            <span className="text-xs text-stone-500 block mb-0.5">{t.profile.farmSize}</span>
            <span className="font-bold text-sm text-stone-800">{user?.landSizeAcres} {t.dashboard.acres}</span>
          </div>
        </div>
      </div>

      {/* Settings & Language Preference */}
      <div className="bg-white border border-stone-200 rounded-3xl p-6 shadow-xs space-y-4">
        <h2 className="text-sm font-extrabold uppercase tracking-wider text-stone-500">
          {t.profile.notificationSettings}
        </h2>

        {/* Language Selection */}
        <div className="flex items-center justify-between p-3.5 bg-stone-50 rounded-xl border border-stone-200">
          <div className="flex items-center space-x-3">
            <Globe className="w-5 h-5 text-emerald-600" />
            <div>
              <p className="font-bold text-sm text-stone-900">{t.profile.preferredLanguage}</p>
              <p className="text-xs text-stone-500">Switch application display language</p>
            </div>
          </div>
          <div className="flex space-x-1">
            <button
              type="button"
              onClick={() => setLanguage('en')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                language === 'en' ? 'bg-emerald-600 text-white shadow-xs' : 'bg-stone-200 text-stone-700'
              }`}
            >
              English
            </button>
            <button
              type="button"
              onClick={() => setLanguage('hi')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                language === 'hi' ? 'bg-emerald-600 text-white shadow-xs' : 'bg-stone-200 text-stone-700'
              }`}
            >
              हिंदी
            </button>
          </div>
        </div>

        {/* Notifications Toggle */}
        <div className="flex items-center justify-between p-3.5 bg-stone-50 rounded-xl border border-stone-200">
          <div className="flex items-center space-x-3">
            <Bell className="w-5 h-5 text-amber-600" />
            <div>
              <p className="font-bold text-sm text-stone-900">Crop & Weather Alerts</p>
              <p className="text-xs text-stone-500">{t.profile.notificationsToggle}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => updateFarmerSettings({ notificationsEnabled: !user?.notificationsEnabled })}
            className={`w-12 h-7 flex items-center rounded-full p-1 transition-colors ${
              user?.notificationsEnabled ? 'bg-emerald-600' : 'bg-stone-300'
            }`}
          >
            <div
              className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform ${
                user?.notificationsEnabled ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Location Toggle */}
        <div className="flex items-center justify-between p-3.5 bg-stone-50 rounded-xl border border-stone-200">
          <div className="flex items-center space-x-3">
            <Navigation className="w-5 h-5 text-blue-600" />
            <div>
              <p className="font-bold text-sm text-stone-900">GPS Mandi Distance Calculation</p>
              <p className="text-xs text-stone-500">{t.profile.locationToggle}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => updateFarmerSettings({ locationEnabled: !user?.locationEnabled })}
            className={`w-12 h-7 flex items-center rounded-full p-1 transition-colors ${
              user?.locationEnabled ? 'bg-emerald-600' : 'bg-stone-300'
            }`}
          >
            <div
              className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform ${
                user?.locationEnabled ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Demo Controls & Sign out */}
      <div className="bg-white border border-stone-200 rounded-3xl p-6 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={resetDemo}
            className="flex-1 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 font-bold text-sm py-3 px-4 rounded-xl transition-colors flex items-center justify-center space-x-2 touch-target cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>{t.profile.resetDemoBtn}</span>
          </button>

          <button
            type="button"
            onClick={logout}
            className="flex-1 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 font-bold text-sm py-3 px-4 rounded-xl transition-colors flex items-center justify-center space-x-2 touch-target cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>{t.profile.logoutBtn}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
