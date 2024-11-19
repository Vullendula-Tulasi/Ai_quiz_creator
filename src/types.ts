export type Question = {
  id: number;
  type: 'multiple' | 'boolean' | 'short';
  question: string;
  options?: string[];
  correctAnswer: string | boolean;
};

export type Quiz = {
  id: number;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  questions: Question[];
};