import { createClient } from '@supabase/supabase-js';

// Configura estas variables en un archivo .env (local) y en Vercel (producción):
//   VITE_SUPABASE_URL=https://xxxx.supabase.co
//   VITE_SUPABASE_ANON_KEY=eyJ...
const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = url && anonKey ? createClient(url, anonKey) : null;

// Si no hay llaves configuradas, el sitio funciona en modo local (localStorage).
export const isSupabaseEnabled = Boolean(supabase);
