import React from 'react';
import { BUSINESS_INFO, CATEGORIES } from '../data/plantsData';
import { 
  Sprout, 
  MapPin, 
  Phone, 
  Clock, 
  Send, 
  ExternalLink, 
  ShieldCheck, 
  Instagram, 
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

export const Footer = ({ setActivePage, onSelectCategory, onOpenAdmin }) => {
  return (
    <footer className="business-footer">
      {/* Pre-Footer Action Banner */}
      <div className="footer-cta-band">
        <div className="container cta-band-inner">
          <div className="cta-band-text">
            <span className="heritage-badge-light">🌿 Direct From Kadiyapu Savaram Nursery Grounds</span>
            <h3>Looking for Verified Acclimatized Plants or Wholesale Quotation?</h3>
            <p>
              Connect directly with <strong>Founder Surapureddy Rama Krishna</strong> and our horticultural team for retail orders, bulk B2B supply, commercial landscaping, and government tenders.
            </p>
          </div>
          <div className="cta-band-buttons">
            <a
              href={`https://wa.me/${BUSINESS_INFO.whatsappRaw}?text=${encodeURIComponent(
                "Hello Surapreddy Rama Krishna & Green Shade Nursery Team,\nI would like to place an inquiry for plant availability and wholesale/retail quotation."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp-footer"
            >
              <Send size={18} />
              <span>Inquire on WhatsApp</span>
            </a>
            <a
              href={BUSINESS_INFO.links.googleMaps}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-map-footer"
            >
              <MapPin size={18} />
              <span>Get Nursery Directions</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="main-footer-body">
        <div className="container footer-grid">
          {/* Column 1: Business Identity & Heritage */}
          <div className="footer-col brand-col">
            <div className="footer-brand-header">
              <div className="footer-brand-leaf">
                <Sprout size={28} />
              </div>
              <div>
                <h4 className="footer-brand-title">GREEN SHADE NURSERY</h4>
                <p className="footer-est">Established 1997 • 29+ Years Heritage</p>
              </div>
            </div>

            <p className="footer-summary-text">
              Founded in 1997 by <strong>Surapureddy Rama Krishna</strong>, Green Shade Nursery is one of the most trusted plant growers based in Kadiyapu Savaram, Andhra Pradesh — India's plant nursery hub.
            </p>

            <div className="footer-founder-card">
              <div className="founder-label">Founder & Horticultural Lead</div>
              <div className="founder-name">Surapureddy Rama Krishna</div>
              <div className="founder-note">100% locally acclimatized plants nurtured directly in Kadiyam grounds.</div>
            </div>

            {/* Official Platform Badges */}
            <div className="official-profiles-group">
              <span className="official-label">Official Business Profiles:</span>
              <div className="official-badges-row">
                <a
                  href={BUSINESS_INFO.links.indiamart}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="profile-badge-link indiamart"
                  title="Official Green Shade Nursery IndiaMART Profile"
                >
                  <span>IndiaMART Verified</span>
                  <ExternalLink size={12} />
                </a>
                <a
                  href={BUSINESS_INFO.links.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="profile-badge-link instagram"
                  title="Official Green Shade Nursery Instagram"
                >
                  <Instagram size={14} />
                  <span>@kadiyamgreenshadenursery</span>
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Plant Categories */}
          <div className="footer-col links-col">
            <h5 className="footer-heading">Plant Categories</h5>
            <ul className="footer-links-list">
              {CATEGORIES.filter(c => c.id !== 'all').map((cat) => (
                <li key={cat.id}>
                  <button
                    type="button"
                    className="footer-nav-link-btn"
                    onClick={() => {
                      if (onSelectCategory) onSelectCategory(cat.id);
                      if (setActivePage) setActivePage('plants');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  >
                    <ArrowRight size={12} className="link-bullet" />
                    <span>{cat.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Service Capabilities */}
          <div className="footer-col services-col">
            <h5 className="footer-heading">Service Capabilities</h5>
            <ul className="footer-capabilities-list">
              <li>
                <CheckCircle2 size={14} className="cap-icon" />
                <span>Retail Sales for Home Gardeners</span>
              </li>
              <li>
                <CheckCircle2 size={14} className="cap-icon" />
                <span>Bulk B2B Wholesale Supply Across India</span>
              </li>
              <li>
                <CheckCircle2 size={14} className="cap-icon" />
                <span>Government Forestry & Highway Tenders</span>
              </li>
              <li>
                <CheckCircle2 size={14} className="cap-icon" />
                <span>Commercial Real-Estate Landscaping</span>
              </li>
            </ul>

            <div className="kadiyam-hub-box">
              <ShieldCheck size={16} />
              <span>Cultivated in Godavari Alluvial Soil • Ready for nationwide transport</span>
            </div>
          </div>

          {/* Column 4: Contact & Nursery Location */}
          <div className="footer-col contact-col">
            <h5 className="footer-heading">Nursery Location & Hours</h5>
            
            <div className="footer-contact-item">
              <MapPin size={18} className="contact-icon" />
              <div>
                <strong>Physical Address:</strong>
                <p>{BUSINESS_INFO.address}</p>
                <a
                  href={BUSINESS_INFO.links.googleMaps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="maps-text-link"
                >
                  View on Google Maps <ExternalLink size={12} />
                </a>
              </div>
            </div>

            <div className="footer-contact-item">
              <Phone size={18} className="contact-icon" />
              <div>
                <strong>Primary / WhatsApp:</strong>
                <p>
                  <a href={`tel:${BUSINESS_INFO.whatsappRaw}`}>{BUSINESS_INFO.whatsappPhone}</a>
                </p>
                <strong>Alternate Phone:</strong>
                <p>
                  <a href={`tel:${BUSINESS_INFO.alternatePhoneRaw}`}>{BUSINESS_INFO.alternatePhone}</a>
                </p>
              </div>
            </div>

            <div className="footer-contact-item">
              <Clock size={18} className="contact-icon" />
              <div>
                <strong>Operating Hours:</strong>
                <p>{BUSINESS_INFO.operatingHours.weekdays}</p>
                <p>{BUSINESS_INFO.operatingHours.sunday}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div className="footer-bottom-bar">
        <div className="container bottom-inner">
          <p className="copyright-text">
            © {new Date().getFullYear()} <strong>Green Shade Nursery</strong>. All rights reserved. Founded 1997 by Surapureddy Rama Krishna. Kadiyapu Savaram, Andhra Pradesh - 533126.
          </p>
          <div className="bottom-badges">
            <span className="clean-badge">1,000+ Plant Varieties</span>
            <span className="clean-badge">100% Acclimatized Saplings</span>
            <span className="clean-badge">Retail & B2B Wholesale</span>
            {onOpenAdmin && (
              <button
                type="button"
                onClick={onOpenAdmin}
                className="clean-badge"
                style={{ cursor: 'pointer', background: 'rgba(212, 175, 55, 0.15)', borderColor: 'var(--gold-primary)', color: 'var(--gold-primary)' }}
                title="View Inquiries from Database"
              >
                📋 Nursery Desk
              </button>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};
