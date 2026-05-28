'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sparkles, Mail, Lock, ArrowRight, Eye, EyeOff, AlertCircle, CheckCircle2, ExternalLink } from 'lucide-react';
import { login, DEMO_USERS } from '@/lib/auth';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    // Simulate network latency
    await new Promise((r) => setTimeout(r, 800));
    const ok = login(email, password);
    if (ok) {
      router.push('/dashboard');
    } else {
      setError('Invalid email or password. Use the demo credentials below.');
      setLoading(false);
    }
  };

  const fillDemo = (userEmail: string, userPassword: string) => {
    setEmail(userEmail);
    setPassword(userPassword);
    setError('');
  };

  return (
    <div className="min-h-screen flex" style={{ background: '#0a0f1e' }}>

      {/* ── Left panel: branding ───────────────────────────────── */}
      <div className="hidden lg:flex lg:w-[52%] flex-col justify-between p-12 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0f172a 0%, #0d2444 60%, #0f2d1a 100%)' }}>

        {/* Background grid */}
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'linear-gradient(rgba(16,185,129,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.4) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }} />

        {/* Glow effects */}
        <div className="absolute top-1/4 left-1/3 w-96 h-96 rounded-full opacity-10 blur-3xl"
          style={{ background: '#10b981' }} />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full opacity-8 blur-3xl"
          style={{ background: '#3b82f6' }} />

        {/* Logo */}
        <div className="relative z-10 flex items-center gap-3">
          {/* <div className="flex items-center justify-center w-10 h-10 rounded-xl" */}
            {/* style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}> */}
            {/* <Sparkles size={18} className="text-white" /> */}
          {/* </div> */}
          <div>
            <div className="text-white font-bold text-[20px] leading-none"
              style={{ fontFamily: 'var(--font-syne), Syne, sans-serif', letterSpacing: '-0.03em' }}>
              OpsInsyts
            </div>
            {/* <div className="text-[11px] mt-0.5" style={{ color: '#10b981' }}>AI Operating Layer</div> */}
          </div>
        </div>

        {/* Hero content */}
        <div className="relative z-10 space-y-8">
          <div>
            <h1 className="text-[40px] font-bold leading-tight mb-4"
              style={{ fontFamily: 'var(--font-syne), Syne, sans-serif', color: '#f8fafc', letterSpacing: '-0.04em' }}>
              From ledger data<br />
              to <span style={{ color: '#10b981' }}>decisive action</span><br />
              in 90 seconds.
            </h1>
            <p className="text-[15px] leading-relaxed max-w-sm" style={{ color: '#94a3b8' }}>
              OpsInsyts transforms your accounting data into a real-time operational intelligence layer — surfacing risks, drafting actions, and automating workflows before problems escalate.
            </p>
          </div>

          {/* Feature highlights */}
          <div className="space-y-3">
            {[
              { label: 'Five health indicators, three actions — every morning', color: '#10b981' },
              { label: 'Three-phase AI document validation pipeline', color: '#3b82f6' },
              { label: 'Accountant portal managing 20+ SME clients', color: '#8b5cf6' },
              { label: 'Intelligent workflow orchestration over Sage APIs', color: '#f59e0b' },
            ].map((f) => (
              <div key={f.label} className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: f.color }} />
                <span className="text-[13px]" style={{ color: '#cbd5e1' }}>{f.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom stats */}
        <div className="relative z-10 grid grid-cols-3 gap-4">
          {[
            { value: '90s', label: 'Morning ritual' },
            { value: '97%', label: 'OCR accuracy' },
            { value: '10min', label: 'Onboarding' },
          ].map((s) => (
            <div key={s.label} className="rounded-xl p-3"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <div className="text-[22px] font-bold text-white"
                style={{ fontFamily: 'var(--font-syne), Syne, sans-serif' }}>{s.value}</div>
              <div className="text-[11px] mt-0.5" style={{ color: '#64748b' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Right panel: login form ────────────────────────────── */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 lg:p-16">

        {/* Mobile logo */}
        <div className="lg:hidden flex items-center gap-2.5 mb-10">
          <div className="flex items-center justify-center w-9 h-9 rounded-xl"
            style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}>
            <Sparkles size={16} className="text-white" />
          </div>
          <span className="text-white font-bold text-[18px]"
            style={{ fontFamily: 'var(--font-syne), Syne, sans-serif' }}>OpsInsyts</span>
        </div>

        <div className="w-full max-w-[400px]">
          {/* Heading */}
          <div className="mb-8">
            <h2 className="text-[26px] font-bold text-white mb-1.5"
              style={{ fontFamily: 'var(--font-syne), Syne, sans-serif', letterSpacing: '-0.03em' }}>
              Sign in
            </h2>
            <p className="text-[14px]" style={{ color: '#64748b' }}>
              Access your operational intelligence dashboard
            </p>
          </div>

          {/* Demo credentials */}
          <div className="rounded-xl p-4 mb-6"
            style={{ background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.2)' }}>
            <p className="text-[11px] font-semibold uppercase tracking-wider mb-3" style={{ color: '#10b981' }}>
              Demo Accounts
            </p>
            <div className="space-y-2">
              {DEMO_USERS.map((u) => (
                <button
                  key={u.email}
                  onClick={() => fillDemo(u.email, u.password)}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-all hover:scale-[1.01]"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <div>
                    <div className="text-[12px] font-semibold text-white">{u.name}</div>
                    <div className="text-[10px] mt-0.5" style={{ color: '#64748b' }}>{u.email} · {u.role}</div>
                  </div>
                  <div className="text-[10px] px-2 py-1 rounded-full"
                    style={{ background: 'rgba(16,185,129,0.15)', color: '#10b981' }}>
                    Use
                  </div>
                </button>
              ))}
            </div>
            <p className="text-[10px] mt-2" style={{ color: '#475569' }}>Password for all demo accounts: <code style={{ color: '#94a3b8' }}>demo123</code></p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-[12px] font-medium mb-1.5" style={{ color: '#94a3b8' }}>Email address</label>
              <div className="relative">
                <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: '#475569' }} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.co.za"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl text-[13px] outline-none transition-all"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: '#f1f5f9',
                    caretColor: '#10b981',
                  }}
                  onFocus={e => (e.target.style.borderColor = 'rgba(16,185,129,0.5)')}
                  onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-[12px] font-medium mb-1.5" style={{ color: '#94a3b8' }}>Password</label>
              <div className="relative">
                <Lock size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: '#475569' }} />
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-10 pr-10 py-3 rounded-xl text-[13px] outline-none transition-all"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: '#f1f5f9',
                    caretColor: '#10b981',
                  }}
                  onFocus={e => (e.target.style.borderColor = 'rgba(16,185,129,0.5)')}
                  onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 transition-colors"
                  style={{ color: showPass ? '#10b981' : '#475569' }}>
                  {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-start gap-2 p-3 rounded-xl"
                style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)' }}>
                <AlertCircle size={14} style={{ color: '#ef4444', flexShrink: 0, marginTop: 1 }} />
                <p className="text-[12px]" style={{ color: '#fca5a5' }}>{error}</p>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl text-[14px] font-semibold text-white flex items-center justify-center gap-2 transition-all hover:opacity-90 disabled:opacity-60 mt-2"
              style={{ background: loading ? '#059669' : 'linear-gradient(135deg, #10b981, #059669)' }}>
              {loading ? (
                <>
                  <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                  Signing in…
                </>
              ) : (
                <>Sign in <ArrowRight size={15} /></>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.07)' }} />
            <span className="text-[11px]" style={{ color: '#334155' }}>or</span>
            <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.07)' }} />
          </div>

          {/* Sage OAuth button */}
          <button className="w-full py-3 rounded-xl text-[13px] font-semibold flex items-center justify-center gap-2.5 transition-all hover:opacity-80"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#94a3b8' }}>
            <div className="w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold text-white"
              style={{ background: '#00dc84' }}>S</div>
            Connect with Sage Business Cloud
            <ExternalLink size={12} style={{ color: '#475569' }} />
          </button>

          {/* Footer */}
          <p className="text-center text-[11px] mt-8" style={{ color: '#334155' }}>
            OpsInsyts · Prototype · Not for production use
          </p>
        </div>
      </div>
    </div>
  );
}
