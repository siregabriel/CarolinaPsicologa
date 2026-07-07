import { motion } from 'framer-motion';
import { Star, CheckCircle2, ExternalLink } from 'lucide-react';
import { useHomeContent } from '../utils/homeContent';

const avatarColors = ['bg-customBrown-600', 'bg-blue-600', 'bg-rose-600', 'bg-customOlive-600'];

export default function Reviews() {
  const content = useHomeContent().reviews;
  const searchUrl = content.googleUrl;
  const reviews = content.items.map((item, i) => ({
    ...item,
    id: i + 1,
    initial: (item.name || '?').charAt(0).toUpperCase(),
    color: avatarColors[i % avatarColors.length],
    link: searchUrl,
  }));
  return (
    <section className="py-24 bg-slate-50 border-y border-slate-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Google Reviews Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4"
          >
            {/* Fake Google Logo Icon (Using colored G text) */}
            <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center font-bold text-2xl border border-slate-200">
              <span className="text-blue-500">G</span>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-slate-800 flex items-center gap-2">
                {content.heading}
                <CheckCircle2 className="w-5 h-5 text-blue-500" />
              </h2>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-lg font-bold text-slate-700">{content.rating}</span>
                <div className="flex">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-sm text-slate-500 ml-1">{content.subtitle}</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <a 
              href={searchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 bg-white border border-slate-300 text-slate-700 font-medium rounded-full shadow-sm hover:bg-slate-50 transition-colors inline-block"
            >
              Ver en Google
            </a>
          </motion.div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col h-full hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-medium text-lg ${review.color}`}>
                  {review.initial}
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800 text-sm">{review.name}</h4>
                  <p className="text-xs text-slate-400">{review.date}</p>
                </div>
              </div>
              <div className="flex mb-3">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-slate-600 text-sm leading-relaxed flex-grow">
                "{review.text}"
              </p>
              
              <div className="flex justify-between items-center mt-5 pt-4 border-t border-slate-50">
                <a 
                  href={review.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-xs text-blue-600 hover:text-blue-700 flex items-center gap-1 font-medium transition-colors"
                >
                  Ver en Google <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
