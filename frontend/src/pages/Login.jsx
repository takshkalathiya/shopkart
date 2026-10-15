import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Mail,
  Lock,
  AlertCircle,
  Eye,
  EyeOff,
  Sparkles,
  Palette,
  Sun,
  Moon,
  Check,
} from 'lucide-react';
import api from '../services/api';
import logoImg from '../assets/logo.jpg';
import { useTheme } from '../context/ThemeContext';

const Login = () => {
  const navigate = useNavigate();
  const { theme, setTheme, mode, toggleMode, themes } = useTheme();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDemoFill = () => {
    setFormData({
      email: 'jane.doe@example.com',
      password: 'mySuperSecretPassword123',
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await api.post('/customers/login', formData);
      navigate('/home');
    } catch (err) {
      const code = err.statusCode || err.response?.status;
      const msg = err.response?.data?.message || err.message || 'Invalid Credentials';
      setError(code ? `[HTTP ${code}] ${msg}` : msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="app-container"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Top Bar with Brand & Theme Controls */}
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1.25rem 2.5rem',
          zIndex: 10,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div className="brand-badge" style={{ width: '36px', height: '36px' }}>
            <img src={logoImg} alt="Luna Emblem" className="brand-badge-img" />
          </div>
          <span className="brand-logo-text" style={{ fontSize: '1.25rem' }}>
            LUNA
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', position: 'relative' }}>
          <button
            type="button"
            className="navbar-icon-btn"
            title="Select Theme"
            onClick={() => setThemeDropdownOpen((prev) => !prev)}
            aria-label="Theme Palette"
          >
            <Palette size={18} />
          </button>

          {themeDropdownOpen && (
            <div className="theme-dropdown-menu" style={{ right: 0 }}>
              <div className="theme-dropdown-label">Theme Palette</div>
              {themes.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  className={`theme-dropdown-item ${theme === t.id ? 'active' : ''}`}
                  onClick={() => {
                    setTheme(t.id);
                    setThemeDropdownOpen(false);
                  }}
                >
                  <span
                    className="theme-color-disc"
                    style={{ background: t.gradient || t.color }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>{t.name}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{t.sub}</div>
                  </div>
                  {theme === t.id && <Check size={16} color="var(--brand-accent)" />}
                </button>
              ))}
            </div>
          )}

          <button
            type="button"
            className="navbar-icon-btn"
            title={mode === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            onClick={toggleMode}
            aria-label="Toggle Mode"
          >
            {mode === 'dark' ? (
              <Sun size={18} style={{ color: '#fbbf24' }} />
            ) : (
              <Moon size={18} style={{ color: 'var(--brand-primary)' }} />
            )}
          </button>
        </div>
      </header>

      {/* Main Content Card */}
      <main className="main-content" style={{ zIndex: 2 }}>
        <div className="glass-card animate-fade-in-up">
          <div className="form-header">
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.85rem',
                marginBottom: '1.25rem',
              }}
            >
              <div className="brand-badge" style={{ width: '48px', height: '48px' }}>
                <img src={logoImg} alt="Luna Logo" className="brand-badge-img" />
              </div>
              <span className="brand-logo-text" style={{ fontSize: '2rem' }}>
                LUNA
              </span>
            </div>
            <h1>Welcome Back</h1>
            <p>Sign in to access your curated luxury boutique</p>
          </div>

          {/* 1-Click Demo Fill Pill */}
          <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
            <button
              type="button"
              onClick={handleDemoFill}
              style={{
                background: 'var(--brand-accent-subtle)',
                color: 'var(--brand-accent)',
                border: '1px solid var(--brand-accent-border)',
                borderRadius: '9999px',
                padding: '0.4rem 1rem',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                transition: 'all 0.2s ease',
              }}
              title="Auto-fill Jane Doe testing account credentials"
            >
              <Sparkles size={14} /> Quick Demo Account Fill
            </button>
          </div>

          {error && (
            <div className="alert alert-error">
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <div className="input-container">
                <Mail size={18} className="input-icon" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-input"
                  placeholder="me@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <div className="input-container">
                <Lock size={18} className="input-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  className="form-input"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  style={{
                    position: 'absolute',
                    right: '1rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-muted)',
                    cursor: 'pointer',
                    padding: '4px',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="form-options">
              <label className="checkbox-label">
                <input type="checkbox" /> Remember me
              </label>
              <a
                href="#forgot"
                className="link-text"
                style={{ color: 'var(--brand-accent)', fontWeight: '500' }}
                onClick={(e) => {
                  e.preventDefault();
                  alert('Demo reset instructions sent to registered address.');
                }}
              >
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
              id="login-submit-btn"
              style={{ width: '100%', height: '48px' }}
            >
              {loading ? (
                <div
                  className="spinner"
                  style={{
                    width: '20px',
                    height: '20px',
                    borderWidth: '2px',
                    borderTopColor: '#ffffff',
                  }}
                />
              ) : (
                'Sign In to Luna'
              )}
            </button>
          </form>

          <div className="divider">Or continue with</div>

          <div style={{ display: 'flex', gap: '0.65rem' }}>
            <button
              type="button"
              className="btn btn-social"
              onClick={() => handleDemoFill()}
            >
              Apple ID
            </button>
            <button
              type="button"
              className="btn btn-social"
              onClick={() => handleDemoFill()}
            >
              Google
            </button>
            <button
              type="button"
              className="btn btn-social"
              onClick={() => handleDemoFill()}
            >
              Passkey
            </button>
          </div>

          <div className="form-footer" style={{ textAlign: 'center', marginTop: '1.75rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Don't have an account?{' '}
            <Link
              to="/register"
              className="link-text"
              style={{
                color: 'var(--brand-accent)',
                fontWeight: 600,
                textDecoration: 'underline',
              }}
            >
              Create an account
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
