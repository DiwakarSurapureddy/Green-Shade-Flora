import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import {
  TopPottedPlant,
  TopLeftBotanical,
  BottomLeftBotanical,
  BottomRightPottedPlant,
  DappledLeafShadows,
  GoogleLogo
} from '../components/BotanicalLoginArt';

export const Login = ({ setActivePage }) => {
  const { login, quickDemoLogin, loading } = useAuth();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [infoMessage, setInfoMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setInfoMessage('');

    if (!identifier.trim() || !password) {
      setError('Please enter your email/mobile and password.');
      return;
    }

    const res = await login(identifier, password);
    if (res.success) {
      if (setActivePage) setActivePage('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setError(res.error || 'Invalid credentials. Please try again.');
    }
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    setInfoMessage('Password reset link will be sent to your registered contact.');
    setTimeout(() => setInfoMessage(''), 4500);
  };

  const handleSocialClick = (provider) => {
    setInfoMessage(`${provider} login will be connected with your plant account.`);
    setTimeout(() => setInfoMessage(''), 3500);
  };

  const handleDemoFill = async () => {
    setIdentifier('demo@greenshade.com');
    setPassword('plant123');
    setError('');
    const res = await quickDemoLogin();
    if (res.success) {
      if (setActivePage) setActivePage('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setError(res.error || 'Demo login failed.');
    }
  };

  return (
    <div className="exact-login-screen-wrap">
      {/* Outer wrapper maintaining exact aspect ratio and framing matching the reference */}
      <div className="exact-login-card">
        {/* Botanical leaf and plant accents */}
        <TopLeftBotanical />
        <BottomLeftBotanical />
        <BottomRightPottedPlant />
        <DappledLeafShadows />

        {/* Content Container */}
        <div className="exact-login-content">
          {/* Centered Potted Plant directly above Welcome Back */}
          <TopPottedPlant />

          {/* Heading and Tagline */}
          <div className="exact-login-header">
            <h1 className="exact-login-title">Welcome Back!</h1>
            <p className="exact-login-subtitle">Login to continue your green journey</p>
          </div>

          {/* Feedback messages */}
          {error && (
            <div className="exact-login-alert exact-alert-error" role="alert">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          {infoMessage && (
            <div className="exact-login-alert exact-alert-info">
              <span>{infoMessage}</span>
            </div>
          )}

          {/* Login Form */}
          <form className="exact-login-form" onSubmit={handleSubmit} noValidate>
            {/* Field 1: Email or Mobile Number */}
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

            {/* Field 2: Password */}
            <div className="exact-form-control">
              <div className="exact-input-container">
                <Lock size={18} className="exact-field-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="exact-text-input exact-password-input"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
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

            {/* Options Row: Remember me + Forgot Password */}
            <div className="exact-options-row">
              <label className="exact-checkbox-label">
                <input
                  type="checkbox"
                  className="exact-checkbox-input"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span className="exact-checkbox-box" aria-hidden="true" />
                <span className="exact-checkbox-text">Remember me</span>
              </label>

              <button
                type="button"
                className="exact-forgot-link"
                onClick={handleForgotPassword}
              >
                Forgot Password?
              </button>
            </div>

            {/* Primary Submit Button: Login */}
            <button
              type="submit"
              className="exact-btn-login"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>

            {/* Don't have an account? Sign Up */}
            <div className="exact-signup-row">
              <span className="exact-signup-muted">Don't have an account? </span>
              <button
                type="button"
                className="exact-signup-link"
                onClick={() => {
                  if (setActivePage) setActivePage('signup');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                Sign Up
              </button>
            </div>

            {/* Divider with "or" */}
            <div className="exact-divider-row">
              <div className="exact-divider-line" />
              <span className="exact-divider-text">or</span>
              <div className="exact-divider-line" />
            </div>

            {/* Social Logins */}
            <div className="exact-social-actions">
              <button
                type="button"
                className="exact-btn-social"
                onClick={() => handleSocialClick('Google')}
              >
                <GoogleLogo />
                <span>Continue with Google</span>
              </button>
            </div>
          </form>

          {/* Quick Demo Helper for smooth developer/user testing */}
          <div className="exact-demo-quickfill">
            <button
              type="button"
              className="exact-btn-demo"
              onClick={handleDemoFill}
              disabled={loading}
              title="Click to fill test credentials"
            >
              🌿 Quick Fill Demo (demo@greenshade.com)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
