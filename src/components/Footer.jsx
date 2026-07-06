import { BrainCircuit, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-slate-900 w-full mt-auto py-16 border-t border-slate-800" style={{ backgroundColor: '#272727' }} role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

          <div className="col-span-1 md:col-span-2">
            <img 
              src="/carolina-avila-logo.webp" 
              alt="Logotipo Psicóloga Carolina Avila" 
              width="172" 
              height="48" 
              className="w-43 h-12" 
            />
            <span><br></br></span>
            <p className="text-slate-400 max-w-sm font-light leading-relaxed">
              Profesional en psicología clínica dedicada a acompañarte en tu proceso
              de sanación, autodescubrimiento y bienestar emocional.
            </p>
          </div>

          <nav aria-label="Servicios">
            <h4 className="text-white font-medium mb-6 tracking-wide">Servicios</h4>
            <ul className="space-y-4">
              <li><a href="/#services" className="text-slate-400 hover:text-customOlive-400 transition-colors text-sm">Terapia Individual</a></li>
              <li><a href="/#services" className="text-slate-400 hover:text-customOlive-400 transition-colors text-sm">Terapia de Pareja</a></li>
              <li><a href="/#services" className="text-slate-400 hover:text-customOlive-400 transition-colors text-sm">Asesoría Psicológica</a></li>
            </ul>
          </nav>

          <address className="not-italic">
            <h4 className="text-white font-medium mb-6 tracking-wide">Contacto</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-customOlive-400" aria-hidden="true" />
                <a href="tel:+523322892040" className="text-slate-400 hover:text-customOlive-400 text-sm transition-colors">33 2289 2040</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-customOlive-400" aria-hidden="true" />
                <a href="mailto:contacto@carolinaavila.com" className="text-slate-400 hover:text-customOlive-400 text-sm transition-colors">contacto@carolinaavila.com</a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-customOlive-400 shrink-0 mt-0.5" aria-hidden="true" />
                <span className="text-slate-400 text-sm leading-relaxed">Entre Ríos 3113, 44630<br />Guadalajara, Jalisco.</span>
              </li>
            </ul>
          </address>

        </div>

        <div className="border-t border-slate-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} Psicóloga Carolina Avila. Todos los derechos reservados.
              <img src="/logo-grm-small.png" alt="Logotipo Gabriel Rosales" width="80" height="80" className="w-8 h-8 padding-top:20px;" 
          />
          </p>
          <div className="flex gap-6">
            <Link to="/quiz" className="text-customOlive-400 hover:text-customOlive-300 text-sm font-medium transition-colors">
              Realizar Evaluación Inicial
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
