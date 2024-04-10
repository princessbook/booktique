'use client';
import { useEffect, useState } from 'react';
import MemberList from './MemberList';
import { Tables } from '@/lib/types/supabase';
import Timer from './[save]/Timer';
import { getUserId } from '@/utils/userAPIs/authAPI';
import QuizContainer from '@/components/quiz/QuizContainer';

const BookInfo = ({
  clubData,
  id,
  clubMembers
}: {
  clubData: Tables<'clubs'>[];
  id: string;
  clubMembers: Tables<'members'>[];
}) => {
  const [activeTab, setActiveTab] = useState('책읽기');
  const [timerVisible, setTimerVisible] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [endButtonVisible, setEndButtonVisible] = useState(true);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const id = await getUserId();
        console.log('id', id);
        setUserId(id);
      } catch (error) {
        console.error('사용자 ID를 가져오는 도중 오류가 발생했습니다:', error);
      }
    };

    fetchUserId();
  }, []);
  const handleStartTimer = () => {
    setTimerVisible(true);
    setEndButtonVisible(false);
  };
  const clubId = clubData.length > 0 ? clubData[0].id : '';
  return (
    <>
      <div className='sticky top-0 z-10'>
        <div className='h-[42px] bg-mainblue'>헤더</div>
        <div className='sticky flex flex-col h-full bg-mainblue items-center h-[124px] '>
          <div className='mt-[16px] '>
            {!timerVisible && (
              <div
                className='mb-[24px] flex w-[189px] h-[54px] bg-[#D8FA8E] rounded-[10px] text-center text-[#269AED] font-bold text-[17px] leading-[26px] justify-center items-center'
                onClick={handleStartTimer}>
                책 읽기 시작
              </div>
            )}
            {timerVisible && <Timer clubId={id} userId={userId as string} />}
          </div>
          {timerVisible && ( // 타이머가 표시되면 책 제목 표시
            <div className='text-white mt-[8px] mb-[16px] w-[295px] text-center '>
              {clubData[0].book_title && clubData[0].book_title.length > 40
                ? clubData[0].book_title?.substring(0, 40) + '...'
                : clubData[0].book_title}
            </div>
          )}
        </div>
        <div className='flex w-full justify-center bg-white text-center border-b h-[49px] '>
          <div
            className={`cursor-pointer w-1/2 py-[15px] ${
              activeTab === '책읽기'
                ? 'text-[14px] text-[#3A3B42] leading-[17px] text-center font-bold border-b-2 border-black '
                : 'text-[14px] text-[#3A3B42] text-opacity-50 leading-[17px] text-center font-bold '
            }`}
            onClick={() => setActiveTab('책읽기')}>
            책읽기
          </div>

          <div
            className={`cursor-pointer w-1/2 py-[15px] ${
              activeTab === '퀴즈'
                ? 'text-[14px] text-[#3A3B42] leading-[17px] text-center font-bold border-b-2 border-black'
                : 'text-[14px] text-[#3A3B42] text-opacity-50  leading-[17px] text-center font-bold'
            }`}
            onClick={() => setActiveTab('퀴즈')}>
            퀴즈
          </div>
        </div>
      </div>

      {activeTab === '책읽기' && (
        <>
          <MemberList
            clubId={clubId}
            id={id}
            clubMembers={clubMembers}
            endButtonVisible={endButtonVisible}
          />
        </>
      )}
      {activeTab === '퀴즈' && <QuizContainer clubId={id} />}
    </>
  );
};

export default BookInfo;
//  sticky 수정 필요
