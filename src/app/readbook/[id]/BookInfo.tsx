'use client';
import React, { useEffect, useState } from 'react';
import MemberList from './MemberList';
import { Tables } from '@/lib/types/supabase';
import Timer from './[save]/Timer';
import { getUserId } from '@/utils/userAPIs/authAPI';
import QuizContainer from '@/components/quiz/QuizContainer';

const BookInfo = ({
  clubData,
  clubId,
  clubMembers
}: {
  clubData: Tables<'clubs'>[];
  clubId: string;
  clubMembers: Tables<'members'>[];
}) => {
  // const [onlineUsers, setOnlineUsers] = useState(0);
  const [activeTab, setActiveTab] = useState('책읽기');
  const [timerVisible, setTimerVisible] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [endButtonVisible, setEndButtonVisible] = useState(true);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const logInId = await getUserId();
        setUserId(logInId);
        localStorage.setItem('userId', logInId as string);
      } catch (error) {
        console.error('사용자 ID를 가져오는 도중 오류가 발생했습니다:', error);
      }
    };

    fetchUserId();
  }, []);

  // useEffect(() => {
  //   const supabase = createClient();
  //   const channelName = `book_channel_${clubId}`;
  //   const bookChannel = supabase.channel(channelName);

  //   bookChannel
  //     .on('presence', { event: 'sync' }, () => {
  //       console.log('Synced presence state: ', bookChannel.presenceState());
  //       const presencedIds = clubMembers.map((member) => member.user_id);
  //       setOnlineUsers(presencedIds.length);
  //       console.log('presencedIds', presencedIds);
  //       const isAdminPresent = presencedIds.some((userId) => {
  //         const member = clubMembers.find(
  //           (member) => member.user_id === userId
  //         );
  //         return member && member.role === 'admin';
  //       });
  //       console.log('isAdminPresent:', isAdminPresent);
  //     })
  //     .subscribe(async (status) => {
  //       if (status === 'SUBSCRIBED') {
  //         await bookChannel.track({
  //           online_at: new Date().toISOString(),
  //           user_id: userId
  //         });
  //       }
  //     });

  //   return () => {
  //     bookChannel.unsubscribe();
  //   };
  // }, [userId, clubId, clubMembers]);

  const handleStartTimer = () => {
    // const isAdmin = clubMembers.some(
    //   (member) => member.user_id === userId && member.role === 'admin'
    // );
    // console.log('isAdmin', isAdmin);
    // if (isAdmin) {

    //   // 로컬 스토리지에 타이머 시작 상태 저장
    localStorage.setItem('timerStarted', 'true');
    // } else {
    //   alert('관리자만 책 읽기를 시작할 수 있습니다.');

    // }
    setTimerVisible(true);
    setEndButtonVisible(false);
  };
  useEffect(() => {
    // 컴포넌트 마운트 시 로컬 스토리지에서 타이머 시작 상태 확인
    localStorage.getItem('userId');
    const timerStarted = localStorage.getItem('timerStarted');
    if (timerStarted === 'true') {
      setTimerVisible(true);
      setEndButtonVisible(false);
    }
  }, []);
  // console.log('timerVisible', timerVisible);
  return (
    <>
      <div className='sticky top-0 z-10'>
        <div className='h-[42px] bg-mainblue'></div>
        <div className='sticky flex flex-col h-full bg-mainblue items-center h-[124px] '>
          <div className='mt-[16px] '>
            {!timerVisible && (
              <div
                className='mb-[24px] flex w-[189px] h-[54px] bg-[#D8FA8E] rounded-[10px] text-center text-[#269AED] font-bold text-[17px] leading-[26px] justify-center items-center'
                onClick={handleStartTimer}>
                책 읽기 시작
              </div>
            )}
            {timerVisible && (
              <Timer clubId={clubId} userId={userId as string} />
            )}
          </div>
          {timerVisible && (
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
            id={clubId}
            clubMembers={clubMembers}
            endButtonVisible={endButtonVisible}
            timerVisible={timerVisible}
            userId={userId}
          />
        </>
      )}
      {activeTab === '퀴즈' && <QuizContainer clubId={clubId} />}
    </>
  );
};

export default BookInfo;
