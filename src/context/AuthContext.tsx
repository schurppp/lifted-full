import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UserProfile } from '../types';

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  updateProfile: (profile: Partial<UserProfile>) => void;
  hasCompletedOnboarding: boolean;
  setHasCompletedOnboarding: (val: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

const STORAGE_KEY = 'lifted_user';
const PROFILE_KEY = 'lifted_profile';
const ONBOARDING_KEY = 'lifted_onboarding';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasCompletedOnboarding, setHasCompletedOnboardingState] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem(STORAGE_KEY);
    const storedProfile = localStorage.getItem(PROFILE_KEY);
    const onboarding = localStorage.getItem(ONBOARDING_KEY);
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    if (storedProfile) {
      setProfile(JSON.parse(storedProfile));
    }
    if (onboarding === 'true') {
      setHasCompletedOnboardingState(true);
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    const mockUser: User = {
      id: 'user-' + Date.now(),
      email,
      name: email.split('@')[0],
      createdAt: new Date().toISOString(),
      subscription: 'free',
    };
    setUser(mockUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mockUser));
    setIsLoading(false);
  };

  const register = async (email: string, password: string, name: string) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    const mockUser: User = {
      id: 'user-' + Date.now(),
      email,
      name,
      createdAt: new Date().toISOString(),
      subscription: 'free',
    };
    setUser(mockUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mockUser));
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    setProfile(null);
    setHasCompletedOnboardingState(false);
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(PROFILE_KEY);
    localStorage.removeItem(ONBOARDING_KEY);
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    const newProfile = { ...(profile || {}), ...updates } as UserProfile;
    setProfile(newProfile);
    localStorage.setItem(PROFILE_KEY, JSON.stringify(newProfile));
  };

  const setHasCompletedOnboarding = (val: boolean) => {
    setHasCompletedOnboardingState(val);
    localStorage.setItem(ONBOARDING_KEY, String(val));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        updateProfile,
        hasCompletedOnboarding,
        setHasCompletedOnboarding,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
