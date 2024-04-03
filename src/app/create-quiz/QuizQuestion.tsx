'use client';
import { useState } from 'react';
import QuizAnswer from './QuizAnswer';
import { Quiz } from './page';
import { v4 as uuidv4 } from 'uuid';

type QuizQuestionProps = {
  index: number;
  quiz: Quiz;
  handleDeleteQuiz: (id: string) => void;
  setQuiz: React.Dispatch<React.SetStateAction<Quiz[]>>;
};
const QuizQuestion = ({
  quiz,
  handleDeleteQuiz,
  setQuiz,
  index
}: QuizQuestionProps) => {
  const [questionInput, setQuestionInput] = useState('');

  const handleQuestionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
    // 새로운 보기 생성

    if (quiz.answer.length === 5) {
      //alert('최대 5개의 보기를 추가할 수 없습니다.');
      return;
    }
    const newAnswer = {
      id: uuidv4(), // 기존 보기의 마지막 ID에 +1
      value: '', // 보기의 내용은 비워둠
      isCorrect: false // 보기의 정답 여부는 기본적으로 false로 설정
    };

    // 기존 퀴즈에 새로운 보기를 추가하여 업데이트
    const updatedQuiz = {
      ...quiz,
      answer: [...quiz.answer, newAnswer]
    };

    // 업데이트된 퀴즈를 상태에 설정
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
    <section className='border border-black mb-3'>
      <p
        onClick={() => {
          handleDeleteQuiz(quiz.id);
        }}
        className='text-right'>
        퀴즈삭제하기
      </p>
      <div>
        <p>{index + 1}번</p>
        문제:
        <input
          className='border'
          value={questionInput}
          onChange={handleQuestionChange}
        />
        {quiz.answer.map((answer, idx) => {
          return (
            <QuizAnswer
              index={idx}
              answer={answer}
              key={answer.id}
              handleAnswerChange={handleAnswerChange}
              handleDeleteAnswer={handleDeleteAnswer}
            />
          );
        })}
      </div>
      <p onClick={handleAddAnswer}>보기추가</p>
    </section>
  );
};

export default QuizQuestion;
