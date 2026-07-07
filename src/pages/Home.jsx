import Hero from '../components/Hero';
import Services from '../components/Services';
import Profile from '../components/Profile';
import Philosophy from '../components/Philosophy';
import Reviews from '../components/Reviews';
import LeadMagnet from '../components/LeadMagnet';
import Blog from '../components/Blog';
import FAQ from '../components/FAQ';
import Contact from '../components/Contact';
import WhatsAppButton from '../components/WhatsAppButton';
import SEO from '../components/SEO';
import { useHomeContent } from '../utils/homeContent';

export default function Home() {
  // Keep structured data in sync with admin-editable contact info
  const contactContent = useHomeContent().contact;
  const phoneE164 = '+52' + (contactContent.phone || '').replace(/\D/g, '');

  // Enhanced structured data with multiple schemas
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Psychologist",
        "@id": "https://carolinaavila.com.mx/#psychologist",
        "name": "Psic. Carolina Avila",
        "alternateName": "Carolina Avila Psicóloga",
        "description": "Psicóloga clínica especializada en trastornos de ansiedad, depresión, trastornos alimentarios y trastornos de personalidad. Sesiones presenciales y online.",
        "image": {
          "@type": "ImageObject",
          "url": "https://carolinaavila.com.mx/Carolina%20Avila%20Psicologa.webp",
          "width": 1200,
          "height": 630
        },
        "url": "https://carolinaavila.com.mx/",
        "telephone": phoneE164,
        "email": contactContent.email,
        "priceRange": "$$",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Entre Ríos 3113",
          "addressLocality": "Guadalajara",
          "addressRegion": "Jalisco",
          "postalCode": "44630",
          "addressCountry": "MX"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 20.6946,
          "longitude": -103.3764
        },
        "areaServed": [
          {
            "@type": "City",
            "name": "Guadalajara"
          },
          {
            "@type": "State",
            "name": "Jalisco"
          },
          {
            "@type": "Country",
            "name": "México"
          }
        ],
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Servicios de Psicología Clínica",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Psicoterapia para Adultos",
                "description": "Terapia psicológica individual para adultos enfocada en crecimiento personal y bienestar emocional"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Sesiones Online",
                "description": "Terapia psicológica a distancia con la misma calidad profesional"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Trastornos de Ansiedad",
                "description": "Tratamiento especializado para ansiedad generalizada, ataques de pánico y fobias"
              }
            }
          ]
        },
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "opens": "09:00",
            "closes": "20:00"
          }
        ],
        "sameAs": [
          "https://www.facebook.com/psico.carolinaavila",
          "https://www.instagram.com/psico.carolinaavila"
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://carolinaavila.com.mx/#website",
        "url": "https://carolinaavila.com.mx/",
        "name": "Psicóloga Carolina Avila",
        "description": "Sitio oficial de la Psicóloga Carolina Avila - Terapia clínica en Guadalajara",
        "publisher": {
          "@id": "https://carolinaavila.com.mx/#psychologist"
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://carolinaavila.com.mx/?s={search_term_string}",
          "query-input": "required name=search_term_string"
        },
        "inLanguage": "es-MX"
      },
      {
        "@type": "WebPage",
        "@id": "https://carolinaavila.com.mx/#webpage",
        "url": "https://carolinaavila.com.mx/",
        "name": "Psicóloga Carolina Avila | Terapia Clínica en Guadalajara",
        "isPartOf": {
          "@id": "https://carolinaavila.com.mx/#website"
        },
        "about": {
          "@id": "https://carolinaavila.com.mx/#psychologist"
        },
        "description": "Psicóloga clínica especializada en ansiedad, depresión y trastornos alimentarios. Sesiones presenciales en Guadalajara y online.",
        "inLanguage": "es-MX"
      },
      {
        "@type": "LocalBusiness",
        "@id": "https://carolinaavila.com.mx/#localbusiness",
        "name": "Consultorio de Psicología Carolina Avila",
        "image": "https://carolinaavila.com.mx/Carolina%20Avila%20Psicologa.webp",
        "telephone": phoneE164,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Entre Ríos 3113",
          "addressLocality": "Guadalajara",
          "addressRegion": "Jalisco",
          "postalCode": "44630",
          "addressCountry": "MX"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 20.6946,
          "longitude": -103.3764
        },
        "url": "https://carolinaavila.com.mx/",
        "priceRange": "$$",
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "opens": "09:00",
            "closes": "20:00"
          }
        ]
      }
    ]
  };

  return (
    <div className="w-full flex-grow flex flex-col">
      <SEO 
        title="Inicio" 
        description="Psicóloga clínica especializada en ansiedad, depresión y trastornos alimentarios. Sesiones presenciales en Guadalajara y online. Agenda tu consulta inicial."
        keywords="psicóloga guadalajara, terapia clínica, psicóloga online, ansiedad, depresión, salud mental, terapia adultos, psicóloga jalisco, carolina avila"
        canonical="https://carolinaavila.com.mx/"
        structData={structuredData}
      />
      <Hero />
      <Services />
      <LeadMagnet />
      <Profile />
      <Philosophy />
      <Reviews />
      <Blog />
      <FAQ />
      <Contact />
      <WhatsAppButton />
    </div>
  );
}
