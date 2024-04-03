'use client';
import React, { PropsWithChildren, useState } from 'react';
type QuizAnswerProps = {
  answer: { id: string; value: string; isCorrect: boolean };
  handleAnswerChange: (id: string, value: string, checked: boolean) => void;
  handleDeleteAnswer: (id: string) => void;
  index: number;
};
const QuizAnswer = ({
  answer,
  index,
  handleAnswerChange,
  handleDeleteAnswer
}: PropsWithChildren<QuizAnswerProps>) => {
  const [answerInput, setAnswerInput] = useState(answer.value);
  const [isChecked, setIsChecked] = useState(answer.isCorrect);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAnswerInput(event.target.value);
    handleAnswerChange(answer.id, event.target.value, isChecked);
  };
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
    handleAnswerChange(answer.id, answerInput, event.target.checked);
  };

  return (
    <div>
      <span>{index + 1}번.</span>
      <label>보기</label>
      <input className='border' value={answerInput} onChange={handleChange} />
      <input
        type='checkbox'
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
      <span
        onClick={() => {
          handleDeleteAnswer(answer.id);
        }}>
        보기 삭제
      </span>
    </div>
  );
};

export default QuizAnswer;
