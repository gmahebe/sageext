export type HealthStatus = 'green' | 'amber' | 'red';
export type UrgencyLevel = 'URGENT' | 'WARNING' | 'INFO';

export interface HealthIndicator {
  id: string;
  label: string;
  status: HealthStatus;
  metric: string;
  trend: 'up' | 'down' | 'neutral';
  description: string;
  subtext?: string;
}

export interface PriorityAction {
  id: string;
  urgency: UrgencyLevel;
  icon: string;
  title: string;
  description: string;
  cta: string;
  amount?: string;
  daysOverdue?: number;
}

export interface CashFlowPoint {
  day: string;
  balance: number;
  projected?: number;
}

export interface Client {
  id: string;
  name: string;
  industry: string;
  healthScore: number;
  cashStatus: HealthStatus;
  vatStatus: HealthStatus;
  invoiceStatus: HealthStatus;
  lastActivity: string;
  riskFlags: string[];
  pendingActions: number;
  contactPerson: string;
  pinnedTasks: PinnedTask[];
}

export interface PinnedTask {
  id: string;
  author: string;
  message: string;
  timestamp: string;
  type: 'task' | 'note' | 'alert';
}

export interface WorkflowStep {
  id: string;
  label: string;
  status: 'completed' | 'active' | 'pending';
  timestamp?: string;
  description: string;
}

export interface Workflow {
  id: string;
  name: string;
  trigger: string;
  status: 'active' | 'paused' | 'completed';
  lastRun: string;
  actionsCount: number;
  steps: WorkflowStep[];
}

// ── Health Indicators ──────────────────────────────────────────────────────────
export const healthIndicators: HealthIndicator[] = [
  {
    id: 'cash_flow',
    label: 'Cash Flow',
    status: 'green',
    metric: 'R 248,500',
    trend: 'up',
    description: '5.2-week runway',
    subtext: '+R 12,300 this week',
  },
  {
    id: 'vat',
    label: 'VAT Compliance',
    status: 'red',
    metric: '48 hrs left',
    trend: 'down',
    description: 'SARS VAT201 due',
    subtext: '4 docs unverified',
  },
  {
    id: 'overdue',
    label: 'Overdue Invoices',
    status: 'amber',
    metric: 'R 89,200',
    trend: 'down',
    description: '7 invoices pending',
    subtext: '32 days avg overdue',
  },
  {
    id: 'suppliers',
    label: 'Supplier Payments',
    status: 'green',
    metric: 'R 34,800',
    trend: 'neutral',
    description: '3 due this week',
    subtext: 'All within terms',
  },
  {
    id: 'reconciliation',
    label: 'Bank Reconciliation',
    status: 'amber',
    metric: '12 unmatched',
    trend: 'down',
    description: 'Last sync: 2h ago',
    subtext: 'FNB Business Account',
  },
];

// ── Priority Actions ───────────────────────────────────────────────────────────
export const priorityActions: PriorityAction[] = [
  {
    id: 'pa-1',
    urgency: 'URGENT',
    icon: 'AlertTriangle',
    title: 'VAT Filing Due in 48 Hours',
    description:
      'SARS VAT201 for the period ending 31 May 2025. Supporting documentation is missing for 4 transactions totalling R23,400. Filing without these may trigger a SARS audit.',
    cta: 'Review Docs',
    amount: 'R 23,400',
  },
  {
    id: 'pa-2',
    urgency: 'WARNING',
    icon: 'Copy',
    title: 'Duplicate Invoice — Makro Business Supplies',
    description:
      'Invoice #INV-2024-0891 (R12,400) appears to be a duplicate of #INV-2024-0874 processed on 14 May. Match confidence: 94%. Blocking payment pending your review.',
    cta: 'Resolve Duplicate',
    amount: 'R 12,400',
  },
  {
    id: 'pa-3',
    urgency: 'INFO',
    icon: 'Clock',
    title: 'Follow Up: Nexus Trading (Pty) Ltd',
    description:
      'Invoice #INV-0445 for R34,800 is 32 days overdue. If unpaid by Friday, your cash runway drops below 4 weeks. A personalised reminder is ready to send.',
    cta: 'Send Reminder',
    amount: 'R 34,800',
    daysOverdue: 32,
  },
];

// ── Cash Flow (30 days) ────────────────────────────────────────────────────────
export const cashFlowData: CashFlowPoint[] = [
  { day: '1 May', balance: 198000 },
  { day: '2 May', balance: 195500 },
  { day: '3 May', balance: 210000 },
  { day: '4 May', balance: 207200 },
  { day: '5 May', balance: 213400 },
  { day: '6 May', balance: 209800 },
  { day: '7 May', balance: 218600 },
  { day: '8 May', balance: 215000 },
  { day: '9 May', balance: 221300 },
  { day: '10 May', balance: 218900 },
  { day: '11 May', balance: 225400 },
  { day: '12 May', balance: 222100 },
  { day: '13 May', balance: 231800 },
  { day: '14 May', balance: 229500 },
  { day: '15 May', balance: 236200 },
  { day: '16 May', balance: 233800 },
  { day: '17 May', balance: 228600 },
  { day: '18 May', balance: 225000 },
  { day: '19 May', balance: 232400 },
  { day: '20 May', balance: 238700 },
  { day: '21 May', balance: 242100 },
  { day: '22 May', balance: 239800 },
  { day: '23 May', balance: 246300 },
  { day: '24 May', balance: 244000 },
  { day: '25 May', balance: 249800 },
  { day: '26 May', balance: 247500 },
  { day: '27 May', balance: 251200 },
  { day: '28 May', balance: 248900 },
  { day: '29 May', balance: 252400 },
  { day: '30 May', balance: 248500, projected: 248500 },
];

// ── Extracted Invoice Data ─────────────────────────────────────────────────────
export const extractedInvoice = {
  vendor: 'Microsoft South Africa (Pty) Ltd',
  vendorRaw: 'Micro Soft SA',
  invoiceNumber: 'MS-INV-20250519-0042',
  date: '19 May 2025',
  dueDate: '18 Jun 2025',
  vatNumber: '4650156285',
  lineItems: [
    { description: 'Microsoft 365 Business Premium — 12 seats', qty: 12, unitPrice: 349.0, total: 4188.0 },
    { description: 'Azure DevOps Services — Monthly', qty: 1, unitPrice: 1850.0, total: 1850.0 },
    { description: 'Power BI Pro — 3 licences', qty: 3, unitPrice: 580.0, total: 1740.0 },
  ],
  subtotal: 7778.0,
  vat15: 1166.7,
  total: 8944.7,
  extractedTotal: 9200.0,
};

// ── Validation Results ─────────────────────────────────────────────────────────
export const validationResults = [
  { id: 'v1', passed: true, label: 'Invoice number format valid', detail: 'Conforms to alphanumeric standard' },
  { id: 'v2', passed: true, label: 'VAT registration number verified', detail: 'SARS-registered: 4650156285' },
  { id: 'v3', passed: false, critical: true, label: 'Sum check failed', detail: 'Line items total R8,944.70 — invoice states R9,200.00 (Δ R255.30)' },
  { id: 'v4', passed: false, critical: false, label: 'Fuzzy vendor match required', detail: '"Micro Soft SA" → "Microsoft South Africa (Pty) Ltd" — 94% confidence. Please confirm.' },
  { id: 'v5', passed: true, label: 'No duplicate invoice detected', detail: 'Checked against 1,248 historical invoices' },
  { id: 'v6', passed: true, label: 'Date logic valid', detail: 'Issue date precedes due date by 30 days' },
  { id: 'v7', passed: true, label: 'Ledger account mapped', detail: 'IT & Software Subscriptions (GL: 7210)' },
];

// ── Clients ────────────────────────────────────────────────────────────────────
export const clients: Client[] = [
  {
    id: 'c1',
    name: 'Nexus Trading (Pty) Ltd',
    industry: 'Wholesale & Distribution',
    healthScore: 23,
    cashStatus: 'red',
    vatStatus: 'red',
    invoiceStatus: 'red',
    lastActivity: '2 days ago',
    riskFlags: ['VAT overdue', 'Cash runway < 3 wks', '3 invoices 45d+'],
    pendingActions: 5,
    contactPerson: 'Thabo Molefe',
    pinnedTasks: [
      { id: 'pt1', author: 'Sarah Nkosi CA(SA)', message: 'Urgently call Thabo re VAT arrears — SARS issued a letter of demand on 20 May.', timestamp: '1 day ago', type: 'alert' },
      { id: 'pt2', author: 'Sarah Nkosi CA(SA)', message: 'Review aged debtors before our call on Thursday. Focus on Top 3 customers.', timestamp: '3 days ago', type: 'task' },
    ],
  },
  {
    id: 'c2',
    name: 'Umoya Renewable Energy',
    industry: 'Energy & Utilities',
    healthScore: 41,
    cashStatus: 'amber',
    vatStatus: 'amber',
    invoiceStatus: 'red',
    lastActivity: '1 day ago',
    riskFlags: ['R67k overdue 60d+', 'VAT201 due 15 Jun'],
    pendingActions: 3,
    contactPerson: 'Priya Naidoo',
    pinnedTasks: [
      { id: 'pt3', author: 'David Kruger CA(SA)', message: 'Prepare cash flow forecast for Board meeting on 5 June. Need 13-week rolling view.', timestamp: '5 hours ago', type: 'task' },
    ],
  },
  {
    id: 'c3',
    name: 'Cape Harvest Foods',
    industry: 'Food & Beverage',
    healthScore: 67,
    cashStatus: 'green',
    vatStatus: 'amber',
    invoiceStatus: 'amber',
    lastActivity: '4 hours ago',
    riskFlags: ['VAT201 gap — 2 receipts missing'],
    pendingActions: 2,
    contactPerson: 'Anri van der Merwe',
    pinnedTasks: [],
  },
  {
    id: 'c4',
    name: 'Durban Logistics Hub',
    industry: 'Transport & Logistics',
    healthScore: 78,
    cashStatus: 'green',
    vatStatus: 'green',
    invoiceStatus: 'amber',
    lastActivity: '6 hours ago',
    riskFlags: ['PO delayed 4.2 days avg'],
    pendingActions: 1,
    contactPerson: 'Sipho Dlamini',
    pinnedTasks: [
      { id: 'pt4', author: 'Sarah Nkosi CA(SA)', message: 'Monitor the Transnet contract invoices — client mentioned they expect payment by 28 May.', timestamp: '2 days ago', type: 'note' },
    ],
  },
  {
    id: 'c5',
    name: 'Sandton Tech Solutions',
    industry: 'Information Technology',
    healthScore: 88,
    cashStatus: 'green',
    vatStatus: 'green',
    invoiceStatus: 'green',
    lastActivity: '1 hour ago',
    riskFlags: [],
    pendingActions: 0,
    contactPerson: 'Keitumetse Sithole',
    pinnedTasks: [],
  },
  {
    id: 'c6',
    name: 'Joburg Property Investments',
    industry: 'Real Estate',
    healthScore: 54,
    cashStatus: 'amber',
    vatStatus: 'green',
    invoiceStatus: 'amber',
    lastActivity: '3 days ago',
    riskFlags: ['Sectional title levy arrears', '2 tenants 30d late'],
    pendingActions: 2,
    contactPerson: 'Rashid Patel',
    pinnedTasks: [],
  },
  {
    id: 'c7',
    name: 'Vaal Basin Manufacturing',
    industry: 'Manufacturing',
    healthScore: 35,
    cashStatus: 'red',
    vatStatus: 'amber',
    invoiceStatus: 'amber',
    lastActivity: '1 day ago',
    riskFlags: ['PAYE arrears detected', 'Negative working capital'],
    pendingActions: 4,
    contactPerson: 'Boitumelo Lesedi',
    pinnedTasks: [],
  },
  {
    id: 'c8',
    name: 'Stellenbosch Winery Estate',
    industry: 'Agriculture & Wine',
    healthScore: 82,
    cashStatus: 'green',
    vatStatus: 'green',
    invoiceStatus: 'green',
    lastActivity: '30 min ago',
    riskFlags: [],
    pendingActions: 0,
    contactPerson: 'Liezel de Villiers',
    pinnedTasks: [],
  },
];

// ── Workflows ──────────────────────────────────────────────────────────────────
export const workflows: Workflow[] = [
  {
    id: 'wf-1',
    name: 'Overdue Invoice Reminder Engine',
    trigger: 'Invoice unpaid > 30 days',
    status: 'active',
    lastRun: '12 min ago',
    actionsCount: 7,
    steps: [
      { id: 's1', label: 'Invoice Overdue Detected', status: 'completed', timestamp: '08:14 AM', description: 'Invoice #INV-0445 (Nexus Trading) flagged — 32 days past due date. Outstanding: R34,800.' },
      { id: 's2', label: 'Invoice PDF Retrieved', status: 'completed', timestamp: '08:14 AM', description: 'Fetched via GET /api/v3.1/invoices/INV-0445 with Accept: application/pdf header. File size: 84KB.' },
      { id: 's3', label: 'Personalised Email Drafted', status: 'completed', timestamp: '08:15 AM', description: 'AI engine generated a personalised reminder using client payment history and relationship tone.' },
      { id: 's4', label: 'Routed via SendGrid', status: 'active', timestamp: '08:15 AM', description: 'Email queued for delivery to thabo@nexustrading.co.za via SendGrid transactional API. Tracking enabled.' },
      { id: 's5', label: 'Sage Status Flag Updated', status: 'pending', timestamp: '—', description: 'Will set invoice sent=true via PATCH /api/v3.1/invoices/INV-0445 after confirmed delivery receipt.' },
    ],
  },
  {
    id: 'wf-2',
    name: 'SARS VAT201 Compliance Alert',
    trigger: 'VAT period closing within 72 hours',
    status: 'active',
    lastRun: '2 hours ago',
    actionsCount: 3,
    steps: [],
  },
  {
    id: 'wf-3',
    name: 'Duplicate Supplier Invoice Guard',
    trigger: 'New purchase invoice uploaded',
    status: 'active',
    lastRun: '45 min ago',
    actionsCount: 12,
    steps: [],
  },
];

export const draftEmail = {
  to: 'thabo@nexustrading.co.za',
  from: 'accounts@yourbusiness.co.za',
  subject: 'Payment Reminder — Invoice #INV-0445 (R34,800.00) — 32 Days Overdue',
  body: `Dear Thabo,

I hope this finds you well. I'm following up on Invoice #INV-0445 dated 24 April 2025 for R34,800.00 (VAT inclusive), which was due on 24 May 2025.

As of today, the invoice is 32 days past due. We value our relationship with Nexus Trading and would like to resolve this quickly.

Could you please advise:
1. If payment has already been processed (please share the proof of payment), or
2. A confirmed payment date we can note on your account.

You can pay via EFT to:
  Bank: FNB Business Banking
  Account Name: [Your Business Name]
  Account No: 62834917820
  Branch Code: 250655
  Reference: INV-0445

If you are experiencing any cash flow difficulties, please reach out — we are happy to discuss a short-term arrangement.

Please treat this as urgent. If we do not receive payment or a commitment by 30 May 2025, we may need to place the account on hold.

Kind regards,
[Your Name]
[Your Business Name] | Accounts Department
Tel: +27 11 xxx xxxx`,
};
