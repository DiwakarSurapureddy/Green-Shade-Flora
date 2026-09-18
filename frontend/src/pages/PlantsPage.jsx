import React, { useState, useMemo } from 'react';
import { useGreenCart } from '../context/GreenCartContext';
import { CATEGORIES, PLANTS_DATA } from '../data/plantsData';
import { PlantCard } from '../components/PlantCard';
import { 
  Search, 
  Filter, 
  Sprout, 
  SlidersHorizontal, 
  X, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export const PlantsPage = ({ selectedCategory, setSelectedCategory, onSelectPlant }) => {
  const { totalCount, openCart, openInquiry } = useGreenCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState(selectedCategory || 'all');

  // Keep state synced if parent changes selectedCategory
  React.useEffect(() => {
    if (selectedCategory) {
      setActiveFilter(selectedCategory);
    }
  }, [selectedCategory]);

  const handleFilterChange = (catId) => {
    setActiveFilter(catId);
    if (setSelectedCategory) setSelectedCategory(catId);
  };

  // Filter and search logic
  const filteredPlants = useMemo(() => {
    return PLANTS_DATA.filter((plant) => {
      const matchesCategory = activeFilter === 'all' || plant.category === activeFilter;
      
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = 
        !q ||
        plant.name.toLowerCase().includes(q) ||
        (plant.botanicalName && plant.botanicalName.toLowerCase().includes(q)) ||
        plant.categoryLabel.toLowerCase().includes(q) ||
        plant.description.toLowerCase().includes(q) ||
        (plant.suitability && plant.suitability.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [activeFilter, searchQuery]);

  const activeCategoryObj = CATEGORIES.find(c => c.id === activeFilter) || CATEGORIES[0];

  return (
    <div className="plants-page-root">
      {/* Catalog Header Banner */}
      <section className="catalog-header-section">
        <div className="container">
          <div className="catalog-header-text">
            <span className="badge-kadiyam-origin">
              <ShieldCheck size={14} /> 100% Locally Acclimatized in Kadiyapu Savaram Grounds
            </span>
            <h1 className="catalog-main-title">Plants Catalog</h1>
            <p className="catalog-lead-description">
              Browse our 1,000+ varieties cultivated for home gardens, nationwide wholesale logistics, infrastructure tenders, and commercial real-estate landscaping.
            </p>
          </div>

          {/* Search Bar */}
          <div className="catalog-search-wrapper">
            <div className="search-input-box">
              <Search size={20} className="search-icon" />
              <input
                type="text"
                placeholder="Search plants by common name, plant Latin name, or keyword (e.g. Royal Palm, Bonsai, Banganapalli)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  type="button"
                  className="search-clear-btn"
                  onClick={() => setSearchQuery('')}
                  title="Clear search"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {totalCount > 0 && (
              <button
                type="button"
                className="btn-quick-cart-bar"
                onClick={openCart}
              >
                <span className="cart-badge-icon">🌿</span>
                <span>Review Green Cart ({totalCount} Plants)</span>
                <ArrowRight size={16} />
              </button>
            )}
          </div>

          {/* 6 Category Filter Chips */}
          <div className="category-filter-bar">
            <span className="filter-label">
              <Filter size={16} /> Categories:
            </span>
            <div className="filter-chips-scroll">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  className={`category-filter-chip ${activeFilter === cat.id ? 'active' : ''}`}
                  onClick={() => handleFilterChange(cat.id)}
                >
                  <span>{cat.name}</span>
                  {cat.id !== 'all' && (
                    <span className="chip-count">
                      {PLANTS_DATA.filter(p => p.category === cat.id).length}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Catalog Main Content */}
      <section className="catalog-grid-section">
        <div className="container">
          {/* Active Category Description Notice */}
          <div className="active-category-info-bar">
            <div>
              <h3>{activeCategoryObj.name}</h3>
              <p>{activeCategoryObj.description}</p>
            </div>
            <div className="results-count-badge">
              Showing <strong>{filteredPlants.length}</strong> plant specimens
            </div>
          </div>

          {/* Plant Grid */}
          {filteredPlants.length === 0 ? (
            <div className="catalog-no-results">
              <Sprout size={48} className="no-results-icon" />
              <h3>No plant varieties found</h3>
              <p>Try clearing your search query or choosing another plant category.</p>
              <button
                type="button"
                className="btn-outline"
                onClick={() => {
                  setSearchQuery('');
                  setActiveFilter('all');
                }}
              >
                Show All Plants
              </button>
            </div>
          ) : (
            <div className="plants-cards-grid">
              {filteredPlants.map((plant) => (
                <PlantCard
                  key={plant.id}
                  plant={plant}
                  onSelectPlant={onSelectPlant}
                />
              ))}
            </div>
          )}

          {/* Custom Bulk Requirement Notice */}
          <div className="custom-requirement-card">
            <div className="custom-req-text">
              <h4>Need a specific plant variety not listed here?</h4>
              <p>
                Our 29+ year nursery grounds in Kadiyapu Savaram nurture over 1,000+ uncataloged species and mature trunk specimens. Send your detailed list for immediate quotation.
              </p>
            </div>
            <button
              type="button"
              className="btn-primary"
              onClick={() => openInquiry('Bulk B2B')}
            >
              <span>Submit Custom Plant Inquiry</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
