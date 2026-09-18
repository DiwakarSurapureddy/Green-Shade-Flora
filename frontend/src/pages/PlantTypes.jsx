import React, { useState } from 'react';
import { CATEGORIES_DATA, PLANTS_DATA } from '../data/plantsData';
import { PlantCard } from '../components/PlantCard';
import { Layers, Sparkles, Filter } from 'lucide-react';

export const PlantTypes = ({ onAskAI }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredPlants = selectedCategory === 'all'
    ? PLANTS_DATA
    : PLANTS_DATA.filter((p) => p.category === selectedCategory || p.type.toLowerCase().includes(selectedCategory));

  return (
    <div style={{ paddingBottom: '90px' }}>
      {/* Header */}
      <section className="section section-soft" style={{ padding: '60px 0 40px' }}>
        <div className="container">
          <div className="section-header-center" style={{ marginBottom: '24px' }}>
            <span className="section-badge">Botanical Classification</span>
            <h1 className="section-title">Explore Types of Plants</h1>
            <p className="section-desc">
              From low-light indoor sanctuaries to vibrant outdoor pollinator gardens and ancient Ayurvedic herbs, discover the right botanical family for your space.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="filter-badge-row" style={{ marginBottom: '10px' }}>
            <button
              className={`filter-pill ${selectedCategory === 'all' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('all')}
            >
              All Types ({PLANTS_DATA.length})
            </button>
            {CATEGORIES_DATA.map((cat) => (
              <button
                key={cat.id}
                className={`filter-pill ${selectedCategory === cat.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat.id)}
              >
                {cat.title}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Category Hero Cards */}
      <section className="section" style={{ paddingTop: '50px' }}>
        <div className="container">
          <div className="category-grid" style={{ marginBottom: '60px' }}>
            {CATEGORIES_DATA.map((cat) => (
              <div
                key={cat.id}
                className="category-card"
                onClick={() => setSelectedCategory(cat.id)}
                style={{ cursor: 'pointer' }}
              >
                <img src={cat.image} alt={cat.title} loading="lazy" />
                <div className="category-overlay">
                  <span className="cat-badge">{cat.badge}</span>
                  <h3 className="cat-title">{cat.title}</h3>
                  <p className="cat-desc">{cat.description}</p>
                  <div className="cat-examples">
                    {cat.popularExamples.map((ex, idx) => (
                      <span key={idx} className="cat-pill">
                        {ex}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Plant Showcase for selected category */}
          <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '50px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <h2 style={{ fontSize: '1.8rem', color: 'var(--primary-forest)' }}>
                  {selectedCategory === 'all' ? 'All Botanical Specimens' : `Showing: ${CATEGORIES_DATA.find(c => c.id === selectedCategory)?.title || selectedCategory}`}
                </h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                  Found {filteredPlants.length} varieties with complete care routines
                </p>
              </div>

              <button
                className="btn-secondary"
                onClick={() => onAskAI(`What are the differences between ${selectedCategory} plants and general garden flora?`)}
              >
                <Sparkles size={16} color="var(--primary-green)" />
                <span>Ask AI About This Category</span>
              </button>
            </div>

            <div className="plant-grid">
              {filteredPlants.map((plant) => (
                <PlantCard
                  key={plant.id}
                  plant={plant}
                  onAskAI={onAskAI}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
