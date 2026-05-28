'use client';
import { useState } from 'react';
import {
  TrendingUp, TrendingDown, Minus, AlertTriangle, Copy, Clock,
  FileText, CheckCircle2, ArrowRight, Sparkles, RefreshCw,
  CreditCard, Receipt, ShieldCheck, Building2, Banknote,
  ChevronRight, MoreHorizontal, Eye, Send, X
} from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, ResponsiveContainer, Tooltip, PieChart, Pie, Cell, CartesianGrid
} from 'recharts';
import TopBar from '@/components/layout/TopBar';
import { healthIndicators, priorityActions, cashFlowData } from '@/lib/mockData';
import type { HealthStatus, UrgencyLevel } from '@/lib/mockData';

// ── Helpers ─────────────────────────────────────────────────────────────────
const statusColor: Record<HealthStatus, { dot: string; bg: string; text: string; border: string }> = {
  green: { dot: '#10b981', bg: '#d1fae5', text: '#059669', border: '#a7f3d0' },
  amber: { dot: '#f59e0b', bg: '#fef3c7', text: '#d97706', border: '#fde68a' },
  red: { dot: '#ef4444', bg: '#fee2e2', text: '#dc2626', border: '#fecaca' },
};

const urgencyStyle: Record<UrgencyLevel, { bg: string; text: string; border: string; label: string }> = {
  URGENT: { bg: '#fee2e2', text: '#dc2626', border: '#fecaca', label: 'URGENT' },
  WARNING: { bg: '#fef3c7', text: '#d97706', border: '#fde68a', label: 'WARNING' },
  INFO: { bg: '#dbeafe', text: '#2563eb', border: '#bfdbfe', label: 'INFO' },
};

const TrendIcon = ({ trend }: { trend: string }) => {
  if (trend === 'up') return <TrendingUp size={12} className="text-emerald-500" />;
  if (trend === 'down') return <TrendingDown size={12} className="text-red-500" />;
  return <Minus size={12} className="text-slate-400" />;
};

const healthIcons: Record<string, React.ReactNode> = {
  cash_flow: <Banknote size={16} />,
  vat: <ShieldCheck size={16} />,
  overdue: <Receipt size={16} />,
  suppliers: <Building2 size={16} />,
  reconciliation: <CreditCard size={16} />,
};

// ── Invoice aging data ───────────────────────────────────────────────────────
const agingData = [
  { label: 'Current', value: 142000, count: 12 },
  { label: '1-30 days', value: 58400, count: 5 },
  { label: '31-60 days', value: 34800, count: 3 },
  { label: '61-90 days', value: 18200, count: 2 },
  { label: '90+ days', value: 8900, count: 1 },
];

const agingColors = ['#10b981', '#34d399', '#f59e0b', '#fb923c', '#ef4444'];

// ── Expense breakdown ────────────────────────────────────────────────────────
const expenseData = [
  { name: 'Staff Costs', value: 68400, color: '#3b82f6' },
  { name: 'Rent & Utilities', value: 22000, color: '#8b5cf6' },
  { name: 'IT & Software', value: 14800, color: '#10b981' },
  { name: 'Marketing', value: 9200, color: '#f59e0b' },
  { name: 'Logistics', value: 7600, color: '#ef4444' },
  { name: 'Other', value: 5400, color: '#94a3b8' },
];

// ── Recent invoice data ──────────────────────────────────────────────────────
const recentInvoices = [
  { id: 'INV-0452', customer: 'Sandton Tech Solutions', amount: 'R 48,500', status: 'paid', date: '24 May' },
  { id: 'INV-0451', customer: 'Cape Harvest Foods', amount: 'R 22,800', status: 'pending', date: '22 May' },
  { id: 'INV-0450', customer: 'Umoya Renewable Energy', amount: 'R 67,200', status: 'overdue', date: '10 May' },
  { id: 'INV-0449', customer: 'Durban Logistics Hub', amount: 'R 15,400', status: 'pending', date: '20 May' },
  { id: 'INV-0448', customer: 'Nexus Trading (Pty) Ltd', amount: 'R 34,800', status: 'overdue', date: '24 Apr' },
];

const invoiceStatusStyle: Record<string, { bg: string; text: string; label: string }> = {
  paid: { bg: '#d1fae5', text: '#059669', label: 'Paid' },
  pending: { bg: '#fef3c7', text: '#d97706', label: 'Pending' },
  overdue: { bg: '#fee2e2', text: '#dc2626', label: 'Overdue' },
};

// ── Monthly revenue ──────────────────────────────────────────────────────────
const monthlyRevenue = [
  { month: 'Dec', revenue: 168000, expenses: 121000 },
  { month: 'Jan', revenue: 182000, expenses: 128000 },
  { month: 'Feb', revenue: 175000, expenses: 131000 },
  { month: 'Mar', revenue: 198000, expenses: 135000 },
  { month: 'Apr', revenue: 214000, expenses: 129000 },
  { month: 'May', revenue: 231000, expenses: 142000 },
];

// ── Custom tooltip ───────────────────────────────────────────────────────────
const CustomCashTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white rounded-xl shadow-lg border p-3 text-[12px]" style={{ borderColor: '#e2e8f0' }}>
      <div className="font-semibold text-slate-600 mb-1">{label}</div>
      <div className="font-bold" style={{ color: '#10b981' }}>R {(payload[0].value / 1000).toFixed(0)}k</div>
    </div>
  );
};

export default function DashboardPage() {
  const [dismissedAction, setDismissedAction] = useState<string | null>(null);
  const [activeAction, setActiveAction] = useState<string | null>(null);
  const [showBrief, setShowBrief] = useState(false);
  const today = new Date().toLocaleDateString('en-ZA', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  const totalExpenses = expenseData.reduce((s, e) => s + e.value, 0);

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <TopBar
        title="Good morning, Thandi 👋"
        subtitle={`${today} · Khumalo & Associates (Pty) Ltd · Tax Ref: 9312/845/17/4`}
      />

      <main className="flex-1 overflow-y-auto px-6 py-5 space-y-5">

        {/* ── AI Morning Brief ───────────────────────────────────────── */}
        <div className="rounded-xl px-4 py-3 flex items-start gap-3" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)', border: '1px solid rgba(59,130,246,0.3)' }}>
          <div className="flex-shrink-0 mt-0.5">
            <Sparkles size={14} style={{ color: '#60a5fa' }} />
          </div>
          <div className="flex-1">
            <span className="text-[11px] font-bold uppercase tracking-wider" style={{ color: '#60a5fa' }}>AI Morning Brief</span>
            <p className="text-[13px] mt-0.5" style={{ color: '#cbd5e1' }}>
              Cash flow is stable at <strong style={{ color: '#6ee7b7' }}>R248,500</strong> with a 5.2-week runway. However, your VAT201 is due in <strong style={{ color: '#fca5a5' }}>48 hours</strong> and overdue invoices rose <strong style={{ color: '#fcd34d' }}>28%</strong> this month —{' '}
              <strong style={{ color: '#fca5a5' }}>Nexus Trading and Umoya represent 61% of cash risk</strong>. Three actions require your attention today.
            </p>
          </div>
          <button onClick={() => setShowBrief(true)} className="flex-shrink-0 text-[11px] flex items-center gap-1 px-2 py-1 rounded-lg transition-opacity hover:opacity-80" style={{ background: 'rgba(59,130,246,0.15)', color: '#93c5fd' }}>
            <Eye size={11} /> View full brief
          </button>
        </div>

        {/* ── 5 Health KPI Cards ─────────────────────────────────────── */}
        <div className="grid grid-cols-5 gap-3">
          {healthIndicators.map((kpi) => {
            const s = statusColor[kpi.status];
            return (
              <div key={kpi.id}
                className="bg-white rounded-xl p-4 card-hover cursor-pointer"
                style={{ border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                {/* Icon + status dot */}
                <div className="flex items-start justify-between mb-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: s.bg, color: s.text }}>
                    {healthIcons[kpi.id]}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: s.dot }} />
                    <span className="text-[10px] font-semibold uppercase tracking-wide" style={{ color: s.text }}>
                      {kpi.status === 'green' ? 'Good' : kpi.status === 'amber' ? 'Warn' : 'Critical'}
                    </span>
                  </div>
                </div>
                {/* Metric */}
                <div className="font-bold text-[18px] leading-none" style={{ fontFamily: 'Syne, sans-serif', color: '#0f172a' }}>
                  {kpi.metric}
                </div>
                {/* Label */}
                <div className="text-[11px] font-medium text-slate-500 mt-1">{kpi.label}</div>
                {/* Subtext + trend */}
                <div className="flex items-center gap-1 mt-1.5">
                  <TrendIcon trend={kpi.trend} />
                  <span className="text-[10px] text-slate-400">{kpi.subtext}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Main grid: Cash Flow + Actions ────────────────────────── */}
        <div className="grid grid-cols-12 gap-4">

          {/* Cash Flow Chart — 8 cols */}
          <div className="col-span-8 bg-white rounded-xl p-5" style={{ border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-bold text-[14px] text-slate-800" style={{ fontFamily: 'Syne, sans-serif' }}>Cash Flow — 30 Days</h2>
                <p className="text-[11px] text-slate-400 mt-0.5">FNB Business Account · ZAR</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full" style={{ background: '#10b981' }} />
                  <span className="text-[11px] text-slate-500">Balance</span>
                </div>
                <button className="text-[11px] px-3 py-1.5 rounded-lg font-medium transition-colors hover:bg-slate-50"
                  style={{ color: '#64748b', border: '1px solid #e2e8f0' }}>
                  <RefreshCw size={11} className="inline mr-1" />Export
                </button>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={180}>
              <AreaChart data={cashFlowData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="cashGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity={0.2} />
                    <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="day" tick={{ fontSize: 10, fill: '#94a3b8' }} tickLine={false} axisLine={false}
                  interval={4} />
                <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} tickLine={false} axisLine={false}
                  tickFormatter={(v) => `R${(v / 1000).toFixed(0)}k`} width={45} />
                <Tooltip content={<CustomCashTooltip />} />
                <Area type="monotone" dataKey="balance" stroke="#10b981" strokeWidth={2} fill="url(#cashGrad)" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Priority Actions — 4 cols */}
          <div className="col-span-4 bg-white rounded-xl p-5 flex flex-col" style={{ border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-bold text-[14px] text-slate-800" style={{ fontFamily: 'Syne, sans-serif' }}>Priority Actions</h2>
              <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold"
                style={{ background: '#fee2e2', color: '#dc2626' }}>3 Today</span>
            </div>
            <div className="space-y-2.5 flex-1">
              {priorityActions
                .filter(a => a.id !== dismissedAction)
                .map((action) => {
                  const u = urgencyStyle[action.urgency];
                  const ActionIcon = action.icon === 'AlertTriangle' ? AlertTriangle
                    : action.icon === 'Copy' ? Copy : Clock;
                  return (
                    <div key={action.id} className="rounded-lg p-3 relative transition-all"
                      style={{ background: u.bg, border: `1px solid ${u.border}` }}>
                      <button onClick={() => setDismissedAction(action.id)}
                        className="absolute top-2 right-2 opacity-40 hover:opacity-70 transition-opacity">
                        <X size={11} style={{ color: u.text }} />
                      </button>
                      <div className="flex items-start gap-2 pr-4">
                        <ActionIcon size={13} className="flex-shrink-0 mt-0.5" style={{ color: u.text }} />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 mb-0.5">
                            <span className="text-[9px] font-bold tracking-widest uppercase" style={{ color: u.text }}>
                              {action.urgency}
                            </span>
                          </div>
                          <p className="text-[11px] font-semibold leading-tight" style={{ color: u.text }}>{action.title}</p>
                          {action.amount && (
                            <div className="text-[12px] font-bold mt-0.5" style={{ color: u.text }}>{action.amount}</div>
                          )}
                          <button
                            onClick={() => setActiveAction(action.id)}
                            className="mt-1.5 text-[10px] font-semibold flex items-center gap-1"
                            style={{ color: u.text }}>
                            {action.cta} <ArrowRight size={9} />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>

        {/* ── Second grid: Invoices + Revenue + Expenses ────────────── */}
        <div className="grid grid-cols-12 gap-4">

          {/* Invoice Aging — 4 cols */}
          <div className="col-span-4 bg-white rounded-xl p-5" style={{ border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-bold text-[14px] text-slate-800" style={{ fontFamily: 'Syne, sans-serif' }}>Aged Receivables</h2>
                <p className="text-[11px] text-slate-400">R 262,300 total outstanding</p>
              </div>
            </div>
            <div className="space-y-2.5">
              {agingData.map((item, i) => (
                <div key={item.label} className="flex items-center gap-2.5">
                  <div className="w-20 text-[11px] text-slate-500 flex-shrink-0">{item.label}</div>
                  <div className="flex-1 h-5 rounded-md overflow-hidden" style={{ background: '#f1f5f9' }}>
                    <div
                      className="h-full rounded-md flex items-center px-1.5 transition-all"
                      style={{
                        width: `${(item.value / 142000) * 100}%`,
                        background: agingColors[i],
                        minWidth: '30px',
                      }}>
                      <span className="text-[9px] font-bold text-white">
                        R{(item.value / 1000).toFixed(0)}k
                      </span>
                    </div>
                  </div>
                  <div className="text-[10px] text-slate-400 w-8 text-right flex-shrink-0">{item.count}</div>
                </div>
              ))}
            </div>
            <div className="mt-3 pt-3 flex items-center justify-between" style={{ borderTop: '1px solid #f1f5f9' }}>
              <span className="text-[11px] text-slate-500">23 total invoices</span>
              <button className="text-[11px] font-semibold flex items-center gap-1" style={{ color: '#10b981' }}>
                View all <ChevronRight size={11} />
              </button>
            </div>
          </div>

          {/* Revenue vs Expenses — 5 cols */}
          <div className="col-span-5 bg-white rounded-xl p-5" style={{ border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-bold text-[14px] text-slate-800" style={{ fontFamily: 'Syne, sans-serif' }}>Revenue vs Expenses</h2>
                <p className="text-[11px] text-slate-400">Last 6 months · ZAR</p>
              </div>
              <div className="flex items-center gap-3 text-[11px] text-slate-500">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-sm" style={{ background: '#10b981' }} />Revenue
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-sm" style={{ background: '#e2e8f0' }} />Expenses
                </div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={150}>
              <BarChart data={monthlyRevenue} margin={{ top: 0, right: 0, left: 0, bottom: 0 }} barCategoryGap="30%">
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#94a3b8' }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} tickLine={false} axisLine={false}
                  tickFormatter={(v) => `R${(v / 1000).toFixed(0)}k`} width={40} />
                <Tooltip
                  formatter={(v: any) => [`R ${Number(v).toLocaleString()}`, '']}
                  contentStyle={{ fontSize: 11, borderRadius: 8, border: '1px solid #e2e8f0' }} />
                <Bar dataKey="revenue" fill="#10b981" radius={[3, 3, 0, 0]} />
                <Bar dataKey="expenses" fill="#e2e8f0" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Expense Breakdown — 3 cols */}
          <div className="col-span-3 bg-white rounded-xl p-5" style={{ border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
            <h2 className="font-bold text-[14px] text-slate-800 mb-1" style={{ fontFamily: 'Syne, sans-serif' }}>Expense Watchdog</h2>
            <p className="text-[11px] text-slate-400 mb-3">May 2025 · R {totalExpenses.toLocaleString()}</p>
            <div className="flex justify-center mb-3">
              <PieChart width={100} height={100}>
                <Pie data={expenseData} cx={50} cy={50} innerRadius={30} outerRadius={46} dataKey="value" strokeWidth={0}>
                  {expenseData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </div>
            <div className="space-y-1.5">
              {expenseData.map((e) => (
                <div key={e.name} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: e.color }} />
                  <span className="text-[10px] text-slate-500 flex-1 truncate">{e.name}</span>
                  <span className="text-[10px] font-semibold text-slate-700">
                    {Math.round((e.value / totalExpenses) * 100)}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Recent Invoices Table ──────────────────────────────────── */}
        <div className="bg-white rounded-xl p-5" style={{ border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-bold text-[14px] text-slate-800" style={{ fontFamily: 'Syne, sans-serif' }}>Recent Invoices</h2>
              <p className="text-[11px] text-slate-400">Latest customer invoices from Sage</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] px-2.5 py-1 rounded-full" style={{ background: '#fee2e2', color: '#dc2626' }}>
                2 Overdue
              </span>
              <button className="text-[11px] font-semibold flex items-center gap-1" style={{ color: '#10b981' }}>
                View all <ChevronRight size={11} />
              </button>
            </div>
          </div>
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                {['Invoice', 'Customer', 'Amount', 'Date', 'Status', ''].map(h => (
                  <th key={h} className="text-left text-[10px] font-semibold uppercase tracking-wider pb-2"
                    style={{ color: '#94a3b8' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentInvoices.map((inv, i) => {
                const s = invoiceStatusStyle[inv.status];
                return (
                  <tr key={inv.id} className="group"
                    style={{ borderBottom: i < recentInvoices.length - 1 ? '1px solid #f8fafc' : 'none' }}>
                    <td className="py-2.5">
                      <span className="text-[12px] font-mono font-medium text-slate-700">{inv.id}</span>
                    </td>
                    <td className="py-2.5">
                      <span className="text-[12px] text-slate-700">{inv.customer}</span>
                    </td>
                    <td className="py-2.5">
                      <span className="text-[13px] font-semibold" style={{ fontFamily: 'Syne, sans-serif', color: '#0f172a' }}>{inv.amount}</span>
                    </td>
                    <td className="py-2.5">
                      <span className="text-[12px] text-slate-400">{inv.date}</span>
                    </td>
                    <td className="py-2.5">
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                        style={{ background: s.bg, color: s.text }}>{s.label}</span>
                    </td>
                    <td className="py-2.5 text-right">
                      <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-lg hover:bg-slate-50">
                        <MoreHorizontal size={13} style={{ color: '#94a3b8' }} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* ── Bottom row: Compliance + Documents pending ─────────────── */}
        <div className="grid grid-cols-12 gap-4 pb-4">

          {/* Compliance status — 4 cols */}
          <div className="col-span-4 bg-white rounded-xl p-5" style={{ border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
            <h2 className="font-bold text-[14px] text-slate-800 mb-3" style={{ fontFamily: 'Syne, sans-serif' }}>Compliance Monitor</h2>
            <div className="space-y-2">
              {[
                { label: 'VAT201 — May 2025', due: '27 May', status: 'red', note: 'Due in 48 hrs' },
                { label: 'PAYE EMP201 — May', due: '7 Jun', status: 'amber', note: 'Due in 12 days' },
                { label: 'Income Tax IRP6', due: '30 Jun', status: 'green', note: '34 days away' },
                { label: 'UIF Monthly Return', due: '7 Jun', status: 'green', note: 'On track' },
              ].map((item) => {
                const s = statusColor[item.status as HealthStatus];
                return (
                  <div key={item.label} className="flex items-center gap-3 p-2.5 rounded-lg"
                    style={{ background: '#f8fafc', border: '1px solid #f1f5f9' }}>
                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: s.dot }} />
                    <div className="flex-1 min-w-0">
                      <p className="text-[12px] font-medium text-slate-700 truncate">{item.label}</p>
                      <p className="text-[10px] text-slate-400">{item.note}</p>
                    </div>
                    <span className="text-[10px] font-semibold flex-shrink-0" style={{ color: s.text }}>{item.due}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Documents pending — 4 cols */}
          <div className="col-span-4 bg-white rounded-xl p-5 flex flex-col" style={{ border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-bold text-[14px] text-slate-800" style={{ fontFamily: 'Syne, sans-serif' }}>Documents Pending</h2>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: '#fef3c7', color: '#d97706' }}>3 queued</span>
            </div>
            <div className="space-y-2 flex-1">
              {[
                { name: 'Supplier Invoice — Bidvest.pdf', stage: 'OCR Processing', progress: 65, color: '#3b82f6' },
                { name: 'Receipt — Builders Warehouse.jpg', stage: 'Validation Gate', progress: 88, color: '#f59e0b' },
                { name: 'Quote — Telkom Business.pdf', stage: 'Awaiting Review', progress: 100, color: '#10b981' },
              ].map((doc) => (
                <div key={doc.name} className="p-3 rounded-lg" style={{ background: '#f8fafc', border: '1px solid #f1f5f9' }}>
                  <div className="flex items-center gap-2 mb-1.5">
                    <FileText size={12} style={{ color: '#94a3b8' }} />
                    <span className="text-[11px] font-medium text-slate-700 truncate flex-1">{doc.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: '#e2e8f0' }}>
                      <div className="h-full rounded-full transition-all" style={{ width: `${doc.progress}%`, background: doc.color }} />
                    </div>
                    <span className="text-[10px] text-slate-400 flex-shrink-0">{doc.stage}</span>
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-3 w-full py-2 rounded-lg text-[12px] font-semibold flex items-center justify-center gap-1.5 transition-colors"
              style={{ background: '#f1f5f9', color: '#64748b', border: '1px solid #e2e8f0' }}>
              <FileText size={13} /> Upload Documents
            </button>
          </div>

          {/* Business health score — 4 cols */}
          <div className="col-span-4 rounded-xl p-5 flex flex-col justify-between"
            style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)', border: '1px solid rgba(59,130,246,0.2)' }}>
            <div>
              <h2 className="font-bold text-[14px] text-white mb-0.5" style={{ fontFamily: 'Syne, sans-serif' }}>Business Health Score</h2>
              <p className="text-[11px]" style={{ color: '#64748b' }}>Khumalo & Associates · May 2025</p>
            </div>
            <div className="flex items-center justify-center py-4">
              <div className="relative">
                <svg width="120" height="120" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="10" />
                  <circle cx="60" cy="60" r="50" fill="none" stroke="#10b981" strokeWidth="10"
                    strokeDasharray={`${2 * Math.PI * 50 * 0.62} ${2 * Math.PI * 50}`}
                    strokeDashoffset="0" strokeLinecap="round"
                    style={{ transform: 'rotate(-90deg)', transformOrigin: '60px 60px' }} />
                  <text x="60" y="55" textAnchor="middle" fill="white" fontSize="24" fontWeight="700" fontFamily="Syne, sans-serif">62</text>
                  <text x="60" y="70" textAnchor="middle" fill="#64748b" fontSize="10">/100</text>
                </svg>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: 'Cash Safety', val: 78, c: '#10b981' },
                { label: 'Compliance', val: 45, c: '#ef4444' },
                { label: 'Receivables', val: 55, c: '#f59e0b' },
                { label: 'Payables', val: 82, c: '#10b981' },
              ].map(m => (
                <div key={m.label} className="rounded-lg px-3 py-2" style={{ background: 'rgba(255,255,255,0.05)' }}>
                  <div className="text-[10px] mb-1" style={{ color: '#64748b' }}>{m.label}</div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.1)' }}>
                      <div className="h-full rounded-full" style={{ width: `${m.val}%`, background: m.c }} />
                    </div>
                    <span className="text-[11px] font-bold" style={{ color: m.c }}>{m.val}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* ── Full Morning Brief Modal ────────────────────────────────── */}
      {showBrief && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6" style={{ background: 'rgba(15,23,42,0.7)', backdropFilter: 'blur(4px)' }}>
          <div className="w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col" style={{ background: '#0f172a', border: '1px solid rgba(59,130,246,0.25)', maxHeight: '85vh' }}>
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
              <div className="flex items-center gap-2.5">
                <Sparkles size={15} style={{ color: '#60a5fa' }} />
                <span className="font-bold text-[14px] text-white" style={{ fontFamily: 'Syne, sans-serif' }}>AI Morning Brief</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold" style={{ background: 'rgba(16,185,129,0.15)', color: '#6ee7b7' }}>26 May 2025 · 06:00 AM</span>
              </div>
              <button onClick={() => setShowBrief(false)} className="p-1.5 rounded-lg transition-colors hover:bg-white/10">
                <X size={15} style={{ color: '#64748b' }} />
              </button>
            </div>
            {/* Body */}
            <div className="overflow-y-auto px-6 py-5 space-y-4">
              {/* Executive summary */}
              <div className="rounded-xl p-4" style={{ background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.2)' }}>
                <p className="text-[11px] font-bold uppercase tracking-wider mb-2" style={{ color: '#60a5fa' }}>Executive Summary</p>
                <p className="text-[13px] leading-relaxed" style={{ color: '#cbd5e1' }}>
                  Your business is operationally stable but faces two time-sensitive risks today. Cash flow remains healthy at <strong style={{ color: '#6ee7b7' }}>R248,500</strong> with a 5.2-week runway, however the VAT201 deadline in <strong style={{ color: '#fca5a5' }}>48 hours</strong> and rising overdue receivables demand immediate attention.
                </p>
              </div>
              {/* Sections */}
              {[
                {
                  color: '#ef4444', bg: 'rgba(239,68,68,0.08)', border: 'rgba(239,68,68,0.2)', label: 'CRITICAL · Compliance',
                  heading: 'VAT201 Filing Window Closing',
                  body: 'Your SARS VAT201 for the period ending 31 May 2025 is due in under 48 hours. Analysis of your supporting transactions reveals 4 invoices totalling R23,400 are missing VAT receipts or have unresolved vendor discrepancies. Filing without resolving these creates material audit risk. Recommended action: review the flagged documents in the Document Intelligence module now.'
                },
                {
                  color: '#f59e0b', bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.2)', label: 'WARNING · Receivables',
                  heading: 'Overdue Receivables Rose 28% This Period',
                  body: 'Outstanding receivables increased to R89,200 across 7 invoices — a 28% rise month-on-month. Nexus Trading (Pty) Ltd (R34,800, 32 days) and Umoya Renewable Energy (R67,200, 22 days) together represent 61% of your total cash-at-risk. If both accounts remain unpaid by Friday 30 May, your operational runway contracts from 5.2 weeks to 3.8 weeks.'
                },
                {
                  color: '#10b981', bg: 'rgba(16,185,129,0.08)', border: 'rgba(16,185,129,0.2)', label: 'POSITIVE · Cash Flow',
                  heading: 'Cash Position Remains Strong',
                  body: 'Your FNB Business Account balance of R248,500 is the highest it has been in 30 days. Month-on-month revenue is up 8% to R231,000 and your gross margin has held steady at 38.5%. The IT & Software expense category grew 14% — within expected range given your new Azure contract signed in April.'
                },
                {
                  color: '#3b82f6', bg: 'rgba(59,130,246,0.08)', border: 'rgba(59,130,246,0.2)', label: 'INFO · Bank Reconciliation',
                  heading: '12 Unmatched Transactions Require Review',
                  body: 'Your FNB Business Account has 12 transactions recorded in Sage that have not yet been matched to corresponding invoices or payments. Last synchronisation was 2 hours ago. This does not indicate an error — most are likely timing differences — but should be reviewed before the VAT201 submission to ensure all supporting documents are available.'
                },
              ].map((s) => (
                <div key={s.label} className="rounded-xl p-4" style={{ background: s.bg, border: `1px solid ${s.border}` }}>
                  <div className="text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: s.color }}>{s.label}</div>
                  <p className="text-[13px] font-semibold mb-1.5 text-white" style={{ fontFamily: 'Syne, sans-serif' }}>{s.heading}</p>
                  <p className="text-[12px] leading-relaxed" style={{ color: '#94a3b8' }}>{s.body}</p>
                </div>
              ))}
            </div>
            {/* Footer */}
            <div className="px-6 py-4 flex items-center justify-between border-t" style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
              <span className="text-[11px]" style={{ color: '#475569' }}>Generated from live Sage ledger data · Refreshes every morning at 06:00</span>
              <button onClick={() => setShowBrief(false)} className="px-4 py-2 rounded-xl text-[12px] font-semibold text-white transition-opacity hover:opacity-80"
                style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}>
                Got it
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Action Detail Modal ─────────────────────────────────────── */}
      {activeAction && (() => {
        const action = priorityActions.find(a => a.id === activeAction)!;
        const u = urgencyStyle[action.urgency];
        const ActionIcon = action.icon === 'AlertTriangle' ? AlertTriangle : action.icon === 'Copy' ? Copy : Clock;
        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6" style={{ background: 'rgba(15,23,42,0.6)', backdropFilter: 'blur(4px)' }}>
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 animate-in">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: u.bg }}>
                    <ActionIcon size={18} style={{ color: u.text }} />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold tracking-widest uppercase" style={{ color: u.text }}>{action.urgency}</span>
                    <h3 className="font-bold text-[15px] text-slate-800" style={{ fontFamily: 'Syne, sans-serif' }}>{action.title}</h3>
                  </div>
                </div>
                <button onClick={() => setActiveAction(null)} className="p-1 rounded-lg hover:bg-slate-100">
                  <X size={16} style={{ color: '#64748b' }} />
                </button>
              </div>
              <p className="text-[13px] text-slate-600 leading-relaxed mb-4">{action.description}</p>
              {action.amount && (
                <div className="p-3 rounded-xl mb-4" style={{ background: u.bg, border: `1px solid ${u.border}` }}>
                  <span className="text-[12px] text-slate-500">Amount at risk</span>
                  <div className="text-[22px] font-bold mt-0.5" style={{ fontFamily: 'Syne, sans-serif', color: u.text }}>{action.amount}</div>
                </div>
              )}
              <div className="flex gap-2">
                <button className="flex-1 py-2.5 rounded-xl text-[13px] font-semibold text-white flex items-center justify-center gap-2 transition-opacity hover:opacity-90"
                  style={{ background: u.text }}>
                  <Send size={13} /> {action.cta}
                </button>
                <button onClick={() => setActiveAction(null)} className="px-4 py-2.5 rounded-xl text-[13px] font-medium transition-colors hover:bg-slate-100"
                  style={{ color: '#64748b', border: '1px solid #e2e8f0' }}>
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
