import React from 'react';
import { FarmSummaryHeader } from './FarmSummaryHeader';
import { HowItWorksSection } from './HowItWorksSection';
import { CropHealthOverview } from './CropHealthOverview';
import { TodaysAdviceCard } from './TodaysAdviceCard';
import { QuickActionsGrid } from './QuickActionsGrid';
import { DashboardAlerts } from './DashboardAlerts';
import { RecentActivitySection } from './RecentActivitySection';

export const DashboardView: React.FC = () => {
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-20 lg:pb-12 animate-in fade-in duration-200">
      {/* 1 & 2. Greeting & Farm Summary (Location, Farm Size, Main Crop, Large Check My Crop CTA) */}
      <FarmSummaryHeader />

      {/* 30-Second Judge Overview & 5-Step System: Scan Crop -> Understand Problem -> Action Guidance -> Compare Markets -> Sell Smarter */}
      <HowItWorksSection />


      {/* 3, 4, 5, 6. Crop Health Card (Tomato, 82/100, Good), Disease Risk (Medium), Water Status (Good), Market Opportunity (Good) */}
      <CropHealthOverview />

      {/* 7. Today's AI Advice Card */}
      <TodaysAdviceCard />

      {/* 8. Quick Actions (Diagnose Crop, Check Market, Calculate Profit, Ask AI) */}
      <QuickActionsGrid />

      {/* 9. Live Notifications & Urgent Alerts */}
      <DashboardAlerts />

      {/* 10. Recent Crop Activity Timeline */}
      <RecentActivitySection />
    </div>
  );
};
