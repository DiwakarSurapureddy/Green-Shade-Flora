import React from 'react';
import { Leaf, Heart, Sparkles, Send } from 'lucide-react';

export const Footer = ({ setActivePage }) => {
  const handleNav = (page) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer-main">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Info */}
          <div className="footer-brand">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  background: 'var(--accent-emerald)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white'
                }}
              >
                <Leaf size={18} />
              </div>
              <h3 style={{ margin: 0 }}>Green Shade Flora</h3>
            </div>
            <p>
              Reconnecting modern life with the healing serenity, beauty, and wisdom of nature through intelligent plant care education and botanical discovery.
            </p>
          </div>

          {/* Quick Navigation */}
          <div className="footer-col">
            <h4>Explore Catalog</h4>
            <ul>
              <li>
                <a href="#home" onClick={(e) => { e.preventDefault(); handleNav('home'); }}>
                  Home Showcase
                </a>
              </li>
              <li>
                <a href="#types" onClick={(e) => { e.preventDefault(); handleNav('types'); }}>
                  Plant Categories
                </a>
              </li>
              <li>
                <a href="#search" onClick={(e) => { e.preventDefault(); handleNav('search'); }}>
                  Smart Search & AI
                </a>
              </li>
              <li>
                <a href="#care" onClick={(e) => { e.preventDefault(); handleNav('care'); }}>
                  Plant Care Manual
                </a>
              </li>
              <li>
                <a href="#compare" onClick={(e) => { e.preventDefault(); handleNav('compare'); }}>
                  Indoor vs Outdoor
                </a>
              </li>
            </ul>
          </div>

          {/* Botanical Guides */}
          <div className="footer-col">
            <h4>Plant Care Hub</h4>
            <ul>
              <li>
                <a href="#care" onClick={(e) => { e.preventDefault(); handleNav('care'); }}>
                  Tulsi Balcony Guide
                </a>
              </li>
              <li>
                <a href="#care" onClick={(e) => { e.preventDefault(); handleNav('care'); }}>
                  Snake Plant Air Filter
                </a>
              </li>
              <li>
                <a href="#care" onClick={(e) => { e.preventDefault(); handleNav('care'); }}>
                  Watering Frequency
                </a>
              </li>
              <li>
                <a href="#care" onClick={(e) => { e.preventDefault(); handleNav('care'); }}>
                  Troubleshoot Yellow Leaves
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Box */}
          <div className="footer-col">
            <h4>Plant Care Updates</h4>
            <p style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.75)', marginBottom: '14px' }}>
              Receive seasonal gardening advice and eco-friendly tips directly in your inbox.
            </p>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                type="email"
                placeholder="Enter your email..."
                style={{
                  flex: 1,
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-sm)',
                  border: 'none',
                  fontSize: '0.85rem'
                }}
              />
              <button
                style={{
                  background: 'var(--accent-emerald)',
                  color: 'white',
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-sm)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                onClick={() => alert('Thank you for subscribing to Green Shade Flora newsletter!')}
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Green Shade Flora. "Nature does not hurry, yet everything is accomplished."</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span>Built with botanical passion</span>
            <Heart size={14} color="#52b788" fill="#52b788" />
            <span>& AI Intelligence</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
