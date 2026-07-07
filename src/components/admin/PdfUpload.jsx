import { useRef, useState } from 'react';
import { Upload, Link as LinkIcon, FileText, X, Loader2, CheckCircle } from 'lucide-react';
import { supabase, isSupabaseEnabled } from '../../utils/supabaseClient';

// Con Supabase: hasta 25MB (se sube a Storage). Sin Supabase: 2.5MB (límite de localStorage).
const MAX_PDF_BYTES = isSupabaseEnabled ? 25 * 1024 * 1024 : 2.5 * 1024 * 1024;
const MAX_LABEL = isSupabaseEnabled ? '25MB' : '2.5MB';

/**
 * Campo para el PDF descargable: subir desde el equipo (data URL) o pegar una URL externa.
 */
export default function PdfUpload({ label, value, fileName, onChange, hint }) {
  const inputRef = useRef(null);
  const [mode, setMode] = useState('upload'); // 'upload' | 'url'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [dragOver, setDragOver] = useState(false);

  const isDataUrl = value?.startsWith('data:');
  const hasFile = Boolean(value);

  const handleFile = (file) => {
    if (!file) return;
    if (file.type !== 'application/pdf') {
      setError('El archivo debe ser un PDF.');
      return;
    }
    if (file.size > MAX_PDF_BYTES) {
      setError(`El PDF pesa ${(file.size / 1024 / 1024).toFixed(1)}MB. El máximo es ${MAX_LABEL} — compórtalo o usa el modo URL con un enlace externo (Google Drive, Dropbox...).`);
      return;
    }
    setError('');
    setLoading(true);

    if (isSupabaseEnabled) {
      // Upload to Supabase Storage → real URL, visible to all visitors
      const path = `pdfs/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, '_')}`;
      supabase.storage.from('media').upload(path, file, { contentType: 'application/pdf' })
        .then(({ error: upErr }) => {
          if (upErr) throw new Error(upErr.message);
          const { data } = supabase.storage.from('media').getPublicUrl(path);
          onChange(data.publicUrl, file.name);
        })
        .catch((e) => setError(`No se pudo subir el PDF: ${e.message}`))
        .finally(() => setLoading(false));
    } else {
      const reader = new FileReader();
      reader.onload = () => {
        onChange(reader.result, file.name);
        setLoading(false);
      };
      reader.onerror = () => {
        setError('No se pudo leer el archivo.');
        setLoading(false);
      };
      reader.readAsDataURL(file);
    }
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="block text-sm font-semibold text-slate-700">{label}</label>
        <div className="flex rounded-lg border border-slate-200 overflow-hidden text-xs font-semibold">
          <button
            type="button"
            onClick={() => setMode('upload')}
            className={`px-3 py-1.5 cursor-pointer transition-colors ${mode === 'upload' ? 'bg-customOlive-600 text-white' : 'bg-white text-slate-500 hover:bg-slate-50'}`}
          >
            <span className="flex items-center gap-1"><Upload className="w-3 h-3" /> Subir</span>
          </button>
          <button
            type="button"
            onClick={() => setMode('url')}
            className={`px-3 py-1.5 cursor-pointer transition-colors ${mode === 'url' ? 'bg-customOlive-600 text-white' : 'bg-white text-slate-500 hover:bg-slate-50'}`}
          >
            <span className="flex items-center gap-1"><LinkIcon className="w-3 h-3" /> URL</span>
          </button>
        </div>
      </div>

      {hasFile && (
        <div className="flex items-center gap-3 mb-3 p-3 bg-green-50 border border-green-200 rounded-xl">
          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-slate-700 truncate">
              {isDataUrl ? (fileName || 'PDF cargado') : value}
            </p>
            <p className="text-xs text-slate-500">
              {isDataUrl ? `PDF guardado (${(value.length / 1024 / 1024 * 0.75).toFixed(1)}MB aprox.)` : 'Enlace externo'}
            </p>
          </div>
          <button
            type="button"
            onClick={() => onChange('', '')}
            title="Quitar PDF"
            className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer flex-shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {mode === 'upload' ? (
        <div
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFile(e.dataTransfer.files?.[0]); }}
          className={`flex flex-col items-center justify-center gap-1 px-4 py-5 rounded-xl border-2 border-dashed cursor-pointer transition-colors text-center
            ${dragOver ? 'border-customOlive-500 bg-customOlive-50' : 'border-slate-200 bg-slate-50 hover:border-customOlive-300 hover:bg-customOlive-50/50'}`}
        >
          {loading ? (
            <Loader2 className="w-6 h-6 text-customOlive-600 animate-spin" />
          ) : (
            <>
              <FileText className="w-5 h-5 text-customOlive-600" />
              <span className="text-sm font-semibold text-slate-700">Haz clic o arrastra tu PDF aquí</span>
              <span className="text-xs text-slate-400">Máximo {MAX_LABEL} · para archivos más grandes usa el modo URL</span>
            </>
          )}
          <input
            ref={inputRef}
            type="file"
            accept="application/pdf"
            className="hidden"
            onChange={(e) => handleFile(e.target.files?.[0])}
          />
        </div>
      ) : (
        <input
          type="url"
          value={isDataUrl ? '' : (value || '')}
          onChange={(e) => onChange(e.target.value, fileName)}
          placeholder="https://drive.google.com/... o https://ejemplo.com/guia.pdf"
          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-customOlive-600 bg-slate-50 text-sm"
        />
      )}
      {error && <p className="text-xs text-rose-500 mt-2 font-medium">{error}</p>}
      {hint && !error && <p className="text-xs text-slate-400 mt-2">{hint}</p>}
    </div>
  );
}
