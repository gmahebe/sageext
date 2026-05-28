'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/layout/Sidebar';
import { isAuthenticated } from '@/lib/auth';

export default function AppLayout({ children }: { children: React.ReactNode }) {
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
        <div className="flex flex-col items-center gap-4">
          <div className="w-4 h-4 rounded-full border-2 border-emerald-400 border-t-transparent animate-spin" style={{ borderTopColor: 'transparent', borderColor: '#10b981' }} />
          <span className="text-[13px]" style={{ color: '#475569' }}>Loading…</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full min-h-screen">
      <div className="hidden md:flex">
        <Sidebar />
      </div>
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden" style={{ background: '#f1f5f9' }}>
        {children}
      </div>
    </div>
  );
}
