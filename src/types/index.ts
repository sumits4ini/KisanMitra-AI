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

export type FarmCropStatus = 'Healthy' | 'Needs Attention' | 'High Risk';

export interface TreatmentRecord {
  id: string;
  date: string;
  actionEn: string;
  actionHi: string;
  categoryEn: string;
  categoryHi: string;
  notesEn: string;
  notesHi: string;
}

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
  healthStatus: FarmCropStatus;
  diseaseRisk: 'low' | 'medium' | 'high';
  waterStatus: 'good' | 'adequate' | 'deficit';
  marketOpportunity: 'high' | 'good' | 'moderate';
  lastDiagnosis: string;
  lastDiagnosisHindi: string;
  lastCheckedDate: string;
  nextCheckDate: string;
  stage: string;
  stageHindi: string;
  healthTrend: { date: string; score: number }[];
  treatmentHistory: TreatmentRecord[];
  aiRecommendationsEn: string[];
  aiRecommendationsHi: string[];
  imageUrl: string;
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
  
  // Phase 4 & 5: Treatment & Prevention
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

// Phase 6: Market Intelligence Types
export interface MandiOption {
  id: string;
  code: string; // 'Market A' | 'Market B' | 'Market C'
  codeHindi: string; // 'मंडी क' | 'मंडी ख' | 'मंडी ग'
  name: string;
  nameHindi: string;
  distanceKm: number;
  pricePerQuintal: number;
  trend: 'up' | 'down' | 'stable';
  trendPercent: number;
  mandiCessPercent: number;
  handlingPerQuintal: number;
  fixedTransportBase: number; // base transport for 20 quintals
}

export interface MandiCalculationResult extends MandiOption {
  quantityQuintals: number;
  grossRevenue: number;
  transportCost: number;
  mandiCess: number;
  handlingCost: number;
  weighingFee: number;
  otherCharges: number;
  netReturn: number;
  netPerQuintal: number;
  isBestOption: boolean;
  bestReasonEn?: string;
  bestReasonHi?: string;
  additionalProfitVsSecondBest?: number;
}

// Phase 7: Sell Smart Decision Types
export type SellDecisionType = 'SELL NOW' | 'WAIT' | 'SELL PARTIALLY';
export type SellRiskLevel = 'Low' | 'Moderate' | 'High';

export type PriceTrendType = 'rising' | 'stable' | 'falling';
export type StorageType = 'shaded_crates' | 'ventilated_shed' | 'cold_storage' | 'none';
export type MarketDemandType = 'high' | 'moderate' | 'weak';

export interface SellSmartInputs {
  crop: string;
  quantityQuintals: number;
  currentPrice: number;
  expectedTrend: PriceTrendType;
  estimatedShelfLifeDays: number;
  storageAvailability: StorageType;
  transportCost: number;
  marketDemand: MarketDemandType;
  targetMandi: string;
}

export interface SmartSellingPlanBatch {
  quintals: number;
  targetMandi: string;
  mandiNameEn: string;
  mandiNameHi: string;
  actionEn: string;
  actionHi: string;
  timingEn: string;
  timingHi: string;
  expectedRate: number;
  netEstimatedReturn: number;
  rationaleEn: string;
  rationaleHi: string;
}

export interface SellSmartDecision {
  recommendation: SellDecisionType;
  headlineEn: string;
  headlineHi: string;
  badgeEn: string;
  badgeHi: string;
  reasonEn: string;
  reasonHi: string;
  estimatedPriceRange: { min: number; max: number };
  riskLevel: SellRiskLevel;
  riskLabelEn: string;
  riskLabelHi: string;
  confidencePercent: number;
  estimatedAdditionalReturn: number;
  holdingWindowTextEn: string;
  holdingWindowTextHi: string;
  plan: {
    batch1: SmartSellingPlanBatch;
    batch2: SmartSellingPlanBatch;
    currentReturn: number;
    optimizedReturn: number;
    potentialDifference: number;
  };
}

