import React, { PropsWithChildren } from 'react';
type QuizAnswerProps = {
  answer: { id: number; value: string; isCorrect: boolean };
};
const QuizAnswer = ({ answer }: PropsWithChildren<QuizAnswerProps>) => {
  return (
    <div>
      <span>{answer.id}.</span>
      <label>보기</label>
      <input className='border' />
    </div>
  );
};

export default QuizAnswer;
