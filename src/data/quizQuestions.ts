export type QuestionType = 'multiple' | 'truefalse' | 'situation' | 'opinion';

export interface QuizQuestion {
  id: number;
  type: QuestionType;
  level: 'facil' | 'media' | 'dificil';
  author: string;
  topic: string;
  question: string;
  options: string[];
  correctIndex: number | null; // null for opinion questions
  feedback: string;
  hint?: string;
  isOpinion?: boolean;
}

export const quizQuestions: QuizQuestion[] = [
  // === ZULETA (3 preguntas) ===
  {
    id: 1,
    type: 'multiple',
    level: 'facil',
    author: 'Estanislao Zuleta',
    topic: 'Elogio de la Dificultad',
    question: '¿Qué autor critica la mentalidad facilista y la ilusión de una vida sin conflictos?',
    options: [
      'Juan José Sebreli',
      'Estanislao Zuleta',
      'Kathe Crehan',
      'J. A. Rincón Díaz',
    ],
    correctIndex: 1,
    feedback:
      'Zuleta critica el facilismo en "Elogio de la Dificultad", argumentando que buscar una vida sin problemas es renunciar al crecimiento personal.',
    hint: 'Su obra se llama "Elogio de la Dificultad".',
  },
  {
    id: 2,
    type: 'multiple',
    level: 'media',
    author: 'Estanislao Zuleta',
    topic: 'Elogio de la Dificultad',
    question:
      'Según Zuleta, ¿a qué conduce la búsqueda de una vida sin conflictos?',
    options: [
      'Al desarrollo del pensamiento crítico',
      'A la mediocridad y al conformismo',
      'A una sociedad más justa',
      'A la superación del sentido común',
    ],
    correctIndex: 1,
    feedback:
      'Zuleta sostiene que evitar el conflicto conduce a la mediocridad y al conformismo, negando la dimensión creativa del ser humano.',
    hint: 'El facilismo empobrece la experiencia humana.',
  },
  {
    id: 3,
    type: 'situation',
    level: 'dificil',
    author: 'Estanislao Zuleta',
    topic: 'Elogio de la Dificultad',
    question:
      'Un estudiante universitario elige siempre las materias más fáciles, evita cualquier debate y busca graduarse con el menor esfuerzo posible. Según Zuleta, ¿qué le dirías?',
    options: [
      'Que su estrategia es inteligente y práctica',
      'Que está renunciando a su crecimiento intelectual y moral, pues la dificultad es el motor del desarrollo',
      'Que debe buscar un equilibrio entre dificultad y facilidad',
      'Que la dificultad solo importa en la vida profesional, no en la académica',
    ],
    correctIndex: 1,
    feedback:
      'Zuleta diría que una vida sin problemas no es humana: es la vida de un ser que no se ha planteado ninguno. La dificultad es la condición del crecimiento.',
    hint: 'Piensa en qué significa "elogiar" la dificultad.',
  },

  // === SEBRELI (3 preguntas) ===
  {
    id: 4,
    type: 'multiple',
    level: 'facil',
    author: 'Juan José Sebreli',
    topic: 'Humanismo Latinoamericano',
    question:
      'Según Sebreli, ¿cómo debe ser el humanismo latinoamericano?',
    options: [
      'Apologético y celebratorio',
      'Crítico, no apologético',
      'Nostálgico y tradicionalista',
      'Neutral y descriptivo',
    ],
    correctIndex: 1,
    feedback:
      'Sebreli sostiene que el humanismo latinoamericano debe ser crítico: no basta con celebrar lo nuestro, hay que someterlo a examen riguroso.',
    hint: 'Sebreli cuestiona los mitos identitarios.',
  },
  {
    id: 5,
    type: 'multiple',
    level: 'media',
    author: 'Juan José Sebreli',
    topic: 'Humanismo Latinoamericano',
    question:
      '¿Qué formas de pensamiento critica Sebreli por perpetuar el subdesarrollo y la dependencia?',
    options: [
      'El positivismo y el racionalismo',
      'El populismo y el nacionalismo cultural',
      'El pragmatismo y el empirismo',
      'El existencialismo y el relativismo',
    ],
    correctIndex: 1,
    feedback:
      'Sebreli critica el populismo y el nacionalismo cultural como formas de evasión que perpetúan el subdesarrollo en lugar de confrontarlo.',
    hint: 'Los ve como "formas de evasión".',
  },
  {
    id: 6,
    type: 'situation',
    level: 'dificil',
    author: 'Juan José Sebreli',
    topic: 'Humanismo Latinoamericano',
    question:
      'Una comunidad celebra con orgullo sus tradiciones pero nunca las cuestiona ni examina sus contradicciones. Según Sebreli, ¿qué problema hay?',
    options: [
      'Ninguno: celebrar la cultura popular es suficiente',
      'La cultura popular no es pura ni inocente: debe ser examinada críticamente, no solo celebrada',
      'El problema es que no tienen suficiente identidad cultural',
      'Deberían abandonar sus tradiciones por completo',
    ],
    correctIndex: 1,
    feedback:
      'Sebreli afirma que la cultura popular no es pura ni inocente y debe ser examinada. La verdadera identidad se construye en el ejercicio crítico, no en el mito.',
    hint: 'Sebreli no está en contra de la cultura, sino del culto acrítico a ella.',
  },

  // === CREHAN / GRAMSCI (3 preguntas) ===
  {
    id: 7,
    type: 'truefalse',
    level: 'facil',
    author: 'Kathe Crehan (sobre Gramsci)',
    topic: 'Intelectuales y Sentido Común',
    question:
      'Según Gramsci (leído por Crehan), todos los hombres son intelectuales, pero no todos cumplen la función de intelectuales en la sociedad.',
    options: ['Verdadero', 'Falso'],
    correctIndex: 0,
    feedback:
      'Es verdadero. Gramsci sostiene que todos los seres humanos son intelectuales en potencia, pero la sociedad asigna la función intelectual a unos pocos.',
    hint: 'Gramsci distingue entre ser intelectual y ejercer la función.',
  },
  {
    id: 8,
    type: 'multiple',
    level: 'media',
    author: 'Kathe Crehan (sobre Gramsci)',
    topic: 'Intelectuales y Sentido Común',
    question:
      'Según Crehan leyendo a Gramsci, ¿qué debe hacerse con el sentido común?',
    options: [
      'Destruirlo completamente y empezar de cero',
      'Transformarlo en buen sentido mediante el trabajo crítico',
      'Aceptarlo tal como es, pues es sabiduría popular',
      'Ignorarlo, pues solo el conocimiento académico vale',
    ],
    correctIndex: 1,
    feedback:
      'Crehan, leyendo a Gramsci, afirma que el sentido común no se destruye sino que se transforma en buen sentido mediante el trabajo crítico.',
    hint: 'El sentido común contiene elementos de buen sentido.',
  },
  {
    id: 9,
    type: 'situation',
    level: 'dificil',
    author: 'Kathe Crehan (sobre Gramsci)',
    topic: 'Intelectuales y Sentido Común',
    question:
      'Un profesor solo publica artículos académicos desde su oficina y nunca interactúa con la comunidad. Según Gramsci vía Crehan, ¿qué tipo de intelectual es?',
    options: [
      'Un intelectual orgánico, pues produce conocimiento',
      'Un intelectual tradicional: está aislado de su grupo social y no articula el espíritu creativo del pueblo',
      'Un intelectual crítico, pues su trabajo académico es suficiente',
      'No es un intelectual en ningún sentido',
    ],
    correctIndex: 1,
    feedback:
      'El intelectual orgánico debe estar vinculado a un grupo social y articular el espíritu creativo del pueblo. Un profesor aislado sería un intelectual tradicional, no orgánico.',
    hint: 'Gramsci distingue entre intelectual tradicional y orgánico.',
  },

  // === RINCÓN DÍAZ (3 preguntas) ===
  {
    id: 10,
    type: 'multiple',
    level: 'facil',
    author: 'J. A. Rincón Díaz',
    topic: 'Investigación Acción Participativa',
    question:
      '¿Qué metodología propone Rincón Díaz para integrar al universitario en la realidad social?',
    options: [
      'La investigación pura y teórica',
      'La Investigación Acción Participativa (IAP)',
      'El método científico tradicional',
      'La observación participante pasiva',
    ],
    correctIndex: 1,
    feedback:
      'Rincón Díaz propone la IAP como metodología que integra investigación, acción y participación comunitaria.',
    hint: 'Las siglas son IAP.',
  },
  {
    id: 11,
    type: 'multiple',
    level: 'media',
    author: 'J. A. Rincón Díaz',
    topic: 'Investigación Acción Participativa',
    question:
      'Según Rincón Díaz, ¿cómo se construye el conocimiento en la IAP?',
    options: [
      'Desde la universidad hacia la comunidad',
      'Con la comunidad, no sobre ella',
      'Solo por los expertos académicos',
      'A través de encuestas cuantitativas',
    ],
    correctIndex: 1,
    feedback:
      'Rincón Díaz sostiene que el conocimiento se construye con la comunidad, no sobre ella. El universitario no puede ser un espectador neutral.',
    hint: 'La preposición es clave: "con" no "sobre".',
  },
  {
    id: 12,
    type: 'opinion',
    level: 'dificil',
    author: 'J. A. Rincón Díaz',
    topic: 'Investigación Acción Participativa',
    question:
      '¿Crees que el universitario tiene una obligación ética y política de comprometerse con la transformación de su comunidad, o su rol es solo académico?',
    options: [
      'Sí, tiene obligación ética y política de comprometerse',
      'No, su rol es puramente académico e investigativo',
      'Depende del contexto y la carrera',
      'Solo si recibe financiamiento público',
    ],
    correctIndex: null,
    feedback:
      'Esta es una pregunta de opinión para debatir. Rincón Díaz argumenta que el universitario debe superar la falsa neutralidad académica y asumir un compromiso ético y político. ¿Estás de acuerdo con él?',
    isOpinion: true,
  },

  // === PREGUNTA DE OPINIÓN EXTRA (para completar 12 con 2 de opinión) ===
  {
    id: 13,
    type: 'opinion',
    level: 'media',
    author: 'Tesis Central del Equipo',
    topic: 'Humanismo y Sociedad',
    question:
      '¿Crees que la sociedad actual busca caminos fáciles en lugar de la reflexión crítica, como sugiere la tesis del equipo?',
    options: [
      'Sí, la sociedad busca caminos fáciles',
      'A veces, depende del contexto',
      'No, aún existe reflexión crítica',
      'No estoy seguro/a',
    ],
    correctIndex: null,
    feedback:
      'Esta pregunta conecta con la encuesta de la página. La tesis del equipo sostiene que el ser humano debe superar el facilismo y el sentido común dogmático. ¿Qué piensas tú?',
    isOpinion: true,
  },
];

// Pregunta bonus oculta
export const bonusQuestion: QuizQuestion = {
  id: 99,
  type: 'multiple',
  level: 'dificil',
  author: 'Pregunta Bonus',
  topic: 'Identifica al autor',
  question:
    '¿De quién es esta frase? "Una vida sin problemas no es humana: es la vida de un ser que no se ha planteado ninguno."',
  options: [
    'Juan José Sebreli',
    'Estanislao Zuleta',
    'Antonio Gramsci',
    'J. A. Rincón Díaz',
  ],
  correctIndex: 1,
  feedback:
    'Es de Estanislao Zuleta, en "Elogio de la Dificultad". Esta frase resume su crítica al facilismo y su defensa de la dificultad como condición de lo humano.',
  hint: 'El mismo autor que critica la mentalidad facilista.',
};
