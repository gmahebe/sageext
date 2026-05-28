'use client';
import { useState } from 'react';
import {
  Zap, CheckCircle2, Loader2, Clock, FileText, Mail,
  Send, Edit3, X, ChevronRight, Play, Pause, MoreHorizontal,
  Lock, Plus, ArrowRight, AlertTriangle, Database, Globe,
  RefreshCw, Eye, Sparkles
} from 'lucide-react';
import TopBar from '@/components/layout/TopBar';
import { workflows, draftEmail } from '@/lib/mockData';

const stepIcons: Record<string, React.ReactNode> = {
  's1': <AlertTriangle size={12} />,
  's2': <FileText size={12} />,
  's3': <Sparkles size={12} />,
  's4': <Mail size={12} />,
  's5': <Database size={12} />,
};

const statusStyles = {
  active: { bg: '#dcfce7', text: '#16a34a', dot: '#22c55e', label: 'Active' },
  paused: { bg: '#fef3c7', text: '#d97706', dot: '#f59e0b', label: 'Paused' },
  completed: { bg: '#dbeafe', text: '#2563eb', dot: '#3b82f6', label: 'Completed' },
};

const stepStatus = {
  completed: { icon: CheckCircle2, color: '#10b981', bg: '#d1fae5', border: '#a7f3d0' },
  active: { icon: Loader2, color: '#3b82f6', bg: '#dbeafe', border: '#bfdbfe' },
  pending: { icon: Clock, color: '#94a3b8', bg: '#f1f5f9', border: '#e2e8f0' },
};

export default function WorkflowsPage() {
  const [expandedId, setExpandedId] = useState<string>('wf-1');
  const [emailView, setEmailView] = useState(false);
  const [sent, setSent] = useState(false);

  const mainWorkflow = workflows[0];

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <TopBar
        title="Intelligent Workflow Engine"
        subtitle="Automated operational orchestration on top of Sage Accounting"
      />

      <main className="flex-1 overflow-y-auto px-6 py-5">
        <div className="grid grid-cols-12 gap-5">

          {/* ── Left: Active Workflows list ───────────────────── */}
          <div className="col-span-4 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-[13px] text-slate-700" style={{ fontFamily: 'Syne, sans-serif' }}>Active Workflows</h2>
              <span className="text-[11px] px-2 py-0.5 rounded-full font-medium"
                style={{ background: '#dcfce7', color: '#16a34a' }}>3 running</span>
            </div>

            {workflows.map((wf) => {
              const s = statusStyles[wf.status];
              const isExpanded = expandedId === wf.id;
              return (
                <div key={wf.id}
                  className="bg-white rounded-xl overflow-hidden cursor-pointer transition-all card-hover"
                  style={{
                    border: `1px solid ${isExpanded ? '#10b981' : '#e2e8f0'}`,
                    boxShadow: isExpanded ? '0 0 0 2px rgba(16,185,129,0.1)' : '0 1px 2px rgba(0,0,0,0.03)',
                  }}
                  onClick={() => setExpandedId(isExpanded ? '' : wf.id)}>
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mr-2.5"
                        style={{ background: 'linear-gradient(135deg, #0f172a, #1e3a5f)' }}>
                        <Zap size={14} className="text-emerald-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[12px] font-semibold text-slate-800 leading-tight">{wf.name}</p>
                        <p className="text-[10px] text-slate-400 mt-0.5">Trigger: {wf.trigger}</p>
                      </div>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full ml-2 flex-shrink-0"
                        style={{ background: s.bg, color: s.text }}>{s.label}</span>
                    </div>
                    <div className="flex items-center gap-3 text-[10px] text-slate-400">
                      <span className="flex items-center gap-1">
                        <RefreshCw size={9} /> {wf.lastRun}
                      </span>
                      <span className="flex items-center gap-1">
                        <CheckCircle2 size={9} style={{ color: '#10b981' }} /> {wf.actionsCount} actions
                      </span>
                    </div>
                  </div>
                  {isExpanded && (
                    <div className="px-4 pb-3 pt-0">
                      <div className="flex gap-1.5">
                        <div className="flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-medium"
                          style={{ background: '#dcfce7', color: '#16a34a' }}>
                          <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#22c55e' }} />
                          Viewing Details
                        </div>
                        <ChevronRight size={12} style={{ color: '#94a3b8' }} />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Workflow builder teaser */}
            <div className="rounded-xl p-4 text-center" style={{ background: '#f8fafc', border: '2px dashed #e2e8f0' }}>
              <div className="flex items-center justify-center gap-1.5 mb-2">
                <Lock size={12} style={{ color: '#94a3b8' }} />
                <span className="text-[11px] font-semibold text-slate-400">Workflow Builder</span>
                <span className="text-[9px] px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wider"
                  style={{ background: '#ede9fe', color: '#7c3aed' }}>Pro</span>
              </div>
              <p className="text-[10px] text-slate-400 mb-3">
                Build custom automation flows with drag-and-drop logic blocks, conditional branches, and multi-step approvals.
              </p>
              <button className="w-full py-1.5 rounded-lg text-[11px] font-semibold flex items-center justify-center gap-1.5"
                style={{ background: 'linear-gradient(135deg, #ede9fe, #dbeafe)', color: '#7c3aed' }}>
                <Plus size={11} /> Coming Soon — Join Waitlist
              </button>
            </div>
          </div>

          {/* ── Right: Workflow detail ─────────────────────────── */}
          <div className="col-span-8 space-y-4">

            {expandedId === 'wf-1' && (
              <>
                {/* Header */}
                <div className="bg-white rounded-2xl p-5" style={{ border: '1px solid #e2e8f0' }}>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h2 className="font-bold text-[16px] text-slate-800" style={{ fontFamily: 'Syne, sans-serif' }}>
                          {mainWorkflow.name}
                        </h2>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                          style={{ background: '#dcfce7', color: '#16a34a' }}>Live</span>
                      </div>
                      <p className="text-[12px] text-slate-500">
                        Triggered for <strong>Invoice #INV-0445</strong> (Nexus Trading) · R34,800 · 32 days overdue
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="px-3 py-1.5 rounded-lg text-[12px] font-medium flex items-center gap-1.5 transition-colors hover:bg-slate-50"
                        style={{ color: '#64748b', border: '1px solid #e2e8f0' }}>
                        <Pause size={12} /> Pause
                      </button>
                      <button className="px-3 py-1.5 rounded-lg text-[12px] font-medium flex items-center gap-1.5 transition-colors hover:bg-slate-50"
                        style={{ color: '#64748b', border: '1px solid #e2e8f0' }}>
                        <MoreHorizontal size={12} />
                      </button>
                    </div>
                  </div>

                  {/* Architecture diagram */}
                  <div className="p-3 rounded-xl text-center text-[11px] font-mono"
                    style={{ background: '#0f172a', color: '#94a3b8' }}>
                    <span style={{ color: '#64748b' }}>[Overdue Detected]</span>
                    <span style={{ color: '#475569' }}> → </span>
                    <span style={{ color: '#60a5fa' }}>GET /invoices/INV-0445 (Accept: application/pdf)</span>
                    <span style={{ color: '#475569' }}> → </span>
                    <span style={{ color: '#c084fc' }}>LLM Draft</span>
                    <span style={{ color: '#475569' }}> → </span>
                    <span style={{ color: '#34d399' }}>SendGrid</span>
                    <span style={{ color: '#475569' }}> → </span>
                    <span style={{ color: '#fbbf24' }}>PATCH sent=true</span>
                  </div>
                </div>

                {/* Timeline */}
                <div className="bg-white rounded-2xl p-5" style={{ border: '1px solid #e2e8f0' }}>
                  <h3 className="font-bold text-[13px] text-slate-800 mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>
                    Execution Timeline
                  </h3>
                  <div className="relative space-y-1">
                    {mainWorkflow.steps.map((step, i) => {
                      const ss = stepStatus[step.status];
                      const StepIcon = ss.icon;
                      const isLast = i === mainWorkflow.steps.length - 1;
                      return (
                        <div key={step.id} className="relative flex gap-4">
                          {/* Connector line */}
                          {!isLast && (
                            <div className="absolute left-4 top-8 bottom-0 w-0.5"
                              style={{ background: step.status === 'completed' ? '#d1fae5' : '#e2e8f0' }} />
                          )}
                          {/* Icon */}
                          <div className="flex-shrink-0 relative z-10">
                            <div className="w-8 h-8 rounded-full flex items-center justify-center"
                              style={{ background: ss.bg, border: `2px solid ${ss.border}` }}>
                              {step.status === 'active'
                                ? <Loader2 size={14} className="animate-spin" style={{ color: ss.color }} />
                                : <StepIcon size={14} style={{ color: ss.color }} />
                              }
                            </div>
                          </div>
                          {/* Content */}
                          <div className={`flex-1 pb-4 ${isLast ? '' : ''}`}>
                            <div className="flex items-start justify-between">
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="text-[12px] font-semibold" style={{ color: '#1e293b' }}>{step.label}</span>
                                  {step.status === 'active' && (
                                    <span className="text-[9px] px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wider animate-pulse"
                                      style={{ background: '#dbeafe', color: '#2563eb' }}>In Progress</span>
                                  )}
                                  {step.status === 'completed' && (
                                    <span className="text-[9px] px-1.5 py-0.5 rounded-full font-bold"
                                      style={{ background: '#d1fae5', color: '#059669' }}>Done</span>
                                  )}
                                </div>
                                <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">{step.description}</p>
                              </div>
                              <span className="text-[11px] font-mono flex-shrink-0 ml-3 mt-0.5"
                                style={{ color: '#94a3b8' }}>{step.timestamp}</span>
                            </div>
                            {/* Email preview trigger */}
                            {step.id === 's3' && step.status !== 'pending' && (
                              <button
                                onClick={() => setEmailView(true)}
                                className="mt-2 flex items-center gap-1.5 text-[11px] font-semibold transition-colors hover:opacity-80"
                                style={{ color: '#8b5cf6' }}>
                                <Eye size={11} /> Preview drafted email <ArrowRight size={10} />
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Action buttons */}
                {!sent && (
                  <div className="bg-white rounded-2xl p-5 flex items-center justify-between"
                    style={{ border: '1px solid #e2e8f0' }}>
                    <div>
                      <p className="text-[13px] font-semibold text-slate-700">Ready to send reminder to Thabo Molefe?</p>
                      <p className="text-[11px] text-slate-400 mt-0.5">Via SendGrid · CC: thandi@khumalo.co.za · PDF attached</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setEmailView(true)}
                        className="px-4 py-2 rounded-xl text-[12px] font-semibold transition-colors hover:bg-purple-50 flex items-center gap-1.5"
                        style={{ color: '#8b5cf6', border: '1px solid #ede9fe' }}>
                        <Edit3 size={12} /> Edit Draft
                      </button>
                      <button
                        onClick={() => setSent(true)}
                        className="px-5 py-2 rounded-xl text-[12px] font-semibold text-white transition-opacity hover:opacity-90 flex items-center gap-1.5"
                        style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}>
                        <Send size={12} /> Send Now
                      </button>
                      <button className="px-3 py-2 rounded-xl text-[12px] font-medium transition-colors hover:bg-slate-50"
                        style={{ color: '#94a3b8', border: '1px solid #e2e8f0' }}>
                        <X size={12} />
                      </button>
                    </div>
                  </div>
                )}

                {sent && (
                  <div className="rounded-2xl p-4 flex items-center gap-3"
                    style={{ background: '#f0fdf4', border: '1px solid #bbf7d0' }}>
                    <CheckCircle2 size={20} style={{ color: '#10b981' }} />
                    <div>
                      <p className="text-[13px] font-semibold" style={{ color: '#059669' }}>Email sent successfully</p>
                      <p className="text-[11px] mt-0.5" style={{ color: '#34d399' }}>
                        Delivered to thabo@nexustrading.co.za · Sage sent=true flag updated · Delivery tracking active
                      </p>
                    </div>
                  </div>
                )}
              </>
            )}

            {expandedId !== 'wf-1' && (
              <div className="bg-white rounded-2xl p-8 flex flex-col items-center justify-center text-center min-h-[300px]"
                style={{ border: '1px solid #e2e8f0' }}>
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
                  style={{ background: '#f1f5f9' }}>
                  <Zap size={24} style={{ color: '#94a3b8' }} />
                </div>
                <p className="text-[14px] font-semibold text-slate-600">Select a workflow to view execution details</p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* ── Email preview modal ─────────────────────────────────── */}
      {emailView && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6"
          style={{ background: 'rgba(15,23,42,0.7)', backdropFilter: 'blur(4px)' }}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] overflow-hidden flex flex-col">
            {/* Modal header */}
            <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: '#e2e8f0' }}>
              <div className="flex items-center gap-2">
                <Sparkles size={14} style={{ color: '#8b5cf6' }} />
                <h3 className="font-bold text-[14px] text-slate-800" style={{ fontFamily: 'Syne, sans-serif' }}>
                  AI-Drafted Reminder Email
                </h3>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full font-semibold"
                  style={{ background: '#ede9fe', color: '#7c3aed' }}>Claude 3.5 Sonnet</span>
              </div>
              <button onClick={() => setEmailView(false)} className="p-1.5 rounded-lg hover:bg-slate-100">
                <X size={15} style={{ color: '#64748b' }} />
              </button>
            </div>
            {/* Email metadata */}
            <div className="px-6 py-3 border-b space-y-1.5" style={{ background: '#f8fafc', borderColor: '#e2e8f0' }}>
              {[
                { label: 'To', value: draftEmail.to },
                { label: 'From', value: draftEmail.from },
                { label: 'Subject', value: draftEmail.subject },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-start gap-3">
                  <span className="text-[11px] font-semibold w-12 flex-shrink-0 text-slate-400">{label}</span>
                  <span className="text-[12px] text-slate-700">{value}</span>
                </div>
              ))}
            </div>
            {/* Email body */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              <pre className="text-[12px] leading-relaxed whitespace-pre-wrap font-[IBM Plex Sans]"
                style={{ color: '#334155', fontFamily: 'IBM Plex Sans, sans-serif' }}>
                {draftEmail.body}
              </pre>
            </div>
            {/* Modal actions */}
            <div className="flex items-center justify-end gap-2 px-6 py-4 border-t" style={{ borderColor: '#e2e8f0' }}>
              <button onClick={() => setEmailView(false)} className="px-4 py-2 rounded-xl text-[12px] font-medium transition-colors hover:bg-slate-50"
                style={{ color: '#64748b', border: '1px solid #e2e8f0' }}>Cancel</button>
              <button className="px-4 py-2 rounded-xl text-[12px] font-medium flex items-center gap-1.5 transition-colors hover:bg-purple-50"
                style={{ color: '#8b5cf6', border: '1px solid #ede9fe' }}>
                <Edit3 size={12} /> Edit
              </button>
              <button
                onClick={() => { setSent(true); setEmailView(false); }}
                className="px-5 py-2 rounded-xl text-[12px] font-semibold text-white transition-opacity hover:opacity-90 flex items-center gap-1.5"
                style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}>
                <Send size={12} /> Send Email
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
