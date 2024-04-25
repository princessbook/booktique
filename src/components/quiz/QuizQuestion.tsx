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
    if (event.target.value.length > 60) {
      return;
    }
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
    const updatedAnswers = quiz.answer.map((answer) => {
      if (answer.id === id) {
        return { ...answer, value, isCorrect };
      } else {
        // 다른 정답들의 isCorrect를 false로 처리
        return { ...answer, isCorrect: false };
      }
    });
    const updatedQuiz = { ...quiz, answer: updatedAnswers };
    setQuiz((prevQuizes) =>
      prevQuizes.map((prevQuiz) =>
        prevQuiz.id === quiz.id ? updatedQuiz : prevQuiz
      )
    );
    // console.log(updatedQuiz);
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
    if (quiz.answer.length <= 2) return;
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
          className='mb-2 w-full resize-none rounded-md p-2 '
          value={questionInput}
          maxLength={60}
          onChange={handleQuestionChange}
        />
        <p className='text-[12px] text-[#3F3E4E] font-bold text-right opacity-60'>
          {questionInput.length}/60
        </p>
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
          className='w-full cursor-pointer border-solid border-2 border-[#B3C1CC] text-[#8A9DB3] p-2 rounded-full text-center'
          onClick={handleAddAnswer}>
          보기추가
        </p>
      )}
    </section>
  );
};

export default QuizQuestion;
