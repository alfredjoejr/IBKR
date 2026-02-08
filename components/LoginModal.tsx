import React, { useEffect, useState } from 'react';
import { X, Lock, ArrowRight, AlertCircle, ShieldCheck, ChevronLeft } from 'lucide-react';
import * as OTPAuth from 'otpauth';
import { GlassCard } from './GlassCard';

interface LoginModalProps {
  onClose: () => void;
  onLogin: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ onClose, onLogin }) => {
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<1 | 2>(1); // Step 1: Credentials, Step 2: 2FA
  
  // Credentials State
  const [username, setUsername] = useState('alfredjoe07089');
  const [password, setPassword] = useState('');
  
  // 2FA State
  const [otp, setOtp] = useState('');
  
  const [error, setError] = useState('');

  useEffect(() => {
    setMounted(true);
    document.body.style.overflow = 'hidden';
    return () => {
        document.body.style.overflow = 'unset';
    }
  }, []);

  // --- Step 1: Verify Username & Password ---
  const handleCredentialsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
        setIsLoading(false);
        // STRICT PASSWORD CHECK
        if (username === 'alfredjoe07089' && password === 'DJGeQfQ6&RUrFHFnn*gKGa&7#f%gDPc21zDT!3') {
            setStep(2); // Move to 2FA step
        } else {
            setError('Invalid username or password');
        }
    }, 800);
  };

  // --- Step 2: Verify TOTP ---
  const handle2FASubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Verify TOTP using otpauth
    // Note: In a real app, this verification should happen on the server.
    try {
        const totp = new OTPAuth.TOTP({
            issuer: 'IBKR System View',
            label: 'AlfredJoe',
            algorithm: 'SHA1',
            digits: 6,
            period: 30,
            secret: 'HEFNOEINFOIMOEMDOEWFM' // Your specific secret
        });

        // Validate the token. Returns the delta (integer) if valid, null if invalid.
        // window: 1 allows for +/- 30 seconds of clock drift
        const delta = totp.validate({ token: otp, window: 1 });

        if (delta !== null) {
            // Success!
            setTimeout(() => {
                setIsLoading(false);
                onLogin();
            }, 600);
        } else {
            setIsLoading(false);
            setError('Invalid authentication code');
        }
    } catch (err) {
        setIsLoading(false);
        setError('Verification error');
        console.error(err);
    }
  };

  const handleBack = () => {
    setStep(1);
    setError('');
    setOtp('');
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
                        <h2 className="text-2xl font-bold text-white tracking-tight">
                            {step === 1 ? 'Welcome Back' : 'Two-Factor Auth'}
                        </h2>
                        <p className="text-sm text-white/50">
                            {step === 1 ? 'Access your IBKR System View' : 'Enter the code from your authenticator app'}
                        </p>
                    </div>
                    <button 
                        onClick={onClose}
                        className="p-2 -mr-2 -mt-2 rounded-full hover:bg-white/10 text-white/40 hover:text-white transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Content Area */}
                <div className="p-8 pt-6 overflow-y-auto min-h-[320px]">
                    
                    {/* Error Display */}
                    {error && (
                        <div className="mb-6 p-3 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center gap-3 text-red-400 text-sm animate-in fade-in slide-in-from-top-2">
                            <AlertCircle size={16} />
                            <span>{error}</span>
                        </div>
                    )}

                    {/* --- STEP 1 FORM --- */}
                    {step === 1 && (
                        <form className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-300" onSubmit={handleCredentialsSubmit}>
                            <div className="space-y-5">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1">Username</label>
                                    <input 
                                        type="text" 
                                        required
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/20 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all font-medium"
                                        placeholder="Enter your username"
                                    />
                                </div>
                                
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1">Password</label>
                                    <input 
                                        type="password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/20 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all font-medium"
                                        placeholder="••••••••"
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
                                        <span>Verify Password</span>
                                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </form>
                    )}

                    {/* --- STEP 2 FORM (2FA) --- */}
                    {step === 2 && (
                        <form className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300" onSubmit={handle2FASubmit}>
                             <div className="flex flex-col items-center justify-center py-4">
                                <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center mb-4 border border-blue-500/20 text-blue-400">
                                    <ShieldCheck size={32} />
                                </div>
                                <h3 className="text-white font-medium">Authenticator Check</h3>
                                <p className="text-white/40 text-sm mt-1 text-center max-w-[200px]">
                                    Enter the 6-digit code generated by your device.
                                </p>
                             </div>

                             <div className="space-y-2">
                                <input 
                                    type="text" 
                                    required
                                    maxLength={6}
                                    value={otp}
                                    onChange={(e) => {
                                        const val = e.target.value.replace(/[^0-9]/g, '');
                                        setOtp(val);
                                    }}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-center text-2xl tracking-[0.5em] text-white placeholder-white/10 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all font-mono"
                                    placeholder="000000"
                                    autoFocus
                                />
                            </div>

                            <div className="flex gap-3">
                                <button 
                                    type="button"
                                    onClick={handleBack}
                                    className="px-4 py-4 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors"
                                >
                                    <ChevronLeft size={20} />
                                </button>
                                <button 
                                    type="submit"
                                    disabled={isLoading || otp.length !== 6}
                                    className="flex-1 group bg-blue-600 hover:bg-blue-500 text-white font-semibold py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(37,99,235,0.2)] hover:shadow-[0_0_30px_rgba(37,99,235,0.4)] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed active:scale-[0.98]"
                                >
                                    {isLoading ? (
                                        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            <span>Verify Code</span>
                                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    )}

                </div>

                {/* Footer */}
                <div className="p-4 border-t border-white/5 bg-white/[0.02]">
                    <div className="flex justify-center items-center gap-2.5">
                         <div className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </div>
                        <span className="text-[10px] font-bold text-green-500/70 tracking-widest uppercase">
                            {step === 1 ? 'System Operational' : 'Secure Channel Active'}
                        </span>
                    </div>
                </div>

            </GlassCard>
        </div>
    </div>
  );
};