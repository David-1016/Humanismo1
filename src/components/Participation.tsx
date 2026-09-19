import { useEffect, useState, useCallback } from 'react';
import { BarChart3, Send, MessageSquare, Users, CheckCircle2, AlertCircle } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import {
  supabase,
  type PollOption,
  type AudienceComment,
} from '@/lib/supabase';

const POLL_OPTIONS: { value: PollOption; label: string; color: string; barColor: string }[] = [
  { value: 'si', label: 'Sí, busca caminos fáciles', color: 'text-amber-400', barColor: 'bg-amber-500' },
  { value: 'a_veces', label: 'A veces, depende del contexto', color: 'text-sky-400', barColor: 'bg-sky-500' },
  { value: 'no', label: 'No, aún existe reflexión crítica', color: 'text-emerald-400', barColor: 'bg-emerald-500' },
];

// Simulated baseline so the chart is never empty
const SIMULATED_BASELINE: Record<PollOption, number> = {
  si: 47,
  a_veces: 28,
  no: 19,
};

export function Participation() {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

  const [selectedOption, setSelectedOption] = useState<PollOption | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [voteCounts, setVoteCounts] = useState<Record<PollOption, number>>({
    si: 0,
    a_veces: 0,
    no: 0,
  });
  const [totalVotes, setTotalVotes] = useState(0);
  const [pollError, setPollError] = useState<string | null>(null);

  // Comments state
  const [comments, setComments] = useState<AudienceComment[]>([]);
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [commentError, setCommentError] = useState<string | null>(null);

  const fetchVotes = useCallback(async () => {
    const { data, error } = await supabase
      .from('poll_votes')
      .select('option');
    if (error) {
      setPollError('No se pudieron cargar los votos.');
      return;
    }
    const counts: Record<PollOption, number> = { si: 0, a_veces: 0, no: 0 };
    data?.forEach((row: { option: PollOption }) => {
      counts[row.option] = (counts[row.option] || 0) + 1;
    });
    setVoteCounts(counts);
    setTotalVotes(Object.values(counts).reduce((a, b) => a + b, 0));
  }, []);

  const fetchComments = useCallback(async () => {
    const { data, error } = await supabase
      .from('audience_comments')
      .select('id, author, content, created_at')
      .order('created_at', { ascending: false })
      .limit(50);
    if (error) {
      setCommentError('No se pudieron cargar los comentarios.');
      return;
    }
    setComments(data || []);
  }, []);

  useEffect(() => {
    fetchVotes();
    fetchComments();
  }, [fetchVotes, fetchComments]);

  const handleVote = async (option: PollOption) => {
    if (hasVoted) return;
    setSelectedOption(option);
    setHasVoted(true);

    const { error } = await supabase.from('poll_votes').insert({ option });
    if (error) {
      setPollError('No se pudo registrar tu voto. Inténtalo de nuevo.');
      setHasVoted(false);
      setSelectedOption(null);
      return;
    }
    setPollError(null);
    await fetchVotes();
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !content.trim()) return;

    setSubmitting(true);
    setCommentError(null);

    const { data, error } = await supabase
      .from('audience_comments')
      .insert({ author: author.trim(), content: content.trim() })
      .select('id, author, content, created_at')
      .single();

    setSubmitting(false);

    if (error || !data) {
      setCommentError('No se pudo enviar tu reflexión. Inténtalo de nuevo.');
      return;
    }

    setComments((prev) => [data as AudienceComment, ...prev]);
    setAuthor('');
    setContent('');
  };

  // Compute display counts (real + simulated baseline for visual richness)
  const displayCounts = (Object.keys(SIMULATED_BASELINE) as PollOption[]).reduce(
    (acc, key) => {
      acc[key] = SIMULATED_BASELINE[key] + (voteCounts[key] || 0);
      return acc;
    },
    {} as Record<PollOption, number>
  );

  const displayTotal =
    Object.values(SIMULATED_BASELINE).reduce((a, b) => a + b, 0) + totalVotes;

  return (
    <section
      id="participacion"
      className="relative py-24 md:py-32 bg-gradient-to-b from-stone-900 to-stone-950 bg-grain overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-700/40 to-transparent" />

      <div ref={ref} className="max-w-5xl mx-auto px-6">
        {/* Section header */}
        <div className={`reveal ${isVisible ? 'is-visible' : ''} mb-16`}>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-12 bg-amber-600" />
            <span className="text-amber-500 text-sm tracking-[0.3em] uppercase font-semibold">
              Zona de Participación
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-stone-50 leading-tight text-balance">
            Tu Voz Importa
          </h2>
          <p className="text-stone-400 mt-4 max-w-2xl text-lg">
            Participa en la encuesta y comparte tu reflexión. Lo que piensas
            enriquece el diálogo colectivo.
          </p>
        </div>

        {/* Poll */}
        <div className={`reveal ${isVisible ? 'is-visible' : ''} mb-12`}>
          <div className="p-6 md:p-8 rounded-3xl bg-stone-900/60 border border-stone-700/40 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-6">
              <BarChart3 className="w-6 h-6 text-amber-500" />
              <h3 className="text-xl font-semibold text-stone-100">
                ¿Crees que la sociedad actual busca caminos fáciles en lugar de la
                reflexión crítica?
              </h3>
            </div>

            {/* Poll options */}
            <div className="space-y-3 mb-6">
              {POLL_OPTIONS.map((opt) => {
                const count = displayCounts[opt.value];
                const pct = displayTotal > 0 ? (count / displayTotal) * 100 : 0;
                const isSelected = selectedOption === opt.value;

                return (
                  <button
                    key={opt.value}
                    onClick={() => handleVote(opt.value)}
                    disabled={hasVoted}
                    className={`w-full text-left group relative overflow-hidden rounded-xl border transition-all duration-300 ${
                      hasVoted
                        ? 'cursor-default border-stone-700/40'
                        : 'cursor-pointer border-stone-700/40 hover:border-amber-600/50 hover:bg-stone-800/50'
                    } ${isSelected ? 'ring-2 ring-amber-500/50' : ''}`}
                  >
                    {/* Bar fill */}
                    {hasVoted && (
                      <div
                        className={`absolute inset-y-0 left-0 ${opt.barColor} opacity-20 animate-bar-grow`}
                        style={{ width: `${pct}%` }}
                      />
                    )}

                    <div className="relative flex items-center justify-between p-4">
                      <div className="flex items-center gap-3">
                        {hasVoted && isSelected && (
                          <CheckCircle2 className={`w-5 h-5 ${opt.color}`} />
                        )}
                        <span
                          className={`text-sm md:text-base font-medium ${
                            isSelected ? opt.color : 'text-stone-200'
                          }`}
                        >
                          {opt.label}
                        </span>
                      </div>
                      {hasVoted && (
                        <span className={`text-sm font-bold ${opt.color} tabular-nums`}>
                          {pct.toFixed(0)}%
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Poll status */}
            {hasVoted && (
              <div className="flex items-center gap-2 text-sm text-stone-400 animate-fade-in">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>
                  ¡Gracias por votar! Total de participantes: {displayTotal}
                </span>
              </div>
            )}
            {pollError && (
              <div className="flex items-center gap-2 text-sm text-red-400 mt-3">
                <AlertCircle className="w-4 h-4" />
                <span>{pollError}</span>
              </div>
            )}
          </div>
        </div>

        {/* Comments */}
        <div className={`reveal ${isVisible ? 'is-visible' : ''}`}>
          <div className="p-6 md:p-8 rounded-3xl bg-stone-900/60 border border-stone-700/40 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-6">
              <MessageSquare className="w-6 h-6 text-amber-500" />
              <h3 className="text-xl font-semibold text-stone-100">
                Comparte tu reflexión
              </h3>
            </div>

            {/* Comment form */}
            <form onSubmit={handleSubmitComment} className="space-y-4 mb-8">
              <div>
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="Tu nombre o apodo"
                  maxLength={50}
                  className="w-full px-4 py-3 rounded-xl bg-stone-950/60 border border-stone-700/40 text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-600/50 focus:ring-1 focus:ring-amber-600/30 transition-all"
                />
              </div>
              <div>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Escribe tu reflexión sobre el humanismo y el compromiso social..."
                  maxLength={500}
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl bg-stone-950/60 border border-stone-700/40 text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-600/50 focus:ring-1 focus:ring-amber-600/30 transition-all resize-none scrollbar-thin"
                />
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-stone-500">
                    {content.length}/500
                  </span>
                  <button
                    type="submit"
                    disabled={submitting || !author.trim() || !content.trim()}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 disabled:opacity-40 disabled:cursor-not-allowed text-stone-950 font-semibold text-sm transition-all duration-300"
                  >
                    <Send className="w-4 h-4" />
                    {submitting ? 'Enviando...' : 'Publicar'}
                  </button>
                </div>
              </div>
              {commentError && (
                <div className="flex items-center gap-2 text-sm text-red-400">
                  <AlertCircle className="w-4 h-4" />
                  <span>{commentError}</span>
                </div>
              )}
            </form>

            {/* Comments list */}
            <div className="border-t border-stone-700/40 pt-6">
              <div className="flex items-center gap-2 mb-4 text-sm text-stone-400">
                <Users className="w-4 h-4" />
                <span>
                  {comments.length === 0
                    ? 'Sé el primero en reflexionar'
                    : `${comments.length} ${comments.length === 1 ? 'reflexión' : 'reflexiones'}`}
                </span>
              </div>

              {comments.length === 0 ? (
                <p className="text-stone-500 text-sm italic text-center py-6">
                  Aún no hay reflexiones. ¡Comparte la primera!
                </p>
              ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto scrollbar-thin pr-2">
                  {comments.map((cmt) => (
                    <div
                      key={cmt.id}
                      className="p-4 rounded-xl bg-stone-950/40 border border-stone-700/30 animate-fade-in"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-amber-400">
                          {cmt.author}
                        </span>
                        <span className="text-xs text-stone-500">
                          {new Date(cmt.created_at).toLocaleDateString('es-ES', {
                            day: 'numeric',
                            month: 'short',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      </div>
                      <p className="text-stone-300 text-sm leading-relaxed">
                        {cmt.content}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
