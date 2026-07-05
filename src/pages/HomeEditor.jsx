import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Plus, Trash2, Save, RotateCcw, CheckCircle } from 'lucide-react';
import { getHomeContent, saveHomeContent, resetHomeContent } from '../utils/homeContent';
import ImageUpload from '../components/admin/ImageUpload';

/* ---------- Small form helpers ---------- */

function Field({ label, value, onChange, textarea = false, rows = 3, hint }) {
  const cls = 'w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-customOlive-600 bg-slate-50 text-sm';
  return (
    <div>
      <label className="block text-sm font-semibold text-slate-700 mb-2">{label}</label>
      {textarea ? (
        <textarea value={value} onChange={e => onChange(e.target.value)} rows={rows} className={`${cls} resize-y`} />
      ) : (
        <input type="text" value={value} onChange={e => onChange(e.target.value)} className={cls} />
      )}
      {hint && <p className="text-xs text-slate-400 mt-1">{hint}</p>}
    </div>
  );
}

function ListItemCard({ children, onRemove }) {
  return (
    <div className="relative border border-slate-200 rounded-2xl p-4 bg-slate-50/50 space-y-3">
      <button
        type="button"
        onClick={onRemove}
        title="Eliminar elemento"
        className="absolute top-3 right-3 p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
      >
        <Trash2 className="w-4 h-4" />
      </button>
      {children}
    </div>
  );
}

function AddButton({ onClick, label }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-2 text-sm font-semibold text-customOlive-700 hover:bg-customOlive-50 px-4 py-2 rounded-xl transition-colors cursor-pointer border border-dashed border-customOlive-300 w-full justify-center"
    >
      <Plus className="w-4 h-4" /> {label}
    </button>
  );
}

function Section({ title, isOpen, onToggle, children }) {
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
      <button
        type="button"
        onClick={onToggle}
        className="w-full px-8 py-5 flex justify-between items-center text-left cursor-pointer hover:bg-slate-50 transition-colors"
        aria-expanded={isOpen}
      >
        <span className="text-lg font-bold text-slate-800">{title}</span>
        <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-8 pb-8 pt-2 space-y-5 border-t border-slate-100">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---------- Main editor ---------- */

export default function HomeEditor() {
  const [content, setContent] = useState(() => getHomeContent());
  const [openSection, setOpenSection] = useState('hero');
  const [successMsg, setSuccessMsg] = useState('');

  const toggle = (key) => setOpenSection(openSection === key ? null : key);

  // Immutable update helpers
  const set = (section, field, value) =>
    setContent(prev => ({ ...prev, [section]: { ...prev[section], [field]: value } }));

  const setListItem = (section, listField, index, field, value) =>
    setContent(prev => {
      const list = prev[section][listField].map((item, i) =>
        i === index ? (field === null ? value : { ...item, [field]: value }) : item
      );
      return { ...prev, [section]: { ...prev[section], [listField]: list } };
    });

  const addListItem = (section, listField, empty) =>
    setContent(prev => ({
      ...prev,
      [section]: { ...prev[section], [listField]: [...prev[section][listField], empty] },
    }));

  const removeListItem = (section, listField, index) =>
    setContent(prev => ({
      ...prev,
      [section]: { ...prev[section], [listField]: prev[section][listField].filter((_, i) => i !== index) },
    }));

  const handleSave = () => {
    saveHomeContent(content);
    setSuccessMsg('¡Cambios de la página de inicio guardados con éxito!');
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const handleReset = () => {
    if (window.confirm('¿Restaurar todo el contenido de la página de inicio a los valores originales? Esta acción no se puede deshacer.')) {
      setContent(resetHomeContent());
      setSuccessMsg('Contenido restaurado a los valores originales.');
      setTimeout(() => setSuccessMsg(''), 3000);
    }
  };

  const { hero, services, leadMagnet, profile, philosophy, reviews, faq, contact } = content;

  return (
    <div>
      {successMsg && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8 p-4 bg-green-100 text-green-800 rounded-xl flex items-center gap-2 font-medium">
          <CheckCircle className="w-5 h-5 text-green-600" />
          {successMsg}
        </motion.div>
      )}

      <div className="space-y-4">
        {/* HERO */}
        <Section title="Hero (Portada)" isOpen={openSection === 'hero'} onToggle={() => toggle('hero')}>
          <Field label="Texto del Badge Superior" value={hero.badge} onChange={v => set('hero', 'badge', v)} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Field label="Título (inicio)" value={hero.titleBefore} onChange={v => set('hero', 'titleBefore', v)} />
            <Field label="Palabra destacada" value={hero.titleHighlight} onChange={v => set('hero', 'titleHighlight', v)} hint="Se muestra en color con subrayado" />
            <Field label="Título (final)" value={hero.titleAfter} onChange={v => set('hero', 'titleAfter', v)} />
          </div>
          <Field label="Subtítulo" value={hero.subtitle} onChange={v => set('hero', 'subtitle', v)} textarea />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Botón principal" value={hero.ctaPrimary} onChange={v => set('hero', 'ctaPrimary', v)} />
            <Field label="Botón secundario" value={hero.ctaSecondary} onChange={v => set('hero', 'ctaSecondary', v)} />
          </div>
          <ImageUpload label="Imagen principal" value={hero.image} onChange={v => set('hero', 'image', v)} />
        </Section>

        {/* SERVICES */}
        <Section title="Servicios" isOpen={openSection === 'services'} onToggle={() => toggle('services')}>
          <Field label="Título de la sección" value={services.heading} onChange={v => set('services', 'heading', v)} />
          <Field label="Frase / Subtítulo" value={services.subheading} onChange={v => set('services', 'subheading', v)} textarea rows={2} />
          {services.items.map((item, i) => (
            <ListItemCard key={i} onRemove={() => removeListItem('services', 'items', i)}>
              <Field label={`Servicio ${i + 1} — Título`} value={item.title} onChange={v => setListItem('services', 'items', i, 'title', v)} />
              <Field label="Descripción" value={item.description} onChange={v => setListItem('services', 'items', i, 'description', v)} textarea hint="Si escribes varias líneas, se mostrarán como una lista con viñetas." />
            </ListItemCard>
          ))}
          <AddButton label="Agregar servicio" onClick={() => addListItem('services', 'items', { title: '', description: '' })} />
        </Section>

        {/* LEAD MAGNET */}
        <Section title="Recurso Gratuito (Guía PDF)" isOpen={openSection === 'leadMagnet'} onToggle={() => toggle('leadMagnet')}>
          <Field label="Badge" value={leadMagnet.badge} onChange={v => set('leadMagnet', 'badge', v)} />
          <Field label="Título" value={leadMagnet.heading} onChange={v => set('leadMagnet', 'heading', v)} textarea rows={2} />
          <Field label="Descripción" value={leadMagnet.description} onChange={v => set('leadMagnet', 'description', v)} textarea />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Texto del botón" value={leadMagnet.buttonText} onChange={v => set('leadMagnet', 'buttonText', v)} />
            <Field label="Nota anti-spam" value={leadMagnet.disclaimer} onChange={v => set('leadMagnet', 'disclaimer', v)} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Field label="Portada del libro (línea 1)" value={leadMagnet.bookTitle} onChange={v => set('leadMagnet', 'bookTitle', v)} />
            <Field label="Portada (palabra destacada)" value={leadMagnet.bookHighlight} onChange={v => set('leadMagnet', 'bookHighlight', v)} />
            <Field label="Autor en portada" value={leadMagnet.bookAuthor} onChange={v => set('leadMagnet', 'bookAuthor', v)} />
          </div>
        </Section>

        {/* PROFILE */}
        <Section title="Perfil (Sobre Mí)" isOpen={openSection === 'profile'} onToggle={() => toggle('profile')}>
          <Field label="Nombre / Título" value={profile.heading} onChange={v => set('profile', 'heading', v)} />
          <Field label="Presentación" value={profile.intro} onChange={v => set('profile', 'intro', v)} textarea rows={5} />
          <ImageUpload label="Fotografía de perfil" value={profile.image} onChange={v => set('profile', 'image', v)} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Años de experiencia (ej. +6)" value={profile.experienceYears} onChange={v => set('profile', 'experienceYears', v)} />
            <Field label="Etiqueta de experiencia" value={profile.experienceLabel} onChange={v => set('profile', 'experienceLabel', v)} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Título de formación" value={profile.educationTitle} onChange={v => set('profile', 'educationTitle', v)} />
            <Field label="Título de especialidades" value={profile.specialtiesTitle} onChange={v => set('profile', 'specialtiesTitle', v)} />
          </div>
          <Field label="Texto de formación" value={profile.educationText} onChange={v => set('profile', 'educationText', v)} textarea rows={2} />
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Especialidades (lista)</label>
            <div className="space-y-2">
              {profile.specialties.map((item, i) => (
                <div key={i} className="flex gap-2">
                  <input
                    type="text"
                    value={item}
                    onChange={e => setListItem('profile', 'specialties', i, null, e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-customOlive-600 bg-slate-50 text-sm"
                  />
                  <button type="button" onClick={() => removeListItem('profile', 'specialties', i)} className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer flex-shrink-0">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-3">
              <AddButton label="Agregar especialidad" onClick={() => addListItem('profile', 'specialties', '')} />
            </div>
          </div>
          <Field label="Texto del botón" value={profile.ctaText} onChange={v => set('profile', 'ctaText', v)} />
        </Section>

        {/* PHILOSOPHY */}
        <Section title="Sesiones Psicoterapéuticas (Abordajes)" isOpen={openSection === 'philosophy'} onToggle={() => toggle('philosophy')}>
          <Field label="Título de la sección" value={philosophy.heading} onChange={v => set('philosophy', 'heading', v)} />
          <Field label="Introducción" value={philosophy.intro} onChange={v => set('philosophy', 'intro', v)} textarea />
          {philosophy.therapies.map((item, i) => (
            <ListItemCard key={i} onRemove={() => removeListItem('philosophy', 'therapies', i)}>
              <Field label={`Abordaje ${i + 1} — Título`} value={item.title} onChange={v => setListItem('philosophy', 'therapies', i, 'title', v)} />
              <Field label="Descripción" value={item.description} onChange={v => setListItem('philosophy', 'therapies', i, 'description', v)} textarea rows={2} />
            </ListItemCard>
          ))}
          <AddButton label="Agregar abordaje" onClick={() => addListItem('philosophy', 'therapies', { title: '', description: '' })} />
        </Section>

        {/* REVIEWS */}
        <Section title="Valoraciones (Reseñas)" isOpen={openSection === 'reviews'} onToggle={() => toggle('reviews')}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Field label="Título" value={reviews.heading} onChange={v => set('reviews', 'heading', v)} />
            <Field label="Calificación (ej. 5.0)" value={reviews.rating} onChange={v => set('reviews', 'rating', v)} />
            <Field label="Subtítulo" value={reviews.subtitle} onChange={v => set('reviews', 'subtitle', v)} />
          </div>
          <Field label="Enlace de Google Reviews" value={reviews.googleUrl} onChange={v => set('reviews', 'googleUrl', v)} />
          {reviews.items.map((item, i) => (
            <ListItemCard key={i} onRemove={() => removeListItem('reviews', 'items', i)}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label={`Reseña ${i + 1} — Nombre`} value={item.name} onChange={v => setListItem('reviews', 'items', i, 'name', v)} />
                <Field label="Fecha (ej. hace 2 meses)" value={item.date} onChange={v => setListItem('reviews', 'items', i, 'date', v)} />
              </div>
              <Field label="Texto de la reseña" value={item.text} onChange={v => setListItem('reviews', 'items', i, 'text', v)} textarea />
            </ListItemCard>
          ))}
          <AddButton label="Agregar reseña" onClick={() => addListItem('reviews', 'items', { name: '', date: '', text: '' })} />
        </Section>

        {/* FAQ */}
        <Section title="Preguntas Frecuentes" isOpen={openSection === 'faq'} onToggle={() => toggle('faq')}>
          <Field label="Título de la sección" value={faq.heading} onChange={v => set('faq', 'heading', v)} />
          <Field label="Subtítulo" value={faq.subtitle} onChange={v => set('faq', 'subtitle', v)} />
          {faq.items.map((item, i) => (
            <ListItemCard key={i} onRemove={() => removeListItem('faq', 'items', i)}>
              <Field label={`Pregunta ${i + 1}`} value={item.question} onChange={v => setListItem('faq', 'items', i, 'question', v)} />
              <Field label="Respuesta" value={item.answer} onChange={v => setListItem('faq', 'items', i, 'answer', v)} textarea />
            </ListItemCard>
          ))}
          <AddButton label="Agregar pregunta" onClick={() => addListItem('faq', 'items', { question: '', answer: '' })} />
        </Section>

        {/* CONTACT */}
        <Section title="Contacto" isOpen={openSection === 'contact'} onToggle={() => toggle('contact')}>
          <Field label="Título de la sección" value={contact.heading} onChange={v => set('contact', 'heading', v)} />
          <Field label="Subtítulo" value={contact.subtitle} onChange={v => set('contact', 'subtitle', v)} textarea rows={2} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Título de agenda" value={contact.calendlyTitle} onChange={v => set('contact', 'calendlyTitle', v)} />
            <Field label="Texto del botón de agenda" value={contact.calendlyButton} onChange={v => set('contact', 'calendlyButton', v)} />
          </div>
          <Field label="Descripción de agenda" value={contact.calendlyDescription} onChange={v => set('contact', 'calendlyDescription', v)} textarea rows={2} />
          <Field label="URL de Calendly" value={contact.calendlyUrl} onChange={v => set('contact', 'calendlyUrl', v)} />
          <Field label="Dirección del consultorio" value={contact.address} onChange={v => set('contact', 'address', v)} textarea rows={2} hint="Cada línea se muestra por separado." />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Teléfono / WhatsApp" value={contact.phone} onChange={v => set('contact', 'phone', v)} />
            <Field label="Email" value={contact.email} onChange={v => set('contact', 'email', v)} />
          </div>
          <Field label="Título del formulario de mensaje" value={contact.formTitle} onChange={v => set('contact', 'formTitle', v)} />
        </Section>
      </div>

      {/* Action bar */}
      <div className="sticky bottom-4 mt-8 flex justify-end gap-4 bg-white/80 backdrop-blur-md border border-slate-200 rounded-2xl p-4 shadow-lg">
        <button
          type="button"
          onClick={handleReset}
          className="flex items-center gap-2 px-6 py-3 text-slate-600 font-semibold hover:bg-slate-100 rounded-xl transition cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          Restaurar original
        </button>
        <button
          type="button"
          onClick={handleSave}
          className="flex items-center gap-2 px-8 py-3 bg-customOlive-600 text-white font-bold rounded-xl shadow-lg shadow-customOlive-600/20 hover:bg-customOlive-700 transition cursor-pointer"
        >
          <Save className="w-5 h-5" />
          Guardar Cambios
        </button>
      </div>
    </div>
  );
}
