import React, { useState, useEffect, useMemo } from 'react';
import { useGreenCart } from '../context/GreenCartContext';
import { BUSINESS_INFO } from '../data/plantsData';
import { api } from '../services/api';
import { 
  X, 
  Send, 
  Copy, 
  Check, 
  MessageSquare, 
  Building2, 
  User, 
  Phone, 
  MapPin, 
  Calendar, 
  Sprout,
  ShieldCheck,
  ExternalLink
} from 'lucide-react';

export const InquiryModal = () => {
  const {
    cartItems,
    isInquiryOpen,
    closeInquiry,
    inquiryPreselectedType,
    openCart,
    showToast
  } = useGreenCart();

  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [orderType, setOrderType] = useState('Retail (1-10 plants)');
  const [targetDateInstructions, setTargetDateInstructions] = useState('');
  const [hasCopied, setHasCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Sync initial preselected order type
  useEffect(() => {
    if (inquiryPreselectedType) {
      setOrderType(inquiryPreselectedType);
    }
  }, [inquiryPreselectedType]);

  // Construct Plant Names & Quantities text
  const plantsListFormatted = useMemo(() => {
    if (!cartItems || cartItems.length === 0) {
      return "[No plants currently in Green Cart. Please add plants or specify requirements]";
    }
    return cartItems
      .map(item => `${item.name} - ${item.quantity} ${item.quantity > 1 ? 'plants' : 'plant'}`)
      .join('\n');
  }, [cartItems]);

  // Exact generated message template matching business requirements
  const generatedMessage = useMemo(() => {
    const nameVal = customerName.trim() || '[Enter Your Name]';
    const phoneVal = phone.trim() || '[Enter Phone Number]';
    const addressVal = deliveryAddress.trim() || '[Enter City, State & Landmark]';
    const orderTypeVal = orderType || '[Retail (1-10 plants) / Bulk B2B / Govt Tender / Commercial Project]';
    const instructionsVal = targetDateInstructions.trim() || '[Enter Date / Requirements]';

    return `Hello Surapreddy Rama Krishna & Green Shade Nursery Team,
I would like to place an inquiry for plants:
• Customer Name: ${nameVal}
• Contact Number / WhatsApp: ${phoneVal}
• Delivery Address & City: ${addressVal}
• Order Type: ${orderTypeVal}
• Plant Names & Quantities:
${plantsListFormatted}
• Target Delivery Date / Specific Instructions: ${instructionsVal}
Please provide availability and price quotation.`;
  }, [customerName, phone, deliveryAddress, orderType, plantsListFormatted, targetDateInstructions]);

  if (!isInquiryOpen) return null;

  const handleCopyMessage = async () => {
    try {
      await navigator.clipboard.writeText(generatedMessage);
      setHasCopied(true);
      showToast('Inquiry message copied to clipboard! Ready to paste.', 'success');
      setTimeout(() => setHasCopied(false), 2500);
    } catch (err) {
      console.error('Failed to copy message:', err);
      showToast('Please manually select and copy the text below.', 'info');
    }
  };

  const handleWhatsAppSend = (e) => {
    if (e) e.preventDefault();

    if (!customerName.trim() || !phone.trim() || !deliveryAddress.trim()) {
      showToast('Please fill in Customer Name, Contact Number, and Delivery Address to proceed.', 'error');
      setSubmitted(true);
      return;
    }

    // Save inquiry to backend database asynchronously
    const totalPlantsCount = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
    api.submitInquiry({
      name: customerName.trim(),
      phone: phone.trim(),
      address: deliveryAddress.trim(),
      orderType: orderType,
      plantsText: plantsListFormatted,
      notes: targetDateInstructions.trim(),
      totalQty: totalPlantsCount || 1
    }).then(res => {
      if (res && res.id) {
        console.log('Inquiry successfully recorded in database with ID:', res.id);
      }
    });

    const whatsappUrl = `https://wa.me/${BUSINESS_INFO.whatsappRaw}?text=${encodeURIComponent(generatedMessage)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    showToast('Inquiry recorded & opening WhatsApp...', 'success');
  };

  return (
    <div className="inquiry-modal-overlay" onClick={closeInquiry}>
      <div 
        className="inquiry-modal-container" 
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-labelledby="inquiry-modal-title"
      >
        {/* Modal Header */}
        <header className="inquiry-modal-header">
          <div className="inquiry-badge-tag">
            <ShieldCheck size={16} />
            <span>Official Green Shade Nursery Inquiry System</span>
          </div>
          <button 
            type="button" 
            className="modal-close-btn" 
            onClick={closeInquiry}
            title="Close Inquiry"
          >
            <X size={20} />
          </button>
        </header>

        <div className="inquiry-title-wrap">
          <h2 id="inquiry-modal-title">Request Plant Availability & Quotation</h2>
          <p>
            Submit your requirements directly to <strong>Founder Surapureddy Rama Krishna</strong> and our horticultural team.
            No online payment is collected — we verify plant stock, batch sizes, and transport quotation directly.
          </p>
        </div>

        {/* Modal Content Columns */}
        <div className="inquiry-grid-layout">
          {/* Left Column: Form Fields */}
          <form className="inquiry-form-column" onSubmit={handleWhatsAppSend}>
            <div className="form-section-title">
              <User size={18} />
              <h4>Customer & Order Details</h4>
            </div>

            {/* Customer Name */}
            <div className={`form-group ${submitted && !customerName.trim() ? 'has-error' : ''}`}>
              <label htmlFor="inquiry-name">
                Customer Name <span className="req">*</span>
              </label>
              <div className="input-with-icon">
                <User size={18} className="field-icon" />
                <input
                  id="inquiry-name"
                  type="text"
                  placeholder="e.g. Rajesh Sharma / Green Valley Estates"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Contact Number / WhatsApp */}
            <div className={`form-group ${submitted && !phone.trim() ? 'has-error' : ''}`}>
              <label htmlFor="inquiry-phone">
                Contact Number / WhatsApp <span className="req">*</span>
              </label>
              <div className="input-with-icon">
                <Phone size={18} className="field-icon" />
                <input
                  id="inquiry-phone"
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Delivery Address & City */}
            <div className={`form-group ${submitted && !deliveryAddress.trim() ? 'has-error' : ''}`}>
              <label htmlFor="inquiry-address">
                Delivery Address & City (State & Landmark) <span className="req">*</span>
              </label>
              <div className="input-with-icon">
                <MapPin size={18} className="field-icon" />
                <input
                  id="inquiry-address"
                  type="text"
                  placeholder="e.g. Plot 42, Jubilee Hills, Hyderabad, Telangana"
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Order Type */}
            <div className="form-group">
              <label htmlFor="inquiry-order-type">
                Order Type <span className="req">*</span>
              </label>
              <div className="order-type-chips">
                {[
                  'Retail (1-10 plants)',
                  'Bulk B2B',
                  'Govt Tender',
                  'Commercial Project'
                ].map((type) => (
                  <button
                    key={type}
                    type="button"
                    className={`order-chip ${orderType === type ? 'active' : ''}`}
                    onClick={() => setOrderType(type)}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Target Delivery Date / Specific Instructions */}
            <div className="form-group">
              <label htmlFor="inquiry-instructions">
                Target Delivery Date / Specific Instructions
              </label>
              <div className="input-with-icon textarea-wrap">
                <Calendar size={18} className="field-icon" />
                <textarea
                  id="inquiry-instructions"
                  rows={3}
                  placeholder="e.g. Require delivery by 25th of next month; need 5-foot specimen height; require root ball bagging."
                  value={targetDateInstructions}
                  onChange={(e) => setTargetDateInstructions(e.target.value)}
                />
              </div>
            </div>

            {/* Selected Plants summary in Green Cart */}
            <div className="cart-summary-inquiry-box">
              <div className="cart-summary-head">
                <span className="cart-summary-label">
                  <Sprout size={16} /> Selected Plants in Green Cart:
                </span>
                <button 
                  type="button" 
                  className="btn-edit-cart" 
                  onClick={() => {
                    closeInquiry();
                    openCart();
                  }}
                >
                  Edit Cart ({cartItems.length})
                </button>
              </div>
              {cartItems.length === 0 ? (
                <p className="no-items-warning">
                  ⚠️ No plants currently added in Green Cart. You can still submit an open inquiry or return to browse our catalog.
                </p>
              ) : (
                <ul className="inquiry-items-preview-list">
                  {cartItems.map((item) => (
                    <li key={item.id}>
                      <span className="plant-name">• {item.name}</span>
                      <span className="plant-qty">Qty: <strong>{item.quantity}</strong></span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </form>

          {/* Right Column: Dynamic Inquiry Message Preview & Action Buttons */}
          <div className="inquiry-preview-column">
            <div className="form-section-title">
              <MessageSquare size={18} />
              <h4>Generated Order Inquiry Message</h4>
            </div>

            <p className="preview-instructions">
              This message is automatically constructed using Green Shade Nursery's official inquiry format:
            </p>

            {/* Exact Generated Message Preview Box */}
            <div className="generated-message-card">
              <pre className="generated-message-text">{generatedMessage}</pre>
            </div>

            {/* Action Buttons */}
            <div className="inquiry-action-container">
              <p className="action-help-text">
                Send directly to nursery manager Surapureddy Rama Krishna on WhatsApp or copy to your clipboard:
              </p>

              {/* Primary: Send on WhatsApp */}
              <button 
                type="button" 
                className="btn-whatsapp-send"
                onClick={handleWhatsAppSend}
              >
                <div className="wa-icon-circle">
                  <Send size={18} />
                </div>
                <div className="btn-text-group">
                  <span className="btn-main-title">Send Inquiry on WhatsApp</span>
                  <span className="btn-sub-phone">Direct to {BUSINESS_INFO.whatsappPhone}</span>
                </div>
              </button>

              {/* Secondary: Copy Inquiry Message */}
              <button 
                type="button" 
                className="btn-copy-inquiry"
                onClick={handleCopyMessage}
              >
                {hasCopied ? (
                  <>
                    <Check size={18} className="text-success" />
                    <span>Inquiry Copied to Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy size={18} />
                    <span>Copy Inquiry Message</span>
                  </>
                )}
              </button>
            </div>

            {/* Direct Calling & Nursery Contact Backup */}
            <div className="nursery-direct-card">
              <div className="direct-card-head">
                <Building2 size={16} />
                <span>Prefer to call directly?</span>
              </div>
              <p>Green Shade Nursery Desk: <strong>{BUSINESS_INFO.whatsappPhone}</strong> / <strong>{BUSINESS_INFO.alternatePhone}</strong></p>
              <p className="subtext">Kadiyapu Savaram • Mon–Sat 7AM–8PM • Sun 8AM–7PM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
