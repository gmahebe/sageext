const AUTH_KEY = 'sc_auth_token';

// Demo credentials (prototype only)
export const DEMO_USERS = [
  { email: 'thandi@khumalo.co.za', password: 'demo123', name: 'Thandi Khumalo', role: 'Owner' },
  { email: 'sarah@nkosi-ca.co.za', password: 'demo123', name: 'Sarah Nkosi CA(SA)', role: 'Accountant' },
];

export function login(email: string, password: string): boolean {
  const user = DEMO_USERS.find(
    (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );
  if (!user) return false;
  if (typeof window !== 'undefined') {
    localStorage.setItem(AUTH_KEY, JSON.stringify({ email: user.email, name: user.name, role: user.role }));
  }
  return true;
}

export function logout(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(AUTH_KEY);
  }
}

export function isAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;
  return !!localStorage.getItem(AUTH_KEY);
}

export function getSession(): { email: string; name: string; role: string } | null {
  if (typeof window === 'undefined') return null;
  const raw = localStorage.getItem(AUTH_KEY);
  if (!raw) return null;
  try { return JSON.parse(raw); } catch { return null; }
}
