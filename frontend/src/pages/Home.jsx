import React, { useState } from 'react';
import { useGreenCart } from '../context/GreenCartContext';
import { BUSINESS_INFO, CATEGORIES, PLANTS_DATA } from '../data/plantsData';
import { PlantCard } from '../components/PlantCard';
import { 
  Sprout, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  Send, 
  Phone, 
  MapPin, 
  Layers, 
  Sparkles, 
  Award, 
  Truck, 
  Building, 
  TreePine, 
  Calendar, 
  ExternalLink 
} from 'lucide-react';

export const Home = ({ setActivePage, setSelectedCategory, onSelectPlant }) => {
  const { openInquiry, openCart } = useGreenCart();

  // Featured specimens to showcase on home
  const featuredPlants = [
    PLANTS_DATA.find(p => p.id === 'royal-palm'),
    PLANTS_DATA.find(p => p.id === 'ficus-microcarpa-bonsai'),
    PLANTS_DATA.find(p => p.id === 'croton-petra'),
    PLANTS_DATA.find(p => p.id === 'bougainvillea-multi'),
    PLANTS_DATA.find(p => p.id === 'mango-banganapalli-grafted'),
    PLANTS_DATA.find(p => p.id === 'monstera-deliciosa')
  ].filter(Boolean);

  const handleCategoryClick = (catId) => {
    if (setSelectedCategory) setSelectedCategory(catId);
    if (setActivePage) setActivePage('plants');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="home-page-root">
      {/* =========================================================================
          2. HERO SECTION
          - GREEN SHADE NURSERY
          - Established 1997
          - 29+ Years of Horticultural Heritage
          - Supporting message based on provided business story
          - Primary CTA: Explore Plants
          - Secondary CTA: Send Plant Inquiry
      ========================================================================= */}
      <section className="hero-business-section" aria-label="Nursery Introduction">
        <div className="hero-backdrop-glow"></div>
        <div className="container hero-layout-grid">
          {/* Left Hero Content */}
          <div className="hero-text-column">
            <div className="hero-pill-badge">
              <span className="badge-leaf">🌿</span>
              <span className="badge-text">Established 1997 • 29+ Years of Horticultural Heritage</span>
            </div>

            <h1 className="hero-main-heading">
              GREEN SHADE <span className="highlight-text">NURSERY</span>
            </h1>

            <p className="hero-origin-subtitle">
              Kadiyapu Savaram, Andhra Pradesh — India's Plant Capital
            </p>

            <p className="hero-story-lead">
              Founded in 1997 by <strong>Surapureddy Rama Krishna</strong>, Green Shade Nursery is one of the most trusted plant growers based in Kadiyam Savaram. For over 29 years, we have cultivated genuine horticultural expertise, producing 1,000+ varieties of healthy, 100% locally acclimatized saplings for retail gardeners, bulk B2B nationwide supply, government forestry/highway plantation tenders, and commercial real-estate landscaping.
            </p>

            {/* CTA Buttons */}
            <div className="hero-cta-button-group">
              <button
                type="button"
                className="btn-hero-primary"
                onClick={() => {
                  if (setActivePage) setActivePage('plants');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                <span>Explore Plants</span>
                <ArrowRight size={18} />
              </button>

              <button
                type="button"
                className="btn-hero-secondary"
                onClick={() => openInquiry('Retail (1-10 plants)')}
              >
                <Send size={18} />
                <span>Send Plant Inquiry</span>
              </button>
            </div>

            {/* Key Trust Signals */}
            <div className="hero-trust-metrics">
              <div className="trust-metric-item">
                <div className="metric-number">1997</div>
                <div className="metric-desc">Year Established</div>
              </div>
              <div className="trust-metric-divider"></div>
              <div className="trust-metric-item">
                <div className="metric-number">29+</div>
                <div className="metric-desc">Years Heritage</div>
              </div>
              <div className="trust-metric-divider"></div>
              <div className="trust-metric-item">
                <div className="metric-number">1,000+</div>
                <div className="metric-desc">Plant Varieties</div>
              </div>
              <div className="trust-metric-divider"></div>
              <div className="trust-metric-item">
                <div className="metric-number">100%</div>
                <div className="metric-desc">Kadiyam Acclimatized</div>
              </div>
            </div>
          </div>

          {/* Right Hero Image Collage */}
          <div className="hero-visual-column">
            <div className="hero-visual-frame hero-specimen-stage">
              <img
                src="/images/hero-bonsai-tree.jpg"
                alt="Green Shade Nursery Masterpiece Specimen Bonsai Tree - Kadiyapu Savaram"
                className="hero-main-image hero-specimen-tree"
              />
              <div className="hero-floating-card top-left">
                <ShieldCheck size={20} className="icon-shield" />
                <div>
                  <strong>100% Locally Acclimatized</strong>
                  <p>Nurtured in Kadiyapu Savaram grounds</p>
                </div>
              </div>
              <div className="hero-floating-card bottom-right">
                <TreePine size={20} className="icon-tree" />
                <div>
                  <strong>Surapureddy Rama Krishna</strong>
                  <p>Founder & Owner since 1997</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. BUSINESS TRUST SECTION
          - Established 1997
          - 1,000+ Plant Varieties
          - Locally Acclimatized Plants
          - Retail & B2B Supply
      ========================================================================= */}
      <section className="business-trust-section" aria-label="Business Credentials">
        <div className="container">
          <div className="section-header-centered">
            <span className="section-sub-badge">Why Plant Buyers Trust Us</span>
            <h2 className="section-title">Built on 29+ Years of Genuine Horticultural Heritage</h2>
            <p className="section-subtitle">
              Cultivated in the fertile Godavari delta soil of Kadiyapu Savaram, with proven capability across home gardens, nationwide wholesale logistics, infrastructure tenders, and commercial developments.
            </p>
          </div>

          <div className="trust-cards-grid">
            {/* Card 1: Established 1997 */}
            <div className="trust-feature-card">
              <div className="trust-icon-box">
                <Calendar size={28} />
              </div>
              <h3>Established 1997</h3>
              <p className="trust-card-lead">29+ Years Horticultural Heritage</p>
              <p className="trust-card-body">
                Founded and continuously managed by <strong>Surapureddy Rama Krishna</strong>. Over nearly three decades, our nursery has stood as a dependable landmark in Kadiyam Savaram.
              </p>
              <div className="trust-card-badge">Est. 1997 • Kadiyam</div>
            </div>

            {/* Card 2: 1,000+ Plant Varieties */}
            <div className="trust-feature-card">
              <div className="trust-icon-box">
                <Layers size={28} />
              </div>
              <h3>1,000+ Plant Varieties</h3>
              <p className="trust-card-lead">Extensive Plant Inventory</p>
              <p className="trust-card-body">
                Cultivating six core plant categories: Ornamental plants, mature specimen palms, flowering shrubs, exotic indoor greens, handcrafted bonsai, and high-yielding grafted fruit saplings.
              </p>
              <div className="trust-card-badge">Comprehensive Diversity</div>
            </div>

            {/* Card 3: Locally Acclimatized Plants */}
            <div className="trust-feature-card">
              <div className="trust-icon-box">
                <ShieldCheck size={28} />
              </div>
              <h3>Locally Acclimatized Plants</h3>
              <p className="trust-card-lead">100% Nurtured in Kadiyam Soil</p>
              <p className="trust-card-body">
                Every plant is hardened directly in the open ground and shade structures of Kadiyapu Savaram, guaranteeing resilient root balls that thrive during long-distance transit and repotting.
              </p>
              <div className="trust-card-badge">Zero Transplant Shock</div>
            </div>

            {/* Card 4: Retail & B2B Supply */}
            <div className="trust-feature-card">
              <div className="trust-icon-box">
                <Truck size={28} />
              </div>
              <h3>Retail & B2B Wholesale Supply</h3>
              <p className="trust-card-lead">From 1 Plant to Truckload Quantities</p>
              <p className="trust-card-body">
                Serving individual home gardeners alongside all-India nursery wholesalers, commercial real-estate developers, and government highway/forestry plantation tenders.
              </p>
              <div className="trust-card-badge">All-India Logistics</div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. PLANT CATEGORIES
          - Ornamental Plants
          - Mature Specimen Palms
          - Flowering Shrubs
          - Exotic Indoor Greens
          - Handcrafted Bonsai
          - Grafted Fruit Saplings
          (Each category leads to filtered plants)
      ========================================================================= */}
      <section className="plant-categories-section" aria-label="Plant Categories">
        <div className="container">
          <div className="section-header-split">
            <div>
              <span className="section-sub-badge">Plant Categories</span>
              <h2 className="section-title">Explore Our 6 Core Plant Categories</h2>
              <p className="section-subtitle">
                Select any category to browse our acclimatized nursery stock and add specimens directly to your <strong>Green Cart</strong>.
              </p>
            </div>
            <button
              type="button"
              className="btn-outline-viewall"
              onClick={() => {
                if (setSelectedCategory) setSelectedCategory('all');
                if (setActivePage) setActivePage('plants');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <span>View All Varieties</span>
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="categories-card-grid">
            {CATEGORIES.filter(c => c.id !== 'all').map((category) => (
              <div
                key={category.id}
                className="category-showcase-card"
                onClick={() => handleCategoryClick(category.id)}
                role="button"
                tabIndex={0}
              >
                <div className="category-image-wrap">
                  <img src={category.image} alt={category.name} loading="lazy" />
                  <div className="category-overlay-gradient"></div>
                  <span className="category-corner-badge">{category.badge}</span>
                </div>
                <div className="category-card-body">
                  <h3 className="category-card-title">{category.name}</h3>
                  <p className="category-card-desc">{category.description}</p>
                  <div className="category-card-action">
                    <span>Browse {category.shortName}</span>
                    <ArrowRight size={16} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. FEATURED NURSERY SPECIMENS
          - Curated plants from our Kadiyam nursery
          - Quick Add to Green Cart
          - View Details Modal
      ========================================================================= */}
      <section className="featured-plants-section" aria-label="Featured Nursery Plants">
        <div className="container">
          <div className="section-header-split">
            <div>
              <span className="section-sub-badge">Handpicked Stock</span>
              <h2 className="section-title">Featured Nursery Specimens</h2>
              <p className="section-subtitle">
                Acclimatized plants currently in prime readiness on our nursery grounds. Add directly to your Green Cart for availability and quotation.
              </p>
            </div>
            <button
              type="button"
              className="btn-outline-viewall"
              onClick={() => {
                if (setActivePage) setActivePage('plants');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <span>Browse 1,000+ Varieties</span>
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="plants-showcase-grid">
            {featuredPlants.map((plant) => (
              <PlantCard
                key={plant.id}
                plant={plant}
                onSelectPlant={onSelectPlant}
              />
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          6. SERVICE CAPABILITIES (B2B, Tenders, Landscaping, Retail)
      ========================================================================= */}
      <section className="business-capabilities-section" aria-label="Nursery Services">
        <div className="container">
          <div className="section-header-centered">
            <span className="section-sub-badge">Professional Capabilities</span>
            <h2 className="section-title">Serving Gardeners, Contractors & Government Projects</h2>
            <p className="section-subtitle">
              With 29+ years of field experience in Kadiyapu Savaram, Green Shade Nursery handles projects of any scale.
            </p>
          </div>

          <div className="capabilities-grid">
            {BUSINESS_INFO.capabilities.map((cap, idx) => (
              <div key={idx} className="capability-card">
                <div className="cap-number">0{idx + 1}</div>
                <h3 className="cap-title">{cap.title}</h3>
                <span className="cap-subtitle">{cap.subtitle}</span>
                <p className="cap-desc">{cap.description}</p>
                <button
                  type="button"
                  className="btn-cap-inquiry"
                  onClick={() => openInquiry(
                    idx === 0 ? 'Retail (1-10 plants)' :
                    idx === 1 ? 'Bulk B2B' :
                    idx === 2 ? 'Govt Tender' : 'Commercial Project'
                  )}
                >
                  <span>Submit Inquiry for {cap.title.split(' ')[0]}</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          7. ABOUT FOUNDER & KADIYAM HERITAGE
          - Surapureddy Rama Krishna story
          - Strictly adhering to provided facts
      ========================================================================= */}
      <section className="founder-story-section" aria-label="Founder and Heritage">
        <div className="container founder-story-grid">
          <div className="founder-story-image-wrap">
            <img
              src="https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=900&q=80"
              alt="Green Shade Nursery Cultivation in Kadiyapu Savaram"
              className="founder-story-img"
            />
            <div className="founder-badge-overlay">
              <strong>Surapureddy Rama Krishna</strong>
              <span>Founder & Plant Grower since 1997</span>
            </div>
          </div>

          <div className="founder-story-content">
            <span className="section-sub-badge">Founder's Heritage</span>
            <h2 className="section-title">Over 29 Years of Horticultural Dedication</h2>
            
            <p className="founder-narrative-p">
              Founded in 1997 by <strong>Surapureddy Rama Krishna</strong>, Green Shade Nursery is one of the most trusted plant growers based in <strong>Kadiyam Savaram, Andhra Pradesh</strong> — India's plant nursery hub.
            </p>

            <p className="founder-narrative-p">
              Over the past 29 years, Surapureddy Rama Krishna and his team have built a reputation for genuine horticultural expertise, healthy acclimatized saplings, and dependable customer service.
            </p>

            <div className="story-highlights-list">
              <div className="story-highlight-item">
                <CheckCircle2 size={18} className="text-emerald" />
                <span><strong>100% locally acclimatized plants</strong> nurtured directly in the nursery grounds of Kadiyam Savaram.</span>
              </div>
              <div className="story-highlight-item">
                <CheckCircle2 size={18} className="text-emerald" />
                <span><strong>1,000+ varieties</strong> including ornamental plants, specimen palms, flowering shrubs, exotic greens, bonsai, and fruit saplings.</span>
              </div>
              <div className="story-highlight-item">
                <CheckCircle2 size={18} className="text-emerald" />
                <span>Full capacity for <strong>retail sales, bulk B2B wholesale across India, government forestry/highway plantation tenders, and commercial real-estate landscaping.</strong></span>
              </div>
            </div>

            <div className="founder-action-row">
              <button
                type="button"
                className="btn-primary"
                onClick={() => {
                  if (setActivePage) setActivePage('about');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                <span>Read Full Nursery Profile</span>
                <ArrowRight size={16} />
              </button>

              <a
                href={BUSINESS_INFO.links.googleMaps}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-viewall"
              >
                <MapPin size={16} />
                <span>Visit Nursery in Kadiyam</span>
              </a>
            </div>
          </div>
        </div>
      </section>


      {/* =========================================================================
          9. DIRECT CONTACT & LOCATION SECTION
      ========================================================================= */}
      <section className="home-contact-preview-section" aria-label="Contact and Map">
        <div className="container contact-preview-grid">
          <div className="contact-preview-info">
            <span className="section-sub-badge">Direct Nursery Desk</span>
            <h2 className="section-title">Visit or Contact Green Shade Nursery</h2>
            <p className="section-subtitle">
              Located on Main Road Kadiyapu Savaram, East Godavari District. Open 7 days a week.
            </p>

            <div className="contact-meta-card">
              <div className="meta-row">
                <MapPin size={20} className="meta-icon" />
                <div>
                  <strong>Nursery Location:</strong>
                  <p>{BUSINESS_INFO.address}</p>
                </div>
              </div>

              <div className="meta-row">
                <Phone size={20} className="meta-icon" />
                <div>
                  <strong>Primary & WhatsApp:</strong>
                  <p>
                    <a href={`tel:${BUSINESS_INFO.whatsappRaw}`}>{BUSINESS_INFO.whatsappPhone}</a>
                  </p>
                  <strong>Alternate Phone:</strong>
                  <p>
                    <a href={`tel:${BUSINESS_INFO.alternatePhoneRaw}`}>{BUSINESS_INFO.alternatePhone}</a>
                  </p>
                </div>
              </div>

              <div className="meta-row">
                <Calendar size={20} className="meta-icon" />
                <div>
                  <strong>Operating Hours:</strong>
                  <p>{BUSINESS_INFO.operatingHours.weekdays}</p>
                  <p>{BUSINESS_INFO.operatingHours.sunday}</p>
                </div>
              </div>
            </div>

            <div className="contact-cta-buttons">
              <a
                href={`https://wa.me/${BUSINESS_INFO.whatsappRaw}?text=${encodeURIComponent(
                  "Hello Surapreddy Rama Krishna & Green Shade Nursery Team,\nI would like to inquire about visiting your nursery grounds in Kadiyapu Savaram."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp-large"
              >
                <Send size={18} />
                <span>Chat with Nursery Desk (+91 9666004249)</span>
              </a>

              <a
                href={BUSINESS_INFO.links.googleMaps}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-map-directions"
              >
                <MapPin size={18} />
                <span>Open Google Maps</span>
              </a>
            </div>
          </div>

          <div className="contact-map-card">
            <iframe
              title="Green Shade Nursery Kadiyapu Savaram Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3817.378949514801!2d81.84918737516386!3d16.90695098389658!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a37956972410bf1%3A0xe5a3c1c876e5dbe4!2sKadiyapu%20Savaram%2C%20Andhra%20Pradesh!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '380px', borderRadius: '16px' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
};
