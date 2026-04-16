import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <div className="footer-logo">
            <span className="logo-icon">L</span>
            <span className="logo-text">Lifted</span>
          </div>
          <p className="footer-tagline">Dein Begleiter für Training, Ernährung und Lernen.</p>
        </div>

        <div className="footer-links">
          <div className="footer-column">
            <h4>Produkt</h4>
            <Link to="/features">Features</Link>
            <Link to="/pricing">Preise</Link>
            <Link to="/faq">FAQ</Link>
          </div>
          <div className="footer-column">
            <h4>Bereiche</h4>
            <Link to="/training-info">Training</Link>
            <Link to="/nutrition-info">Ernährung</Link>
            <Link to="/learning-info">Lernen</Link>
          </div>
          <div className="footer-column">
            <h4>Rechtliches</h4>
            <Link to="/impressum">Impressum</Link>
            <Link to="/datenschutz">Datenschutz</Link>
            <Link to="/contact">Kontakt</Link>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Lifted. Alle Rechte vorbehalten.</p>
      </div>
    </footer>
  );
};

export default Footer;
