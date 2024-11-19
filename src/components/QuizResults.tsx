import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, RefreshCw, CheckCircle, XCircle } from 'lucide-react';
import type { Quiz } from '../types';

type QuizResultsProps = {
  quiz: Quiz;
  answers: Map<number, string | boolean>;
  onReset: () => void;
};

export function QuizResults({ quiz, answers, onReset }: QuizResultsProps) {
  const correctAnswers = quiz.questions.filter((q, index) => 
    answers.get(index) === q.correctAnswer
  ).length;
  
  const score = Math.round((correctAnswers / quiz.questions.length) * 100);
  
  const getMessage = (score: number) => {
    if (score === 100) return 'Perfect! You\'re a master!';
    if (score >= 80) return 'Great job! Almost perfect!';
    if (score >= 60) return 'Good effort! Keep practicing!';
    return 'Keep learning! You\'ll do better next time!';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg p-8"
    >
      <div className="text-center mb-8">
        <div className="inline-block p-4 bg-purple-100 rounded-full mb-4">
          <Trophy className="w-12 h-12 text-purple-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Quiz Complete!</h2>
        <p className="text-lg text-gray-600">{getMessage(score)}</p>
      </div>

      <div className="flex justify-center items-center gap-4 mb-8">
        <div className="text-center">
          <div className="text-4xl font-bold text-purple-600">{score}%</div>
          <div className="text-sm text-gray-600">Score</div>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold text-green-600">{correctAnswers}</div>
          <div className="text-sm text-gray-600">Correct</div>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold text-red-600">{quiz.questions.length - correctAnswers}</div>
          <div className="text-sm text-gray-600">Incorrect</div>
        </div>
      </div>

      <div className="space-y-4 mb-8">
        <h3 className="text-xl font-semibold mb-4">Review Answers</h3>
        {quiz.questions.map((question, index) => (
          <div key={question.id} className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-start gap-3">
              {answers.get(index) === question.correctAnswer ? (
                <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
              ) : (
                <XCircle className="w-5 h-5 text-red-500 mt-1" />
              )}
              <div>
                <p className="font-medium text-gray-900">{question.question}</p>
                <p className="text-sm text-gray-600 mt-1">
                  Your answer: {String(answers.get(index))}
                </p>
                <p className="text-sm text-green-600 mt-1">
                  Correct answer: {String(question.correctAnswer)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={onReset}
        className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-3 px-4 rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
      >
        <RefreshCw size={20} />
        Try Another Quiz
      </button>
    </motion.div>
  );
}