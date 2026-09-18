import React, { useState, useMemo } from 'react';
import { PLANTS_DATA } from '../data/plantsData';
import { PlantCard } from '../components/PlantCard';
import { Search, X, Filter, Sparkles, SlidersHorizontal, RotateCcw } from 'lucide-react';

export const SearchPlants = ({ onAskAI }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [environmentFilter, setEnvironmentFilter] = useState('all');
  const [careFilter, setCareFilter] = useState('all');
  const [lightFilter, setLightFilter] = useState('all');

  // Multi-attribute filtering logic
  const filteredPlants = useMemo(() => {
    return PLANTS_DATA.filter((plant) => {
      // Search text match
      const query = searchTerm.toLowerCase().trim();
      const textMatches = !query || [
        plant.name,
        plant.botanicalName,
        plant.type,
        plant.description,
        plant.care,
        plant.light,
        ...plant.tags,
        ...(plant.goodFor || [])
      ].some((val) => val && val.toLowerCase().includes(query));

      // Environment match
      const envMatches =
        environmentFilter === 'all' ||
        plant.environment.toLowerCase().includes(environmentFilter.toLowerCase());

      // Care level match
      const careMatches =
        careFilter === 'all' ||
        plant.care.toLowerCase().includes(careFilter.toLowerCase());

      // Light condition match
      const lightMatches =
        lightFilter === 'all' ||
        plant.light.toLowerCase().includes(lightFilter.toLowerCase());

      return textMatches && envMatches && careMatches && lightMatches;
    });
  }, [searchTerm, environmentFilter, careFilter, lightFilter]);

  const handleReset = () => {
    setSearchTerm('');
    setEnvironmentFilter('all');
    setCareFilter('all');
    setLightFilter('all');
  };

  const quickPills = [
    { label: 'Low Light Plants', query: 'low light' },
    { label: 'Medicinal Herbs', query: 'medicinal' },
    { label: 'NASA Air Purifiers', query: 'purifying' },
    { label: 'Easy Beginners', query: 'easy' },
    { label: 'Fragrant Flowers', query: 'fragrant' }
  ];

  return (
    <div style={{ paddingBottom: '90px' }}>
      {/* Search Header Banner */}
      <section className="section section-soft" style={{ padding: '60px 0 40px' }}>
        <div className="container">
          <div className="section-header-center" style={{ marginBottom: '32px' }}>
            <span className="section-badge">Live Botanical Search</span>
            <h1 className="section-title">Smart Plant Finder & AI Advisor</h1>
            <p className="section-desc">
              Filter our species database by room lighting, watering frequency, or care difficulty — or ask PlantMate AI for custom guidance.
            </p>
          </div>

          {/* Search Bar */}
          <div className="search-hero-bar">
            <Search size={22} color="var(--primary-green)" />
            <input
              type="text"
              className="search-input-field"
              placeholder="Search by plant name, light, benefits (e.g., 'low light', 'aloe', 'medicinal')..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                style={{ color: 'var(--text-muted)', padding: '4px' }}
              >
                <X size={18} />
              </button>
            )}
          </div>

          {/* Quick Query Pills */}
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Sparkles size={14} color="var(--accent-emerald)" />
              <span>Trending:</span>
            </span>
            {quickPills.map((p, idx) => (
              <button
                key={idx}
                className="filter-pill"
                style={{ fontSize: '0.8rem', padding: '4px 12px' }}
                onClick={() => setSearchTerm(p.query)}
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Multi-Filters Grid */}
          <div
            style={{
              background: 'white',
              borderRadius: 'var(--radius-md)',
              padding: '18px 24px',
              boxShadow: 'var(--shadow-sm)',
              border: '1px solid var(--border-subtle)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '16px',
              maxWidth: '820px',
              margin: '0 auto'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary-forest)', fontWeight: 700, fontSize: '0.9rem' }}>
              <SlidersHorizontal size={18} />
              <span>Filters:</span>
            </div>

            {/* Environment */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Space:</label>
              <select
                value={environmentFilter}
                onChange={(e) => setEnvironmentFilter(e.target.value)}
                style={{ padding: '6px 10px', borderRadius: '8px', border: '1px solid var(--border-subtle)', fontSize: '0.85rem' }}
              >
                <option value="all">All Spaces</option>
                <option value="indoor">Indoor</option>
                <option value="outdoor">Outdoor</option>
              </select>
            </div>

            {/* Care Level */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Care:</label>
              <select
                value={careFilter}
                onChange={(e) => setCareFilter(e.target.value)}
                style={{ padding: '6px 10px', borderRadius: '8px', border: '1px solid var(--border-subtle)', fontSize: '0.85rem' }}
              >
                <option value="all">Any Care Level</option>
                <option value="easy">Easy (Beginner)</option>
                <option value="moderate">Moderate</option>
              </select>
            </div>

            {/* Sunlight */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Sunlight:</label>
              <select
                value={lightFilter}
                onChange={(e) => setLightFilter(e.target.value)}
                style={{ padding: '6px 10px', borderRadius: '8px', border: '1px solid var(--border-subtle)', fontSize: '0.85rem' }}
              >
                <option value="all">All Light Types</option>
                <option value="low">Low Light</option>
                <option value="bright">Bright Indirect</option>
                <option value="full">Full Direct Sun</option>
              </select>
            </div>

            {/* Reset */}
            <button
              onClick={handleReset}
              style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}
              title="Reset all filters"
            >
              <RotateCcw size={14} />
              <span>Reset</span>
            </button>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="section" style={{ paddingTop: '40px' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px', flexWrap: 'wrap', gap: '12px' }}>
            <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
              Showing <strong style={{ color: 'var(--primary-forest)' }}>{filteredPlants.length}</strong> matching plants
            </p>

            {searchTerm && (
              <button
                className="btn-secondary"
                style={{ fontSize: '0.85rem', padding: '8px 16px' }}
                onClick={() => onAskAI(`What are the best options among plants matching "${searchTerm}" for a home apartment?`)}
              >
                <Sparkles size={14} color="var(--primary-green)" />
                <span>Ask AI to Recommend from "{searchTerm}"</span>
              </button>
            )}
          </div>

          {filteredPlants.length > 0 ? (
            <div className="plant-grid">
              {filteredPlants.map((plant) => (
                <PlantCard
                  key={plant.id}
                  plant={plant}
                  onAskAI={onAskAI}
                />
              ))}
            </div>
          ) : (
            <div
              style={{
                textAlign: 'center',
                padding: '60px 24px',
                background: 'white',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border-subtle)',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🪴</div>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '8px' }}>No exact plant matches found</h3>
              <p style={{ color: 'var(--text-secondary)', maxWidth: '440px', margin: '0 auto 24px', fontSize: '0.95rem' }}>
                We couldn't find any plants matching your current filter combination. Try resetting filters or ask PlantMate AI directly!
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
                <button className="btn-secondary" onClick={handleReset}>
                  Reset All Filters
                </button>
                <button className="btn-primary" onClick={() => onAskAI(`I was looking for "${searchTerm}". Can you suggest plants for this requirement?`)}>
                  <Sparkles size={16} />
                  <span>Ask PlantMate AI</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
