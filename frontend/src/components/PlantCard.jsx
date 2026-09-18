import React, { useState } from 'react';
import { Sun, Droplets, Sparkles, ArrowUpRight, X, Heart, ShieldCheck, Thermometer, ShoppingBag, Check } from 'lucide-react';

export const PlantCard = ({ plant, onAskAI }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [liked, setLiked] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2200);
  };

  const discountPercent = plant.originalPrice && plant.price
    ? Math.round(((plant.originalPrice - plant.price) / plant.originalPrice) * 100)
    : null;

  return (
    <>
      <article className="plant-card">
        <div className="card-img-wrap" onClick={() => setModalOpen(true)} style={{ cursor: 'pointer' }}>
          <img src={plant.image} alt={plant.name} loading="lazy" />
          <span className="card-tag-badge">{plant.type}</span>

          {discountPercent > 0 && (
            <span
              style={{
                position: 'absolute',
                bottom: '12px',
                left: '12px',
                background: 'rgba(36, 77, 51, 0.92)',
                color: '#ffffff',
                fontSize: '0.72rem',
                fontWeight: 800,
                padding: '3px 8px',
                borderRadius: '6px',
                letterSpacing: '0.02em'
              }}
            >
              {discountPercent}% OFF
            </span>
          )}

          <button
            style={{
              position: 'absolute',
              top: '14px',
              right: '14px',
              background: 'rgba(255, 255, 255, 0.85)',
              backdropFilter: 'blur(6px)',
              width: '32px',
              height: '32px',
              borderRadius: '999px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: liked ? '#e03131' : '#4a5d52',
              transition: 'all 0.2s',
              border: 'none',
              cursor: 'pointer'
            }}
            onClick={(e) => {
              e.stopPropagation();
              setLiked(!liked);
            }}
            aria-label="Favorite plant"
          >
            <Heart size={16} fill={liked ? '#e03131' : 'none'} />
          </button>
        </div>

        <div className="card-body">
          <h3
            className="card-title"
            onClick={() => setModalOpen(true)}
            style={{ cursor: 'pointer' }}
          >
            {plant.name}
          </h3>
          <p className="card-botanical">{plant.botanicalName}</p>
          <p className="card-desc">{plant.description}</p>

          <div className="card-meta-pills">
            <span className="meta-pill">
              <Sun size={12} color="#e67700" />
              <span>{plant.light}</span>
            </span>
            <span className="meta-pill">
              <Droplets size={12} color="#1971c2" />
              <span>{plant.care} care</span>
            </span>
          </div>

          {/* Professional Indian Rupee Price Section */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              margin: '12px 0 14px',
              paddingTop: '10px',
              borderTop: '1px dashed var(--border-subtle)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
              <span style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--primary-forest)' }}>
                ₹{plant.price}
              </span>
              {plant.originalPrice && (
                <span style={{ fontSize: '0.86rem', textDecoration: 'line-through', color: 'var(--text-muted)' }}>
                  ₹{plant.originalPrice}
                </span>
              )}
            </div>

            <button
              type="button"
              onClick={handleAddToCart}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                padding: '5px 12px',
                background: addedToCart ? '#2b8a3e' : 'var(--primary-green)',
                color: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                fontSize: '0.8rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              title="Add to nursery order"
            >
              {addedToCart ? (
                <>
                  <Check size={13} />
                  <span>Added</span>
                </>
              ) : (
                <>
                  <ShoppingBag size={13} />
                  <span>Order</span>
                </>
              )}
            </button>
          </div>

          <div className="card-footer">
            <button
              className="btn-card-action"
              onClick={() => setModalOpen(true)}
            >
              <span>Care Guide</span>
              <ArrowUpRight size={16} />
            </button>

            {onAskAI && (
              <button
                style={{
                  fontSize: '0.8rem',
                  padding: '5px 12px',
                  background: 'var(--accent-pale)',
                  color: 'var(--primary-forest)',
                  borderRadius: '999px',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  border: 'none',
                  cursor: 'pointer'
                }}
                onClick={() => onAskAI(`Tell me how to take care of ${plant.name} at home`)}
              >
                <Sparkles size={12} />
                <span>Ask AI</span>
              </button>
            )}
          </div>
        </div>
      </article>

      {/* Detail Modal */}
      {modalOpen && (
        <div className="modal-backdrop" onClick={() => setModalOpen(false)}>
          <div className="modal-content-card" onClick={(e) => e.stopPropagation()}>
            <button
              className="btn-modal-close"
              onClick={() => setModalOpen(false)}
            >
              <X size={20} />
            </button>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
              <img
                src={plant.image}
                alt={plant.name}
                style={{ width: '100%', height: '240px', objectFit: 'cover', borderRadius: '12px' }}
              />
              <div>
                <span className="card-tag-badge" style={{ position: 'static', display: 'inline-block', marginBottom: '8px' }}>
                  {plant.environment}
                </span>
                <h2 style={{ fontSize: '1.8rem', marginBottom: '4px' }}>{plant.name}</h2>
                <p style={{ fontStyle: 'italic', color: 'var(--primary-light)', marginBottom: '12px' }}>
                  {plant.botanicalName}
                </p>

                {/* Price highlight in modal */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <span style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--primary-forest)' }}>
                    ₹{plant.price}
                  </span>
                  {plant.originalPrice && (
                    <span style={{ fontSize: '1rem', textDecoration: 'line-through', color: 'var(--text-muted)' }}>
                      ₹{plant.originalPrice}
                    </span>
                  )}
                  {discountPercent > 0 && (
                    <span style={{ background: '#eef8f2', color: '#2b8a3e', fontSize: '0.78rem', fontWeight: 700, padding: '2px 8px', borderRadius: '6px' }}>
                      {discountPercent}% OFF • Nursery Price
                    </span>
                  )}
                </div>

                <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                  {plant.description}
                </p>
              </div>
            </div>

            {/* Quick Metrics */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '24px' }}>
              <div style={{ padding: '12px', background: '#f8faf9', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#e67700', fontSize: '0.8rem', fontWeight: 700, marginBottom: '4px' }}>
                  <Sun size={14} />
                  <span>Sunlight</span>
                </div>
                <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>{plant.light}</span>
              </div>

              <div style={{ padding: '12px', background: '#f8faf9', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#1971c2', fontSize: '0.8rem', fontWeight: 700, marginBottom: '4px' }}>
                  <Droplets size={14} />
                  <span>Watering</span>
                </div>
                <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>{plant.water}</span>
              </div>

              <div style={{ padding: '12px', background: '#f8faf9', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#2b8a3e', fontSize: '0.8rem', fontWeight: 700, marginBottom: '4px' }}>
                  <Thermometer size={14} />
                  <span>Temperature</span>
                </div>
                <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>{plant.temperature || '18°C - 30°C'}</span>
              </div>
            </div>

            {/* In-depth Care Instructions */}
            {plant.careGuide && (
              <div style={{ background: 'var(--accent-pale)', padding: '18px 20px', borderRadius: '12px', marginBottom: '20px' }}>
                <h4 style={{ color: 'var(--primary-forest)', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <ShieldCheck size={18} color="var(--primary-green)" />
                  <span>Master Care Instructions</span>
                </h4>
                <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                  <li><strong>Sunlight:</strong> {plant.careGuide.sunlight}</li>
                  <li><strong>Watering:</strong> {plant.careGuide.watering}</li>
                  <li><strong>Fertilizer:</strong> {plant.careGuide.fertilizer}</li>
                  <li><strong>Pruning:</strong> {plant.careGuide.pruning}</li>
                </ul>
              </div>
            )}

            {/* Benefits & Good For */}
            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ marginBottom: '8px' }}>Key Health & Environmental Benefits</h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {plant.benefits?.map((b, idx) => (
                  <span key={idx} style={{ background: '#eef8f2', color: 'var(--primary-deep)', padding: '4px 12px', borderRadius: '999px', fontSize: '0.82rem', fontWeight: 600 }}>
                    ✓ {b}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', flexWrap: 'wrap' }}>
              <button
                className="btn-secondary"
                onClick={handleAddToCart}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
              >
                {addedToCart ? <Check size={16} /> : <ShoppingBag size={16} />}
                <span>{addedToCart ? 'Added to Order!' : `Order for ₹${plant.price}`}</span>
              </button>

              {onAskAI && (
                <button
                  className="btn-primary"
                  onClick={() => {
                    setModalOpen(false);
                    onAskAI(`What are the ideal growing conditions and common mistakes to avoid when caring for ${plant.name}?`);
                  }}
                >
                  <Sparkles size={16} />
                  <span>Ask PlantMate AI</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
