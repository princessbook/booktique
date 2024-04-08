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
  const [isChecked, setIsChecked] = useState(answer.isCorrect);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAnswerInput(event.target.value);
    handleAnswerChange(answer.id, event.target.value, isChecked);
  };
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // setIsChecked(event.target.checked);
    handleAnswerChange(answer.id, answerInput, isChecked);
  };

  return (
    <div className='flex mb-2 justify-center items-center'>
      {/* <span>{index + 1}번.</span> */}
      {!isChecked ? (
        <label
          onClick={() => {
            setIsChecked((prev) => !prev);
          }}
          className='bg-[#B3C1CC] text-white px-3 py-1 rounded-full mr-2 '>
          정답
        </label>
      ) : (
        <label
          onClick={() => {
            setIsChecked((prev) => !prev);
          }}
          className=' bg-blue-300 text-white px-3 py-1 rounded-full mr-2 '>
          정답
        </label>
      )}
      <input
        className='flex-1 mr-2 rounded-md py-1'
        value={answerInput}
        onChange={handleChange}
      />
      {/* <input
        type='checkbox'
        checked={isChecked}
        onChange={handleCheckboxChange}
      /> */}
      <span
        onClick={() => {
          handleDeleteAnswer(answer.id);
        }}
        className=''>
        <div className='bg-[#136BAA] bg-opacity-60 rounded-full text-white'>
          <IoClose size={25} />
        </div>
      </span>
    </div>
  );
};

export default QuizAnswer;
