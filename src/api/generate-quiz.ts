import OpenAI from 'openai';
import type { Quiz } from '../types';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateQuiz(
  topic: string,
  numQuestions: number,
  difficulty: Quiz['difficulty']
): Promise<Quiz> {
  const prompt = `Create a quiz about ${topic} with ${numQuestions} questions at ${difficulty} level. 
    Include a mix of multiple choice and true/false questions. 
    Format the response as a JSON object with the following structure:
    {
      "title": "Quiz title",
      "description": "Brief description",
      "difficulty": "${difficulty}",
      "questions": [
        {
          "id": number,
          "type": "multiple" or "boolean",
          "question": "Question text",
          "options": ["option1", "option2", "option3", "option4"] (for multiple choice only),
          "correctAnswer": "correct option" or boolean
        }
      ]
    }`;

  const completion = await openai.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "gpt-3.5-turbo",
    temperature: 0.7,
  });

  const response = completion.choices[0].message.content;
  return JSON.parse(response || '{}');
}