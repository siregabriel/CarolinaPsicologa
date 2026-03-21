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

export default function Home() {
  const psychologistSchema = {
    "@context": "https://schema.org",
    "@type": "Psychologist",
    "name": "Psicóloga Carolina Avila",
    "image": "https://carolinaavila.com.mx/wp-content/uploads/2024/06/Carolina-Avila-00_0004_DSC00485-819x1024.png",
    "@id": "https://carolinaavila.com.mx/",
    "url": "https://carolinaavila.com.mx/",
    "telephone": "33 2289 2040",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Entre Ríos 3113",
      "addressLocality": "Guadalajara",
      "addressRegion": "JAL",
      "postalCode": "44630",
      "addressCountry": "MX"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 20.6946,
      "longitude": -103.3764
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "09:00",
      "closes": "20:00"
    },
    "sameAs": [
      "https://www.facebook.com/psico.carolinaavila",
      "https://www.instagram.com/psico.carolinaavila"
    ]
  };

  return (
    <div className="w-full flex-grow flex flex-col">
      <SEO 
        title="Inicio" 
        description="Psicóloga Carolina Avila - Terapia clínica especializada en ansiedad, depresión y crecimiento personal en Guadalajara y online."
        keywords="psicóloga, terapia clínica, guadalajara, terapia online, ansiedad, depresión, salud mental"
        structData={psychologistSchema}
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
