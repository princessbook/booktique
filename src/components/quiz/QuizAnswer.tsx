'use client';
import React, { PropsWithChildren, useState } from 'react';
import { IoClose } from 'react-icons/io5';
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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAnswerInput(event.target.value);
    handleAnswerChange(answer.id, event.target.value, answer.isCorrect);
  };
  const handleCheckboxChange = (isChecked: boolean) => {
    handleAnswerChange(answer.id, answerInput, isChecked);
  };

  return (
    <div className='flex mb-2 justify-center items-center'>
      {!answer.isCorrect ? (
        <label
          onClick={() => {
            handleCheckboxChange(!answer.isCorrect);
          }}
          className='bg-[#B3C1CC] text-white px-3 py-1 rounded-full mr-2 '>
          정답
        </label>
      ) : (
        <label
          onClick={() => {
            // setIsChecked((prev) => !prev);
            handleCheckboxChange(!answer.isCorrect);
          }}
          className=' bg-blue-300 text-white px-3 py-1 rounded-full mr-2 '>
          정답
        </label>
      )}
      <div className='relative flex-1'>
        <input
          className='flex-1 w-full rounded-md p-2 text-[#3F3E4E]'
          value={answerInput}
          onChange={handleChange}
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

      <span
        onClick={() => {
          handleDeleteAnswer(answer.id);
        }}
        className=''>
        <div className='bg-[#136BAA] ml-2 bg-opacity-60 rounded-full text-white'>
          <IoClose size={25} />
        </div>
      </span>
    </div>
  );
};

export default QuizAnswer;
