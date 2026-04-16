import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Bitte alle Felder ausfüllen.');
      return;
    }
    try {
      setLoading(true);
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Login fehlgeschlagen. Bitte versuche es erneut.');
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
          <div className="auth-brand-visual">
            <div className="brand-card">
              <div className="brand-card-icon">⚡</div>
              <p className="brand-card-text">Trainiere smarter</p>
            </div>
            <div className="brand-card">
              <div className="brand-card-icon">🧠</div>
              <p className="brand-card-text">Lerne effizienter</p>
            </div>
            <div className="brand-card">
              <div className="brand-card-icon">🥗</div>
              <p className="brand-card-text">Ernähre dich besser</p>
            </div>
          </div>
        </div>
        <div className="auth-card">
          <div className="auth-card-header">
            <h1>Willkommen zurück</h1>
            <p className="auth-subtitle">Melde dich an, um fortzufahren</p>
          </div>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
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
                  placeholder="Dein Passwort"
                  autoComplete="current-password"
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
            <button type="submit" className="btn-primary btn-full" disabled={loading}>
              {loading ? 'Anmelden...' : 'Anmelden'}
            </button>
          </form>

          <div className="auth-footer">
            <p>Noch kein Account? <Link to="/register" className="auth-link">Kostenlos registrieren</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
