import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useApp } from '../../context/AppContext';
import { 
  Sprout, 
  Stethoscope, 
  Store, 
  Calculator, 
  Bot, 
  MapPin, 
  ShieldAlert, 
  Droplets, 
  TrendingUp, 
  ArrowRight,
  Sparkles,
  AlertTriangle
} from 'lucide-react';

export const DashboardView: React.FC = () => {
  const { t } = useLanguage();
  const { user, crops, setTab } = useApp();

  const activeCrop = crops[0] || {
    name: 'Tomato',
    hindiName: 'टमाटर',
    acreage: 5,
    healthScore: 82,
    healthStatus: 'good',
    diseaseRisk: 'medium',
    waterStatus: 'good',
    marketOpportunity: 'high',
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-20 lg:pb-10">
      {/* Top Greeting Header */}
      <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-green-700 text-white rounded-3xl p-6 sm:p-8 shadow-lg shadow-emerald-950/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-1.5 bg-emerald-900/60 border border-emerald-400/30 text-emerald-200 text-xs font-bold px-3 py-1 rounded-full backdrop-blur-xs">
            <MapPin className="w-3.5 h-3.5 text-amber-300" />
            <span>{user?.location || 'Karnal'}, {user?.state || 'Haryana'}</span>
            <span className="mx-1">•</span>
            <span>{user?.landSizeAcres || 5} {t.dashboard.acres}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
            {t.dashboard.greeting.replace('{name}', user?.name || 'Farmer')}
          </h1>

          <p className="text-emerald-100 text-sm sm:text-base font-medium max-w-2xl">
            {t.tagline} &mdash; Keep your crop protected from fungal infection and maximize mandi prices this harvest.
          </p>
        </div>

        {/* Large Call-To-Action Button */}
        <div className="flex-shrink-0">
          <button
            type="button"
            onClick={() => setTab('crop-doctor')}
            className="w-full sm:w-auto bg-amber-400 hover:bg-amber-300 text-stone-950 font-black text-base px-6 py-3.5 rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center space-x-2.5 group cursor-pointer touch-target"
          >
            <Stethoscope className="w-5 h-5 text-emerald-900 group-hover:scale-110 transition-transform" />
            <span>{t.dashboard.checkMyCropBtn}</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Core Innovation Pathway Banner: Crop Health -> Market -> Profit */}
      <div className="bg-white border border-stone-200 rounded-2xl p-4 sm:p-5 shadow-xs">
        <div className="flex items-center space-x-2 mb-3">
          <Sparkles className="w-4 h-4 text-emerald-600" />
          <h2 className="text-xs font-extrabold uppercase tracking-wider text-stone-500">
            {t.dashboard.workflowTitle}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-sm">
              1
            </div>
            <div>
              <p className="font-bold text-sm text-emerald-950">{t.dashboard.workflowStep1}</p>
              <p className="text-xs text-emerald-800">Early disease detection prevents yield loss</p>
            </div>
          </div>

          <div className="bg-teal-50 border border-teal-200 rounded-xl p-3 flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-teal-600 text-white flex items-center justify-center font-bold text-sm">
              2
            </div>
            <div>
              <p className="font-bold text-sm text-teal-950">{t.dashboard.workflowStep2}</p>
              <p className="text-xs text-teal-800">Live prices minus transport cost per quintal</p>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500 text-white flex items-center justify-center font-bold text-sm">
              3
            </div>
            <div>
              <p className="font-bold text-sm text-amber-950">{t.dashboard.workflowStep3}</p>
              <p className="text-xs text-amber-800">Timing advice (sell today vs hold 1-2 days)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Farm Overview Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Crop Health Card */}
        <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-xs hover:border-emerald-300 transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-stone-500">{t.dashboard.cropHealth}</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <Sprout className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-black text-stone-900">{activeCrop.healthScore}%</span>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
              {t.dashboard.statusGood}
            </span>
          </div>
          <div className="w-full bg-stone-100 h-2 rounded-full mt-3 overflow-hidden">
            <div 
              className="bg-emerald-500 h-full rounded-full transition-all"
              style={{ width: `${activeCrop.healthScore}%` }}
            />
          </div>
        </div>

        {/* Water Status Card */}
        <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-xs hover:border-blue-300 transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-stone-500">{t.dashboard.waterStatus}</span>
            <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
              <Droplets className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-black text-stone-900">{t.dashboard.statusGood}</span>
            <span className="text-xs text-blue-700 font-bold bg-blue-50 px-2 py-0.5 rounded-md">
              Optimal
            </span>
          </div>
          <p className="text-xs text-stone-500 mt-2">Adequate root zone moisture</p>
        </div>

        {/* Disease Risk Card */}
        <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-xs hover:border-amber-300 transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-stone-500">{t.dashboard.diseaseRisk}</span>
            <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
              <ShieldAlert className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-black text-amber-700">{t.dashboard.statusModerate}</span>
          </div>
          <p className="text-xs text-stone-500 mt-2">Early blight risk in tomato leaves</p>
        </div>

        {/* Market Opportunity */}
        <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-xs hover:border-teal-300 transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-stone-500">{t.dashboard.marketOpportunity}</span>
            <div className="w-8 h-8 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-black text-teal-800">{t.dashboard.statusGood}</span>
            <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md">
              +₹250/qtl
            </span>
          </div>
          <p className="text-xs text-stone-500 mt-2">Azadpur mandi rates surging</p>
        </div>
      </div>

      {/* Today's AI Advisory Card */}
      <div className="bg-gradient-to-br from-amber-50 via-stone-50 to-emerald-50/40 border-2 border-amber-200/80 rounded-3xl p-6 shadow-sm">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-md flex-shrink-0">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <h3 className="text-lg font-black text-stone-900">
                {t.dashboard.todaysAdviceTitle}
              </h3>
              <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                High Priority
              </span>
            </div>
            <p className="text-sm font-medium text-stone-700 mt-1.5 leading-relaxed">
              "{t.dashboard.todaysAdviceDesc}"
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setTab('crop-doctor')}
                className="text-xs font-bold text-emerald-800 bg-white border border-emerald-300 hover:bg-emerald-50 px-3 py-1.5 rounded-lg shadow-xs transition-colors flex items-center space-x-1"
              >
                <span>Upload Leaf Photo</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setTab('ai-assistant')}
                className="text-xs font-bold text-stone-700 bg-white border border-stone-200 hover:bg-stone-50 px-3 py-1.5 rounded-lg transition-colors"
              >
                Ask Advisory Questions
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions Grid */}
      <div>
        <h3 className="text-sm font-extrabold uppercase tracking-wider text-stone-500 mb-3">
          {t.dashboard.quickActionsTitle}
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <button
            type="button"
            onClick={() => setTab('crop-doctor')}
            className="p-4 bg-white border border-stone-200 hover:border-emerald-500 hover:bg-emerald-50/40 rounded-2xl shadow-xs transition-all text-left flex flex-col justify-between group touch-target cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Stethoscope className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-sm text-stone-900">{t.dashboard.actionDiagnose}</p>
              <p className="text-[11px] text-stone-500">Scan leaf for diseases</p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setTab('market')}
            className="p-4 bg-white border border-stone-200 hover:border-teal-500 hover:bg-teal-50/40 rounded-2xl shadow-xs transition-all text-left flex flex-col justify-between group touch-target cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Store className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-sm text-stone-900">{t.dashboard.actionMarket}</p>
              <p className="text-[11px] text-stone-500">Compare 3 nearby mandis</p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setTab('sell-smart')}
            className="p-4 bg-white border border-stone-200 hover:border-amber-500 hover:bg-amber-50/40 rounded-2xl shadow-xs transition-all text-left flex flex-col justify-between group touch-target cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-sm text-stone-900">{t.dashboard.actionProfit}</p>
              <p className="text-[11px] text-stone-500">Transport & net profit</p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setTab('ai-assistant')}
            className="p-4 bg-white border border-stone-200 hover:border-indigo-500 hover:bg-indigo-50/40 rounded-2xl shadow-xs transition-all text-left flex flex-col justify-between group touch-target cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-sm text-stone-900">{t.dashboard.actionAskAI}</p>
              <p className="text-[11px] text-stone-500">Bilingual farming assistant</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
