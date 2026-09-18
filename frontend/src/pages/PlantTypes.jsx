import React, { useState } from 'react';
import { PLANTS_DATA } from '../data/plantsData';
import { PlantCard } from '../components/PlantCard';
import { Sparkles, ArrowUpDown } from 'lucide-react';

const CATEGORY_FILTERS = [
  { id: 'all', label: 'All Plants', emoji: '🌿' },
  { id: 'indoor', label: 'Indoor', emoji: '🏠' },
  { id: 'outdoor', label: 'Outdoor', emoji: '🌞' },
  { id: 'flowering', label: 'Flowering', emoji: '🌸' },
  { id: 'fruit', label: 'Fruit Trees', emoji: '🍋' },
  { id: 'bonsai', label: 'Bonsai', emoji: '🪴' }
];

export const PlantTypes = ({ onAskAI }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');

  // Filter plants strictly by clicked category
  let plants = selectedCategory === 'all'
    ? PLANTS_DATA
    : PLANTS_DATA.filter((p) => p.category === selectedCategory);

  // Optional price sorting
  if (sortBy === 'priceLow') {
    plants = [...plants].sort((a, b) => a.price - b.price);
  } else if (sortBy === 'priceHigh') {
    plants = [...plants].sort((a, b) => b.price - a.price);
  }

  const currentCategoryObj = CATEGORY_FILTERS.find((c) => c.id === selectedCategory);

  return (
    <div style={{ paddingBottom: '90px' }}>
      {/* Header Section */}
      <section className="section section-soft" style={{ padding: '48px 0 28px' }}>
        <div className="container">
          <div className="section-header-center" style={{ marginBottom: '20px' }}>
            <span className="section-badge">Plant Catalog</span>
            <h1 className="section-title">Explore Types of Plants</h1>
            <p className="section-desc">
              Select any category below to instantly view handpicked plant varieties with real photos, care guides, and nursery prices under ₹500.
            </p>
          </div>

          {/* EXACT FILTER BAR (Replicating user reference image 1:1) */}
          <div className="exact-filter-bar-wrap">
            <span className="exact-filter-label">FILTER:</span>
            <div className="exact-filter-pills-group">
              {CATEGORY_FILTERS.map((item) => {
                const count = item.id === 'all'
                  ? PLANTS_DATA.length
                  : PLANTS_DATA.filter((p) => p.category === item.id).length;

                return (
                  <button
                    key={item.id}
                    className={`exact-filter-pill ${selectedCategory === item.id ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(item.id)}
                  >
                    <span className="pill-emoji">{item.emoji}</span>
                    <span className="pill-label">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* DIRECT PLANTS SHOWCASE SECTION */}
      <section className="section" style={{ paddingTop: '32px' }}>
        <div className="container">
          {/* Active Category Title & Quick Controls */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '26px',
              flexWrap: 'wrap',
              gap: '14px',
              borderBottom: '1px solid var(--border-subtle)',
              paddingBottom: '16px'
            }}
          >
            <div>
              <h2 style={{ fontSize: '1.65rem', color: 'var(--primary-forest)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>{currentCategoryObj?.emoji}</span>
                <span>{currentCategoryObj?.label === 'All Plants' ? 'All Plant Varieties' : `${currentCategoryObj?.label} Plants`}</span>
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '2px' }}>
                Showing {plants.length} varieties • All nursery priced between ₹79 to ₹489
              </p>
            </div>

            {/* Quick Sort & AI Button */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
                  Sort:
                </span>
                <select
                  className="form-input"
                  style={{
                    padding: '6px 12px',
                    fontSize: '0.85rem',
                    width: 'auto',
                    borderRadius: '8px',
                    cursor: 'pointer'
                  }}
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="featured">Featured</option>
                  <option value="priceLow">Price: Low to High</option>
                  <option value="priceHigh">Price: High to Low</option>
                </select>
              </div>

              {onAskAI && (
                <button
                  className="btn-secondary"
                  style={{ padding: '8px 14px', fontSize: '0.85rem' }}
                  onClick={() =>
                    onAskAI(
                      `What are the best tips to grow and care for ${selectedCategory === 'all' ? 'indoor and outdoor' : selectedCategory} plants at home?`
                    )
                  }
                >
                  <Sparkles size={15} color="var(--primary-green)" />
                  <span>Ask Plant AI</span>
                </button>
              )}
            </div>
          </div>

          {/* INSTANT PLANTS GRID */}
          <div className="plant-grid">
            {plants.map((plant) => (
              <PlantCard key={plant.id} plant={plant} onAskAI={onAskAI} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
