import { motion } from 'framer-motion';
import { Award, GraduationCap, Clock, CheckCircle2 } from 'lucide-react';
import { useHomeContent } from '../utils/homeContent';

export default function Profile() {
  const content = useHomeContent().profile;
  return (
    <section id="profile" className="py-24 bg-slate-50 overflow-hidden" aria-labelledby="profile-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute inset-0 bg-customOlive-200 translate-x-4 translate-y-4 rounded-3xl" aria-hidden="true" />
            <img
              src={content.image}
              alt="Psicóloga Carolina Avila en su consultorio profesional de Guadalajara"
              width="600"
              height="600"
              loading="lazy"
              className="relative z-10 w-full h-[600px] object-cover rounded-3xl shadow-xl grayscale-[20%]"
            />

            {/* Floating Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="absolute -bottom-8 -right-8 z-20 bg-white p-6 rounded-2xl shadow-xl border border-slate-100 hidden sm:block"
              aria-label="Años de experiencia"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-customOlive-50 rounded-full flex items-center justify-center">
                  <Clock className="w-6 h-6 text-customOlive-600" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900">{content.experienceYears}</p>
                  <p className="text-sm text-slate-500 font-medium">{content.experienceLabel}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Text Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 id="profile-heading" className="text-3xl md:text-5xl font-serif text-slate-900 mb-6">
              {content.heading}
            </h2>
            <p className="text-lg text-slate-600 font-light mb-8 leading-relaxed">
              {content.intro}
            </p>

            <div className="space-y-6 mb-10">
              <div className="flex gap-4">
                <div className="shrink-0 mt-1">
                  <GraduationCap className="w-6 h-6 text-customOlive-600" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-slate-900">{content.educationTitle}</h3>
                  <p className="text-slate-600 font-light">{content.educationText}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="shrink-0 mt-1">
                  <Award className="w-6 h-6 text-customOlive-600" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-slate-900">{content.specialtiesTitle}</h3>
                  <ul className="space-y-2 mt-2" role="list">
                    {content.specialties.map(item => (
                      <li key={item} className="flex items-center gap-2 text-slate-600 font-light">
                        <CheckCircle2 className="w-4 h-4 text-customBrown-500" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <a
              href="#contact"
              className="inline-flex justify-center items-center px-8 py-4 bg-slate-900 text-white rounded-full font-medium hover:bg-slate-800 transition-colors"
            >
              {content.ctaText}
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
