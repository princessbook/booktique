'use client';
import { createClient } from '@/utils/supabase/client';
import React, { useEffect, useRef, useState } from 'react';
import { QuizSchemaType, QuizsType } from '../quiz/QuizContainer';
import Image from 'next/image';
const parseSchema = (schema: string) => {
  try {
    return JSON.parse(schema);
  } catch (error) {
    console.error('Error parsing schema:', error);
    return null;
  }
};
const QuizArchiving = ({ clubId }: { clubId: string }) => {
  const supabase = createClient();
  const [quizsData, setQuizsData] = useState<QuizsType[]>();
  const textarea = useRef<HTMLTextAreaElement>(null);

  const handleResizeHeight = () => {
    if (textarea.current) {
      textarea.current.style.height = 'auto'; // 높이 초기화
      textarea.current.style.height = `${textarea.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    handleResizeHeight();
  }, [textarea]);

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
            schema: parseSchema(item.schema as string)
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
  }, [clubId, supabase]);

  if (!quizsData) return;

  return (
    <section className='overflow-scroll p-3 py-5 pb-10'>
      {quizsData?.length === 0 && (
        <div className='flex w-full h-full justify-center items-center'>
          <div className='flex flex-col w-full text-center justify-center items-center'>
            <p className='text-fontGrayBlue mb-16 mt-20 text-[14px]'>
              책 내용으로 퀴즈를 만들어 <br />
              북클럽 멤버들과 서로 맞춰보세요!
            </p>
            <div className='w-[191px] h-[130px]'>
              <Image
                src='/no_quiz.png'
                alt='no_quiz'
                width='191'
                height='130'
              />
            </div>
          </div>
        </div>
      )}
      {quizsData.length !== 0 && (
        <div>
          {quizsData &&
            quizsData.map((quizData, quizIdx) => {
              const schema = quizData.schema as QuizSchemaType;
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
                        <div
                          // type='text'
                          className='w-full rounded-md p-1 bg-white text-mainblue overflow-hidden'>
                          {schema.answer[0].value}
                        </div>
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
                        {schema.answer.map((answer) => {
                          return (
                            <div
                              className={`${
                                answer.isCorrect
                                  ? 'text-mainblue bg-white'
                                  : 'text-gray-400'
                              } bg-white bg-opacity-60 p-1 mb-1 rounded-md`}
                              key={answer.id}>
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
    </section>
  );
};

export default QuizArchiving;
