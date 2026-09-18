import React from 'react';
import { useGreenCart } from '../context/GreenCartContext';
import { CheckCircle2, Info, AlertTriangle, X } from 'lucide-react';

export const ToastNotification = () => {
  const { toastNotification } = useGreenCart();

  if (!toastNotification) return null;

  const { message, type } = toastNotification;

  const getIcon = () => {
    switch (type) {
      case 'error':
        return <AlertTriangle size={18} className="toast-icon error" />;
      case 'info':
        return <Info size={18} className="toast-icon info" />;
      case 'success':
      default:
        return <CheckCircle2 size={18} className="toast-icon success" />;
    }
  };

  return (
    <div className={`toast-notification-banner ${type || 'success'}`}>
      <div className="toast-content">
        {getIcon()}
        <span>{message}</span>
      </div>
    </div>
  );
};
