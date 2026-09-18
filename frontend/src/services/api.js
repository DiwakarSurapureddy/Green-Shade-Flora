// API Client for Green Shade Nursery Backend
// Connects to FastAPI + PostgreSQL Database

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

export const api = {
  // Submit Customer Inquiry to PostgreSQL Database
  async submitInquiry(inquiryData) {
    try {
      const payload = {
        name: inquiryData.name,
        phone: inquiryData.phone,
        address: inquiryData.address,
        order_type: inquiryData.orderType || 'retail',
        plants: inquiryData.plantsText || '',
        notes: inquiryData.notes || '',
        qty: inquiryData.totalQty || 1,
        source: 'Green Shade Nursery Website'
      };

      const response = await fetch(`${API_BASE_URL}/api/inquiries`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      return await response.json();
    } catch (err) {
      console.warn('Could not save inquiry to backend database (using offline mode):', err.message);
      return { success: false, offline: true, error: err.message };
    }
  },

  // Fetch all inquiries for Nursery Desk / Admin
  async getInquiries(status = null, type = null) {
    try {
      let url = `${API_BASE_URL}/api/inquiries`;
      const params = new URLSearchParams();
      if (status && status !== 'all') params.append('status', status);
      if (type && type !== 'all') params.append('type', type);
      if (params.toString()) url += `?${params.toString()}`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }
      return await response.json();
    } catch (err) {
      console.warn('Could not fetch inquiries from backend:', err.message);
      return [];
    }
  },

  // Update inquiry status
  async updateInquiryStatus(orderId, newStatus) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/inquiries/${orderId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      });
      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }
      return await response.json();
    } catch (err) {
      console.error('Error updating inquiry status:', err);
      return null;
    }
  },

  // Check Backend Status
  async checkHealth() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/health`);
      return response.ok;
    } catch {
      return false;
    }
  }
};
