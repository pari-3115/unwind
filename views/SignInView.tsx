
import React, { useState } from 'react';
import { UserRole } from '../types';
import { ArrowRight, User as UserIcon, Briefcase, Shield } from 'lucide-react';

interface SignInViewProps {
  onSignIn: (role: UserRole) => void;
}

const SignInView: React.FC<SignInViewProps> = ({ onSignIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>(UserRole.TRAVELLER);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === '123' && password === '123') onSignIn(selectedRole);
    else setError('Demo use "123" for both fields.');
  };

  const roles = [
    { id: UserRole.TRAVELLER, label: 'TRAVELLER', icon: UserIcon },
    { id: UserRole.OWNER, label: 'OWNER', icon: Briefcase },
    { id: UserRole.ADMIN, label: 'ADMIN', icon: Shield },
  ];

  return (
    <div className="min-h-screen relative flex items-center justify-center p-6 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img src="https://www.godigit.com/content/dam/godigit/directportal/en/contenthm/best-places-to-visit-in-india.jpg" className="w-full h-full object-cover scale-110 blur-sm" alt="background" />
        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"></div>
      </div>

      <div className="relative z-10 w-full max-w-xl">
        <div className="text-center mb-10 flex flex-col items-center">
          <h1 className="text-5xl font-black text-white tracking-tight mb-2">UnWind</h1>
          <p className="text-slate-300 font-medium text-lg">Your sanctuary on the open road</p>
        </div>

        <div className="glass p-10 rounded-[3.5rem] border-white/20 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-3 gap-4">
              {roles.map((role) => (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => setSelectedRole(role.id)}
                  className={`flex flex-col items-center gap-3 p-4 rounded-3xl border transition-all ${
                    selectedRole === role.id 
                    ? 'bg-indigo-600 border-indigo-400 text-white shadow-lg' 
                    : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                  }`}
                >
                  <role.icon className={`w-6 h-6 ${selectedRole === role.id ? 'text-white' : 'text-slate-400'}`} />
                  <span className="text-[10px] font-black uppercase tracking-widest">{role.label}</span>
                </button>
              ))}
            </div>
            <div className="space-y-4">
              <input type="text" placeholder="Demo Email (123)" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-[1.5rem] py-5 px-6 text-white font-bold outline-none focus:ring-4 focus:ring-indigo-500/20" />
              <input type="password" placeholder="Demo Password (123)" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-[1.5rem] py-5 px-6 text-white font-bold outline-none focus:ring-4 focus:ring-indigo-500/20" />
            </div>
            {error && <div className="text-red-400 text-xs font-bold text-center">{error}</div>}
            <button type="submit" className="w-full bg-white text-slate-900 font-black py-6 rounded-[2rem] text-xl shadow-2xl hover:bg-indigo-50 transition-all flex items-center justify-center gap-3">Sign In <ArrowRight className="w-6 h-6" /></button>
          </form>
          <p className="mt-8 text-center text-[10px] font-black text-slate-500 uppercase tracking-widest">Secure Access Active</p>
        </div>
      </div>
    </div>
  );
};

export default SignInView;
