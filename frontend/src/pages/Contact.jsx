import React, { useState } from 'react';
import { BUSINESS_INFO } from '../data/plantsData';
import { useGreenCart } from '../context/GreenCartContext';
import { 
  MapPin, 
  Phone, 
  Clock, 
  Send, 
  ExternalLink, 
  Instagram, 
  Building2, 
  ShieldCheck, 
  Copy, 
  Check, 
  User, 
  MessageSquare 
} from 'lucide-react';

export const Contact = () => {
  const { openInquiry, showToast } = useGreenCart();
  const [copiedPhone, setCopiedPhone] = useState(false);

  const copyPhoneNumber = (phoneStr) => {
    navigator.clipboard.writeText(phoneStr);
    setCopiedPhone(true);
    showToast(`Copied ${phoneStr} to clipboard`, 'success');
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  return (
    <div className="contact-page-root">
      {/* Header */}
      <section className="contact-hero-banner">
        <div className="container">
          <span className="contact-sub-pill">
            <ShieldCheck size={16} /> Direct Horticultural Desk • Kadiyapu Savaram
          </span>
          <h1 className="contact-main-heading">Contact Green Shade Nursery</h1>
          <p className="contact-lead-sub">
            Get in touch with <strong>Founder Surapureddy Rama Krishna</strong> and our plant nursery team for plant availability, pricing quotations, and nursery visit appointments.
          </p>
        </div>
      </section>

      {/* Main Contact Grid */}
      <section className="contact-details-section">
        <div className="container contact-split-layout">
          {/* Left: Contact Info Cards */}
          <div className="contact-cards-column">
            {/* Primary Phone / WhatsApp Card */}
            <div className="contact-card-highlight">
              <div className="card-badge-top">Primary Business Contact</div>
              <div className="contact-card-body">
                <div className="card-icon-round green">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="card-item-title">WhatsApp & Primary Phone</h3>
                  <a href={`tel:${BUSINESS_INFO.whatsappRaw}`} className="phone-main-link">
                    {BUSINESS_INFO.whatsappPhone}
                  </a>
                  <p className="contact-note">
                    Instant availability confirmation, batch photos, and freight quotation on WhatsApp.
                  </p>
                  <div className="contact-card-actions">
                    <a
                      href={`https://wa.me/${BUSINESS_INFO.whatsappRaw}?text=${encodeURIComponent(
                        "Hello Surapreddy Rama Krishna & Green Shade Nursery Team,\nI would like to place an inquiry for plants from your Kadiyapu Savaram nursery."
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-card-wa"
                    >
                      <Send size={15} />
                      <span>Chat on WhatsApp</span>
                    </a>
                    <button
                      type="button"
                      className="btn-card-copy"
                      onClick={() => copyPhoneNumber(BUSINESS_INFO.whatsappPhone)}
                    >
                      {copiedPhone ? <Check size={15} /> : <Copy size={15} />}
                      <span>Copy Number</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Alternate Phone */}
            <div className="contact-info-card">
              <div className="contact-card-body">
                <div className="card-icon-round blue">
                  <Phone size={20} />
                </div>
                <div>
                  <h4 className="card-item-title">Alternate Phone Line</h4>
                  <a href={`tel:${BUSINESS_INFO.alternatePhoneRaw}`} className="phone-sub-link">
                    {BUSINESS_INFO.alternatePhone}
                  </a>
                  <p className="contact-note">Secondary line for project inquiries and office dispatch.</p>
                </div>
              </div>
            </div>

            {/* Physical Address */}
            <div className="contact-info-card">
              <div className="contact-card-body">
                <div className="card-icon-round gold">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="card-item-title">Nursery Grounds Address</h4>
                  <p className="address-text">{BUSINESS_INFO.address}</p>
                  <a
                    href={BUSINESS_INFO.links.googleMaps}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="directions-link"
                  >
                    <span>Open in Google Maps</span>
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            </div>

            {/* Operating Hours */}
            <div className="contact-info-card">
              <div className="contact-card-body">
                <div className="card-icon-round orange">
                  <Clock size={20} />
                </div>
                <div>
                  <h4 className="card-item-title">Operating Hours</h4>
                  <p className="hours-line"><strong>{BUSINESS_INFO.operatingHours.weekdays}</strong></p>
                  <p className="hours-line"><strong>{BUSINESS_INFO.operatingHours.sunday}</strong></p>
                  <span className="open-pill">Open 7 Days a Week</span>
                </div>
              </div>
            </div>

            {/* Verified Business Profiles */}
            <div className="contact-info-card">
              <div className="contact-card-body">
                <div className="card-icon-round purple">
                  <Building2 size={20} />
                </div>
                <div className="profiles-full-width">
                  <h4 className="card-item-title">Official Online Profiles</h4>
                  <div className="contact-profile-links-row">
                    <a
                      href={BUSINESS_INFO.links.indiamart}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="profile-box-link"
                    >
                      <strong>IndiaMART Official Profile</strong>
                      <span>Verified Business Supplier <ExternalLink size={12} /></span>
                    </a>

                    <a
                      href={BUSINESS_INFO.links.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="profile-box-link"
                    >
                      <strong>Instagram Channel</strong>
                      <span>@kadiyamgreenshadenursery <ExternalLink size={12} /></span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Map Embed & Direct Inquiry Trigger */}
          <div className="contact-map-column">
            <div className="map-frame-box">
              <div className="map-header-bar">
                <MapPin size={18} className="text-emerald" />
                <span>Green Shade Nursery Location Map — Kadiyapu Savaram</span>
              </div>
              <iframe
                title="Green Shade Nursery Kadiyapu Savaram Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3817.378949514801!2d81.84918737516386!3d16.90695098389658!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a37956972410bf1%3A0xe5a3c1c876e5dbe4!2sKadiyapu%20Savaram%2C%20Andhra%20Pradesh!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin"
                width="100%"
                height="420"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
              <div className="map-footer-bar">
                <a
                  href={BUSINESS_INFO.links.googleMaps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-map-nav-full"
                >
                  <MapPin size={16} />
                  <span>Navigate with Google Maps Navigation</span>
                </a>
              </div>
            </div>

            {/* Quick Inquiry CTA Card */}
            <div className="inquiry-cta-card">
              <div className="cta-icon-wrap">
                <MessageSquare size={28} />
              </div>
              <h3>Have Plants to Inquire About?</h3>
              <p>
                Use our interactive <strong>Green Cart</strong> system to select plants and automatically generate an official quotation request for Surapureddy Rama Krishna.
              </p>
              <button
                type="button"
                className="btn-primary full-width"
                onClick={() => openInquiry('Retail (1-10 plants)')}
              >
                <span>Launch Plant Inquiry Form</span>
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
