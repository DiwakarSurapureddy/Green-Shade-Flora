import React from 'react';
import { PLANTS_DATA } from '../data/plantsData';
import { PlantCard } from '../components/PlantCard';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Wind,
  Smile,
  HeartPulse,
  Leaf,
  Droplets,
  Sun
} from 'lucide-react';

export const Home = ({ setActivePage, onAskAI }) => {
  const recommendedPlants = PLANTS_DATA.slice(0, 6);

  return (
    <div>
      {/* ================= HERO SECTION ================= */}
      <section className="hero-wrapper">
        <div className="container">
          <div className="hero-grid">
            <div>
              <div className="hero-tagline">
                <Sparkles size={16} />
                <span>Premier Botanical Education & AI Care</span>
              </div>

              <h1 className="hero-title">
                Reconnecting Life With <span className="gradient-text">Living Nature</span>
              </h1>

              <p className="hero-subtitle">
                Explore a rich curated universe of indoor air purifiers, sacred medicinal herbs, and vibrant flowering perennials — backed by intelligent, real-time plant care guidance.
              </p>

              <div className="hero-cta-group">
                <button
                  className="btn-primary"
                  onClick={() => {
                    setActivePage('search');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  <span>Explore Plant Catalog</span>
                  <ArrowRight size={18} />
                </button>

                <button
                  className="btn-secondary"
                  onClick={() => {
                    setActivePage('care');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  <Droplets size={18} color="var(--primary-green)" />
                  <span>Plant Care Manual</span>
                </button>
              </div>

              {/* Stats Row */}
              <div className="hero-stats-row">
                <div className="stat-item">
                  <h4>50+</h4>
                  <p>Plant Species</p>
                </div>
                <div className="stat-item">
                  <h4>100%</h4>
                  <p>Organic Care Tips</p>
                </div>
                <div className="stat-item">
                  <h4>24 / 7</h4>
                  <p>AI Plant Doctor</p>
                </div>
              </div>
            </div>

            {/* Hero Image / Visual Showcase */}
            <div className="hero-image-card">
              <img
                src="https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=1200&q=80"
                alt="Lush Botanical Interior"
              />
              <div className="hero-glass-pill">
                <div className="pill-icon-glow">
                  🌿
                </div>
                <div>
                  <h4 style={{ fontSize: '1.05rem', color: 'var(--primary-forest)' }}>
                    Healthy Botanical Living
                  </h4>
                  <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
                    Indoor plants reduce airborne dust & boost focus by 20%
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= RECOMMENDED PLANTS ================= */}
      <section className="section">
        <div className="container">
          <div className="section-header-center">
            <span className="section-badge">Handpicked Selections</span>
            <h2 className="section-title">Recommended Plants For You</h2>
            <p className="section-desc">
              Discover easy-care, high-impact houseplants and garden classics renowned for wellness and resilience.
            </p>
          </div>

          <div className="plant-grid">
            {recommendedPlants.map((plant) => (
              <PlantCard
                key={plant.id}
                plant={plant}
                onAskAI={onAskAI}
              />
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <button
              className="btn-secondary"
              onClick={() => {
                setActivePage('types');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <span>Browse All Botanical Categories</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* ================= VALUE PROPOSITION: BENEFITS ================= */}
      <section className="section section-soft">
        <div className="container">
          <div className="section-header-center">
            <span className="section-badge">Biophilic Wellness</span>
            <h2 className="section-title">Why Bring Plants Into Your Daily Life?</h2>
            <p className="section-desc">
              Surrounding yourself with living flora is proven by scientific studies to transform health, calm the nervous system, and revitalize spaces.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '28px' }}>
            <div style={{ background: 'white', padding: '32px 24px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#e7f5ff', color: '#1971c2', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                <Wind size={24} />
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '10px' }}>Purifies Indoor Air</h3>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)' }}>
                Plants filter airborne volatile organic compounds like formaldehyde and benzene, releasing pure crisp oxygen into your living room.
              </p>
            </div>

            <div style={{ background: 'white', padding: '32px 24px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#ebfbee', color: '#2b8a3e', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                <Smile size={24} />
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '10px' }}>Reduces Daily Stress</h3>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)' }}>
                Active interaction with indoor plants lowers cortisol and blood pressure, promoting emotional equilibrium and sustained focus.
              </p>
            </div>

            <div style={{ background: 'white', padding: '32px 24px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#fff9db', color: '#f59f00', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                <HeartPulse size={24} />
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '10px' }}>Medicinal Healing</h3>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)' }}>
                Botanicals like Tulsi and Aloe Vera provide immediate, natural at-home remedies for coughs, respiratory support, and skincare.
              </p>
            </div>

            <div style={{ background: 'white', padding: '32px 24px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#f3f0ff', color: '#7950f2', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                <Sparkles size={24} />
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '10px' }}>AI-Assisted Growing</h3>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)' }}>
                Never second guess your watering schedule or sunlight location with our built-in Groq-powered PlantMate AI assistant.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= INTERACTIVE CTA ================= */}
      <section className="section" style={{ padding: '80px 0' }}>
        <div className="container">
          <div
            style={{
              background: 'linear-gradient(135deg, var(--primary-forest) 0%, var(--primary-deep) 100%)',
              color: 'white',
              borderRadius: 'var(--radius-lg)',
              padding: '60px 48px',
              textAlign: 'center',
              boxShadow: 'var(--shadow-lg)',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <span
              style={{
                display: 'inline-block',
                background: 'rgba(255, 255, 255, 0.15)',
                color: 'var(--accent-glow)',
                padding: '6px 16px',
                borderRadius: '999px',
                fontSize: '0.85rem',
                fontWeight: 700,
                marginBottom: '16px'
              }}
            >
              🌿 Ready to start your green journey?
            </span>
            <h2 style={{ color: 'white', fontSize: '2.6rem', marginBottom: '16px' }}>
              Find The Perfect Plant For Your Room In Seconds
            </h2>
            <p style={{ color: 'rgba(255, 255, 255, 0.85)', maxWidth: '640px', margin: '0 auto 36px', fontSize: '1.1rem' }}>
              Use our intelligent filter tools or talk directly with PlantMate AI to match your sunlight, space, and lifestyle.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <button
                className="btn-primary"
                style={{ background: 'var(--accent-emerald)', color: 'var(--primary-forest)', fontWeight: 800 }}
                onClick={() => {
                  setActivePage('search');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                Search Plants by Room & Light
              </button>
              <button
                className="btn-secondary"
                style={{ background: 'transparent', color: 'white', borderColor: 'rgba(255,255,255,0.4)' }}
                onClick={() => onAskAI('What are the best beginner-friendly indoor plants for an apartment?')}
              >
                Ask PlantMate AI
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
