import React, { useState, useEffect, useMemo } from 'react';
import { GreenCartProvider } from './context/GreenCartContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { GreenCartDrawer } from './components/GreenCartDrawer';
import { InquiryModal } from './components/InquiryModal';
import { PlantDetailModal } from './components/PlantDetailModal';
import { FloatingActions } from './components/FloatingActions';
import { ToastNotification } from './components/ToastNotification';
import { AdminInquiryDrawer } from './components/AdminInquiryDrawer';
import { PlantCareAI } from './components/PlantCareAI';

import { Home } from './pages/Home';
import { PlantsPage } from './pages/PlantsPage';
import { About } from './pages/About';
import { Services } from './pages/Services';
import { Contact } from './pages/Contact';

const VALID_PAGES = ['home', 'plants', 'about', 'services', 'contact'];

const getInitialRoute = () => {
  try {
    const rawHash = window.location.hash.replace(/^#\/?/, '');
    if (rawHash) {
      const [path, queryStr] = rawHash.split('?');
      const cleanPath = path.toLowerCase();
      const params = new URLSearchParams(queryStr || '');
      const cat = params.get('category');
      if (VALID_PAGES.includes(cleanPath)) {
        return {
          page: cleanPath,
          category: cat || localStorage.getItem('gs_selected_category') || 'all'
        };
      }
    }
    const savedPage = localStorage.getItem('gs_active_page');
    const savedCat = localStorage.getItem('gs_selected_category');
    if (savedPage && VALID_PAGES.includes(savedPage)) {
      return {
        page: savedPage,
        category: savedCat || 'all'
      };
    }
  } catch (e) {
    console.error('Route parse error:', e);
  }
  return { page: 'home', category: 'all' };
};

export const App = () => {
  const initialRoute = useMemo(() => getInitialRoute(), []);
  const [activePage, setActivePage] = useState(initialRoute.page);
  const [selectedCategory, setSelectedCategory] = useState(initialRoute.category);
  const [modalPlant, setModalPlant] = useState(null);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Sync state changes to URL Hash & localStorage for stable refresh on each page
  useEffect(() => {
    try {
      localStorage.setItem('gs_active_page', activePage);
      localStorage.setItem('gs_selected_category', selectedCategory);

      let targetHash = '';
      if (activePage !== 'home') {
        targetHash = activePage === 'plants' && selectedCategory && selectedCategory !== 'all'
          ? `#plants?category=${selectedCategory}`
          : `#${activePage}`;
      }

      if (window.location.hash !== targetHash) {
        if (targetHash) {
          window.history.replaceState(null, '', targetHash);
        } else {
          window.history.replaceState(null, '', window.location.pathname + window.location.search);
        }
      }
    } catch (e) {
      console.error('Route sync error:', e);
    }
  }, [activePage, selectedCategory]);

  // Listen to browser Back/Forward buttons and hash navigation
  useEffect(() => {
    const handleHashOrPopState = () => {
      const route = getInitialRoute();
      setActivePage(route.page);
      if (route.category) {
        setSelectedCategory(route.category);
      }
    };

    window.addEventListener('hashchange', handleHashOrPopState);
    window.addEventListener('popstate', handleHashOrPopState);

    return () => {
      window.removeEventListener('hashchange', handleHashOrPopState);
      window.removeEventListener('popstate', handleHashOrPopState);
    };
  }, []);

  const handleSelectPlant = (plant) => {
    setModalPlant(plant);
  };

  const handleCloseModal = () => {
    setModalPlant(null);
  };

  const handleSelectCategory = (catId) => {
    setSelectedCategory(catId);
    setActivePage('plants');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderActivePage = () => {
    switch (activePage) {
      case 'home':
        return (
          <Home
            setActivePage={setActivePage}
            setSelectedCategory={setSelectedCategory}
            onSelectPlant={handleSelectPlant}
          />
        );
      case 'plants':
        return (
          <PlantsPage
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            onSelectPlant={handleSelectPlant}
          />
        );
      case 'about':
        return <About setActivePage={setActivePage} setSelectedCategory={setSelectedCategory} />;
      case 'services':
        return <Services setActivePage={setActivePage} />;
      case 'contact':
        return <Contact setActivePage={setActivePage} />;
      default:
        return (
          <Home
            setActivePage={setActivePage}
            setSelectedCategory={setSelectedCategory}
            onSelectPlant={handleSelectPlant}
          />
        );
    }
  };

  return (
    <GreenCartProvider>
      <div className="site-wrapper">
        {/* Navigation Bar */}
        <Navbar 
          activePage={activePage} 
          setActivePage={setActivePage} 
          onOpenAdmin={() => setIsAdminOpen(true)}
        />

        {/* Main Content Area */}
        <main className="site-main-content">
          {renderActivePage()}
        </main>

        {/* Green Cart Slideover Drawer */}
        <GreenCartDrawer />

        {/* Plant Inquiry Modal & WhatsApp Generator */}
        <InquiryModal />

        {/* Nursery Desk / Admin Inquiries Drawer */}
        <AdminInquiryDrawer 
          isOpen={isAdminOpen} 
          onClose={() => setIsAdminOpen(false)} 
        />

        {/* Detailed Botanical Modal */}
        <PlantDetailModal
          plant={modalPlant}
          onClose={handleCloseModal}
        />

        {/* Floating Quick Action Buttons */}
        <FloatingActions />

        {/* Interactive Toast Alerts */}
        <ToastNotification />

        <PlantCareAI />

        {/* Nursery Business Footer */}
        <Footer 
          setActivePage={setActivePage} 
          onSelectCategory={handleSelectCategory}
          onOpenAdmin={() => setIsAdminOpen(true)}
        />
      </div>
    </GreenCartProvider>
  );
};

export default App;
