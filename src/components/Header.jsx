import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, BrainCircuit } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHome = location.pathname === '/';

  const navLinks = [
    { name: 'Servicios', href: isHome ? '#services' : '/#services' },
    { name: 'Filosofía', href: isHome ? '#philosophy' : '/#philosophy' },
    { name: 'Perfil', href: isHome ? '#profile' : '/#profile' },
    { name: 'Contacto', href: isHome ? '#contact' : '/#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="p-2 bg-customOlive-50 rounded-lg group-hover:bg-customOlive-100 transition-colors">
              <BrainCircuit className="w-6 h-6 text-customOlive-600" />
            </div>
            <span className="font-serif text-xl font-medium text-slate-800 tracking-wide">
              Mtra. Carolina Avila
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-slate-600 hover:text-customOlive-600 text-sm font-medium transition-colors"
              >
                {link.name}
              </a>
            ))}
            <Link
              to="/quiz"
              className="bg-rose-600 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-rose-700 transition-colors shadow-sm hover:shadow-md transform hover:-translate-y-0.5 duration-200"
            >
              Realizar Evaluación
            </Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-slate-600 hover:text-customOlive-600 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-slate-100 overflow-hidden"
          >
            <div className="px-4 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-slate-600 hover:text-customOlive-600 text-base font-medium py-2 border-b border-slate-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <Link
                to="/quiz"
                onClick={() => setMobileMenuOpen(false)}
                className="bg-rose-600 text-white text-center px-5 py-3 rounded-xl font-medium mt-2 shadow-sm"
              >
                Realizar Evaluación
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
