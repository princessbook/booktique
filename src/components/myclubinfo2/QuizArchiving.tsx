import { Tables } from '@/lib/types/supabase';
import { createClient } from '@/utils/supabase/client';
import React, { useEffect, useState } from 'react';
const parseSchema = (schema: any) => {
  try {
    return JSON.parse(schema);
  } catch (error) {
    console.error('Error parsing schema:', error);
    return null;
  }
};
const QuizArchiving = ({ clubId }: { clubId: string }) => {
  const supabase = createClient();
  const [quizsData, setQuizsData] = useState<Tables<'quiz'>[]>();
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
  }, [clubId, supabase]);

  if (!quizsData) return;

  return (
    <section className='overflow-scroll p-3 py-5 pb-10'>
      {quizsData?.length === 0 && (
        <div className='flex w-full h-full justify-center items-center'>
          <div className='flex w-full text-center'>
            <p className='text-center w-full'>등록된 퀴즈가 없습니다</p>
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
                          value={schema.answer[0].value}
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
