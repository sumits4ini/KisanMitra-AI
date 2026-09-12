export type Language = 'en' | 'hi';

export type NavigationTab = 
  | 'dashboard'
  | 'crop-doctor'
  | 'my-crops'
  | 'market'
  | 'sell-smart'
  | 'ai-assistant'
  | 'notifications'
  | 'profile';

export interface UserProfile {
  id: string;
  name: string;
  phone: string;
  location: string;
  state: string;
  landSizeAcres: number;
  primaryCrop: string;
  isDemo: boolean;
  avatarUrl?: string;
  notificationsEnabled: boolean;
  locationEnabled: boolean;
}

export interface FarmCrop {
  id: string;
  name: string;
  hindiName: string;
  variety: string;
  acreage: number;
  sowingDate: string;
  healthScore: number;
  healthStatus: 'good' | 'warning' | 'critical';
  diseaseRisk: 'low' | 'medium' | 'high';
  waterStatus: 'good' | 'adequate' | 'deficit';
  marketOpportunity: 'high' | 'good' | 'moderate';
  lastCheckedDate: string;
}

export interface NotificationItem {
  id: string;
  type: 'disease' | 'weather' | 'market' | 'reminder';
  titleEn: string;
  titleHi: string;
  messageEn: string;
  messageHi: string;
  timestamp: string;
  read: boolean;
  severity: 'info' | 'warning' | 'success';
}
