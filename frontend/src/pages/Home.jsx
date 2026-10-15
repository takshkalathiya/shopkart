import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Truck,
  ShieldCheck,
  Clock,
  Sparkles,
  ArrowRight,
  RotateCcw,
  Shirt,
  Laptop,
  Home as HomeIcon,
  BookOpen,
  Star,
  Zap,
  ShoppingBag,
} from 'lucide-react';
import api from '../services/api';

import heroImg from '../assets/hero.jpg';
import springImg from '../assets/spring.jpg';
import watchesImg from '../assets/watches.jpg';
import homeImg from '../assets/home.jpg';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Home = () => {
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const response = await api.get('/customers/me');
        setCustomer(response.data);
      } catch {
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchCustomer();
  }, [navigate]);

  if (loading) {
    return (
      <div className="app-container" style={{ justifyContent: 'center', alignItems: 'center' }}>
        <div
          className="spinner"
          style={{
            width: '44px',
            height: '44px',
            borderWidth: '4px',
            borderColor: 'var(--border-subtle)',
            borderTopColor: 'var(--brand-accent)',
          }}
        />
      </div>
    );
  }

  if (!customer) return null;

  return (
    <div className="app-container">
      {/* Single Unified Navbar with Interactive Theme & Mode Switcher */}
      <Navbar />

      <main className="catalog-container">
        {/* Hero Section */}
        <section className="hero-section animate-fade-in-up">
          <div className="hero-content">
            <div className="hero-welcome-badge">
              <Sparkles size={15} /> Welcome back to Luna, {customer.fullName?.split(' ')[0]}
            </div>
            <h1 className="hero-title">Discover Your Signature Style</h1>
            <p className="hero-subtitle">
              Explore Luna's prestigious curation of haute couture apparel, high-performance electronics, and modern living essentials tailored for 2026.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <button
                className="btn btn-primary"
                onClick={() => navigate('/products')}
                id="hero-explore-catalog-btn"
              >
                Explore Catalog <ArrowRight size={17} />
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => navigate('/dashboard')}
                id="hero-my-account-btn"
              >
                VIP Dashboard
              </button>
            </div>
          </div>

          <div
            className="hero-image-wrapper"
            onClick={() => navigate('/products')}
            style={{ position: 'relative' }}
          >
            <img
              src={heroImg}
              alt="Luna Luxury Fashion"
              className="hero-img"
            />
            {/* Floating Luxury Badges */}
            <div
              style={{
                position: 'absolute',
                bottom: '24px',
                left: '24px',
                background: 'var(--bg-glass)',
                backdropFilter: 'blur(16px)',
                border: '1px solid var(--border-medium)',
                borderRadius: '16px',
                padding: '0.65rem 1.15rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                boxShadow: 'var(--shadow-lg), 0 0 20px rgba(0,0,0,0.4)',
                zIndex: 3,
              }}
            >
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'var(--brand-accent-subtle)',
                  color: 'var(--brand-accent)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Star size={16} fill="var(--brand-accent)" />
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: '0.86rem', color: 'var(--text-primary)' }}>
                  4.95 / 5.0 Rating
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                  Over 12,500+ Verified Reviews
                </div>
              </div>
            </div>

            <div
              style={{
                position: 'absolute',
                top: '24px',
                right: '24px',
                background: 'var(--brand-gradient)',
                color: '#ffffff',
                borderRadius: '9999px',
                padding: '0.35rem 0.95rem',
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.05em',
                boxShadow: 'var(--glow-button)',
                zIndex: 3,
              }}
            >
              NEW SEASON 2026
            </div>
          </div>
        </section>

        {/* Features Bar */}
        <section className="features-bar animate-fade-in-up animate-delay-1">
          <div
            className="feature-item"
            style={{ cursor: 'pointer' }}
            onClick={() => navigate('/products')}
          >
            <Truck size={24} />
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.94rem' }}>Express Shipping</div>
              <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>Complimentary over ₹1,999</div>
            </div>
          </div>
          <div
            className="feature-item"
            style={{ cursor: 'pointer' }}
            onClick={() => navigate('/dashboard')}
          >
            <ShieldCheck size={24} />
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.94rem' }}>100% Authentic</div>
              <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>Verified boutique provenance</div>
            </div>
          </div>
          <div
            className="feature-item"
            style={{ cursor: 'pointer' }}
            onClick={() => navigate('/dashboard')}
          >
            <Clock size={24} />
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.94rem' }}>24/7 Concierge</div>
              <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>Dedicated personal support</div>
            </div>
          </div>
        </section>

        {/* Category Quick Navigator Grid */}
        <section style={{ marginBottom: '3.5rem' }} className="animate-fade-in-up animate-delay-1">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1.5rem',
            }}
          >
            <div>
              <h2 className="section-title" style={{ marginBottom: '0.2rem' }}>Browse by Department</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
                Handpicked collections designed for discerning tastes
              </p>
            </div>
            <button
              type="button"
              className="btn-link-reset"
              onClick={() => navigate('/products')}
              id="view-all-products-link"
            >
              View All Products →
            </button>
          </div>

          <div className="department-grid">
            <div
              className="department-card"
              onClick={() => navigate('/products?category=Fashion')}
            >
              <div
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '14px',
                  background: 'var(--brand-accent-subtle)',
                  color: 'var(--brand-accent)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1rem',
                }}
              >
                <Shirt size={22} />
              </div>
              <h3 className="department-title">Fashion & Apparel</h3>
              <p className="department-desc">Designer denim, jackets, and streetwear</p>
            </div>

            <div
              className="department-card"
              onClick={() => navigate('/products?category=Electronics')}
            >
              <div
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '14px',
                  background: 'var(--brand-accent-subtle)',
                  color: 'var(--brand-accent)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1rem',
                }}
              >
                <Laptop size={22} />
              </div>
              <h3 className="department-title">Electronics & Tech</h3>
              <p className="department-desc">Hi-Fi audio, mechanical boards, OLED displays</p>
            </div>

            <div
              className="department-card"
              onClick={() => navigate('/products?category=Home')}
            >
              <div
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '14px',
                  background: 'var(--brand-accent-subtle)',
                  color: 'var(--brand-accent)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1rem',
                }}
              >
                <HomeIcon size={22} />
              </div>
              <h3 className="department-title">Home & Living</h3>
              <p className="department-desc">Artisan coffee machines, nordic lamps & ceramics</p>
            </div>

            <div
              className="department-card"
              onClick={() => navigate('/products?category=Books')}
            >
              <div
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '14px',
                  background: 'var(--brand-accent-subtle)',
                  color: 'var(--brand-accent)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1rem',
                }}
              >
                <BookOpen size={22} />
              </div>
              <h3 className="department-title">Bestselling Books</h3>
              <p className="department-desc">Clean Code, Architecture, and Design monographs</p>
            </div>
          </div>
        </section>

        {/* Featured Curations */}
        <section style={{ marginBottom: '4rem' }} className="animate-fade-in-up animate-delay-2">
          <h2 className="section-title">Luna Featured Curations</h2>
          <div className="collections-grid">
            <div
              className="collection-card"
              onClick={() => navigate('/products?category=Fashion')}
            >
              <div className="collection-image-wrapper">
                <img src={springImg} alt="Spring Fashion" className="collection-img" />
                <div className="collection-overlay">
                  <span className="collection-overlay-text">Explore Spring Lookbook →</span>
                </div>
              </div>
              <div className="collection-title">Spring Haute Couture</div>
            </div>

            <div
              className="collection-card"
              onClick={() => navigate('/products?category=Fashion')}
            >
              <div className="collection-image-wrapper">
                <img src={watchesImg} alt="Luxury Watches" className="collection-img" />
                <div className="collection-overlay">
                  <span className="collection-overlay-text">Explore Chronographs →</span>
                </div>
              </div>
              <div className="collection-title">Precision Timepieces</div>
            </div>

            <div
              className="collection-card"
              onClick={() => navigate('/products?category=Home')}
            >
              <div className="collection-image-wrapper">
                <img src={homeImg} alt="Home Essentials" className="collection-img" />
                <div className="collection-overlay">
                  <span className="collection-overlay-text">Explore Living Spaces →</span>
                </div>
              </div>
              <div className="collection-title">Modern Minimalist Home</div>
            </div>
          </div>
        </section>

        {/* Exclusive VIP Banner */}
        <section
          style={{
            background: 'var(--card-gradient)',
            border: '1px solid var(--border-medium)',
            borderRadius: '24px',
            padding: '3rem 3.5rem',
            marginBottom: '4rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '2rem',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-lg), var(--glow-accent)',
          }}
        >
          <div style={{ position: 'relative', zIndex: 2, maxWidth: '650px' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                color: 'var(--brand-accent)',
                fontWeight: 700,
                fontSize: '0.82rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginBottom: '0.75rem',
              }}
            >
              <Zap size={16} /> Exclusive Privileges
            </div>
            <h3
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '2rem',
                fontWeight: 800,
                color: 'var(--text-primary)',
                marginBottom: '0.75rem',
              }}
            >
              Luna Black Tier Membership
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.98rem', lineHeight: 1.6 }}>
              Enjoy early access to limited edition drops, complimentary priority shipping, and bespoke concierge assistance on all orders.
            </p>
          </div>
          <button
            className="btn btn-primary"
            style={{ whiteSpace: 'nowrap', zIndex: 2 }}
            onClick={() => navigate('/products')}
          >
            <ShoppingBag size={18} /> Shop the Collection
          </button>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
