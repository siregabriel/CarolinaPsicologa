import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useArticles } from '../utils/storage';
import { ArrowLeft, Clock, Facebook, Twitter, Linkedin, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';

export default function Article() {
  const { id } = useParams();
  const articles = useArticles();
  const article = articles.find(a => a.id.toString() === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!article) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-8">
        <SEO 
          title="Artículo no encontrado" 
          description="El artículo que buscas no está disponible."
        />
        <h1 className="text-3xl font-bold text-slate-800 mb-4">Artículo no encontrado</h1>
        <Link to="/" className="text-customOlive-600 hover:underline font-medium cursor-pointer">Volver al inicio</Link>
      </div>
    );
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": article.title,
    "description": article.description || article.content?.substring(0, 160),
    "image": article.image || "https://carolinaavila.com.mx/Carolina%20Avila%20Psicologa.webp",
    "author": {
      "@type": "Person",
      "name": "Psic. Carolina Avila",
      "jobTitle": "Psicóloga Clínica",
      "url": "https://carolinaavila.com.mx/"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Psicóloga Carolina Avila",
      "logo": {
        "@type": "ImageObject",
        "url": "https://carolinaavila.com.mx/carolina-avila-logo.webp"
      }
    },
    "datePublished": article.publishedDate || new Date().toISOString(),
    "dateModified": article.modifiedDate || article.publishedDate || new Date().toISOString(),
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://carolinaavila.com.mx/blog/${article.id}`
    },
    "articleSection": article.category || "Salud Mental",
    "keywords": article.keywords || "psicología, salud mental, bienestar emocional",
    "inLanguage": "es-MX"
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Inicio",
        "item": "https://carolinaavila.com.mx/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": "https://carolinaavila.com.mx/#blog"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": article.title,
        "item": `https://carolinaavila.com.mx/blog/${article.id}`
      }
    ]
  };

  const combinedSchema = {
    "@context": "https://schema.org",
    "@graph": [articleSchema, breadcrumbSchema]
  };

  return (
    <article className="min-h-screen bg-white pt-32 pb-24">
      <SEO 
        title={article.title}
        description={article.description || article.content?.substring(0, 160)}
        keywords={article.keywords || "psicología, salud mental, bienestar emocional"}
        ogImage={article.image}
        ogUrl={`https://carolinaavila.com.mx/blog/${article.id}`}
        canonical={`https://carolinaavila.com.mx/blog/${article.id}`}
        article={true}
        publishedTime={article.publishedDate}
        modifiedTime={article.modifiedDate || article.publishedDate}
        author="Psic. Carolina Avila"
        structData={combinedSchema}
      />
      {/* Header */}
      <header className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-customOlive-600 font-medium transition-colors mb-8 cursor-pointer">
          <ArrowLeft className="w-4 h-4" />
          Volver al blog
        </Link>
        <div className="flex items-center gap-4 mb-8">
          <span className="px-4 py-1.5 bg-customOlive-50 text-customOlive-700 border border-customOlive-100 rounded-full text-xs font-bold uppercase tracking-wider">
            {article.category}
          </span>
          <span className="flex items-center gap-1.5 text-slate-400 text-sm font-medium">
            <Clock className="w-4 h-4" />
            {article.readTime}
          </span>
        </div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-[1.15] mb-6 tracking-tight"
        >
          {article.title}
        </motion.h1>
      </header>

      {/* Hero Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16"
      >
        <div className="relative rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-slate-900/10 mix-blend-multiply z-10"></div>
          <img src={article.image} alt={article.title} className="w-full h-[400px] md:h-[600px] object-cover" />
        </div>
      </motion.div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="prose prose-lg prose-slate prose-headings:font-bold prose-headings:text-slate-900 prose-a:text-customOlive-600 hover:prose-a:text-customOlive-700 max-w-none text-slate-700 leading-relaxed">
          {article.content ? article.content.split('\n').map((paragraph, index) => (
            paragraph.trim() !== '' && (
              <p key={index} className="mb-6 text-[1.1rem]">
                {paragraph}
              </p>
            )
          )) : <p>Cargando contenido...</p>}
        </div>

        <div className="mt-16 pt-10 border-t border-slate-100">
          <h4 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">Compartir artículo</h4>
          <div className="flex items-center gap-3">
            <button
              onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank')}
              className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-[#1877F2] hover:text-white transition-colors shadow-sm cursor-pointer" title="Compartir en Facebook"
            >
              <Facebook className="w-5 h-5" />
            </button>
            <button
              onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(article.title)}`, '_blank')}
              className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-[#1DA1F2] hover:text-white transition-colors shadow-sm cursor-pointer" title="Compartir en Twitter/X"
            >
              <Twitter className="w-5 h-5" />
            </button>
            <button
              onClick={() => window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(article.title)}`, '_blank')}
              className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-[#0A66C2] hover:text-white transition-colors shadow-sm cursor-pointer" title="Compartir en LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </button>
            <button
              onClick={() => window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(article.title + ' ' + window.location.href)}`, '_blank')}
              className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-[#25D366] hover:text-white transition-colors shadow-sm cursor-pointer" title="Compartir en WhatsApp"
            >
              <MessageCircle className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
            <img src="/Carolina Avila.webp" alt="Autora" className="w-14 h-14 rounded-full object-cover border-2 border-slate-100 shadow-sm" />
            <div>
              <p className="font-bold text-slate-900 text-lg">Psic. Carolina Avila</p>
              <p className="text-sm text-slate-500 font-medium tracking-wide">Psicóloga Clínica</p>
            </div>
          </div>
          <Link
            to="/#contact"
            className="px-8 py-4 bg-rose-600 text-white font-bold rounded-full shadow-lg shadow-rose-600/20 hover:bg-rose-700 transition cursor-pointer"
          >
            Agendar Consulta
          </Link>
        </div>
      </div>
    </article>
  );
}
