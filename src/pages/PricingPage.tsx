import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const PricingPage: React.FC = () => {
  const [billingYearly, setBillingYearly] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const premiumMonthly = 4.99;
  const premiumYearly = 2.99;
  const currentPrice = billingYearly ? premiumYearly : premiumMonthly;

  const faqs = [
    {
      q: 'Kann ich jederzeit kündigen?',
      a: 'Ja, du kannst dein Abo jederzeit ohne Angabe von Gründen kündigen. Es entstehen keine zusätzlichen Kosten.',
    },
    {
      q: 'Gibt es einen Studentenrabatt?',
      a: 'Ja! Mit gültigem Studentenausweis erhältst du 50% Rabatt auf Premium. Schreib uns einfach eine Mail.',
    },
    {
      q: 'Was passiert nach dem kostenlosen Test?',
      a: 'Nach 7 Tagen wird dein Account automatisch auf Freemium zurückgestuft – kein Abo, keine versteckten Kosten.',
    },
    {
      q: 'Welche Zahlungsmethoden werden akzeptiert?',
      a: 'Wir akzeptieren alle gängigen Kredit- und Debitkarten sowie PayPal.',
    },
  ];

  return (
    <div className="pricing-page">
      <div className="page-hero">
        <h1>Einfache, transparente Preise</h1>
        <p>Starte kostenlos – ohne Kreditkarte. Upgrade jederzeit möglich.</p>
        <div className="billing-toggle">
          <span className={!billingYearly ? 'active' : ''}>Monatlich</span>
          <button
            className={`toggle-switch ${billingYearly ? 'on' : ''}`}
            onClick={() => setBillingYearly(!billingYearly)}
            aria-label="Jährliche Abrechnung"
          >
            <span className="toggle-knob" />
          </button>
          <span className={billingYearly ? 'active' : ''}>
            Jährlich <span className="savings-badge">Spare 40%</span>
          </span>
        </div>
      </div>

      <div className="pricing-grid">
        <div className="pricing-card">
          <div className="plan-name">Freemium</div>
          <div className="plan-price">
            <span className="price-amount">0€</span>
            <span className="price-period">/Monat</span>
          </div>
          <p className="plan-description">Perfekt zum Kennenlernen</p>
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
          <div className="plan-price">
            <span className="price-amount">{currentPrice.toFixed(2).replace('.', ',')} €</span>
            <span className="price-period">/Monat</span>
          </div>
          <p className="plan-description">
            {billingYearly ? 'Jährlich abgerechnet – spare 40%' : '7 Tage kostenlos testen'}
          </p>
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
        <div className="faq-list">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`faq-item ${openFaq === i ? 'open' : ''}`}
              onClick={() => setOpenFaq(openFaq === i ? null : i)}
            >
              <div className="faq-question">
                <h4>{faq.q}</h4>
                <span className="faq-icon">{openFaq === i ? '−' : '+'}</span>
              </div>
              {openFaq === i && <p className="faq-answer">{faq.a}</p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
