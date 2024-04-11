import React, { useState, useEffect, useRef } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Tables } from '@/lib/types/supabase';

const Timer = ({
  clubId,
  userId
}: {
  clubId: string;
  userId: string | null;
}) => {
  const intervalRef = useRef<number | NodeJS.Timeout | undefined>(undefined);
  const [clubActivity, setClubActivity] = useState<Tables<'club_activities'>>();
  const [seconds, setSeconds] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  const supabase = createClient();

  const saveTimeToSupabase = async (timeInSeconds: number) => {
    try {
      localStorage.getItem('userId');
      await supabase

        .from('club_activities')
        .update({ time: timeInSeconds })
        .eq('user_id', userId as string)
        .eq('club_id', clubId as string);
      console.log('Time updated in Supabase.');
    } catch (error) {
      console.error('Error updating time in Supabase:', error);
    }
  };

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
    const fetchClubActivity = async () => {
      try {
        localStorage.getItem('userId');
        const { data, error } = await supabase
          .from('club_activities')
          .select('*')
          .eq('club_id', clubId)
          .eq('user_id', userId as string)
          .single();
        console.log('Data from Supabase:', data);
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
    // if (seconds > 0) {
    intervalRef.current = setInterval(() => {
      setSeconds((prevSeconds: number) => {
        const timeInSeconds = Math.max(prevSeconds + 1, 0);
        saveTimeToSupabase(timeInSeconds);
        localStorage.setItem('timerSeconds', timeInSeconds.toString());
        return timeInSeconds;
      });
    }, 1000);

    return () => {
      clearInterval(intervalRef.current as number);
    };
    // }
  }, [seconds]);

  useEffect(() => {
    const previousTime = localStorage.getItem('timerSeconds');
    if (previousTime !== null) {
      setSeconds(parseInt(previousTime, 10));
    }
  }, []);

  return (
    <>
      {!loading && (
        <div className='flex h-[40px] mx-auto items-center justify-center'>
          <div className='flex flex-row gap-[10px] items-center justify-center'>
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
