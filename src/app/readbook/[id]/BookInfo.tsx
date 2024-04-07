'use client';
import { useState } from 'react';
import MemberList from './MemberList';
import { Tables } from '@/lib/types/supabase';

const BookInfo = ({
  clubData,
  id,
  clubMembers
}: {
  clubData: Tables<'clubs'>;
  id: string;
  clubMembers: Tables<'members'>[];
}) => {
  const [activeTab, setActiveTab] = useState('책읽기');

  return (
    <>
      <div>헤더</div>
      <div className='flex flex-col items-center bg-subblue'>
        <div>독서중 : 타이머</div>
        <div className='h-[150px] sticky'>{clubData[0].name}</div>
        <div className='flex w-full justify-center bg-white text-center border-b '>
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
        <div>
          <MemberList id={id} clubMembers={clubMembers} />
        </div>
      )}
      {activeTab === '퀴즈' && <div>퀴즈 내용 </div>}
    </>
  );
};

export default BookInfo;
