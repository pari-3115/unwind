
import React, { useState } from 'react';
import { UserRole, User, SiteConfig } from '../types';
import { LogOut, X, Shield, Lock, LifeBuoy, Heart, Info, PhoneCall, Menu } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  user: User;
  siteConfig: SiteConfig;
  onLogout: () => void;
  onRoleSwitch: (role: UserRole) => void;
  viewMode: 'explore' | 'saved' | 'trips';
  onSetViewMode: (mode: 'explore' | 'saved' | 'trips') => void;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, user, siteConfig, onLogout, onRoleSwitch, viewMode, onSetViewMode 
}) => {
  const [activeInfoModal, setActiveInfoModal] = useState<'privacy' | 'safety' | 'support' | 'about' | 'contact' | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const infoContent = {
    privacy: { title: 'Privacy Policy', icon: Lock, color: 'text-indigo-600', bg: 'bg-indigo-50', text: siteConfig.privacyContent },
    safety: { title: 'Safety Standards', icon: Shield, color: 'text-indigo-600', bg: 'bg-indigo-50', text: siteConfig.safetyContent },
    support: { title: 'Support Center', icon: LifeBuoy, color: 'text-blue-600', bg: 'bg-blue-50', text: siteConfig.supportContent },
    about: { title: 'About UnWind', icon: Info, color: 'text-amber-600', bg: 'bg-amber-50', text: siteConfig.aboutContent },
    contact: { title: 'Contact Us', icon: PhoneCall, color: 'text-rose-600', bg: 'bg-rose-50', text: siteConfig.contactContent }
  };

  const navLinks = [
    { mode: 'explore', label: 'Explore' },
    { mode: 'saved', label: 'Saved', badge: user.savedPlotIds.length },
    { mode: 'trips', label: 'Trips' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="glass sticky top-4 z-50 mx-4 mt-4 rounded-3xl shadow-xl shadow-slate-200/50 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => onSetViewMode('explore')}>
                <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 truncate">
                  {siteConfig.siteName}
                </span>
              </div>
              
              <div className="hidden sm:ml-10 sm:flex sm:space-x-8">
                {navLinks.map((link) => (
                  <button 
                    key={link.mode}
                    onClick={() => onSetViewMode(link.mode as any)}
                    className={`${viewMode === link.mode ? 'text-indigo-600 border-indigo-600' : 'text-slate-500 border-transparent'} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-bold transition-all relative`}
                  >
                    {link.label}
                    {link.badge !== undefined && link.badge > 0 && (
                      <span className="ml-1.5 w-4 h-4 bg-indigo-600 text-white text-[10px] rounded-full flex items-center justify-center">
                        {link.badge}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-4">
              <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-indigo-50 rounded-xl border border-indigo-100/50">
                <span className="text-[9px] font-black text-indigo-600 uppercase tracking-widest">{user.role}</span>
              </div>
              
              <div className="flex items-center gap-2 sm:gap-3 pl-2 sm:pl-4 border-l border-slate-200/50">
                <img src={user.avatar} className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 border-white shadow-md" alt="profile" />
                <button onClick={onLogout} className="p-1.5 sm:p-2 text-slate-400 hover:text-red-500 rounded-lg transition-all">
                  <LogOut className="w-5 h-5" />
                </button>
                <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="sm:hidden p-1.5 text-slate-600">
                  <Menu className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="sm:hidden px-4 pt-2 pb-6 space-y-2 bg-white/95 rounded-b-3xl border-t border-slate-100">
            {navLinks.map((link) => (
              <button 
                key={link.mode}
                onClick={() => { onSetViewMode(link.mode as any); setIsMobileMenuOpen(false); }}
                className={`w-full text-left px-4 py-3 rounded-2xl text-sm font-bold transition-all ${viewMode === link.mode ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-50'}`}
              >
                {link.label} {link.badge !== undefined && link.badge > 0 ? `(${link.badge})` : ''}
              </button>
            ))}
          </div>
        )}
      </nav>

      <main className="flex-grow pt-4">
        {children}
      </main>

      <footer className="py-8 sm:py-12 px-4 mt-auto">
        <div className="max-w-7xl mx-auto glass rounded-[2.5rem] sm:rounded-[3rem] p-8 sm:p-12 flex flex-col md:flex-row justify-between items-center gap-8 shadow-inner text-center md:text-left">
          <div className="flex items-center gap-3">
             <span className="text-xl font-black text-slate-900">{siteConfig.siteName}</span>
          </div>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            <button onClick={() => setActiveInfoModal('about')} className="text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors">About</button>
            <button onClick={() => setActiveInfoModal('contact')} className="text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors">Contact</button>
            <button onClick={() => setActiveInfoModal('privacy')} className="text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors">Privacy</button>
            <button onClick={() => setActiveInfoModal('safety')} className="text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors">Safety</button>
            <button onClick={() => setActiveInfoModal('support')} className="text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors">Support</button>
          </div>
          <p className="text-slate-400 text-xs sm:text-sm font-medium">© 2024 {siteConfig.siteName}. All rights reserved.</p>
        </div>
      </footer>

      {activeInfoModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-xl p-4">
          <div className="glass rounded-[2rem] w-full max-w-md p-6 sm:p-10 shadow-2xl border-white/50">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 ${infoContent[activeInfoModal].bg} ${infoContent[activeInfoModal].color} rounded-xl flex items-center justify-center`}>
                  {React.createElement(infoContent[activeInfoModal].icon, { className: 'w-6 h-6' })}
                </div>
                <h2 className="text-xl font-black text-slate-900">{infoContent[activeInfoModal].title}</h2>
              </div>
              <button onClick={() => setActiveInfoModal(null)} className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-slate-600 text-sm font-medium leading-relaxed mb-8 whitespace-pre-wrap">
              {infoContent[activeInfoModal].text}
            </p>
            <button onClick={() => setActiveInfoModal(null)} className="w-full bg-slate-900 text-white font-black py-4 rounded-2xl hover:bg-black transition-all">Got it</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Layout;
