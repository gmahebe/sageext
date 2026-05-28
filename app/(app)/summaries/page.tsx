'use client';
import { Brain, TrendingDown, TrendingUp, AlertTriangle, CheckCircle2, Sparkles, ArrowRight, Clock } from 'lucide-react';
import TopBar from '@/components/layout/TopBar';

const summaries = [
  {
    id: 's1',
    type: 'cash',
    severity: 'warning',
    title: 'Cash Concentration Risk Detected',
    body: 'Overdue receivables increased by 28% this period. Two customers — Nexus Trading (Pty) Ltd and Umoya Renewable Energy — together represent 61% of outstanding cash risk. If both accounts remain unpaid by Friday, 26 May, your operational runway will drop from 5.2 weeks to 3.8 weeks.',
    metric: '+28% overdue',
    time: '08:15 AM today',
    action: 'Initiate collection workflow',
  },
  {
    id: 's2',
    type: 'compliance',
    severity: 'critical',
    title: 'VAT201 Compliance Window Closing',
    body: 'Your VAT201 for the period ending 31 May 2025 is due to SARS in 48 hours. Analysis of your supporting transactions reveals that 4 invoices totalling R23,400 are missing VAT receipts or have unresolved vendor mismatches. Filing without resolving these may trigger an audit enquiry.',
    metric: '4 docs missing',
    time: '07:30 AM today',
    action: 'Review VAT documents',
  },
  {
    id: 's3',
    type: 'performance',
    severity: 'positive',
    title: 'Revenue Trend is Improving',
    body: 'Month-on-month revenue has grown for 4 consecutive periods. May 2025 is tracking at R231,000 — an 8% increase over April. Your gross margin has held steady at 38.5%. The IT & Software expense category grew 14% but is in line with your new Azure contract.',
    metric: '+8% revenue MoM',
    time: '06:00 AM today',
    action: 'View full P&L',
  },
  {
    id: 's4',
    type: 'operations',
    severity: 'info',
    title: 'Procurement Delays Detected',
    body: 'Purchase order approval time has averaged 3.8 days this month — 62% longer than your 30-day baseline. This pattern is concentrated in 2 suppliers: Makro Business Supplies and Builders Warehouse. The delay is at risk of impacting the Durban project milestone scheduled for 3 June.',
    metric: '3.8 day avg delay',
    time: 'Yesterday 11:00 PM',
    action: 'Review purchase orders',
  },
];

const severityStyles = {
  critical: { bg: '#fff1f2', border: '#fecdd3', dot: '#ef4444', label: 'Critical', icon: AlertTriangle, iconColor: '#dc2626' },
  warning: { bg: '#fffbeb', border: '#fde68a', dot: '#f59e0b', label: 'Warning', icon: TrendingDown, iconColor: '#d97706' },
  positive: { bg: '#f0fdf4', border: '#bbf7d0', dot: '#22c55e', label: 'Positive', icon: TrendingUp, iconColor: '#16a34a' },
  info: { bg: '#eff6ff', border: '#bfdbfe', dot: '#3b82f6', label: 'Info', icon: Brain, iconColor: '#2563eb' },
};

export default function SummariesPage() {
  return (
    <div className="flex flex-col h-full overflow-hidden">
      <TopBar
        title="AI Summaries"
        subtitle="Continuously interpreted operational intelligence from your Sage ledger"
      />
      <main className="flex-1 overflow-y-auto px-6 py-5">
        <div className="max-w-3xl space-y-4">
          {/* Intro card */}
          <div className="rounded-2xl px-5 py-4 flex items-start gap-3"
            style={{ background: 'linear-gradient(135deg, #0f172a, #1e3a5f)', border: '1px solid rgba(139,92,246,0.3)' }}>
            <Sparkles size={16} style={{ color: '#c084fc', flexShrink: 0, marginTop: 2 }} />
            <div>
              <p className="text-[12px] font-bold uppercase tracking-wider mb-1" style={{ color: '#c084fc' }}>AI Operating Intelligence</p>
              <p className="text-[13px] leading-relaxed" style={{ color: '#cbd5e1' }}>
                Rather than generic summaries, this engine analyses your live Sage ledger data and generates
                <strong style={{ color: '#f9a8d4' }}> specific operational narratives</strong> — connecting current financial state
                to strategic outcomes, flagging concentration risks, and preparing you for the decisions that matter most today.
              </p>
            </div>
          </div>

          {summaries.map((s) => {
            const style = severityStyles[s.severity as keyof typeof severityStyles];
            const Icon = style.icon;
            return (
              <div key={s.id} className="bg-white rounded-2xl overflow-hidden" style={{ border: '1px solid #e2e8f0' }}>
                <div className="px-5 pt-5 pb-4">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: style.bg, border: `1px solid ${style.border}` }}>
                      <Icon size={16} style={{ color: style.iconColor }} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                          style={{ background: style.bg, color: style.iconColor }}>{style.label}</span>
                        <div className="w-1.5 h-1.5 rounded-full" style={{ background: style.dot }} />
                        <span className="text-[11px] text-slate-400 flex items-center gap-1">
                          <Clock size={10} /> {s.time}
                        </span>
                      </div>
                      <h3 className="font-bold text-[14px] text-slate-800 mb-1" style={{ fontFamily: 'Syne, sans-serif' }}>{s.title}</h3>
                      <p className="text-[13px] text-slate-600 leading-relaxed">{s.body}</p>
                    </div>
                    <div className="flex-shrink-0 text-right">
                      <div className="text-[18px] font-bold" style={{ fontFamily: 'Syne, sans-serif', color: style.iconColor }}>{s.metric}</div>
                    </div>
                  </div>
                </div>
                <div className="px-5 py-3 flex items-center justify-between" style={{ background: '#f8fafc', borderTop: '1px solid #f1f5f9' }}>
                  <span className="text-[11px] text-slate-400">Generated from live Sage ledger data</span>
                  <button className="text-[12px] font-semibold flex items-center gap-1.5"
                    style={{ color: style.iconColor }}>
                    {s.action} <ArrowRight size={11} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
