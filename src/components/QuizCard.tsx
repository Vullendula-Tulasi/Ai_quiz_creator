import React from 'react';
import { motion } from 'framer-motion';
import { Brain, BarChart, Clock } from 'lucide-react';
import type { Quiz } from '../types';

type QuizCardProps = {
  quiz: Quiz;
  onStart: (quiz: Quiz) => void;
};

export function QuizCard({ quiz, onStart }: QuizCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      <div className="h-48 bg-gradient-to-br from-purple-500 to-indigo-600 p-6">
        <div className="flex justify-between items-start">
          <h3 className="text-2xl font-bold text-white">{quiz.title}</h3>
          <Brain className="text-white/80" size={24} />
        </div>
      </div>
      <div className="p-6">
        <p className="text-gray-600 mb-4">{quiz.description}</p>
        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center gap-2">
            <BarChart size={18} className="text-purple-500" />
            <span className="text-sm text-gray-600">{quiz.difficulty}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={18} className="text-purple-500" />
            <span className="text-sm text-gray-600">{quiz.questions.length} questions</span>
          </div>
        </div>
        <button
          onClick={() => onStart(quiz)}
          className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-2 px-4 rounded-lg font-medium hover:opacity-90 transition-opacity"
        >
          Start Quiz
        </button>
      </div>
    </motion.div>
  );
}