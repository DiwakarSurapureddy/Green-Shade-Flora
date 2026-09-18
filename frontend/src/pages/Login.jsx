import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, LogIn, Sparkles, Eye, EyeOff, AlertCircle } from 'lucide-react';

export const Login = ({ setActivePage }) => {
  const { login, quickDemoLogin, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password) {
      setError('Please enter both email and password.');
      return;
    }

    const res = await login(email, password);
    if (res.success) {
      setActivePage('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setError(res.error || 'Invalid email or password.');
    }
  };

  const handleDemoFill = async () => {
    setEmail('demo@greenshade.com');
    setPassword('plant123');
    setError('');
    const res = await quickDemoLogin();
    if (res.success) {
      setActivePage('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setError(res.error || 'Demo login failed.');
    }
  };

  return (
    <div className="auth-page-wrapper">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo-badge">
            🌿
          </div>
          <h1 className="auth-title">Welcome Back</h1>
          <p className="auth-subtitle">Log in to save plant favorites and consult PlantMate AI</p>
        </div>

        {/* Demo Account Quick Fill */}
        <div className="demo-fill-box">
          <div>
            <p><strong>Quick Test Account</strong></p>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>demo@greenshade.com / plant123</p>
          </div>
          <button
            type="button"
            className="btn-demo-fill"
            onClick={handleDemoFill}
            disabled={loading}
          >
            One-Click Login
          </button>
        </div>

        {error && (
          <div className="alert-box alert-error">
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <div className="input-with-icon">
              <Mail size={18} className="input-icon" />
              <input
                type="email"
                className="form-input"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="form-group">
            <label className="form-label">Password</label>
            <div className="input-with-icon">
              <Lock size={18} className="input-icon" />
              <input
                type={showPassword ? 'text' : 'password'}
                className="form-input"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                style={{ position: 'absolute', right: '14px', color: 'var(--text-muted)' }}
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="btn-auth-submit"
            disabled={loading}
          >
            <LogIn size={18} />
            <span>{loading ? 'Authenticating...' : 'Sign In to Account'}</span>
          </button>
        </form>

        <p className="auth-switch-text">
          Don't have an account yet?{' '}
          <button
            type="button"
            className="auth-switch-link"
            onClick={() => setActivePage('signup')}
          >
            Create one free
          </button>
        </p>
      </div>
    </div>
  );
};
