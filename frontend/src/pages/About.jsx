import React from 'react';
import { BUSINESS_INFO } from '../data/plantsData';
import { useGreenCart } from '../context/GreenCartContext';
import { 
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
  Truck,
  ArrowUpRight,
  Sparkles,
  Sprout,
  Flower2,
  Trees,
  UserCheck,
  Award,
  ArrowRight
} from 'lucide-react';

export const About = ({ setActivePage, setSelectedCategory }) => {
  const { openInquiry } = useGreenCart();

  const handleCategoryNav = (categoryId) => {
    if (setSelectedCategory) setSelectedCategory(categoryId);
    if (setActivePage) setActivePage('plants');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="about-page-root">
      
      {/* =========================================================================
          1. RADIANT "OUR STORY" SHOWCASE SECTION (MATCHES USER DESIGN 100%)
          - Radiant dark forest green gradient
          - Botanical flower petal watermark backdrop
          - Left: Founder photo (Surapureddy Rama Krishna) with rounded corners & glow
          - Right: Luminous glowing "Our Story" title, exact narrative matter, & stats
      ========================================================================= */}
      <section className="radiant-story-section" aria-label="Our Story">
        
        {/* Ambient Botanical Petal Watermarks */}
        <div className="botanical-watermark watermark-left" aria-hidden="true">
          <svg viewBox="0 0 200 200" fill="currentColor">
            <circle cx="100" cy="100" r="30" />
            <ellipse cx="100" cy="35" rx="18" ry="30" />
            <ellipse cx="100" cy="165" rx="18" ry="30" />
            <ellipse cx="35" cy="100" rx="30" ry="18" />
            <ellipse cx="165" cy="100" rx="30" ry="18" />
            <ellipse cx="54" cy="54" rx="26" ry="16" transform="rotate(-45 54 54)" />
            <ellipse cx="146" cy="146" rx="26" ry="16" transform="rotate(-45 146 146)" />
            <ellipse cx="146" cy="54" rx="26" ry="16" transform="rotate(45 146 54)" />
            <ellipse cx="54" cy="146" rx="26" ry="16" transform="rotate(45 54 146)" />
          </svg>
        </div>

        <div className="botanical-watermark watermark-right" aria-hidden="true">
          <svg viewBox="0 0 200 200" fill="currentColor">
            <circle cx="100" cy="100" r="30" />
            <ellipse cx="100" cy="35" rx="18" ry="30" />
            <ellipse cx="100" cy="165" rx="18" ry="30" />
            <ellipse cx="35" cy="100" rx="30" ry="18" />
            <ellipse cx="165" cy="100" rx="30" ry="18" />
            <ellipse cx="54" cy="54" rx="26" ry="16" transform="rotate(-45 54 54)" />
            <ellipse cx="146" cy="146" rx="26" ry="16" transform="rotate(-45 146 146)" />
            <ellipse cx="146" cy="54" rx="26" ry="16" transform="rotate(45 146 54)" />
            <ellipse cx="54" cy="146" rx="26" ry="16" transform="rotate(45 54 146)" />
          </svg>
        </div>

        <div className="container">
          <div className="radiant-story-grid">
            
            {/* Left Column: Founder Photo Card */}
            <div className="radiant-photo-column">
              <div className="radiant-photo-frame">
                <img 
                  src="/images/founder-story.png" 
                  alt="Surapureddy Rama Krishna - Founder of Green Shade Nursery in Kadiyapu Savaram"
                  className="radiant-founder-image"
                />
                <div className="radiant-photo-glow-border"></div>
              </div>
            </div>

            {/* Right Column: Story Narrative & Stats */}
            <div className="radiant-narrative-column">
              
              <div className="radiant-title-wrapper">
                <h1 className="radiant-story-title">Our Story</h1>
                <div className="radiant-title-glow-line"></div>
              </div>

              <div className="radiant-story-paragraphs">
                <p>
                  Green Shade Nursery was founded in 1997 by <strong>Surapureddy Rama Krishna</strong> with a clear mission: to offer high-quality plants, honest advice, and reliable service to every customer in Andhra Pradesh.
                </p>

                <p>
                  Today, our dedicated team is known for delivering healthy, locally grown plants and practical guidance that helps new gardeners and experienced growers achieve beautiful, long-lasting results.
                </p>

                <p>
                  We earn trust through quality, consistency, and a commitment to understanding each customer's needs — whether the project is a small home garden, a public landscape, or a commercial planting.
                </p>

                <p>
                  Every visit to Green Shade Nursery is backed by our promise to make plant selection simple, caring support easy to access, and plant care success more certain.
                </p>
              </div>

              {/* Stats Counter Row (Matches Mockup) */}
              <div className="radiant-stats-row">
                <div className="radiant-stat-item">
                  <div className="radiant-stat-num">1997</div>
                  <div className="radiant-stat-label">FOUNDED</div>
                </div>

                <div className="radiant-stat-item">
                  <div className="radiant-stat-num">1000+</div>
                  <div className="radiant-stat-label">VARIETIES</div>
                </div>

                <div className="radiant-stat-item">
                  <div className="radiant-stat-num">1K+</div>
                  <div className="radiant-stat-label">SATISFIED CUSTOMERS</div>
                </div>

                <div className="radiant-stat-item">
                  <div className="radiant-stat-num">29+</div>
                  <div className="radiant-stat-label">YEARS HERITAGE</div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          2. PLANT VARIETIES PORTFOLIO (6 CORE CATEGORIES)
      ========================================================================= */}
      <section className="about-details-section" aria-label="Plant Varieties Portfolio">
        <div className="container">
          
          <div className="about-section-header">
            <span className="about-kicker-badge">Cultivated in Kadiyam</span>
            <h2 className="about-section-h2">1,000+ Plant Varieties Across 6 Core Categories</h2>
            <p className="about-section-desc">
              Every specimen is hardened directly in our nursery grounds to guarantee dense root balls, deep resilience, and zero transplant shock.
            </p>
          </div>

          <div className="portfolio-categories-grid">
            
            <div 
              className="portfolio-cat-card"
              onClick={() => handleCategoryNav('ornamental')}
              role="button"
              tabIndex={0}
            >
              <div className="portfolio-cat-icon">
                <Sprout size={24} />
              </div>
              <div className="portfolio-cat-content">
                <h3>Ornamental Plants</h3>
                <p>Architectural foliage, variegated crotons, aglaonemas, and colorful landscape shrubs.</p>
                <span className="cat-browse-link">
                  <span>Browse Category</span>
                  <ArrowRight size={14} />
                </span>
              </div>
            </div>

            <div 
              className="portfolio-cat-card"
              onClick={() => handleCategoryNav('palms')}
              role="button"
              tabIndex={0}
            >
              <div className="portfolio-cat-icon">
                <Trees size={24} />
              </div>
              <div className="portfolio-cat-content">
                <h3>Mature Specimen Palms</h3>
                <p>Majestic Royal palms, Foxtail palms, and monumental avenue specimens for resorts & villas.</p>
                <span className="cat-browse-link">
                  <span>Browse Category</span>
                  <ArrowRight size={14} />
                </span>
              </div>
            </div>

            <div 
              className="portfolio-cat-card"
              onClick={() => handleCategoryNav('flowering')}
              role="button"
              tabIndex={0}
            >
              <div className="portfolio-cat-icon">
                <Flower2 size={24} />
              </div>
              <div className="portfolio-cat-content">
                <h3>Flowering Shrubs</h3>
                <p>All-season perennial blooms, multi-color bougainvilleas, hibiscus, and fragrant climbers.</p>
                <span className="cat-browse-link">
                  <span>Browse Category</span>
                  <ArrowRight size={14} />
                </span>
              </div>
            </div>

            <div 
              className="portfolio-cat-card"
              onClick={() => handleCategoryNav('indoor')}
              role="button"
              tabIndex={0}
            >
              <div className="portfolio-cat-icon">
                <Sparkles size={24} />
              </div>
              <div className="portfolio-cat-content">
                <h3>Exotic Indoor Greens</h3>
                <p>Air-purifying tropical foliage, monsteras, philodendrons, and premium interior decor plants.</p>
                <span className="cat-browse-link">
                  <span>Browse Category</span>
                  <ArrowRight size={14} />
                </span>
              </div>
            </div>

            <div 
              className="portfolio-cat-card"
              onClick={() => handleCategoryNav('bonsai')}
              role="button"
              tabIndex={0}
            >
              <div className="portfolio-cat-icon">
                <TreePine size={24} />
              </div>
              <div className="portfolio-cat-content">
                <h3>Handcrafted Bonsai</h3>
                <p>Decades-old trained Ficus microcarpa, Adenium obesum, and artistic living tabletop sculptures.</p>
                <span className="cat-browse-link">
                  <span>Browse Category</span>
                  <ArrowRight size={14} />
                </span>
              </div>
            </div>

            <div 
              className="portfolio-cat-card"
              onClick={() => handleCategoryNav('fruit')}
              role="button"
              tabIndex={0}
            >
              <div className="portfolio-cat-icon">
                <Award size={24} />
              </div>
              <div className="portfolio-cat-content">
                <h3>Grafted Fruit Saplings</h3>
                <p>High-yielding grafted mangoes, guavas, lemons, and chikoo saplings on sturdy rootstocks.</p>
                <span className="cat-browse-link">
                  <span>Browse Category</span>
                  <ArrowRight size={14} />
                </span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          3. CULTIVATION METHODOLOGY & CAPABILITIES (DUAL SECTION)
      ========================================================================= */}
      <section className="about-capabilities-section" aria-label="Capabilities and Fact Sheet">
        <div className="container">
          
          <div className="about-duo-grid">
            
            {/* Left Column: Cultivation & 4 Segments */}
            <div className="duo-narrative-box">
              
              <div className="methodology-card">
                <span className="card-mini-kicker">Cultivation Methodology</span>
                <h3>100% Locally Acclimatized Cultivation</h3>
                <p>
                  Every plant in our collection is hardened directly in the open nursery grounds and shade structures of <strong>Kadiyapu Savaram</strong>. The mineral-rich alluvial soil of the Godavari delta, paired with decades of horticultural hardening, produces dense root balls with superior biological resilience.
                </p>

                <div className="transplant-guarantee-strip">
                  <CheckCircle2 size={22} className="guarantee-icon" />
                  <div>
                    <strong>Zero Transplant Shock Guarantee:</strong>
                    <span>Resilient root balls easily adapt to long-distance transport and diverse climate zones across India.</span>
                  </div>
                </div>
              </div>

              <div className="capabilities-segment-block">
                <span className="card-mini-kicker">Procurement Readiness</span>
                <h3>Scale & Supply Capabilities</h3>
                
                <div className="segment-items-stack">
                  
                  <div className="segment-row">
                    <span className="seg-number">01</span>
                    <div>
                      <h4>Retail Sales for Home Gardeners</h4>
                      <p>Direct nursery sales of acclimatized potted plants, ornamental foliage, and flowering varieties for private gardens and balconies.</p>
                    </div>
                  </div>

                  <div className="segment-row">
                    <span className="seg-number">02</span>
                    <div>
                      <h4>Bulk B2B Wholesale Supply Across India</h4>
                      <p>Volume sapling dispatch with dependable all-India freight logistics for retail nurseries and landscape contractors.</p>
                    </div>
                  </div>

                  <div className="segment-row">
                    <span className="seg-number">03</span>
                    <div>
                      <h4>Government Forestry & Highway Tenders</h4>
                      <p>Large-scale supply of hardy avenue trees, windbreak species, and slope shrubs for public civil greening drives.</p>
                    </div>
                  </div>

                  <div className="segment-row">
                    <span className="seg-number">04</span>
                    <div>
                      <h4>Commercial Real-Estate & Township Landscaping</h4>
                      <p>Turnkey specimen plant supply for corporate tech parks, luxury resorts, gated communities, and campuses.</p>
                    </div>
                  </div>

                </div>
              </div>

            </div>

            {/* Right Column: Official Fact Sheet & Verified Business Profile Card */}
            <div className="duo-profile-box">
              
              <div className="official-factsheet-card">
                
                <div className="factsheet-header">
                  <div className="factsheet-logo-badge">🌿</div>
                  <div>
                    <h3 className="factsheet-nursery-name">Green Shade Nursery</h3>
                    <div className="factsheet-tag">
                      <ShieldCheck size={14} />
                      <span>Official Business Fact Sheet</span>
                    </div>
                  </div>
                </div>

                <div className="factsheet-rows-list">
                  
                  <div className="factsheet-entry">
                    <UserCheck size={18} className="entry-icon" />
                    <div>
                      <span className="entry-label">Founder & Owner</span>
                      <strong className="entry-value">Surapureddy Rama Krishna</strong>
                    </div>
                  </div>

                  <div className="factsheet-entry">
                    <Calendar size={18} className="entry-icon" />
                    <div>
                      <span className="entry-label">Established</span>
                      <strong className="entry-value">1997 (29+ Years of Horticultural Heritage)</strong>
                    </div>
                  </div>

                  <div className="factsheet-entry">
                    <Layers size={18} className="entry-icon" />
                    <div>
                      <span className="entry-label">Plant Varieties Count</span>
                      <strong className="entry-value">1,000+ Locally Acclimatized (6 Categories)</strong>
                    </div>
                  </div>

                  <div className="factsheet-entry">
                    <MapPin size={18} className="entry-icon" />
                    <div>
                      <span className="entry-label">Physical Address</span>
                      <p className="entry-address">
                        Main Road Kadiyapu Savaram, Kadiyam Mandal, East Godavari District, Andhra Pradesh - 533126, India
                      </p>
                      <span className="entry-badge">Main Road Kadiyapu Savaram, AP - 533126</span>
                    </div>
                  </div>

                  <div className="factsheet-entry">
                    <Phone size={18} className="entry-icon" />
                    <div>
                      <span className="entry-label">WhatsApp / Primary</span>
                      <a href="tel:+919666004249" className="entry-link highlight-tel">
                        +91 9666004249
                      </a>
                    </div>
                  </div>

                  <div className="factsheet-entry">
                    <Phone size={18} className="entry-icon" />
                    <div>
                      <span className="entry-label">Alternate Phone</span>
                      <a href="tel:+918885322259" className="entry-link">
                        +91 8885322259
                      </a>
                    </div>
                  </div>

                  <div className="factsheet-entry">
                    <Clock size={18} className="entry-icon" />
                    <div>
                      <span className="entry-label">Operating Hours</span>
                      <div className="entry-hours">
                        <p><strong>Mon – Sat:</strong> 7:00 AM – 8:00 PM</p>
                        <p><strong>Sunday:</strong> 8:00 AM – 7:00 PM</p>
                      </div>
                    </div>
                  </div>

                </div>

                <div className="factsheet-actions">
                  <button 
                    type="button" 
                    className="btn-factsheet-inquiry"
                    onClick={() => openInquiry('General Nursery Inquiry')}
                  >
                    <Send size={18} />
                    <span>Send Plant Inquiry</span>
                  </button>

                  <a 
                    href="https://maps.app.goo.gl/VLhAsdzmJZF7w7Wq7?g_st=ac"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-factsheet-maps"
                  >
                    <MapPin size={18} />
                    <span>View on Google Maps</span>
                    <ArrowUpRight size={16} />
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
