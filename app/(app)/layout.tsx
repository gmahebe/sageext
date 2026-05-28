'use client';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import Sidebar from '@/components/layout/Sidebar';
import { isAuthenticated } from '@/lib/auth';
import { NavProvider, useNav } from '@/contexts/NavContext';
import {
  LayoutDashboard, FileText, Users, Zap, Brain, BarChart3, X
} from 'lucide-react';

const bottomNavItems = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Documents', href: '/documents', icon: FileText },
  { label: 'Portal', href: '/portal', icon: Users },
  { label: 'Workflows', href: '/workflows', icon: Zap },
  { label: 'Reports', href: '/reports', icon: BarChart3 },
];

function MobileDrawer() {
  const { mobileOpen, setMobileOpen } = useNav();
  if (!mobileOpen) return null;
  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 md:hidden"
        style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(2px)' }}
        onClick={() => setMobileOpen(false)}
      />
      {/* Drawer */}
      <div className="fixed inset-y-0 left-0 z-50 w-64 md:hidden flex flex-col"
        style={{ background: '#0f172a', boxShadow: '4px 0 24px rgba(0,0,0,0.4)' }}>
        <div className="flex items-center justify-between px-5 py-5 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
          <span className="text-white font-bold text-[16px]" style={{ fontFamily: 'Syne, sans-serif', letterSpacing: '-0.02em' }}>OpsInsyts</span>
          <button onClick={() => setMobileOpen(false)} className="p-1.5 rounded-lg" style={{ color: '#64748b' }}>
            <X size={18} />
          </button>
        </div>
        {/* Render the full sidebar content */}
        <Sidebar onClose={() => setMobileOpen(false)} />
      </div>
    </>
  );
}

function BottomNav() {
  const pathname = usePathname();
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 md:hidden flex items-stretch"
      style={{ background: '#0f172a', borderTop: '1px solid rgba(255,255,255,0.08)', paddingBottom: 'env(safe-area-inset-bottom)' }}>
      {bottomNavItems.map((item) => {
        const Icon = item.icon;
        const active = pathname === item.href || pathname.startsWith(item.href + '/');
        return (
          <Link key={item.href} href={item.href}
            className="flex-1 flex flex-col items-center justify-center py-2 gap-0.5 transition-all"
            style={{ color: active ? '#10b981' : '#475569' }}>
            <Icon size={19} />
            <span className="text-[9px] font-medium">{item.label}</span>
            {active && <div className="w-1 h-1 rounded-full" style={{ background: '#10b981' }} />}
          </Link>
        );
      })}
    </nav>
  );
}

function AppShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.replace('/login');
    } else {
      setChecked(true);
    }
  }, [router]);

  if (!checked) {
    return (
      <div className="flex items-center justify-center min-h-screen" style={{ background: '#0a0f1e' }}>
        <div className="w-4 h-4 rounded-full border-2 animate-spin" style={{ borderColor: '#10b981', borderTopColor: 'transparent' }} />
      </div>
    );
  }

  return (
    <div className="flex h-full min-h-screen">
      {/* Desktop sidebar */}
      <div className="hidden md:flex">
        <Sidebar />
      </div>

      {/* Mobile drawer + backdrop */}
      <MobileDrawer />

      {/* Main content — add bottom padding on mobile for the nav bar */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden pb-14 md:pb-0" style={{ background: '#f1f5f9' }}>
        {children}
      </div>

      {/* Mobile bottom nav */}
      <BottomNav />
    </div>
  );
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <NavProvider>
      <AppShell>{children}</AppShell>
    </NavProvider>
  );
}
