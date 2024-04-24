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
      answer: [
        { id: uuidv4(), value: '', isCorrect: false },
        { id: uuidv4(), value: '', isCorrect: false }
      ]
    }
  ];
  const initialShortQuiz = [
    {
      type: 'short',
      id: uuidv4(),
      question: '',
      answer: [{ id: uuidv4(), value: '', isCorrect: false }]
    }
  ];
  const [quizes, setQuizes] = useState<Array<Quiz>>(initialQuiz);
  const [isMultiple, setIsMultiple] = useState(true);
  const supabase = createClient();

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

    if (type) {
      setQuizes(initialQuiz);
    } else {
      setQuizes(initialShortQuiz);
    }
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
    setIsMultiple(true);
    onClose();
  };

  const validationCheck = () => {
    if (quizes[0].question === '') {
      alert('문제를 입력해주세요.');
      return false;
    }
    // 중복된 정답을 확인하기 위한 Set 생성
    const answerSet = new Set();

    for (let i = 0; i < quizes[0].answer.length; i++) {
      const answerValue = quizes[0].answer[i].value;

      if (answerValue === '') {
        alert('정답을 입력해주세요.');
        return false;
      }

      if (answerSet.has(answerValue)) {
        // 중복된 정답이 있으면 알림 표시
        alert('중복된 정답이 있습니다.');
        return false;
      }

      answerSet.add(answerValue); // 정답을 Set에 추가
    }
    let correctCount = 0; // 정답 카운트 변수 추가
    for (let i = 0; i < quizes[0].answer.length; i++) {
      if (quizes[0].answer[i].value === '') {
        alert('정답을 입력해주세요.');
        return false;
      }
      if (quizes[0].answer[i].isCorrect) {
        correctCount++; // 정답이면 정답 카운트 증가
      }
    }
    if (correctCount !== 1 && quizes[0].type == 'multiple') {
      // 정답이 1개가 아니면 알림 표시
      alert('정답은 반드시 하나여야 합니다.');
      return false;
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
        onClick={() => {
          onClose();
          setIsMultiple(true);
        }}></div>
      <div className='bg-white rounded-lg z-10 relative md:w-[375px] w-full  px-4 py-6'>
        <div className='flex mb-6'>
          {/* 닫기 버튼 */}
          <button
            onClick={() => {
              onClose();
              setIsMultiple(true);
            }}
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
                className={`text-s cursor-pointer mr-2 ${
                  !isMultiple
                    ? 'bg-[#B3C1CC] text-white'
                    : 'bg-[#8A9DB3] text-white'
                } rounded-md p-1`}
                onClick={() => {
                  handleSwitchType(true);
                }}>
                객관식
              </div>
              <div
                className={`text-s cursor-pointer mr-2 ${
                  isMultiple
                    ? 'bg-[#B3C1CC] text-white'
                    : 'bg-[#8A9DB3] text-white'
                } rounded-md p-1`}
                onClick={() => {
                  handleSwitchType(false);
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
            className='w-full text-white bg-mainblue py-4 rounded-[10px] mt-6'>
            저장
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizModal;
