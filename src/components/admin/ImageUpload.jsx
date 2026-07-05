import { useRef, useState } from 'react';
import { Upload, Link as LinkIcon, Image as ImageIcon, X, Loader2 } from 'lucide-react';

/**
 * Reads an image file, resizes it (max side = maxSize) and compresses it
 * to a data URL so it can be stored in localStorage.
 */
async function processImage(file, maxSize = 1200, quality = 0.82) {
  const dataUrl = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error('No se pudo leer el archivo.'));
    reader.readAsDataURL(file);
  });

  const img = await new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error('El archivo no es una imagen válida.'));
    image.src = dataUrl;
  });

  const scale = Math.min(1, maxSize / Math.max(img.width, img.height));
  const width = Math.round(img.width * scale);
  const height = Math.round(img.height * scale);

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  // Keep transparency for PNGs; otherwise flatten to white and use JPEG (smaller).
  const hasAlpha = file.type === 'image/png' || file.type === 'image/webp';
  if (!hasAlpha) {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);
  }
  ctx.drawImage(img, 0, 0, width, height);

  // Prefer WebP (smaller); fall back to JPEG if the browser doesn't support it.
  let result = canvas.toDataURL('image/webp', quality);
  if (!result.startsWith('data:image/webp')) {
    result = canvas.toDataURL('image/jpeg', quality);
  }
  return result;
}

/**
 * Image field with two modes: upload from device (compressed → data URL)
 * or paste an external URL. Shows a live preview.
 */
export default function ImageUpload({ label, value, onChange, hint }) {
  const inputRef = useRef(null);
  const [mode, setMode] = useState('upload'); // 'upload' | 'url'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [dragOver, setDragOver] = useState(false);

  const handleFile = async (file) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setError('El archivo debe ser una imagen (JPG, PNG, WebP...).');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const dataUrl = await processImage(file);
      // localStorage safety check (~5MB total). Warn above ~800KB per image.
      if (dataUrl.length > 800 * 1024) {
        setError('La imagen es muy pesada incluso comprimida. Intenta con una más pequeña.');
      } else {
        onChange(dataUrl);
      }
    } catch (e) {
      setError(e.message || 'No se pudo procesar la imagen.');
    } finally {
      setLoading(false);
      if (inputRef.current) inputRef.current.value = '';
    }
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

      <div className="flex gap-4 items-start">
        {/* Preview */}
        <div className="relative w-24 h-24 bg-slate-100 rounded-xl flex items-center justify-center overflow-hidden border border-slate-200 flex-shrink-0">
          {value ? (
            <>
              <img src={value} alt="Vista previa" className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => onChange('')}
                title="Quitar imagen"
                className="absolute top-1 right-1 p-1 bg-white/90 rounded-full text-rose-500 hover:bg-white shadow cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </>
          ) : (
            <ImageIcon className="text-slate-400" />
          )}
        </div>

        <div className="flex-1">
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
                  <Upload className="w-5 h-5 text-customOlive-600" />
                  <span className="text-sm font-semibold text-slate-700">Haz clic o arrastra una imagen aquí</span>
                  <span className="text-xs text-slate-400">JPG, PNG o WebP · se comprime automáticamente</span>
                </>
              )}
              <input
                ref={inputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFile(e.target.files?.[0])}
              />
            </div>
          ) : (
            <input
              type="url"
              value={value?.startsWith('data:') ? '' : (value || '')}
              onChange={(e) => onChange(e.target.value)}
              placeholder="https://ejemplo.com/imagen.jpg"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-customOlive-600 bg-slate-50 text-sm"
            />
          )}
          {error && <p className="text-xs text-rose-500 mt-2 font-medium">{error}</p>}
          {hint && !error && <p className="text-xs text-slate-400 mt-2">{hint}</p>}
        </div>
      </div>
    </div>
  );
}
