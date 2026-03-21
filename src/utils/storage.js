// Default seeds for the blog
const defaultArticles = [
  {
    id: 1,
    title: '5 estrategias efectivas para manejar la ansiedad en el trabajo',
    excerpt: 'Descubre cómo establecer límites y técnicas de respiración que puedes aplicar en tu oficina para reducir los niveles de estrés diarios.',
    content: 'La ansiedad en el entorno laboral es uno de los motivos de consulta más frecuentes. Las exigencias constantes, plazos ajustados y dinámicas complejas pueden desgastar nuestra salud mental de forma silenciosa.\n\nAquí tienes 5 estrategias para manejarla adecuadamente:\n\n1. Respiración diafragmática: Dedica 3 minutos antes de una junta importante a respirar profundamente desde el abdomen.\n2. Límites claros: Aprende a decir "no" cuando tu capacidad esté al límite.\n3. Pausas activas: Levántate cada 90 minutos para estirar tu cuerpo y relajar la mente.\n4. Comunicación asertiva: Expresa tus necesidades sin agredir pero sin someterte.\n5. Terapia psicológica: Si sientes que el estrés te rebasa, buscar ayuda profesional es el mejor camino.',
    category: 'Manejo de Ansiedad',
    readTime: '5 min de lectura',
    image: 'https://images.unsplash.com/photo-1493804714600-6edb1cd93080?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    color: 'bg-rose-100 text-rose-700'
  },
  {
    id: 2,
    title: 'Cómo identificar si tu relación de pareja necesita terapia',
    excerpt: 'La desconexión emocional y la falta de comunicación asertiva son las primeras señales. Aprende a detectarlas antes de que el vínculo se dañe.',
    content: 'Todas las relaciones pasan por altibajos, pero ¿cuándo es momento de buscar ayuda externa?\n\nSi tú y tu pareja discuten constantemente sobre el mismo tema sin llegar a una solución, si sienten que la intimidad emocional o física se ha desvanecido, o si hay heridas como una infidelidad de por medio, la terapia puede ser un recurso invaluable.\n\nEl consultorio es un espacio neutral donde ambos pueden expresar sus necesidades sin sentirse atacados. El objetivo no es buscar quién tiene la culpa, sino comprender qué dinámicas están fallando y cómo reconstruir un puente de comunicación empática.',
    category: 'Relaciones',
    readTime: '4 min de lectura',
    image: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    color: 'bg-customOlive-100 text-customOlive-700' // updated to customOlive
  },
  {
    id: 3,
    title: 'El mito de ser perfectos: Construyendo una autoestima sana',
    excerpt: 'El perfeccionismo suele ser el enemigo del bienestar emocional. Te comparto una guía rápida para empezar a tratarte con mayor compasión.',
    content: 'Vivimos en una sociedad que premia el perfeccionismo, confundiéndolo con excelencia. Sin embargo, buscar ser "perfectos" nos condena a una insatisfacción crónica y nos roba la paz mental.\n\nConstruir una autoestima sana requiere dejar de criticarnos con tanta dureza. La autocompasión implica hablarnos a nosotros mismos como le hablaríamos a un amigo querido que está pasando por un mal momento.\n\nRecuerda: tu valor no se mide por tu productividad ni por la ausencia de errores. Eres valioso simplemente por existir, y permitirte equivocarte es parte fundamental de la experiencia humana.',
    category: 'Crecimiento Personal',
    readTime: '6 min de lectura',
    image: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    color: 'bg-customBrown-100 text-customBrown-700' // updated to customBrown
  }
];

export function getArticles() {
  const data = localStorage.getItem('carolina_articles');
  if (!data) {
    localStorage.setItem('carolina_articles', JSON.stringify(defaultArticles));
    return defaultArticles;
  }
  return JSON.parse(data);
}

export function saveArticle(article) {
  const articles = getArticles();
  
  // Basic color mapping based on category for aesthetics inside Blog cards
  if (!article.color) {
    const cats = ['bg-rose-100 text-rose-700', 'bg-customOlive-100 text-customOlive-700', 'bg-customBrown-100 text-customBrown-700'];
    article.color = cats[Math.floor(Math.random() * cats.length)];
  }

  if (article.id) {
    // Update existing
    const idx = articles.findIndex(a => a.id === article.id);
    if (idx !== -1) articles[idx] = article;
  } else {
    // Create new
    article.id = Date.now();
    articles.unshift(article); // Add to beginning
  }
  
  localStorage.setItem('carolina_articles', JSON.stringify(articles));
}

export function deleteArticle(id) {
  const articles = getArticles();
  const filtered = articles.filter(a => a.id !== id);
  localStorage.setItem('carolina_articles', JSON.stringify(filtered));
}
