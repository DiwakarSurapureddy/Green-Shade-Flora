import React from 'react';
import { BUSINESS_INFO } from '../data/plantsData';
import { Send } from 'lucide-react';

export const FloatingActions = () => {
  return (
    <div className="floating-actions-container">
      {/* Floating WhatsApp Quick Connect Button */}
      <a
        href={`https://wa.me/${BUSINESS_INFO.whatsappRaw}?text=${encodeURIComponent(
          "Hello Surapreddy Rama Krishna & Green Shade Nursery Team,\nI am browsing your website and would like to inquire about plant availability."
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="floating-whatsapp-btn"
        title="Chat on WhatsApp (+91 9666004249)"
        aria-label="Chat on WhatsApp"
      >
        <div className="wa-pulse-ring"></div>
        <div className="wa-icon-box">
          <Send size={22} />
        </div>
        <span className="wa-tooltip-text">Inquire on WhatsApp</span>
      </a>
    </div>
  );
};
