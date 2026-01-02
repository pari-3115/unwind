
import React, { useState } from 'react';
import { Plot } from '../types';
import { 
  X, MapPin, Star, Zap, Bath, Wifi, Droplets, Dog, 
  Shield, CheckCircle2, ChevronRight, 
  CreditCard, Share2, Heart, Copy, MessageCircle
} from 'lucide-react';

interface PlotDetailProps {
  plot: Plot;
  isSaved: boolean;
  onToggleSave: () => void;
  onClose: () => void;
}

const PlotDetail: React.FC<PlotDetailProps> = ({ plot, isSaved, onToggleSave, onClose }) => {
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showStripe, setShowStripe] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  const startStripeFlow = () => setShowStripe(true);

  const confirmPayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setShowStripe(false);
      setBookingSuccess(true);
    }, 2000);
  };

  const handleShare = (platform?: 'whatsapp' | 'copy') => {
    const shareUrl = window.location.href;
    const shareText = `Check out this amazing sanctuary: ${plot.title} in ${plot.location}!`;
    if (platform === 'whatsapp') window.open(`https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`);
    else if (platform === 'copy') { navigator.clipboard.writeText(shareUrl); alert("Link copied!"); }
    else setShowShareModal(true);
  };

  if (bookingSuccess) {
    return (
      <div className="fixed inset-0 z-[110] bg-slate-900/95 backdrop-blur-2xl flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-500">
        <div className="glass p-12 rounded-[4rem] max-w-lg w-full border-white/20 shadow-2xl">
          <div className="w-24 h-24 bg-indigo-500 text-white rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl animate-bounce">
            <CheckCircle2 className="w-12 h-12" />
          </div>
          <h2 className="text-4xl font-black text-white mb-4 tracking-tight">Confirmed!</h2>
          <p className="text-indigo-100 text-lg mb-8 leading-relaxed font-medium">
            Your sanctuary at <strong>{plot.title}</strong> is booked. Safe travels!
          </p>
          <button onClick={onClose} className="w-full bg-white text-indigo-600 font-black px-10 py-5 rounded-3xl shadow-2xl hover:bg-indigo-50 transition-all">Back to Home</button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] bg-white overflow-y-auto animate-in slide-in-from-bottom duration-500">
      <div className="relative min-h-screen bg-slate-50">
        <div className="h-[70vh] relative overflow-hidden">
          <img src={plot.imageUrl} className="w-full h-full object-cover" alt={plot.title} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
          <div className="absolute top-8 left-4 right-4 flex justify-between items-center z-10">
            <button onClick={onClose} className="glass p-3 rounded-xl hover:bg-white text-slate-900 transition-all shadow-xl"><X className="w-5 h-5" /></button>
            <div className="flex gap-4">
              <button onClick={() => setShowShareModal(true)} className="glass p-3 rounded-xl hover:bg-white text-slate-900 transition-all"><Share2 className="w-5 h-5" /></button>
              <button onClick={onToggleSave} className={`glass p-3 rounded-xl transition-all ${isSaved ? 'bg-white text-red-500' : 'text-slate-900'}`}><Heart className={`w-5 h-5 ${isSaved ? 'fill-red-500' : ''}`} /></button>
            </div>
          </div>
          <div className="absolute bottom-8 left-12 right-6">
            <h1 className="text-6xl font-black text-white mb-4 tracking-tight">{plot.title}</h1>
            <div className="flex items-center gap-2 text-white/80 font-bold"><MapPin className="w-5 h-5 text-indigo-400" /><span>{plot.location}</span></div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-8 py-16 grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 space-y-12">
            <div className="p-10 glass rounded-[3rem] border-white/80 shadow-xl">
               <div className="flex flex-col sm:flex-row gap-6 items-start">
                  <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg"><Shield className="w-7 h-7 text-white" /></div>
                  <div><h3 className="text-2xl font-black text-slate-900 mb-2">UnWind SafeGuard</h3><p className="text-slate-600 font-medium">Verified for accessibility, ground leveling, and standard route security protocols.</p></div>
               </div>
            </div>
            <div><h3 className="text-2xl font-black text-slate-900 mb-6">Experience Highlights</h3><p className="text-slate-600 leading-relaxed text-lg font-medium">{plot.description}</p></div>
            <div className="pt-8 border-t border-slate-200/50">
              <h3 className="text-xl font-black text-slate-900 mb-8">Sanctuary Essentials</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
                {Object.entries(plot.amenities).map(([key, value]) => (
                  <div key={key} className={`flex items-center gap-3 p-4 rounded-2xl ${value ? 'bg-white shadow-sm ring-1 ring-slate-100' : 'opacity-10'}`}>
                    <div className={`p-2 rounded-xl ${value ? 'bg-indigo-50 text-indigo-600' : 'bg-slate-50'}`}>
                      {key === 'evCharging' && <Zap className="w-5 h-5" />}{key === 'bathroom' && <Bath className="w-5 h-5" />}{key === 'wifi' && <Wifi className="w-5 h-5" />}{key === 'waterHookup' && <Droplets className="w-5 h-5" />}{key === 'petFriendly' && <Dog className="w-5 h-5" />}
                    </div>
                    <span className="font-bold text-sm text-slate-800 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-28 glass rounded-[2.5rem] border-white shadow-2xl p-8 flex flex-col gap-6">
              <div className="flex items-baseline gap-1"><span className="text-4xl font-black text-slate-900">₹{plot.pricePerNight}</span><span className="text-slate-400 font-bold text-sm uppercase">/ night</span></div>
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <div className="flex justify-between text-xs font-bold uppercase text-slate-500"><span>Base Rate</span><span className="text-slate-900">₹{plot.pricePerNight}</span></div>
                <div className="flex justify-between text-xs font-bold uppercase text-slate-500"><span>Service Fee</span><span className="text-slate-900">₹250</span></div>
                <div className="pt-4 flex justify-between items-center border-t border-slate-100"><span className="text-xl font-black text-slate-900">Total</span><span className="text-2xl font-black text-indigo-600">₹{plot.pricePerNight + 250}</span></div>
              </div>
              <button onClick={startStripeFlow} className="w-full py-5 rounded-3xl text-white bg-slate-900 hover:bg-black font-black text-lg flex items-center justify-center gap-3 transition-all shadow-xl"><CreditCard className="w-6 h-6" />Reserve sanctuary</button>
            </div>
          </div>
        </div>
      </div>

      {showShareModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-6">
          <div className="glass rounded-[2rem] w-full max-w-sm p-8 animate-in zoom-in duration-300">
             <div className="flex justify-between items-center mb-8"><h3 className="text-xl font-black text-slate-900">Share Sanctuary</h3><button onClick={() => setShowShareModal(false)} className="p-2 hover:bg-slate-100 rounded-xl"><X className="w-5 h-5" /></button></div>
             <div className="grid grid-cols-2 gap-4">
                <button onClick={() => handleShare('whatsapp')} className="flex flex-col items-center gap-2 p-5 bg-indigo-50 text-indigo-600 rounded-2xl"><MessageCircle className="w-8 h-8" /><span className="text-[9px] font-black uppercase">WhatsApp</span></button>
                <button onClick={() => handleShare('copy')} className="flex flex-col items-center gap-2 p-5 bg-slate-100 rounded-2xl"><Copy className="w-8 h-8" /><span className="text-[9px] font-black uppercase">Copy Link</span></button>
             </div>
          </div>
        </div>
      )}

      {showStripe && (
        <div className="fixed inset-0 z-[200] bg-slate-100 flex items-center justify-center p-0 sm:p-4 overflow-y-auto">
           <div className="bg-white w-full max-w-4xl min-h-screen sm:min-h-[600px] shadow-2xl sm:rounded-3xl flex flex-col md:flex-row overflow-hidden">
              <div className="w-full md:w-1/2 p-8 bg-slate-50 border-r border-slate-100">
                 <button onClick={() => setShowStripe(false)} className="mb-12 flex items-center gap-2 text-slate-500 font-bold hover:text-slate-900"><ChevronRight className="w-4 h-4 rotate-180" /> Back</button>
                 <div className="mb-8"><p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] mb-2">Secure Checkout</p><h2 className="text-4xl font-black text-slate-900 mb-2">₹{plot.pricePerNight + 250}</h2><p className="text-slate-500 font-medium">{plot.title} reservation</p></div>
              </div>
              <div className="w-full md:w-1/2 p-8 bg-white">
                 <h3 className="text-xl font-bold text-slate-900 mb-8">Pay with Card</h3>
                 <div className="space-y-6">
                    <div className="border border-slate-200 rounded-xl overflow-hidden"><input type="text" placeholder="Card number" className="w-full px-4 py-4 border-b border-slate-100 outline-none" /><div className="flex"><input type="text" placeholder="MM / YY" className="w-1/2 px-4 py-4 border-r border-slate-100 outline-none" /><input type="text" placeholder="CVC" className="w-1/2 px-4 py-4 outline-none" /></div></div>
                    <button onClick={confirmPayment} disabled={isProcessing} className="w-full bg-[#635BFF] hover:bg-[#5249E0] text-white font-black py-5 rounded-2xl shadow-lg flex items-center justify-center gap-3 transition-all">{isProcessing ? "Processing..." : `Complete Booking`}</button>
                    <p className="text-[10px] text-slate-400 text-center font-bold uppercase tracking-tighter">Powered by Stripe • Vercel Ready</p>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default PlotDetail;
