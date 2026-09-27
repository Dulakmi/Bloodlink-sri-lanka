import { useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router';
import { BloodDropTile } from '../components/BloodDropIcon';
import { useAuth } from '../context/AuthContext';

const roles = [
  { id: 'donor', label: 'Blood Donor', icon: '◆', path: '/dashboard/donor', color: '#FF0040' },
  { id: 'requester', label: 'Individual', icon: '◉', path: '/dashboard/requester', color: '#7B2FFF' },
  { id: 'hospital', label: 'Hospital / Org', icon: '◧', path: '/dashboard/hospital', color: '#00B4FF' },
  { id: 'admin', label: 'Admin', icon: '◈', path: '/dashboard/admin', color: '#00E5A0' },
];

export default function Login() {
  const navigate = useNavigate();
  const auth = useAuth();
  const [role, setRole] = useState('donor');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Already logged in — send to their dashboard
  if (auth.user) {
    const dest = roles.find(r => r.id === auth.user!.role)?.path ?? '/';
    return <Navigate to={dest} replace />;
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) { setError('Please fill in all fields.'); return; }
    const selected = roles.find(r => r.id === role);
    if (selected) {
      auth.login(role, email);
      navigate(selected.path);
    }
  };

  const selectedRole = roles.find(r => r.id === role)!;

  return (
    <div className="min-h-screen flex bg-[#00032B]">
      {/* Left panel */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden flex-col justify-between p-12">
        <div className="absolute inset-0 mesh-bg grid-pattern" />
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-[#FF0040]/15 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-56 h-56 bg-[#7B2FFF]/15 rounded-full blur-3xl" />

        <div className="relative">
          <Link to="/" className="flex items-center gap-2.5">
            <BloodDropTile size={38} rounded="rounded-xl" className="glow-red-sm" />
            <span className="font-display text-2xl font-bold text-white">Blood<span className="text-[#FF0040]">Link</span></span>
          </Link>
        </div>

        <div className="relative">
          <p className="font-mono-label text-xs text-[#FF0040] tracking-widest uppercase mb-4">Donor testimonial</p>
          <blockquote className="font-display text-2xl font-bold text-white leading-tight mb-5">
            "A single donation can save up to three lives. BloodLink made it possible for me to help three strangers — in one afternoon."
          </blockquote>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF0040] to-[#7B2FFF] flex items-center justify-center text-white font-bold text-sm">MR</div>
            <div>
              <p className="text-white font-semibold text-sm">Marcus Rivera</p>
              <p className="text-white/40 text-xs font-mono-label">Donor · 14 donations · New York</p>
            </div>
          </div>
        </div>

        <div className="relative grid grid-cols-2 gap-4">
          {[['12,400+', 'Donors'], ['3,200+', 'Lives Saved'], ['98', 'Hospitals'], ['< 2h', 'Response']].map(([v, l]) => (
            <div key={l} className="mesh-card rounded-2xl p-4">
              <p className="font-display text-2xl font-black text-white">{v}</p>
              <p className="text-white/40 text-xs font-mono-label mt-0.5">{l}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-8 bg-[var(--background)]">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8">
            <Link to="/" className="flex items-center gap-2.5">
              <BloodDropTile size={32} rounded="rounded-lg" />
              <span className="font-display text-xl font-bold text-[#00032B]">Blood<span className="text-[#FF0040]">Link</span></span>
            </Link>
          </div>

          <p className="font-mono-label text-xs text-[#FF0040] tracking-widest uppercase mb-2">Welcome back</p>
          <h1 className="font-display text-4xl font-black text-[#00032B] mb-1">Sign in</h1>
          <p className="text-[var(--muted-foreground)] mb-8">Choose your role and enter your credentials.</p>

          {error && (
            <div className="bg-red-50 border border-[#FF0040]/30 text-[#FF0040] text-sm px-4 py-3 rounded-xl mb-6">{error}</div>
          )}

          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            {/* Role */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-[#00032B]">Sign in as</label>
              <div className="grid grid-cols-2 gap-2">
                {roles.map(r => (
                  <button type="button" key={r.id} onClick={() => setRole(r.id)}
                    className={`flex items-center gap-2.5 px-4 py-3 rounded-xl border-2 text-sm font-semibold transition-all text-left ${
                      role === r.id ? 'border-[#FF0040] bg-[#FF0040]/5 text-[#FF0040]' : 'border-[var(--border)] text-[var(--muted-foreground)] hover:border-[#00032B] hover:text-[#00032B]'
                    }`}>
                    <span className="font-mono-label text-base" style={{ color: role === r.id ? r.color : undefined }}>{r.icon}</span>
                    {r.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1.5 text-[#00032B]">Email address</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" required
                className="w-full border-2 border-[var(--border)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#FF0040] transition-colors bg-white" />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-semibold text-[#00032B]">Password</label>
                <Link to="/forgot-password" className="text-xs text-[#FF0040] hover:text-[#cc0033] font-medium">Forgot password?</Link>
              </div>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required
                className="w-full border-2 border-[var(--border)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#FF0040] transition-colors bg-white" />
            </div>

            <button type="submit"
              className="w-full bg-[#00032B] text-white font-bold py-3.5 rounded-xl hover:bg-[#FF0040] transition-all text-sm mt-1">
              Login to {selectedRole.label} Account →
            </button>
          </form>

          <p className="text-center text-sm text-[var(--muted-foreground)] mt-6">
            Don't have an account?{' '}
            <Link to="/register" className="text-[#FF0040] font-semibold hover:text-[#cc0033]">Create one free →</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
