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
  structData
}) {
  const siteName = "Psicóloga Carolina Avila";
  const defaultDescription = "Psicología clínica especializada en Guadalajara y sesiones online. Acompañamiento profesional para ansiedad, depresión y crecimiento personal.";
  const fullTitle = title ? `${title} | ${siteName}` : `${siteName} | Terapia Clínica`;
  
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      {keywords && <meta name="keywords" content={keywords} />}
      {canonical && <link rel="canonical" href={canonical} />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={ogUrl || "https://carolinaavila.com.mx/"} />
      <meta property="og:title" content={ogTitle || fullTitle} />
      <meta property="og:description" content={ogDescription || description || defaultDescription} />
      <meta property="og:image" content={ogImage || "/og-image.jpg"} />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={ogUrl || "https://carolinaavila.com.mx/"} />
      <meta name="twitter:title" content={ogTitle || fullTitle} />
      <meta name="twitter:description" content={ogDescription || description || defaultDescription} />
      <meta name="twitter:image" content={ogImage || "/og-image.jpg"} />

      {/* Structured Data */}
      {structData && (
        <script type="application/ld+json">
          {JSON.stringify(structData)}
        </script>
      )}
    </Helmet>
  );
}
