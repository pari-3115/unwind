
import React from 'react';
import { Plot } from '../types';
import { Star, MapPin, Shield } from 'lucide-react';

interface PlotCardProps {
  plot: Plot;
  onClick?: () => void;
  showAdminActions?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
}

const PlotCard: React.FC<PlotCardProps> = ({ plot, onClick, showAdminActions, onEdit, onDelete }) => {
  return (
    <div 
      className="glass rounded-[2.5rem] overflow-hidden hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 cursor-pointer group border-white/40"
      onClick={() => onClick && onClick()}
    >
      <div className="relative h-72 overflow-hidden bg-slate-200">
        <img 
          src={plot.imageUrl} 
          alt={plot.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out" 
        />
        <div className="absolute top-4 right-4 glass px-3 py-2 rounded-2xl shadow-lg">
          <div className="flex items-center gap-1.5">
            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span className="text-sm font-extrabold text-slate-900">{plot.overallRating}</span>
          </div>
        </div>
        <div className="absolute bottom-6 left-6 bg-white/95 px-5 py-2.5 rounded-2xl shadow-2xl">
          <span className="text-lg font-black text-slate-900">₹{plot.pricePerNight}</span>
          <span className="text-[10px] font-bold text-slate-400">/ night</span>
        </div>
      </div>

      <div className="p-8">
        <div className="flex items-center gap-2 mb-2">
          <MapPin className="w-3.5 h-3.5 text-indigo-500" />
          <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600">{plot.location}</span>
        </div>
        <h3 className="text-2xl font-extrabold text-slate-900 mb-4 line-clamp-1 group-hover:text-indigo-600 transition-colors">{plot.title}</h3>
        
        <p className="text-slate-500 text-sm line-clamp-2 mb-6 font-medium leading-relaxed">{plot.description}</p>

        <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-3xl border border-white">
          <Shield className="w-5 h-5 text-slate-400 flex-shrink-0" />
          <span className="text-[11px] font-bold text-slate-600 leading-tight">
            Vetted UnWind sanctuary meeting all safety standards.
          </span>
        </div>

        {showAdminActions && (
          <div className="mt-6 flex gap-3" onClick={e => e.stopPropagation()}>
            <button onClick={onEdit} className="flex-1 bg-slate-900 hover:bg-black text-white py-3.5 rounded-2xl text-[10px] font-black transition-all uppercase tracking-widest">Edit</button>
            <button onClick={onDelete} className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 py-3.5 rounded-2xl text-[10px] font-black transition-all uppercase tracking-widest">Delete</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlotCard;
