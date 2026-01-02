
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import TravellerView from './views/TravellerView';
import OwnerView from './views/OwnerView';
import AdminView from './views/AdminView';
import SignInView from './views/SignInView';
import TripsView from './views/TripsView';
import { UserRole, User, Plot, SiteConfig, Booking } from './types';
import { MOCK_USER_TRAVELLER, MOCK_USER_OWNER, MOCK_USER_ADMIN } from './constants';
import { api } from './api';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User>({ ...MOCK_USER_TRAVELLER, savedPlotIds: [] });
  const [plots, setPlots] = useState<Plot[]>([]);
  const [trips, setTrips] = useState<Booking[]>([]);
  const [viewMode, setViewMode] = useState<'explore' | 'saved' | 'trips'>('explore');
  const [siteConfig, setSiteConfig] = useState<SiteConfig | null>(null);

  // Initial Data Load
  useEffect(() => {
    const loadData = async () => {
      const [p, config, saved, t] = await Promise.all([
        api.getPlots(),
        api.getConfig(),
        api.getSavedPlotIds(),
        api.getTrips()
      ]);
      setPlots(p);
      setSiteConfig(config);
      setTrips(t);
      setUser(prev => ({ ...prev, savedPlotIds: saved }));
    };
    loadData();
  }, []);

  // Sync Global Styles
  useEffect(() => {
    if (!siteConfig) return;
    const styleId = 'dynamic-brand-css';
    let styleEl = document.getElementById(styleId);
    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.id = styleId;
      document.head.appendChild(styleEl);
    }
    styleEl.innerHTML = `
      :root { --primary-color: ${siteConfig.primaryColor}; }
      .text-indigo-600 { color: var(--primary-color) !important; }
      .bg-indigo-600 { background-color: var(--primary-color) !important; }
      .border-indigo-600 { border-color: var(--primary-color) !important; }
      .shadow-indigo-200 { --tw-shadow-color: ${siteConfig.primaryColor}33 !important; }
    `;
  }, [siteConfig]);

  const handleSignIn = (role: UserRole) => {
    let selectedUser: User;
    switch (role) {
      case UserRole.OWNER: selectedUser = { ...MOCK_USER_OWNER, savedPlotIds: user.savedPlotIds }; break;
      case UserRole.ADMIN: selectedUser = { ...MOCK_USER_ADMIN, savedPlotIds: user.savedPlotIds }; break;
      default: selectedUser = { ...MOCK_USER_TRAVELLER, savedPlotIds: user.savedPlotIds }; break;
    }
    setUser(selectedUser);
    setIsLoggedIn(true);
    setViewMode('explore');
  };

  const handleToggleSave = async (plotId: string) => {
    const newSaved = await api.toggleSavedPlot(plotId);
    setUser(prev => ({ ...prev, savedPlotIds: newSaved }));
  };

  const handleUpdatePlot = async (plot: Plot) => {
    const updated = await api.savePlot(plot);
    setPlots(prev => {
      const exists = prev.find(p => p.id === updated.id);
      return exists ? prev.map(p => p.id === updated.id ? updated : p) : [...prev, updated];
    });
  };

  const handleDeletePlot = async (id: string) => {
    await api.deletePlot(id);
    setPlots(prev => prev.filter(p => p.id !== id));
  };

  const handleUpdateConfig = async (newConfig: SiteConfig) => {
    const updated = await api.updateConfig(newConfig);
    setSiteConfig(updated);
  };

  if (!isLoggedIn) return <SignInView onSignIn={handleSignIn} />;
  if (!siteConfig) return null; // Loading

  return (
    <Layout 
      user={user} 
      siteConfig={siteConfig}
      viewMode={viewMode}
      onSetViewMode={setViewMode}
      onLogout={() => setIsLoggedIn(false)} 
      onRoleSwitch={(role) => {
        handleSignIn(role); // Logic is the same
      }}
    >
      {user.role === UserRole.TRAVELLER && (
        <>
          {viewMode === 'trips' ? (
            <TripsView trips={trips} />
          ) : (
            <TravellerView 
              plots={viewMode === 'saved' ? plots.filter(p => user.savedPlotIds.includes(p.id)) : plots} 
              user={user}
              siteConfig={siteConfig}
              onToggleSave={handleToggleSave}
              isSavedView={viewMode === 'saved'}
            />
          )}
        </>
      )}
      
      {user.role === UserRole.OWNER && (
        <OwnerView 
          plots={plots.filter(p => p.ownerId === user.id)} 
          onUpdatePlot={handleUpdatePlot}
          onDeletePlot={handleDeletePlot}
        />
      )}
      
      {user.role === UserRole.ADMIN && (
        <AdminView 
          plots={plots} 
          siteConfig={siteConfig} 
          onUpdateConfig={handleUpdateConfig}
          onUpdatePlot={handleUpdatePlot}
          onDeletePlot={handleDeletePlot}
        />
      )}
    </Layout>
  );
};

export default App;
