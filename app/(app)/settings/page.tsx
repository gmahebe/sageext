'use client';
import { useState } from 'react';
import { User, Bell, Shield, Plug, Palette, ChevronRight, Check, ToggleLeft, ToggleRight } from 'lucide-react';
import TopBar from '@/components/layout/TopBar';
import { getSession } from '@/lib/auth';

const tabs = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'integrations', label: 'Integrations', icon: Plug },
  { id: 'appearance', label: 'Appearance', icon: Palette },
];

function Toggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <button onClick={onToggle} className="flex-shrink-0">
      {on
        ? <ToggleRight size={22} style={{ color: '#10b981' }} />
        : <ToggleLeft size={22} style={{ color: '#94a3b8' }} />}
    </button>
  );
}

export default function SettingsPage() {
  const session = getSession();
  const [activeTab, setActiveTab] = useState('profile');
  const [saved, setSaved] = useState(false);
  const [notifs, setNotifs] = useState({ vatReminders: true, overdueAlerts: true, dailyBrief: true, duplicateFlag: true, reconciliation: false });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <TopBar title="Settings" subtitle="Manage your account, notifications, and integrations" />

      <main className="flex-1 overflow-y-auto px-6 py-5">
        <div className="max-w-4xl flex gap-6">

          {/* Tab sidebar */}
          <div className="w-48 flex-shrink-0">
            <nav className="space-y-0.5">
              {tabs.map((t) => {
                const Icon = t.icon;
                const active = activeTab === t.id;
                return (
                  <button key={t.id} onClick={() => setActiveTab(t.id)}
                    className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[13px] font-medium text-left transition-all"
                    style={{
                      background: active ? 'white' : 'transparent',
                      color: active ? '#0f172a' : '#64748b',
                      border: active ? '1px solid #e2e8f0' : '1px solid transparent',
                      boxShadow: active ? '0 1px 3px rgba(0,0,0,0.06)' : 'none',
                    }}>
                    <Icon size={14} style={{ color: active ? '#10b981' : '#94a3b8' }} />
                    {t.label}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Tab content */}
          <div className="flex-1 space-y-4">

            {/* ── Profile ───────────────────────────────── */}
            {activeTab === 'profile' && (
              <>
                <div className="bg-white rounded-2xl p-6" style={{ border: '1px solid #e2e8f0' }}>
                  <h2 className="font-bold text-[14px] text-slate-800 mb-5" style={{ fontFamily: 'Syne, sans-serif' }}>Account Details</h2>
                  <div className="flex items-center gap-4 mb-6 p-4 rounded-xl" style={{ background: '#f8fafc', border: '1px solid #f1f5f9' }}>
                    <div className="w-14 h-14 rounded-full flex items-center justify-center text-[18px] font-bold text-white flex-shrink-0"
                      style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)' }}>
                      {session?.name?.split(' ').map((w: string) => w[0]).join('').slice(0, 2) ?? 'SC'}
                    </div>
                    <div>
                      <p className="font-bold text-[15px] text-slate-800">{session?.name ?? 'Demo User'}</p>
                      <p className="text-[12px] text-slate-400">{session?.role} · {session?.email}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: 'Full Name', value: session?.name ?? '', placeholder: 'Your name' },
                      { label: 'Email Address', value: session?.email ?? '', placeholder: 'email@company.co.za' },
                      { label: 'Company Name', value: 'Khumalo & Associates (Pty) Ltd', placeholder: 'Company name' },
                      { label: 'Tax Reference', value: '9312/845/17/4', placeholder: 'SARS tax ref' },
                    ].map((f) => (
                      <div key={f.label}>
                        <label className="block text-[11px] font-semibold text-slate-500 mb-1.5">{f.label}</label>
                        <input defaultValue={f.value} placeholder={f.placeholder}
                          className="w-full px-3 py-2.5 rounded-xl text-[13px] outline-none transition-all"
                          style={{ background: '#f8fafc', border: '1px solid #e2e8f0', color: '#334155' }}
                          onFocus={e => (e.target.style.borderColor = '#10b981')}
                          onBlur={e => (e.target.style.borderColor = '#e2e8f0')} />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-6" style={{ border: '1px solid #e2e8f0' }}>
                  <h2 className="font-bold text-[14px] text-slate-800 mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>Business Details</h2>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: 'VAT Registration Number', value: '4650156285' },
                      { label: 'Financial Year End', value: 'February' },
                      { label: 'Primary Bank', value: 'FNB Business Banking' },
                      { label: 'Base Currency', value: 'ZAR — South African Rand' },
                    ].map((f) => (
                      <div key={f.label}>
                        <label className="block text-[11px] font-semibold text-slate-500 mb-1.5">{f.label}</label>
                        <input defaultValue={f.value}
                          className="w-full px-3 py-2.5 rounded-xl text-[13px] outline-none transition-all"
                          style={{ background: '#f8fafc', border: '1px solid #e2e8f0', color: '#334155' }}
                          onFocus={e => (e.target.style.borderColor = '#10b981')}
                          onBlur={e => (e.target.style.borderColor = '#e2e8f0')} />
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* ── Notifications ─────────────────────────── */}
            {activeTab === 'notifications' && (
              <div className="bg-white rounded-2xl p-6" style={{ border: '1px solid #e2e8f0' }}>
                <h2 className="font-bold text-[14px] text-slate-800 mb-5" style={{ fontFamily: 'Syne, sans-serif' }}>Notification Preferences</h2>
                <div className="space-y-1">
                  {[
                    { key: 'dailyBrief', label: 'Daily AI Morning Brief', desc: 'Delivered at 06:00 AM with your top 3 actions' },
                    { key: 'vatReminders', label: 'VAT & Compliance Deadlines', desc: 'Alerts 7 days, 48 hours, and 24 hours before filing due dates' },
                    { key: 'overdueAlerts', label: 'Overdue Invoice Alerts', desc: 'Notify when a customer invoice exceeds 30 days unpaid' },
                    { key: 'duplicateFlag', label: 'Duplicate Invoice Flags', desc: 'Immediate alert when a possible duplicate is detected during upload' },
                    { key: 'reconciliation', label: 'Bank Reconciliation Alerts', desc: 'Notify when unmatched transactions exceed 10 items' },
                  ].map((n) => (
                    <div key={n.key} className="flex items-center justify-between py-3.5 border-b last:border-0" style={{ borderColor: '#f1f5f9' }}>
                      <div>
                        <p className="text-[13px] font-medium text-slate-700">{n.label}</p>
                        <p className="text-[11px] text-slate-400 mt-0.5">{n.desc}</p>
                      </div>
                      <Toggle
                        on={notifs[n.key as keyof typeof notifs]}
                        onToggle={() => setNotifs(prev => ({ ...prev, [n.key]: !prev[n.key as keyof typeof notifs] }))}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── Security ──────────────────────────────── */}
            {activeTab === 'security' && (
              <div className="space-y-4">
                <div className="bg-white rounded-2xl p-6" style={{ border: '1px solid #e2e8f0' }}>
                  <h2 className="font-bold text-[14px] text-slate-800 mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>Change Password</h2>
                  <div className="space-y-3 max-w-sm">
                    {['Current Password', 'New Password', 'Confirm New Password'].map((l) => (
                      <div key={l}>
                        <label className="block text-[11px] font-semibold text-slate-500 mb-1.5">{l}</label>
                        <input type="password" placeholder="••••••••"
                          className="w-full px-3 py-2.5 rounded-xl text-[13px] outline-none"
                          style={{ background: '#f8fafc', border: '1px solid #e2e8f0', color: '#334155' }}
                          onFocus={e => (e.target.style.borderColor = '#10b981')}
                          onBlur={e => (e.target.style.borderColor = '#e2e8f0')} />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-6" style={{ border: '1px solid #e2e8f0' }}>
                  <h2 className="font-bold text-[14px] text-slate-800 mb-1" style={{ fontFamily: 'Syne, sans-serif' }}>Two-Factor Authentication</h2>
                  <p className="text-[12px] text-slate-400 mb-4">Add an extra layer of security to your account</p>
                  <div className="flex items-center justify-between p-3 rounded-xl" style={{ background: '#f8fafc', border: '1px solid #f1f5f9' }}>
                    <div>
                      <p className="text-[13px] font-medium text-slate-700">Authenticator App</p>
                      <p className="text-[11px] text-slate-400">Google Authenticator, Authy</p>
                    </div>
                    <button className="text-[12px] font-semibold px-3 py-1.5 rounded-lg"
                      style={{ background: '#f0fdf4', color: '#059669', border: '1px solid #a7f3d0' }}>
                      Enable
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ── Integrations ──────────────────────────── */}
            {activeTab === 'integrations' && (
              <div className="bg-white rounded-2xl p-6" style={{ border: '1px solid #e2e8f0' }}>
                <h2 className="font-bold text-[14px] text-slate-800 mb-5" style={{ fontFamily: 'Syne, sans-serif' }}>Connected Integrations</h2>
                <div className="space-y-3">
                  {[
                    { name: 'Sage Business Cloud Accounting', desc: 'REST API v3.1 · OAuth 2.0 connected', status: 'connected', color: '#10b981' },
                    { name: 'SendGrid', desc: 'Transactional email delivery for automated reminders', status: 'connected', color: '#10b981' },
                    { name: 'Google Document AI', desc: 'Layout-aware OCR for document ingestion pipeline', status: 'connected', color: '#10b981' },
                    { name: 'Pinecone Vector DB', desc: 'Semantic vendor name matching and fuzzy lookup', status: 'pending', color: '#f59e0b' },
                    { name: 'FNB Open Banking', desc: 'Real-time bank feed synchronisation', status: 'disconnected', color: '#94a3b8' },
                  ].map((intg) => (
                    <div key={intg.name} className="flex items-center justify-between p-4 rounded-xl" style={{ background: '#f8fafc', border: '1px solid #f1f5f9' }}>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: intg.color }} />
                        <div>
                          <p className="text-[13px] font-semibold text-slate-700">{intg.name}</p>
                          <p className="text-[11px] text-slate-400">{intg.desc}</p>
                        </div>
                      </div>
                      <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full capitalize"
                        style={{
                          background: intg.status === 'connected' ? '#d1fae5' : intg.status === 'pending' ? '#fef3c7' : '#f1f5f9',
                          color: intg.status === 'connected' ? '#059669' : intg.status === 'pending' ? '#d97706' : '#94a3b8',
                        }}>
                        {intg.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── Appearance ────────────────────────────── */}
            {activeTab === 'appearance' && (
              <div className="bg-white rounded-2xl p-6" style={{ border: '1px solid #e2e8f0' }}>
                <h2 className="font-bold text-[14px] text-slate-800 mb-5" style={{ fontFamily: 'Syne, sans-serif' }}>Appearance</h2>
                <div className="space-y-5">
                  <div>
                    <p className="text-[12px] font-semibold text-slate-500 mb-2">Theme</p>
                    <div className="flex gap-3">
                      {['Light', 'Dark', 'System'].map((t) => (
                        <button key={t}
                          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-[13px] font-medium transition-all"
                          style={{
                            background: t === 'Light' ? 'white' : '#f8fafc',
                            border: t === 'Light' ? '2px solid #10b981' : '1px solid #e2e8f0',
                            color: t === 'Light' ? '#059669' : '#64748b',
                          }}>
                          {t === 'Light' && <Check size={13} style={{ color: '#10b981' }} />}
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-[12px] font-semibold text-slate-500 mb-2">Dashboard Density</p>
                    <div className="flex gap-3">
                      {['Comfortable', 'Compact'].map((d) => (
                        <button key={d}
                          className="px-4 py-2.5 rounded-xl text-[13px] font-medium"
                          style={{
                            background: d === 'Comfortable' ? 'white' : '#f8fafc',
                            border: d === 'Comfortable' ? '2px solid #10b981' : '1px solid #e2e8f0',
                            color: d === 'Comfortable' ? '#059669' : '#64748b',
                          }}>
                          {d}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Save button */}
            <div className="flex justify-end">
              <button onClick={handleSave}
                className="px-6 py-2.5 rounded-xl text-[13px] font-semibold text-white flex items-center gap-2 transition-all hover:opacity-90"
                style={{ background: saved ? '#059669' : 'linear-gradient(135deg, #10b981, #059669)' }}>
                {saved ? <><Check size={14} /> Saved!</> : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
