import React from 'react';
import { motion } from 'framer-motion';
import type { Question } from '../types';

type QuizQuestionProps = {
  question: Question;
  onAnswer: (answer: string | boolean) => void;
  isAnswered: boolean;
};

export function QuizQuestion({ question, onAnswer, isAnswered }: QuizQuestionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="bg-white rounded-xl shadow-lg p-6"
    >
      <h3 className="text-xl font-semibold text-gray-800 mb-6">{question.question}</h3>
      
      {question.type === 'multiple' && (
        <div className="space-y-3">
          {question.options?.map((option, index) => (
            <button
              key={index}
              onClick={() => !isAnswered && onAnswer(option)}
              disabled={isAnswered}
              className={`w-full text-left p-4 rounded-lg transition-colors ${
                isAnswered
                  ? option === question.correctAnswer
                    ? 'bg-green-100 border-green-500'
                    : 'bg-gray-100 border-gray-300'
                  : 'bg-white border-gray-300 hover:bg-purple-50'
              } border`}
            >
              {option}
            </button>
          ))}
        </div>
      )}

      {question.type === 'boolean' && (
        <div className="flex gap-4">
          {['True', 'False'].map((option) => (
            <button
              key={option}
              onClick={() => !isAnswered && onAnswer(option === 'True')}
              disabled={isAnswered}
              className={`flex-1 p-4 rounded-lg transition-colors ${
                isAnswered
                  ? String(option === 'True') === String(question.correctAnswer)
                    ? 'bg-green-100 border-green-500'
                    : 'bg-gray-100 border-gray-300'
                  : 'bg-white border-gray-300 hover:bg-purple-50'
              } border`}
            >
              {option}
            </button>
          ))}
        </div>
      )}

      {question.type === 'short' && (
        <input
          type="text"
          placeholder="Type your answer..."
          disabled={isAnswered}
          onChange={(e) => !isAnswered && onAnswer(e.target.value)}
          className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
      )}
    </motion.div>
  );
}