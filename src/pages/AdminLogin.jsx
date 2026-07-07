import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, LogIn, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { supabase, isSupabaseEnabled } from '../utils/supabaseClient';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (isSupabaseEnabled) {
      // Real authentication via Supabase Auth
      setLoading(true);
      const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
      setLoading(false);
      if (authError) {
        setError('Credenciales incorrectas. Por favor intenta de nuevo.');
      } else {
        navigate('/admin/dashboard');
      }
    } else {
      // Local/demo mode fallback (no database configured)
      if (password === 'carolina2024') {
        localStorage.setItem('admin_auth', 'true');
        navigate('/admin/dashboard');
      } else {
        setError('Contraseña incorrecta. Por favor intenta de nuevo.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>Acceso Admin</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="absolute top-8 left-8">
        <Link to="/" className="flex items-center gap-2 text-slate-500 hover:text-customOlive-600 font-medium transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Volver al sitio
        </Link>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-white rounded-3xl p-10 shadow-xl border border-slate-100"
      >
        <div className="text-center mb-10">
          <div className="mx-auto w-16 h-16 bg-customOlive-50 rounded-full flex items-center justify-center mb-6">
            <Lock className="w-8 h-8 text-customOlive-600" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Acceso a Dashboard</h2>
          <p className="text-slate-500 text-sm">Panel de administración exclusivo de Psic. Carolina Avila.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {isSupabaseEnabled && (
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Correo electrónico</label>
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(''); }}
                placeholder="admin@carolinaavila.com"
                required
                className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-customOlive-600 bg-slate-50 focus:bg-white transition-all text-slate-800"
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">{isSupabaseEnabled ? 'Contraseña' : 'Contraseña Maestra'}</label>
            <input
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(''); }}
              placeholder="••••••••"
              required
              className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-customOlive-600 bg-slate-50 focus:bg-white transition-all text-slate-800"
            />
            {error && <p className="text-rose-500 text-xs font-semibold mt-2">{error}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center items-center gap-2 py-4 px-4 border border-transparent rounded-xl shadow-lg shadow-customOlive-600/20 text-sm font-bold text-white bg-customOlive-600 hover:bg-customOlive-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-customOlive-500 transition-colors cursor-pointer disabled:opacity-60"
          >
            {loading ? 'Verificando…' : 'Iniciar Sesión'} <LogIn className="w-4 h-4" />
          </button>
        </form>
      </motion.div>
    </div>
  );
}
