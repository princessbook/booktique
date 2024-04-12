import React, { useEffect, useState } from 'react';
import QuizModal from './QuizModal';
import { createClient } from '@/utils/supabase/client';
import { Tables } from '@/lib/types/supabase';
import { twMerge } from 'tailwind-merge';
twMerge;
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
  const [selectedAnswers, setSelectedAnswers] = useState<(number | string)[]>(
    []
  );
  const [submitAnswer, setSubmitAnswer] = useState(false);
  const [quizResults, setQuizResults] = useState<{ [key: string]: boolean }>(
    {}
  );

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
  const handleInputChange = (quizIndex: number, value: string) => {
    setSelectedAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[quizIndex] = value;
      return updatedAnswers;
    });
  };

  const handleSelectAnswer = (quizIndex: number, answerIndex: number) => {
    setSelectedAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[quizIndex] = answerIndex;
      return updatedAnswers;
    });
  };
  const handleMultipleQuizSubmit = (
    quizData: any,
    selectedAnswerIndex: number
  ) => {
    const correctAnswerIndex = quizData.schema.answer.findIndex(
      (answer: any) => answer.isCorrect
    );
    const isCorrect = selectedAnswerIndex === correctAnswerIndex;
    setQuizResults((prev) => ({
      ...prev,
      [quizData.id]: isCorrect
    }));
  };
  const handleShortQuizSubmit = (quizData: any, answer: string) => {
    const isCorrect = quizData.schema.answer[0].value === answer;
    setQuizResults((prevResults) => ({
      ...prevResults,
      [quizData.id]: isCorrect
    }));
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
                        <div className='mb-1 text-[#3F3E4E] font-bold text-[#14px]'>
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
                          onChange={(e) =>
                            handleInputChange(quizIdx, e.target.value)
                          }
                        />
                      </div>
                      <button
                        onClick={() => {
                          if (selectedAnswers[quizIdx]) {
                            handleShortQuizSubmit(
                              quizData,
                              selectedAnswers[quizIdx] as string
                            );
                          }
                        }}
                        className='w-full bg-primary400 text-white mt-2 p-2.5 rounded-full'>
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
                            : '정답이 아닙니다. 정답 :' +
                              schema.answer[0].value}
                        </p>
                      )}
                      {/* 정답이 틀렸다면 표시 */}
                    </div>
                  );
                } else {
                  return (
                    <div
                      className='bg-[#EDEEF2] p-3 rounded-md mb-2'
                      key={quizData.id}>
                      <div className='mb-2 text-[#3F3E4E] font-bold text-[#14px]'>
                        {' '}
                        {'Q' +
                          (quizsData.length - quizIdx) +
                          '. ' +
                          schema.question}
                      </div>
                      <div>
                        {schema.answer.map((answer: any, answerIndex: any) => {
                          const isSelectedAnswer =
                            selectedAnswers[quizIdx] === answerIndex;

                          const isCorrectAnswer =
                            schema.answer[answerIndex].isCorrect;
                          const classNames = `${twMerge(
                            `text-gray-400 bg-white bg-opacity-60 p-1 mb-1 rounded-md ${
                              isSelectedAnswer
                                ? 'bg-white bg-opacity-100 text-black'
                                : ''
                            } ${
                              isSelectedAnswer && !isCorrectAnswer
                                ? 'text-black '
                                : ''
                            } ${
                              isSelectedAnswer ||
                              quizResults[quizData.id] !== undefined
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
                                  schema.answer.findIndex(
                                    (answer: any) => answer.isCorrect
                                  ) +
                                  1 +
                                  '번'
                                }`}
                          </p>
                        </>
                      )}
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
