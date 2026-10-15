import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Mail,
  Lock,
  User,
  Phone,
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

const Register = () => {
  const navigate = useNavigate();
  const { theme, setTheme, mode, toggleMode, themes } = useTheme();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    phone: '',
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
    const randomSuffix = Math.floor(100 + Math.random() * 900);
    setFormData({
      fullName: 'Alex Smith',
      email: `alex.smith${randomSuffix}@example.com`,
      password: 'password123',
      phone: '9876543210',
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await api.post('/customers/register', formData);
      navigate('/login');
    } catch (err) {
      const code = err.statusCode || err.response?.status;
      const msg = err.response?.data?.message || err.message || 'Registration failed. Please try again.';
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
            <h1>Create Account</h1>
            <p>Join Luna to experience bespoke luxury retail</p>
          </div>

          {/* Quick Fill Button */}
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
              title="Auto-fill sample registration data"
            >
              <Sparkles size={14} /> Quick Auto-Fill Form
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
                <User size={18} className="input-icon" />
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  className="form-input"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <div className="input-container">
                <Mail size={18} className="input-icon" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-input"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <div className="input-container">
                <Phone size={18} className="input-icon" />
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="form-input"
                  placeholder="Phone Number"
                  value={formData.phone}
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
              <label className="checkbox-label" style={{ fontSize: '0.78rem' }}>
                <input type="checkbox" required /> I agree to Luna's{' '}
                <a href="#terms" style={{ color: 'var(--brand-accent)', textDecoration: 'underline' }}>
                  Terms of Service
                </a>
              </label>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
              id="register-submit-btn"
              style={{ width: '100%', height: '48px', marginTop: '0.5rem' }}
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
                'Create Luna Account'
              )}
            </button>
          </form>

          <div
            className="form-footer"
            style={{
              textAlign: 'center',
              marginTop: '1.75rem',
              color: 'var(--text-muted)',
              fontSize: '0.9rem',
            }}
          >
            Already have an account?{' '}
            <Link
              to="/login"
              className="link-text"
              style={{
                color: 'var(--brand-accent)',
                fontWeight: 600,
                textDecoration: 'underline',
              }}
            >
              Login here
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Register;
