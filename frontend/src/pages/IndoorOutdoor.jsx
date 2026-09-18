import React, { useState } from 'react';
import { COMPARISON_DATA } from '../data/plantsData';
import {
  ArrowLeftRight,
  Sun,
  Home,
  Check,
  Sparkles,
  HelpCircle,
  ShieldCheck
} from 'lucide-react';

export const IndoorOutdoor = ({ onAskAI }) => {
  const [selectedEnv, setSelectedEnv] = useState('both');

  return (
    <div style={{ paddingBottom: '90px' }}>
      {/* Header */}
      <section className="section section-soft" style={{ padding: '60px 0 40px' }}>
        <div className="container">
          <div className="section-header-center">
            <span className="section-badge">Environment & Lighting Matrix</span>
            <h1 className="section-title">Indoor vs Outdoor Plants</h1>
            <p className="section-desc">
              Understand the environmental differences between sheltered room living and open-sky garden cultivation to give your greenery the ideal home.
            </p>
          </div>
        </div>
      </section>

      {/* Comparison Showcase Cards */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px', marginBottom: '60px' }}>
            {/* Indoor Card */}
            <div
              style={{
                background: 'white',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-md)',
                border: '1px solid var(--border-subtle)'
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=80"
                alt="Indoor Plants Environment"
                style={{ width: '100%', height: '240px', objectFit: 'cover' }}
              />
              <div style={{ padding: '28px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary-green)', marginBottom: '8px' }}>
                  <Home size={20} />
                  <span style={{ fontSize: '0.82rem', fontWeight: 800, textTransform: 'uppercase' }}>Sheltered Interiors</span>
                </div>
                <h3 style={{ fontSize: '1.6rem', color: 'var(--primary-forest)', marginBottom: '10px' }}>Indoor Plants</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginBottom: '20px' }}>
                  Bred by nature to thrive in filtered light, steady room temperatures, and compact pots. Perfect for flats, offices, and apartments.
                </p>

                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem' }}>
                    <Check size={16} color="var(--primary-green)" />
                    <span>Requires less direct sunlight</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem' }}>
                    <Check size={16} color="var(--primary-green)" />
                    <span>Conserves water with slow evaporation</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem' }}>
                    <Check size={16} color="var(--primary-green)" />
                    <span>Filters dust and boosts mental calm</span>
                  </li>
                </ul>

                <button
                  className="btn-secondary"
                  style={{ width: '100%', justifyContent: 'center' }}
                  onClick={() => onAskAI('What are the easiest indoor plants for a small apartment with low natural light?')}
                >
                  <Sparkles size={16} color="var(--primary-green)" />
                  <span>Ask AI for Indoor Matches</span>
                </button>
              </div>
            </div>

            {/* Outdoor Card */}
            <div
              style={{
                background: 'white',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-md)',
                border: '1px solid var(--border-subtle)'
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800&q=80"
                alt="Outdoor Plants Garden"
                style={{ width: '100%', height: '240px', objectFit: 'cover' }}
              />
              <div style={{ padding: '28px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#e67700', marginBottom: '8px' }}>
                  <Sun size={20} />
                  <span style={{ fontSize: '0.82rem', fontWeight: 800, textTransform: 'uppercase' }}>Sunlit Open Air</span>
                </div>
                <h3 style={{ fontSize: '1.6rem', color: 'var(--primary-forest)', marginBottom: '10px' }}>Outdoor Plants</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginBottom: '20px' }}>
                  Powerhouses that crave direct sunbeams, rainwater, and wind flow. Essential for vibrant balconies, flower beds, and terrace gardens.
                </p>

                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem' }}>
                    <Check size={16} color="#e67700" />
                    <span>Thrives under 6+ hours of full sun</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem' }}>
                    <Check size={16} color="#e67700" />
                    <span>Attracts birds, honeybees, and butterflies</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem' }}>
                    <Check size={16} color="#e67700" />
                    <span>Fast, robust growth with copious flowers</span>
                  </li>
                </ul>

                <button
                  className="btn-secondary"
                  style={{ width: '100%', justifyContent: 'center' }}
                  onClick={() => onAskAI('What are the best outdoor flowering plants for an open terrace garden?')}
                >
                  <Sparkles size={16} color="#e67700" />
                  <span>Ask AI for Outdoor Matches</span>
                </button>
              </div>
            </div>
          </div>

          {/* Full Detailed Comparison Table */}
          <div className="table-wrapper">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>Botanical Feature</th>
                  <th>Indoor Plants 🪴</th>
                  <th>Outdoor Plants 🌳</th>
                  <th>Advantage</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_DATA.features.map((row, idx) => (
                  <tr key={idx}>
                    <td>{row.name}</td>
                    <td>{row.indoor}</td>
                    <td>{row.outdoor}</td>
                    <td>
                      <span className="badge-winner">{row.winner}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};
