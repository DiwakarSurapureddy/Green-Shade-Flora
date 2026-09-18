import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  Leaf,
  Layers,
  Search,
  HeartHandshake,
  ArrowLeftRight,
  LogIn,
  LogOut,
  Menu,
  X,
  Sparkles
} from 'lucide-react';

export const Navbar = ({ activePage, setActivePage }) => {
  const { user, isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Leaf },
    { id: 'types', label: 'Plant Types', icon: Layers },
    { id: 'search', label: 'Search & AI', icon: Search, badge: 'AI' },
    { id: 'care', label: 'Plant Care', icon: HeartHandshake },
    { id: 'compare', label: 'Indoor vs Outdoor', icon: ArrowLeftRight }
  ];

  const handleNavClick = (pageId) => {
    setActivePage(pageId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="header-nav">
      <div className="container">
        <div className="nav-inner">
          {/* Logo */}
          <div
            className="brand-logo"
            onClick={() => handleNavClick('home')}
            style={{ cursor: 'pointer' }}
          >
            <div className="logo-leaf-icon">
              <Leaf size={22} />
            </div>
            <span>Green Shade Flora</span>
          </div>

          {/* Desktop Navigation Links */}
          <ul className="nav-links-desktop">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.id;
              return (
                <li key={item.id}>
                  <button
                    className={`nav-item-link ${isActive ? 'active' : ''}`}
                    onClick={() => handleNavClick(item.id)}
                  >
                    <Icon size={16} />
                    <span>{item.label}</span>
                    {item.badge && (
                      <span
                        style={{
                          fontSize: '0.68rem',
                          background: 'linear-gradient(135deg, #2d6a4f, #52b788)',
                          color: 'white',
                          padding: '1px 6px',
                          borderRadius: '999px',
                          fontWeight: 800
                        }}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Right Action Buttons: Auth */}
          <div className="nav-actions-right">
            {isAuthenticated ? (
              <div className="user-badge-nav">
                <div className="user-avatar-circle">
                  {user?.avatar || '🌿'}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span className="user-name-text">{user?.name}</span>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                    {user?.role || 'Gardener'}
                  </span>
                </div>
                <button
                  className="btn-logout-tiny"
                  onClick={logout}
                  title="Log out of account"
                >
                  <LogOut size={14} />
                  <span>Exit</span>
                </button>
              </div>
            ) : (
              <button
                className="btn-nav-signup"
                onClick={() => handleNavClick('login')}
              >
                <LogIn size={15} />
                <span>Log In / Sign Up</span>
              </button>
            )}

            {/* Mobile Hamburger Toggle */}
            <button
              className="btn-hamburger"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="mobile-nav-drawer">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                className={`nav-item-link ${isActive ? 'active' : ''}`}
                style={{ width: '100%', justifyContent: 'flex-start', padding: '12px 16px' }}
                onClick={() => handleNavClick(item.id)}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </button>
            );
          })}

          <div style={{ paddingTop: '12px', borderTop: '1px solid var(--border-subtle)' }}>
            {isAuthenticated ? (
              <button
                className="btn-secondary"
                style={{ width: '100%', justifyContent: 'center' }}
                onClick={logout}
              >
                <LogOut size={16} />
                <span>Log Out ({user?.name})</span>
              </button>
            ) : (
              <button
                className="btn-nav-signup"
                style={{ width: '100%', justifyContent: 'center' }}
                onClick={() => handleNavClick('login')}
              >
                <LogIn size={15} />
                <span>Log In / Sign Up</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
