import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ChatBot } from './components/ChatBot';

import { Home } from './pages/Home';
import { PlantTypes } from './pages/PlantTypes';
import { SearchPlants } from './pages/SearchPlants';
import { PlantCare } from './pages/PlantCare';
import { IndoorOutdoor } from './pages/IndoorOutdoor';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';

export const App = () => {
  const [activePage, setActivePage] = useState('home');
  const [externalPrompt, setExternalPrompt] = useState(null);

  const handleAskAI = (prompt) => {
    setExternalPrompt(prompt);
  };

  const renderActivePage = () => {
    switch (activePage) {
      case 'home':
        return <Home setActivePage={setActivePage} onAskAI={handleAskAI} />;
      case 'types':
        return <PlantTypes onAskAI={handleAskAI} />;
      case 'search':
        return <SearchPlants onAskAI={handleAskAI} />;
      case 'care':
        return <PlantCare onAskAI={handleAskAI} />;
      case 'compare':
        return <IndoorOutdoor onAskAI={handleAskAI} />;
      case 'login':
        return <Login setActivePage={setActivePage} />;
      case 'signup':
        return <Signup setActivePage={setActivePage} />;
      default:
        return <Home setActivePage={setActivePage} onAskAI={handleAskAI} />;
    }
  };

  return (
    <AuthProvider>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {/* Navigation Bar */}
        <Navbar activePage={activePage} setActivePage={setActivePage} />

        {/* Page Main Content */}
        <main style={{ flexGrow: 1 }}>
          {renderActivePage()}
        </main>

        {/* Floating AI Botanical Assistant */}
        <ChatBot
          externalPrompt={externalPrompt}
          onClearExternalPrompt={() => setExternalPrompt(null)}
        />

        {/* Footer */}
        <Footer setActivePage={setActivePage} />
      </div>
    </AuthProvider>
  );
};

export default App;
