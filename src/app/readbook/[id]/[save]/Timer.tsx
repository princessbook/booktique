'use client';
import React, { useState, useEffect, useRef } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Tables } from '@/lib/types/supabase';
// import LoadingOverlay from '@/common/LoadingOverlay';

const Timer = ({
  clubId,
  userId
}: {
  clubId: string;
  userId: string | null;
}) => {
  const intervalRef = useRef<number | NodeJS.Timeout | undefined>(undefined);
  //   const [userId, setUserId] = useState<string | null>(null);
  const [clubActivity, setClubActivity] = useState<Tables<'club_activities'>>();
  const [seconds, setSeconds] = useState<number>(clubActivity?.time || 3600);
  const [loading, setLoading] = useState<boolean>(true);

  const supabase = createClient();

  const saveTimeToSupabase = async (timeInSeconds: number) => {
    try {
      await supabase
        .from('club_activities')
        .update({ time: timeInSeconds })
        .eq('user_id', userId as string)
        .eq('club_id', clubId as string);
      console.log('userId', userId);
      console.log('clubId', clubId);
      console.log('Time updated in Supabase.');
    } catch (error) {
      console.error('Error updating time in Supabase:', error);
    }
  };

  const formatTime = (timeInSeconds: number) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;
    // 시간, 분, 초 각각에 대해 0을 붙여서 문자열로 만듭니다.
    const formattedHours = hours.toString();
    const formattedMinutes =
      minutes < 10 ? '0' + minutes.toString() : minutes.toString();
    const formattedSeconds =
      seconds < 10 ? '0' + seconds.toString() : seconds.toString();

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  };

  useEffect(() => {
    const fetchClubActivity = async () => {
      try {
        // club_activities 테이블에서 clubId와 user_id가 일치하는 데이터 가져오기
        const { data: test, error } = await supabase
          .from('club_activities')
          .select('*')
          .eq('club_id', clubId)
          .eq('user_id', userId as string)
          .single();
        console.log('test', test);
        if (error) {
          throw error;
        }

        setClubActivity(test);
        setLoading(false);
      } catch (error) {
        console.error(
          '클럽 활동 데이터를 가져오는 도중 오류가 발생했습니다:',
          error
        );
        setLoading(false);
      }
    };

    if (userId && clubId) {
      console.log('시작');
      fetchClubActivity();
    }
  }, [userId, clubId, supabase]);

  useEffect(() => {
    if (clubActivity && clubActivity.time !== null) {
      const settingTime = Math.min(clubActivity.time, 3600);
      setSeconds(settingTime);
    } else {
      setSeconds(3600);
    }
  }, [clubActivity]);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setSeconds((prevSeconds: number) => {
        const timeInSeconds = prevSeconds - 1;
        saveTimeToSupabase(timeInSeconds);
        return timeInSeconds;
      });
    }, 1000);

    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);
  // if (loading) {
  //   return <LoadingOverlay show={loading} />;
  // }
  return (
    <>
      {loading ? (
        <></>
      ) : (
        <div className='flex h-[40px] mx-auto items-center justify-center'>
          <div className='flex flex-row gap-[10px] items-center justify-center'>
            {/* 피그마랑 좀 다름 */}
            <div className='text-[14px] leading-5 font-bold w-[60px] h-[28px] bg-[#E9FF8F] bg-opacity-20 text-[#E9FF8F] py-[4px] px-[8px] rounded-md text-center'>
              독서중
            </div>
            <p className='text-[#E9FF8F] font-bold text-[33px] leading-[39px] w-[134px] h-[40px]'>
              {formatTime(seconds)}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Timer;
