'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowRight, CheckCircle2, Zap, Brain, Users, FileText,
  TrendingUp, TrendingDown, AlertTriangle, ShieldCheck,
  Sparkles, ChevronRight, Menu, X, BarChart3, Clock,
  Receipt, Banknote, CreditCard
} from 'lucide-react';

// ── Mini dashboard mockup component ─────────────────────────────────────────
function DashboardMockup() {
  return (
    <div className="rounded-2xl overflow-hidden shadow-2xl"
      style={{ background: '#f1f5f9', border: '1px solid #e2e8f0', width: '100%', maxWidth: 520 }}>
      {/* Browser chrome */}
      <div className="flex items-center gap-1.5 px-4 py-3" style={{ background: '#e2e8f0' }}>
        <div className="w-3 h-3 rounded-full" style={{ background: '#ef4444' }} />
        <div className="w-3 h-3 rounded-full" style={{ background: '#f59e0b' }} />
        <div className="w-3 h-3 rounded-full" style={{ background: '#10b981' }} />
        <div className="flex-1 mx-4 h-5 rounded-full text-[10px] flex items-center justify-center" style={{ background: '#cbd5e1', color: '#64748b' }}>
          app.opsinsyts.co.za/dashboard
        </div>
      </div>
      {/* App content */}
      <div className="flex" style={{ height: 320 }}>
        {/* Mini sidebar */}
        <div className="w-10 flex-shrink-0 flex flex-col items-center py-3 gap-3" style={{ background: '#0f172a' }}>
          <div className="w-5 h-5 rounded flex items-center justify-center" style={{ background: 'linear-gradient(135deg,#10b981,#059669)' }}>
            <Sparkles size={9} className="text-white" />
          </div>
          {[BarChart3, FileText, Users, Zap, Brain].map((Icon, i) => (
            <div key={i} className="w-6 h-6 rounded flex items-center justify-center"
              style={{ background: i === 0 ? 'rgba(16,185,129,0.15)' : 'transparent' }}>
              <Icon size={11} style={{ color: i === 0 ? '#10b981' : '#475569' }} />
            </div>
          ))}
        </div>
        {/* Main area */}
        <div className="flex-1 p-3 overflow-hidden" style={{ background: '#f8fafc' }}>
          {/* AI brief */}
          <div className="rounded-lg px-3 py-2 mb-2.5 flex items-center gap-2" style={{ background: '#0f172a' }}>
            <Sparkles size={10} style={{ color: '#60a5fa' }} />
            <p className="text-[9px] leading-tight" style={{ color: '#94a3b8' }}>
              <span style={{ color: '#6ee7b7' }}>R248,500</span> runway · VAT due <span style={{ color: '#fca5a5' }}>48hrs</span> · Overdue invoices up <span style={{ color: '#fcd34d' }}>28%</span>
            </p>
          </div>
          {/* KPI row */}
          <div className="grid grid-cols-5 gap-1.5 mb-2.5">
            {[
              { label: 'Cash Flow', val: 'R248k', s: '#10b981', icon: Banknote },
              { label: 'VAT', val: '48 hrs', s: '#ef4444', icon: ShieldCheck },
              { label: 'Overdue', val: 'R89k', s: '#f59e0b', icon: Receipt },
              { label: 'Suppliers', val: 'R35k', s: '#10b981', icon: Banknote },
              { label: 'Recon', val: '12', s: '#f59e0b', icon: CreditCard },
            ].map((k) => (
              <div key={k.label} className="rounded-lg p-1.5" style={{ background: 'white', border: '1px solid #e2e8f0' }}>
                <div className="w-3 h-3 rounded mb-1" style={{ background: `${k.s}20` }}>
                  <k.icon size={8} style={{ color: k.s, margin: '2px auto', display: 'block' }} />
                </div>
                <div className="text-[8px] font-bold leading-none" style={{ color: '#0f172a' }}>{k.val}</div>
                <div className="text-[7px] mt-0.5 truncate" style={{ color: '#94a3b8' }}>{k.label}</div>
              </div>
            ))}
          </div>
          {/* Grid */}
          <div className="grid grid-cols-3 gap-1.5">
            {/* Cash flow chart placeholder */}
            <div className="col-span-2 rounded-lg p-2" style={{ background: 'white', border: '1px solid #e2e8f0' }}>
              <div className="text-[8px] font-bold mb-1.5" style={{ color: '#1e293b' }}>Cash Flow — 30 Days</div>
              <div className="flex items-end gap-0.5 h-12">
                {[40,45,42,50,48,55,52,58,56,62,60,65,63,68,66,70,68,72,70,74,72,76,74,78,76,80,78,82,80,84].map((v,i) => (
                  <div key={i} className="flex-1 rounded-sm"
                    style={{ height: `${v}%`, background: `rgba(16,185,129,${0.3 + i*0.02})`, minWidth: 2 }} />
                ))}
              </div>
            </div>
            {/* Priority actions */}
            <div className="rounded-lg p-2" style={{ background: 'white', border: '1px solid #e2e8f0' }}>
              <div className="text-[8px] font-bold mb-1.5" style={{ color: '#1e293b' }}>Actions</div>
              {[
                { c: '#fee2e2', t: '#dc2626', l: 'VAT filing 48h' },
                { c: '#fef3c7', t: '#d97706', l: 'Duplicate invoice' },
                { c: '#dbeafe', t: '#2563eb', l: 'Follow up: Nexus' },
              ].map((a) => (
                <div key={a.l} className="rounded px-1.5 py-1 mb-1 text-[7px] font-medium truncate"
                  style={{ background: a.c, color: a.t }}>{a.l}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Pipeline mockup ──────────────────────────────────────────────────────────
function PipelineMockup() {
  return (
    <div className="rounded-2xl overflow-hidden shadow-2xl" style={{ background: 'white', border: '1px solid #e2e8f0', maxWidth: 480 }}>
      <div className="flex items-center gap-1.5 px-4 py-3" style={{ background: '#e2e8f0' }}>
        <div className="w-3 h-3 rounded-full" style={{ background: '#ef4444' }} />
        <div className="w-3 h-3 rounded-full" style={{ background: '#f59e0b' }} />
        <div className="w-3 h-3 rounded-full" style={{ background: '#10b981' }} />
        <div className="flex-1 mx-4 h-5 rounded-full text-[10px] flex items-center justify-center" style={{ background: '#cbd5e1', color: '#64748b' }}>
          Documents · Pipeline
        </div>
      </div>
      <div className="p-5">
        <div className="text-[12px] font-bold mb-4" style={{ fontFamily: 'Syne, sans-serif', color: '#0f172a' }}>Processing Pipeline</div>
        {[
          { label: 'Layout-Aware OCR', sub: 'Google Document AI', status: 'done', color: '#3b82f6' },
          { label: 'LLM Reasoning', sub: 'Claude 3.5 Sonnet', status: 'done', color: '#8b5cf6' },
          { label: 'Deterministic Validation', sub: 'Cross-ledger checks', status: 'active', color: '#10b981' },
        ].map((s, i) => (
          <div key={s.label} className="flex items-center gap-3 mb-3">
            <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: s.status === 'done' ? '#d1fae5' : `${s.color}20`, border: `2px solid ${s.status === 'done' ? '#a7f3d0' : s.color}` }}>
              {s.status === 'done'
                ? <CheckCircle2 size={11} style={{ color: '#10b981' }} />
                : <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: s.color }} />}
            </div>
            <div className="flex-1">
              <div className="text-[11px] font-semibold" style={{ color: '#1e293b' }}>{s.label}</div>
              <div className="text-[10px]" style={{ color: '#94a3b8' }}>{s.sub}</div>
            </div>
            <div className="text-[10px] px-2 py-0.5 rounded-full"
              style={{ background: s.status === 'done' ? '#d1fae5' : '#dbeafe', color: s.status === 'done' ? '#059669' : s.color }}>
              {s.status === 'done' ? 'Done' : 'Running'}
            </div>
          </div>
        ))}
        <div className="mt-3 rounded-xl p-3" style={{ background: '#fff1f2', border: '1px solid #fecdd3' }}>
          <div className="text-[10px] font-semibold mb-0.5" style={{ color: '#dc2626' }}>⚠ Sum check failed</div>
          <div className="text-[10px]" style={{ color: '#94a3b8' }}>Line items total R8,944.70 — invoice states R9,200.00</div>
        </div>
        <div className="mt-3 rounded-xl p-3" style={{ background: '#fffbeb', border: '1px solid #fde68a' }}>
          <div className="text-[10px] font-semibold mb-0.5" style={{ color: '#d97706' }}>Fuzzy vendor match</div>
          <div className="text-[10px]" style={{ color: '#94a3b8' }}>"Micro Soft SA" → "Microsoft South Africa" · 94%</div>
        </div>
      </div>
    </div>
  );
}

// ── Portal mockup ────────────────────────────────────────────────────────────
function PortalMockup() {
  const clients = [
    { name: 'Nexus Trading', score: 23, c: '#dc2626', bg: '#fee2e2' },
    { name: 'Umoya Energy', score: 41, c: '#d97706', bg: '#fef3c7' },
    { name: 'Cape Harvest', score: 67, c: '#059669', bg: '#d1fae5' },
    { name: 'Durban Logistics', score: 78, c: '#059669', bg: '#d1fae5' },
    { name: 'Sandton Tech', score: 88, c: '#059669', bg: '#d1fae5' },
  ];
  return (
    <div className="rounded-2xl overflow-hidden shadow-2xl" style={{ background: 'white', border: '1px solid #e2e8f0', maxWidth: 480 }}>
      <div className="flex items-center gap-1.5 px-4 py-3" style={{ background: '#e2e8f0' }}>
        <div className="w-3 h-3 rounded-full" style={{ background: '#ef4444' }} />
        <div className="w-3 h-3 rounded-full" style={{ background: '#f59e0b' }} />
        <div className="w-3 h-3 rounded-full" style={{ background: '#10b981' }} />
        <div className="flex-1 mx-4 h-5 rounded-full text-[10px] flex items-center justify-center" style={{ background: '#cbd5e1', color: '#64748b' }}>
          Client Portal · 23 clients
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="text-[12px] font-bold" style={{ fontFamily: 'Syne, sans-serif', color: '#0f172a' }}>Client Health Overview</div>
          <div className="text-[10px] px-2 py-1 rounded-full" style={{ background: '#fee2e2', color: '#dc2626' }}>2 Critical</div>
        </div>
        <div className="space-y-2">
          {clients.map((c) => (
            <div key={c.name} className="flex items-center gap-3 p-2 rounded-xl"
              style={{ background: '#f8fafc', border: '1px solid #f1f5f9' }}>
              <div className="w-6 h-6 rounded-lg flex items-center justify-center text-[9px] font-bold text-white flex-shrink-0"
                style={{ background: c.c }}>
                {c.name[0]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[11px] font-semibold text-slate-700 truncate">{c.name}</div>
                <div className="h-1.5 rounded-full mt-1" style={{ background: '#e2e8f0' }}>
                  <div className="h-full rounded-full" style={{ width: `${c.score}%`, background: c.c }} />
                </div>
              </div>
              <div className="text-[11px] font-bold flex-shrink-0 px-2 py-0.5 rounded-full"
                style={{ background: c.bg, color: c.c }}>{c.score}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function LandingPage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="min-h-screen" style={{ background: '#fafaf8', fontFamily: 'var(--font-ibm-plex), IBM Plex Sans, sans-serif' }}>

      {/* ── Navbar ──────────────────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(250,250,248,0.95)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(0,0,0,0.06)' : 'none',
        }}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="font-bold text-[18px]" style={{ fontFamily: 'var(--font-syne), Syne, sans-serif', letterSpacing: '-0.03em', color: '#0f172a' }}>
            OpsInsyts
          </div>
          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {['Features', 'How it Works', 'For Accountants', 'Pricing'].map(item => (
              <a key={item} href={`#${item.toLowerCase().replace(/ /g, '-')}`}
                className="text-[13px] font-medium transition-colors hover:text-slate-900"
                style={{ color: '#64748b' }}>{item}</a>
            ))}
          </div>
          <div className="hidden md:flex items-center gap-3">
            <Link href="/login"
              className="text-[13px] font-semibold px-4 py-2 rounded-xl transition-all hover:bg-slate-100"
              style={{ color: '#334155' }}>
              Sign in
            </Link>
            <Link href="/login"
              className="text-[13px] font-semibold px-4 py-2 rounded-xl text-white flex items-center gap-1.5 transition-opacity hover:opacity-90"
              style={{ background: '#0f172a' }}>
              Get started <ArrowRight size={13} />
            </Link>
          </div>
          {/* Mobile menu button */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2">
            {mobileOpen ? <X size={20} style={{ color: '#0f172a' }} /> : <Menu size={20} style={{ color: '#0f172a' }} />}
          </button>
        </div>
        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden px-6 pb-4 space-y-2" style={{ background: 'rgba(250,250,248,0.98)', borderTop: '1px solid #e2e8f0' }}>
            {['Features', 'How it Works', 'For Accountants', 'Pricing'].map(item => (
              <a key={item} href={`#${item.toLowerCase().replace(/ /g, '-')}`}
                onClick={() => setMobileOpen(false)}
                className="block py-2 text-[14px] font-medium" style={{ color: '#334155' }}>{item}</a>
            ))}
            <Link href="/login" onClick={() => setMobileOpen(false)}
              className="block w-full py-3 text-center rounded-xl text-white font-semibold text-[14px] mt-2"
              style={{ background: '#0f172a' }}>
              Sign in →
            </Link>
          </div>
        )}
      </nav>

      {/* ── Hero ────────────────────────────────────────────────────── */}
      <section className="pt-28 pb-16 px-6 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6 text-[12px] font-semibold"
              style={{ background: '#d1fae5', color: '#059669', border: '1px solid #a7f3d0' }}>
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#10b981' }} />
              Built on Sage Business Cloud API
            </div>
            <h1 className="text-[48px] font-bold leading-tight mb-5"
              style={{ fontFamily: 'var(--font-syne), Syne, sans-serif', color: '#0f172a', letterSpacing: '-0.04em' }}>
              Turn your ledger into<br />
              <span style={{ color: '#10b981' }}>decisive action</span><br />
              in 90 seconds.
            </h1>
            <p className="text-[16px] leading-relaxed mb-8" style={{ color: '#64748b', maxWidth: 420 }}>
              OpsInsyts connects to your Sage account and transforms raw accounting data into a prioritised morning briefing — surfacing risks before they become crises.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/login"
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl text-[14px] font-semibold text-white transition-all hover:opacity-90 hover:scale-[1.02]"
                style={{ background: '#0f172a' }}>
                View live demo <ArrowRight size={15} />
              </Link>
              <a href="#how-it-works"
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl text-[14px] font-semibold transition-all hover:bg-slate-100"
                style={{ color: '#334155', border: '1px solid #e2e8f0', background: 'white' }}>
                How it works
              </a>
            </div>
            {/* Social proof */}
            <div className="flex items-center gap-3 mt-8">
              <div className="flex -space-x-2">
                {['#3b82f6','#8b5cf6','#10b981','#f59e0b'].map((c, i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-bold text-white"
                    style={{ background: c }}>
                    {['TK','SN','DP','AM'][i]}
                  </div>
                ))}
              </div>
              <p className="text-[13px]" style={{ color: '#64748b' }}>
                Used by <strong style={{ color: '#0f172a' }}>50+ accounting firms</strong> across South Africa
              </p>
            </div>
          </div>
          {/* Dashboard mockup */}
          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl opacity-30 blur-2xl"
              style={{ background: 'linear-gradient(135deg, #10b981, #3b82f6)' }} />
            <div className="relative">
              <DashboardMockup />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-4 -left-6 rounded-2xl px-4 py-3 shadow-lg"
              style={{ background: 'white', border: '1px solid #e2e8f0' }}>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ background: '#10b981' }} />
                <span className="text-[12px] font-semibold" style={{ color: '#059669' }}>Sage API Connected</span>
              </div>
              <div className="text-[11px] mt-0.5" style={{ color: '#94a3b8' }}>Synced 2 min ago</div>
            </div>
            <div className="absolute -top-4 -right-4 rounded-2xl px-4 py-3 shadow-lg"
              style={{ background: '#0f172a' }}>
              <div className="text-[22px] font-bold text-white" style={{ fontFamily: 'Syne, sans-serif' }}>R248k</div>
              <div className="text-[11px] flex items-center gap-1 mt-0.5" style={{ color: '#10b981' }}>
                <TrendingUp size={11} /> 5.2-week runway
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Trust bar ───────────────────────────────────────────────── */}
      <section style={{ background: '#0f172a' }} className="py-10 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <p className="text-[12px] font-semibold uppercase tracking-widest flex-shrink-0" style={{ color: '#475569' }}>
              Trusted by
            </p>
            <div className="flex flex-wrap justify-center md:justify-start items-center gap-8 opacity-50">
              {['Nkosi CA(SA)', 'Kruger & Venter', 'Cape Advisory', 'Durban Audit Co.', 'Joburg CFO Services'].map(name => (
                <span key={name} className="text-[14px] font-semibold" style={{ color: '#94a3b8', fontFamily: 'Syne, sans-serif' }}>{name}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── How it works ────────────────────────────────────────────── */}
      <section id="how-it-works" className="py-24 px-6" style={{ background: '#fafaf8' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[12px] font-bold uppercase tracking-widest mb-3" style={{ color: '#10b981' }}>How it works</p>
            <h2 className="text-[38px] font-bold" style={{ fontFamily: 'var(--font-syne), Syne, sans-serif', color: '#0f172a', letterSpacing: '-0.03em' }}>
              Three steps. Zero admin.
            </h2>
            <p className="text-[15px] mt-3 max-w-md mx-auto" style={{ color: '#64748b' }}>
              Connect once. OpsInsyts handles the rest — analysis, prioritisation, and automated actions.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { n: '01', icon: Zap, color: '#10b981', bg: '#d1fae5', title: 'Connect Sage', desc: 'Authorise with Sage Business Cloud via OAuth 2.0. We ingest your ledger, invoices, contacts, and compliance data in under 10 minutes.' },
              { n: '02', icon: Brain, color: '#8b5cf6', bg: '#ede9fe', title: 'AI Analyses Everything', desc: 'Our engine detects overdue invoices, duplicate suppliers, compliance gaps, and cash flow risks — ranked by financial impact.' },
              { n: '03', icon: ArrowRight, color: '#3b82f6', bg: '#dbeafe', title: 'Act in One Click', desc: 'Your morning dashboard shows exactly three priority actions. Approve automated reminders, validate documents, and stay ahead — all before your first coffee.' },
            ].map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.n} className="p-8 rounded-2xl transition-all hover:-translate-y-1 hover:shadow-md"
                  style={{ background: 'white', border: '1px solid #e2e8f0' }}>
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: step.bg }}>
                      <Icon size={20} style={{ color: step.color }} />
                    </div>
                    <span className="text-[28px] font-bold" style={{ fontFamily: 'Syne, sans-serif', color: '#e2e8f0' }}>{step.n}</span>
                  </div>
                  <h3 className="text-[18px] font-bold mb-2" style={{ fontFamily: 'var(--font-syne), Syne, sans-serif', color: '#0f172a' }}>{step.title}</h3>
                  <p className="text-[14px] leading-relaxed" style={{ color: '#64748b' }}>{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Feature 1: Dashboard ────────────────────────────────────── */}
      <section id="features" className="py-24 px-6" style={{ background: 'white' }}>
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[12px] font-bold uppercase tracking-widest mb-3" style={{ color: '#10b981' }}>The 90-Second Ritual</p>
            <h2 className="text-[34px] font-bold mb-4 leading-tight" style={{ fontFamily: 'var(--font-syne), Syne, sans-serif', color: '#0f172a', letterSpacing: '-0.03em' }}>
              Your business health at a glance. Every morning.
            </h2>
            <p className="text-[15px] leading-relaxed mb-6" style={{ color: '#64748b' }}>
              Forget dense spreadsheets. OpsInsyts opens to five traffic-light health indicators and exactly three priority actions — ranked by financial risk so you always know what to do first.
            </p>
            <div className="space-y-3">
              {[
                'Five real-time health KPIs with trend indicators',
                'AI morning brief with specific cash flow narrative',
                'Aged receivables, expense watchdog & compliance monitor',
                'Business health score updated daily',
              ].map(f => (
                <div key={f} className="flex items-center gap-3">
                  <CheckCircle2 size={16} style={{ color: '#10b981', flexShrink: 0 }} />
                  <span className="text-[14px]" style={{ color: '#334155' }}>{f}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-6 rounded-3xl opacity-20 blur-3xl" style={{ background: '#10b981' }} />
            <div className="relative">
              <DashboardMockup />
            </div>
          </div>
        </div>
      </section>

      {/* ── Feature 2: Document pipeline ────────────────────────────── */}
      <section className="py-24 px-6" style={{ background: '#f8fafc' }}>
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="relative order-2 md:order-1">
            <div className="absolute -inset-6 rounded-3xl opacity-20 blur-3xl" style={{ background: '#8b5cf6' }} />
            <div className="relative">
              <PipelineMockup />
            </div>
          </div>
          <div className="order-1 md:order-2">
            <p className="text-[12px] font-bold uppercase tracking-widest mb-3" style={{ color: '#8b5cf6' }}>Document Intelligence</p>
            <h2 className="text-[34px] font-bold mb-4 leading-tight" style={{ fontFamily: 'var(--font-syne), Syne, sans-serif', color: '#0f172a', letterSpacing: '-0.03em' }}>
              AI that validates before it posts. Never blind trust.
            </h2>
            <p className="text-[15px] leading-relaxed mb-6" style={{ color: '#64748b' }}>
              Our three-phase pipeline goes beyond OCR. Every document is cross-checked against your ledger before posting — catching math errors, duplicate invoices, and vendor mismatches that AI alone would miss.
            </p>
            <div className="space-y-3">
              {[
                'Layout-aware OCR via Google Document AI',
                'LLM reasoning with strict JSON schema enforcement',
                'Deterministic validation gate — sum checks, fuzzy matching',
                'Blocked from posting until critical errors are resolved',
              ].map(f => (
                <div key={f} className="flex items-center gap-3">
                  <CheckCircle2 size={16} style={{ color: '#8b5cf6', flexShrink: 0 }} />
                  <span className="text-[14px]" style={{ color: '#334155' }}>{f}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Feature 3: Accountant portal ────────────────────────────── */}
      <section id="for-accountants" className="py-24 px-6" style={{ background: 'white' }}>
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[12px] font-bold uppercase tracking-widest mb-3" style={{ color: '#3b82f6' }}>For Accounting Firms</p>
            <h2 className="text-[34px] font-bold mb-4 leading-tight" style={{ fontFamily: 'var(--font-syne), Syne, sans-serif', color: '#0f172a', letterSpacing: '-0.03em' }}>
              Manage 20 clients from a single portal.
            </h2>
            <p className="text-[15px] leading-relaxed mb-6" style={{ color: '#64748b' }}>
              Stop logging in and out of individual Sage accounts. OpsInsyts gives your firm a unified dashboard ranked by real-time health scores — so you always know which client needs attention today.
            </p>
            <div className="space-y-3">
              {[
                'Aggregated risk matrix across all SME clients',
                'Real-time health scores ranked by financial risk',
                'Pin tasks and notes directly onto client dashboards',
                'Automated advisory summaries ready to present',
              ].map(f => (
                <div key={f} className="flex items-center gap-3">
                  <CheckCircle2 size={16} style={{ color: '#3b82f6', flexShrink: 0 }} />
                  <span className="text-[14px]" style={{ color: '#334155' }}>{f}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-6 rounded-3xl opacity-20 blur-3xl" style={{ background: '#3b82f6' }} />
            <div className="relative">
              <PortalMockup />
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ───────────────────────────────────────────────────── */}
      <section style={{ background: '#0f172a' }} className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '90s', label: 'Morning ritual', sub: 'from login to decisions' },
              { value: '97%', label: 'OCR accuracy', sub: 'across document types' },
              { value: '10 min', label: 'Onboarding', sub: 'OAuth to live dashboard' },
              { value: '0', label: 'Extra admin', sub: 'reads direct from Sage' },
            ].map(s => (
              <div key={s.label} className="text-center">
                <div className="text-[42px] font-bold mb-1"
                  style={{ fontFamily: 'var(--font-syne), Syne, sans-serif', color: '#10b981' }}>{s.value}</div>
                <div className="text-[14px] font-semibold text-white">{s.label}</div>
                <div className="text-[12px] mt-0.5" style={{ color: '#475569' }}>{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────── */}
      <section className="py-24 px-6" style={{ background: '#fafaf8' }}>
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-[38px] font-bold mb-4" style={{ fontFamily: 'var(--font-syne), Syne, sans-serif', color: '#0f172a', letterSpacing: '-0.03em' }}>
            See it live in 60 seconds.
          </h2>
          <p className="text-[16px] mb-8" style={{ color: '#64748b' }}>
            No setup. No credit card. Sign in to the demo dashboard and experience the 90-second morning ritual for yourself.
          </p>
          <Link href="/login"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-[15px] font-semibold text-white transition-all hover:opacity-90 hover:scale-[1.02]"
            style={{ background: '#0f172a' }}>
            Open demo dashboard <ArrowRight size={16} />
          </Link>
          <p className="text-[12px] mt-4" style={{ color: '#94a3b8' }}>Demo credentials are pre-filled · No account required</p>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────────────── */}
      <footer style={{ background: '#0f172a', borderTop: '1px solid rgba(255,255,255,0.06)' }} className="py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-bold text-[16px]" style={{ fontFamily: 'var(--font-syne), Syne, sans-serif', color: 'white' }}>OpsInsyts</div>
          <p className="text-[12px]" style={{ color: '#475569' }}>
            © 2025 OpsInsyts · Built on Sage Business Cloud API · South Africa
          </p>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full pulse-green" style={{ background: '#10b981' }} />
            <span className="text-[12px]" style={{ color: '#10b981' }}>Live demo available</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
