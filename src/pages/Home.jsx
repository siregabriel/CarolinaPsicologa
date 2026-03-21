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

export default function Home() {
  return (
    <div className="w-full flex-grow flex flex-col">
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
