'use client';
import React, { PropsWithChildren, useState } from 'react';
type QuizAnswerProps = {
  answer: { id: string; value: string; isCorrect: boolean };
  handleAnswerChange: (id: string, value: string, checked: boolean) => void;
  handleDeleteAnswer: (id: string) => void;
  index: number;
};
const QuizShortAnswer = ({
  answer,
  handleAnswerChange
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
    <div className='relative'>
      <input
        className='rounded-md w-full p-2 text-[#3F3E4E]'
        value={answerInput}
        onChange={handleChange}
        placeholder='정답을 입력해 주세요'
        maxLength={28}
      />
      {answerInput.length > 10 && (
        <div
          className='absolute right-0 top-0 h-full rounded-md'
          style={{
            background: `linear-gradient(to right, transparent 20%, #fff 100%)`,
            width: '50px', // 조절 필요
            zIndex: 1
          }}></div>
      )}
    </div>
  );
};

export default QuizShortAnswer;
