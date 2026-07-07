import { motion } from 'framer-motion';
import { User, Users, Brain } from 'lucide-react';
import { useHomeContent } from '../utils/homeContent';

const icons = [User, Users, Brain];
const colors = [
  'bg-customOlive-50 text-customOlive-700 border-customOlive-100',
  'bg-customBrown-50 text-customBrown-700 border-customBrown-100',
  'bg-customBrown-50 text-customBrown-700 border-customBrown-100',
];

export default function Services() {
  const content = useHomeContent().services;
  const services = content.items.map((item, i) => ({
    ...item,
    icon: icons[i % icons.length],
    color: colors[i % colors.length],
  }));
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
            {content.heading}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-600 font-light"
          >
            {content.subheading}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            const lines = (service.description || '').split('\n').filter(Boolean);
            return (
              <motion.div
                key={`${service.title}-${index}`}
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
                {lines.length > 1 ? (
                  <ul className="list-disc pl-5 space-y-1 text-slate-600 font-light leading-relaxed text-sm">
                    {lines.map((line, i) => <li key={i}>{line}</li>)}
                  </ul>
                ) : (
                  <p className="text-slate-600 font-light leading-relaxed text-sm">
                    {service.description}
                  </p>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  );
}
