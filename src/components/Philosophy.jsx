import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ChevronDown } from 'lucide-react';

const therapies = [
  {
    title: "Psicoanálisis",
    description: "Atiende el inconsciente, explorando los deseos y conflictos profundos que afectan la conducta."
  },
  {
    title: "Conductismo",
    description: "Se enfoca en las conductas observables, facilitando la modificación de comportamientos a través de técnicas específicas."
  },
  {
    title: "Humanismo",
    description: "Pone énfasis en los sentimientos y emociones, promoviendo la autorrealización y el crecimiento personal."
  },
  {
    title: "Logoterapia",
    description: "Se centra en abordar el vacío existencial, ayudando al individuo a encontrar un sentido y propósito en su vida."
  },
  {
    title: "Terapia Racional Emotiva",
    description: "Se dedica a las creencias cognitivas, cuestionando y reformulando pensamientos irracionales para fomentar un bienestar emocional."
  },
  {
    title: "Terapia Familiar Sistémica",
    description: "Analiza las normas familiares y sistemas, trabajando en las dinámicas relacionales para mejorar la funcionalidad familiar."
  },
  {
    title: "Psicoespiritualidad",
    description: "Atiende la cualidad psicológica superior del individuo, integrando su dimensión humana y espiritual para lograr un equilibrio profundo y significativo."
  }
];

export default function Philosophy() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="philosophy" className="py-24 relative overflow-hidden" style={{ backgroundColor: '#d5d7d2' }}>

      {/* Background patterns */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-left">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

          {/* COLUMNA IZQUIERDA: Video MP4 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="relative w-full self-end"
          >
            <video
              src="/videos/Sequence Tree.mp4"
              autoPlay
              muted
              loop
              playsInline
              controls={false}

              className="w-full h-auto mix-blend-multiply origin-bottom scale-[1.2] md:scale-[1.45] translate-y-12 md:translate-y-24 [clip-path:inset(4px)]"
            />
          </motion.div>

          {/* COLUMNA DERECHA: Bloque de Texto */}
          <div className="space-y-10">
            {/* Icono de cita */}


            {/* H2 alineado a la izquierda */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-4xl font-serif text-black leading-tight"
            >
              Acerca De Las Sesiones Psicoterapéuticas
            </motion.h2>

            {/* Texto alineado a la izquierda con Acordeón */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="space-y-6 text-black font-light text-lg md:text-l leading-relaxed"
            >
              <p>
                El proceso se apega a diversas corrientes y abordajes terapéuticos que permiten
                una comprensión y tratamiento integral del individuo. Además, incorpora varios abordajes específicos:
              </p>

              <div className="border-t border-black/10 mt-6">
                {therapies.map((therapy, index) => (
                  <div key={index} className="border-b border-black/10">
                    <button
                      onClick={() => toggleAccordion(index)}
                      className="w-full py-4 flex justify-between items-center text-left focus:outline-none group"
                    >
                      <span className="font-medium text-lg text-black group-hover:text-black/70 transition-colors">
                        {therapy.title}
                      </span>
                      <motion.div
                        animate={{ rotate: openIndex === index ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown className="w-5 h-5 text-black/50" />
                      </motion.div>
                    </button>

                    <AnimatePresence>
                      {openIndex === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <p className="pb-5 text-black/70 font-light text-base md:text-lg pr-8">
                            {therapy.description}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>

            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}