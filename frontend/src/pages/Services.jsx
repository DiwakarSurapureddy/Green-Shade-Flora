import React from 'react';
import { useGreenCart } from '../context/GreenCartContext';
import { BUSINESS_INFO } from '../data/plantsData';
import { 
  Sprout, 
  Truck, 
  TreePine, 
  Building2, 
  ShieldCheck, 
  Send, 
  ArrowRight, 
  CheckCircle2, 
  Phone 
} from 'lucide-react';

export const Services = ({ setActivePage }) => {
  const { openInquiry } = useGreenCart();

  const servicesList = [
    {
      id: 'retail',
      orderType: 'Retail (1-10 plants)',
      title: 'Retail Sales for Home Gardeners',
      badge: 'Home & Villa Gardens',
      icon: Sprout,
      summary: 'Direct nursery plant selection for home gardens, terrace gardeners, and indoor plant collectors.',
      points: [
        'Curated selection of ornamental shrubs, flowering blooms, and rare bonsai.',
        '100% locally acclimatized plants with strong root balls.',
        'Personalized horticultural guidance directly from nursery experts.',
        'Safe packaging and transport options for home delivery.'
      ],
      ctaText: 'Inquire for Retail Plants'
    },
    {
      id: 'wholesale',
      orderType: 'Bulk B2B',
      title: 'Bulk B2B Wholesale Supply Across India',
      badge: 'Nationwide B2B Logistics',
      icon: Truck,
      summary: 'High-volume sapling supply for plant nurseries, wholesale dealers, and commercial farmhouses nationwide.',
      points: [
        'Direct sourcing from the nursery hub of Kadiyapu Savaram.',
        'Rigorous grading, root-ball hardening, and truckload packing.',
        'Extensive inventory of 1,000+ varieties ready for repeat supply.',
        'Competitive wholesale volume pricing without middlemen.'
      ],
      ctaText: 'Inquire for Bulk B2B Wholesale'
    },
    {
      id: 'tenders',
      orderType: 'Govt Tender',
      title: 'Government Forestry & Highway Plantation Tenders',
      badge: 'Civil Infrastructure & Afforestation',
      icon: TreePine,
      summary: 'Reliable execution capacity for state forestry departments, national highway dividers, and municipal parks.',
      points: [
        'Hardy native trees, roadside palms, and divider flowering shrubs.',
        'Strict adherence to tender specifications, height calipers, and root sizing.',
        'Proven capacity to supply tens of thousands of acclimatized saplings on schedule.',
        'High survival rates under harsh roadside and public park environments.'
      ],
      ctaText: 'Inquire for Tender Supply'
    },
    {
      id: 'commercial',
      orderType: 'Commercial Project',
      title: 'Commercial Real-Estate Landscaping',
      badge: 'Resorts, Campuses & Estates',
      icon: Building2,
      summary: 'Turnkey plant supply for luxury hospitality, corporate IT campuses, gated residential communities, and farmhouses.',
      points: [
        'Mature specimen avenue palms (Royal, Foxtail, Bismarckia).',
        'Lush ornamental hedges, mass groundcovers, and feature tree plantings.',
        'Coordinated site deliveries matched to landscape installation phases.',
        'Direct liaison with landscape architects and site contractors.'
      ],
      ctaText: 'Inquire for Commercial Landscaping'
    }
  ];

  return (
    <div className="services-page-root">
      {/* Header Banner */}
      <section className="services-header-section">
        <div className="container">
          <span className="services-origin-pill">
            <ShieldCheck size={16} /> 29+ Years Horticultural Execution from Kadiyapu Savaram
          </span>
          <h1 className="services-main-title">Professional Nursery Services</h1>
          <p className="services-lead-text">
            Green Shade Nursery delivers dependable plant supply and horticultural expertise tailored to private residences, commercial enterprises, and public infrastructure projects.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="services-detail-section">
        <div className="container">
          <div className="services-stacked-grid">
            {servicesList.map((srv, idx) => {
              const IconComponent = srv.icon;
              return (
                <div key={srv.id} className="service-detail-card">
                  <div className="card-top-indicator">
                    <span className="service-index">Capability 0{idx + 1}</span>
                    <span className="service-tag">{srv.badge}</span>
                  </div>

                  <div className="service-card-core">
                    <div className="service-card-left">
                      <div className="service-icon-bubble">
                        <IconComponent size={32} />
                      </div>
                      <h3>{srv.title}</h3>
                      <p className="service-desc">{srv.summary}</p>

                      <button
                        type="button"
                        className="btn-service-action"
                        onClick={() => openInquiry(srv.orderType)}
                      >
                        <Send size={16} />
                        <span>{srv.ctaText}</span>
                      </button>
                    </div>

                    <div className="service-card-right">
                      <h4 className="checklist-heading">Key Capabilities:</h4>
                      <ul className="service-points-checklist">
                        {srv.points.map((pt, pIdx) => (
                          <li key={pIdx}>
                            <CheckCircle2 size={18} className="text-emerald" />
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Direct Consultation Band */}
          <div className="nursery-consultation-banner">
            <div>
              <h3>Have Custom Tender Requirements or Project Specifications?</h3>
              <p>
                Speak directly with <strong>Founder Surapureddy Rama Krishna</strong> at <strong>{BUSINESS_INFO.whatsappPhone}</strong> or send your list for a formal price and stock quotation.
              </p>
            </div>
            <div className="consult-buttons-wrap">
              <button
                type="button"
                className="btn-primary"
                onClick={() => openInquiry('Commercial Project')}
              >
                <span>Request Project Quotation</span>
                <ArrowRight size={16} />
              </button>
              <a
                href={`https://wa.me/${BUSINESS_INFO.whatsappRaw}?text=${encodeURIComponent(
                  "Hello Surapreddy Rama Krishna & Green Shade Nursery Team,\nI would like to discuss a commercial project / tender inquiry with Green Shade Nursery."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-whatsapp"
              >
                <span>WhatsApp Business Desk</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
