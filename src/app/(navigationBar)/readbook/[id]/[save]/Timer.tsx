import React, { useState, useEffect, useRef } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Tables } from '@/lib/types/supabase';
import useModalStore from '@/store/modalstore';
import CompleteModal from '../CompleteModal';

const Timer = ({ clubId, userId }: { clubId: string; userId: string }) => {
  const intervalRef = useRef<number | NodeJS.Timeout | undefined>(undefined);
  const [clubActivity, setClubActivity] = useState<Tables<'club_activities'>>();
  const [seconds, setSeconds] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [isVisible, setIsVisible] = useState<boolean>(true); // 현재 화면 보는지 안보는지
  const { isModalOpen } = useModalStore();
  const [isEndButtonVisible, setIsEndButtonVisible] = useState<boolean>(false);
  const supabase = createClient();
  const formatTime = (timeInSeconds: number) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;
    const formattedHours = hours.toString();
    const formattedMinutes =
      minutes < 10 ? '0' + minutes.toString() : minutes.toString();
    const formattedSeconds =
      seconds < 10 ? '0' + seconds.toString() : seconds.toString();

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  };

  useEffect(() => {
    if (isVisible && !isModalOpen)
      intervalRef.current = setInterval(() => {
        setSeconds((prevSeconds: number) => {
          const timeInSeconds = Math.max(prevSeconds - 1, 0);
          saveTimeToSupabase(timeInSeconds);

          if (timeInSeconds === 0) {
            saveTimeToSupabase(timeInSeconds);
            setIsEndButtonVisible(true);
            clearInterval(intervalRef.current as number);
          }
          return timeInSeconds;
        });
      }, 1000);

    return () => {
      clearInterval(intervalRef.current as number);
    };
  }, [isVisible, isModalOpen, seconds]);

  const saveTimeToSupabase = async (timeInSeconds: number) => {
    try {
      await supabase
        .from('club_activities')
        .update({ time: timeInSeconds })
        .eq('user_id', userId)

        .eq('club_id', clubId as string);
    } catch (error) {
      console.error('Error updating time in Supabase:', error);
    }
  };

  useEffect(() => {
    const fetchClubActivity = async () => {
      try {
        const { data, error } = await supabase
          .from('club_activities')
          .select('*')
          .eq('club_id', clubId)
          .eq('user_id', userId)
          .single();
        if (error) {
          throw error;
        }
        setClubActivity(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching club activity:', error);
        setLoading(false);
      }
    };

    if (userId && clubId) {
      fetchClubActivity();
    }
  }, [userId, clubId, supabase]);

  useEffect(() => {
    if (clubActivity && clubActivity.time !== null) {
      const initialTime = Math.max(clubActivity.time, 0);
      setSeconds(initialTime);
    }
  }, [clubActivity]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        clearInterval(intervalRef.current as number);
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <>
      {!loading && (
        <div className='h-[40px] mx-auto'>
          <div className='flex flex-row gap-[10px] items-center justify-center'>
            <div className='text-[14px] leading-5 font-bold w-[60px] h-[28px] bg-[#E9FF8F] bg-opacity-20 text-[#E9FF8F] py-[4px] px-[8px] rounded-md text-center'>
              독서중
            </div>
            <p className='text-[#E9FF8F] font-bold text-[33px] leading-[39px] w-[134px] h-[40px]'>
              {formatTime(seconds)}
            </p>
            {isEndButtonVisible && <CompleteModal clubId={clubId} />}
          </div>
        </div>
      )}
    </>
  );
};

export default Timer;
