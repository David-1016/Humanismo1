import { useState } from 'react';
import { User, ArrowRight, ArrowDown, Eye, Brain, Sparkles, RefreshCw } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export function Postulate() {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();
  const [activeNode, setActiveNode] = useState<number>(0);

  const nodes = [
    {
      icon: Eye,
      title: 'El Espectador Pasivo',
      description:
        'Acepta la realidad tal como se le presenta. Vive bajo el sentido común dogmático, sin cuestionar las estructuras que lo rodean.',
      color: 'text-stone-400',
      bg: 'bg-stone-800/60',
      border: 'border-stone-600',
    },
    {
      icon: Brain,
      title: 'El Sentido Común Dogmático',
      description:
        'Herencia de creencias no examinadas. Se conforma con lo establecido, evitando el conflicto y la reflexión profunda.',
      color: 'text-amber-500',
      bg: 'bg-amber-900/30',
      border: 'border-amber-700/50',
    },
    {
      icon: Sparkles,
      title: 'El Agente de Transformación',
      description:
        'Supera el facilismo. Asume una filosofía de vida comprometida. Convierte la dificultad en motor del pensamiento crítico y la acción.',
      color: 'text-emerald-400',
      bg: 'bg-emerald-900/30',
      border: 'border-emerald-700/50',
    },
  ];

  return (
    <section id="postura" className="relative py-24 md:py-32 bg-stone-950 bg-grain overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-700/40 to-transparent" />

      <div
        ref={ref}
        className={`max-w-6xl mx-auto px-6 ${isVisible ? 'is-visible' : ''}`}
      >
        {/* Section header */}
        <div className={`reveal ${isVisible ? 'is-visible' : ''} mb-16`}>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-12 bg-amber-600" />
            <span className="text-amber-500 text-sm tracking-[0.3em] uppercase font-semibold">
              La Postura del Equipo
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-stone-50 leading-tight max-w-3xl text-balance">
            Tesis Central
          </h2>
        </div>

        {/* Main thesis card */}
        <div className={`reveal ${isVisible ? 'is-visible' : ''} mb-16`}>
          <div className="relative p-8 md:p-12 rounded-3xl bg-gradient-to-br from-stone-900 via-stone-900 to-amber-950/30 border border-stone-700/50 overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-600/5 rounded-full blur-3xl" />
            <div className="relative">
              <User className="w-10 h-10 text-amber-500 mb-6" />
              <p className="text-xl md:text-2xl lg:text-3xl text-stone-100 leading-relaxed font-serif">
                "El ser humano no es un{' '}
                <span className="text-stone-500 line-through decoration-stone-600">
                  espectador pasivo
                </span>
                , sino un{' '}
                <span className="text-amber-400 font-semibold">
                  agente de transformación crítica
                </span>{' '}
                que debe superar el facilismo y el sentido común dogmático a través
                de una{' '}
                <span className="text-emerald-400 font-semibold">
                  filosofía de vida comprometida
                </span>
                ."
              </p>
            </div>
          </div>
        </div>

        {/* Interactive diagram */}
        <div className={`reveal ${isVisible ? 'is-visible' : ''}`}>
          <h3 className="text-xl md:text-2xl text-stone-200 font-semibold mb-8 text-center">
            La Relación entre Hombre y Sociedad
          </h3>

          {/* Diagram flow */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-2 mb-12">
            {nodes.map((node, idx) => {
              const Icon = node.icon;
              const isActive = activeNode === idx;
              return (
                <div key={idx} className="flex flex-col md:flex-row items-center gap-4 md:gap-2">
                  <button
                    onClick={() => setActiveNode(idx)}
                    className={`relative w-40 h-40 md:w-36 md:h-36 rounded-2xl border-2 flex flex-col items-center justify-center gap-3 transition-all duration-500 ${
                      isActive
                        ? `${node.bg} ${node.border} scale-105 shadow-2xl`
                        : 'bg-stone-900/50 border-stone-700/30 hover:border-stone-600'
                    }`}
                  >
                    <Icon
                      className={`w-8 h-8 transition-colors duration-300 ${
                        isActive ? node.color : 'text-stone-500'
                      }`}
                    />
                    <span
                      className={`text-xs font-semibold text-center px-2 transition-colors duration-300 ${
                        isActive ? 'text-stone-100' : 'text-stone-500'
                      }`}
                    >
                      {node.title}
                    </span>
                  </button>
                  {idx < nodes.length - 1 && (
                    <div className="flex items-center">
                      <ArrowRight className="w-6 h-6 text-stone-600 hidden md:block" />
                      <ArrowDown className="w-6 h-6 text-stone-600 md:hidden" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Active node description */}
          <div className="max-w-2xl mx-auto p-6 md:p-8 rounded-2xl bg-stone-900/60 border border-stone-700/40 animate-fade-in" key={activeNode}>
            <div className="flex items-center gap-3 mb-3">
              {(() => {
                const Icon = nodes[activeNode].icon;
                return <Icon className={`w-6 h-6 ${nodes[activeNode].color}`} />;
              })()}
              <h4 className="text-lg font-semibold text-stone-100">
                {nodes[activeNode].title}
              </h4>
            </div>
            <p className="text-stone-300 leading-relaxed">
              {nodes[activeNode].description}
            </p>
          </div>

          {/* Reset button */}
          <div className="text-center mt-6">
            <button
              onClick={() => setActiveNode(0)}
              className="inline-flex items-center gap-2 text-sm text-stone-500 hover:text-amber-500 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Reiniciar recorrido
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
