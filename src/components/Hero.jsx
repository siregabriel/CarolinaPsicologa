import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useHomeContent } from '../utils/homeContent';

export default function Hero() {
  const content = useHomeContent().hero;
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-slate-50 pt-32 pb-20">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-customOlive-200 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-customBrown-200 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob animation-delay-2000" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">

          {/* Text Content */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/80 backdrop-blur-md border border-customOlive-100 shadow-sm mb-8"
            >
              <Sparkles className="w-5 h-5 text-customOlive-600" />
              <span className="text-sm font-bold text-slate-700 tracking-wide uppercase">{content.badge}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-800 mb-6 tracking-tight leading-[1.1]"
            >
              {content.titleBefore} <span className="text-customOlive-600 relative inline-block">
                {content.titleHighlight}
                <svg className="absolute w-full h-3 -bottom-1 left-0 text-customBrown-300 opacity-70" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="transparent" strokeLinecap="round" />
                </svg>
              </span><br className="hidden md:block" /> {content.titleAfter}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-slate-600 max-w-xl mb-10 font-medium leading-relaxed"
            >
              {content.subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
            >
              <a
                href="#contact"
                className="inline-flex justify-center items-center gap-2 px-8 py-4 bg-rose-600 text-white rounded-full font-bold shadow-lg shadow-rose-600/30 hover:bg-rose-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                {content.ctaPrimary}
                <ArrowRight className="w-5 h-5" />
              </a>
              <Link
                to="/quiz"
                className="inline-flex justify-center items-center gap-2 px-8 py-4 bg-white text-slate-700 border-2 border-slate-200 rounded-full font-bold shadow-sm hover:border-customOlive-200 hover:bg-customOlive-50 hover:text-customOlive-700 hover:-translate-y-1 transition-all duration-300"
              >
                {content.ctaSecondary}
              </Link>
            </motion.div>
          </div>

          {/* Image Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex justify-center lg:justify-end order-1 lg:order-2 relative"
          >
            <div className="relative w-full max-w-md lg:max-w-lg mt-8 lg:mt-0">
              {/* Decorative background behind image */}
              <div className="absolute inset-0 bg-gradient-to-tr from-customOlive-200 to-customBrown-200 rounded-[3rem] md:rounded-[4rem] transform rotate-3 scale-105 opacity-50"></div>

              <img
                src={content.image}
                alt="Psicóloga Carolina Avila - Terapia Clínica"
                fetchPriority="high"
                decoding="async"
                className="relative z-10 w-full h-auto object-cover rounded-[3rem] md:rounded-[4rem] shadow-2xl border-4 border-white"
              />



            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
