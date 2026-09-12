import type { UserProfile, FarmCrop, NotificationItem } from '../types';

export const DEFAULT_DEMO_FARMER: UserProfile = {
  id: 'farmer_ramesh_001',
  name: 'Ramesh Kumar',
  phone: '+91 98765 43210',
  location: 'Karnal',
  state: 'Haryana',
  landSizeAcres: 5,
  primaryCrop: 'Tomato (टमाटर)',
  isDemo: true,
  avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  notificationsEnabled: true,
  locationEnabled: true,
};

export const DEFAULT_DEMO_CROPS: FarmCrop[] = [
  {
    id: 'crop_tomato_01',
    name: 'Tomato',
    hindiName: 'टमाटर (हाइब्रिड)',
    variety: 'Abhinav Hybrid',
    acreage: 5,
    sowingDate: '2026-07-15',
    healthScore: 82,
    healthStatus: 'good',
    diseaseRisk: 'medium',
    waterStatus: 'good',
    marketOpportunity: 'high',
    lastCheckedDate: 'Today',
  },
  {
    id: 'crop_wheat_02',
    name: 'Wheat',
    hindiName: 'गेहूं (एचडी 3086)',
    variety: 'HD-3086',
    acreage: 3,
    sowingDate: '2026-11-10',
    healthScore: 94,
    healthStatus: 'good',
    diseaseRisk: 'low',
    waterStatus: 'adequate',
    marketOpportunity: 'good',
    lastCheckedDate: '2 days ago',
  }
];

export const DEFAULT_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif_1',
    type: 'disease',
    titleEn: 'Fungal Disease Risk Alert',
    titleHi: 'फफूंद रोग जोखिम अलर्ट',
    messageEn: 'Moderate humidity detected in Karnal. Inspect lower tomato leaves for early spots.',
    messageHi: 'करनाल में सुबह की उच्च नमी दर्ज। टमाटर के निचले पत्तों पर शुरुआती धब्बों की जांच करें।',
    timestamp: '15 mins ago',
    read: false,
    severity: 'warning',
  },
  {
    id: 'notif_2',
    type: 'market',
    titleEn: 'Azadpur Mandi Rate Spike',
    titleHi: 'आजादपुर मंडी में भाव तेजी',
    messageEn: 'Tomato wholesale price jumped to ₹2,250/quintal in Azadpur (45 km).',
    messageHi: 'आजादपुर मंडी (45 किमी) में टमाटर के थोक भाव ₹2,250/क्विंटल तक पहुंचे।',
    timestamp: '2 hours ago',
    read: false,
    severity: 'success',
  },
  {
    id: 'notif_3',
    type: 'weather',
    titleEn: 'Rain Expected in 48 Hours',
    titleHi: '48 घंटों में बारिश की संभावना',
    messageEn: 'Light showers expected Wednesday. Avoid pesticide spraying before rainfall.',
    messageHi: 'बुधवार को हल्की वर्षा की संभावना। बारिश से पहले कीटनाशक छिड़काव से बचें।',
    timestamp: '5 hours ago',
    read: true,
    severity: 'info',
  },
];
