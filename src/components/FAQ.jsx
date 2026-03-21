import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: "¿Cuánto dura una sesión de terapia?",
    answer: "Cada sesión tiene una duración aproximada de 50 a 60 minutos. Las primeras sesiones (de evaluación) pueden extenderse unos minutos adicionales para conocer a profundidad tu motivo de consulta."
  },
  {
    question: "¿Qué debo esperar de mi primera cita?",
    answer: "En nuestra primera cita nos enfocaremos en conocernos. Platicaremos sobre el motivo que te trajo a terapia, tu historia general y los objetivos que te gustaría alcanzar. Es un espacio completamente libre de prejuicios donde marcaremos la ruta a seguir."
  },
  {
    question: "¿Brindas terapia en línea o presencial?",
    answer: "Ofrezco ambas modalidades para adaptarme a tus necesidades. Las sesiones presenciales se llevan a cabo en mi consultorio en Guadalajara, Jalisco. Las sesiones en línea se realizan a través de una plataforma segura y privada desde cualquier parte."
  },
  {
    question: "¿Cómo funciona la confidencialidad?",
    answer: "Tu privacidad es mi máxima prioridad. Todo lo que hablamos en sesión está protegido por estricto secreto profesional y ética clínica. La información solo se comparte bajo circunstancias extremas donde la vida del paciente o terceros esté en peligro inminente."
  },
  {
    question: "¿Con qué frecuencia debo asistir a terapia?",
    answer: "Usualmente, recomiendo iniciar con sesiones semanales para establecer un ritmo y notar cambios iniciales. Conforme vayas avanzando en tus objetivos, las sesiones pueden espaciarse a quincenales y posteriormente mensuales hasta darte de alta."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleOpen = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-white" id="faq">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-slate-800 mb-4"
          >
            Preguntas Frecuentes
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-600 text-lg"
          >
            Resuelvo tus dudas más comunes antes de iniciar tu proceso.
          </motion.p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-slate-50/50"
            >
              <button
                onClick={() => toggleOpen(index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
              >
                <span className="font-semibold text-slate-800 pr-8">{faq.question}</span>
                <ChevronDown 
                  className={`w-5 h-5 text-customOlive-600 transition-transform duration-300 flex-shrink-0 ${openIndex === index ? 'rotate-180' : ''}`} 
                />
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-5 text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
