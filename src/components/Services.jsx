import { motion } from 'framer-motion';
import { User, Users, Brain, HeartHandshake } from 'lucide-react';

const services = [
  {
    icon: User,
    title: 'Psicoterapia Para Adultos',
    description: 'La psicoterapia para adultos es un proceso transformador que brinda apoyo y herramientas para enfrentar desafíos emocionales y mentales, promoviendo el bienestar y el crecimiento personal a través de un enfoque comprensivo y personalizado.',
    color: 'bg-customOlive-50 text-customOlive-700 border-customOlive-100',
  },
  {
    icon: Users,
    title: 'Sesiones Presenciales y Online',
    description: 'Nuestras sesiones, tanto presenciales como online, ofrecen flexibilidad y accesibilidad, permitiendo a los individuos recibir apoyo terapéutico de alta calidad desde cualquier lugar, adaptándose a sus necesidades y horarios.',
    color: 'bg-customBrown-50 text-customBrown-700 border-customBrown-100',
  },
  {
    icon: Brain,
    title: 'Especialización En:',
    description: (
      <ul className="list-disc pl-5 space-y-1">
        <li>Trastornos de Ansiedad</li>
        <li>Trastornos del Estado de Ánimo</li>
        <li>Trastornos de la Conducta Alimentaria</li>
        <li>Trastornos de la Personalidad</li>
        <li>Trastornos de la Conducta Alimentaria</li>
      </ul>
    ),
    color: 'bg-customBrown-50 text-customBrown-700 border-customBrown-100',
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-serif text-slate-900 mb-6"
          >
            Servicios Ofrecidos
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-600 font-light"
          >
            “Cualquier Desafío Que La Vida Nos Presenta Es Una Oportunidad Para Conocernos”.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-xl hover:shadow-customOlive-900/5 hover:-translate-y-2 transition-all duration-300"
              >
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-6 ${service.color} border transition-transform group-hover:scale-110 duration-300`}>
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-medium text-slate-900 mb-3">{service.title}</h3>
                <p className="text-slate-600 font-light leading-relaxed text-sm">
                  {service.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  );
}
