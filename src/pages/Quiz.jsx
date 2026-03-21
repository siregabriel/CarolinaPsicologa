import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, RefreshCcw, Smile, Meh, Frown } from 'lucide-react';
import SEO from '../components/SEO';

const questions = [
  {
    id: 1,
    question: "¿Con qué frecuencia te has sentido decaído, triste o sin esperanza últimamente?",
  },
  {
    id: 2,
    question: "¿Sientes que tus niveles de ansiedad, nerviosismo o preocupación son difíciles de controlar?",
  },
  {
    id: 3,
    question: "¿Tienes dificultad para conciliar el sueño, te despiertas en la madrugada o duermes en exceso?",
  },
  {
    id: 4,
    question: "¿Has perdido el interés o el placer en hacer cosas que antes disfrutabas mucho?",
  },
  {
    id: 5,
    question: "¿Has notado cambios importantes en tu apetito (comes mucho más o mucho menos de lo normal)?",
  },
  {
    id: 6,
    question: "¿Sientes cansancio constante o falta de energía, incluso sin hacer esfuerzo físico?",
  },
  {
    id: 7,
    question: "¿Te sientes abrumado por sentimientos de culpa, o sientes que estás decepcionando a los que te rodean?",
  },
  {
    id: 8,
    question: "¿Tienes dificultad para concentrarte en actividades cotidianas como leer, trabajar o mantener una conversación?",
  }
];

const options = [
  { label: "Nunca", value: 0 },
  { label: "Varios días", value: 1 },
  { label: "Más de la mitad del tiempo", value: 2 },
  { label: "Casi todos los días", value: 3 },
];

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isFinished, setIsFinished] = useState(false);

  const handleSelect = (val) => {
    setAnswers({ ...answers, [currentQuestion]: val });
  };

  const handleNext = () => {
    if (answers[currentQuestion] !== undefined) {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setIsFinished(true);
      }
    }
  };

  const calculateResult = () => {
    const total = Object.values(answers).reduce((acc, curr) => acc + curr, 0);
    const maxScore = questions.length * 3;
    const percentage = (total / maxScore) * 100;

    if (percentage >= 60) {
      return {
        title: "Te sugiero iniciar un proceso terapéutico",
        description: "Tus respuestas indican que estás experimentando un nivel considerable de malestar emocional que está afectando tu calidad de vida. No tienes que pasar por esto a solas; un espacio de terapia te brindará el apoyo y las herramientas necesarias.",
        color: "text-rose-600",
        bg: "bg-rose-50",
        icon: Frown
      };
    } else if (percentage >= 30) {
      return {
        title: "Una asesoría podría ser muy beneficiosa para ti",
        description: "Muestras algunos signos de carga emocional y estrés. Aunque manejas varias áreas de tu vida adecuadamente, la terapia puede servirte como un espacio preventivo para adquirir herramientas de autoconocimiento y evitar que el malestar crezca.",
        color: "text-amber-600",
        bg: "bg-amber-50",
        icon: Meh
      };
    } else {
      return {
        title: "Tus indicadores de estrés son bajos",
        description: "Parece que actualmente cuentas con buenos recursos internos para manejar tus emociones y desafíos diarios. Recuerda que la salud mental se cultiva todos los días y mi puerta siempre estará abierta si alguna vez deseas un espacio de crecimiento personal.",
        color: "text-customOlive-600",
        bg: "bg-customOlive-50",
        icon: Smile
      };
    }
  };

  const result = isFinished ? calculateResult() : null;

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-20 px-4 sm:px-6 lg:px-8 flex flex-col items-center font-sans">
      <SEO 
        title="¿Necesito Terapia? - Quiz de Autocuidado" 
        description="Realiza nuestro test breve para identificar si podrías beneficiarte de un acompañamiento psicológico profesional."
        keywords="quiz psicología, test salud mental, necesito terapia, evaluación emocional"
      />
      
      <div className="w-full max-w-2xl">
        <Link to="/" className="inline-flex items-center text-slate-500 hover:text-customOlive-600 transition-colors mb-8 group font-medium text-sm gap-2">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Volver a inicio
        </Link>
      </div>

      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden relative min-h-[480px]">
        
        {/* Progress bar */}
        {!isFinished && (
          <div className="absolute top-0 left-0 w-full h-1.5 bg-slate-100">
            <motion.div 
              className="h-full bg-customOlive-500"
              initial={{ width: 0 }}
              animate={{ width: `${((currentQuestion) / questions.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        )}

        <div className="p-8 md:p-12 h-full flex flex-col">
          <AnimatePresence mode="wait">
            {!isFinished ? (
              <motion.div
                key={currentQuestion}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col flex-grow"
              >
                <div className="mb-8">
                  <span className="text-customOlive-600 font-bold mb-2 block text-sm tracking-widest uppercase">
                    Pregunta {currentQuestion + 1} de {questions.length}
                  </span>
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-800 leading-snug">
                    {questions[currentQuestion].question}
                  </h2>
                </div>

                <div className="space-y-3 flex-grow">
                  {options.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => handleSelect(opt.value)}
                      className={`w-full text-left px-6 py-4 rounded-2xl border-2 transition-all font-medium ${
                        answers[currentQuestion] === opt.value
                          ? 'border-customOlive-600 bg-customOlive-50 text-customOlive-800 shadow-sm'
                          : 'border-slate-100 hover:border-customOlive-200 hover:bg-slate-50 text-slate-600'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>

                <div className="mt-10 flex justify-end">
                  <button
                    onClick={handleNext}
                    disabled={answers[currentQuestion] === undefined}
                    className="flex items-center gap-2 bg-rose-700 text-white px-8 py-3.5 rounded-full font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-rose-800 transition-colors shadow-md"
                  >
                    {currentQuestion === questions.length - 1 ? 'Analizar mis resultados' : 'Siguiente'}
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center h-full text-center py-8"
              >
                <div className={`w-28 h-28 rounded-full flex items-center justify-center mb-6 shadow-sm border border-slate-100 ${result.bg}`}>
                  {result.icon && <result.icon className={`w-16 h-16 ${result.color}`} strokeWidth={1.5} />}
                </div>
                
                <h2 className="text-3xl font-bold text-slate-800 mb-4 px-4">{result.title}</h2>
                
                <div className="bg-slate-50 rounded-3xl p-6 md:p-8 mb-10 w-full border border-slate-100">
                  <p className="text-slate-600 font-medium text-lg leading-relaxed">
                    {result.description}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                  <button
                    onClick={() => {
                      setCurrentQuestion(0);
                      setAnswers({});
                      setIsFinished(false);
                    }}
                    className="flex items-center justify-center gap-2 px-6 py-4 rounded-full border-2 border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors font-bold"
                  >
                    <RefreshCcw className="w-5 h-5" />
                    Volver a hacer el test
                  </button>
                  <Link
                    to="/#contact"
                    className="flex items-center justify-center px-8 py-4 rounded-full bg-rose-700 text-white hover:bg-rose-800 transition-colors font-bold shadow-lg shadow-rose-700/20"
                  >
                    Agendar mi Consulta Inicial
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
