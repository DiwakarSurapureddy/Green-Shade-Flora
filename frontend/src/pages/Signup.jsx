import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Lock, UserPlus, Sparkles, AlertCircle, CheckCircle2 } from 'lucide-react';

export const Signup = ({ setActivePage }) => {
  const { signup, loading } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Balcony Gardener');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!name.trim() || !email.trim() || !password) {
      setError('Please fill in all required fields.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    const res = await signup(name, email, password, role);
    if (res.success) {
      setActivePage('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setError(res.error || 'Failed to register account.');
    }
  };

  return (
    <div className="auth-page-wrapper">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo-badge">
            🌱
          </div>
          <h1 className="auth-title">Join Green Shade Flora</h1>
          <p className="auth-subtitle">Create your personal plant education profile</p>
        </div>

        {error && (
          <div className="alert-box alert-error">
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <div className="input-with-icon">
              <User size={18} className="input-icon" />
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Maya Sharma"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Email */}
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <div className="input-with-icon">
              <Mail size={18} className="input-icon" />
              <input
                type="email"
                className="form-input"
                placeholder="maya@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="form-group">
            <label className="form-label">Password (Min. 6 characters)</label>
            <div className="input-with-icon">
              <Lock size={18} className="input-icon" />
              <input
                type="password"
                className="form-input"
                placeholder="Create a strong password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Gardening Persona / Experience */}
          <div className="form-group">
            <label className="form-label">Gardening Persona</label>
            <select
              className="form-input"
              style={{ paddingLeft: '14px' }}
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="Beginner Plant Parent">🌱 Beginner Plant Parent</option>
              <option value="Balcony Gardener">🪴 Balcony Gardener</option>
              <option value="Houseplant Collector">🌿 Houseplant Collector</option>
              <option value="Medicinal Herb Enthusiast">🍃 Medicinal Herb Enthusiast</option>
              <option value="Botanist / Horticulturist">🌳 Botanist / Horticulturist</option>
            </select>
          </div>

          <button
            type="submit"
            className="btn-auth-submit"
            disabled={loading}
          >
            <UserPlus size={18} />
            <span>{loading ? 'Creating Account...' : 'Create Account & Start Growing'}</span>
          </button>
        </form>

        <p className="auth-switch-text">
          Already have an account?{' '}
          <button
            type="button"
            className="auth-switch-link"
            onClick={() => setActivePage('login')}
          >
            Log in here
          </button>
        </p>
      </div>
    </div>
  );
};
