import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 pt-32 pb-20">
      <Helmet>
        <title>Página no encontrada | Psicóloga Carolina Avila</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <p className="text-7xl font-bold text-customOlive-600 mb-4">404</p>
      <h1 className="text-2xl font-bold text-slate-800 mb-3">Página no encontrada</h1>
      <p className="text-slate-600 mb-8 max-w-md">
        La página que buscas no existe o fue movida. Te invitamos a volver al inicio.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-full font-medium hover:bg-slate-800 transition-colors"
      >
        <Home className="w-5 h-5" />
        Volver al inicio
      </Link>
    </div>
  );
}
