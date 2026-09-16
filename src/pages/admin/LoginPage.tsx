import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useClinic } from '../../context/ClinicContext';
import { Lock, Mail, ShieldCheck, ArrowRight, AlertCircle, Check } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { login, settings, currentUser } = useClinic();
  const navigate = useNavigate();

  const [email, setEmail] = useState('admin@prishaivf.in');
  const [password, setPassword] = useState('Admin@Prisha2026');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // If already logged in, redirect
  if (currentUser) {
    navigate('/admin/dashboard', { replace: true });
    return null;
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    const res = await login(email, password);
    setLoading(false);

    if (res.success) {
      navigate('/admin/dashboard');
    } else {
      setErrorMsg(res.message || 'Invalid credentials. Please verify your email and password.');
    }
  };

  const handleQuickFill = () => {
    setEmail('admin@prishaivf.in');
    setPassword('Admin@Prisha2026');
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decorative Rings */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#0E5D94]/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#E83E8C]/20 rounded-full blur-3xl"></div>

      <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 shadow-2xl relative z-10 space-y-6">
        {/* Logo */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-block">
            <img
              src={settings.logo || '/images/prisha-ivf-logo.png'}
              alt="Prisha IVF"
              className="h-12 w-auto mx-auto object-contain"
            />
          </Link>
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Clinic Content Management System
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900">Admin Portal Sign In</h1>
        </div>

        {errorMsg && (
          <div className="flex items-center gap-2 p-3.5 rounded-xl bg-red-50 text-red-700 text-xs font-semibold border border-red-200">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4 text-sm">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Admin Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@prishaivf.in"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[#0E5D94] focus:ring-2 focus:ring-sky-100 outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Master Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[#0E5D94] focus:ring-2 focus:ring-sky-100 outline-none transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-[#0E5D94] to-[#0A4D7A] hover:from-[#0a4975] hover:to-[#0E5D94] shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <span>{loading ? 'Authenticating...' : 'Sign In to CMS Dashboard'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Quick Demo Credentials Box */}
        <div className="bg-sky-50 border border-sky-100 rounded-2xl p-4 text-xs text-slate-600 space-y-2">
          <div className="font-bold text-[#0E5D94] flex items-center justify-between">
            <span>Demo Master Credentials</span>
            <button
              onClick={handleQuickFill}
              className="text-[11px] text-[#E83E8C] font-bold hover:underline"
            >
              Auto-Fill
            </button>
          </div>
          <div><strong>Email:</strong> admin@prishaivf.in</div>
          <div><strong>Password:</strong> Admin@Prisha2026</div>
        </div>

        <div className="text-center pt-2">
          <Link to="/" className="text-xs text-slate-500 hover:text-[#0E5D94] transition-colors">
            ← Back to Public Website
          </Link>
        </div>
      </div>
    </div>
  );
};
