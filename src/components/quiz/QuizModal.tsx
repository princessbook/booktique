import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import QuizQuestion, { Quiz } from './QuizQuestion';
import { createClient } from '@/utils/supabase/client';

const QuizModal = ({
  isModal,
  onClose,
  clubId,
  setSubmitAnswer
}: {
  isModal: boolean;
  clubId: string;
  onClose: () => void;
  setSubmitAnswer: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const initialQuiz = [
    {
      type: 'multiple',
      id: uuidv4(),
      question: '',
      answer: [{ id: uuidv4(), value: '', isCorrect: false }]
    }
  ];
  const [quizes, setQuizes] = useState<Array<Quiz>>(initialQuiz);
  const [isMultiple, setIsMultiple] = useState(true);
  const supabase = createClient();
  const [isMultipleActive, setIsMultipleActive] = useState(true);

  // const handleAddQuiz = () => {
  //   if (quizes.length === 10) {
  //     return;
  //   }
  //   const newQuiz = {
  //     type: isMultiple ? 'multiple' : 'short',
  //     id: uuidv4(),
  //     question: '',
  //     answer: [{ id: uuidv4(), value: '', isCorrect: false }]
  //   };
  //   setQuizes([...quizes, newQuiz]);
  // };
  const handleDeleteQuiz = (id: string) => {
    setQuizes(quizes.filter((quiz) => quiz.id !== id));
  };

  const handleSwitchType = (type: boolean) => {
    setIsMultiple(type);
    const updatedQuizes = quizes.map((quiz) => ({
      ...quiz,
      type: type ? 'multiple' : 'short'
    }));
    setQuizes(updatedQuizes);
  };

  const handleSave = async () => {
    if (!validationCheck()) return;
    const quizData = JSON.stringify(quizes[0]);
    const {
      data: { user }
    } = await supabase.auth.getUser();

    const { data, error } = await supabase.from('quiz').insert([
      {
        creator_id: user!.id,
        club_id: clubId,
        title: 'hello',
        schema: quizData,
        created_at: new Date().toISOString()
      }
    ]);
    setSubmitAnswer((prev) => !prev);
    setQuizes(initialQuiz);
    onClose();
  };

  const validationCheck = () => {
    if (quizes[0].question === '') {
      alert('문장을 입력해주세요.');
      return false;
    }
    for (let i = 0; i < quizes[0].answer.length; i++) {
      if (quizes[0].answer[i].value === '') {
        alert('정답을 입력해주세요.');
        return false;
      }
    }
    let isAnyCorrect = false;

    for (let i = 0; i < quizes[0].answer.length; i++) {
      if (quizes[0].answer[i].isCorrect === true) {
        isAnyCorrect = true;
        break;
      }
    }

    if (quizes[0].type === 'question') {
      if (!isAnyCorrect) {
        alert('적어도 하나의 정답을 선택해주세요.');
        return false;
      }
    }
    return true;
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-end justify-center ${
        isModal ? '' : 'hidden'
      }`}>
      <div
        className='absolute inset-0 bg-black opacity-50'
        onClick={onClose}></div>
      <div className='bg-white rounded-lg z-10 relative w-full px-4 py-6'>
        <div className='flex mb-6'>
          {/* 닫기 버튼 */}
          <button
            onClick={onClose}
            className=' text-gray-600 hover:text-gray-800 absolute'>
            <div className='w-[22px] h-[22px] relative'>
              <div className='absolute top-1/2 left-0 w-full h-[2px] bg-black transform -translate-y-1/2 rotate-45'></div>
              <div className='absolute top-1/2 left-0 w-full h-[2px] bg-black transform -translate-y-1/2 -rotate-45'></div>
            </div>
          </button>
          <span className='w-full text-center font-bold'>퀴즈 만들기</span>
        </div>
        {/* 모달 내용 */}
        <div>
          <div className='relative bg-[#EDEEF2] p-3 rounded-md'>
            <div className='flex mb-3'>
              <div
                className={`text-s  mr-2 ${
                  !isMultipleActive
                    ? 'bg-[#B3C1CC] text-white'
                    : 'bg-[#8A9DB3] text-white'
                } rounded-md p-1`}
                onClick={() => {
                  handleSwitchType(true);
                  setIsMultipleActive(true);
                }}>
                객관식
              </div>
              <div
                className={`text-s mr-2 ${
                  isMultipleActive
                    ? 'bg-[#B3C1CC] text-white'
                    : 'bg-[#8A9DB3] text-white'
                } rounded-md p-1`}
                onClick={() => {
                  handleSwitchType(false);
                  setIsMultipleActive(false);
                }}>
                주관식
              </div>
            </div>
            <form>
              {quizes.map((quiz, index) => {
                return (
                  <QuizQuestion
                    isMultiple={isMultiple}
                    index={index}
                    setQuiz={setQuizes}
                    handleDeleteQuiz={handleDeleteQuiz}
                    quiz={quiz}
                    key={quiz.id}
                  />
                );
              })}
            </form>
            {/* <button onClick={handleAddQuiz} className=' bg-blue-600'>
              퀴즈추가하기
            </button> */}
          </div>

          <button
            onClick={handleSave}
            className='w-full bg-mainblue py-4 rounded-[10px] mt-6'>
            저장
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizModal;
