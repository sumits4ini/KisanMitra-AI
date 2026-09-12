import React from 'react';
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

const MainLayout: React.FC = () => {
  const { isAuthenticated, currentTab } = useApp();

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

      {/* Desktop & Tablet Footer */}
      <footer className="hidden lg:block border-t border-stone-200 bg-white py-6 text-center text-xs text-stone-500">
        <div className="max-w-7xl mx-auto px-4 space-y-1">
          <p className="font-bold text-stone-700">
            KisanMitra AI &bull; From Crop Health to Better Markets
          </p>
          <p className="text-[11px] text-stone-400 max-w-2xl mx-auto">
            Hackathon prototype for agricultural AI decision-making. Always verify pesticide recommendations with official product labels and certified agricultural extension officers.
          </p>
        </div>
      </footer>

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
