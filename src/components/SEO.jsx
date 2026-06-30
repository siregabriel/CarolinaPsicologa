import { Helmet } from 'react-helmet-async';

export default function SEO({ 
  title, 
  description, 
  keywords, 
  ogTitle, 
  ogDescription, 
  ogImage, 
  ogUrl, 
  canonical,
  structData,
  article = false,
  publishedTime,
  modifiedTime,
  author
}) {
  const siteName = "Psicóloga Carolina Avila";
  const defaultDescription = "Psicóloga clínica especializada en ansiedad, depresión y trastornos alimentarios. Sesiones presenciales en Guadalajara y online. Acompañamiento profesional para tu bienestar emocional.";
  const fullTitle = title ? `${title} | ${siteName}` : `${siteName} | Terapia Clínica en Guadalajara`;
  const defaultImage = "https://carolinaavila.com.mx/Carolina%20Avila%20Psicologa.webp";
  
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description || defaultDescription} />
      {keywords && <meta name="keywords" content={keywords} />}
      {canonical && <link rel="canonical" href={canonical} />}
      {author && <meta name="author" content={author} />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={article ? "article" : "website"} />
      <meta property="og:url" content={ogUrl || canonical || "https://carolinaavila.com.mx/"} />
      <meta property="og:title" content={ogTitle || fullTitle} />
      <meta property="og:description" content={ogDescription || description || defaultDescription} />
      <meta property="og:image" content={ogImage || defaultImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={ogTitle || fullTitle} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="es_MX" />
      
      {/* Article specific meta tags */}
      {article && publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {article && modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      {article && author && <meta property="article:author" content={author} />}
      {article && <meta property="article:section" content="Salud Mental" />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={ogUrl || canonical || "https://carolinaavila.com.mx/"} />
      <meta name="twitter:title" content={ogTitle || fullTitle} />
      <meta name="twitter:description" content={ogDescription || description || defaultDescription} />
      <meta name="twitter:image" content={ogImage || defaultImage} />
      <meta name="twitter:image:alt" content={ogTitle || fullTitle} />

      {/* Additional SEO meta tags */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      
      {/* Structured Data */}
      {structData && (
        <script type="application/ld+json">
          {JSON.stringify(structData)}
        </script>
      )}
    </Helmet>
  );
}
