
import React, { useState } from 'react';
import { Plot, User, SiteConfig } from '../types';
import PlotCard from '../components/PlotCard';
import PlotDetail from './PlotDetail';
import { Search, SlidersHorizontal, Map as MapIcon, ArrowRight } from 'lucide-react';

interface TravellerViewProps {
  plots: Plot[];
  user: User;
  siteConfig: SiteConfig;
  onToggleSave: (id: string) => void;
  isSavedView: boolean;
}

const TravellerView: React.FC<TravellerViewProps> = ({ 
  plots, user, siteConfig, onToggleSave, isSavedView 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPlot, setSelectedPlot] = useState<Plot | null>(null);

  const filteredPlots = plots.filter(p => 
    p.location.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {!isSavedView && (
        <div className="relative h-[600px] rounded-[4rem] overflow-hidden mb-16 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)] group">
          <div className="absolute inset-0 bg-slate-900">
            <img src={siteConfig.heroImageUrl} className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-[10s] ease-out" alt="hero" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/40 to-slate-900/90"></div>
          <div className="relative z-10 h-full flex flex-col items-center justify-center px-8 text-center max-w-4xl mx-auto">
            <div className="mb-6 px-4 py-2 glass-dark rounded-full text-white/90 text-[10px] font-black uppercase tracking-[0.3em]">Explore Incredible Places</div>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter leading-none">{siteConfig.tagline.split(',')[0]} <br/><span className="text-indigo-400">{siteConfig.tagline.split(',')[1] || ''}</span></h1>
            <p className="text-slate-300 text-lg md:text-xl font-medium max-w-2xl mb-12 opacity-90">Discover hand-picked plots across the subcontinent. Secure, private, and verified for your nomadic journey.</p>
            <div className="w-full max-w-3xl glass p-3 rounded-[3rem] shadow-2xl flex flex-col md:flex-row gap-3">
              <div className="flex-grow flex items-center px-6 py-4 bg-white/40 rounded-[2.5rem] border border-white/20">
                <Search className="text-slate-600 w-5 h-5 mr-4" />
                <input type="text" placeholder="Find your sanctuary (Goa, Kashmir, Kerala...)" className="w-full outline-none text-slate-900 font-bold bg-transparent placeholder-slate-500" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
              </div>
              <button onClick={() => document.getElementById('plots-grid')?.scrollIntoView({ behavior: 'smooth' })} className="bg-slate-900 hover:bg-black text-white font-black px-10 py-4 rounded-[2.5rem] transition-all flex items-center justify-center gap-2 group shadow-xl">Search Now<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></button>
            </div>
          </div>
        </div>
      )}

      <div id="plots-grid" className="flex flex-col md:flex-row justify-between items-end mb-12 px-4 gap-6">
        <div className="max-w-lg">
          <div className="flex items-center gap-3 mb-4"><div className="w-8 h-px bg-indigo-600"></div><span className="text-sm font-black text-indigo-600 uppercase tracking-widest">{isSavedView ? 'Saved Havens' : 'Featured Spots'}</span></div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight leading-tight">{isSavedView ? "Your Personal Bucket List" : "Featured private plots curated for you"}</h2>
        </div>
        {!isSavedView && (
          <div className="flex gap-3 glass p-2 rounded-[2rem] border-white/50">
            <button className="flex items-center gap-2 px-6 py-3 bg-white text-slate-900 rounded-[1.5rem] text-sm font-black shadow-sm border border-slate-100 transition-transform active:scale-95"><SlidersHorizontal className="w-4 h-4" /> Filter</button>
            <button className="flex items-center gap-2 px-6 py-3 hover:bg-white text-slate-500 rounded-[1.5rem] text-sm font-black transition-all"><MapIcon className="w-4 h-4" /> Map View</button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-24">
        {filteredPlots.map(plot => (
          <PlotCard key={plot.id} plot={plot} onClick={() => setSelectedPlot(plot)} />
        ))}
        {filteredPlots.length === 0 && (
          <div className="col-span-full py-32 text-center glass rounded-[4rem]">
            <Search className="w-10 h-10 text-slate-300 mx-auto mb-6" />
            <h3 className="text-2xl font-black text-slate-900">No havens found in this area</h3>
            <p className="text-slate-500 mt-4 font-medium">Try searching for states like Goa, Kerala, or Kashmir.</p>
          </div>
        )}
      </div>

      {selectedPlot && (
        <PlotDetail plot={selectedPlot} isSaved={user.savedPlotIds.includes(selectedPlot.id)} onToggleSave={() => onToggleSave(selectedPlot.id)} onClose={() => setSelectedPlot(null)} />
      )}
    </div>
  );
};

export default TravellerView;