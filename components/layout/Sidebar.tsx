'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard, FileText, Users, Zap, Brain,
  BarChart3, Settings, ChevronRight, Sparkles,
  Bell, HelpCircle, LogOut
} from 'lucide-react';
import { logout, getSession } from '@/lib/auth';

const navItems = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, badge: null },
  { label: 'Documents', href: '/documents', icon: FileText, badge: '3' },
  { label: 'Client Portal', href: '/portal', icon: Users, badge: null },
  { label: 'Workflows', href: '/workflows', icon: Zap, badge: 'Live' },
  { label: 'AI Summaries', href: '/summaries', icon: Brain, badge: null },
  { label: 'Reports', href: '/reports', icon: BarChart3, badge: null },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const session = getSession();
  const initials = session?.name?.split(' ').map((w: string) => w[0]).join('').slice(0, 2) ?? 'SC';

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <aside className="flex flex-col w-[220px] min-h-screen flex-shrink-0" style={{ background: '#0f172a' }}>
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 py-5 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        {/* <div className="flex items-center justify-center w-8 h-8 rounded-lg" style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}> */}
          {/* <Sparkles size={14} className="text-white" /> */}
        {/* </div> */}
        <div>
          <div className="text-white font-bold text-[13px] leading-none" style={{ fontFamily: 'Syne, sans-serif', letterSpacing: '-0.02em' }}>
            OpsInsyts
          </div>
          {/* <div className="text-[10px] mt-0.5" style={{ color: '#10b981' }}>AI Operating Layer</div> */}
        </div>
      </div>

      {/* Sage Connected badge */}
      <div className="mx-3 my-3 rounded-lg px-3 py-2 flex items-center gap-2" style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)' }}>
        <div className="w-2 h-2 rounded-full pulse-green flex-shrink-0" style={{ background: '#10b981' }} />
        <span className="text-[11px] font-medium" style={{ color: '#6ee7b7' }}>Sage API Connected</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-2 space-y-0.5">
        <div className="px-3 pb-1">
          <span className="text-[10px] uppercase tracking-widest font-semibold" style={{ color: '#475569' }}>Main</span>
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] font-medium transition-all duration-150 group ${
                isActive ? 'nav-item-active' : ''
              }`}
              style={
                isActive
                  ? { color: '#10b981' }
                  : { color: '#94a3b8' }
              }
            >
              <Icon
                size={15}
                className={`flex-shrink-0 transition-colors ${isActive ? '' : 'group-hover:text-slate-300'}`}
                style={isActive ? { color: '#10b981' } : {}}
              />
              <span className="flex-1">{item.label}</span>
              {item.badge && (
                <span
                  className="text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                  style={
                    item.badge === 'Live'
                      ? { background: 'rgba(16,185,129,0.2)', color: '#10b981' }
                      : { background: '#1e293b', color: '#94a3b8' }
                  }
                >
                  {item.badge}
                </span>
              )}
              {isActive && <ChevronRight size={12} style={{ color: '#10b981' }} />}
            </Link>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div className="px-2 pb-4 space-y-0.5 border-t pt-3" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <Link href="/settings" className="flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] font-medium transition-colors" style={{ color: '#64748b' }}>
          <Settings size={15} />
          <span>Settings</span>
        </Link>
        <Link href="/help" className="flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] font-medium transition-colors" style={{ color: '#64748b' }}>
          <HelpCircle size={15} />
          <span>Help & Docs</span>
        </Link>
        <div className="mx-1 mt-2 p-3 rounded-lg" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold text-white flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)' }}>
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[12px] font-semibold text-white truncate">{session?.name ?? 'Demo User'}</div>
              <div className="text-[10px]" style={{ color: '#64748b' }}>{session?.role ?? ''}</div>
            </div>
            <button onClick={handleLogout} title="Sign out" className="flex-shrink-0 p-1 rounded hover:bg-white/10 transition-colors">
              <LogOut size={13} style={{ color: '#475569' }} />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
