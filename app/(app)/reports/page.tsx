'use client';
import { BarChart3, TrendingUp, FileText, Download, Calendar, ChevronRight, Lock } from 'lucide-react';
import TopBar from '@/components/layout/TopBar';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid, AreaChart, Area } from 'recharts';

const cashRunwayData = [
  { week: 'Now', balance: 248500 },
  { week: 'Wk 1', balance: 241000 },
  { week: 'Wk 2', balance: 268000 },
  { week: 'Wk 3', balance: 253000 },
  { week: 'Wk 4', balance: 237000 },
  { week: 'Wk 5', balance: 198000 },
  { week: 'Wk 6', balance: 142000 },
  { week: 'Wk 7', balance: 88000 },
  { week: 'Wk 8', balance: 52000 },
];

const reports = [
  { name: 'Profit & Loss Statement — May 2025', type: 'P&L', date: 'Today', size: '84 KB' },
  { name: 'Balance Sheet — May 2025', type: 'Balance Sheet', date: 'Today', size: '61 KB' },
  { name: 'Cash Flow Statement — Q1 2025', type: 'Cash Flow', date: '1 Apr 2025', size: '102 KB' },
  { name: 'VAT201 Workings — May 2025', type: 'VAT', date: 'Today', size: '48 KB' },
  { name: 'Aged Debtors Report', type: 'Receivables', date: 'Yesterday', size: '77 KB' },
];

export default function ReportsPage() {
  return (
    <div className="flex flex-col h-full overflow-hidden">
      <TopBar
        title="Advisory Reports"
        subtitle="Forward-looking forecasts, compliance matrices, and cash runway projections"
      />
      <main className="flex-1 overflow-y-auto px-6 py-5">
        <div className="grid grid-cols-12 gap-5">

          {/* Cash runway forecast */}
          <div className="col-span-8 bg-white rounded-2xl p-5" style={{ border: '1px solid #e2e8f0' }}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="font-bold text-[14px] text-slate-800" style={{ fontFamily: 'Syne, sans-serif' }}>Cash Runway Forecast</h2>
                <p className="text-[11px] text-slate-400 mt-0.5">13-week rolling projection · Based on current payment patterns</p>
              </div>
              <div className="text-right">
                <div className="text-[22px] font-bold" style={{ fontFamily: 'Syne, sans-serif', color: '#f59e0b' }}>5.2 wks</div>
                <div className="text-[10px] text-slate-400">current runway</div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={cashRunwayData}>
                <defs>
                  <linearGradient id="runwayGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#f59e0b" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="week" tick={{ fontSize: 11, fill: '#94a3b8' }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} tickLine={false} axisLine={false}
                  tickFormatter={v => `R${(v/1000).toFixed(0)}k`} width={45} />
                <Tooltip formatter={(v: any) => [`R ${Number(v).toLocaleString()}`, 'Projected Balance']}
                  contentStyle={{ fontSize: 11, borderRadius: 8, border: '1px solid #e2e8f0' }} />
                <Area type="monotone" dataKey="balance" stroke="#f59e0b" strokeWidth={2} fill="url(#runwayGrad)" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
            <div className="mt-3 p-3 rounded-xl flex items-start gap-2" style={{ background: '#fffbeb', border: '1px solid #fde68a' }}>
              <TrendingUp size={13} style={{ color: '#d97706', marginTop: 1, flexShrink: 0 }} />
              <p className="text-[11px]" style={{ color: '#92400e' }}>
                <strong>AI Projection:</strong> If Nexus Trading (R34,800) and Umoya (R67,200) remain unpaid, cash balance falls below R88,000 by Week 8 — below the recommended 4-week safety buffer. Recommend escalating collections immediately.
              </p>
            </div>
          </div>

          {/* Compliance risk matrix */}
          <div className="col-span-4 bg-white rounded-2xl p-5" style={{ border: '1px solid #e2e8f0' }}>
            <h2 className="font-bold text-[14px] text-slate-800 mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>Compliance Risk Matrix</h2>
            <div className="space-y-2.5">
              {[
                { label: 'SARS VAT201', risk: 'critical', due: '27 May', progress: 30 },
                { label: 'PAYE EMP201', risk: 'medium', due: '7 Jun', progress: 60 },
                { label: 'Income Tax IRP6', risk: 'low', due: '30 Jun', progress: 85 },
                { label: 'UIF Monthly', risk: 'low', due: '7 Jun', progress: 90 },
                { label: 'COIDA Return', risk: 'medium', due: '31 Mar 2026', progress: 100 },
              ].map(item => {
                const riskMap: Record<string, { color: string; bg: string; bar: string }> = {
                  critical: { color: '#dc2626', bg: '#fee2e2', bar: '#ef4444' },
                  medium: { color: '#d97706', bg: '#fef3c7', bar: '#f59e0b' },
                  low: { color: '#059669', bg: '#d1fae5', bar: '#10b981' },
                };
                const rs = riskMap[item.risk] ?? riskMap.low;
                return (
                  <div key={item.label} className="p-3 rounded-xl" style={{ background: rs.bg }}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[12px] font-semibold" style={{ color: rs.color }}>{item.label}</span>
                      <span className="text-[10px]" style={{ color: rs.color }}>{item.due}</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.6)' }}>
                      <div className="h-full rounded-full" style={{ width: `${item.progress}%`, background: rs.bar }} />
                    </div>
                    <div className="text-[10px] mt-1" style={{ color: rs.color }}>{item.progress}% ready</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Report library */}
          <div className="col-span-12 bg-white rounded-2xl p-5" style={{ border: '1px solid #e2e8f0' }}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-[14px] text-slate-800" style={{ fontFamily: 'Syne, sans-serif' }}>Report Library</h2>
              <button className="flex items-center gap-1.5 text-[12px] font-semibold px-3 py-1.5 rounded-lg"
                style={{ background: '#f0fdf4', color: '#059669', border: '1px solid #a7f3d0' }}>
                <FileText size={12} /> Generate New Report
              </button>
            </div>
            <div className="space-y-2">
              {reports.map((r, i) => (
                <div key={i} className="flex items-center gap-4 p-3 rounded-xl group transition-colors hover:bg-slate-50"
                  style={{ border: '1px solid #f1f5f9' }}>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: '#f1f5f9' }}>
                    <FileText size={14} style={{ color: '#64748b' }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-semibold text-slate-700">{r.name}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">{r.type} · {r.size}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-slate-400">{r.date}</span>
                    <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg hover:bg-slate-100">
                      <Download size={13} style={{ color: '#64748b' }} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
