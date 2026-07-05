import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { getHomeContent } from '../utils/homeContent';

export default function Philosophy() {
  const [openIndex, setOpenIndex] = useState(null);
  const content = getHomeContent().philosophy;
  const therapies = content.therapies;

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="philosophy" className="py-24 relative overflow-hidden" style={{ backgroundColor: '#d5d7d2' }} aria-labelledby="philosophy-heading">

      {/* Background patterns */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" aria-hidden="true">
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
              aria-label="Video decorativo de árbol"
              className="w-full h-auto mix-blend-multiply origin-bottom scale-[1.2] md:scale-[1.45] translate-y-12 md:translate-y-24 [clip-path:inset(4px)]"
            />
          </motion.div>

          {/* COLUMNA DERECHA: Bloque de Texto */}
          <div className="space-y-10">

            {/* H2 alineado a la izquierda */}
            <motion.h2
              id="philosophy-heading"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-4xl font-serif text-black leading-tight"
            >
              {content.heading}
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
                {content.intro}
              </p>

              <div className="border-t border-black/10 mt-6">
                {therapies.map((therapy, index) => (
                  <div key={index} className="border-b border-black/10">
                    <button
                      onClick={() => toggleAccordion(index)}
                      className="w-full py-4 flex justify-between items-center text-left focus:outline-none group"
                      aria-expanded={openIndex === index}
                      aria-controls={`therapy-${index}`}
                    >
                      <span className="font-medium text-lg text-black group-hover:text-black/70 transition-colors">
                        {therapy.title}
                      </span>
                      <motion.div
                        animate={{ rotate: openIndex === index ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        aria-hidden="true"
                      >
                        <ChevronDown className="w-5 h-5 text-black/50" />
                      </motion.div>
                    </button>

                    <AnimatePresence>
                      {openIndex === index && (
                        <motion.div
                          id={`therapy-${index}`}
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