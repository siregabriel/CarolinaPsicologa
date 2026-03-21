import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function WhatsAppButton() {
  const phoneNumber = '+5213312345678'; // Placeholder phone number
  const message = 'Hola Mtra. Carolina, me gustaría obtener más información sobre sus servicios de terapia.';
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: 'spring', stiffness: 200, damping: 20 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-green-500 rounded-full shadow-lg shadow-green-500/30 hover:bg-green-600 transition-colors group cursor-pointer"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle className="w-8 h-8 text-white stroke-[1.5]" />
      <span className="absolute right-full mr-4 bg-white text-slate-800 text-sm font-semibold py-2 px-4 rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none hidden md:block border border-slate-100">
        ¿Te ayudo a agendar?
      </span>
      {/* Pulse effect */}
      <span className="absolute w-full h-full bg-green-500 rounded-full animate-ping opacity-20 hidden md:block"></span>
    </motion.a>
  );
}
