import React, { createContext, useContext, useState, useEffect } from 'react';
import type { UserProfile, FarmCrop, NotificationItem, NavigationTab, DiagnosisResult } from '../types';
import { DEFAULT_DEMO_FARMER, DEFAULT_DEMO_CROPS, DEFAULT_NOTIFICATIONS } from '../data/demoFarmer';

interface AppContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  currentTab: NavigationTab;
  crops: FarmCrop[];
  notifications: NotificationItem[];
  savedDiagnoses: DiagnosisResult[];
  unreadCount: number;
  loginAsDemo: () => void;
  loginCustom: (name: string, phone: string, location: string, acres: number) => void;
  logout: () => void;
  resetDemo: () => void;
  setTab: (tab: NavigationTab) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  clearNotifications: () => void;
  updateFarmerSettings: (settings: Partial<UserProfile>) => void;
  saveDiagnosis: (result: DiagnosisResult) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('kisanmitra_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing stored user:', e);
      }
    }
    return null;
  });

  const [currentTab, setCurrentTab] = useState<NavigationTab>('dashboard');
  const [crops, setCrops] = useState<FarmCrop[]>(() => {
    const saved = localStorage.getItem('kisanmitra_crops');
    return saved ? JSON.parse(saved) : DEFAULT_DEMO_CROPS;
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem('kisanmitra_notifs');
    return saved ? JSON.parse(saved) : DEFAULT_NOTIFICATIONS;
  });

  const [savedDiagnoses, setSavedDiagnoses] = useState<DiagnosisResult[]>(() => {
    const saved = localStorage.getItem('kisanmitra_diagnoses');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('kisanmitra_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('kisanmitra_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('kisanmitra_crops', JSON.stringify(crops));
  }, [crops]);

  useEffect(() => {
    localStorage.setItem('kisanmitra_notifs', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('kisanmitra_diagnoses', JSON.stringify(savedDiagnoses));
  }, [savedDiagnoses]);

  const loginAsDemo = () => {
    setUser({ ...DEFAULT_DEMO_FARMER });
    setCrops([...DEFAULT_DEMO_CROPS]);
    setNotifications([...DEFAULT_NOTIFICATIONS]);
    setCurrentTab('dashboard');
  };

  const loginCustom = (name: string, phone: string, location: string, acres: number) => {
    const newUser: UserProfile = {
      id: 'farmer_' + Date.now(),
      name: name || 'Farmer Friend',
      phone: phone || '+91 98765 00000',
      location: location || 'Karnal',
      state: 'Haryana',
      landSizeAcres: acres || 4,
      primaryCrop: 'Tomato',
      isDemo: false,
      notificationsEnabled: true,
      locationEnabled: true,
    };
    setUser(newUser);
    setCurrentTab('dashboard');
  };

  const logout = () => {
    setUser(null);
    setCurrentTab('dashboard');
  };

  const resetDemo = () => {
    setUser({ ...DEFAULT_DEMO_FARMER });
    setCrops([...DEFAULT_DEMO_CROPS]);
    setNotifications([...DEFAULT_NOTIFICATIONS]);
    setSavedDiagnoses([]);
    localStorage.removeItem('kisanmitra_crops');
    localStorage.removeItem('kisanmitra_notifs');
    localStorage.removeItem('kisanmitra_diagnoses');
    setCurrentTab('dashboard');
  };

  const setTab = (tab: NavigationTab) => {
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev =>
      prev.map(item => (item.id === id ? { ...item, read: true } : item))
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(item => ({ ...item, read: true })));
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  const updateFarmerSettings = (settings: Partial<UserProfile>) => {
    if (user) {
      setUser({ ...user, ...settings });
    }
  };

  const saveDiagnosis = (result: DiagnosisResult) => {
    setSavedDiagnoses(prev => [result, ...prev.filter(d => d.id !== result.id)]);

    // Update crop health score if crop exists
    setCrops(prev =>
      prev.map(c => {
        if (c.name.toLowerCase() === result.crop.toLowerCase()) {
          return {
            ...c,
            healthScore: result.healthScore,
            diseaseRisk: result.severity === 'High' ? 'high' : result.severity === 'Moderate' ? 'medium' : 'low',
            healthStatus: result.healthScore >= 85 ? 'Healthy' : result.healthScore >= 70 ? 'Needs Attention' : 'High Risk',
            lastCheckedDate: 'Just now',
            lastDiagnosis: `${result.disease} (${result.severity})`,
            lastDiagnosisHindi: `${result.diseaseHindi} (${result.severityHindi})`,
          };
        }
        return c;
      })
    );
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <AppContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        currentTab,
        crops,
        notifications,
        savedDiagnoses,
        unreadCount,
        loginAsDemo,
        loginCustom,
        logout,
        resetDemo,
        setTab,
        markNotificationRead,
        markAllNotificationsRead,
        clearNotifications,
        updateFarmerSettings,
        saveDiagnosis,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
