'use client';
import { useState } from 'react';
import {
  Search, SlidersHorizontal, TrendingDown, AlertTriangle,
  ChevronRight, Pin, Send, MessageSquare, X, CheckCircle2,
  Clock, Zap, Building2, MoreHorizontal, Users, Bell
} from 'lucide-react';
import TopBar from '@/components/layout/TopBar';
import { clients } from '@/lib/mockData';
import type { Client, HealthStatus, PinnedTask } from '@/lib/mockData';

const statusDot: Record<HealthStatus, string> = {
  green: '#10b981',
  amber: '#f59e0b',
  red: '#ef4444',
};

const scoreColor = (score: number) => {
  if (score >= 70) return { bg: '#d1fae5', text: '#059669', label: 'Healthy' };
  if (score >= 45) return { bg: '#fef3c7', text: '#d97706', label: 'At Risk' };
  return { bg: '#fee2e2', text: '#dc2626', label: 'Critical' };
};

const taskTypeStyle = {
  alert: { bg: '#fee2e2', icon: AlertTriangle, color: '#dc2626' },
  task: { bg: '#eff6ff', icon: Pin, color: '#2563eb' },
  note: { bg: '#f8fafc', icon: MessageSquare, color: '#64748b' },
};

export default function PortalPage() {
  const [selectedClientId, setSelectedClientId] = useState<string | null>('c1');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<'risk' | 'score' | 'name'>('risk');
  const [newTask, setNewTask] = useState('');
  const [pinnedTasks, setPinnedTasks] = useState<Record<string, PinnedTask[]>>(
    Object.fromEntries(clients.map(c => [c.id, c.pinnedTasks]))
  );

  const filtered = clients
    .filter(c => c.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'risk') return a.healthScore - b.healthScore;
      if (sortBy === 'score') return b.healthScore - a.healthScore;
      return a.name.localeCompare(b.name);
    });

  const selectedClient = clients.find(c => c.id === selectedClientId) ?? null;

  const pinTask = () => {
    if (!newTask.trim() || !selectedClientId) return;
    const task: PinnedTask = {
      id: `pt-${Date.now()}`,
      author: 'Sarah Nkosi CA(SA)',
      message: newTask.trim(),
      timestamp: 'Just now',
      type: 'task',
    };
    setPinnedTasks(prev => ({
      ...prev,
      [selectedClientId]: [task, ...(prev[selectedClientId] ?? [])],
    }));
    setNewTask('');
  };

  const totalClients = clients.length;
  const criticalCount = clients.filter(c => c.healthScore < 45).length;
  const atRiskCount = clients.filter(c => c.healthScore >= 45 && c.healthScore < 70).length;

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <TopBar
        title="Accountant Portal"
        subtitle={`Managing ${totalClients} clients · ${criticalCount} critical · ${atRiskCount} at risk`}
      />

      {/* ── Stats bar ─────────────────────────────────────────── */}
      <div className="px-6 py-3 flex items-center gap-4 bg-white border-b" style={{ borderColor: '#e2e8f0' }}>
        {[
          { label: 'Total Clients', value: totalClients, color: '#64748b', bg: '#f1f5f9' },
          { label: 'Critical', value: criticalCount, color: '#dc2626', bg: '#fee2e2' },
          { label: 'At Risk', value: atRiskCount, color: '#d97706', bg: '#fef3c7' },
          { label: 'Healthy', value: clients.filter(c => c.healthScore >= 70).length, color: '#059669', bg: '#d1fae5' },
          { label: 'Pending Actions', value: clients.reduce((s, c) => s + c.pendingActions, 0), color: '#2563eb', bg: '#dbeafe' },
        ].map(stat => (
          <div key={stat.label} className="flex items-center gap-2 px-3 py-1.5 rounded-lg"
            style={{ background: stat.bg }}>
            <span className="text-[18px] font-bold" style={{ fontFamily: 'Syne, sans-serif', color: stat.color }}>{stat.value}</span>
            <span className="text-[11px] font-medium" style={{ color: stat.color }}>{stat.label}</span>
          </div>
        ))}

        <div className="ml-auto flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg" style={{ background: '#f1f5f9', border: '1px solid #e2e8f0' }}>
            <Search size={13} style={{ color: '#94a3b8' }} />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search clients…"
              className="text-[12px] bg-transparent outline-none w-32"
              style={{ color: '#334155' }}
            />
          </div>
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value as typeof sortBy)}
            className="text-[12px] px-3 py-1.5 rounded-lg outline-none"
            style={{ background: '#f1f5f9', color: '#64748b', border: '1px solid #e2e8f0' }}>
            <option value="risk">Sort: Highest Risk</option>
            <option value="score">Sort: Healthiest</option>
            <option value="name">Sort: Name A–Z</option>
          </select>
        </div>
      </div>

      <main className="flex-1 overflow-hidden flex">
        {/* ── Client list ────────────────────────────────────── */}
        <div className="w-[400px] flex-shrink-0 overflow-y-auto border-r" style={{ borderColor: '#e2e8f0', background: '#f8fafc' }}>
          <div className="p-3 space-y-2">
            {filtered.map((client) => {
              const s = scoreColor(client.healthScore);
              const isSelected = selectedClientId === client.id;
              return (
                <button
                  key={client.id}
                  onClick={() => setSelectedClientId(client.id)}
                  className="w-full text-left p-3.5 rounded-xl transition-all card-hover"
                  style={{
                    background: isSelected ? 'white' : 'white',
                    border: `1px solid ${isSelected ? '#10b981' : '#e2e8f0'}`,
                    boxShadow: isSelected ? '0 0 0 2px rgba(16,185,129,0.15)' : '0 1px 2px rgba(0,0,0,0.03)',
                  }}>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center text-[11px] font-bold text-white flex-shrink-0"
                        style={{ background: `linear-gradient(135deg, ${s.text}99, ${s.text})` }}>
                        {client.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
                      </div>
                      <div>
                        <p className="text-[12px] font-semibold text-slate-800 leading-tight">{client.name}</p>
                        <p className="text-[10px] text-slate-400">{client.industry}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-full"
                        style={{ background: s.bg, color: s.text }}>{client.healthScore}</span>
                      <span className="text-[9px] font-medium" style={{ color: s.text }}>{s.label}</span>
                    </div>
                  </div>

                  {/* Traffic lights */}
                  <div className="flex items-center gap-3 mb-2">
                    {[
                      { label: 'Cash', status: client.cashStatus },
                      { label: 'VAT', status: client.vatStatus },
                      { label: 'Inv.', status: client.invoiceStatus },
                    ].map(({ label, status }) => (
                      <div key={label} className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full" style={{ background: statusDot[status] }} />
                        <span className="text-[10px] text-slate-400">{label}</span>
                      </div>
                    ))}
                    <span className="text-[10px] text-slate-300 ml-auto">
                      {client.lastActivity}
                    </span>
                  </div>

                  {/* Risk flags */}
                  {client.riskFlags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {client.riskFlags.slice(0, 2).map((flag) => (
                        <span key={flag} className="text-[10px] px-1.5 py-0.5 rounded-full"
                          style={{ background: '#fef3c7', color: '#d97706' }}>
                          {flag}
                        </span>
                      ))}
                      {client.riskFlags.length > 2 && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded-full"
                          style={{ background: '#f1f5f9', color: '#94a3b8' }}>
                          +{client.riskFlags.length - 2} more
                        </span>
                      )}
                    </div>
                  )}

                  {client.pendingActions > 0 && (
                    <div className="mt-2 flex items-center gap-1">
                      <Bell size={10} style={{ color: '#dc2626' }} />
                      <span className="text-[10px] font-medium" style={{ color: '#dc2626' }}>
                        {client.pendingActions} action{client.pendingActions > 1 ? 's' : ''} pending
                      </span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Client detail panel ────────────────────────────── */}
        {selectedClient ? (
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {/* Client header */}
            <div className="bg-white rounded-2xl p-5" style={{ border: '1px solid #e2e8f0' }}>
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="font-bold text-[18px] text-slate-800" style={{ fontFamily: 'Syne, sans-serif' }}>
                    {selectedClient.name}
                  </h2>
                  <p className="text-[12px] text-slate-400 mt-0.5">
                    {selectedClient.industry} · Contact: {selectedClient.contactPerson}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {(() => { const s = scoreColor(selectedClient.healthScore); return (
                    <div className="text-center px-4 py-2 rounded-xl" style={{ background: s.bg }}>
                      <div className="text-[26px] font-bold" style={{ fontFamily: 'Syne, sans-serif', color: s.text }}>
                        {selectedClient.healthScore}
                      </div>
                      <div className="text-[10px] font-medium" style={{ color: s.text }}>{s.label}</div>
                    </div>
                  );})()}
                </div>
              </div>

              {/* Health lights */}
              <div className="grid grid-cols-3 gap-3 mt-4">
                {[
                  { label: 'Cash Flow', status: selectedClient.cashStatus },
                  { label: 'VAT Compliance', status: selectedClient.vatStatus },
                  { label: 'Invoice Health', status: selectedClient.invoiceStatus },
                ].map(({ label, status }) => {
                  const col = { green: { bg: '#d1fae5', text: '#059669', label: 'Good' }, amber: { bg: '#fef3c7', text: '#d97706', label: 'Warning' }, red: { bg: '#fee2e2', text: '#dc2626', label: 'Critical' } }[status];
                  return (
                    <div key={label} className="p-3 rounded-xl" style={{ background: col.bg }}>
                      <div className="text-[10px] font-semibold mb-1" style={{ color: col.text }}>{label}</div>
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full" style={{ background: statusDot[status] }} />
                        <span className="text-[12px] font-bold" style={{ color: col.text }}>{col.label}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Risk flags */}
              {selectedClient.riskFlags.length > 0 && (
                <div className="mt-4">
                  <p className="text-[11px] font-semibold text-slate-500 mb-2">Active Risk Flags</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedClient.riskFlags.map(f => (
                      <span key={f} className="text-[11px] font-medium px-2.5 py-1 rounded-full flex items-center gap-1.5"
                        style={{ background: '#fef3c7', color: '#d97706', border: '1px solid #fde68a' }}>
                        <AlertTriangle size={10} />{f}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Pin a task */}
            <div className="bg-white rounded-2xl p-5" style={{ border: '1px solid #e2e8f0' }}>
              <div className="flex items-center gap-2 mb-3">
                <Pin size={14} style={{ color: '#3b82f6' }} />
                <h3 className="font-bold text-[13px] text-slate-800" style={{ fontFamily: 'Syne, sans-serif' }}>
                  Pin Task to Client Dashboard
                </h3>
              </div>
              <div className="flex gap-2">
                <input
                  value={newTask}
                  onChange={e => setNewTask(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && pinTask()}
                  placeholder="Type a task, note, or alert for this client…"
                  className="flex-1 px-3 py-2 rounded-xl text-[12px] outline-none transition-all"
                  style={{ background: '#f8fafc', border: '1px solid #e2e8f0', color: '#334155' }}
                />
                <button
                  onClick={pinTask}
                  className="px-4 py-2 rounded-xl text-[12px] font-semibold text-white transition-opacity hover:opacity-90 flex items-center gap-1.5"
                  style={{ background: '#3b82f6' }}>
                  <Send size={12} /> Pin
                </button>
              </div>
            </div>

            {/* Pinned tasks */}
            {(pinnedTasks[selectedClient.id] ?? []).length > 0 && (
              <div className="bg-white rounded-2xl p-5" style={{ border: '1px solid #e2e8f0' }}>
                <h3 className="font-bold text-[13px] text-slate-800 mb-3" style={{ fontFamily: 'Syne, sans-serif' }}>
                  Pinned Tasks & Notes
                </h3>
                <div className="space-y-2">
                  {(pinnedTasks[selectedClient.id] ?? []).map((task) => {
                    const ts = taskTypeStyle[task.type];
                    const TIcon = ts.icon;
                    return (
                      <div key={task.id} className="flex items-start gap-3 p-3 rounded-xl"
                        style={{ background: ts.bg, border: '1px solid rgba(0,0,0,0.04)' }}>
                        <TIcon size={13} className="flex-shrink-0 mt-0.5" style={{ color: ts.color }} />
                        <div className="flex-1">
                          <p className="text-[12px] text-slate-700 leading-relaxed">{task.message}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[10px] font-semibold" style={{ color: ts.color }}>{task.author}</span>
                            <span className="text-[10px] text-slate-300">·</span>
                            <span className="text-[10px] text-slate-400">{task.timestamp}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Priority actions */}
            <div className="bg-white rounded-2xl p-5" style={{ border: '1px solid #e2e8f0' }}>
              <h3 className="font-bold text-[13px] text-slate-800 mb-3" style={{ fontFamily: 'Syne, sans-serif' }}>
                Client Priority Actions
              </h3>
              {selectedClient.riskFlags.length === 0 ? (
                <div className="flex items-center gap-2 p-3 rounded-xl" style={{ background: '#f0fdf4', border: '1px solid #bbf7d0' }}>
                  <CheckCircle2 size={14} style={{ color: '#10b981' }} />
                  <span className="text-[12px] font-medium" style={{ color: '#059669' }}>
                    No critical actions — client is in good standing.
                  </span>
                </div>
              ) : (
                <div className="space-y-2">
                  {selectedClient.riskFlags.map((flag, i) => (
                    <div key={flag} className="flex items-center gap-3 p-3 rounded-xl"
                      style={{ background: '#fff7ed', border: '1px solid #fed7aa' }}>
                      <span className="text-[11px] font-bold px-1.5 py-0.5 rounded"
                        style={{ background: '#fed7aa', color: '#c2410c' }}>#{i + 1}</span>
                      <span className="text-[12px] font-medium text-orange-800 flex-1">{flag}</span>
                      <ChevronRight size={12} style={{ color: '#f97316' }} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-center p-8">
            <div>
              <Users size={40} className="mx-auto mb-3" style={{ color: '#cbd5e1' }} />
              <p className="text-[14px] font-semibold text-slate-400">Select a client to view details</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
