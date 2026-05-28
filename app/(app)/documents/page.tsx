'use client';
import { useState, useRef } from 'react';
import {
  Upload, FileText, CheckCircle2, XCircle, AlertCircle,
  ChevronRight, Loader2, Sparkles, Brain, ShieldCheck,
  Eye, Scan, Check, X, ArrowRight, RotateCcw, Send
} from 'lucide-react';
import TopBar from '@/components/layout/TopBar';
import { extractedInvoice, validationResults } from '@/lib/mockData';

type PipelineStage = 'idle' | 'ocr' | 'llm' | 'validation' | 'complete';

const stages = [
  {
    id: 'ocr',
    label: 'Layout-Aware OCR',
    sublabel: 'Google Document AI',
    icon: Scan,
    description: 'Extracting text, tables, and positional layout from the document',
    color: '#3b82f6',
  },
  {
    id: 'llm',
    label: 'LLM Reasoning',
    sublabel: 'Claude 3.5 Sonnet',
    icon: Brain,
    description: 'Categorising fields, matching vendor context, resolving ambiguities',
    color: '#8b5cf6',
  },
  {
    id: 'validation',
    label: 'Deterministic Validation',
    sublabel: 'Cross-ledger checks',
    icon: ShieldCheck,
    description: 'Sum verification, fuzzy vendor match, duplicate detection, temporal logic',
    color: '#10b981',
  },
];

const stageOrder: PipelineStage[] = ['idle', 'ocr', 'llm', 'validation', 'complete'];

export default function DocumentsPage() {
  const [pipelineStage, setPipelineStage] = useState<PipelineStage>('idle');
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [vendorConfirmed, setVendorConfirmed] = useState<boolean | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const runPipeline = (name: string) => {
    setFileName(name);
    setPipelineStage('ocr');
    const advance = (stages: PipelineStage[], idx: number) => {
      if (idx >= stages.length) return;
      timerRef.current = setTimeout(() => {
        setPipelineStage(stages[idx]);
        advance(stages, idx + 1);
      }, 1800);
    };
    advance(['llm', 'validation', 'complete'], 0);
  };

  const reset = () => {
    setPipelineStage('idle');
    setFileName(null);
    setVendorConfirmed(null);
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  const getStageStatus = (stageId: string) => {
    const order = ['ocr', 'llm', 'validation'];
    const currentIdx = order.indexOf(pipelineStage);
    const stageIdx = order.indexOf(stageId);
    if (pipelineStage === 'complete') return 'done';
    if (stageIdx < currentIdx) return 'done';
    if (stageIdx === currentIdx) return 'active';
    return 'pending';
  };

  const hasCriticalErrors = validationResults.some(v => !v.passed && v.critical);
  const errorCount = validationResults.filter(v => !v.passed).length;
  const passCount = validationResults.filter(v => v.passed).length;

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <TopBar
        title="Document Intelligence"
        subtitle="Three-Phase Cognitive Ingestion Pipeline · Layout-Aware OCR → LLM Reasoning → Deterministic Validation"
      />

      <main className="flex-1 overflow-y-auto px-3 sm:px-6 py-3 sm:py-5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5 h-full">

          {/* ── Left: Upload + Pipeline ─────────────────────────── */}
          <div className="lg:col-span-5 space-y-4">

            {/* Upload zone */}
            {pipelineStage === 'idle' ? (
              <div
                className={`rounded-2xl border-2 border-dashed p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all ${isDragging ? 'drag-active' : ''}`}
                style={{
                  borderColor: isDragging ? '#10b981' : '#cbd5e1',
                  background: isDragging ? '#f0fdf4' : '#f8fafc',
                  minHeight: '220px',
                }}
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setIsDragging(false);
                  const file = e.dataTransfer.files[0];
                  if (file) runPipeline(file.name);
                }}
                onClick={() => runPipeline('Microsoft_Invoice_MS-INV-20250519-0042.pdf')}
              >
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
                  style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)' }}>
                  <Upload size={24} className="text-white" />
                </div>
                <p className="text-[14px] font-semibold text-slate-700 mb-1">Drop documents here</p>
                <p className="text-[12px] text-slate-400 mb-4">PDF, JPG, PNG, TIFF — invoices, receipts, quotes</p>
                <button className="px-4 py-2 rounded-lg text-[12px] font-semibold text-white transition-opacity hover:opacity-90"
                  style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)' }}>
                  Browse Files
                </button>
                <p className="text-[10px] text-slate-300 mt-3">Click to demo with sample invoice</p>
              </div>
            ) : (
              <div className="rounded-2xl p-4 flex items-center gap-3"
                style={{ background: '#f8fafc', border: '2px solid #e2e8f0' }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: '#dbeafe' }}>
                  <FileText size={18} style={{ color: '#3b82f6' }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[12px] font-semibold text-slate-700 truncate">{fileName}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">84 KB · PDF · Uploaded just now</p>
                </div>
                <button onClick={reset} className="p-1.5 rounded-lg hover:bg-slate-200 transition-colors">
                  <RotateCcw size={13} style={{ color: '#94a3b8' }} />
                </button>
              </div>
            )}

            {/* Pipeline stages */}
            <div className="bg-white rounded-2xl p-5" style={{ border: '1px solid #e2e8f0' }}>
              <h3 className="font-bold text-[13px] text-slate-800 mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>
                Processing Pipeline
              </h3>
              <div className="space-y-1">
                {stages.map((stage, i) => {
                  const status = pipelineStage === 'idle' ? 'pending' : getStageStatus(stage.id);
                  const Icon = stage.icon;
                  return (
                    <div key={stage.id}>
                      <div className={`flex items-start gap-3 p-3 rounded-xl transition-all duration-500 ${status === 'active' ? 'shadow-sm' : ''}`}
                        style={{
                          background: status === 'active' ? `${stage.color}10` : status === 'done' ? '#f0fdf4' : '#f8fafc',
                          border: `1px solid ${status === 'active' ? `${stage.color}30` : status === 'done' ? '#bbf7d0' : '#f1f5f9'}`,
                        }}>
                        {/* Status icon */}
                        <div className="flex-shrink-0 mt-0.5">
                          {status === 'done' ? (
                            <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: '#d1fae5' }}>
                              <Check size={12} style={{ color: '#10b981' }} />
                            </div>
                          ) : status === 'active' ? (
                            <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: `${stage.color}20` }}>
                              <Loader2 size={12} className="animate-spin" style={{ color: stage.color }} />
                            </div>
                          ) : (
                            <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: '#e2e8f0' }}>
                              <span className="text-[10px] font-bold text-slate-400">{i + 1}</span>
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <Icon size={12} style={{ color: status === 'pending' ? '#94a3b8' : stage.color }} />
                            <span className="text-[12px] font-semibold" style={{ color: status === 'pending' ? '#94a3b8' : '#1e293b' }}>
                              {stage.label}
                            </span>
                            <span className="text-[10px] px-1.5 py-0.5 rounded-full"
                              style={{
                                background: status === 'pending' ? '#f1f5f9' : `${stage.color}15`,
                                color: status === 'pending' ? '#94a3b8' : stage.color
                              }}>
                              {stage.sublabel}
                            </span>
                          </div>
                          <p className="text-[11px] mt-0.5" style={{ color: '#94a3b8' }}>{stage.description}</p>
                        </div>
                      </div>
                      {i < stages.length - 1 && (
                        <div className="ml-4 flex items-center">
                          <div className="w-0.5 h-2" style={{ background: '#e2e8f0' }} />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Progress indicator */}
              {pipelineStage !== 'idle' && pipelineStage !== 'complete' && (
                <div className="mt-4 p-3 rounded-xl flex items-center gap-2" style={{ background: '#eff6ff', border: '1px solid #bfdbfe' }}>
                  <Loader2 size={13} className="animate-spin flex-shrink-0" style={{ color: '#3b82f6' }} />
                  <span className="text-[12px] font-medium" style={{ color: '#2563eb' }}>
                    {pipelineStage === 'ocr' && 'Running layout-aware OCR analysis…'}
                    {pipelineStage === 'llm' && 'LLM reasoning in progress — extracting structured fields…'}
                    {pipelineStage === 'validation' && 'Running deterministic validation checks…'}
                  </span>
                </div>
              )}

              {pipelineStage === 'complete' && (
                <div className="mt-4 p-3 rounded-xl flex items-center gap-2" style={{ background: '#f0fdf4', border: '1px solid #bbf7d0' }}>
                  <CheckCircle2 size={13} style={{ color: '#10b981' }} />
                  <span className="text-[12px] font-medium" style={{ color: '#059669' }}>
                    Pipeline complete — {passCount} checks passed, {errorCount} issues flagged
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* ── Right: Extracted Data + Validation ─────────────── */}
          <div className="lg:col-span-7 space-y-4">

            {/* Extracted invoice data */}
            {pipelineStage === 'complete' && (
              <>
                <div className="bg-white rounded-2xl p-5" style={{ border: '1px solid #e2e8f0' }}>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-[13px] text-slate-800" style={{ fontFamily: 'Syne, sans-serif' }}>
                        Extracted Invoice Data
                      </h3>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        <Sparkles size={10} className="inline mr-1" style={{ color: '#8b5cf6' }} />
                        Extracted by LLM with 97.2% confidence · JSON schema enforced
                      </p>
                    </div>
                    <span className="text-[11px] px-2.5 py-1 rounded-full font-medium" style={{ background: '#ede9fe', color: '#7c3aed' }}>
                      Auto-extracted
                    </span>
                  </div>

                  {/* Header fields */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
                    {[
                      { label: 'Vendor (Corrected)', value: extractedInvoice.vendor, highlight: true },
                      { label: 'Invoice Number', value: extractedInvoice.invoiceNumber },
                      { label: 'Invoice Date', value: extractedInvoice.date },
                      { label: 'Due Date', value: extractedInvoice.dueDate },
                      { label: 'VAT Number', value: extractedInvoice.vatNumber },
                      { label: 'Ledger Account', value: 'IT & Software (GL: 7210)' },
                    ].map((f) => (
                      <div key={f.label} className="p-2.5 rounded-xl"
                        style={{ background: f.highlight ? '#ede9fe' : '#f8fafc', border: '1px solid #f1f5f9' }}>
                        <div className="text-[9px] uppercase tracking-wider font-semibold mb-1" style={{ color: '#94a3b8' }}>{f.label}</div>
                        <div className="text-[12px] font-semibold" style={{ color: f.highlight ? '#7c3aed' : '#1e293b' }}>{f.value}</div>
                      </div>
                    ))}
                  </div>

                  {/* Line items */}
                  <div className="overflow-x-auto -mx-1">
                  <table className="w-full mb-3 min-w-[420px]">
                    <thead>
                      <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                        {['Description', 'Qty', 'Unit Price', 'Total'].map(h => (
                          <th key={h} className="text-left text-[10px] font-semibold uppercase tracking-wider pb-2 text-slate-400">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {extractedInvoice.lineItems.map((item, i) => (
                        <tr key={i} style={{ borderBottom: '1px solid #f8fafc' }}>
                          <td className="py-2 text-[12px] text-slate-700">{item.description}</td>
                          <td className="py-2 text-[12px] text-slate-500">{item.qty}</td>
                          <td className="py-2 text-[12px] text-slate-500">R {item.unitPrice.toFixed(2)}</td>
                          <td className="py-2 text-[12px] font-semibold text-slate-700">R {item.total.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  </div>

                  {/* Totals */}
                  <div className="rounded-xl p-3 space-y-1" style={{ background: '#f8fafc', border: '1px solid #f1f5f9' }}>
                    <div className="flex justify-between text-[12px] text-slate-500">
                      <span>Subtotal</span><span>R {extractedInvoice.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-[12px] text-slate-500">
                      <span>VAT (15%)</span><span>R {extractedInvoice.vat15.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-[13px] font-bold pt-1" style={{ borderTop: '1px solid #e2e8f0', color: '#1e293b' }}>
                      <span>Total (Extracted)</span><span style={{ color: '#10b981' }}>R {extractedInvoice.total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-[12px]" style={{ color: '#dc2626' }}>
                      <span>Invoice States</span>
                      <span className="font-semibold">R {extractedInvoice.extractedTotal.toFixed(2)} ⚠ Δ R{(extractedInvoice.extractedTotal - extractedInvoice.total).toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Validation results */}
                <div className="bg-white rounded-2xl p-5" style={{ border: '1px solid #e2e8f0' }}>
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-bold text-[13px] text-slate-800" style={{ fontFamily: 'Syne, sans-serif' }}>
                        Deterministic Validation Gate
                      </h3>
                      <p className="text-[11px] text-slate-400 mt-0.5">7 checks · {passCount} passed · {errorCount} flagged</p>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] font-semibold">
                      <span className="flex items-center gap-1 px-2 py-1 rounded-full" style={{ background: '#d1fae5', color: '#059669' }}>
                        <Check size={11} /> {passCount} Passed
                      </span>
                      <span className="flex items-center gap-1 px-2 py-1 rounded-full" style={{ background: '#fee2e2', color: '#dc2626' }}>
                        <X size={11} /> {errorCount} Issues
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    {validationResults.map((v) => (
                      <div key={v.id} className="flex items-start gap-3 p-3 rounded-xl transition-all"
                        style={{
                          background: v.passed ? '#f0fdf4' : v.critical ? '#fff1f2' : '#fffbeb',
                          border: `1px solid ${v.passed ? '#bbf7d0' : v.critical ? '#fecdd3' : '#fde68a'}`,
                        }}>
                        <div className="flex-shrink-0 mt-0.5">
                          {v.passed
                            ? <CheckCircle2 size={15} style={{ color: '#10b981' }} />
                            : v.critical
                              ? <XCircle size={15} style={{ color: '#ef4444' }} />
                              : <AlertCircle size={15} style={{ color: '#f59e0b' }} />
                          }
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[12px] font-semibold" style={{ color: v.passed ? '#059669' : v.critical ? '#dc2626' : '#d97706' }}>
                              {v.label}
                            </span>
                            {!v.passed && v.critical && (
                              <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full"
                                style={{ background: '#fee2e2', color: '#dc2626' }}>Critical</span>
                            )}
                          </div>
                          <p className="text-[11px] mt-0.5 text-slate-500">{v.detail}</p>
                          {/* Vendor confirmation prompt */}
                          {v.id === 'v4' && vendorConfirmed === null && (
                            <div className="flex items-center gap-2 mt-2">
                              <span className="text-[11px] text-slate-600">Confirm vendor mapping?</span>
                              <button onClick={() => setVendorConfirmed(true)}
                                className="px-2.5 py-1 rounded-lg text-[11px] font-semibold text-white transition-opacity hover:opacity-80"
                                style={{ background: '#10b981' }}>Yes, confirm</button>
                              <button onClick={() => setVendorConfirmed(false)}
                                className="px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors"
                                style={{ color: '#64748b', border: '1px solid #e2e8f0' }}>Reject</button>
                            </div>
                          )}
                          {v.id === 'v4' && vendorConfirmed === true && (
                            <p className="text-[11px] font-semibold mt-1" style={{ color: '#10b981' }}>
                              ✓ Confirmed — mapped to Microsoft South Africa (Pty) Ltd
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Action buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-3" style={{ borderTop: '1px solid #f1f5f9' }}>
                    <button
                      disabled={hasCriticalErrors}
                      className="flex-1 py-2.5 rounded-xl text-[13px] font-semibold text-white flex items-center justify-center gap-2 transition-opacity"
                      style={{
                        background: hasCriticalErrors ? '#e2e8f0' : 'linear-gradient(135deg, #10b981, #059669)',
                        color: hasCriticalErrors ? '#94a3b8' : 'white',
                        cursor: hasCriticalErrors ? 'not-allowed' : 'pointer',
                      }}>
                      <Send size={13} />
                      {hasCriticalErrors ? 'Fix Critical Errors First' : 'Approve & Post to Sage'}
                    </button>
                    <button className="px-5 py-2.5 rounded-xl text-[13px] font-semibold transition-colors hover:bg-amber-50"
                      style={{ color: '#d97706', border: '1px solid #fde68a', background: '#fffbeb' }}>
                      Flag for Review
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* Placeholder when idle */}
            {pipelineStage === 'idle' && (
              <div className="bg-white rounded-2xl p-8 flex flex-col items-center justify-center text-center min-h-[300px]"
                style={{ border: '2px dashed #e2e8f0' }}>
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
                  style={{ background: '#f1f5f9' }}>
                  <Eye size={24} style={{ color: '#94a3b8' }} />
                </div>
                <p className="text-[14px] font-semibold text-slate-600 mb-1">Results will appear here</p>
                <p className="text-[12px] text-slate-400">Upload a document to run the three-phase pipeline</p>
              </div>
            )}

            {/* Loading state */}
            {(pipelineStage === 'ocr' || pipelineStage === 'llm' || pipelineStage === 'validation') && (
              <div className="bg-white rounded-2xl p-8 flex flex-col items-center justify-center text-center min-h-[300px]"
                style={{ border: '1px solid #e2e8f0' }}>
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
                  style={{ background: 'linear-gradient(135deg, #ede9fe, #dbeafe)' }}>
                  <Loader2 size={28} className="animate-spin" style={{ color: '#8b5cf6' }} />
                </div>
                <p className="text-[14px] font-semibold text-slate-700 mb-1">
                  {pipelineStage === 'ocr' && 'Analysing document layout…'}
                  {pipelineStage === 'llm' && 'AI reasoning in progress…'}
                  {pipelineStage === 'validation' && 'Running validation checks…'}
                </p>
                <p className="text-[12px] text-slate-400">This takes 2–5 seconds in production</p>
                <div className="mt-4 flex gap-1.5">
                  {[0, 1, 2].map(i => (
                    <div key={i} className="w-2 h-2 rounded-full animate-pulse"
                      style={{ background: '#8b5cf6', animationDelay: `${i * 0.2}s` }} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
