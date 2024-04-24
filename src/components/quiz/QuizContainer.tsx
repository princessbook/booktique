import React, { useEffect, useState } from 'react';
import QuizModal from './QuizModal';
import { createClient } from '@/utils/supabase/client';
import { Tables } from '@/lib/types/supabase';
import MultipleChoiceQuizComponent from './MultipleChoiceQuizComponent';
import ShortQuizComponent from './ShortQuizComponent';

export type QuizSchemaType = {
  question: string;
  id: string;
  answer: {
    id: string;
    value: string;
    isCorrect: boolean;
  }[];
  type: string;
};
const parseSchema = (schema: string) => {
  try {
    return JSON.parse(schema);
  } catch (error) {
    console.error('Error parsing schema:', error);
    return null;
  }
};

export type QuizsType = Tables<'quiz'>;
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
            schema: parseSchema(item.schema as string)
          }));
          // console.log('parsed Data', parsedData);
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
    quizData: QuizsType,
    selectedAnswerIndex: number
  ) => {
    const correctAnswerIndex = (
      quizData.schema as QuizSchemaType
    )?.answer.findIndex((answer: any) => answer.isCorrect);
    const isCorrect = selectedAnswerIndex === correctAnswerIndex;
    setQuizResults((prev) => ({
      ...prev,
      [quizData.id]: isCorrect
    }));
  };
  const handleShortQuizSubmit = (quizData: QuizsType, answer: string) => {
    const isCorrect =
      (quizData.schema as QuizSchemaType)?.answer[0].value === answer;
    setQuizResults((prevResults) => ({
      ...prevResults,
      [quizData.id]: isCorrect
    }));
  };

  if (!quizsData) return;
  return (
    <section className='overflow-scroll p-3 py-5 pb-10 mb-[78px] overflow-y-auto'>
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
              const schema = quizData.schema as QuizSchemaType;
              if (schema) {
                if (schema.type === 'short') {
                  return (
                    <ShortQuizComponent
                      key={quizIdx}
                      quizData={quizData}
                      selectedAnswers={selectedAnswers}
                      quizIdx={quizIdx}
                      schema={schema}
                      quizsData={quizsData}
                      quizResults={quizResults}
                      handleInputChange={handleInputChange}
                      handleShortQuizSubmit={handleShortQuizSubmit}
                    />
                  );
                } else {
                  return (
                    <MultipleChoiceQuizComponent
                      key={quizIdx}
                      quizData={quizData}
                      selectedAnswers={selectedAnswers}
                      quizIdx={quizIdx}
                      schema={schema}
                      quizsData={quizsData}
                      quizResults={quizResults}
                      handleSelectAnswer={handleSelectAnswer}
                      handleMultipleQuizSubmit={handleMultipleQuizSubmit}
                    />
                  );
                }
              }
            })}
        </div>
      )}
      <div className='flex justify-end'>
        <div className='fixed bottom-24'>
          <div
            className='bg-[#3F3E4E] py-3 px-5 text-white rounded-full shadow-lg hover:shadow-xl transition duration-300 font-bold cursor-pointer'
            onClick={() => {
              setModalOpen(true);
            }}>
            퀴즈 만들기
          </div>
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
