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

export interface CropActivity {
  id: string;
  type: 'diagnosis' | 'market' | 'irrigation' | 'inspection';
  titleEn: string;
  titleHi: string;
  descEn: string;
  descHi: string;
  timeEn: string;
  timeHi: string;
  badgeEn?: string;
  badgeHi?: string;
  status: 'positive' | 'warning' | 'neutral';
}

export interface TreatmentCategory {
  categoryEn: string;
  categoryHi: string;
  purposeEn: string;
  purposeHi: string;
  applicationGuidanceEn: string;
  applicationGuidanceHi: string;
  precautionsEn: string;
  precautionsHi: string;
}

export interface DiagnosisResult {
  id: string;
  crop: 'Tomato' | 'Wheat' | 'Rice' | 'Cotton' | 'Mustard' | 'Potato';
  cropHindi: string;
  disease: string;
  diseaseHindi: string;
  scientificName?: string;
  confidence: number;
  severity: 'Mild' | 'Moderate' | 'High' | 'None (Healthy)';
  severityHindi: string;
  healthScore: number;
  symptomsEn: string[];
  symptomsHi: string[];
  contributingConditionsEn: string[];
  contributingConditionsHi: string[];
  whyAiDetectedEn: string;
  whyAiDetectedHi: string;
  imageUrl: string;
  timestamp: string;
  
  // Phase 4: Treatment & Prevention
  whatHappenedEn: string;
  whatHappenedHi: string;
  immediateActionsEn: string[];
  immediateActionsHi: string[];
  preventionEn: string[];
  preventionHi: string[];
  treatmentGuidance: TreatmentCategory[];
  recheckDays: number;
  recheckGuidanceEn: string;
  recheckGuidanceHi: string;
  recommendedActionEn: string;
  recommendedActionHi: string;
}

export interface CropHealthHistoryItem {
  id: string;
  date: string;
  crop: string;
  cropHindi: string;
  diagnosis: string;
  diseaseHindi: string;
  severity: string;
  severityHindi: string;
  healthScore: number;
  recommendedActionEn: string;
  recommendedActionHi: string;
  imageUrl?: string;
}
