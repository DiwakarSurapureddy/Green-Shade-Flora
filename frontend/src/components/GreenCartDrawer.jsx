import React from 'react';
import { useGreenCart } from '../context/GreenCartContext';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, Sprout, CheckCircle2 } from 'lucide-react';

export const GreenCartDrawer = () => {
  const {
    cartItems,
    totalCount,
    varietyCount,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    openInquiry
  } = useGreenCart();

  if (!isCartOpen) return null;

  return (
    <div className="cart-drawer-overlay" onClick={closeCart}>
      <aside 
        className="cart-drawer" 
        onClick={(e) => e.stopPropagation()}
        aria-label="Green Cart Drawer"
      >
        {/* Drawer Header */}
        <header className="cart-drawer-header">
          <div className="cart-header-title">
            <span className="cart-icon-wrap">🌿</span>
            <div>
              <h3>Green Cart</h3>
              <p className="cart-subtitle">
                {varietyCount === 0 
                  ? 'Your plant inquiry cart is empty'
                  : `${varietyCount} Varieties • ${totalCount} Total Plants Selected`}
              </p>
            </div>
          </div>
          <button 
            type="button" 
            className="cart-close-btn" 
            onClick={closeCart} 
            title="Close Green Cart"
          >
            <X size={20} />
          </button>
        </header>

        {/* Business Inquiry Alert */}
        <div className="cart-notice-banner">
          <Sprout size={16} className="notice-icon" />
          <span>Select plants & quantities to generate a direct nursery quotation. No online payment required.</span>
        </div>

        {/* Drawer Body / Items List */}
        <div className="cart-items-body">
          {cartItems.length === 0 ? (
            <div className="cart-empty-state">
              <div className="cart-empty-illustration">
                <ShoppingBag size={52} strokeWidth={1.2} />
              </div>
              <h4>Your Green Cart is Empty</h4>
              <p>Explore our 1,000+ acclimatized plant varieties nurtured in Kadiyapu Savaram and add them to your inquiry.</p>
              <button 
                type="button" 
                className="btn-primary" 
                onClick={closeCart}
              >
                Browse Plants Catalog
              </button>
            </div>
          ) : (
            <div className="cart-items-list">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item-card">
                  <div className="cart-item-img-wrap">
                    <img src={item.image} alt={item.name} loading="lazy" />
                  </div>
                  <div className="cart-item-info">
                    <div className="cart-item-header">
                      <span className="cart-item-cat">{item.categoryLabel || 'Specimen'}</span>
                      <button 
                        type="button" 
                        className="cart-remove-btn" 
                        onClick={() => removeFromCart(item.id)}
                        title="Remove plant"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <h5 className="cart-item-name">{item.name}</h5>
                    {item.botanicalName && (
                      <p className="cart-item-botanical">{item.botanicalName}</p>
                    )}

                    <div className="cart-item-controls">
                      <div className="qty-control-group">
                        <button 
                          type="button" 
                          className="qty-btn" 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          title="Decrease quantity"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="qty-value">{item.quantity}</span>
                        <button 
                          type="button" 
                          className="qty-btn" 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          title="Increase quantity"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <span className="cart-qty-label">saplings / plants</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        {cartItems.length > 0 && (
          <footer className="cart-drawer-footer">
            <div className="cart-summary-box">
              <div className="summary-row">
                <span>Selected Varieties:</span>
                <strong>{varietyCount} items</strong>
              </div>
              <div className="summary-row highlight">
                <span>Total Plant Count:</span>
                <strong>{totalCount} saplings</strong>
              </div>
            </div>

            <div className="cart-action-buttons">
              <button 
                type="button" 
                className="btn-proceed-inquiry"
                onClick={() => openInquiry('Retail (1-10 plants)')}
              >
                <span>Proceed to Plant Inquiry</span>
                <ArrowRight size={18} />
              </button>

              <div className="cart-secondary-actions">
                <button 
                  type="button" 
                  className="btn-clear-cart"
                  onClick={clearCart}
                >
                  Clear Cart
                </button>
                <button 
                  type="button" 
                  className="btn-continue-browsing"
                  onClick={closeCart}
                >
                  Continue Browsing
                </button>
              </div>
            </div>
          </footer>
        )}
      </aside>
    </div>
  );
};
