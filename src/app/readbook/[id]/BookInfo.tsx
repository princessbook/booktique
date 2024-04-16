'use client';
import React, { useEffect, useState } from 'react';
import MemberList from './MemberList';
import { Tables } from '@/lib/types/supabase';
import Timer from './[save]/Timer';
import { getUserId } from '@/utils/userAPIs/authAPI';
import QuizContainer from '@/components/quiz/QuizContainer';
import { createClient } from '@/utils/supabase/client';
import { RealtimePostgresInsertPayload } from '@supabase/supabase-js';
import useAlarmStore from '@/store';

const BookInfo = ({
  clubData,
  clubId,
  clubMembers
}: {
  clubData: Tables<'clubs'>[];
  clubId: string;
  clubMembers: Tables<'members'>[];
}) => {
  const [activeTab, setActiveTab] = useState('책읽기');
  const [timerVisible, setTimerVisible] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [endButtonVisible, setEndButtonVisible] = useState(true);
  const supabase = createClient();

  // const { alarms, addAlarm, clearAlarms } = useAlarmStore();

  // console.log('alarms111111111111111111111111', alarms);
  // console.log('addAlarm1111111111111111111111', addAlarm);
  // console.log('clearAlarms11111111111111111111', clearAlarms);
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

  const [postData, setPostData] =
    useState<null | RealtimePostgresInsertPayload<{
      [key: string]: string;
    }>>(null);
  console.log('postData', postData);

  useEffect(() => {
    const channelA = supabase
      .channel('dy')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'post',
          filter: `user_id=in.(${clubMembers.map((item) => item.user_id)})`
        },
        (payload) => {
          console.log('payload', payload);
          setPostData(payload);
        }
      )
      .subscribe();

    return () => {
      channelA.unsubscribe();
    };
  }, [clubMembers]);

  useEffect(() => {
    const timerStarted = localStorage.getItem('timerStarted');
    if (timerStarted === 'true') {
      setTimerVisible(true);
      setEndButtonVisible(false);
    }
  }, []);

  useEffect(() => {
    if (postData) {
      const writerId = postData.new.user_id;
      const postAlarm = async () => {
        try {
          const { data: user } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', writerId)
            .single();

          if (user) {
            // console.log('user', user);
            const writerName = user.display_name;
            const isAdmin = clubMembers.some(
              (member) => member.user_id === userId && member.role === 'admin'
            );
            if (isAdmin) {
              console.log('방장은 알럿을 받지 않습니다.');
              return;
            }

            const newAlarm = {
              created_at: postData.commit_timestamp,
              target_user_id: userId,
              content: `${writerName}님이${postData.new.title}모임을 시작하셨습니다: `,
              post_id: postData.new.id
            };

            const memberUserIds = clubMembers
              .filter((member) => member.role === 'member')
              .map((member) => member.user_id);

            await supabase
              .from('alarm')
              .insert(newAlarm)
              .in('target_user_id', memberUserIds);

            console.log('알람 테이블에 추가되었습니다.');

            const { data: alarm } = await supabase
              .from('alarm')
              .select('*')
              .eq('target_user_id', writerId)
              .order('created_at', { ascending: true });
            console.log('alarm', alarm);

            if (
              alarm &&
              alarm.length > 0 &&
              alarm[0].target_user_id === userId
            ) {
              alert(alarm[alarm.length - 1]?.content);
            }
          }
        } catch (error) {
          console.error('알림을 생성하는 도중 오류가 발생했습니다:', error);
        }
      };
      postAlarm();
    }
  }, [postData, userId, clubMembers, supabase]);

  const handleStartTimer = async () => {
    try {
      await startMeeting();
      localStorage.setItem('timerStarted', 'true');
      setTimerVisible(true);
      setEndButtonVisible(false);
    } catch (error) {
      console.error('모임 시작 중 오류가 발생했습니다:', error);
    }
  };

  const startMeeting = async () => {
    try {
      const admins = clubMembers.filter((member) => member.role === 'admin');
      const adminUserId = admins.map((admin) => admin.user_id);

      if (!adminUserId.includes(userId)) {
        console.log('관리자만 모임을 시작할 수 있습니다.');
        return;
      }

      await supabase.from('post').insert([
        {
          user_id: userId,
          title: clubData[0].name,
          created_at: new Date().toISOString(),
          club_id: clubId
        }
      ]);
      console.log('삽입!@@@!@!@!@');
    } catch (error) {
      console.error('데이터를 삽입하는 도중 오류가 발생했습니다:', error);
    }
  };

  const bookTitle = clubData[0].book_title || '';
  const titleLength = bookTitle.length;
  const isSingleLine = titleLength <= 40;
  const containerHeight =
    isSingleLine || !timerVisible ? 'h-[102px]' : 'h-[124px]';

  return (
    <>
      <div className='sticky top-0 z-10'>
        <div className='h-[42px] bg-mainblue'></div>
        <div
          className={`sticky flex flex-col bg-mainblue items-center ${containerHeight}`}>
          <div className='mt-[16px] '>
            {!timerVisible && (
              <div className='flex'>
                <div
                  className='mb-[24px] flex w-[189px] h-[54px] bg-[#D8FA8E] rounded-[10px] text-center text-[#269AED] font-bold text-[17px] leading-[26px] justify-center items-center'
                  onClick={handleStartTimer}>
                  책 읽기 시작
                </div>
              </div>
            )}
            {timerVisible && (
              <Timer clubId={clubId} userId={userId as string} />
            )}
          </div>
          {timerVisible && (
            <div className='text-white mt-[8px] mb-[16px] w-[295px] text-center break-words line-clamp-2'>
              {/* {clubData[0].book_title && clubData[0].book_title.length > 40
                ? clubData[0].book_title?.substring(0, 40) + '...'
                : clubData[0].book_title} */}
              {clubData[0].book_title}
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
