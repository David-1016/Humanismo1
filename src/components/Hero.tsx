import { useState } from 'react';
import { Sparkles, ChevronDown, BookOpen, Users, Lightbulb, MessageCircle, ArrowDown } from 'lucide-react';

interface HeroProps {
  onNavigate: (section: string) => void;
}

export function Hero({ onNavigate }: HeroProps) {
  const [revealed, setRevealed] = useState(false);

  const navItems = [
    { id: 'postura', label: 'Postura', icon: Lightbulb },
    { id: 'lecturas', label: 'Lecturas', icon: BookOpen },
    { id: 'argumentos', label: 'Argumentos', icon: Users },
    { id: 'participacion', label: 'Participa', icon: MessageCircle },
  ];

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-grain">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.pexels.com/photos/442420/books-shelves-architecture-wood-442420.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="Biblioteca antigua con estanterías de madera"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-stone-950/80 via-stone-900/85 to-stone-950/95" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 w-full">
        <div className="animate-fade-in-slow">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-amber-600" />
            <span className="text-amber-500 text-sm tracking-[0.3em] uppercase font-semibold">
              Actividad Humanismo
            </span>
            
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] text-balance mb-6 text-stone-50">
            Humanismo y la Relación
            <br />
            <span className="text-amber-500">entre Hombre y Sociedad</span>
          </h1>
          {/* Navigation pills */}
          <div className="flex flex-wrap gap-3 mb-12">
            {navItems.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => onNavigate(id)}
                className="group flex items-center gap-2 px-4 py-2.5 rounded-full bg-stone-800/60 backdrop-blur-sm border border-stone-700/50 text-stone-300 hover:bg-amber-900/30 hover:border-amber-600/50 hover:text-amber-300 transition-all duration-300"
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm font-medium">{label}</span>
              </button>
            ))}
          </div>

          <p className="text-lg md:text-xl text-stone-300 max-w-2xl leading-relaxed mb-10">
            Una exploración crítica sobre el compromiso del ser humano como agente
            de transformación, no como espectador pasivo de su realidad.
          </p>

          

          {/* Reveal contradiction card */}
          <div className="max-w-2xl">
            {!revealed ? (
              <button
                onClick={() => setRevealed(true)}
                className="group flex items-center gap-4 p-5 rounded-2xl bg-gradient-to-r from-amber-900/40 to-stone-900/40 border border-amber-700/40 hover:border-amber-500/60 transition-all duration-500 animate-pulse-glow w-full text-left"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-amber-600/20 flex items-center justify-center group-hover:bg-amber-500/30 transition-colors duration-300">
                  <Sparkles className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <p className="text-amber-300 font-semibold text-sm tracking-wide uppercase">
                    Toca para revelar
                  </p>
                  <p className="text-stone-200 text-base mt-0.5">
                    Una contradicción de la sociedad actual
                  </p>
                </div>
                <ChevronDown className="w-5 h-5 text-amber-400 ml-auto group-hover:translate-y-1 transition-transform duration-300" />
              </button>
            ) : (
              <div className="animate-fade-in p-6 rounded-2xl bg-gradient-to-br from-stone-900/80 to-amber-950/40 border border-amber-700/40 backdrop-blur-sm">
                <div className="flex items-start gap-3 mb-3">
                  <Sparkles className="w-5 h-5 text-amber-400 flex-shrink-0 mt-1" />
                  <p className="text-xs text-amber-400 tracking-[0.2em] uppercase font-semibold">
                    Contradicción revelada
                  </p>
                </div>
                <blockquote className="text-lg md:text-xl text-stone-100 leading-relaxed italic font-serif">
                  "Vivimos en la era de más información y menos reflexión; de más
                  conexiones y menos compromiso. Buscamos vidas sin dificultad, pero
                  es precisamente en la dificultad donde se forja el pensamiento
                  crítico que nos hace verdaderamente humanos."
                </blockquote>
                <button
                  onClick={() => setRevealed(false)}
                  className="mt-4 text-sm text-amber-500 hover:text-amber-400 transition-colors"
                >
                  Ocultar ←
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-stone-500">
        <span className="text-xs tracking-[0.2em] uppercase">Desliza</span>
        <ArrowDown className="w-4 h-4 animate-bounce" />
      </div>
    </section>
  );
}
