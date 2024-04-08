'use client';
import { useState } from 'react';
import QuizAnswer from './QuizAnswer';

import { v4 as uuidv4 } from 'uuid';
import QuizShortAnswer from './QuizShortAnswer';
export type Quiz = {
  id: string;
  type: string;
  question: string;
  answer: Array<{ id: string; value: string; isCorrect: boolean }>;
};
type QuizQuestionProps = {
  index: number;
  quiz: Quiz;
  handleDeleteQuiz: (id: string) => void;
  setQuiz: React.Dispatch<React.SetStateAction<Quiz[]>>;
  isMultiple: boolean;
};
const QuizQuestion = ({
  quiz,
  // handleDeleteQuiz,
  setQuiz,
  index,
  isMultiple
}: QuizQuestionProps) => {
  const [questionInput, setQuestionInput] = useState('');

  const handleQuestionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setQuestionInput(event.target.value);
    const updatedQuiz = { ...quiz, question: event.target.value };
    setQuiz((prevQuizes) =>
      prevQuizes.map((prevQuiz) =>
        prevQuiz.id === quiz.id ? updatedQuiz : prevQuiz
      )
    );
  };

  const handleAnswerChange = (
    id: string,
    value: string,
    isCorrect: boolean
  ) => {
    const updatedAnswers = quiz.answer.map((answer) =>
      answer.id === id ? { ...answer, value, isCorrect } : answer
    );
    const updatedQuiz = { ...quiz, answer: updatedAnswers };
    setQuiz((prevQuizes) =>
      prevQuizes.map((prevQuiz) =>
        prevQuiz.id === quiz.id ? updatedQuiz : prevQuiz
      )
    );
  };

  const handleAddAnswer = () => {
    if (!isMultiple) return;

    if (quiz.answer.length === 4) {
      return;
    }
    const newAnswer = {
      id: uuidv4(),
      value: '',
      isCorrect: false
    };

    const updatedQuiz = {
      ...quiz,
      answer: [...quiz.answer, newAnswer]
    };

    setQuiz((prevQuizes) =>
      prevQuizes.map((prevQuiz) =>
        prevQuiz.id === quiz.id ? updatedQuiz : prevQuiz
      )
    );
  };

  const handleDeleteAnswer = (id: string) => {
    const updatedAnswers = quiz.answer.filter((answer) => answer.id !== id);
    const updatedQuiz = { ...quiz, answer: updatedAnswers };
    setQuiz((prevQuizes) =>
      prevQuizes.map((prevQuiz) =>
        prevQuiz.id === quiz.id ? updatedQuiz : prevQuiz
      )
    );
  };
  return (
    <section>
      {/* <p
        onClick={() => {
          handleDeleteQuiz(quiz.id);
        }}
        className='text-right'>
        퀴즈삭제하기
      </p> */}
      <div>
        {/* <p>{index + 1}번</p> */}
        {/* 문제: */}
        <textarea
          placeholder='문제를 입력해 주세요'
          className='mb-5 w-full resize-none'
          value={questionInput}
          onChange={handleQuestionChange}
        />

        {quiz.answer.map((answer, idx) => {
          if (isMultiple) {
            return (
              <QuizAnswer
                index={idx}
                answer={answer}
                key={answer.id}
                handleAnswerChange={handleAnswerChange}
                handleDeleteAnswer={handleDeleteAnswer}
              />
            );
          } else {
            return (
              <QuizShortAnswer
                index={idx}
                answer={answer}
                key={answer.id}
                handleAnswerChange={handleAnswerChange}
                handleDeleteAnswer={handleDeleteAnswer}
              />
            );
          }
        })}
      </div>
      {isMultiple && (
        <p
          className='w-full border-solid border-2 border-[#B3C1CC] text-[#8A9DB3] p-2 rounded-full text-center'
          onClick={handleAddAnswer}>
          보기추가
        </p>
      )}
    </section>
  );
};

export default QuizQuestion;
