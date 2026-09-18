import React, { useState } from 'react';
import { useGreenCart } from '../context/GreenCartContext';
import { 
  Sprout, 
  Plus, 
  Minus, 
  Check, 
  Sun, 
  Droplets, 
  Eye, 
  ShieldCheck 
} from 'lucide-react';

export const PlantCard = ({ plant, onSelectPlant }) => {
  const { addToGreenCart } = useGreenCart();
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  const handleAdd = (e) => {
    e.stopPropagation();
    addToGreenCart(plant, quantity);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1600);
  };

  const handleIncrement = (e) => {
    e.stopPropagation();
    setQuantity(prev => prev + 1);
  };

  const handleDecrement = (e) => {
    e.stopPropagation();
    setQuantity(prev => Math.max(1, prev - 1));
  };

  return (
    <article className="plant-card-business" onClick={() => onSelectPlant(plant)}>
      {/* Thumbnail & Badges */}
      <div className="card-media-box">
        <img 
          src={plant.image} 
          alt={plant.name} 
          className="card-plant-image" 
          loading="lazy" 
        />
        <div className="card-top-badges">
          <span className="badge-acclimatized-mini" title="Nurtured in Kadiyapu Savaram grounds">
            <ShieldCheck size={12} /> 100% Acclimatized
          </span>
          <span className="badge-category-mini">
            {plant.categoryLabel}
          </span>
        </div>

        <button 
          type="button" 
          className="card-quick-view-btn"
          onClick={(e) => {
            e.stopPropagation();
            onSelectPlant(plant);
          }}
          title="View Plant Specifications"
        >
          <Eye size={16} />
          <span>Plant Details</span>
        </button>
      </div>

      {/* Card Information */}
      <div className="card-content-box">
        <div className="card-heading-group">
          <h3 className="card-plant-name">{plant.name}</h3>
          {plant.botanicalName && (
            <p className="card-botanical-name"><em>{plant.botanicalName}</em></p>
          )}
        </div>

        <p className="card-desc-snippet">{plant.description}</p>

        {/* Quick specs pills */}
        <div className="card-specs-row">
          <span className="card-spec-tag" title={plant.light}>
            <Sun size={12} /> {plant.light?.split('/')[0]?.trim()}
          </span>
          <span className="card-spec-tag" title={plant.water}>
            <Droplets size={12} /> {plant.water?.split('(')[0]?.trim()}
          </span>
        </div>

        {/* Nursery Quotation Status */}
        <div className="card-quote-status">
          <span className="quote-status-label">Inquiry & Bulk Supply:</span>
          <span className="quote-availability">✓ Verified Stock in Kadiyam</span>
        </div>

        {/* Actions & Quantity Selector */}
        <div className="card-actions-row" onClick={(e) => e.stopPropagation()}>
          <div className="card-stepper">
            <button 
              type="button" 
              className="card-step-btn" 
              onClick={handleDecrement}
              disabled={quantity <= 1}
              title="Decrease quantity"
            >
              <Minus size={13} />
            </button>
            <span className="card-step-val">{quantity}</span>
            <button 
              type="button" 
              className="card-step-btn" 
              onClick={handleIncrement}
              title="Increase quantity"
            >
              <Plus size={13} />
            </button>
          </div>

          <button 
            type="button" 
            className={`btn-card-add-cart ${justAdded ? 'added' : ''}`}
            onClick={handleAdd}
          >
            {justAdded ? (
              <>
                <Check size={15} />
                <span>Added</span>
              </>
            ) : (
              <>
                <Sprout size={15} />
                <span>Add to Green Cart</span>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
};
