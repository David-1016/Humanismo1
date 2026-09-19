import { ArrowUp, Heart, GraduationCap } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface ConclusionProps {
  onNavigate: (section: string) => void;
}

const teamMembers = [
  { name: 'Juan Pablo Bayona', role: 'Investigación y análisis' },
  { name: 'Michael Garcia Niño', role: 'Síntesis y argumentación' },
  { name: 'David Fernando Gómez', role: 'Diseño y presentación' },
];

export function Conclusion({ onNavigate }: ConclusionProps) {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

  return (
    <section
      id="conclusion"
      className="relative py-24 md:py-32 bg-stone-950 bg-grain overflow-hidden"
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.pexels.com/photos/14955151/pexels-photo-14955151.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="Multitud de personas en entorno urbano"
          className="w-full h-full object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-stone-950 via-stone-950/90 to-stone-950" />
      </div>

      <div ref={ref} className="relative z-10 max-w-5xl mx-auto px-6">
        {/* Call to action */}
        <div className={`reveal ${isVisible ? 'is-visible' : ''} text-center mb-20`}>
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-12 bg-amber-600" />
            <span className="text-amber-500 text-sm tracking-[0.3em] uppercase font-semibold">
              Conclusión
            </span>
            <div className="h-px w-12 bg-amber-600" />
          </div>

          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-stone-50 leading-tight mb-8 text-balance">
            El Humanismo Hoy:
            <br />
            <span className="text-amber-500">Un Compromiso Vivo</span>
          </h2>

          <div className="max-w-3xl mx-auto space-y-5 text-lg text-stone-300 leading-relaxed">
            <p>
              El humanismo no es una idea del pasado ni un ejercicio académico
              desconectado de la realidad. Es una llamada a reconocer que cada
              persona es un agente capaz de transformar su entorno, de superar el
              facilismo y de construir pensamiento crítico desde y para su
              comunidad.
            </p>
            <p>
              Como dijo Zuleta, la dificultad no es un enemigo: es la condición
              de nuestro crecimiento. Como mostró Gramsci a través de Crehan, el
              intelectual emerge del pueblo y vuelve a él. Como propuso Rincón
              Díaz, el conocimiento se construye con la comunidad, no sobre ella.
            </p>
            <p className="text-xl text-amber-300 font-serif italic">
              La pregunta no es si el mundo cambiará. La pregunta es si
              participaremos en ese cambio o lo miraremos pasar.
            </p>
          </div>

          <button
            onClick={() => onNavigate('postura')}
            className="mt-10 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-amber-600 hover:bg-amber-500 text-stone-950 font-semibold transition-all duration-300 hover:scale-105"
          >
            Volver al inicio
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

        {/* Credits */}
        <div className={`reveal ${isVisible ? 'is-visible' : ''}`}>
          <div className="border-t border-stone-700/40 pt-12">
            <div className="flex items-center justify-center gap-3 mb-8">
              <GraduationCap className="w-6 h-6 text-amber-500" />
              <h3 className="text-xl font-semibold text-stone-200">
                Créditos del Equipo
              </h3>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {teamMembers.map((member, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-stone-900/50 border border-stone-700/30 text-center hover:border-amber-700/40 transition-all duration-300"
                >
                  <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-gradient-to-br from-amber-700/30 to-stone-800 flex items-center justify-center">
                    <span className="text-lg font-bold text-amber-400">
                      {idx + 1}
                    </span>
                  </div>
                  <p className="text-stone-200 font-semibold text-sm">
                    {member.name}
                  </p>
                  <p className="text-stone-500 text-xs mt-1">{member.role}</p>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-center gap-2 mt-10 text-stone-500 text-sm">
              <span>Hecho con</span>
              <Heart className="w-4 h-4 text-amber-500" />
              <span>para el pensamiento crítico</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
