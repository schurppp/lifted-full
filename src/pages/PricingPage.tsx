import React from 'react';
import { Link } from 'react-router-dom';

const PricingPage: React.FC = () => (
  <div className="pricing-page">
    <div className="page-hero">
      <h1>Einfache, transparente Preise</h1>
      <p>Starte kostenlos – ohne Kreditkarte</p>
    </div>
    <div className="pricing-grid">
      <div className="pricing-card">
        <div className="plan-name">Freemium</div>
        <div className="plan-price"><span className="price-amount">0€</span><span className="price-period">/Monat</span></div>
        <ul className="plan-features">
          <li>✅ 3 Trainingspläne</li>
          <li>✅ 10 Rezepte</li>
          <li>✅ 2 Lernkartenstapel</li>
          <li>✅ Live-Workout-Begleitung</li>
          <li>❌ Unbegrenzte eigene Inhalte</li>
          <li>❌ Premium-Trainingspläne</li>
          <li>❌ Detaillierte Statistiken</li>
        </ul>
        <Link to="/register" className="btn-outline full-width">Kostenlos starten</Link>
      </div>
      <div className="pricing-card featured">
        <div className="plan-badge">Beliebt</div>
        <div className="plan-name">Premium</div>
        <div className="plan-price"><span className="price-amount">4,99€</span><span className="price-period">/Monat</span></div>
        <ul className="plan-features">
          <li>✅ Alle Trainingspläne</li>
          <li>✅ Alle Rezepte</li>
          <li>✅ Unbegrenzte Lernkarten</li>
          <li>✅ Live-Workout-Begleitung</li>
          <li>✅ Unbegrenzte eigene Inhalte</li>
          <li>✅ Premium-Trainingspläne</li>
          <li>✅ Detaillierte Statistiken</li>
        </ul>
        <Link to="/register" className="btn-primary full-width">Premium starten</Link>
      </div>
    </div>
    <div className="pricing-faq">
      <h2>Häufige Fragen zu Preisen</h2>
      <div className="faq-item"><h4>Kann ich jederzeit kündigen?</h4><p>Ja, du kannst dein Abo jederzeit ohne Angabe von Gründen kündigen.</p></div>
      <div className="faq-item"><h4>Gibt es Studentenrabatt?</h4><p>Ja! Mit gültigem Studentenausweis erhältst du 50% Rabatt auf Premium.</p></div>
    </div>
  </div>
);
export default PricingPage;
