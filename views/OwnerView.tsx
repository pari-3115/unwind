
import React, { useState } from 'react';
import { Plot } from '../types';
import PlotCard from '../components/PlotCard';
import { Plus, LayoutGrid, DollarSign, Users, X } from 'lucide-react';

interface OwnerViewProps {
  plots: Plot[];
  onUpdatePlot: (plot: Plot) => void;
  onDeletePlot: (id: string) => void;
}

const OwnerView: React.FC<OwnerViewProps> = ({ plots, onUpdatePlot, onDeletePlot }) => {
  const [showModal, setShowModal] = useState(false);
  const [editingPlot, setEditingPlot] = useState<Partial<Plot> | null>(null);

  const openAdd = () => {
    setEditingPlot({
      title: '', location: '', pricePerNight: 3500, description: '', imageUrl: '',
      amenities: { evCharging: false, bathroom: false, waterHookup: false, wifi: false, petFriendly: false },
      checkpoints: []
    });
    setShowModal(true);
  };

  const handleSave = () => {
    if (!editingPlot?.title || !editingPlot?.location) return alert("Title and location required.");
    const plotToSave: Plot = {
      ...editingPlot,
      id: editingPlot.id || 'p' + Date.now(),
      ownerId: 'o1',
      ownerName: 'Priya Patel',
      reviews: [],
      overallRating: 5.0,
      status: 'available',
      coordinates: { lat: 0, lng: 0 }
    } as Plot;
    onUpdatePlot(plotToSave);
    setShowModal(false);
    setEditingPlot(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-6">
        <div><h1 className="text-5xl font-black text-slate-900 tracking-tight">Land Portfolio</h1><p className="text-slate-500 font-medium mt-2">Manage your private RV sanctuaries</p></div>
        <button onClick={openAdd} className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-black px-8 py-4 rounded-2xl flex items-center justify-center gap-3 shadow-xl transition-all"><Plus className="w-6 h-6" /> List Sanctuary</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {[
          { label: 'Total Earnings', value: '₹48,240', icon: DollarSign, color: 'text-indigo-600', bg: 'bg-indigo-50' },
          { label: 'Hosted Travellers', value: '14', icon: Users, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Active Plots', value: plots.length.toString(), icon: LayoutGrid, color: 'text-amber-600', bg: 'bg-amber-50' }
        ].map((stat, i) => (
          <div key={i} className="glass p-8 rounded-[3rem] shadow-xl flex items-center gap-6">
            <div className={`w-16 h-16 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center`}><stat.icon className="w-8 h-8" /></div>
            <div><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p><h3 className="text-3xl font-black text-slate-900">{stat.value}</h3></div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {plots.map(plot => (
          <PlotCard key={plot.id} plot={plot} showAdminActions onEdit={() => { setEditingPlot(plot); setShowModal(true); }} onDelete={() => { if(confirm("Delete sanctuary?")) onDeletePlot(plot.id); }} />
        ))}
      </div>

      {showModal && editingPlot && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-900/60 backdrop-blur-xl p-4 overflow-y-auto">
          <div className="glass rounded-[3rem] w-full max-w-2xl p-12 shadow-2xl animate-in zoom-in">
            <div className="flex justify-between items-center mb-8"><h2 className="text-3xl font-black text-slate-900">Sanctuary Details</h2><button onClick={() => setShowModal(false)} className="p-2 hover:bg-slate-100 rounded-xl"><X className="w-8 h-8" /></button></div>
            <div className="space-y-6">
              <div><label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4 mb-1">Plot Name</label><input type="text" className="w-full px-6 py-4 glass rounded-2xl font-bold" value={editingPlot.title} onChange={e => setEditingPlot({...editingPlot, title: e.target.value})} /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4 mb-1">Location</label><input type="text" className="w-full px-6 py-4 glass rounded-2xl font-bold" value={editingPlot.location} onChange={e => setEditingPlot({...editingPlot, location: e.target.value})} /></div>
                <div><label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4 mb-1">Price (₹/Night)</label><input type="number" className="w-full px-6 py-4 glass rounded-2xl font-bold" value={editingPlot.pricePerNight} onChange={e => setEditingPlot({...editingPlot, pricePerNight: parseInt(e.target.value)})} /></div>
              </div>
              <div><label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4 mb-1">Image URL</label><input type="text" className="w-full px-6 py-4 glass rounded-2xl font-bold" value={editingPlot.imageUrl} onChange={e => setEditingPlot({...editingPlot, imageUrl: e.target.value})} /></div>
              <button onClick={handleSave} className="w-full py-6 bg-slate-900 text-white font-black rounded-3xl text-xl hover:bg-black transition-all">Publish Listing</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OwnerView;
