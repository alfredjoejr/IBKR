import React, { useState } from 'react';
import { GlassCard } from './GlassCard';
import { 
  LogOut, PieChart, TrendingUp, TrendingDown, Activity, Search, 
  Bell, Settings, DollarSign, ChevronDown, Plus, Minus, Lock, X, Wallet,
  ArrowUpRight, ArrowDownRight, BarChart3
} from 'lucide-react';

interface DashboardProps {
  onLogout: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  const [readOnlyOpen, setReadOnlyOpen] = useState(false);

  const handleLockedAction = () => {
    setReadOnlyOpen(true);
  };

  return (
    <div className="flex h-screen w-full relative z-10 overflow-hidden">
      {/* Read Only Overlay - Global for Dashboard */}
      {readOnlyOpen && (
        <div className="absolute inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <GlassCard className="p-8 max-w-sm w-full mx-4 border-white/20 shadow-2xl bg-black/80">
                <div className="flex flex-col items-center text-center space-y-4">
                    <div className="p-4 bg-white/5 rounded-full border border-white/10 text-white shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                        <Lock size={32} />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white">Read Only Mode</h3>
                        <p className="text-sm text-white/50 mt-2">
                            You do not have permission to access this feature or execute trades in the current session.
                        </p>
                    </div>
                    <button 
                        onClick={() => setReadOnlyOpen(false)}
                        className="mt-2 w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-all shadow-lg shadow-blue-500/20 active:scale-95"
                    >
                        Dismiss
                    </button>
                </div>
            </GlassCard>
        </div>
      )}

      {/* Sidebar Navigation */}
      <Sidebar onLogout={onLogout} onLockedAction={handleLockedAction} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Top HUD (Heads Up Display) */}
        <TopBar />

        {/* Workspace Grid */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto">
          <div className="grid grid-cols-12 gap-6 h-full max-w-[1920px] mx-auto">
            
            {/* Left Column: Portfolio & Chart */}
            <div className="col-span-12 lg:col-span-8 flex flex-col gap-6">
              
              {/* Account Overview Section */}
              <GlassCard className="flex-1 min-h-[400px] p-8 flex flex-col relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                
                {/* Header Metrics */}
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-8 mb-10 relative z-10">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <Wallet className="w-4 h-4 text-white/40" />
                            <h2 className="text-xs font-semibold text-white/50 uppercase tracking-widest">Total Balance</h2>
                        </div>
                        <div className="flex items-baseline gap-2">
                            <span className="text-5xl sm:text-6xl font-light text-white tracking-tight">67,850</span>
                            <span className="text-xl text-white/40 font-medium">USD</span>
                        </div>
                        <div className="flex items-center gap-2 mt-3 text-green-400 text-sm font-medium bg-green-500/10 px-3 py-1.5 rounded-lg w-fit border border-green-500/10">
                            <TrendingUp size={14} />
                            <span>+4.2% All Time</span>
                        </div>
                    </div>
                    
                    <div className="md:text-right p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                         <h2 className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">Buying Power</h2>
                         <div className="text-2xl font-mono text-white tracking-tight">1,500 <span className="text-sm text-white/30">USD</span></div>
                    </div>
                </div>

                {/* Shares Info Breakdown */}
                <div className="flex-1 flex flex-col gap-6 relative z-10">
                    <h3 className="text-sm font-semibold text-white/80 border-b border-white/10 pb-3 flex items-center gap-2">
                        <PieChart size={16} className="text-blue-400" />
                        Portfolio Allocation
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Asset Card 1 */}
                        <div className="p-5 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-white/20 transition-colors group">
                            <div className="flex justify-between items-start mb-3">
                                <div className="flex flex-col">
                                    <span className="font-semibold text-lg text-white group-hover:text-blue-300 transition-colors">Nifty Fifty</span>
                                    <span className="text-xs text-white/40">Index Fund</span>
                                </div>
                                <div className="h-8 w-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                                    <TrendingUp size={16} />
                                </div>
                            </div>
                            <div className="flex items-end justify-between">
                                <div className="text-2xl font-light text-white">28,000 <span className="text-xs text-white/30">USD</span></div>
                                <div className="text-xs text-white/40 font-mono">41.2%</div>
                            </div>
                            <div className="w-full bg-white/5 h-1 rounded-full mt-3 overflow-hidden">
                                <div className="h-full bg-blue-500 w-[41.2%] shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                            </div>
                        </div>

                        {/* Asset Card 2 */}
                        <div className="p-5 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-white/20 transition-colors group">
                            <div className="flex justify-between items-start mb-3">
                                <div className="flex flex-col">
                                    <span className="font-semibold text-lg text-white group-hover:text-orange-300 transition-colors">Indian Oil</span>
                                    <span className="text-xs text-white/40">Energy Sector</span>
                                </div>
                                <div className="h-8 w-8 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400">
                                    <Activity size={16} />
                                </div>
                            </div>
                            <div className="flex items-end justify-between">
                                <div className="text-2xl font-light text-white">10,000 <span className="text-xs text-white/30">USD</span></div>
                                <div className="text-xs text-white/40 font-mono">14.7%</div>
                            </div>
                            <div className="w-full bg-white/5 h-1 rounded-full mt-3 overflow-hidden">
                                <div className="h-full bg-orange-500 w-[14.7%] shadow-[0_0_10px_rgba(249,115,22,0.5)]" />
                            </div>
                        </div>
                    </div>

                    {/* Remaining Section */}
                    <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="text-xs font-bold text-white/40 uppercase tracking-wider">Remaining</div>
                            <div className="h-4 w-px bg-white/10" />
                            <div className="flex gap-2">
                                <span className="px-2 py-1 rounded bg-white/10 text-xs font-mono text-white/80 border border-white/5">NVDA</span>
                                <span className="px-2 py-1 rounded bg-white/10 text-xs font-mono text-white/80 border border-white/5">GOOGLE</span>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-sm font-medium text-white/60">~29,850 USD</div>
                        </div>
                    </div>
                </div>

                {/* Subtle visual texture at bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              </GlassCard>

              {/* LIVE Trading Info (Replaces Open Positions Table) */}
              <GlassCard className="h-auto p-0 flex flex-col">
                <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5 backdrop-blur-md">
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                            <div className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-green-500 animate-ping opacity-20"></div>
                        </div>
                        <h3 className="font-semibold text-white/90 tracking-tight">Live Portfolio Feed</h3>
                    </div>
                    <div className="flex items-center gap-2">
                         <span className="text-[10px] font-bold bg-white/5 border border-white/10 px-2 py-1 rounded text-white/40 tracking-wider">REALTIME</span>
                    </div>
                </div>
                
                {/* Live Data Grid Header */}
                <div className="grid grid-cols-12 gap-4 px-6 py-2 bg-white/5 text-[10px] font-bold text-white/30 uppercase tracking-wider border-b border-white/5">
                    <div className="col-span-3">Instrument</div>
                    <div className="col-span-3 text-right">Last / Change</div>
                    <div className="col-span-3 text-right">Spread</div>
                    <div className="col-span-3 text-right">Volume</div>
                </div>

                <div className="divide-y divide-white/5">
                    <LiveTickerRow 
                        symbol="NVDA" 
                        name="NVIDIA Corp" 
                        price="887.45" 
                        change="12.30" 
                        changePct="1.41" 
                        isUp={true}
                        bid="887.40" 
                        bidSz="10"
                        ask="887.50" 
                        askSz="5"
                        vol="45.2M"
                        volPct={85}
                    />
                    <LiveTickerRow 
                        symbol="AAPL" 
                        name="Apple Inc" 
                        price="173.20" 
                        change="-1.48" 
                        changePct="0.85" 
                        isUp={false}
                        bid="173.15" 
                        bidSz="50"
                        ask="173.25" 
                        askSz="120"
                        vol="32.1M"
                        volPct={45}
                    />
                    <LiveTickerRow 
                        symbol="TSLA" 
                        name="Tesla Inc" 
                        price="175.34" 
                        change="-3.75" 
                        changePct="2.10" 
                        isUp={false}
                        bid="175.30" 
                        bidSz="25"
                        ask="175.40" 
                        askSz="40"
                        vol="89.5M"
                        volPct={92}
                    />
                    <LiveTickerRow 
                        symbol="SPY" 
                        name="SPDR S&P 500" 
                        price="512.30" 
                        change="2.30" 
                        changePct="0.45" 
                        isUp={true}
                        bid="512.28" 
                        bidSz="500"
                        ask="512.32" 
                        askSz="650"
                        vol="65.4M"
                        volPct={60}
                    />
                </div>
              </GlassCard>
            </div>

            {/* Right Column: Order Entry & Watchlist */}
            <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
                
                {/* Order Entry */}
                <OrderEntry onLockedAction={handleLockedAction} />

                {/* Watchlist */}
                <GlassCard className="flex-1 flex flex-col p-0">
                    <div className="p-4 border-b border-white/10 bg-white/5">
                        <h3 className="font-semibold text-white/90">Watchlist</h3>
                    </div>
                    <div className="flex-1 overflow-y-auto custom-scrollbar">
                        <div className="divide-y divide-white/5">
                             <WatchlistRow symbol="AMD" name="Adv Micro Devices" change={2.4} price={180.20} />
                             <WatchlistRow symbol="MSFT" name="Microsoft Corp" change={0.8} price={420.55} />
                             <WatchlistRow symbol="COIN" name="Coinbase Global" change={-4.2} price={245.10} />
                             <WatchlistRow symbol="META" name="Meta Platforms" change={1.1} price={495.30} />
                             <WatchlistRow symbol="GOOGL" name="Alphabet Inc" change={-0.3} price={148.90} />
                             <WatchlistRow symbol="AMZN" name="Amazon.com" change={0.5} price={178.15} />
                        </div>
                    </div>
                </GlassCard>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

/* --- Sub Components --- */

const LiveTickerRow = ({ symbol, name, price, change, changePct, isUp, bid, bidSz, ask, askSz, vol, volPct }: any) => (
    <div className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-white/5 transition-all duration-200 items-center group cursor-default relative overflow-hidden">
        {/* Hover Highlight */}
        <div className="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/[0.02] transition-colors" />

        {/* Symbol & Name */}
        <div className="col-span-3 relative z-10">
            <div className="font-bold text-base text-white group-hover:text-blue-400 transition-colors">{symbol}</div>
            <div className="text-[10px] text-white/40 uppercase tracking-wider truncate">{name}</div>
        </div>

        {/* Price & Change */}
        <div className="col-span-3 text-right relative z-10">
            <div className={`text-lg font-mono tracking-tight font-medium ${isUp ? 'text-green-400' : 'text-red-400'}`}>
                {price}
            </div>
            <div className={`text-[10px] font-bold flex items-center justify-end gap-1 ${isUp ? 'text-green-500/70' : 'text-red-500/70'}`}>
                {isUp ? <ArrowUpRight size={10} strokeWidth={3} /> : <ArrowDownRight size={10} strokeWidth={3} />}
                {isUp ? '+' : ''}{change} ({changePct}%)
            </div>
        </div>

        {/* Bid / Ask */}
        <div className="col-span-3 flex flex-col justify-center relative z-10">
            <div className="flex justify-between text-[10px] items-center mb-1">
                <span className="text-white/30 uppercase font-bold">Bid</span>
                <div className="flex gap-1.5 font-mono">
                    <span className="text-white/90">{bid}</span>
                    <span className="text-white/40">x{bidSz}</span>
                </div>
            </div>
            <div className="flex justify-between text-[10px] items-center">
                <span className="text-white/30 uppercase font-bold">Ask</span>
                <div className="flex gap-1.5 font-mono">
                    <span className="text-white/90">{ask}</span>
                    <span className="text-white/40">x{askSz}</span>
                </div>
            </div>
        </div>

        {/* Volume */}
        <div className="col-span-3 text-right relative z-10">
             <div className="flex items-center justify-end gap-1 text-[10px] text-white/40 mb-1.5">
                <BarChart3 size={10} />
                <span>VOL</span>
             </div>
             <div className="text-sm text-white font-mono mb-1">{vol}</div>
             {/* Volume bar visual */}
             <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden flex justify-end">
                <div 
                    className={`h-full rounded-full opacity-60 ${isUp ? 'bg-green-500' : 'bg-red-500'}`} 
                    style={{ width: `${volPct}%` }}
                ></div>
             </div>
        </div>
    </div>
);

const Sidebar = ({ onLogout, onLockedAction }: { onLogout: () => void, onLockedAction: () => void }) => (
    <div className="w-20 border-r border-white/10 bg-black/20 backdrop-blur-xl flex flex-col items-center py-6 gap-8">
        <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg shadow-blue-500/20 mb-4">
            <Activity className="w-6 h-6 text-white" />
        </div>

        <nav className="flex-1 flex flex-col gap-6 w-full px-4">
            {/* Overview - Active and Unlocked */}
            <NavItem icon={<PieChart size={24} />} active onClick={() => {}} />
            
            {/* Other items - Locked */}
            <NavItem icon={<TrendingUp size={24} />} onClick={onLockedAction} locked />
            <NavItem icon={<Search size={24} />} onClick={onLockedAction} locked />
            <NavItem icon={<Bell size={24} />} onClick={onLockedAction} locked />
            <NavItem icon={<Settings size={24} />} onClick={onLockedAction} locked />
        </nav>

        <button 
            onClick={onLogout}
            className="p-3 rounded-xl text-white/40 hover:text-red-400 hover:bg-white/5 transition-all mt-auto"
            title="Logout"
        >
            <LogOut size={24} />
        </button>
    </div>
);

const NavItem = ({ icon, active, onClick, locked }: { icon: React.ReactNode, active?: boolean, onClick: () => void, locked?: boolean }) => (
    <button 
        onClick={onClick}
        className={`w-full aspect-square rounded-2xl flex items-center justify-center transition-all duration-300 relative group
            ${active ? 'bg-white/10 text-blue-400 shadow-inner' : 'text-white/40 hover:text-white hover:bg-white/5'}`}
    >
        {icon}
        {locked && (
            <div className="absolute top-1 right-1 w-2 h-2 bg-white/20 rounded-full flex items-center justify-center">
                {/* Tiny indicator for locked state */}
            </div>
        )}
    </button>
);

const TopBar = () => (
    <header className="h-16 border-b border-white/10 bg-black/10 backdrop-blur-md flex items-center justify-between px-6">
        <div className="flex items-center gap-8">
            <h1 className="text-lg font-semibold text-white/90">System View</h1>
            <div className="h-6 w-px bg-white/10" />
            <div className="flex gap-6 text-sm">
                <Metric label="Net Liq" value="$67,850.00" trend="up" />
                <Metric label="Daily P&L" value="+$2,450.50" trend="up" color="text-green-400" />
                <Metric label="Buying Power" value="$1,500.00" trend="neutral" />
            </div>
        </div>
        
        <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs font-mono text-green-400">CONNECTED</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 ring-2 ring-white/10" />
        </div>
    </header>
);

const Metric = ({ label, value, trend, color }: { label: string, value: string, trend?: 'up' | 'down' | 'neutral', color?: string }) => (
    <div className="flex flex-col">
        <span className="text-[10px] uppercase tracking-wider text-white/40 font-semibold">{label}</span>
        <span className={`font-mono font-medium ${color || 'text-white/90'}`}>{value}</span>
    </div>
);

const WatchlistRow = ({ symbol, name, change, price }: { symbol: string, name: string, change: number, price: number }) => (
    <div className="px-4 py-3 flex items-center justify-between hover:bg-white/5 cursor-pointer transition-colors group">
        <div>
            <div className="font-semibold text-white group-hover:text-blue-400 transition-colors">{symbol}</div>
            <div className="text-xs text-white/40">{name}</div>
        </div>
        <div className="text-right">
            <div className="text-white font-mono">{price.toFixed(2)}</div>
            <div className={`text-xs font-medium ${change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {change >= 0 ? '+' : ''}{change}%
            </div>
        </div>
    </div>
);

const OrderEntry = ({ onLockedAction }: { onLockedAction: () => void }) => {
    const [side, setSide] = useState<'buy' | 'sell'>('buy');

    return (
        <GlassCard className="p-6 space-y-5">
            <div className="flex items-center justify-between">
                <h3 className="font-semibold text-white">Order Entry</h3>
                <div className="flex bg-white/5 rounded-lg p-1">
                    <button 
                        onClick={() => setSide('buy')}
                        className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${side === 'buy' ? 'bg-green-500 text-white shadow-lg shadow-green-500/20' : 'text-white/40 hover:text-white'}`}
                    >
                        BUY
                    </button>
                    <button 
                        onClick={() => setSide('sell')}
                        className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${side === 'sell' ? 'bg-red-500 text-white shadow-lg shadow-red-500/20' : 'text-white/40 hover:text-white'}`}
                    >
                        SELL
                    </button>
                </div>
            </div>

            <div className="space-y-4">
                {/* Symbol Input */}
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                    <input 
                        type="text" 
                        defaultValue="NVDA"
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white font-bold placeholder-white/20 focus:outline-none focus:border-blue-500/50 uppercase" 
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <label className="text-[10px] font-bold text-white/40 uppercase">Quantity</label>
                        <div className="relative">
                            <input type="number" defaultValue="10" className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-3 text-white font-mono focus:outline-none focus:border-blue-500/50" />
                        </div>
                    </div>
                    <div className="space-y-1">
                        <label className="text-[10px] font-bold text-white/40 uppercase">Order Type</label>
                        <div className="relative">
                            <select className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-3 text-white focus:outline-none focus:border-blue-500/50 appearance-none">
                                <option>LMT</option>
                                <option>MKT</option>
                                <option>STP</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
                        </div>
                    </div>
                </div>

                <div className="space-y-1">
                    <label className="text-[10px] font-bold text-white/40 uppercase">Limit Price</label>
                     <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/40" />
                        <input type="number" defaultValue="885.00" className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-8 pr-3 text-white font-mono focus:outline-none focus:border-blue-500/50" />
                    </div>
                </div>
            </div>

            <div className="pt-2">
                <button 
                    onClick={onLockedAction}
                    className={`w-full py-3.5 rounded-xl font-bold text-sm text-white shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 ${side === 'buy' ? 'bg-green-600 hover:bg-green-500 shadow-green-500/20' : 'bg-red-600 hover:bg-red-500 shadow-red-500/20'}`}
                >
                    <Lock size={16} className="opacity-80" />
                    <span>SUBMIT {side === 'buy' ? 'BUY' : 'SELL'} ORDER</span>
                </button>
            </div>
        </GlassCard>
    );
}