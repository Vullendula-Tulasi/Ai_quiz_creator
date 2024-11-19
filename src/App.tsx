import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, BookOpen, GraduationCap, Plus } from 'lucide-react';
import { QuizCard } from './components/QuizCard';
import { QuizQuestion } from './components/QuizQuestion';
import { QuizResults } from './components/QuizResults';
import { CreateQuiz } from './components/CreateQuiz';
import type { Quiz } from './types';

const SAMPLE_QUIZZES: Quiz[] = [
  {
    id: 1,
    title: 'JavaScript Fundamentals',
    description: 'Test your knowledge of JavaScript basics',
    difficulty: 'Beginner',
    questions: [
      {
        id: 1,
        type: 'multiple',
        question: 'What is the output of typeof null in JavaScript?',
        options: ['object', 'null', 'undefined', 'number'],
        correctAnswer: 'object'
      },
      {
        id: 2,
        type: 'boolean',
        question: 'JavaScript is a case-sensitive language.',
        correctAnswer: true
      }
    ]
  }
];

function App() {
  const [quizzes, setQuizzes] = useState<Quiz[]>(SAMPLE_QUIZZES);
  const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Map<number, string | boolean>>(new Map());
  const [isCreating, setIsCreating] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleStartQuiz = (quiz: Quiz) => {
    setActiveQuiz(quiz);
    setCurrentQuestionIndex(0);
    setAnswers(new Map());
    setShowResults(false);
    setIsCreating(false);
  };

  const handleAnswer = (answer: string | boolean) => {
    if (!activeQuiz) return;
    
    setAnswers(new Map(answers.set(currentQuestionIndex, answer)));
    
    setTimeout(() => {
      if (currentQuestionIndex < activeQuiz.questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
      } else {
        setShowResults(true);
      }
    }, 1000);
  };

  const handleReset = () => {
    setActiveQuiz(null);
    setCurrentQuestionIndex(0);
    setAnswers(new Map());
    setShowResults(false);
  };

  const handleQuizGenerated = (newQuiz: Quiz) => {
    setQuizzes(prev => [...prev, { ...newQuiz, id: prev.length + 1 }]);
    setIsCreating(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Sparkles className="text-purple-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">AI Quiz Creator</span>
            </div>
            <div className="flex items-center space-x-4">
              <BookOpen className="text-gray-500" />
              <GraduationCap className="text-gray-500" />
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <AnimatePresence mode="wait">
          {!activeQuiz && !isCreating ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900">Available Quizzes</h2>
                <button
                  onClick={() => setIsCreating(true)}
                  className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <Plus size={20} className="text-purple-600" />
                  <span className="font-medium">Create New Quiz</span>
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {quizzes.map((quiz) => (
                  <QuizCard key={quiz.id} quiz={quiz} onStart={handleStartQuiz} />
                ))}
              </div>
            </motion.div>
          ) : isCreating ? (
            <CreateQuiz onQuizGenerated={handleQuizGenerated} />
          ) : activeQuiz && !showResults ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-2xl mx-auto"
            >
              <div className="mb-8 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">{activeQuiz.title}</h2>
                <button
                  onClick={handleReset}
                  className="text-gray-600 hover:text-gray-900"
                >
                  Exit Quiz
                </button>
              </div>
              
              <div className="mb-6">
                <div className="h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-2 bg-purple-500 rounded-full transition-all duration-300"
                    style={{
                      width: `${((currentQuestionIndex + 1) / activeQuiz.questions.length) * 100}%`
                    }}
                  />
                </div>
                <div className="mt-2 text-sm text-gray-600">
                  Question {currentQuestionIndex + 1} of {activeQuiz.questions.length}
                </div>
              </div>

              <QuizQuestion
                question={activeQuiz.questions[currentQuestionIndex]}
                onAnswer={handleAnswer}
                isAnswered={answers.has(currentQuestionIndex)}
              />
            </motion.div>
          ) : activeQuiz && (
            <QuizResults
              quiz={activeQuiz}
              answers={answers}
              onReset={handleReset}
            />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;