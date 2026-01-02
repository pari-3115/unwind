
import React from 'react';
import { Booking } from '../types';
import { Calendar, MapPin, CheckCircle2, ChevronRight, History } from 'lucide-react';

interface TripsViewProps {
  trips: Booking[];
}

const TripsView: React.FC<TripsViewProps> = ({ trips }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4"><div className="w-8 h-px bg-indigo-600"></div><span className="text-sm font-black text-indigo-600 uppercase tracking-widest">Stay History</span></div>
        <h1 className="text-6xl font-black text-slate-900 tracking-tight leading-none">Your Past <br/><span className="text-slate-400">Havens.</span></h1>
      </div>
      <div className="grid grid-cols-1 gap-8 mb-24">
        {trips.map(trip => (
          <div key={trip.id} className="glass rounded-[3rem] p-8 shadow-xl flex flex-col md:flex-row items-center gap-8 group">
             <div className="w-full md:w-64 h-48 rounded-[2rem] overflow-hidden flex-shrink-0">
                <img src={trip.plotImageUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={trip.plotTitle} />
             </div>
             <div className="flex-grow space-y-4">
                <div className="flex justify-between items-start">
                   <div>
                      <div className="flex items-center gap-2 mb-2 text-indigo-600 font-bold uppercase tracking-widest text-[10px]">
                        <MapPin className="w-3 h-3" />
                        {trip.plotLocation}
                      </div>
                      <h3 className="text-3xl font-black text-slate-900">{trip.plotTitle}</h3>
                   </div>
                   <div className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-black uppercase border border-indigo-100 flex items-center gap-2">
                      <CheckCircle2 className="w-3 h-3" /> Completed
                   </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                   <div className="bg-white/50 p-4 rounded-2xl shadow-sm border border-white">
                      <div className="flex items-center gap-2 mb-1 text-slate-400"><Calendar className="w-3 h-3" /><span className="text-[9px] font-black uppercase tracking-widest">Stay Dates</span></div>
                      <p className="text-xs font-bold text-slate-900">{trip.startDate} - {trip.endDate}</p>
                   </div>
                   <div className="bg-white/50 p-4 rounded-2xl shadow-sm border border-white">
                      <div className="flex items-center gap-2 mb-1 text-slate-400"><History className="w-3 h-3" /><span className="text-[9px] font-black uppercase tracking-widest">Total Cost</span></div>
                      <p className="text-xs font-bold text-slate-900">₹{trip.totalPrice}</p>
                   </div>
                </div>
             </div>
             <button className="w-full md:w-auto p-12 bg-slate-900 hover:bg-black text-white rounded-[2.5rem] shadow-xl transition-all flex items-center justify-center group/btn">
                <span className="font-black uppercase tracking-widest text-xs">Book Again</span>
                <ChevronRight className="w-5 h-5 ml-2 group-hover/btn:translate-x-1 transition-transform" />
             </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TripsView;
