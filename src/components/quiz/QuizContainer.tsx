import React, { useEffect, useState } from 'react';
import QuizModal from './QuizModal';
import { createClient } from '@/utils/supabase/client';
import { Tables } from '@/lib/types/supabase';

const parseSchema = (schema: any) => {
  try {
    return JSON.parse(schema);
  } catch (error) {
    console.error('Error parsing schema:', error);
    return null;
  }
};

const QuizContainer = ({ clubId }: { clubId: string }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const supabase = createClient();
  const [quizsData, setQuizsData] = useState<Tables<'quiz'>[]>();
  const [selectedAnswer, setSelectedAnswer] = useState<number[] | string>([]);
  const [submitAnswer, setSubmitAnswer] = useState(false);

  useEffect(() => {
    const fetchQuizesByClubId = async (clubId: string) => {
      try {
        const { data: quizes, error } = await supabase
          .from('quiz')
          .select('*')
          .eq('club_id', clubId)
          .order('created_at', { ascending: false });

        if (quizes) {
          const parsedData = quizes.map((item) => ({
            ...item,
            schema: parseSchema(item.schema)
          }));
          setQuizsData(parsedData);
        }

        if (error) {
          throw error;
        }

        return quizes;
      } catch (error) {
        console.error('Error fetching quizes by club ID:', error);
        return null;
      }
    };

    fetchQuizesByClubId(clubId);
  }, [clubId, submitAnswer, supabase]);

  const handleSelectAnswer = (quizIndex: number, answerIndex: number) => {
    setSelectedAnswer((prevAnswers) => {
      const updatedAnswers = [...(prevAnswers as any)];
      updatedAnswers[quizIndex] = answerIndex;
      return updatedAnswers;
    });
  };

  if (!quizsData) return;
  return (
    <section className='overflow-scroll p-3 py-5 pb-10'>
      {quizsData?.length === 0 && (
        <div className='flex w-full h-full justify-center items-center'>
          <div className='flex w-full text-center'>
            <p className='text-center w-full'>퀴즈를 만들어 주세요!</p>
          </div>
        </div>
      )}
      {quizsData.length !== 0 && (
        <div>
          {quizsData &&
            quizsData.map((quizData, quizIdx) => {
              const { schema } = quizData as any;
              if (schema) {
                if (schema.type === 'short') {
                  return (
                    <div
                      key={quizData.id}
                      className='bg-[#EDEEF2] p-3 rounded-md mb-2'>
                      {
                        <div className='mb-1'>
                          {'Q' +
                            (quizsData.length - quizIdx) +
                            '. ' +
                            schema.question}
                        </div>
                      }
                      <div>
                        <input
                          type='text'
                          className='w-full rounded-md p-1 text-mainblue'
                          placeholder='정답을 입력해 주세요'
                        />
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <div
                      className='bg-[#EDEEF2] p-3 rounded-md mb-2'
                      key={quizData.id}>
                      <div className='mb-2'>
                        {' '}
                        {'Q' +
                          (quizsData.length - quizIdx) +
                          '. ' +
                          schema.question}
                      </div>
                      <div>
                        {schema.answer.map((answer: any, answerIndex: any) => {
                          return (
                            <div
                              className={`text-gray-400 bg-white bg-opacity-60 p-1 mb-1 rounded-md ${
                                selectedAnswer[quizIdx] === answerIndex
                                  ? 'text-mainblue bg-white bg-opacity-100'
                                  : '' // 선택한 답변에 대한 스타일 조건부 적용
                              }`}
                              key={answer.id}
                              onClick={() =>
                                handleSelectAnswer(quizIdx, answerIndex)
                              }>
                              {answer.value}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                }
              }
            })}
        </div>
      )}

      <div className='fixed bottom-32 right-8'>
        <div
          className='bg-[#3F3E4E] py-3 px-5 text-white rounded-full shadow-lg hover:shadow-xl transition duration-300 font-bold cursor-pointer'
          onClick={() => {
            setModalOpen(true);
          }}>
          퀴즈 만들기
        </div>
      </div>
      <QuizModal
        setSubmitAnswer={setSubmitAnswer}
        clubId={clubId}
        isModal={modalOpen}
        onClose={() => {
          setModalOpen(false);
        }}
      />
    </section>
  );
};

export default QuizContainer;
