'use client';
import { useState } from 'react';
import { Search, BookOpen, Zap, FileText, Users, Brain, ChevronRight, ExternalLink, MessageCircle, Mail } from 'lucide-react';
import TopBar from '@/components/layout/TopBar';

const sections = [
  {
    icon: Zap,
    color: '#10b981',
    bg: '#d1fae5',
    title: 'Getting Started',
    articles: [
      { title: 'Connecting Sage Business Cloud via OAuth 2.0', time: '3 min read' },
      { title: 'Understanding the 90-Second Morning Ritual', time: '2 min read' },
      { title: 'Importing historical data via CSV', time: '4 min read' },
      { title: 'Setting up your first workflow automation', time: '5 min read' },
    ],
  },
  {
    icon: FileText,
    color: '#3b82f6',
    bg: '#dbeafe',
    title: 'Document Intelligence',
    articles: [
      { title: 'How the three-phase OCR pipeline works', time: '4 min read' },
      { title: 'Supported document types and formats', time: '2 min read' },
      { title: 'Understanding validation gate errors', time: '3 min read' },
      { title: 'Approving and posting documents to Sage', time: '2 min read' },
    ],
  },
  {
    icon: Users,
    color: '#8b5cf6',
    bg: '#ede9fe',
    title: 'Accountant Portal',
    articles: [
      { title: 'Adding and managing SME clients', time: '3 min read' },
      { title: 'Understanding the Health Score algorithm', time: '4 min read' },
      { title: 'Pinning tasks and notes to client dashboards', time: '2 min read' },
      { title: 'Generating client advisory summaries', time: '3 min read' },
    ],
  },
  {
    icon: Brain,
    color: '#f59e0b',
    bg: '#fef3c7',
    title: 'AI & Workflows',
    articles: [
      { title: 'How the AI Morning Brief is generated', time: '3 min read' },
      { title: 'Configuring automated debtor reminder workflows', time: '5 min read' },
      { title: 'Compliance deadline monitoring explained', time: '3 min read' },
      { title: 'Duplicate detection: how confidence scores work', time: '4 min read' },
    ],
  },
];

const faqs = [
  { q: 'How does OpsInsyts connect to my Sage account?', a: 'We use the official Sage Business Cloud REST API v3.1 with OAuth 2.0 authorisation. You grant access once and we maintain the connection using secure refresh tokens — no passwords are stored.' },
  { q: 'Is my financial data secure?', a: 'Yes. All data is encrypted at rest and in transit using AES-256 and TLS 1.3. We implement row-level security in our database so your data is never accessible to other tenants. We are POPIA and GDPR compliant.' },
  { q: 'What happens if the AI makes a mistake on a document?', a: 'Our three-phase pipeline is specifically designed to prevent AI errors from entering Sage. The Deterministic Validation Gate performs mathematical sum checks, temporal logic checks, and fuzzy vendor matching before any document is allowed to post. If confidence falls below 95%, the document is flagged for human review — it is never posted automatically.' },
  { q: 'Can multiple users access the same company account?', a: 'Yes. You can invite team members with role-based access control. Owner, Accountant, and Viewer roles are supported. Accountants using the Client Portal can access multiple company accounts from a single login.' },
  { q: 'How often does the dashboard sync with Sage?', a: 'The dashboard syncs with Sage every 15 minutes automatically. You can also trigger a manual sync at any time using the "Synced X min ago" button in the top bar.' },
];

export default function HelpPage() {
  const [search, setSearch] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const filteredFaqs = faqs.filter(f =>
    f.q.toLowerCase().includes(search.toLowerCase()) ||
    f.a.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <TopBar title="Help & Documentation" subtitle="Guides, FAQs, and support resources" />

      <main className="flex-1 overflow-y-auto px-6 py-5">
        <div className="max-w-4xl space-y-6">

          {/* Search */}
          <div className="relative">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: '#94a3b8' }} />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search documentation…"
              className="w-full pl-11 pr-4 py-3.5 rounded-2xl text-[14px] outline-none transition-all bg-white"
              style={{ border: '1px solid #e2e8f0', color: '#334155' }}
              onFocus={e => (e.target.style.borderColor = '#10b981')}
              onBlur={e => (e.target.style.borderColor = '#e2e8f0')}
            />
          </div>

          {/* Article sections */}
          {!search && (
            <div className="grid grid-cols-2 gap-4">
              {sections.map((sec) => {
                const Icon = sec.icon;
                return (
                  <div key={sec.title} className="bg-white rounded-2xl p-5" style={{ border: '1px solid #e2e8f0' }}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: sec.bg }}>
                        <Icon size={15} style={{ color: sec.color }} />
                      </div>
                      <h3 className="font-bold text-[13px] text-slate-800" style={{ fontFamily: 'Syne, sans-serif' }}>{sec.title}</h3>
                    </div>
                    <div className="space-y-1">
                      {sec.articles.map((art) => (
                        <button key={art.title}
                          className="w-full flex items-center justify-between py-2 text-left group transition-colors hover:bg-slate-50 rounded-lg px-2 -mx-2">
                          <div className="flex items-center gap-2">
                            <BookOpen size={11} style={{ color: '#cbd5e1' }} />
                            <span className="text-[12px] text-slate-600 group-hover:text-slate-900 transition-colors">{art.title}</span>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                            <span className="text-[10px] text-slate-300">{art.time}</span>
                            <ChevronRight size={11} style={{ color: '#cbd5e1' }} />
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* FAQs */}
          <div className="bg-white rounded-2xl p-6" style={{ border: '1px solid #e2e8f0' }}>
            <h2 className="font-bold text-[14px] text-slate-800 mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>
              Frequently Asked Questions
            </h2>
            <div className="space-y-1">
              {filteredFaqs.map((faq, i) => (
                <div key={i} className="rounded-xl overflow-hidden transition-all"
                  style={{ border: `1px solid ${openFaq === i ? '#e2e8f0' : 'transparent'}` }}>
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between px-4 py-3.5 text-left transition-colors hover:bg-slate-50 rounded-xl">
                    <span className="text-[13px] font-semibold text-slate-700 pr-4">{faq.q}</span>
                    <ChevronRight size={14} style={{ color: '#94a3b8', flexShrink: 0, transform: openFaq === i ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }} />
                  </button>
                  {openFaq === i && (
                    <div className="px-4 pb-4">
                      <p className="text-[13px] text-slate-500 leading-relaxed">{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
              {filteredFaqs.length === 0 && (
                <p className="text-[13px] text-slate-400 py-4 text-center">No results for "{search}"</p>
              )}
            </div>
          </div>

          {/* Contact support */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: MessageCircle, color: '#3b82f6', bg: '#dbeafe', title: 'Live Chat', desc: 'Chat with our support team — typically responds in under 5 minutes during business hours.', cta: 'Start Chat' },
              { icon: Mail, color: '#8b5cf6', bg: '#ede9fe', title: 'Email Support', desc: 'Send us a detailed message and we will respond within one business day.', cta: 'Send Email' },
            ].map((c) => {
              const Icon = c.icon;
              return (
                <div key={c.title} className="bg-white rounded-2xl p-5 flex flex-col" style={{ border: '1px solid #e2e8f0' }}>
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3" style={{ background: c.bg }}>
                    <Icon size={16} style={{ color: c.color }} />
                  </div>
                  <h3 className="font-bold text-[13px] text-slate-800 mb-1" style={{ fontFamily: 'Syne, sans-serif' }}>{c.title}</h3>
                  <p className="text-[12px] text-slate-400 flex-1 leading-relaxed mb-4">{c.desc}</p>
                  <button className="w-full py-2.5 rounded-xl text-[12px] font-semibold flex items-center justify-center gap-1.5"
                    style={{ background: c.bg, color: c.color }}>
                    {c.cta} <ExternalLink size={11} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
