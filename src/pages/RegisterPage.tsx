import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RegisterPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!name || !email || !password || !confirm) {
      setError('Bitte alle Felder ausfüllen.');
      return;
    }
    if (password !== confirm) {
      setError('Passwörter stimmen nicht überein.');
      return;
    }
    if (password.length < 6) {
      setError('Passwort muss mindestens 6 Zeichen haben.');
      return;
    }
    try {
      setLoading(true);
      await register(email, password, name);
      navigate('/onboarding');
    } catch (err) {
      setError('Registrierung fehlgeschlagen.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-brand">
          <Link to="/" className="auth-logo-link">
            <span className="logo-icon">L</span>
            <span className="logo-text">Lifted</span>
          </Link>
          <div className="auth-brand-tagline">
            <h2>Starte deine Reise</h2>
            <p>Kostenlos registrieren und sofort loslegen. Kein Abo nötig.</p>
          </div>
          <ul className="auth-brand-benefits">
            <li><span className="benefit-icon">✅</span> Personalisierte Trainingspläne</li>
            <li><span className="benefit-icon">✅</span> Karteikarten für dein Studium</li>
            <li><span className="benefit-icon">✅</span> Ernährungsplanung & Rezepte</li>
            <li><span className="benefit-icon">✅</span> Live-Workout-Begleitung</li>
          </ul>
        </div>
        <div className="auth-card">
          <div className="auth-card-header">
            <h1>Account erstellen</h1>
            <p className="auth-subtitle">Starte kostenlos – kein Abo nötig</p>
          </div>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Dein Name"
                autoComplete="name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">E-Mail</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="deine@email.de"
                autoComplete="email"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Passwort</label>
              <div className="input-with-toggle">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mindestens 6 Zeichen"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Passwort anzeigen"
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="confirm">Passwort bestätigen</label>
              <input
                id="confirm"
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="Passwort wiederholen"
                autoComplete="new-password"
              />
            </div>
            <button type="submit" className="btn-primary btn-full" disabled={loading}>
              {loading ? 'Registrieren...' : 'Kostenlos registrieren'}
            </button>
          </form>

          <div className="auth-footer">
            <p>Bereits ein Account? <Link to="/login" className="auth-link">Anmelden</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
