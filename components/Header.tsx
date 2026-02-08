import React from 'react';
import { Activity } from 'lucide-react';

interface HeaderProps {
  onLoginClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onLoginClick }) => {
  return (
    <header className="sticky top-0 z-50 w-full px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo Area */}
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg shadow-blue-500/20">
            <Activity className="w-6 h-6 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-white drop-shadow-sm">
              IBKR <span className="text-blue-400 font-light">System View</span>
            </span>
          </div>
        </div>

        {/* Login Button - The ONLY nav item as requested */}
        <button
          onClick={onLoginClick}
          className="group relative px-6 py-2.5 overflow-hidden rounded-full bg-white/10 backdrop-blur-md border border-white/20 transition-all duration-300 hover:bg-white/20 hover:border-white/40 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] active:scale-95"
        >
          <span className="relative z-10 font-medium text-sm tracking-wide text-white">
            Client Portal Login
          </span>
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-600/0 via-blue-600/30 to-blue-600/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
        </button>
      </div>
    </header>
  );
};