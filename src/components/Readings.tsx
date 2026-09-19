import { useState } from 'react';
import { ChevronDown, BookOpen, Quote } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface Reading {
  id: string;
  author: string;
  title: string;
  focus: string;
  image: string;
  summary: string;
  keyPoints: string[];
  quote: string;
}

const readings: Reading[] = [
  {
    id: 'zuleta',
    author: 'Estanislao Zuleta',
    title: 'Elogio de la Dificultad',
    focus: 'Mentalidad facilista y la ilusión de una vida sin conflictos',
    image:
      'https://images.pexels.com/photos/1122870/pexels-photo-1122870.jpeg?auto=compress&cs=tinysrgb&w=940',
    summary:
      'Zuleta critica la mentalidad facilista que busca eliminar todo conflicto y dificultad de la vida. Argumenta que esta ilusión de una vida sin problemas es en realidad una renuncia al crecimiento personal y al desarrollo del pensamiento crítico. La dificultad no es un obstáculo a evitar, sino la condición misma que permite la realización humana.',
    keyPoints: [
      'La búsqueda de una vida sin conflictos conduce a la mediocridad y al conformismo',
      'El facilismo niega la dimensión creativa y transformadora del ser humano',
      'La dificultad es el motor del desarrollo psíquico, intelectual y moral',
      'Una vida sin problemas no es humana: es la vida de un ser que no se ha planteado ninguno',
    ],
    quote:
      'La dificultad no es un accidente que debamos evitar, sino la condición esencial de todo lo que vale la pena.',
  },
  {
    id: 'sebreli',
    author: 'Juan José Sebreli',
    title: 'Humanismo Latinoamericano',
    focus: 'Visión crítica de la sociedad, cultura y política',
    image:
      'https://images.pexels.com/photos/1333742/pexels-photo-1333742.jpeg?auto=compress&cs=tinysrgb&w=940',
    summary:
      'Sebreli ofrece una mirada crítica sobre la cultura y sociedad latinoamericana, cuestionando los mitos identitarios y las formas de pensamiento que perpetúan el subdesarrollo y la dependencia. Su humanismo no es nostálgico sino prospectivo: busca construir una conciencia crítica que enfrente la realidad sin evasivas.',
    keyPoints: [
      'Crítica del populismo y el nacionalismo cultural como formas de evasión',
      'El humanismo latinoamericano debe ser crítico, no apologético',
      'La cultura popular no es pura ni inocente: debe ser examinada',
      'La verdadera identidad se construye en el ejercicio crítico, no en el mito',
    ],
    quote:
      'No basta con celebrar lo nuestro: hay que someterlo al examen riguroso que toda cultura merece.',
  },
  {
    id: 'crehan',
    author: 'Kathe Crehan (sobre Gramsci)',
    title: 'Intelectuales y Sentido Común',
    focus: 'El papel del intelectual y el espíritu creativo del pueblo',
    image:
      'https://images.pexels.com/photos/29976379/pexels-photo-29976379.jpeg?auto=compress&cs=tinysrgb&w=940',
    summary:
      'Crehan, leyendo a Gramsci, explora el concepto de intelectual orgánico y la relación entre el sentido común (doxa) y el buen sentido (pensamiento crítico). El intelectual no es un ser aislado sino alguien que emerge del pueblo y contribuye a transformar el sentido común en conciencia crítica organizada.',
    keyPoints: [
      'Todos los hombres son intelectuales, pero no todos cumplen la función de intelectuales en la sociedad',
      'El sentido común contiene elementos de buen sentido que deben ser elaborados críticamente',
      'El intelectual orgánico está vinculado a un grupo social y contribuye a su conciencia',
      'El pueblo posee un espíritu creativo que el intelectual debe articular, no sustituir',
    ],
    quote:
      'El sentido común no es algo que se deba destruir, sino transformar en buen sentido mediante el trabajo crítico.',
  },
  {
    id: 'rincon',
    author: 'J. A. Rincón Díaz',
    title: 'Investigación Acción Participativa',
    focus: 'El universitario como intelectual crítico y su filosofía de vida',
    image:
      'https://images.pexels.com/photos/16420473/pexels-photo-16420473.jpeg?auto=compress&cs=tinysrgb&w=940',
    summary:
      'Rincón Díaz propone la Investigación Acción Participativa (IAP) como metodología que integra al universitario en la realidad social. El estudiante universitario no es un técnico neutro sino un intelectual crítico que debe asumir una filosofía de vida comprometida con la transformación de las comunidades.',
    keyPoints: [
      'El universitario debe superar la falsa neutralidad académica',
      'La IAP integra investigación, acción y participación comunitaria',
      'El conocimiento se construye con la comunidad, no sobre ella',
      'La filosofía de vida del intelectual implica compromiso ético y político',
    ],
    quote:
      'El universitario no puede ser un espectador: su pensamiento debe encarnarse en acción transformadora.',
  },
];

export function Readings() {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();
  const [activeId, setActiveId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <section id="lecturas" className="relative py-24 md:py-32 bg-gradient-to-b from-stone-950 to-stone-900 bg-grain overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-700/40 to-transparent" />

      <div ref={ref} className="max-w-5xl mx-auto px-6">
        {/* Section header */}
        <div className={`reveal ${isVisible ? 'is-visible' : ''} mb-16`}>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-12 bg-amber-600" />
            <span className="text-amber-500 text-sm tracking-[0.3em] uppercase font-semibold">
              Análisis de Lecturas Clave
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-stone-50 leading-tight text-balance">
            Cuatro Textos, Una Conversación
          </h2>
          <p className="text-stone-400 mt-4 max-w-2xl text-lg">
            Explora cada lectura clave para descubrir sus argumentos y aportes al
            debate sobre el humanismo y la transformación social.
          </p>
        </div>

        {/* Accordion list */}
        <div className="space-y-4">
          {readings.map((reading, idx) => {
            const isOpen = activeId === reading.id;
            return (
              <div
                key={reading.id}
                className={`reveal ${isVisible ? 'is-visible' : ''}`}
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <div
                  className={`rounded-2xl border transition-all duration-500 overflow-hidden ${
                    isOpen
                      ? 'border-amber-600/50 bg-stone-900/80'
                      : 'border-stone-700/40 bg-stone-900/40 hover:border-stone-600'
                  }`}
                >
                  {/* Header button */}
                  <button
                    onClick={() => toggle(reading.id)}
                    className="w-full flex items-center gap-4 p-5 md:p-6 text-left group"
                  >
                    {/* Image thumbnail */}
                    <div className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden border border-stone-700/50">
                      <img
                        src={reading.image}
                        alt={reading.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>

                    {/* Title block */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <BookOpen className="w-4 h-4 text-amber-500 flex-shrink-0" />
                        <span className="text-xs text-amber-500 tracking-wide uppercase font-semibold">
                          {reading.author}
                        </span>
                      </div>
                      <h3 className="text-lg md:text-xl font-semibold text-stone-100 mb-1">
                        {reading.title}
                      </h3>
                      <p className="text-sm text-stone-400 line-clamp-1">
                        {reading.focus}
                      </p>
                    </div>

                    {/* Chevron */}
                    <ChevronDown
                      className={`w-5 h-5 text-stone-500 flex-shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 text-amber-500' : ''
                      }`}
                    />
                  </button>

                  {/* Expandable content */}
                  <div
                    className={`grid transition-all duration-500 ${
                      isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-5 md:px-6 pb-6">
                        <div className="border-t border-stone-700/40 pt-5">
                          {/* Summary */}
                          <p className="text-stone-300 leading-relaxed mb-5">
                            {reading.summary}
                          </p>

                          {/* Key points */}
                          <div className="space-y-2.5 mb-5">
                            <h4 className="text-sm font-semibold text-amber-500 tracking-wide uppercase">
                              Puntos Clave
                            </h4>
                            {reading.keyPoints.map((point, i) => (
                              <div key={i} className="flex items-start gap-3">
                                <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-amber-500 mt-2" />
                                <p className="text-stone-300 text-sm leading-relaxed">
                                  {point}
                                </p>
                              </div>
                            ))}
                          </div>

                          {/* Quote */}
                          <div className="relative p-4 md:p-5 rounded-xl bg-amber-950/20 border border-amber-800/30">
                            <Quote className="w-6 h-6 text-amber-600/40 absolute top-3 left-3" />
                            <blockquote className="text-stone-200 italic font-serif pl-8 text-sm md:text-base">
                              {reading.quote}
                            </blockquote>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
