import React, { useEffect, useState } from 'react';
import { X, Lock, ArrowRight } from 'lucide-react';
import { GlassCard } from './GlassCard';

interface LoginModalProps {
  onClose: () => void;
  onLogin: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ onClose, onLogin }) => {
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setMounted(true);
    document.body.style.overflow = 'hidden';
    return () => {
        document.body.style.overflow = 'unset';
    }
  }, []);

  const handleCredentialsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate network delay for checking credentials
    setTimeout(() => {
        setIsLoading(false);
        onLogin();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
        {/* Backdrop */}
        <div 
            className={`absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-300 ${mounted ? 'opacity-100' : 'opacity-0'}`}
            onClick={onClose}
        />

        {/* Modal Container */}
        <div className={`relative w-full max-w-md transform transition-all duration-300 ${mounted ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-4'}`}>
            <GlassCard className="flex flex-col border-white/20 shadow-2xl bg-[#0a0a0a]/90 overflow-hidden max-h-[90vh]">
                
                {/* Header */}
                <div className="flex items-start justify-between p-8 pb-4 border-b border-white/5">
                    <div className="space-y-1">
                        <h2 className="text-2xl font-bold text-white tracking-tight">Welcome Back</h2>
                        <p className="text-sm text-white/50">Access your IBKR System View</p>
                    </div>
                    <button 
                        onClick={onClose}
                        className="p-2 -mr-2 -mt-2 rounded-full hover:bg-white/10 text-white/40 hover:text-white transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Content Area */}
                <div className="p-8 pt-6 overflow-y-auto">
                    <form className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-300" onSubmit={handleCredentialsSubmit}>
                        <div className="space-y-5">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1">Username</label>
                                <input 
                                    type="text" 
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/20 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all font-medium"
                                    placeholder="Enter your username"
                                    defaultValue="alfredjoe07089"
                                />
                            </div>
                            
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1">Password</label>
                                <input 
                                    type="password"
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/20 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all font-medium"
                                    placeholder="••••••••"
                                    defaultValue="password"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between text-sm pt-1">
                            <label className="flex items-center gap-2 cursor-pointer group">
                                <div className="relative flex items-center">
                                    <input type="checkbox" className="peer w-4 h-4 rounded border-white/20 bg-white/5 checked:bg-blue-500 checked:border-blue-500 focus:ring-offset-0 focus:ring-0 cursor-pointer appearance-none transition-all" />
                                    <svg className="absolute w-3 h-3 text-white pointer-events-none opacity-0 peer-checked:opacity-100 left-0.5 top-0.5 transition-opacity" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="20 6 9 17 4 12"></polyline>
                                    </svg>
                                </div>
                                <span className="text-white/50 group-hover:text-white/70 transition-colors">Remember me</span>
                            </label>
                        </div>

                        <button 
                            type="submit"
                            disabled={isLoading}
                            className="w-full group bg-blue-600 hover:bg-blue-500 text-white font-semibold py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(37,99,235,0.2)] hover:shadow-[0_0_30px_rgba(37,99,235,0.4)] flex items-center justify-center gap-2 mt-4 disabled:opacity-70 disabled:cursor-not-allowed active:scale-[0.98]"
                        >
                            {isLoading ? (
                                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    <Lock size={18} />
                                    <span>Secure Login</span>
                                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-white/5 bg-white/[0.02]">
                    <div className="flex justify-center items-center gap-2.5">
                         <div className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </div>
                        <span className="text-[10px] font-bold text-green-500/70 tracking-widest uppercase">System Operational</span>
                    </div>
                </div>

            </GlassCard>
        </div>
    </div>
  );
};