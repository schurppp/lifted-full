import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FitnessGoal } from '../types';

const DashboardPage: React.FC = () => {
  const { user, profile } = useAuth();

  const goalLabel: Record<FitnessGoal, string> = {
    muscle: 'Muskelaufbau',
    fat_loss: 'Fettabbau',
    endurance: 'Ausdauer',
    health: 'Gesundheit',
  };

  const today = new Date().toLocaleDateString('de-DE', { weekday: 'long', day: 'numeric', month: 'long' });

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h1>Hey, {user?.name}! 👋</h1>
          <p className="dashboard-date">{today}</p>
        </div>
        {profile?.goal && (
          <div className="goal-badge">Ziel: {goalLabel[profile.goal] || profile.goal}</div>
        )}
      </div>

      {/* Quick Stats - TODO: Echte Daten aus Backend laden (Sprint 6+) */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">⚡</div>
          <div className="stat-info">
            <span className="stat-value">0</span>
            <span className="stat-label">Trainings diese Woche</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🔥</div>
          <div className="stat-info">
            <span className="stat-value">0</span>
            <span className="stat-label">Kalorien heute</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🧠</div>
          <div className="stat-info">
            <span className="stat-value">0</span>
            <span className="stat-label">Karten gelernt</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🎯</div>
          <div className="stat-info">
            <span className="stat-value">{profile?.daysPerWeek || '-'}</span>
            <span className="stat-label">Ziel-Trainingstage</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <h2>Schnellzugriff</h2>
        <div className="action-grid">
          <Link to="/training" className="action-card training">
            <div className="action-icon">⚡</div>
            <div className="action-info">
              <h3>Training starten</h3>
              <p>Workout beginnen oder Plan ansehen</p>
            </div>
            <span className="action-arrow">→</span>
          </Link>
          <Link to="/nutrition" className="action-card nutrition">
            <div className="action-icon">🥗</div>
            <div className="action-info">
              <h3>Ernährung</h3>
              <p>Rezepte entdecken und planen</p>
            </div>
            <span className="action-arrow">→</span>
          </Link>
          <Link to="/learning" className="action-card learning">
            <div className="action-icon">🧠</div>
            <div className="action-info">
              <h3>Lernen</h3>
              <p>Karteikarten und Lernvideos</p>
            </div>
            <span className="action-arrow">→</span>
          </Link>
        </div>
      </div>

      {/* Profile Summary */}
      {profile && (
        <div className="profile-summary">
          <h2>Dein Profil</h2>
          <div className="profile-grid">
            {profile.age && <div className="profile-item"><span className="p-label">Alter</span><span className="p-value">{profile.age} Jahre</span></div>}
            {profile.weight && <div className="profile-item"><span className="p-label">Gewicht</span><span className="p-value">{profile.weight} kg</span></div>}
            {profile.height && <div className="profile-item"><span className="p-label">Größe</span><span className="p-value">{profile.height} cm</span></div>}
            {profile.fitnessLevel && <div className="profile-item"><span className="p-label">Level</span><span className="p-value">{profile.fitnessLevel}</span></div>}
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
