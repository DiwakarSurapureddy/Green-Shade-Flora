import React, { useState } from 'react';
import { useGreenCart } from '../context/GreenCartContext';
import { 
  X, 
  Plus, 
  Minus, 
  Sprout, 
  Sun, 
  Droplets, 
  Layers, 
  Maximize2, 
  ShieldCheck, 
  Check, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

export const PlantDetailModal = ({ plant, onClose }) => {
  const { addToGreenCart, openInquiry } = useGreenCart();
  const [quantity, setQuantity] = useState(1);
  const [addedAnimation, setAddedAnimation] = useState(false);

  if (!plant) return null;

  const handleAdd = () => {
    addToGreenCart(plant, quantity);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1800);
  };

  const handleInstantInquiry = () => {
    addToGreenCart(plant, quantity);
    onClose();
    openInquiry();
  };

  return (
    <div className="plant-detail-overlay" onClick={onClose}>
      <div 
        className="plant-detail-modal" 
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-labelledby="plant-detail-title"
      >
        <button 
          type="button" 
          className="detail-close-btn" 
          onClick={onClose}
          title="Close details"
        >
          <X size={20} />
        </button>

        <div className="plant-detail-grid">
          {/* Left: Plant Photography Showcase */}
          <div className="detail-media-wrap">
            <img src={plant.image} alt={plant.name} className="detail-hero-img" />
            <div className="detail-badges-overlay">
              <span className="badge-acclimatized">
                <ShieldCheck size={14} /> 100% Kadiyam Acclimatized
              </span>
              <span className="badge-category-tag">
                {plant.categoryLabel}
              </span>
            </div>
          </div>

          {/* Right: Botanical Specifications & Actions */}
          <div className="detail-content-wrap">
            <div className="detail-header-block">
              <span className="botanical-tag">{plant.categoryLabel} • Specimen Grade</span>
              <h2 id="plant-detail-title" className="detail-plant-name">{plant.name}</h2>
              {plant.botanicalName && (
                <p className="detail-botanical-latin">
                  <em>{plant.botanicalName}</em>
                </p>
              )}
            </div>

            <p className="detail-description">{plant.description}</p>

            {/* Botanical Specs Grid */}
            <div className="specs-pill-grid">
              <div className="spec-pill">
                <Sun size={18} className="spec-icon" />
                <div>
                  <label>Sunlight</label>
                  <span>{plant.light}</span>
                </div>
              </div>

              <div className="spec-pill">
                <Droplets size={18} className="spec-icon" />
                <div>
                  <label>Watering</label>
                  <span>{plant.water}</span>
                </div>
              </div>

              <div className="spec-pill">
                <Layers size={18} className="spec-icon" />
                <div>
                  <label>Soil / Substrate</label>
                  <span>{plant.soil}</span>
                </div>
              </div>

              <div className="spec-pill">
                <Maximize2 size={18} className="spec-icon" />
                <div>
                  <label>Mature Height</label>
                  <span>{plant.height}</span>
                </div>
              </div>
            </div>

            {/* Suitability & Acclimatization Notice */}
            <div className="acclimatization-box">
              <div className="box-title">
                <Sprout size={16} />
                <strong>Kadiyapu Savaram Nursery Acclimatization</strong>
              </div>
              <p>
                {plant.acclimatization}. Nurtured in Godavari alluvium with resilient root structure, ready for transplanting across India without shock.
              </p>
              {plant.suitability && (
                <div className="suitability-tag-line">
                  <strong>Recommended for:</strong> {plant.suitability}
                </div>
              )}
            </div>

            {/* Key Features List */}
            {plant.features && plant.features.length > 0 && (
              <div className="features-checklist">
                {plant.features.map((feat, idx) => (
                  <div key={idx} className="feature-item">
                    <Check size={16} className="check-icon" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Quantity Stepper & Green Cart Actions */}
            <div className="detail-action-card">
              <div className="stepper-label-row">
                <span className="order-qty-label">Inquiry Quantity (Plants / Saplings):</span>
                <div className="stepper-box">
                  <button 
                    type="button" 
                    className="stepper-btn" 
                    onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus size={16} />
                  </button>
                  <span className="stepper-count">{quantity}</span>
                  <button 
                    type="button" 
                    className="stepper-btn" 
                    onClick={() => setQuantity(prev => prev + 1)}
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              <div className="detail-buttons-group">
                <button 
                  type="button" 
                  className={`btn-add-greencart ${addedAnimation ? 'added-success' : ''}`}
                  onClick={handleAdd}
                >
                  {addedAnimation ? (
                    <>
                      <Check size={18} />
                      <span>Added to Green Cart!</span>
                    </>
                  ) : (
                    <>
                      <Sprout size={18} />
                      <span>Add to Green Cart</span>
                    </>
                  )}
                </button>

                <button 
                  type="button" 
                  className="btn-quick-inquire"
                  onClick={handleInstantInquiry}
                >
                  <span>Quick Inquire</span>
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
