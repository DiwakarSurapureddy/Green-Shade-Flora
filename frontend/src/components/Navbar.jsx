import React, { useState, useEffect } from 'react';
import { useGreenCart } from '../context/GreenCartContext';
import { BUSINESS_INFO } from '../data/plantsData';
import { 
  Sprout, 
  Menu, 
  X, 
  Send, 
  PhoneCall, 
  Compass, 
  Info, 
  Layers, 
  Mail,
  MapPin
} from 'lucide-react';

export const Navbar = ({ activePage, setActivePage, onOpenAdmin }) => {
  const { totalCount, varietyCount, openCart, openInquiry } = useGreenCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'plants', label: 'Plants' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleNavClick = (link) => {
    setActivePage(link.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Top Heritage & Contact Bar */}
      <div className="top-utility-bar">
        <div className="container utility-content">
          <div className="utility-left">
            <span className="heritage-badge">🌿 Est. 1997 • 29+ Years Horticultural Heritage</span>
            <span className="hub-tag">
              <MapPin size={12} /> Kadiyapu Savaram, Andhra Pradesh
            </span>
          </div>
          <div className="utility-right">
            <a 
              href={`tel:${BUSINESS_INFO.alternatePhoneRaw}`} 
              className="utility-link"
              title="Call Green Shade Nursery Desk"
            >
              <PhoneCall size={12} /> {BUSINESS_INFO.whatsappPhone}
            </a>
            <span className="utility-divider">|</span>
            <span className="operating-text">Mon–Sat: 7AM–8PM • Sun: 8AM–7PM</span>
            {onOpenAdmin && (
              <>
                <span className="utility-divider">|</span>
                <button
                  type="button"
                  onClick={onOpenAdmin}
                  className="utility-admin-link"
                  title="Open Nursery Desk (PostgreSQL Inquiries)"
                >
                  📋 Nursery Desk
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header className={`main-navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
        <div className="container nav-inner">
          {/* Brand Logo */}
          <div className="nav-brand" onClick={() => { setActivePage('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
            <div className="brand-leaf-icon">
              <Sprout size={24} />
            </div>
            <div className="brand-text-block">
              <div className="brand-title">GREEN SHADE NURSERY</div>
              <div className="brand-subtitle">
                <span>ESTABLISHED 1997</span>
                <span className="dot-sep">•</span>
                <span>KADIYAM SAVARAM</span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="desktop-nav-links" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <button
                key={link.id}
                type="button"
                className={`nav-link-btn ${activePage === link.id ? 'active' : ''}`}
                onClick={() => handleNavClick(link)}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right Action Controls */}
          <div className="nav-right-actions">
            {/* Green Cart Trigger Icon Button */}
            <button
              type="button"
              className="btn-nav-cart"
              onClick={openCart}
              title="Open Green Cart"
              aria-label={`Green Cart with ${totalCount} plants`}
            >
              <div className="cart-btn-icon-wrap">
                <span className="cart-leaf-glyph">🌿</span>
              </div>
              <div className="cart-btn-text-wrap">
                <span className="cart-btn-title">Green Cart</span>
                <span className="cart-btn-count-text">
                  {totalCount === 0 ? '0 Plants' : `${totalCount} Plants`}
                </span>
              </div>
              {totalCount > 0 && (
                <span className="cart-floating-badge">{totalCount}</span>
              )}
            </button>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              className="mobile-hamburger-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="mobile-menu-drawer">
            <div className="mobile-menu-inner container">
              <div className="mobile-links-stack">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    type="button"
                    className={`mobile-link-item ${activePage === link.id ? 'active' : ''}`}
                    onClick={() => handleNavClick(link)}
                  >
                    <span>{link.label}</span>
                    {link.isCartAction && totalCount > 0 && (
                      <span className="mobile-cart-badge">{totalCount} items</span>
                    )}
                  </button>
                ))}
              </div>

              <div className="mobile-drawer-bottom">
                <div className="mobile-hours-card">
                  <p><strong>Founder:</strong> Surapureddy Rama Krishna</p>
                  <p><strong>Location:</strong> Kadiyapu Savaram, AP</p>
                  <p><strong>Phone:</strong> {BUSINESS_INFO.whatsappPhone}</p>
                </div>
                <button
                  type="button"
                  className="btn-primary full-width"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openInquiry();
                  }}
                >
                  Send Plant Inquiry
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
