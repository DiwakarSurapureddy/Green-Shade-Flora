import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('gsf_user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem('gsf_token') || null;
  });

  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Login failed');
      }

      setUser(data.user);
      setToken(data.token);
      localStorage.setItem('gsf_user', JSON.stringify(data.user));
      localStorage.setItem('gsf_token', data.token);
      return { success: true, user: data.user };
    } catch (err) {
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const signup = async (name, email, password, role = 'Plant Enthusiast') => {
    setLoading(true);
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Signup failed');
      }

      setUser(data.user);
      setToken(data.token);
      localStorage.setItem('gsf_user', JSON.stringify(data.user));
      localStorage.setItem('gsf_token', data.token);
      return { success: true, user: data.user };
    } catch (err) {
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const quickDemoLogin = async () => {
    return login('demo@greenshade.com', 'plant123');
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('gsf_user');
    localStorage.removeItem('gsf_token');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: Boolean(user && token),
        loading,
        login,
        signup,
        quickDemoLogin,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
