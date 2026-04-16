import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage: React.FC = () => {
  return (
    <div className="landing">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-badge">Der smarte Trainingsbegleiter</div>
          <h1 className="hero-title">
            Train. Eat. <span className="gradient-text">Learn.</span>
          </h1>
          <p className="hero-subtitle">
            Lifted begleitet dich live beim Training – und nutzt deine Pausen, um dich schlauer zu machen.
            Karteikarten, Videos und Rezepte genau dann, wenn du sie brauchst.
          </p>
          <div className="hero-buttons">
            <Link to="/register" className="btn-primary large">Kostenlos starten</Link>
            <Link to="/features" className="btn-outline large">Mehr erfahren</Link>
          </div>
          <p className="hero-note">Kein Abo nötig • Sofort loslegen • Für Studierende optimiert</p>
        </div>
        <div className="hero-visual">
          <div className="hero-card">
            <div className="workout-timer">
              <span className="timer-label">Pause</span>
              <span className="timer-value">02:30</span>
            </div>
            <div className="flashcard-preview">
              <p className="flashcard-subject">Mathematik</p>
              <p className="flashcard-question">Was ist die Ableitung von sin(x)?</p>
              <div className="flashcard-hint">Tippe zum Aufdecken</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="features-preview">
        <h2>Alles in einer App</h2>
        <p className="section-subtitle">Drei Bereiche, perfekt aufeinander abgestimmt</p>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon training-icon">⚡</div>
            <h3>Training</h3>
            <p>Personalisierte Trainingspläne, Live-Workout-Begleitung und Fortschrittstracking für alle Fitnesslevel.</p>
            <Link to="/training-info" className="feature-link">Mehr erfahren →</Link>
          </div>
          <div className="feature-card">
            <div className="feature-icon nutrition-icon">🥗</div>
            <h3>Ernährung</h3>
            <p>Gesunde Rezepte passend zu deinen Zielen. Eigene Rezepte hinzufügen und Mahlzeiten planen.</p>
            <Link to="/nutrition-info" className="feature-link">Mehr erfahren →</Link>
          </div>
          <div className="feature-card">
            <div className="feature-icon learning-icon">🧠</div>
            <h3>Lernen</h3>
                        <p>Karteikarten und Videos für dein Studium. Perfekt für die Trainingspause geeignet.</p>
            <Link to="/learning-info" className="feature-link">Mehr erfahren →</Link>
          </div>
        </div>
      </section>

      {/* Why Lifted */}
      <section className="why-lifted">
        <div className="why-content">
          <h2>Warum Lifted?</h2>
          <div className="why-list">
            <div className="why-item">
              <span className="why-icon">⏱️</span>
              <div>
                <h4>Zeit optimal nutzen</h4>
                <p>Lerne während deiner Trainingspausen statt am Handy zu scrollen.</p>
              </div>
            </div>
            <div className="why-item">
              <span className="why-icon">🎯</span>
              <div>
                <h4>Alles auf dich abgestimmt</h4>
                <p>Beim ersten Login werden deine Ziele, Fitness-Level und Lerninteressen erfasst.</p>
              </div>
            </div>
            <div className="why-item">
              <span className="why-icon">📱</span>
              <div>
                <h4>Live-Begleitung</h4>
                <p>Die App führt dich durch dein Workout – Übung für Übung, Satz für Satz.</p>
              </div>
            </div>
            <div className="why-item">
              <span className="why-icon">🎓</span>
              <div>
                <h4>Für Studierende gemacht</h4>
                <p>Integriert Lernkarten und Fachvideos – optimal für DHBW-Studenten.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <h2>Bereit loszulegen?</h2>
        <p>Starte kostenlos und entdecke, wie produktiv dein Training sein kann.</p>
        <Link to="/register" className="btn-primary large">Jetzt kostenlos registrieren</Link>
      </section>
    </div>
  );
};

export default LandingPage;
