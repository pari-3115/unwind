
import React, { useState } from 'react';
import { Plot, SiteConfig } from '../types';
import { Palette, Type, Map, Users, ShieldAlert, AlertTriangle, X } from 'lucide-react';
import PlotCard from '../components/PlotCard';

interface AdminViewProps {
  plots: Plot[];
  siteConfig: SiteConfig;
  onUpdateConfig: (config: SiteConfig) => void;
  onUpdatePlot: (plot: Plot) => void;
  onDeletePlot: (id: string) => void;
}

const AdminView: React.FC<AdminViewProps> = ({ plots, siteConfig, onUpdateConfig, onUpdatePlot, onDeletePlot }) => {
  const [activeTab, setActiveTab] = useState<'metrics' | 'settings' | 'plots'>('metrics');
  const [configDraft, setConfigDraft] = useState<SiteConfig>(siteConfig);
  const [editingPlot, setEditingPlot] = useState<Plot | null>(null);

  const handleSaveConfig = () => {
    onUpdateConfig(configDraft);
    alert("Settings updated successfully!");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
        <div><h1 className="text-4xl font-black text-slate-900 tracking-tight">Platform Control</h1><p className="text-slate-500 font-medium">System-wide configuration & oversight</p></div>
        <div className="flex flex-wrap gap-2 glass p-2 rounded-2xl">
           <button onClick={() => setActiveTab('metrics')} className={`px-6 py-2 rounded-xl text-xs font-black ${activeTab === 'metrics' ? 'bg-indigo-600 text-white' : 'text-slate-500 hover:bg-white'}`}>Metrics</button>
           <button onClick={() => setActiveTab('plots')} className={`px-6 py-2 rounded-xl text-xs font-black ${activeTab === 'plots' ? 'bg-indigo-600 text-white' : 'text-slate-500 hover:bg-white'}`}>Database</button>
           <button onClick={() => setActiveTab('settings')} className={`px-6 py-2 rounded-xl text-xs font-black ${activeTab === 'settings' ? 'bg-indigo-600 text-white' : 'text-slate-500 hover:bg-white'}`}>Branding</button>
        </div>
      </div>

      {activeTab === 'metrics' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {[
            { label: 'Active Users', value: '1,200', icon: Users, color: 'text-indigo-600', bg: 'bg-indigo-50' },
            { label: 'Verified Plots', value: plots.length.toString(), icon: Map, color: 'text-emerald-600', bg: 'bg-emerald-50' },
            { label: 'Platform Alerts', value: '0', icon: ShieldAlert, color: 'text-red-600', bg: 'bg-red-50' },
            { label: 'Pending Approvals', value: '5', icon: AlertTriangle, color: 'text-amber-600', bg: 'bg-amber-50' },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4">
              <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center`}><stat.icon className="w-6 h-6" /></div>
              <div><p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p><h3 className="text-2xl font-black text-slate-900">{stat.value}</h3></div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'plots' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {plots.map(plot => (
            <PlotCard key={plot.id} plot={plot} showAdminActions onEdit={() => setEditingPlot(plot)} onDelete={() => { if(confirm("Permanently delete?")) onDeletePlot(plot.id); }} />
          ))}
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
           <div className="lg:col-span-2 glass p-10 rounded-[3rem] shadow-2xl space-y-10">
              <section className="space-y-6">
                 <div className="flex items-center gap-3"><Palette className="w-6 h-6 text-indigo-600" /><h3 className="text-xl font-black text-slate-900 uppercase">Visual Identity</h3></div>
                 <div className="grid grid-cols-2 gap-6">
                   <div><label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4 mb-1">Site Name</label><input type="text" className="w-full px-6 py-4 glass rounded-2xl font-bold" value={configDraft.siteName} onChange={e => setConfigDraft({...configDraft, siteName: e.target.value})} /></div>
                   <div><label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4 mb-1">Color Theme</label><input type="color" className="w-full h-12 rounded-xl mt-1" value={configDraft.primaryColor} onChange={e => setConfigDraft({...configDraft, primaryColor: e.target.value})} /></div>
                 </div>
              </section>
              <section className="space-y-6 pt-6 border-t border-slate-100">
                 <div className="flex items-center gap-3"><Type className="w-6 h-6 text-indigo-600" /><h3 className="text-xl font-black text-slate-900 uppercase">Hero & Content</h3></div>
                 <div><label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4 mb-1">Tagline</label><input type="text" className="w-full px-6 py-4 glass rounded-2xl font-bold" value={configDraft.tagline} onChange={e => setConfigDraft({...configDraft, tagline: e.target.value})} /></div>
                 <div><label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4 mb-1">Hero Image URL</label><input type="text" className="w-full px-6 py-4 glass rounded-2xl font-bold" value={configDraft.heroImageUrl} onChange={e => setConfigDraft({...configDraft, heroImageUrl: e.target.value})} /></div>
              </section>
              <button onClick={handleSaveConfig} className="w-full py-6 bg-slate-900 text-white font-black rounded-3xl text-xl hover:bg-black transition-all shadow-xl">Commit Changes</button>
           </div>
        </div>
      )}

      {editingPlot && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-900/70 backdrop-blur-xl p-4">
          <div className="glass rounded-[3rem] w-full max-w-2xl p-12 shadow-2xl animate-in zoom-in">
             <div className="flex justify-between items-center mb-8"><h2 className="text-2xl font-black">Edit Sanctuary</h2><button onClick={() => setEditingPlot(null)} className="p-2 hover:bg-slate-100 rounded-xl"><X className="w-6 h-6" /></button></div>
             <div className="space-y-6">
                <div><label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4 mb-1">Title</label><input type="text" className="w-full px-6 py-4 glass rounded-xl font-bold" value={editingPlot.title} onChange={e => setEditingPlot({...editingPlot, title: e.target.value})} /></div>
                <div><label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4 mb-1">Location</label><input type="text" className="w-full px-6 py-4 glass rounded-xl font-bold" value={editingPlot.location} onChange={e => setEditingPlot({...editingPlot, location: e.target.value})} /></div>
                <button onClick={() => { onUpdatePlot(editingPlot); setEditingPlot(null); alert("Updated!"); }} className="w-full py-5 bg-slate-900 text-white font-black rounded-2xl text-lg hover:bg-black transition-all">Save Plot Changes</button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminView;
