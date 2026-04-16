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
      <div className="auth-card">
        <div className="auth-logo">
          <span className="logo-icon">L</span>
          <span className="logo-text">Lifted</span>
        </div>
        <h1>Account erstellen</h1>
        <p className="auth-subtitle">Starte kostenlos – kein Abo nötig</p>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input id="name" type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Dein Name" />
          </div>
          <div className="form-group">
            <label htmlFor="email">E-Mail</label>
            <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="deine@email.de" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Passwort</label>
            <input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Mindestens 6 Zeichen" />
          </div>
          <div className="form-group">
            <label htmlFor="confirm">Passwort bestätigen</label>
            <input id="confirm" type="password" value={confirm} onChange={e => setConfirm(e.target.value)} placeholder="Passwort wiederholen" />
          </div>
          <button type="submit" className="btn-primary full-width" disabled={loading}>
            {loading ? 'Wird registriert...' : 'Kostenlos registrieren'}
          </button>
        </form>

        <p className="auth-switch">
          Bereits ein Account? <Link to="/login">Einloggen</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
