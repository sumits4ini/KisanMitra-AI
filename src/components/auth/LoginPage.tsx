import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useApp } from '../../context/AppContext';
import { LanguageSwitcher } from '../common/LanguageSwitcher';
import { 
  Sprout, 
  Phone, 
  Lock, 
  User, 
  MapPin, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles,
  CheckCircle2
} from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { t } = useLanguage();
  const { loginAsDemo, loginCustom } = useApp();

  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  
  // Sign up fields
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [landSize, setLandSize] = useState('5');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier.trim()) {
      setErrorMessage(t.auth.mockLoginError);
      return;
    }
    setErrorMessage('');
    // Normal login fallback
    loginCustom(identifier.split('@')[0] || 'Farmer Friend', identifier, 'Karnal, Haryana', 5);
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      setErrorMessage(t.auth.mockLoginError);
      return;
    }
    setErrorMessage('');
    loginCustom(name, phone, location || 'Karnal, Haryana', Number(landSize) || 5);
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between overflow-x-hidden font-sans">
      {/* Full-screen Background Image with subtle dark/green overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{ backgroundImage: `url('/images/farmer_hero.jpg')` }}
      >
        {/* Subtle dark green gradient overlay ensuring optimal contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-900/75 to-emerald-950/70 backdrop-blur-[1.5px]" />
      </div>

      {/* Top Bar on Login Screen */}
      <header className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center space-x-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-500 to-green-600 flex items-center justify-center shadow-lg shadow-emerald-950/40 border border-white/20">
            <Sprout className="w-7 h-7 text-white" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-black tracking-tight text-white drop-shadow-md">
                {t.appName}
              </span>
              <span className="bg-emerald-500/90 text-white text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full tracking-wider shadow-xs">
                AI MVP
              </span>
            </div>
            <p className="text-xs font-semibold text-emerald-300 drop-shadow-sm">
              {t.tagline}
            </p>
          </div>
        </div>

        {/* Language Switcher */}
        <LanguageSwitcher lightMode={false} className="shadow-lg border-white/30" />
      </header>

      {/* Main Content Area: Left Hero Hook & Right Login Card */}
      <main className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Vision & Trust Points */}
        <div className="lg:col-span-7 text-white space-y-6">
          <div className="inline-flex items-center space-x-2 bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs font-bold px-3.5 py-1.5 rounded-full backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>AI-Driven Agriculture & Mandi Intelligence</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight drop-shadow-lg">
            {t.auth.welcomeTitle}
          </h1>

          <p className="text-base sm:text-lg text-stone-200 max-w-2xl font-medium leading-relaxed drop-shadow">
            {t.auth.welcomeSubtitle} — seamlessly diagnosing leaf diseases, prescribing safe remedies, and recommending the most profitable mandi after transport deductions.
          </p>

          {/* Quick Value Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="bg-stone-900/60 backdrop-blur-md border border-white/10 rounded-xl p-3.5 text-stone-100">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 mb-1.5" />
              <p className="font-bold text-sm">Crop Doctor AI</p>
              <p className="text-xs text-stone-300 mt-0.5">Instant disease severity & treatment guidance</p>
            </div>
            <div className="bg-stone-900/60 backdrop-blur-md border border-white/10 rounded-xl p-3.5 text-stone-100">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 mb-1.5" />
              <p className="font-bold text-sm">Mandi Comparison</p>
              <p className="text-xs text-stone-300 mt-0.5">Net profit after transport & mandi fees</p>
            </div>
            <div className="bg-stone-900/60 backdrop-blur-md border border-white/10 rounded-xl p-3.5 text-stone-100">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 mb-1.5" />
              <p className="font-bold text-sm">Sell Smart Timing</p>
              <p className="text-xs text-stone-300 mt-0.5">Sell today or wait based on shelf life</p>
            </div>
          </div>
        </div>

        {/* Right Column: Authentication & Demo Farmer Card */}
        <div className="lg:col-span-5 w-full">
          <div className="bg-white/95 backdrop-blur-xl border border-white/30 rounded-3xl shadow-2xl p-6 sm:p-8 text-stone-900 transition-all">
            
            {/* Demo Farmer Top Callout - Primary for hackathons */}
            <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-100/70 border border-emerald-300/80 shadow-xs text-center">
              <div className="flex items-center justify-center space-x-1.5 mb-1 text-emerald-800 font-bold text-xs">
                <Sparkles className="w-4 h-4 text-amber-600 animate-spin" style={{ animationDuration: '8s' }} />
                <span>HACKATHON QUICK EVALUATION</span>
              </div>
              
              <button
                type="button"
                onClick={loginAsDemo}
                className="w-full mt-2 bg-gradient-to-r from-emerald-600 to-green-700 hover:from-emerald-700 hover:to-green-800 text-white font-extrabold text-base py-3.5 px-4 rounded-xl shadow-lg shadow-emerald-600/30 hover:shadow-xl hover:shadow-emerald-600/40 transition-all flex items-center justify-center space-x-2 group cursor-pointer touch-target"
              >
                <span>{t.auth.demoFarmerButton}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <p className="text-[11px] text-emerald-900/80 font-medium mt-2">
                {t.auth.demoFarmerSubtext}
              </p>
            </div>

            {/* Divider */}
            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-stone-200"></div>
              <span className="flex-shrink mx-3 text-stone-400 text-[11px] font-bold tracking-wider">
                {t.auth.orDivider}
              </span>
              <div className="flex-grow border-t border-stone-200"></div>
            </div>

            {/* Tab switch between Login and Signup */}
            <div className="grid grid-cols-2 p-1 bg-stone-100 rounded-xl mb-5 text-sm font-bold">
              <button
                type="button"
                onClick={() => { setMode('login'); setErrorMessage(''); }}
                className={`py-2 text-center rounded-lg transition-all ${
                  mode === 'login'
                    ? 'bg-white text-emerald-800 shadow-xs'
                    : 'text-stone-500 hover:text-stone-800'
                }`}
              >
                {t.auth.loginTab}
              </button>
              <button
                type="button"
                onClick={() => { setMode('signup'); setErrorMessage(''); }}
                className={`py-2 text-center rounded-lg transition-all ${
                  mode === 'signup'
                    ? 'bg-white text-emerald-800 shadow-xs'
                    : 'text-stone-500 hover:text-stone-800'
                }`}
              >
                {t.auth.signupTab}
              </button>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-xs font-semibold text-red-700 flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-red-500" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Login Form */}
            {mode === 'login' ? (
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    {t.auth.phoneOrEmailLabel}
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      placeholder={t.auth.phoneOrEmailPlaceholder}
                      className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    {t.auth.passwordLabel}
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder={t.auth.passwordPlaceholder}
                      className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-stone-900 hover:bg-stone-800 text-white font-bold text-sm py-3 px-4 rounded-xl shadow transition-colors touch-target"
                >
                  {t.auth.loginButton}
                </button>

                <div className="text-center pt-2">
                  <span className="text-xs text-stone-500">{t.auth.dontHaveAccount} </span>
                  <button
                    type="button"
                    onClick={() => setMode('signup')}
                    className="text-xs font-bold text-emerald-700 hover:underline"
                  >
                    {t.auth.signUpLink}
                  </button>
                </div>
              </form>
            ) : (
              /* Signup Form */
              <form onSubmit={handleSignupSubmit} className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    {t.auth.fullNameLabel}
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={t.auth.fullNamePlaceholder}
                      className="w-full pl-10 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      {t.auth.phoneOrEmailLabel}
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="9876543210"
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      {t.auth.landSizeLabel}
                    </label>
                    <input
                      type="number"
                      value={landSize}
                      onChange={(e) => setLandSize(e.target.value)}
                      placeholder="5"
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    {t.auth.locationLabel}
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder={t.auth.locationPlaceholder}
                      className="w-full pl-10 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full mt-2 bg-stone-900 hover:bg-stone-800 text-white font-bold text-sm py-3 px-4 rounded-xl shadow transition-colors touch-target"
                >
                  {t.auth.createAccountButton}
                </button>

                <div className="text-center pt-1">
                  <span className="text-xs text-stone-500">{t.auth.alreadyHaveAccount} </span>
                  <button
                    type="button"
                    onClick={() => setMode('login')}
                    className="text-xs font-bold text-emerald-700 hover:underline"
                  >
                    {t.auth.loginLink}
                  </button>
                </div>
              </form>
            )}

            {/* Safety badge at bottom of card */}
            <div className="mt-5 pt-3 border-t border-stone-100 flex items-center justify-center space-x-1.5 text-[11px] text-stone-500">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Free open prototype for agricultural hackathons</span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full text-center py-4 text-xs font-medium text-stone-300/80 bg-stone-950/60 backdrop-blur-md border-t border-white/10 px-4">
        <p>
          {t.appName} &bull; {t.safetyNoticeShort}
        </p>
      </footer>
    </div>
  );
};
