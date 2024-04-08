'use client';
import { useState } from 'react';
import MemberList from './MemberList';
import { Tables } from '@/lib/types/supabase';
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

  return (
    <>
      <div className='sticky top-0 z-10'>
        <div className='h-[42px] bg-subblue'>헤더</div>
        <div className='flex flex-col h-[102px] bg-subblue items-center '>
          <div className='mt-[16px]'>독서중 : 타이머</div>
          <div className='text-white h-[22px] mt-[8px]'>{clubData[0].name}</div>
        </div>
        <div className='flex w-full justify-center bg-white text-center border-b h-[49px] '>
          {/* 탭 구현 */}
          <div
            className={`cursor-pointer w-1/2 py-[15px] ${
              activeTab === '책읽기'
                ? 'text-[14px] text-[#3A3B42] border-b-2 border-black '
                : 'text-[14px] text-[#3A3B42]  '
            }`}
            onClick={() => setActiveTab('책읽기')}>
            책읽기
          </div>

          <div
            className={`cursor-pointer w-1/2 py-[15px] ${
              activeTab === '퀴즈'
                ? 'text-[14px] text-[#3A3B42] border-b-2 border-black'
                : 'text-[14px] text-[#3A3B42]'
            }`}
            onClick={() => setActiveTab('퀴즈')}>
            퀴즈
          </div>
        </div>
      </div>

      {activeTab === '책읽기' && (
        <>
          <MemberList id={id} clubMembers={clubMembers} />
        </>
      )}
      {activeTab === '퀴즈' && <QuizContainer clubId={id} />}
    </>
  );
};

export default BookInfo;
