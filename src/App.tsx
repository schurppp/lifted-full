import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import OnboardingPage from './pages/OnboardingPage';
import DashboardPage from './pages/DashboardPage';
import TrainingPage from './pages/TrainingPage';
import NutritionPage from './pages/NutritionPage';
import LearningPage from './pages/LearningPage';
import PricingPage from './pages/PricingPage';
import './index.css';

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) return <div className="loading-screen"><div className="loader"></div></div>;
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

const OnboardingRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, hasCompletedOnboarding, isLoading } = useAuth();
  if (isLoading) return <div className="loading-screen"><div className="loader"></div></div>;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!hasCompletedOnboarding) return <Navigate to="/onboarding" replace />;
  return <>{children}</>;
};

const AppRoutes: React.FC = () => {
  const { isAuthenticated } = useAuth();
  return (
    <div className="app">
      <Navbar />
      <main className="main-content">
        <Routes>
          {/* Pre-login pages */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <LoginPage />} />
          <Route path="/register" element={isAuthenticated ? <Navigate to="/dashboard" /> : <RegisterPage />} />

          {/* Onboarding (authenticated but not onboarded) */}
          <Route path="/onboarding" element={
            <PrivateRoute><OnboardingPage /></PrivateRoute>
          } />

          {/* Post-login pages */}
          <Route path="/dashboard" element={
            <OnboardingRoute><DashboardPage /></OnboardingRoute>
          } />
          <Route path="/training" element={
            <OnboardingRoute><TrainingPage /></OnboardingRoute>
          } />
          <Route path="/nutrition" element={
            <OnboardingRoute><NutritionPage /></OnboardingRoute>
          } />
          <Route path="/learning" element={
            <OnboardingRoute><LearningPage /></OnboardingRoute>
          } />

          {/* Catch all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

const App: React.FC = () => (
  <AuthProvider>
    <Router>
      <AppRoutes />
    </Router>
  </AuthProvider>
);

export default App;
