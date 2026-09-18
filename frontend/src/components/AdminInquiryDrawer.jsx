import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { 
  X, 
  RefreshCw, 
  Phone, 
  MapPin, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  Filter, 
  ShieldCheck, 
  FileText,
  User
} from 'lucide-react';

export const AdminInquiryDrawer = ({ isOpen, onClose }) => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const data = await api.getInquiries(statusFilter);
      setInquiries(data || []);
    } catch (e) {
      console.error('Failed to load inquiries:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchInquiries();
    }
  }, [isOpen, statusFilter]);

  const handleStatusUpdate = async (id, newStatus) => {
    await api.updateInquiryStatus(id, newStatus);
    fetchInquiries();
  };

  if (!isOpen) return null;

  return (
    <div className="cart-drawer-overlay" onClick={onClose}>
      <aside 
        className="admin-drawer" 
        onClick={(e) => e.stopPropagation()}
        aria-label="Nursery Desk Inquiries"
      >
        {/* Header */}
        <header className="admin-drawer-header">
          <div className="admin-title-wrap">
            <span className="admin-shield-icon">🛡️</span>
            <div>
              <h3>Nursery Desk — Customer Inquiries</h3>
              <p className="admin-subtitle">Real-time PostgreSQL Database Records</p>
            </div>
          </div>
          <div className="admin-header-actions">
            <button 
              type="button" 
              className="admin-refresh-btn" 
              onClick={fetchInquiries}
              title="Refresh Inquiries"
            >
              <RefreshCw size={16} className={loading ? 'spinning' : ''} />
            </button>
            <button 
              type="button" 
              className="cart-close-btn" 
              onClick={onClose}
              title="Close Panel"
            >
              <X size={20} />
            </button>
          </div>
        </header>

        {/* Filter Bar */}
        <div className="admin-filter-bar">
          <span className="filter-label">
            <Filter size={14} /> Status:
          </span>
          {['all', 'pending', 'confirmed', 'completed'].map((st) => (
            <button
              key={st}
              type="button"
              className={`admin-filter-chip ${statusFilter === st ? 'active' : ''}`}
              onClick={() => setStatusFilter(st)}
            >
              {st.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Inquiries List */}
        <div className="admin-drawer-body">
          {loading && inquiries.length === 0 ? (
            <div className="admin-loading-box">
              <RefreshCw size={24} className="spinning" />
              <p>Connecting to PostgreSQL database...</p>
            </div>
          ) : inquiries.length === 0 ? (
            <div className="admin-empty-box">
              <FileText size={48} className="empty-icon" />
              <h4>No Inquiries Found</h4>
              <p>Customer plant inquiries submitted via Green Cart will appear here in real time.</p>
            </div>
          ) : (
            <div className="admin-inquiries-stack">
              {inquiries.map((inq) => (
                <div key={inq.id} className="admin-inquiry-card">
                  <div className="card-top-row">
                    <span className="inquiry-code">{inq.order_code || `INQ-#${inq.id}`}</span>
                    <span className={`inquiry-status-pill ${inq.status || 'pending'}`}>
                      {inq.status || 'pending'}
                    </span>
                  </div>

                  <div className="inquiry-customer-block">
                    <h4 className="inquiry-cust-name">
                      <User size={14} /> {inq.name}
                    </h4>
                    <p className="inquiry-phone">
                      <Phone size={14} /> 
                      <a href={`tel:${inq.phone}`}>{inq.phone}</a>
                    </p>
                    {inq.address && (
                      <p className="inquiry-address">
                        <MapPin size={14} /> {inq.address}
                      </p>
                    )}
                  </div>

                  <div className="inquiry-type-line">
                    <span className="type-label">Order Type:</span>
                    <strong>{inq.order_type}</strong>
                  </div>

                  {/* Plants breakdown */}
                  <div className="inquiry-plants-box">
                    <label>Selected Plants & Quantities:</label>
                    <pre className="plants-text-display">{inq.plants}</pre>
                  </div>

                  {inq.notes && (
                    <div className="inquiry-notes-box">
                      <label>Target Date / Notes:</label>
                      <p>{inq.notes}</p>
                    </div>
                  )}

                  {/* Status Actions */}
                  <div className="inquiry-card-footer">
                    <span className="inquiry-date">
                      <Clock size={12} /> {new Date(inq.created_at).toLocaleDateString()}
                    </span>
                    <div className="status-button-group">
                      {inq.status !== 'confirmed' && (
                        <button
                          type="button"
                          className="btn-status-confirm"
                          onClick={() => handleStatusUpdate(inq.id, 'confirmed')}
                        >
                          Confirm
                        </button>
                      )}
                      {inq.status !== 'completed' && (
                        <button
                          type="button"
                          className="btn-status-complete"
                          onClick={() => handleStatusUpdate(inq.id, 'completed')}
                        >
                          Mark Done
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </aside>
    </div>
  );
};
