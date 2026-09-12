import React, { useState } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { AppProvider, useApp } from './context/AppContext';
import { LoginPage } from './components/auth/LoginPage';
import { Navbar } from './components/common/Navbar';
import { BottomNavigation } from './components/common/BottomNavigation';
import { DashboardView } from './components/dashboard/DashboardView';
import { CropDoctorView } from './components/crop-doctor/CropDoctorView';
import { MyCropsView } from './components/my-crops/MyCropsView';
import { MarketView } from './components/market/MarketView';
import { SellSmartView } from './components/sell-smart/SellSmartView';
import { AIAssistantView } from './components/ai-assistant/AIAssistantView';
import { NotificationsView } from './components/notifications/NotificationsView';
import { ProfileView } from './components/profile/ProfileView';
import { LegalModal, type LegalModalType } from './components/common/LegalModal';

const MainLayout: React.FC = () => {
  const { isAuthenticated, currentTab, toast, dismissToast } = useApp();
  const [legalModal, setLegalModal] = useState<LegalModalType>(null);

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  const renderContent = () => {
    switch (currentTab) {
      case 'dashboard':
        return <DashboardView />;
      case 'crop-doctor':
        return <CropDoctorView />;
      case 'my-crops':
        return <MyCropsView />;
      case 'market':
        return <MarketView />;
      case 'sell-smart':
        return <SellSmartView />;
      case 'ai-assistant':
        return <AIAssistantView />;
      case 'notifications':
        return <NotificationsView />;
      case 'profile':
        return <ProfileView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="min-h-screen bg-stone-50/70 flex flex-col justify-between text-stone-900 font-sans">
      <div>
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-24 lg:pb-12">
          {renderContent()}
        </main>
      </div>

      {/* Floating Global Toast Notification */}
      {toast && (
        <div className="fixed bottom-20 lg:bottom-8 right-4 left-4 sm:left-auto sm:max-w-md z-50 bg-stone-900 text-white border border-emerald-500/50 shadow-2xl rounded-2xl p-4 flex items-center justify-between space-x-3 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="flex items-center space-x-3 flex-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
            <p className="text-xs font-bold leading-snug" dangerouslySetInnerHTML={{ __html: toast }} />
          </div>
          <button
            type="button"
            onClick={dismissToast}
            className="text-stone-400 hover:text-white p-1 rounded-lg text-xs font-black cursor-pointer flex-shrink-0"
          >
            ✕
          </button>
        </div>
      )}

      {/* Desktop & Tablet Footer */}
      <footer className="hidden lg:block border-t border-stone-200 bg-white py-6 text-center text-xs text-stone-500">
        <div className="max-w-7xl mx-auto px-4 space-y-2">
          <p className="font-bold text-stone-800 text-sm">
            KisanMitra AI &bull; From Crop Health to Better Markets
          </p>
          <p className="text-xs text-stone-500 max-w-2xl mx-auto">
            AI-powered agricultural decision support for smarter crop care and market decisions.
          </p>
          <div className="flex items-center justify-center space-x-4 pt-1 text-xs text-stone-400 font-medium">
            <button
              type="button"
              onClick={() => setLegalModal('privacy')}
              className="hover:text-emerald-700 transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <span>&bull;</span>
            <button
              type="button"
              onClick={() => setLegalModal('terms')}
              className="hover:text-emerald-700 transition-colors cursor-pointer"
            >
              Terms of Service
            </button>
            <span>&bull;</span>
            <button
              type="button"
              onClick={() => setLegalModal('contact')}
              className="hover:text-emerald-700 transition-colors cursor-pointer"
            >
              Contact Support
            </button>
          </div>
        </div>
      </footer>

      {/* Legal & Support Modal */}
      <LegalModal type={legalModal} onClose={() => setLegalModal(null)} />

      {/* Mobile Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};


export default function App() {
  return (
    <LanguageProvider>
      <AppProvider>
        <MainLayout />
      </AppProvider>
    </LanguageProvider>
  );
}
