'use client';
import { Bell, Search, RefreshCw } from 'lucide-react';

interface TopBarProps {
  title: string;
  subtitle?: string;
}

export default function TopBar({ title, subtitle }: TopBarProps) {
  const now = new Date();
  const dateStr = now.toLocaleDateString('en-ZA', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white border-b" style={{ borderColor: '#e2e8f0' }}>
      <div>
        <h1 className="font-bold text-[18px] text-slate-900 leading-tight" style={{ fontFamily: 'Syne, sans-serif' }}>
          {title}
        </h1>
        {subtitle && <p className="text-[12px] text-slate-400 mt-0.5">{subtitle || dateStr}</p>}
      </div>

      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg text-[12px]"
          style={{ background: '#f1f5f9', color: '#94a3b8', border: '1px solid #e2e8f0' }}>
          <Search size={13} />
          <span>Search anything...</span>
          <span className="ml-2 text-[10px] px-1.5 py-0.5 rounded" style={{ background: '#e2e8f0', color: '#64748b' }}>⌘K</span>
        </div>

        {/* Sync status */}
        <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-[12px] font-medium transition-colors hover:bg-slate-50"
          style={{ color: '#64748b', border: '1px solid #e2e8f0' }}>
          <RefreshCw size={12} />
          <span>Synced 2m ago</span>
        </button>

        {/* Notifications */}
        <button className="relative p-2 rounded-lg transition-colors hover:bg-slate-50" style={{ border: '1px solid #e2e8f0' }}>
          <Bell size={15} style={{ color: '#64748b' }} />
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full" style={{ background: '#ef4444' }} />
        </button>

        {/* Avatar */}
        <div className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold text-white cursor-pointer"
          style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)' }}>
          TK
        </div>
      </div>
    </header>
  );
}
