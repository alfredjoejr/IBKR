import React from 'react';
import { GlassCard } from './GlassCard';
import { Globe, TrendingUp, ShieldCheck, Zap } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col gap-12 sm:gap-20">
      
      {/* Hero Text */}
      <div className="text-center space-y-6 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-semibold tracking-wider uppercase backdrop-blur-md mb-4">
          <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
          Market Data Live
        </div>
        
        <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/50 drop-shadow-sm">
          Global Markets.<br />
          <span className="text-white/40">Glass Clarity.</span>
        </h1>
        
        <p className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
          The next generation interface for IBKR International. Trade US Stocks, Options, and Derivatives with institutional-grade precision wrapped in a refined aesthetic.
        </p>
      </div>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Feature 
          icon={<Globe className="w-6 h-6 text-cyan-400" />}
          title="Global Access"
          desc="Direct market access to 150+ markets across 33 countries."
        />
        <Feature 
          icon={<TrendingUp className="w-6 h-6 text-green-400" />}
          title="Derivatives"
          desc="Advanced options chains and futures with real-time Greeks."
        />
        <Feature 
          icon={<Zap className="w-6 h-6 text-yellow-400" />}
          title="Low Latency"
          desc="Lightning fast execution for high-frequency strategies."
        />
        <Feature 
          icon={<ShieldCheck className="w-6 h-6 text-purple-400" />}
          title="Secure"
          desc="SIPC protection up to $500,000 and excess SIPC coverage."
        />
      </div>

      {/* System Preview Section */}
      <GlassCard className="p-1 min-h-[300px] flex items-center justify-center relative group">
         <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5" />
         
         <div className="w-full h-full p-8 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-4 max-w-lg">
                <h3 className="text-2xl font-semibold text-white">Unified System View</h3>
                <p className="text-white/50">
                    Experience a trading terminal designed for visual clarity. Our "System View" integrates portfolio analysis, watchlist monitoring, and execution into a single, seamless glass pane.
                </p>
                <div className="flex gap-4 pt-2">
                    <div className="h-2 w-24 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full w-2/3 bg-blue-500 rounded-full" />
                    </div>
                    <span className="text-xs text-blue-400 font-mono">SYSTEM OPTIMAL</span>
                </div>
            </div>

            {/* Abstract UI Representation */}
            <div className="relative w-full md:w-1/2 aspect-video rounded-xl bg-black/40 border border-white/10 p-4 shadow-inner overflow-hidden">
                {/* Mock Chart Line */}
                <svg className="absolute bottom-0 left-0 right-0 h-3/4 w-full opacity-50" preserveAspectRatio="none">
                    <path d="M0,100 C100,80 200,120 300,60 C400,20 500,80 600,40 L600,200 L0,200 Z" fill="url(#grad1)" />
                    <defs>
                        <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" style={{stopColor:'rgba(59,130,246,0.4)', stopOpacity:1}} />
                            <stop offset="100%" style={{stopColor:'rgba(59,130,246,0)', stopOpacity:0}} />
                        </linearGradient>
                    </defs>
                </svg>
                {/* Floating Elements */}
                <div className="absolute top-4 right-4 px-3 py-1 bg-green-500/20 text-green-400 border border-green-500/30 rounded-lg text-xs font-mono">
                    AAPL +1.24%
                </div>
                <div className="absolute top-12 right-4 px-3 py-1 bg-red-500/20 text-red-400 border border-red-500/30 rounded-lg text-xs font-mono">
                    TSLA -0.45%
                </div>
            </div>
         </div>
      </GlassCard>
    </div>
  );
};

const Feature = ({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) => (
  <GlassCard hoverEffect className="p-6">
    <div className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center mb-4 border border-white/10">
      {icon}
    </div>
    <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
    <p className="text-sm text-white/50 leading-relaxed">{desc}</p>
  </GlassCard>
);