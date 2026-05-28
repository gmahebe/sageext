'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated } from '@/lib/auth';

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.replace(isAuthenticated() ? '/dashboard' : '/login');
  }, [router]);
  return (
    <div className="flex items-center justify-center min-h-screen" style={{ background: '#0a0f1e' }}>
      <div className="w-4 h-4 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: '#10b981', borderTopColor: 'transparent' }} />
    </div>
  );
}
