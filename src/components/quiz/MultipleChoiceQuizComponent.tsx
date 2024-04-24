import React from 'react';
import { twMerge } from 'tailwind-merge';
import { QuizSchemaType, QuizsType } from './QuizContainer';
const MultipleChoiceQuizComponent = ({
  quizData,
  selectedAnswers,
  quizIdx,
  schema,
  quizsData,
  quizResults,
  handleSelectAnswer,
  handleMultipleQuizSubmit
}: {
  quizResults: { [key: string]: boolean };
  quizsData: QuizsType[];
  quizData: QuizsType;
  selectedAnswers: (number | string)[];
  quizIdx: number;
  schema: QuizSchemaType;
  handleSelectAnswer: (quizIndex: number, answerIndex: number) => void;
  handleMultipleQuizSubmit: (
    quizData: QuizsType,
    selectedIndex: number
  ) => void;
}) => {
  return (
    <div className='bg-[#EDEEF2] p-3 rounded-md mb-2' key={quizData.id}>
      <div className='mb-2 text-[#3F3E4E] font-bold text-[#14px]'>
        {' '}
        {'Q' + (quizsData.length - quizIdx) + '. ' + schema.question}
      </div>
      <div>
        {schema.answer.map((answer: any, answerIndex: any) => {
          const isSelectedAnswer = selectedAnswers[quizIdx] === answerIndex;

          const isCorrectAnswer = schema.answer[answerIndex].isCorrect;
          const classNames = `${twMerge(
            `text-gray-400 bg-white bg-opacity-60 p-1 mb-1 rounded-md ${
              isSelectedAnswer ? 'bg-white bg-opacity-100 text-black' : ''
            } ${isSelectedAnswer && !isCorrectAnswer ? 'text-black ' : ''} ${
              isSelectedAnswer || quizResults[quizData.id] !== undefined
                ? isCorrectAnswer
                  ? 'text-mainblue border-primary400 bg-white bg-opacity-100 border-2 border-primary400'
                  : ''
                : ''
            }`
          )}
                            `;
          return (
            <div
              className={classNames}
              key={answer.id}
              onClick={() => {
                handleSelectAnswer(quizIdx, answerIndex);
                handleMultipleQuizSubmit(quizData, answerIndex);
              }}>
              {answer.value}
              <span className='ml-2'></span>
            </div>
          );
        })}
      </div>
      {quizResults[quizData.id] !== undefined && (
        <>
          <p
            className={
              quizResults[quizData.id]
                ? 'text-successGreen text-[12px] mt-2'
                : 'text-errorRed text-[12px] mt-2'
            }>
            {quizResults[quizData.id]
              ? '정답입니다!'
              : `정답이 아닙니다. 정답: ${
                  schema.answer.findIndex((answer: any) => answer.isCorrect) +
                  1 +
                  '번'
                }`}
          </p>
        </>
      )}
    </div>
  );
};

export default MultipleChoiceQuizComponent;
