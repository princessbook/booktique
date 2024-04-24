'use client';
import React, { useEffect, useState } from 'react';
import MemberList from './MemberList';
import { Tables } from '@/lib/types/supabase';
import Timer from './[save]/Timer';
import { getUserId } from '@/utils/userAPIs/authAPI';
import QuizContainer from '@/components/quiz/QuizContainer';
import { createClient } from '@/utils/supabase/client';
import { RealtimePostgresInsertPayload } from '@supabase/supabase-js';
import ToastUi from '@/common/ToastUi';
import Image from 'next/image';
import Link from 'next/link';
import close from '../../../../../public/close_read.png';
import useModalStore from '@/store/modalstore';
import { useQuery } from '@tanstack/react-query';
import { getReadBookPageData } from '@/utils/testAPIs';
// import useRealtimePostgresChanges from '@/hooks/useRealtimePostgresChanges';
// import useAlarmStore from '@/store';

const BookInfo = ({
  // clubData,
  clubId,
  // clubMembers,
  chat
}: {
  // clubData: Tables<'clubs'>[];
  clubId: string;
  // clubMembers: Tables<'members'>[];
  chat: React.ReactNode;
}) => {
  const [activeTab, setActiveTab] = useState('책읽기');
  const [timerVisible, setTimerVisible] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [endButtonVisible, setEndButtonVisible] = useState(true);
  const [alarmToast, setAlarmToast] = useState(false);
  const [remainTimeToast, setRemainTimeToast] = useState(false);
  const [remainingMinutes, setRemainingMinutes] = useState<number>(0);
  const [remainingSeconds, setRemainingSeconds] = useState<number>(0);
  const supabase = createClient();
  const { resetModal } = useModalStore();
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

  //승희가 변경중
  const { data, isLoading, isError } = useQuery({
    queryKey: ['readbook', clubId],
    queryFn: getReadBookPageData,
    staleTime: 1000 * 10
  });

  const [postData, setPostData] =
    useState<null | RealtimePostgresInsertPayload<{
      [key: string]: string;
    }>>(null);

  // useRealtimePostgresChanges(
  //   'post',
  //   `user_id=in.(${clubMembers.map((item) => item.user_id)})`,
  //   (payload) => {
  //     console.log('payload', payload);
  //     setPostData(payload);
  //   }
  // );
  useEffect(() => {
    const channelA = supabase
      .channel('dy')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'post',
          filter: `user_id=in.(${data?.members.map((item) => item.user_id)})`
        },
        (payload) => {
          // console.log('payload', payload);
          setPostData(payload);
        }
      )
      .subscribe();

    return () => {
      channelA.unsubscribe();
    };
  }, [data, supabase]);

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
            const writerName = user.display_name;

            const newAlarm = {
              created_at: postData.commit_timestamp,
              target_user_id: userId,
              content: `${writerName}님이 <${postData.new.title}>모임을 시작하셨습니다. `,
              post_id: postData.new.id
            };
            // console.log('postData', postData);
            // 모든 멤버에게 알림을 보내기
            const memberUserIds = data?.members.map((member) => member.user_id);
            await supabase
              .from('alarm')
              .insert(newAlarm)
              .in('target_user_id', memberUserIds as any);

            // console.log('알람 테이블에 추가되었습니다.');

            const { data: alarm } = await supabase
              .from('alarm')
              .select('*')
              .eq('target_user_id', writerId)
              .order('created_at', { ascending: true });
            // console.log('alarm', alarm);

            const isAdmin = data?.members.some(
              (member) => member.user_id === userId && member.role === 'admin'
            );
            if (isAdmin) {
              // console.log('방장은 알럿을 받지 않습니다.');
              return;
            }
            if (alarm) {
              alert(alarm[alarm.length - 1]?.content);
            }
          }
        } catch (error) {
          console.error('알림을 생성하는 도중 오류가 발생했습니다:', error);
        }
      };
      postAlarm();
    }
  }, [postData, userId, data, supabase]);

  const handleStartTimer = async () => {
    resetModal();
    // 정상 흐름 : 책 읽기 시작 -> 종료하기 버튼 등장 -> 종료하기 클릭 -> 모달 등장 반복
    // 나타난 버그 : 책 읽기 시작 -> 종료하기 버튼 등장 -> 종료하기 클릭 -> 모달 등장 -> 반복 시
    // 책 읽기 시작 -> (종료하기 버튼 안뜸)-> 모달등장;; 모달상태를 전역으로 관리를 해서 true에서 바뀌지 않는듯함
    // 모달상태를 false로 바꿔주는 resetModal생성
    try {
      // 방장 여부 확인
      const isAdmin = data?.members.some(
        (member) => member.user_id === userId && member.role === 'admin'
      );

      // 멤버인 경우
      if (!isAdmin) {
        localStorage.setItem('timerStarted', 'true');
        setTimerVisible(true);
        setEndButtonVisible(false);
        return;
      }

      // 10분 타이머 제한을 위한 로컬 스토리지 확인
      const lastStartTime = localStorage.getItem('lastStartTime');

      // 이전 시작 시간이 있는 경우
      if (lastStartTime) {
        const currentTime = new Date().getTime();
        const differenceInMilliseconds =
          currentTime - parseInt(lastStartTime, 10);
        const requiredIntervalInMilliseconds = 10 * 60 * 1000; // 10분의 밀리초 수

        // 이전 시작 시간부터 현재까지의 시간이 10분보다 작은 경우
        if (differenceInMilliseconds < requiredIntervalInMilliseconds) {
          // 남은 시간 계산
          const remainingTimeInMilliseconds =
            requiredIntervalInMilliseconds - differenceInMilliseconds;
          const remainingMinutes = Math.floor(
            remainingTimeInMilliseconds / (1000 * 60)
          );
          const remainingSeconds = Math.ceil(
            (remainingTimeInMilliseconds % (1000 * 60)) / 1000
          );
          // console.log('remainingMinutes', remainingMinutes);
          localStorage.setItem('timerStarted', 'true');
          setTimerVisible(true);
          setEndButtonVisible(false);

          // 알림 표시
          if (remainingMinutes >= 0 && remainingSeconds >= 0) {
            setRemainingMinutes(remainingMinutes); // remainingMinutes 설정
            setRemainingSeconds(remainingSeconds); // remainingSeconds 설정
            setRemainTimeToast(true); // 상태 변경
          }
          // alert(
          //   `모임 시작 알림은 ${remainingMinutes}분 ${remainingSeconds}초 뒤에 가능합니다`
          // );
          return;
        }
      }
      // 10분 타이머 제한을 초과하거나 이전 시작 시간이 없는 경우
      // 타이머 시작 및 모임 시작
      setAlarmToast(true);
      await startMeeting();
      localStorage.setItem('lastStartTime', new Date().getTime().toString());
      setTimerVisible(true);
      setEndButtonVisible(false);
    } catch (error) {
      console.error('모임 시작 중 오류가 발생했습니다:', error);
    }
  };

  const startMeeting = async () => {
    try {
      // 역할이 admin 일때만
      await supabase.from('post').insert([
        {
          user_id: userId,
          title: data?.name,
          created_at: new Date().toISOString(),
          club_id: clubId
        }
      ]);
      // console.log('모임을 시작합니다.');
    } catch (error) {
      console.error('모임을 시작하는 도중 오류가 발생했습니다:', error);
    }
  };

  if (isLoading && isError && !data) return null;

  // const bookTitle = clubData[0].book_title || '';
  const bookTitle = data?.book_title;
  const titleLength = bookTitle?.length;
  const isSingleLine = (titleLength as number) <= 40;
  const containerHeight =
    isSingleLine || !timerVisible ? 'h-[102px]' : 'h-[124px]';

  return (
    <>
      <div className='sticky top-0 z-10'>
        {!timerVisible && (
          <div className='flex flex-row bg-[#35A5F6] border-b-[1px] border-[#DBE3EB] border-opacity-30 w-full '>
            <Link href='/readbook' passHref>
              <Image
                src={close}
                className='w-[22px] h-[22px] m-[16px]'
                alt='close'
              />
            </Link>
            <div className='flex h-[54px] items-center ml-[94px] text-white text-[17px] leading-[26px] font-bold text-center'>
              책 읽기 종료
            </div>
          </div>
        )}
        <div
          className={`sticky flex flex-col bg-mainblue items-center ${containerHeight}`}>
          {/* <div className='mt-[16px] '> */}
          {!timerVisible && (
            <div className='flex h-full'>
              <div
                className='flex w-[189px] h-[54px] my-auto bg-[#D8FA8E] rounded-[10px] text-center text-[#269AED] font-bold text-[17px] leading-[26px] justify-center items-center cursor-pointer'
                onClick={handleStartTimer}>
                책 읽기 시작
              </div>
            </div>
          )}

          {/* {timerVisible && <Timer clubId={clubId} userId={userId as string} />} */}
          {/* </div> */}
          {timerVisible && (
            <div className='my-auto flex flex-col justify-center items-center gap-[8px] w-[295px]'>
              <Timer clubId={clubId} userId={userId as string} />
              <div className='text-white mx-auto text-[16px] font-bold items-center text-center break-words line-clamp-2'>
                {data?.book_title}
              </div>
            </div>
          )}
        </div>
        <div className='flex w-full justify-center bg-white text-center border-b h-[49px] '>
          <div
            className={`cursor-pointer w-1/3 py-[15px] ${
              activeTab === '책읽기'
                ? 'text-[14px] text-[#3A3B42] leading-[17px] text-center font-bold border-b-2 border-black '
                : 'text-[14px] text-[#3A3B42] text-opacity-50 leading-[17px] text-center font-bold '
            }`}
            onClick={() => setActiveTab('책읽기')}>
            책읽기
          </div>

          <div
            className={`cursor-pointer w-1/3 py-[15px] ${
              activeTab === '퀴즈'
                ? 'text-[14px] text-[#3A3B42] leading-[17px] text-center font-bold border-b-2 border-black'
                : 'text-[14px] text-[#3A3B42] text-opacity-50  leading-[17px] text-center font-bold'
            }`}
            onClick={() => setActiveTab('퀴즈')}>
            퀴즈
          </div>
          <div
            className={`cursor-pointer w-1/3 py-[15px] ${
              activeTab === '채팅'
                ? 'text-[14px] text-[#3A3B42] leading-[17px] text-center font-bold border-b-2 border-black'
                : 'text-[14px] text-[#3A3B42] text-opacity-50  leading-[17px] text-center font-bold'
            }`}
            onClick={() => setActiveTab('채팅')}>
            채팅
          </div>
        </div>
      </div>

      {activeTab === '책읽기' && (
        <>
          <MemberList
            clubId={clubId}
            // clubMembers={clubMembers}
            endButtonVisible={endButtonVisible}
            timerVisible={timerVisible}
            userId={userId}
          />
        </>
      )}
      {activeTab === '퀴즈' && <QuizContainer clubId={clubId} />}
      {remainTimeToast && (
        <ToastUi
          message={`모임 시작 알림은 ${remainingMinutes}분 ${remainingSeconds}초 뒤에 가능합니다`}
          onClose={() => setRemainTimeToast(false)}
          isSuccess={false}
          style={{
            width: '343px',
            height: '50px',
            top: '123px',
            left: '50%', // 화면 중앙
            transform: 'translateX(-50%)',
            fontSize: '8px',
            position: 'fixed',
            justifyContent: 'center',
            alignItems: 'center',
            paddingRight: '22px'
          }}
          duration={5000}
        />
      )}

      {alarmToast && (
        <ToastUi
          message={`<${
            data
              ? (data.name?.length as number) > 20
                ? data.name?.substring(0, 20) + '...'
                : data.name
              : null
          }> 모임의 회원들에게 모임이 시작되었다고 알림을 보냈습니다.`}
          onClose={() => setAlarmToast(false)}
          isSuccess={true}
          style={{
            width: '343px',
            height: '50px',
            top: '123px',
            left: '50%', // 화면 중앙
            transform: 'translateX(-50%)',
            fontSize: '8px',
            position: 'fixed',
            justifyContent: 'center',
            alignItems: 'center',
            paddingRight: '22px',
            textAlign: 'center'
          }}
          duration={5000}
        />
      )}
      {activeTab === '채팅' && <>{chat}</>}
    </>
  );
};

export default BookInfo;
