import React from 'react';
import { BUSINESS_INFO, CATEGORIES } from '../data/plantsData';
import { useGreenCart } from '../context/GreenCartContext';
import { 
  Sprout, 
  ShieldCheck, 
  MapPin, 
  Phone, 
  Clock, 
  Send, 
  Calendar, 
  CheckCircle2, 
  TreePine, 
  Layers, 
  Building2, 
  Truck 
} from 'lucide-react';

export const About = ({ setActivePage }) => {
  const { openInquiry } = useGreenCart();

  return (
    <div className="about-page-root">
      {/* About Header */}
      <section className="about-hero-header">
        <div className="container">
          <div className="about-header-pill">
            <ShieldCheck size={16} />
            <span>Official Business Profile & Horticultural Heritage</span>
          </div>
          <h1 className="about-main-title">About Green Shade Nursery</h1>
          <p className="about-subtitle-location">
            Founded 1997 • Kadiyapu Savaram, Andhra Pradesh — India's Plant Nursery Hub
          </p>
        </div>
      </section>

      {/* Main Narrative Section */}
      <section className="about-content-section">
        <div className="container">
          <div className="about-story-layout">
            {/* Story Text */}
            <div className="about-narrative-col">
              <div className="profile-section-block">
                <span className="section-sub-badge">The Founder's Story</span>
                <h2>Founded in 1997 by Surapureddy Rama Krishna</h2>
                <div className="accent-bar"></div>

                <p className="lead-story-paragraph">
                  Founded in 1997 by <strong>Surapureddy Rama Krishna</strong>, Green Shade Nursery is one of the most trusted plant growers based in <strong>Kadiyam Savaram, Andhra Pradesh</strong> — India's plant nursery hub.
                </p>

                <p className="standard-story-paragraph">
                  Over the past 29 years, Surapureddy Rama Krishna and his team have built a reputation for genuine horticultural expertise, healthy acclimatized saplings, and dependable customer service.
                </p>
              </div>

              {/* Plant Varieties Block */}
              <div className="profile-section-block">
                <span className="section-sub-badge">Plants Portfolio</span>
                <h3>1,000+ Plant Varieties</h3>
                <p>
                  Green Shade Nursery cultivates and maintains over 1,000+ varieties spanning six plant categories:
                </p>
                <div className="varieties-checklist-grid">
                  <div className="variety-bullet">
                    <CheckCircle2 size={16} className="text-emerald" />
                    <span>Ornamental plants</span>
                  </div>
                  <div className="variety-bullet">
                    <CheckCircle2 size={16} className="text-emerald" />
                    <span>Mature specimen palms</span>
                  </div>
                  <div className="variety-bullet">
                    <CheckCircle2 size={16} className="text-emerald" />
                    <span>Flowering shrubs</span>
                  </div>
                  <div className="variety-bullet">
                    <CheckCircle2 size={16} className="text-emerald" />
                    <span>Exotic indoor greens</span>
                  </div>
                  <div className="variety-bullet">
                    <CheckCircle2 size={16} className="text-emerald" />
                    <span>Handcrafted bonsai</span>
                  </div>
                  <div className="variety-bullet">
                    <CheckCircle2 size={16} className="text-emerald" />
                    <span>Grafted fruit saplings</span>
                  </div>
                </div>
              </div>

              {/* Cultivation Block */}
              <div className="profile-section-block">
                <span className="section-sub-badge">Cultivation Methodology</span>
                <h3>100% Locally Acclimatized Plants</h3>
                <p>
                  All our plants are nurtured directly in the nursery grounds of <strong>Kadiyapu Savaram</strong>. The fertile alluvial soil of the Godavari delta combined with decades of acclimatization practices produce root structures with superior vigor, capable of adjusting smoothly across diverse regional climates throughout India.
                </p>
              </div>

              {/* Service Capabilities */}
              <div className="profile-section-block">
                <span className="section-sub-badge">Service Capabilities</span>
                <h3>Scale & Procurement Readiness</h3>
                <p>
                  We provide dependable plant supply across four specialized operational segments:
                </p>
                <div className="capabilities-detailed-list">
                  <div className="cap-detailed-card">
                    <h4>1. Retail Sales for Home Gardeners</h4>
                    <p>Direct nursery sales of acclimatized plants for residential properties, terraces, and villa gardens.</p>
                  </div>
                  <div className="cap-detailed-card">
                    <h4>2. Bulk B2B Wholesale Supply Across India</h4>
                    <p>Volume sapling supply for plant nurseries, garden centers, and landscape contractors across states.</p>
                  </div>
                  <div className="cap-detailed-card">
                    <h4>3. Government Forestry & Highway Plantation Tenders</h4>
                    <p>Large-scale hardy tree, shrub, and groundcover supply for public infrastructure and civil greening drives.</p>
                  </div>
                  <div className="cap-detailed-card">
                    <h4>4. Commercial Real-Estate Landscaping</h4>
                    <p>Turnkey specimen plant supply for corporate tech parks, luxury resorts, gated communities, and townships.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar Profile Card */}
            <div className="about-sidebar-col">
              <div className="sidebar-nursery-card">
                <div className="sidebar-card-header">
                  <div className="leaf-badge-icon">🌿</div>
                  <div>
                    <h4>Green Shade Nursery</h4>
                    <p>Admin & Business Profile</p>
                  </div>
                </div>

                <div className="sidebar-meta-list">
                  <div className="sidebar-meta-item">
                    <span className="meta-label">Founder & Owner</span>
                    <strong className="meta-val">Surapureddy Rama Krishna</strong>
                  </div>

                  <div className="sidebar-meta-item">
                    <span className="meta-label">Year Established</span>
                    <strong className="meta-val">1997 (29+ Years Heritage)</strong>
                  </div>

                  <div className="sidebar-meta-item">
                    <span className="meta-label">Physical Address</span>
                    <strong className="meta-val">{BUSINESS_INFO.address}</strong>
                  </div>

                  <div className="sidebar-meta-item">
                    <span className="meta-label">Primary WhatsApp / Phone</span>
                    <strong className="meta-val">
                      <a href={`tel:${BUSINESS_INFO.whatsappRaw}`}>{BUSINESS_INFO.whatsappPhone}</a>
                    </strong>
                  </div>

                  <div className="sidebar-meta-item">
                    <span className="meta-label">Alternate Phone</span>
                    <strong className="meta-val">
                      <a href={`tel:${BUSINESS_INFO.alternatePhoneRaw}`}>{BUSINESS_INFO.alternatePhone}</a>
                    </strong>
                  </div>

                  <div className="sidebar-meta-item">
                    <span className="meta-label">Operating Hours</span>
                    <div className="meta-val">
                      <p>{BUSINESS_INFO.operatingHours.weekdays}</p>
                      <p>{BUSINESS_INFO.operatingHours.sunday}</p>
                    </div>
                  </div>
                </div>

                <div className="sidebar-cta-group">
                  <button
                    type="button"
                    className="btn-primary full-width"
                    onClick={() => openInquiry('Retail (1-10 plants)')}
                  >
                    <Send size={16} />
                    <span>Send Plant Inquiry</span>
                  </button>

                  <a
                    href={BUSINESS_INFO.links.googleMaps}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline full-width"
                  >
                    <MapPin size={16} />
                    <span>View on Google Maps</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
