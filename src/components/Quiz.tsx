import { useState, useEffect, useCallback, useRef } from 'react';
import {
  Brain,
  Clock,
  CheckCircle2,
  XCircle,
  Lightbulb,
  Flame,
  Trophy,
  RotateCcw,
  ChevronRight,
  Sparkles,
  Eye,
  Award,
  ListChecks,
} from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import {
  quizQuestions,
  bonusQuestion,
  type QuizQuestion,
} from '@/data/quizQuestions';

type Phase = 'intro' | 'playing' | 'feedback' | 'bonus' | 'bonusFeedback' | 'results';

interface AnswerRecord {
  question: QuizQuestion;
  selectedIndex: number | null;
  isCorrect: boolean;
  timeLeft: number;
}

const QUESTION_TIME = 30;
const BASE_POINTS = 100;
const SPEED_BONUS = 50;
const STREAK_BONUS = 30;

function shuffleArray<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function getProfile(pct: number): { title: string; description: string; icon: typeof Trophy; color: string } {
  if (pct <= 40) {
    return {
      title: 'Pensador en Formación',
      description:
        'Estás comenzando tu camino. Vuelve a revisar las lecturas y reinténtalo: la dificultad es parte del aprendizaje.',
      icon: Brain,
      color: 'text-amber-400',
    };
  }
  if (pct <= 70) {
    return {
      title: 'Intelectual en Camino',
      description:
        'Tienes una base sólida. Profundiza en los autores y su relación con la realidad social para llegar más lejos.',
      icon: Lightbulb,
      color: 'text-sky-400',
    };
  }
  return {
    title: 'Intelectual Orgánico',
    description:
      'Has demostrado un dominio del pensamiento crítico y la relación entre teoría y praxis. Como diría Gramsci: articulas el espíritu creativo del pueblo.',
    icon: Award,
    color: 'text-emerald-400',
  };
}

export function Quiz() {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

  const [phase, setPhase] = useState<Phase>('intro');
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [answers, setAnswers] = useState<AnswerRecord[]>([]);
  const [showHint, setShowHint] = useState(false);
  const [bonusTriggered, setBonusTriggered] = useState(false);
  const [bonusAnswer, setBonusAnswer] = useState<AnswerRecord | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [shuffledOptions, setShuffledOptions] = useState<{ text: string; originalIndex: number }[]>([]);
  const [opinionVotes, setOpinionVotes] = useState<Record<number, number[]>>({});
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const currentQuestion = phase === 'bonus' || phase === 'bonusFeedback' ? bonusQuestion : questions[currentIndex];

  // Shuffle options for current question
  useEffect(() => {
    if (!currentQuestion) return;
    const opts = currentQuestion.options.map((text, originalIndex) => ({
      text,
      originalIndex,
    }));
    setShuffledOptions(shuffleArray(opts));
  }, [currentQuestion]);

  // Timer
  useEffect(() => {
    if (phase !== 'playing' && phase !== 'bonus') return;
    if (timeLeft <= 0) {
      handleTimeout();
      return;
    }
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [phase, timeLeft]);

  const handleTimeout = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (phase === 'playing') {
      const q = questions[currentIndex];
      if (q.isOpinion) {
        recordAnswer(q, selectedIndex, true, 0);
      } else {
        recordAnswer(q, null, false, 0);
      }
      setPhase('feedback');
    } else if (phase === 'bonus') {
      recordBonusAnswer(null, false, 0);
      setPhase('bonusFeedback');
    }
  };

  const recordAnswer = useCallback(
    (q: QuizQuestion, selected: number | null, isCorrect: boolean, time: number) => {
      setAnswers((prev) => [...prev, { question: q, selectedIndex: selected, isCorrect, timeLeft: time }]);
      if (isCorrect && !q.isOpinion) {
        let earned = BASE_POINTS;
        if (time > 20) earned += SPEED_BONUS;
        const newStreak = streak + 1;
        if (newStreak >= 3) earned += STREAK_BONUS;
        setStreak(newStreak);
        setMaxStreak((m) => Math.max(m, newStreak));
        setScore((s) => s + earned);
      } else if (!q.isOpinion) {
        setStreak(0);
      }
    },
    [streak]
  );

  const recordBonusAnswer = (selected: number | null, isCorrect: boolean, time: number) => {
    const record: AnswerRecord = {
      question: bonusQuestion,
      selectedIndex: selected,
      isCorrect,
      timeLeft: time,
    };
    setBonusAnswer(record);
    if (isCorrect) {
      let earned = 200;
      if (time > 20) earned += 100;
      setScore((s) => s + earned);
    }
  };

  const handleSelect = (originalIndex: number) => {
    if (phase === 'playing' && selectedIndex !== null) return;
    if (phase === 'bonus' && selectedIndex !== null) return;
    setSelectedIndex(originalIndex);

    if (timerRef.current) clearInterval(timerRef.current);

    const q = phase === 'bonus' ? bonusQuestion : questions[currentIndex];
    const time = timeLeft;

    if (q.isOpinion) {
      // Record opinion vote
      setOpinionVotes((prev) => {
        const existing = prev[q.id] || new Array(q.options.length).fill(0);
        const updated = [...existing];
        updated[originalIndex] = (updated[originalIndex] || 0) + 1;
        return { ...prev, [q.id]: updated };
      });
      recordAnswer(q, originalIndex, true, time);
      setPhase('feedback');
      return;
    }

    const isCorrect = originalIndex === q.correctIndex;
    recordAnswer(q, originalIndex, isCorrect, time);

    if (phase === 'bonus') {
      setPhase('bonusFeedback');
    } else {
      setPhase('feedback');
    }
  };

  const handleNext = () => {
    // Check if we should trigger bonus (5 correct in a row, not yet triggered)
    const currentStreak = streak;
    if (!bonusTriggered && currentStreak >= 5 && currentIndex < questions.length - 1) {
      setBonusTriggered(true);
      setSelectedIndex(null);
      setTimeLeft(QUESTION_TIME);
      setShowHint(false);
      setPhase('bonus');
      return;
    }

    if (currentIndex < questions.length - 1) {
      setCurrentIndex((i) => i + 1);
      setSelectedIndex(null);
      setTimeLeft(QUESTION_TIME);
      setShowHint(false);
      setPhase('playing');
    } else {
      // Compute final
      const correctCount = answers.filter((a) => a.isCorrect && !a.question.isOpinion).length;
      const gradableTotal = questions.filter((q) => !q.isOpinion).length;
      const pct = gradableTotal > 0 ? Math.round((correctCount / gradableTotal) * 100) : 0;
      if (pct >= 71) setShowConfetti(true);
      setPhase('results');
    }
  };

  const startQuiz = () => {
    const shuffled = shuffleArray(quizQuestions);
    setQuestions(shuffled);
    setCurrentIndex(0);
    setSelectedIndex(null);
    setTimeLeft(QUESTION_TIME);
    setScore(0);
    setStreak(0);
    setMaxStreak(0);
    setAnswers([]);
    setShowHint(false);
    setBonusTriggered(false);
    setBonusAnswer(null);
    setShowConfetti(false);
    setOpinionVotes({});
    setPhase('playing');
  };

  const restartQuiz = () => {
    setPhase('intro');
  };

  const progressPct =
    questions.length > 0 ? ((currentIndex + (phase === 'feedback' ? 1 : 0)) / questions.length) * 100 : 0;

  // === INTRO SCREEN ===
  if (phase === 'intro') {
    return (
      <section id="quiz" className="relative py-24 md:py-32 bg-stone-950 bg-grain overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-700/40 to-transparent" />
        <div ref={ref} className={`max-w-4xl mx-auto px-6 ${isVisible ? 'is-visible' : ''}`}>
          <div className={`reveal ${isVisible ? 'is-visible' : ''} text-center`}>
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-12 bg-amber-600" />
              <span className="text-amber-500 text-sm tracking-[0.3em] uppercase font-semibold">
                Pon a prueba tu pensamiento
              </span>
              <div className="h-px w-12 bg-amber-600" />
            </div>
            <div className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-amber-700/30 to-stone-800 flex items-center justify-center">
              <Brain className="w-10 h-10 text-amber-400" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-stone-50 leading-tight mb-4 text-balance">
              Quiz: ¿Cuánto entendiste?
            </h2>
            <p className="text-stone-400 max-w-2xl mx-auto text-lg mb-8">
              12 preguntas basadas en las cuatro lecturas clave. Pon a prueba tu
              comprensión del humanismo, el intelectualismo y el compromiso social.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl mx-auto mb-10">
              <div className="p-4 rounded-2xl bg-stone-900/60 border border-stone-700/40">
                <Brain className="w-6 h-6 text-amber-400 mx-auto mb-2" />
                <p className="text-sm text-stone-300 font-semibold">12 preguntas</p>
              </div>
              <div className="p-4 rounded-2xl bg-stone-900/60 border border-stone-700/40">
                <Clock className="w-6 h-6 text-sky-400 mx-auto mb-2" />
                <p className="text-sm text-stone-300 font-semibold">30 seg/pregunta</p>
              </div>
              <div className="p-4 rounded-2xl bg-stone-900/60 border border-stone-700/40">
                <Flame className="w-6 h-6 text-orange-400 mx-auto mb-2" />
                <p className="text-sm text-stone-300 font-semibold">Bonus por racha</p>
              </div>
              <div className="p-4 rounded-2xl bg-stone-900/60 border border-stone-700/40">
                <Sparkles className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
                <p className="text-sm text-stone-300 font-semibold">Pregunta oculta</p>
              </div>
            </div>

            <button
              onClick={startQuiz}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-lg transition-all duration-300 hover:scale-105 animate-pulse-glow"
            >
              Comenzar Quiz
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>
    );
  }

  // === RESULTS SCREEN ===
  if (phase === 'results') {
    const gradableAnswers = answers.filter((a) => !a.question.isOpinion);
    const correctCount = gradableAnswers.filter((a) => a.isCorrect).length;
    const gradableTotal = gradableAnswers.length;
    const pct = gradableTotal > 0 ? Math.round((correctCount / gradableTotal) * 100) : 0;
    const profile = getProfile(pct);
    const wrongAnswers = gradableAnswers.filter((a) => !a.isCorrect);
    const ProfileIcon = profile.icon;

    return (
      <section id="quiz" className="relative py-24 md:py-32 bg-stone-950 bg-grain overflow-hidden">
        {showConfetti && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
            {Array.from({ length: 50 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-3 h-3 rounded-full animate-fade-in"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  backgroundColor: ['#f59e0b', '#10b981', '#0ea5e9', '#f97316', '#eab308'][i % 5],
                  animation: `fadeIn ${0.5 + Math.random()}s ease-out ${Math.random() * 2}s forwards alternate`,
                  opacity: 0,
                }}
              />
            ))}
          </div>
        )}
        <div ref={ref} className={`max-w-3xl mx-auto px-6 ${isVisible ? 'is-visible' : ''}`}>
          <div className={`reveal ${isVisible ? 'is-visible' : ''} text-center`}>
            <div className="w-24 h-24 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-amber-700/30 to-stone-800 flex items-center justify-center">
              <ProfileIcon className={`w-12 h-12 ${profile.color}`} />
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-stone-50 mb-2">
              {profile.title}
            </h2>
            <p className="text-stone-400 max-w-xl mx-auto mb-8">{profile.description}</p>

            {/* Score card */}
            <div className="p-6 md:p-8 rounded-3xl bg-stone-900/60 border border-stone-700/40 backdrop-blur-sm mb-6">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Trophy className="w-6 h-6 text-amber-500" />
                <span className="text-stone-300 font-semibold">Tu puntaje</span>
              </div>
              <p className="text-5xl md:text-6xl font-bold text-amber-400 mb-2 tabular-nums">
                {score}
              </p>
              <div className="flex items-center justify-center gap-6 mt-4">
                <div>
                  <p className="text-2xl font-bold text-emerald-400 tabular-nums">
                    {correctCount}
                  </p>
                  <p className="text-xs text-stone-500">Correctas</p>
                </div>
                <div className="w-px h-10 bg-stone-700" />
                <div>
                  <p className="text-2xl font-bold text-red-400 tabular-nums">
                    {gradableTotal - correctCount}
                  </p>
                  <p className="text-xs text-stone-500">Incorrectas</p>
                </div>
                <div className="w-px h-10 bg-stone-700" />
                <div>
                  <p className="text-2xl font-bold text-amber-400 tabular-nums">{pct}%</p>
                  <p className="text-xs text-stone-500">Acierto</p>
                </div>
              </div>
              {maxStreak >= 3 && (
                <div className="flex items-center justify-center gap-2 mt-4 text-sm text-orange-400">
                  <Flame className="w-4 h-4" />
                  <span>Mejor racha: {maxStreak} seguidas</span>
                </div>
              )}
              {bonusAnswer && (
                <div className="flex items-center justify-center gap-2 mt-2 text-sm text-emerald-400">
                  <Sparkles className="w-4 h-4" />
                  <span>
                    Pregunta bonus: {bonusAnswer.isCorrect ? 'Acertada' : 'Fallida'}
                  </span>
                </div>
              )}
            </div>

            {/* Wrong answers summary */}
            {wrongAnswers.length > 0 && (
              <div className="p-6 rounded-3xl bg-stone-900/40 border border-stone-700/30 mb-6 text-left">
                <div className="flex items-center gap-2 mb-4">
                  <ListChecks className="w-5 h-5 text-amber-500" />
                  <h3 className="text-lg font-semibold text-stone-200">
                    Resumen de respuestas incorrectas
                  </h3>
                </div>
                <div className="space-y-3 max-h-64 overflow-y-auto scrollbar-thin pr-2">
                  {wrongAnswers.map((ans, i) => (
                    <div key={i} className="p-3 rounded-xl bg-stone-950/40 border border-red-900/30">
                      <p className="text-sm text-stone-300 font-medium mb-1">
                        {ans.question.question}
                      </p>
                      {ans.selectedIndex !== null && (
                        <p className="text-xs text-red-400 mb-1">
                          Tu respuesta: {ans.question.options[ans.selectedIndex]}
                        </p>
                      )}
                      <p className="text-xs text-emerald-400">
                        Correcta: {ans.question.options[ans.question.correctIndex ?? 0]}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={startQuiz}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-semibold transition-all duration-300 hover:scale-105"
            >
              <RotateCcw className="w-5 h-5" />
              Reintentar
            </button>
          </div>
        </div>
      </section>
    );
  }

  // === PLAYING / FEEDBACK / BONUS / BONUS FEEDBACK ===
  const isBonusPhase = phase === 'bonus' || phase === 'bonusFeedback';
  const isFeedbackPhase = phase === 'feedback' || phase === 'bonusFeedback';
  const q = currentQuestion;
  if (!q) return null;

  const isOpinion = q.isOpinion;
  const isCorrect = isFeedbackPhase
    ? isBonusPhase
      ? bonusAnswer?.isCorrect ?? false
      : answers[answers.length - 1]?.isCorrect ?? false
    : false;

  // Opinion vote percentages
  const votes = opinionVotes[q.id] || new Array(q.options.length).fill(0);
  const totalVotes = votes.reduce((a, b) => a + b, 0) || 1;

  return (
    <section id="quiz" className="relative py-20 md:py-28 bg-stone-950 bg-grain overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-700/40 to-transparent" />
      <div ref={ref} className={`max-w-3xl mx-auto px-6 ${isVisible ? 'is-visible' : ''}`}>
        {/* Progress bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-stone-400 font-medium">
              {isBonusPhase ? (
                <span className="flex items-center gap-2 text-emerald-400">
                  <Sparkles className="w-4 h-4" />
                  Pregunta Bonus
                </span>
              ) : (
                `Pregunta ${currentIndex + 1} de ${questions.length}`
              )}
            </span>
            <div className="flex items-center gap-3">
              {streak >= 2 && !isFeedbackPhase && (
                <span className="flex items-center gap-1 text-sm text-orange-400 font-semibold">
                  <Flame className="w-4 h-4" />
                  {streak} racha
                </span>
              )}
              <span className="text-sm text-amber-400 font-bold tabular-nums">{score} pts</span>
            </div>
          </div>
          <div className="h-2 rounded-full bg-stone-800 overflow-hidden">
            <div
              className={`h-full bg-gradient-to-r from-amber-600 to-amber-400 transition-all duration-500 ${
                isBonusPhase ? 'w-full bg-gradient-to-r from-emerald-600 to-emerald-400' : ''
              }`}
              style={{ width: isBonusPhase ? '100%' : `${progressPct}%` }}
            />
          </div>
        </div>

        {/* Timer */}
        {!isFeedbackPhase && (
          <div className="flex items-center justify-center gap-2 mb-6">
            <div
              className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all ${
                timeLeft <= 10
                  ? 'border-red-500/50 bg-red-950/30'
                  : 'border-stone-700/40 bg-stone-900/40'
              }`}
            >
              <Clock
                className={`w-4 h-4 ${timeLeft <= 10 ? 'text-red-400' : 'text-stone-400'}`}
              />
              <span
                className={`text-lg font-bold tabular-nums ${
                  timeLeft <= 10 ? 'text-red-400' : 'text-stone-300'
                }`}
              >
                {timeLeft}s
              </span>
            </div>
          </div>
        )}

        {/* Question card */}
        <div
          key={`${q.id}-${currentIndex}-${isBonusPhase}`}
          className="animate-fade-in"
        >
          <div
            className={`p-6 md:p-8 rounded-3xl border backdrop-blur-sm transition-all duration-500 ${
              isBonusPhase
                ? 'bg-emerald-950/20 border-emerald-700/50'
                : isFeedbackPhase
                ? isOpinion
                  ? 'bg-stone-900/60 border-sky-700/40'
                  : isCorrect
                  ? 'bg-emerald-950/20 border-emerald-700/40'
                  : 'bg-red-950/20 border-red-700/40'
                : 'bg-stone-900/60 border-stone-700/40'
            }`}
          >
            {/* Author tag */}
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs text-amber-500 tracking-wide uppercase font-semibold">
                {q.author}
              </span>
              <span className="text-xs text-stone-600">·</span>
              <span className="text-xs text-stone-500">{q.topic}</span>
              <span className="text-xs text-stone-600">·</span>
              <span
                className={`text-xs font-semibold ${
                  q.level === 'facil'
                    ? 'text-emerald-400'
                    : q.level === 'media'
                    ? 'text-amber-400'
                    : 'text-red-400'
                }`}
              >
                {q.level === 'facil' ? 'Fácil' : q.level === 'media' ? 'Media' : 'Difícil'}
              </span>
            </div>

            {/* Question */}
            <h3 className="text-xl md:text-2xl font-semibold text-stone-100 leading-snug mb-6 text-balance">
              {q.question}
            </h3>

            {/* Options */}
            <div className="space-y-3">
              {shuffledOptions.map((opt, displayIdx) => {
                const isSelected = selectedIndex === opt.originalIndex;
                const isThisCorrect = opt.originalIndex === q.correctIndex;

                let stateClass = 'border-stone-700/40 bg-stone-950/40 hover:border-amber-600/50 hover:bg-stone-800/50';
                let icon: React.ReactNode = null;

                if (isFeedbackPhase && !isOpinion) {
                  if (isThisCorrect) {
                    stateClass = 'border-emerald-600/60 bg-emerald-950/30';
                    icon = <CheckCircle2 className="w-5 h-5 text-emerald-400" />;
                  } else if (isSelected && !isThisCorrect) {
                    stateClass = 'border-red-600/60 bg-red-950/30';
                    icon = <XCircle className="w-5 h-5 text-red-400" />;
                  } else {
                    stateClass = 'border-stone-700/30 bg-stone-950/20 opacity-50';
                  }
                } else if (isFeedbackPhase && isOpinion) {
                  if (isSelected) {
                    stateClass = 'border-sky-600/60 bg-sky-950/30';
                    icon = <CheckCircle2 className="w-5 h-5 text-sky-400" />;
                  }
                }

                const votePct = isOpinion && isFeedbackPhase
                  ? (votes[opt.originalIndex] / totalVotes) * 100
                  : 0;

                return (
                  <button
                    key={displayIdx}
                    onClick={() => !isFeedbackPhase && handleSelect(opt.originalIndex)}
                    disabled={isFeedbackPhase}
                    className={`w-full text-left p-4 md:p-5 rounded-2xl border transition-all duration-300 relative overflow-hidden ${stateClass} ${
                      !isFeedbackPhase ? 'cursor-pointer' : 'cursor-default'
                    }`}
                  >
                    {/* Opinion bar fill */}
                    {isOpinion && isFeedbackPhase && (
                      <div
                        className="absolute inset-y-0 left-0 bg-sky-500/15 animate-bar-grow"
                        style={{ width: `${votePct}%` }}
                      />
                    )}
                    <div className="relative flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 flex-1">
                        {icon}
                        <span className="text-sm md:text-base text-stone-200 font-medium">
                          {opt.text}
                        </span>
                      </div>
                      {isOpinion && isFeedbackPhase && (
                        <span className="text-sm font-bold text-sky-400 tabular-nums flex-shrink-0">
                          {votePct.toFixed(0)}%
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Hint button */}
            {!isFeedbackPhase && q.hint && !showHint && (
              <button
                onClick={() => setShowHint(true)}
                className="flex items-center gap-2 mt-4 text-sm text-stone-500 hover:text-amber-500 transition-colors"
              >
                <Lightbulb className="w-4 h-4" />
                Ver pista
              </button>
            )}
            {showHint && !isFeedbackPhase && q.hint && (
              <div className="flex items-center gap-2 mt-4 p-3 rounded-xl bg-amber-950/20 border border-amber-800/30 animate-fade-in">
                <Lightbulb className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span className="text-sm text-amber-300">{q.hint}</span>
              </div>
            )}

            {/* Feedback */}
            {isFeedbackPhase && (
              <div className="mt-5 animate-fade-in">
                <div
                  className={`p-4 md:p-5 rounded-2xl border ${
                    isOpinion
                      ? 'border-sky-700/40 bg-sky-950/20'
                      : isCorrect
                      ? 'border-emerald-700/40 bg-emerald-950/20'
                      : 'border-red-700/40 bg-red-950/20'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {isOpinion ? (
                      <Eye className="w-5 h-5 text-sky-400 flex-shrink-0 mt-0.5" />
                    ) : isCorrect ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                    )}
                    <div>
                      <p
                        className={`font-semibold mb-1 ${
                          isOpinion ? 'text-sky-300' : isCorrect ? 'text-emerald-300' : 'text-red-300'
                        }`}
                      >
                        {isOpinion
                          ? 'Pregunta de opinión'
                          : isCorrect
                          ? '¡Correcto!'
                          : 'Incorrecto'}
                      </p>
                      <p className="text-sm text-stone-300 leading-relaxed">
                        {q.feedback}
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleNext}
                  className="w-full mt-4 flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-base transition-all duration-300 hover:scale-[1.02]"
                >
                  {isBonusPhase
                    ? 'Continuar'
                    : currentIndex < questions.length - 1
                    ? 'Siguiente pregunta'
                    : 'Ver resultados'}
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
