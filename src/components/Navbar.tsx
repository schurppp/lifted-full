import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">L</span>
          <span className="logo-text">Lifted</span>
        </Link>

        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <span></span><span></span><span></span>
        </button>

        <div className={`navbar-links ${menuOpen ? 'open' : ''}`}>
          {!isAuthenticated ? (
            <>
              <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`} onClick={() => setMenuOpen(false)}>Home</Link>
              <Link to="/features" className={`nav-link ${isActive('/features') ? 'active' : ''}`} onClick={() => setMenuOpen(false)}>Features</Link>
              <Link to="/nutrition-info" className={`nav-link ${isActive('/nutrition-info') ? 'active' : ''}`} onClick={() => setMenuOpen(false)}>Ernährung</Link>
              <Link to="/training-info" className={`nav-link ${isActive('/training-info') ? 'active' : ''}`} onClick={() => setMenuOpen(false)}>Training</Link>
              <Link to="/learning-info" className={`nav-link ${isActive('/learning-info') ? 'active' : ''}`} onClick={() => setMenuOpen(false)}>Lernen</Link>
              <Link to="/pricing" className={`nav-link ${isActive('/pricing') ? 'active' : ''}`} onClick={() => setMenuOpen(false)}>Preise</Link>
              <div className="nav-auth-buttons">
                <Link to="/login" className="btn-outline" onClick={() => setMenuOpen(false)}>Login</Link>
                <Link to="/register" className="btn-primary" onClick={() => setMenuOpen(false)}>Kostenlos starten</Link>
              </div>
            </>
          ) : (
            <>
              <Link to="/dashboard" className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`} onClick={() => setMenuOpen(false)}>Dashboard</Link>
              <Link to="/training" className={`nav-link ${isActive('/training') ? 'active' : ''}`} onClick={() => setMenuOpen(false)}>Training</Link>
              <Link to="/nutrition" className={`nav-link ${isActive('/nutrition') ? 'active' : ''}`} onClick={() => setMenuOpen(false)}>Ernährung</Link>
              <Link to="/learning" className={`nav-link ${isActive('/learning') ? 'active' : ''}`} onClick={() => setMenuOpen(false)}>Lernen</Link>
              <div className="nav-user">
                <span className="user-avatar">{user?.name?.[0]?.toUpperCase()}</span>
                <span className="user-name">{user?.name}</span>
                <button className="btn-outline small" onClick={handleLogout}>Logout</button>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
