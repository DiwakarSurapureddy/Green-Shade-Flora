import React, { createContext, useContext, useState, useEffect } from 'react';

const GreenCartContext = createContext();

const STORAGE_KEY = 'gs_nursery_green_cart_v1';

export const GreenCartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Error loading Green Cart from localStorage:', e);
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [inquiryPreselectedType, setInquiryPreselectedType] = useState('Retail (1-10 plants)');
  const [toastNotification, setToastNotification] = useState(null);

  // Sync with LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
    } catch (e) {
      console.error('Error saving Green Cart to localStorage:', e);
    }
  }, [cartItems]);

  const showToast = (message, type = 'success') => {
    setToastNotification({ message, type });
    setTimeout(() => {
      setToastNotification(null);
    }, 3200);
  };

  // Add plant to Green Cart
  const addToGreenCart = (plant, quantity = 1, customNote = '') => {
    const qty = Math.max(1, parseInt(quantity, 10) || 1);
    
    setCartItems(prevItems => {
      const existingIndex = prevItems.findIndex(item => item.id === plant.id);
      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + qty,
          note: customNote || updated[existingIndex].note || ''
        };
        return updated;
      } else {
        return [
          ...prevItems,
          {
            id: plant.id,
            name: plant.name,
            botanicalName: plant.botanicalName || '',
            category: plant.category || 'botanical',
            categoryLabel: plant.categoryLabel || 'Specimen',
            image: plant.image,
            quantity: qty,
            note: customNote || ''
          }
        ];
      }
    });

    showToast(`Added ${qty} × ${plant.name} to Green Cart 🌿`);
  };

  // Update item quantity
  const updateQuantity = (plantId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(plantId);
      return;
    }
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === plantId ? { ...item, quantity: newQty } : item
      )
    );
  };

  // Remove single item
  const removeFromCart = (plantId) => {
    setCartItems(prevItems => {
      const target = prevItems.find(i => i.id === plantId);
      if (target) {
        showToast(`Removed ${target.name} from Green Cart`, 'info');
      }
      return prevItems.filter(item => item.id !== plantId);
    });
  };

  // Clear entire cart
  const clearCart = () => {
    setCartItems([]);
    showToast('Green Cart has been cleared', 'info');
  };

  // Calculate total plants count
  const totalCount = cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0);
  const varietyCount = cartItems.length;

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const openInquiry = (orderType = 'Retail (1-10 plants)') => {
    setInquiryPreselectedType(orderType);
    setIsCartOpen(false);
    setIsInquiryOpen(true);
  };

  const closeInquiry = () => setIsInquiryOpen(false);

  return (
    <GreenCartContext.Provider
      value={{
        cartItems,
        totalCount,
        varietyCount,
        isCartOpen,
        isInquiryOpen,
        inquiryPreselectedType,
        toastNotification,
        addToGreenCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        openCart,
        closeCart,
        openInquiry,
        closeInquiry,
        showToast
      }}
    >
      {children}
    </GreenCartContext.Provider>
  );
};

export const useGreenCart = () => {
  const context = useContext(GreenCartContext);
  if (!context) {
    throw new Error('useGreenCart must be used within a GreenCartProvider');
  }
  return context;
};
