'use client';
import QuizAnswer from './QuizAnswer';
import { Quiz } from './page';

type QuizQuestionProps = {
  quiz: Quiz;
  handleDeleteQuiz: (id: number) => void;
  setQuiz: React.Dispatch<React.SetStateAction<Quiz[]>>;
};
const QuizQuestion = ({
  quiz,
  handleDeleteQuiz,
  setQuiz
}: QuizQuestionProps) => {
  const handleAddAnswer = () => {
    // 새로운 보기 생성
    const newAnswer = {
      id: quiz.answer.length + 1, // 기존 보기의 마지막 ID에 +1
      value: '', // 보기의 내용은 비워둠
      isCorrect: false // 보기의 정답 여부는 기본적으로 false로 설정
    };

    // 기존 퀴즈에 새로운 보기를 추가하여 업데이트
    const updatedQuiz = {
      ...quiz,
      answer: [...quiz.answer, newAnswer]
    };

    // 업데이트된 퀴즈를 상태에 설정
    setQuiz((prevQuizes) =>
      prevQuizes.map((prevQuiz) =>
        prevQuiz.id === quiz.id ? updatedQuiz : prevQuiz
      )
    );
  };
  return (
    <section className='border border-black mb-3'>
      <p
        onClick={() => {
          handleDeleteQuiz(quiz.id);
        }}
        className='text-right'>
        퀴즈삭제하기
      </p>
      <div>
        <p>{quiz.id}번</p>
        문제:
        <input className='border' />
        {quiz.answer.map((answer, idx) => {
          return <QuizAnswer answer={answer} key={answer.id} />;
        })}
      </div>
      <p onClick={handleAddAnswer}>보기추가</p>
    </section>
  );
};

export default QuizQuestion;
