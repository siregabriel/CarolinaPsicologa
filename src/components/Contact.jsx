import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Calendar, Clock, ExternalLink, Send } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-customOlive-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 transform -translate-x-1/2 -translate-y-1/2"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-slate-800 mb-4"
          >
            Da el primer paso hoy
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-600 text-lg max-w-2xl mx-auto"
          >
            Agenda tu consulta inicial directamente en mi calendario o envíame un mensaje si tienes alguna duda previa.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-start">
          
          {/* Booking / Calendly Mockup Area */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm flex flex-col h-full"
          >
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-slate-800 mb-2 flex items-center gap-2">
                <Calendar className="w-6 h-6 text-customOlive-600" />
                Agendar Cita (Calendly)
              </h3>
              <p className="text-slate-600">Selecciona el día y la hora que mejor se adapten a tu rutina para nuestra primera sesión.</p>
            </div>

            {/* Simulated Calendly UI */}
            <div className="bg-slate-50 rounded-2xl border border-slate-100 p-8 flex flex-col items-center justify-center text-center flex-grow">
               <div className="w-20 h-20 bg-customOlive-100 rounded-full flex items-center justify-center mb-6">
                 <svg className="w-10 h-10 text-customOlive-600" viewBox="0 0 24 24" fill="currentColor">
                   <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20a2 2 0 002 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10z"></path>
                 </svg>
               </div>
               <h4 className="text-xl font-bold text-slate-800 mb-2">Reserva tu espacio seguro</h4>
               <p className="text-sm text-slate-500 mb-8 max-w-sm">
                 Serás redirigido a la plataforma externa de Calendly para elegir tu horario y confirmar tu cita de manera inmediata y confidencial.
               </p>
               
               <a 
                 href="https://calendly.com/" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="w-full sm:w-auto bg-rose-600 text-white font-bold py-4 px-8 rounded-full hover:bg-rose-700 transition-colors shadow-lg shadow-rose-600/30 flex items-center justify-center gap-2 group"
               >
                 Abrir Agenda en Calendly
                 <ExternalLink className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
               </a>
            </div>
          </motion.div>

          {/* Contact Information & Form Area */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col gap-8 h-full"
          >
            {/* Info Cards */}
            <div className="bg-slate-800 rounded-3xl p-8 text-white shadow-xl shadow-slate-800/20 relative overflow-hidden">
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-slate-700 rounded-full mix-blend-screen filter blur-3xl opacity-50 transform translate-x-1/2 translate-y-1/2"></div>
              
              <h3 className="text-2xl font-bold mb-8 relative z-10">Contacto Directo</h3>
              
              <div className="space-y-6 relative z-10">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-slate-700/50 rounded-xl flex items-center justify-center flex-shrink-0 border border-slate-600">
                    <MapPin className="w-5 h-5 text-customOlive-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-200">Consultorio</h4>
                    <p className="text-slate-400 mt-1 text-sm">Entre Ríos 3113, 44630<br/>Guadalajara, Jalisco.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-slate-700/50 rounded-xl flex items-center justify-center flex-shrink-0 border border-slate-600">
                    <Phone className="w-5 h-5 text-customOlive-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-200">Teléfono y WhatsApp</h4>
                    <p className="text-slate-400 mt-1 text-sm">33 2289 2040</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-slate-700/50 rounded-xl flex items-center justify-center flex-shrink-0 border border-slate-600">
                    <Mail className="w-5 h-5 text-customOlive-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-200">Email</h4>
                    <p className="text-slate-400 mt-1 text-sm">contacto@carolinaavila.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Message Form */}
            <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm flex-grow">
               <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <Mail className="w-5 h-5 text-customOlive-600" />
                Déjame un mensaje
              </h3>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="text"
                  placeholder="Tu nombre completo"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-customOlive-600 focus:border-transparent transition-all bg-slate-50 focus:bg-white"
                />
                <input
                  type="email"
                  placeholder="Tu correo electrónico"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-customOlive-600 focus:border-transparent transition-all bg-slate-50 focus:bg-white"
                />
                <textarea
                  rows="3"
                  placeholder="Tus comentarios o dudas..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-customOlive-600 focus:border-transparent transition-all bg-slate-50 focus:bg-white resize-none"
                ></textarea>
                <button
                  type="submit"
                  className="w-full bg-slate-800 text-white font-semibold py-3.5 px-6 rounded-xl hover:bg-slate-900 transition-colors shadow-sm flex justify-center items-center gap-2"
                >
                  Enviar <Send className="w-4 h-4" />
                </button>
              </form>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}
