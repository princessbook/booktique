import { Tables } from '@/lib/types/supabase';
import React from 'react';
import { QuizSchemaType, QuizsType } from './QuizContainer';

const ShortQuizComponent = ({
  quizData,
  selectedAnswers,
  quizIdx,
  schema,
  quizsData,
  quizResults,
  handleInputChange,
  handleShortQuizSubmit
}: {
  quizResults: { [key: string]: boolean };
  quizsData: QuizsType[];
  quizData: QuizsType;
  selectedAnswers: (number | string)[];
  quizIdx: number;
  schema: QuizSchemaType;
  handleInputChange: (quizIndex: number, value: string) => void;
  handleShortQuizSubmit: (quizData: QuizsType, answer: string) => void;
}) => {
  return (
    <div key={quizData.id} className='bg-[#EDEEF2] p-3 rounded-md mb-2'>
      {
        <div className='mb-1 text-[#3F3E4E] font-bold text-[#14px]'>
          {'Q' + (quizsData.length - quizIdx) + '. ' + schema.question}
        </div>
      }
      <div>
        <input
          type='text'
          className='w-full rounded-md p-1 text-mainblue'
          placeholder='정답을 입력해 주세요'
          onChange={(e) => handleInputChange(quizIdx, e.target.value)}
        />
      </div>
      <button
        onClick={() => {
          if (selectedAnswers[quizIdx]) {
            handleShortQuizSubmit(quizData, selectedAnswers[quizIdx] as string);
          }
        }}
        className={`w-full mt-2 p-2.5 rounded-full ${
          selectedAnswers[quizIdx]
            ? 'bg-primary400 text-white hover:bg-primary500'
            : ' bg-fontGrayLight text-white cursor-not-allowed'
        }`}>
        정답 제출하기
      </button>
      {quizResults[quizData.id] !== undefined && ( // 정답 결과가 있을 경우에만 메시지를 표시
        <p
          className={
            quizResults[quizData.id]
              ? 'text-successGreen text-[12px] mt-2'
              : 'text-errorRed text-[12px] mt-2'
          }>
          {quizResults[quizData.id]
            ? '정답입니다!'
            : '정답이 아닙니다. 정답 :' + schema.answer[0].value}
        </p>
      )}
      {/* 정답이 틀렸다면 표시 */}
    </div>
  );
};

export default ShortQuizComponent;
