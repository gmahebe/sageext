'use client';
import { Bell, Search, RefreshCw, Menu } from 'lucide-react';
import { useNav } from '@/contexts/NavContext';
import { getSession } from '@/lib/auth';

interface TopBarProps {
  title: string;
  subtitle?: string;
}

export default function TopBar({ title, subtitle }: TopBarProps) {
  const { setMobileOpen } = useNav();
  const session = getSession();
  const initials = session?.name?.split(' ').map((w: string) => w[0]).join('').slice(0, 2) ?? 'OI';

  return (
    <header className="flex items-center justify-between px-4 md:px-6 py-3 md:py-4 bg-white border-b flex-shrink-0" style={{ borderColor: '#e2e8f0' }}>
      {/* Left: hamburger (mobile) + title */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={() => setMobileOpen(true)}
          className="md:hidden p-2 -ml-1 rounded-lg flex-shrink-0"
          style={{ color: '#334155' }}>
          <Menu size={20} />
        </button>
        <div className="min-w-0">
          <h1 className="font-bold text-[15px] md:text-[18px] text-slate-900 leading-tight truncate" style={{ fontFamily: 'Syne, sans-serif' }}>
            {title}
          </h1>
          {subtitle && (
            <p className="text-[11px] text-slate-400 mt-0.5 truncate hidden sm:block">{subtitle}</p>
          )}
        </div>
      </div>

      {/* Right: actions */}
      <div className="flex items-center gap-2 flex-shrink-0">
        {/* Search — hidden on mobile */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-2 rounded-lg text-[12px]"
          style={{ background: '#f1f5f9', color: '#94a3b8', border: '1px solid #e2e8f0' }}>
          <Search size={13} />
          <span>Search...</span>
          <span className="ml-1 text-[10px] px-1.5 py-0.5 rounded" style={{ background: '#e2e8f0', color: '#64748b' }}>⌘K</span>
        </div>

        {/* Sync — hidden on mobile */}
        <button className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-lg text-[12px] font-medium"
          style={{ color: '#64748b', border: '1px solid #e2e8f0' }}>
          <RefreshCw size={12} />
          <span className="hidden lg:inline">Synced 2m ago</span>
        </button>

        {/* Bell */}
        <button className="relative p-2 rounded-lg" style={{ border: '1px solid #e2e8f0' }}>
          <Bell size={15} style={{ color: '#64748b' }} />
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full" style={{ background: '#ef4444' }} />
        </button>

        {/* Avatar */}
        <div className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold text-white cursor-pointer flex-shrink-0"
          style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)' }}>
          {initials}
        </div>
      </div>
    </header>
  );
}
