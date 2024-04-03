'use client';
import React, { useEffect, useState } from 'react';
import QuizQuestion from './QuizQuestion';
import { v4 as uuidv4 } from 'uuid';

export type Quiz = {
  id: string;
  question: string;
  answer: Array<{ id: string; value: string; isCorrect: boolean }>;
};
const BookClubQuiz = () => {
  const initialQuiz = [
    {
      id: uuidv4(),
      question: '',
      answer: [{ id: uuidv4(), value: '', isCorrect: false }]
    }
  ];
  const [quizes, setQuizes] = useState<Array<Quiz>>(initialQuiz);

  useEffect(() => {
    console.log('quiz', quizes);
  }, [quizes]);

  const handleAddQuiz = () => {
    if (quizes.length === 10) {
      return;
    }
    const newQuiz = {
      id: uuidv4(),
      question: '',
      answer: [{ id: uuidv4(), value: '', isCorrect: false }]
    };
    setQuizes([...quizes, newQuiz]);
  };
  const handleDeleteQuiz = (id: string) => {
    setQuizes(quizes.filter((quiz) => quiz.id !== id));
  };
  return (
    <section className=' overflow-scroll'>
      <form>
        <h1>퀴즈조지기</h1>
        {quizes.map((quiz, index) => {
          return (
            <QuizQuestion
              index={index}
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
