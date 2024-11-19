import type { Quiz } from '../types';

const TOPIC_QUESTIONS: Record<string, Array<{
  question: string;
  type: 'multiple' | 'boolean';
  options?: string[];
  correctAnswer: string | boolean;
}>> = {
  'javascript': [
    {
      question: 'What is the output of typeof null in JavaScript?',
      type: 'multiple',
      options: ['object', 'null', 'undefined', 'number'],
      correctAnswer: 'object'
    },
    {
      question: 'Which of these is not a JavaScript data type?',
      type: 'multiple',
      options: ['float', 'boolean', 'string', 'symbol'],
      correctAnswer: 'float'
    },
    {
      question: 'What will console.log(0.1 + 0.2 === 0.3) output?',
      type: 'boolean',
      correctAnswer: false
    },
    {
      question: 'Which method removes the last element from an array?',
      type: 'multiple',
      options: ['pop()', 'shift()', 'unshift()', 'splice()'],
      correctAnswer: 'pop()'
    },
    {
      question: 'What is the purpose of the "use strict" directive?',
      type: 'multiple',
      options: [
        'Enforces stricter parsing and error handling',
        'Makes the code run faster',
        'Enables new JavaScript features',
        'Disables all browser warnings'
      ],
      correctAnswer: 'Enforces stricter parsing and error handling'
    }
  ],
  'react': [
    {
      question: 'What is the virtual DOM in React?',
      type: 'multiple',
      options: [
        'A lightweight copy of the actual DOM',
        'A direct manipulation of the browser DOM',
        'A JavaScript engine feature',
        'A third-party library'
      ],
      correctAnswer: 'A lightweight copy of the actual DOM'
    },
    {
      question: 'Can React components directly modify their props?',
      type: 'boolean',
      correctAnswer: false
    },
    {
      question: 'Which hook replaces componentDidMount and componentDidUpdate?',
      type: 'multiple',
      options: ['useEffect', 'useState', 'useCallback', 'useMemo'],
      correctAnswer: 'useEffect'
    },
    {
      question: 'What is the purpose of React.memo?',
      type: 'multiple',
      options: [
        'Prevents unnecessary re-renders',
        'Manages component state',
        'Handles side effects',
        'Creates refs'
      ],
      correctAnswer: 'Prevents unnecessary re-renders'
    },
    {
      question: 'React components must be pure functions.',
      type: 'boolean',
      correctAnswer: false
    }
  ],
  'python': [
    {
      question: 'What is the output of type(lambda x: x)?',
      type: 'multiple',
      options: ['function', 'lambda', 'callable', 'method'],
      correctAnswer: 'function'
    },
    {
      question: 'Python lists are mutable.',
      type: 'boolean',
      correctAnswer: true
    },
    {
      question: 'Which is not a valid way to create an empty set?',
      type: 'multiple',
      options: ['set()', '{}', 'set([])', 'set(())'],
      correctAnswer: '{}'
    },
    {
      question: 'What does the __init__ method do?',
      type: 'multiple',
      options: [
        'Initializes class instance attributes',
        'Creates a new class',
        'Imports modules',
        'Defines static methods'
      ],
      correctAnswer: 'Initializes class instance attributes'
    }
  ]
};

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function generateGenericQuestions(topic: string, difficulty: Quiz['difficulty']): Array<{
  question: string;
  type: 'multiple' | 'boolean';
  options?: string[];
  correctAnswer: string | boolean;
}> {
  const questions = [
    {
      question: `What is a key principle of ${topic}?`,
      type: 'multiple',
      options: [
        'Problem solving',
        'Data management',
        'Resource optimization',
        'System design'
      ],
      correctAnswer: 'Problem solving'
    },
    {
      question: `${topic} is primarily used in enterprise applications.`,
      type: 'boolean',
      correctAnswer: true
    },
    {
      question: `Which tool is most commonly used in ${topic}?`,
      type: 'multiple',
      options: [
        'Development environments',
        'Version control systems',
        'Testing frameworks',
        'Documentation tools'
      ],
      correctAnswer: 'Development environments'
    },
    {
      question: `What is the main advantage of using ${topic}?`,
      type: 'multiple',
      options: [
        'Improved productivity',
        'Better performance',
        'Enhanced security',
        'Lower costs'
      ],
      correctAnswer: 'Improved productivity'
    },
    {
      question: `${topic} follows industry best practices.`,
      type: 'boolean',
      correctAnswer: true
    }
  ];

  return shuffleArray(questions);
}

function getTopicQuestions(topic: string, numQuestions: number, difficulty: Quiz['difficulty']) {
  const normalizedTopic = topic.toLowerCase();
  let questions = TOPIC_QUESTIONS[normalizedTopic] || [];
  
  if (questions.length === 0) {
    questions = generateGenericQuestions(topic, difficulty);
  }

  // Shuffle questions and select requested number
  const shuffledQuestions = shuffleArray(questions);
  const selectedQuestions = shuffledQuestions.slice(0, numQuestions);

  // Adjust difficulty by modifying questions
  return selectedQuestions.map((q, index) => {
    const question = { ...q, id: index + 1 };
    
    if (difficulty === 'Advanced' && question.type === 'multiple') {
      // Make options more technical and specific
      question.options = question.options?.map(opt => 
        opt.length > 20 ? opt : `${opt} (in advanced scenarios)`
      );
    }
    
    if (difficulty === 'Beginner' && question.type === 'multiple') {
      // Simplify options
      question.options = question.options?.map(opt => 
        opt.length > 30 ? opt.split('(')[0].trim() : opt
      );
    }

    return question;
  });
}

export async function generateQuiz(
  topic: string,
  numQuestions: number,
  difficulty: Quiz['difficulty']
): Promise<Quiz> {
  await new Promise(resolve => setTimeout(resolve, 1000));

  const questions = getTopicQuestions(topic, numQuestions, difficulty);
  
  const descriptions = {
    Beginner: 'Perfect for those just starting their journey.',
    Intermediate: 'Test your growing knowledge and understanding.',
    Advanced: 'Challenge yourself with complex concepts and edge cases.'
  };

  return {
    id: Date.now(),
    title: `${topic} ${difficulty} Quiz`,
    description: `${descriptions[difficulty]} This quiz covers various aspects of ${topic}.`,
    difficulty,
    questions
  };
}