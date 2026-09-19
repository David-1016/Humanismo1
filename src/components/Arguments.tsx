import { useState } from 'react';
import { ChevronDown, Quote, Lightbulb, Users, GraduationCap } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface Argument {
  id: number;
  icon: typeof Lightbulb;
  title: string;
  subtitle: string;
  description: string;
  details: string;
  quote: string;
  author: string;
  color: string;
  borderColor: string;
  bgColor: string;
  iconColor: string;
}

const argumentsData: Argument[] = [
  {
    id: 1,
    icon: Lightbulb,
    title: 'La Dificultad como Condición del Pensamiento Crítico',
    subtitle: 'Zuleta + Gramsci',
    description:
      'El pensamiento crítico no surge de la comodidad sino del enfrentamiento con la dificultad. Superar el facilismo es condición necesaria para que el ser humano construya una conciencia que cuestione el sentido común dogmático.',
    details:
      'Zuleta demuestra que la mentalidad facilista empobrece la experiencia humana al evitar el conflicto que genera crecimiento. Gramsci complementa esto mostrando que el sentido común es el terreno donde opera la dominación: sin dificultad no hay cuestionamiento, y sin cuestionamiento no hay transformación. La dificultad no es un enemigo sino el aliado del pensamiento.',
    quote:
      'Una vida sin problemas no es humana; es la vida de un ser que no se ha planteado ninguno.',
    author: 'Estanislao Zuleta',
    color: 'amber',
    borderColor: 'border-amber-700/50',
    bgColor: 'bg-amber-950/20',
    iconColor: 'text-amber-400',
  },
  {
    id: 2,
    icon: Users,
    title: 'El Intelectual como Puente entre Pueblo y Conciencia Crítica',
    subtitle: 'Crehan (Gramsci) + Rincón Díaz',
    description:
      'El intelectual no es un ser aislado en una torre de marfil. Es un agente orgánico que emerge del pueblo, articula su espíritu creativo y lo eleva hacia una conciencia crítica organizada que puede transformar la realidad.',
    details:
      'Crehan, leyendo a Gramsci, muestra que todos los seres humanos son intelectuales en potencia, pero la sociedad asigna la función intelectual a unos pocos. El intelectual orgánico debe estar vinculado a su grupo social y contribuir a elevar el sentido común a buen sentido. Rincón Díaz lo aplica al universitario: este no puede ser neutral, debe comprometerse con la realidad de las comunidades a través de la Investigación Acción Participativa.',
    quote:
      'El pueblo posee un espíritu creativo que el intelectual debe articular, no sustituir.',
    author: 'Kathe Crehan sobre Gramsci',
    color: 'emerald',
    borderColor: 'border-emerald-700/50',
    bgColor: 'bg-emerald-950/20',
    iconColor: 'text-emerald-400',
  },
  {
    id: 3,
    icon: GraduationCap,
    title: 'La Filosofía de Vida Comprometida como Superación del Dogma',
    subtitle: 'Sebreli + Rincón Díaz',
    description:
      'La superación del sentido común dogmático requiere una filosofía de vida comprometida. No basta con la crítica teórica: el humanismo exige encarnar el pensamiento en acción, integrando reflexión y transformación social.',
    details:
      'Sebreli sostiene que el humanismo latinoamericano no puede ser apologético sino crítico: debe examinar sin concesiones la cultura y sus mitos. Rincón Díaz aporta que esta crítica debe materializarse en la acción: el universitario que solo teoriza sin comprometerse reproduce la separación entre pensamiento y realidad. La filosofía de vida comprometida es la que une teoría y praxis, superando la falsa neutralidad académica.',
    quote:
      'El universitario no puede ser un espectador: su pensamiento debe encarnarse en acción transformadora.',
    author: 'J. A. Rincón Díaz',
    color: 'sky',
    borderColor: 'border-sky-700/50',
    bgColor: 'bg-sky-950/20',
    iconColor: 'text-sky-400',
  },
];

export function Arguments() {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();
  const [expandedId, setExpandedId] = useState<number | null>(null);

  return (
    <section id="argumentos" className="relative py-24 md:py-32 bg-stone-900 bg-grain overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-700/40 to-transparent" />

      <div ref={ref} className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <div className={`reveal ${isVisible ? 'is-visible' : ''} mb-16`}>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-12 bg-amber-600" />
            <span className="text-amber-500 text-sm tracking-[0.3em] uppercase font-semibold">
              Argumentos Centrales de Defensa
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-stone-50 leading-tight text-balance">
            Tres Razones que Sostienen la Postura
          </h2>
        </div>

        {/* Cards grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {argumentsData.map((arg, idx) => {
            const Icon = arg.icon;
            const isExpanded = expandedId === arg.id;

            return (
              <div
                key={arg.id}
                className={`reveal ${isVisible ? 'is-visible' : ''}`}
                style={{ transitionDelay: `${idx * 150}ms` }}
              >
                <div
                  className={`group h-full rounded-2xl border ${arg.borderColor} ${arg.bgColor} backdrop-blur-sm overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl flex flex-col`}
                >
                  {/* Card header */}
                  <div className="p-6 md:p-7">
                    <div className="flex items-center gap-3 mb-5">
                      <div className={`w-12 h-12 rounded-xl bg-stone-900/60 flex items-center justify-center`}>
                        <Icon className={`w-6 h-6 ${arg.iconColor}`} />
                      </div>
                      <span className="text-xs text-stone-400 tracking-wide uppercase font-semibold">
                        {arg.subtitle}
                      </span>
                    </div>

                    <h3 className="text-lg md:text-xl font-semibold text-stone-100 leading-snug mb-3">
                      {arg.title}
                    </h3>

                    <p className="text-stone-300 text-sm leading-relaxed mb-4">
                      {arg.description}
                    </p>

                    {/* Expand button */}
                    <button
                      onClick={() => setExpandedId(isExpanded ? null : arg.id)}
                      className="flex items-center gap-2 text-sm text-amber-400 hover:text-amber-300 transition-colors mt-2"
                    >
                      <span>{isExpanded ? 'Ver menos' : 'Leer detalles y citas'}</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-300 ${
                          isExpanded ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                  </div>

                  {/* Expandable content */}
                  <div
                    className={`grid transition-all duration-500 ${
                      isExpanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-6 md:px-7 pb-6">
                        <div className="border-t border-stone-700/40 pt-5">
                          <p className="text-stone-300 text-sm leading-relaxed mb-4">
                            {arg.details}
                          </p>
                          <div className="relative p-4 rounded-xl bg-stone-950/40 border border-stone-700/30">
                            <Quote className="w-5 h-5 text-stone-600 absolute top-3 left-3" />
                            <blockquote className="text-stone-200 italic font-serif pl-7 text-sm">
                              {arg.quote}
                            </blockquote>
                            <p className="text-xs text-stone-500 mt-2 pl-7">
                              — {arg.author}
                            </p>
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
