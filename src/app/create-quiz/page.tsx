'use client';
import React, { useState } from 'react';
import QuizQuestion from './QuizQuestion';

export type Quiz = {
  id: number;
  question: string;
  answer: Array<{ id: number; value: string; isCorrect: boolean }>;
};
const BookClubQuiz = () => {
  const initialQuiz = [
    {
      id: 1,
      question: '',
      answer: [{ id: 1, value: '', isCorrect: false }]
    }
  ];
  const [quizes, setQuizes] = useState<Array<Quiz>>(initialQuiz);

  const handleAddQuiz = () => {
    const newQuiz = {
      id: quizes.length + 1,
      question: '',
      answer: [{ id: 1, value: '', isCorrect: false }]
    };
    setQuizes([...quizes, newQuiz]);
  };
  const handleDeleteQuiz = (id: number) => {
    setQuizes(quizes.filter((quiz) => quiz.id !== id));
  };
  return (
    <section>
      <form>
        <h1>퀴즈조지기</h1>
        {quizes.map((quiz, index) => {
          return (
            <QuizQuestion
              setQuiz={setQuizes}
              handleDeleteQuiz={handleDeleteQuiz}
              quiz={quiz}
              key={quiz.id}
            />
          );
        })}
      </form>
      <button onClick={handleAddQuiz} className=' bg-blue-600'>
        퀴즈추가하기
      </button>
    </section>
  );
};

export default BookClubQuiz;
