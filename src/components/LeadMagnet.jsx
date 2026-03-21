import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Mail, BookOpen, CheckCircle } from 'lucide-react';

export default function LeadMagnet() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail('');
    }
  };

  return (
    <section className="py-24 relative overflow-hidden bg-rose-700 text-white" id="recursos">
      {/* Background blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-customOlive-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 transform -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-customBrown-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 transform translate-x-1/2 translate-y-1/2"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 md:p-14 shadow-2xl overflow-hidden flex flex-col md:flex-row items-center gap-12">

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1 text-center md:text-left"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-sm font-semibold mb-6 border border-white/10 shadow-sm">
              <BookOpen className="w-4 h-4" />
              Recurso Gratuito
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight drop-shadow-sm">
              Guía práctica: 10 ejercicios rápidos para calmar la ansiedad
            </h2>
            <p className="text-customOlive-100 text-lg md:text-xl mb-10 leading-relaxed max-w-2xl mx-auto md:mx-0">
              Descarga sin costo este manual en PDF con técnicas comprobadas para regresar a tu centro emocional en momentos de crisis.
            </p>

            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -10 }}
                  onSubmit={handleSubmit}
                  className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto md:mx-0"
                >
                  <div className="relative flex-grow">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="Tu correo electrónico..."
                      className="w-full pl-12 pr-4 py-4 rounded-xl text-slate-800 bg-white placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-customOlive-400/50 transition-all font-medium border-0"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-slate-900 text-white font-bold py-4 px-8 rounded-xl flex items-center justify-center gap-2 hover:bg-slate-800 hover:-translate-y-1 transition-all duration-300 whitespace-nowrap shadow-lg shadow-slate-900/20"
                  >
                    Descargar Ahora <Download className="w-5 h-5" />
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white/20 backdrop-blur-md rounded-2xl p-6 border border-white/30 flex items-center gap-4 max-w-xl mx-auto md:mx-0 shadow-inner"
                >
                  <div className="w-12 h-12 bg-green-400 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg shadow-green-400/20">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-bold text-lg text-white">¡Guía enviada con éxito!</h4>
                    <p className="text-white/90 text-sm">Revisa tu bandeja de entrada o la carpeta de spam. En unos minutos recibirás el PDF.</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <p className="text-xs text-customOlive-200 mt-4 font-medium opacity-80">
              * Prometemos no enviarte spam. Puedes desuscribirte cuando quieras.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex-shrink-0 relative w-64 md:w-80 h-[350px] md:h-[450px]"
          >
            {/* 3D Mockup of Book or Report */}
            <div className="absolute inset-0 bg-white rounded-r-3xl rounded-l-md shadow-2xl transform rotate-3 transition-transform hover:rotate-6 duration-500 overflow-hidden border-l-[16px] border-l-slate-200 flex flex-col justify-between">
              <div className="p-8 pb-0">
                <h3 className="text-2xl font-black text-slate-800 leading-none">10 Ejercicios para calmar la <span className="text-customOlive-600 block mt-1">Ansiedad</span></h3>
                <div className="w-16 h-1.5 bg-rose-500 mt-4 rounded-full"></div>
              </div>
              <div className="p-8 pt-0 text-slate-400 font-bold text-sm tracking-widest uppercase">
                Psic. Carolina Avila
              </div>

              {/* Graphic element */}
              <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-gradient-to-tr from-customOlive-200 to-customBrown-100 rounded-full blur-2xl opacity-60"></div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
