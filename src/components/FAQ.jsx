import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { getHomeContent } from '../utils/homeContent';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  const content = getHomeContent().faq;
  const faqs = content.items;

  const toggleOpen = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // FAQ Schema for SEO
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <section className="py-24 bg-white" id="faq" aria-labelledby="faq-heading">
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <header className="text-center mb-16">
          <motion.h2 
            id="faq-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-slate-800 mb-4"
          >
            {content.heading}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-600 text-lg"
          >
            {content.subtitle}
          </motion.p>
        </header>

        <div className="space-y-4" role="list">
          {faqs.map((faq, index) => (
            <motion.article
              key={index}
              role="listitem"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-slate-50/50"
              itemScope
              itemProp="mainEntity"
              itemType="https://schema.org/Question"
            >
              <button
                onClick={() => toggleOpen(index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <span className="font-semibold text-slate-800 pr-8" itemProp="name">{faq.question}</span>
                <ChevronDown 
                  className={`w-5 h-5 text-customOlive-600 transition-transform duration-300 flex-shrink-0 ${openIndex === index ? 'rotate-180' : ''}`}
                  aria-hidden="true"
                />
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    id={`faq-answer-${index}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    itemScope
                    itemProp="acceptedAnswer"
                    itemType="https://schema.org/Answer"
                  >
                    <div className="px-6 pb-5 text-slate-600 leading-relaxed border-t border-slate-100 pt-4" itemProp="text">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.article>
          ))}
        </div>

      </div>
    </section>
  );
}
