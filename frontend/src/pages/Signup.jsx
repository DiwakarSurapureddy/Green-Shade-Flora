import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import {
  TopPottedPlant,
  TopRightBotanical,
  BottomLeftBotanical,
  BottomRightDualPottedPlants,
  DappledLeafShadows
} from '../components/BotanicalLoginArt';

export const Signup = ({ setActivePage }) => {
  const { signup, loading } = useAuth();
  const [name, setName] = useState('');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Please enter your full name.');
      return;
    }

    if (!identifier.trim()) {
      setError('Please enter your email or mobile number.');
      return;
    }

    if (!password) {
      setError('Please enter a password.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match. Please verify.');
      return;
    }

    const res = await signup(name, identifier, password, 'Plant Enthusiast');
    if (res.success) {
      if (setActivePage) setActivePage('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setError(res.error || 'Failed to create account. Please try again.');
    }
  };

  return (
    <div className="exact-login-screen-wrap">
      {/* Outer wrapper maintaining exact aspect ratio and framing matching the reference */}
      <div className="exact-login-card exact-signup-card">
        {/* Botanical leaf and plant accents matching the signup image */}
        <TopRightBotanical />
        <BottomLeftBotanical />
        <BottomRightDualPottedPlants />
        <DappledLeafShadows />

        {/* Content Container */}
        <div className="exact-login-content">
          {/* Centered Potted Plant directly above Create Your Account */}
          <TopPottedPlant />

          {/* Heading and Tagline */}
          <div className="exact-login-header">
            <h1 className="exact-login-title">Create Your Account</h1>
            <p className="exact-login-subtitle">Join Green Shade Flora and start your green journey!</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="exact-login-alert exact-alert-error" role="alert">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          {/* Signup Form */}
          <form className="exact-login-form" onSubmit={handleSubmit} noValidate>
            {/* Field 1: Full Name */}
            <div className="exact-form-control">
              <div className="exact-input-container">
                <User size={18} className="exact-field-icon" />
                <input
                  type="text"
                  className="exact-text-input"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                  required
                />
              </div>
            </div>

            {/* Field 2: Email or Mobile Number */}
            <div className="exact-form-control">
              <div className="exact-input-container">
                <Mail size={18} className="exact-field-icon" />
                <input
                  type="text"
                  className="exact-text-input"
                  placeholder="Email or Mobile Number"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  autoComplete="username"
                  required
                />
              </div>
            </div>

            {/* Field 3: Password */}
            <div className="exact-form-control">
              <div className="exact-input-container">
                <Lock size={18} className="exact-field-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="exact-text-input exact-password-input"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
                  required
                />
                <button
                  type="button"
                  className="exact-eye-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <Eye size={18} className="exact-eye-icon" />
                  ) : (
                    <EyeOff size={18} className="exact-eye-icon" />
                  )}
                </button>
              </div>
            </div>

            {/* Field 4: Confirm Password */}
            <div className="exact-form-control">
              <div className="exact-input-container">
                <Lock size={18} className="exact-field-icon" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  className="exact-text-input exact-password-input"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  autoComplete="new-password"
                  required
                />
                <button
                  type="button"
                  className="exact-eye-toggle"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                  tabIndex={-1}
                >
                  {showConfirmPassword ? (
                    <Eye size={18} className="exact-eye-icon" />
                  ) : (
                    <EyeOff size={18} className="exact-eye-icon" />
                  )}
                </button>
              </div>
            </div>

            {/* Primary Submit Button: Create Account */}
            <button
              type="submit"
              className="exact-btn-login exact-btn-signup"
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>

            {/* Already have an account? Login */}
            <div className="exact-signup-row exact-login-switch-row">
              <span className="exact-signup-muted">Already have an account? </span>
              <button
                type="button"
                className="exact-signup-link"
                onClick={() => {
                  if (setActivePage) setActivePage('login');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
