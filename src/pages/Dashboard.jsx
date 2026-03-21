import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogOut, Plus, Edit2, Trash2, CheckCircle, Image as ImageIcon, Save, ArrowLeft } from 'lucide-react';
import { getArticles, saveArticle, deleteArticle } from '../utils/storage';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  
  // Current Form State
  const [currentId, setCurrentId] = useState(null);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [readTime, setReadTime] = useState('');
  const [image, setImage] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');

  // Authentication Check
  useEffect(() => {
    const auth = localStorage.getItem('admin_auth');
    if (auth !== 'true') {
      navigate('/admin');
    } else {
      setArticles(getArticles());
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('admin_auth');
    navigate('/admin');
  };

  const handleCreateNew = () => {
    setCurrentId(null);
    setTitle('');
    setCategory('');
    setReadTime('5 min de lectura');
    setImage('https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'); // placeholder
    setExcerpt('');
    setContent('');
    setIsEditing(true);
  };

  const handleEdit = (article) => {
    setCurrentId(article.id);
    setTitle(article.title);
    setCategory(article.category);
    setReadTime(article.readTime);
    setImage(article.image);
    setExcerpt(article.excerpt);
    setContent(article.content || '');
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este artículo permanentemente?")) {
      deleteArticle(id);
      setArticles(getArticles());
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    const newArticle = {
      id: currentId,
      title,
      category,
      readTime,
      image,
      excerpt,
      content,
    };
    saveArticle(newArticle);
    setArticles(getArticles());
    setIsEditing(false);
    setSuccessMsg('¡Artículo guardado con éxito!');
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-slate-900 text-white flex flex-col p-6 flex-shrink-0 hidden md:flex">
        <div className="mb-10 mt-4">
          <h2 className="text-2xl font-bold text-white tracking-tight">Dashboard</h2>
          <p className="text-slate-400 text-sm mt-1">CarolinAvila CMS</p>
        </div>
        
        <nav className="flex-1 space-y-2">
          <button className="flex items-center gap-3 w-full px-4 py-3 bg-slate-800 text-white rounded-xl font-medium cursor-pointer">
            <Edit2 className="w-4 h-4" />
            Blog Artículos
          </button>
          <Link to="/" className="flex items-center gap-3 w-full px-4 py-3 text-slate-400 hover:text-white rounded-xl font-medium transition-colors cursor-pointer">
            <ArrowLeft className="w-4 h-4" />
            Volver al portal
          </Link>
        </nav>

        <button onClick={handleLogout} className="flex items-center gap-3 w-full px-4 py-3 text-rose-400 hover:bg-slate-800 rounded-xl font-medium transition-colors cursor-pointer mt-auto">
          <LogOut className="w-4 h-4" />
          Cerrar Sesión
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 md:p-12 overflow-y-auto">
        
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-bold text-slate-900">
            {isEditing ? (currentId ? 'Editar Artículo' : 'Nuevo Artículo') : 'Gestión de Blog'}
          </h1>
          {!isEditing && (
            <button 
              onClick={handleCreateNew}
              className="flex items-center gap-2 bg-customOlive-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-customOlive-700 transition cursor-pointer shadow-md shadow-customOlive-600/20"
            >
              <Plus className="w-5 h-5" />
              Crear Artículo
            </button>
          )}
        </div>

        {successMsg && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8 p-4 bg-green-100 text-green-800 rounded-xl flex items-center gap-2 font-medium">
            <CheckCircle className="w-5 h-5 text-green-600" />
            {successMsg}
          </motion.div>
        )}

        {isEditing ? (
          /* EDITOR FORM */
          <motion.form 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            onSubmit={handleSave} 
            className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Título del Artículo</label>
                  <input type="text" value={title} onChange={e => setTitle(e.target.value)} required placeholder="Ej. 5 Consejos para dormir..." className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-customOlive-600 bg-slate-50"/>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Categoría</label>
                    <input type="text" value={category} onChange={e => setCategory(e.target.value)} required placeholder="Ej. Psicoanálisis" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-customOlive-600 bg-slate-50"/>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Tiempo de Lectura</label>
                    <input type="text" value={readTime} onChange={e => setReadTime(e.target.value)} required placeholder="Ej. 4 min" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-customOlive-600 bg-slate-50"/>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Resumen Corto (Excerpt)</label>
                  <textarea value={excerpt} onChange={e => setExcerpt(e.target.value)} required rows="3" placeholder="Aparecerá en la tarjeta del blog en la página principal..." className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-customOlive-600 bg-slate-50"></textarea>
                </div>
              </div>
              
              <div className="space-y-6">
                <label className="block text-sm font-semibold text-slate-700 mb-2">URL de Imagen de Portada</label>
                <div className="flex gap-4 items-center">
                  <div className="w-20 h-20 bg-slate-100 rounded-xl flex items-center justify-center overflow-hidden border border-slate-200 flex-shrink-0">
                    {image ? <img src={image} className="w-full h-full object-cover" /> : <ImageIcon className="text-slate-400" />}
                  </div>
                  <input type="url" value={image} onChange={e => setImage(e.target.value)} required placeholder="https://unsplash..." className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-customOlive-600 bg-slate-50"/>
                </div>
                <p className="text-xs text-slate-400 -mt-4">Pega el link de una imagen. Te recomendamos Unsplash.</p>
              </div>
            </div>

            <div className="mb-8">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Contenido Completo del Artículo</label>
              <textarea 
                value={content} 
                onChange={e => setContent(e.target.value)} 
                required 
                rows="15" 
                placeholder="Escribe el cuerpo de tu artículo aquí. (Puedes usar doble salto de línea para separar párrafos)." 
                className="w-full px-6 py-5 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-customOlive-600 bg-slate-50 text-slate-800 leading-relaxed resize-none"
              ></textarea>
            </div>

            <div className="flex justify-end gap-4 border-t border-slate-100 pt-6">
              <button type="button" onClick={() => setIsEditing(false)} className="px-6 py-3 text-slate-600 font-semibold hover:bg-slate-100 rounded-xl transition cursor-pointer">
                Cancelar
              </button>
              <button type="submit" className="flex items-center gap-2 px-8 py-3 bg-customOlive-600 text-white font-bold rounded-xl shadow-lg shadow-customOlive-600/20 hover:bg-customOlive-700 transition cursor-pointer">
                <Save className="w-5 h-5" />
                Publicar Artículo
              </button>
            </div>
          </motion.form>
        ) : (
          /* ARTICLES LIST */
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-slate-100">
                  <tr>
                    <th className="px-6 py-4 font-semibold text-slate-600 text-sm">Artículo</th>
                    <th className="px-6 py-4 font-semibold text-slate-600 text-sm">Categoría</th>
                    <th className="px-6 py-4 font-semibold text-slate-600 text-sm">Fecha</th>
                    <th className="px-6 py-4 font-semibold text-slate-600 text-sm text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {articles.length === 0 ? (
                    <tr><td colSpan="4" className="text-center py-12 text-slate-500">No hay artículos publicados aún.</td></tr>
                  ) : (
                    articles.map(article => (
                      <tr key={article.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-4">
                            <img src={article.image} alt="" className="w-12 h-12 rounded-lg object-cover" />
                            <div className="font-bold text-slate-800 max-w-sm truncate" title={article.title}>{article.title}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-slate-500 font-medium">{article.category}</td>
                        <td className="px-6 py-4 text-slate-500 font-medium">Hace un momento</td>
                        <td className="px-6 py-4 text-right">
                          <button onClick={() => handleEdit(article)} className="p-2 text-customOlive-600 hover:bg-customOlive-50 rounded-lg transition-colors cursor-pointer mr-2" title="Editar">
                            <Edit2 className="w-5 h-5" />
                          </button>
                          <button onClick={() => handleDelete(article.id)} className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer" title="Eliminar">
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
