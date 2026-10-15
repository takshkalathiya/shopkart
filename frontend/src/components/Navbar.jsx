import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  User,
  LogOut,
  Search,
  ShoppingBag,
  Heart,
  Palette,
  Sun,
  Moon,
  Check,
  Menu,
  X,
  Sparkles,
} from 'lucide-react';
import api from '../services/api';
import logoImg from '../assets/logo.jpg';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { totalUnits, clearCart } = useCart();
  const { theme, setTheme, mode, toggleMode, themes } = useTheme();

  const [wishlistCount, setWishlistCount] = useState(0);
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    let ignore = false;
    api.get('/wishlist')
      .then((res) => {
        if (!ignore) {
          const items = res.data?.wishlist || [];
          setWishlistCount(items.length);
        }
      })
      .catch(() => {
        if (!ignore) setWishlistCount(0);
      });

    // Listen to custom event dispatched when wishlist items are modified
    const handleWishlistUpdated = (e) => {
      if (e?.detail && typeof e.detail.count === 'number') {
        setWishlistCount(e.detail.count);
      } else {
        api.get('/wishlist')
          .then((res) => {
            const items = res.data?.wishlist || [];
            setWishlistCount(items.length);
          })
          .catch(() => setWishlistCount(0));
      }
    };

    window.addEventListener('wishlist-updated', handleWishlistUpdated);
    return () => {
      ignore = true;
      window.removeEventListener('wishlist-updated', handleWishlistUpdated);
    };
  }, []);

  // Close theme dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setThemeDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      clearCart();
      await api.post('/customers/logout');
      navigate('/login');
    } catch {
      clearCart();
      navigate('/login');
    }
  };

  const isCurrent = (pathname) => location.pathname === pathname;

  return (
    <nav className="navbar" id="main-navigation">
      {/* Brand: Official Logo Emblem + Luxury LUNA Brand Title */}
      <Link to="/home" className="navbar-brand" id="navbar-brand-link">
        <div className="brand-badge">
          <img
            src={logoImg}
            alt="Luna Luxury Emblem"
            className="brand-badge-img"
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span className="brand-logo-text">LUNA</span>
          <span
            style={{
              fontSize: '0.62rem',
              letterSpacing: '0.2em',
              fontWeight: 700,
              color: 'var(--text-muted)',
              textTransform: 'uppercase',
              marginTop: '-4px',
            }}
          >
            HAUTE LUXE
          </span>
        </div>
      </Link>

      {/* Unified Primary Navigation: Home, Shop, Wishlist, Cart, Orders, Dashboard */}
      <div className={`navbar-nav ${mobileMenuOpen ? 'mobile-open' : ''}`}>
        <Link
          to="/home"
          className={isCurrent('/home') ? 'nav-active' : ''}
          onClick={() => setMobileMenuOpen(false)}
        >
          Home
        </Link>
        <Link
          to="/products"
          className={isCurrent('/products') ? 'nav-active' : ''}
          onClick={() => setMobileMenuOpen(false)}
        >
          Shop
        </Link>
        <Link
          to="/wishlist"
          className={isCurrent('/wishlist') ? 'nav-active' : ''}
          onClick={() => setMobileMenuOpen(false)}
        >
          Wishlist {wishlistCount > 0 ? `(${wishlistCount})` : ''}
        </Link>
        <Link
          to="/cart"
          className={isCurrent('/cart') ? 'nav-active' : ''}
          id="nav-cart-link"
          onClick={() => setMobileMenuOpen(false)}
        >
          Cart {totalUnits > 0 ? `(${totalUnits})` : ''}
        </Link>
        <Link
          to="/orders"
          className={isCurrent('/orders') ? 'nav-active' : ''}
          id="nav-orders-link"
          onClick={() => setMobileMenuOpen(false)}
        >
          Orders
        </Link>
        <Link
          to="/dashboard"
          className={isCurrent('/dashboard') ? 'nav-active' : ''}
          onClick={() => setMobileMenuOpen(false)}
        >
          Dashboard
        </Link>
      </div>

      {/* Action Buttons & Dynamic Theme Customizer */}
      <div className="navbar-actions">
        {/* Dynamic Palette Switcher */}
        <div className="theme-controls-wrapper" ref={dropdownRef}>
          <button
            type="button"
            className="navbar-icon-btn"
            title="Choose Color Theme"
            aria-label="Color Palette"
            id="theme-palette-btn"
            onClick={() => setThemeDropdownOpen((prev) => !prev)}
          >
            <Palette size={19} />
          </button>

          {themeDropdownOpen && (
            <div className="theme-dropdown-menu">
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

          {/* Dark / Light Mode Toggle */}
          <button
            type="button"
            className="navbar-icon-btn"
            title={mode === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle Dark/Light Mode"
            id="theme-mode-toggle-btn"
            onClick={toggleMode}
          >
            {mode === 'dark' ? (
              <Sun size={19} style={{ color: '#fbbf24' }} />
            ) : (
              <Moon size={19} style={{ color: 'var(--brand-primary)' }} />
            )}
          </button>
        </div>

        {/* Search Catalog Button */}
        <button
          type="button"
          onClick={() => navigate('/products')}
          className="navbar-icon-btn"
          title="Search Catalog"
          aria-label="Search"
          id="navbar-search-btn"
        >
          <Search size={19} />
        </button>

        {/* Wishlist Icon Button with Dynamic Counter Badge */}
        <button
          type="button"
          onClick={() => navigate('/wishlist')}
          className={`navbar-icon-btn ${isCurrent('/wishlist') ? 'active-icon' : ''}`}
          title={`Wishlist (${wishlistCount})`}
          aria-label="Wishlist"
          id="navbar-wishlist-btn"
          style={{ position: 'relative' }}
        >
          <Heart
            size={19}
            fill={wishlistCount > 0 ? 'var(--brand-accent)' : 'none'}
            color={wishlistCount > 0 ? 'var(--brand-accent)' : 'currentColor'}
          />
          {wishlistCount > 0 && (
            <span className="navbar-badge-counter">{wishlistCount}</span>
          )}
        </button>

        {/* Cart Icon Button with Dynamic Total Units Counter Badge */}
        <button
          type="button"
          onClick={() => navigate('/cart')}
          className={`navbar-icon-btn ${isCurrent('/cart') ? 'active-icon' : ''}`}
          title={`Shopping Cart (${totalUnits})`}
          aria-label="Shopping Cart"
          id="nav-cart-btn"
          style={{ position: 'relative' }}
        >
          <ShoppingBag size={19} />
          {totalUnits > 0 && (
            <span className="navbar-badge-counter cart-badge-counter" id="navbar-cart-count">
              {totalUnits}
            </span>
          )}
        </button>

        {/* Account Dashboard Button */}
        <button
          type="button"
          onClick={() => navigate('/dashboard')}
          className={`navbar-icon-btn ${isCurrent('/dashboard') ? 'active-icon' : ''}`}
          title="My Account Dashboard"
          aria-label="Account"
          id="navbar-account-btn"
        >
          <User size={19} />
        </button>

        {/* Logout Button */}
        <button
          type="button"
          onClick={handleLogout}
          className="navbar-icon-btn"
          title="Logout from Luna"
          aria-label="Logout"
          id="navbar-logout-btn"
        >
          <LogOut size={19} />
        </button>

        {/* Mobile Hamburger Menu Toggle */}
        <button
          type="button"
          className="navbar-icon-btn mobile-toggle-btn"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-label="Toggle Navigation Menu"
          style={{ display: 'none' }}
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
