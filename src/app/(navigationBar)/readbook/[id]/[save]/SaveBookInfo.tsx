// loading쪽 봐야함  4/26
'use client';
import { Tables } from '@/lib/types/supabase';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import close from '../../../../../../public/close_read.png';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/client';
interface ClubData {
  archive?: boolean | null;
  book_author?: string | null;
  book_category?: string | null;
  book_cover?: string | null;
  book_id?: string | null;
  book_page?: number | null;
  book_title?: string | null;
  created_at?: string;
  description?: string | null;
  id?: string;
  last_read?: boolean | null;
  max_member_count?: number | null;
  name?: string | null;
  thumbnail?: string | null;
  weekday?: string | null;
  club_activities: Tables<'club_activities'>[];
}
const supabase = createClient();
const SaveBookInfo = ({
  clubData,
  clubId,
  userId
}: {
  clubData: ClubData | null;
  clubId: string;
  userId: string;
}) => {
  const [clubActivity, setClubActivity] = useState<Tables<'club_activities'>>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchClubActivity = async () => {
      try {
        const { data: test, error } = await supabase
          .from('club_activities')
          .select('*')
          .eq('club_id', clubId)
          .eq('user_id', userId as string)
          .single();
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
    fetchClubActivity();
  }, [userId, clubId]);

  useEffect(() => {
    if (clubActivity) {
      setLoading(false);
    }
  }, [clubActivity]);
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    const formattedHours = hours.toString();
    const formattedMinutes =
      minutes < 10 ? '0' + minutes.toString() : minutes.toString();
    const formattedSeconds =
      remainingSeconds < 10
        ? '0' + remainingSeconds.toString()
        : remainingSeconds.toString();

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  };
  const timeString = formatTime(clubActivity?.time as number);
  const bookTitle = clubData?.book_title || '';
  const titleLength = bookTitle.length;
  const isSingleLine = titleLength <= 40;

  const containerHeight = isSingleLine ? 'h-[101px]' : 'h-[124px]';

  return (
    <div className='flex flex-col bg-mainblue'>
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
      <div className={`flex justify-center bg-mainblue ${containerHeight}`}>
        <div className='flex flex-col w-[295px] mx-auto mt-[16px]'>
          {loading ? (
            <p className='flex h-[39px] mb-[8px] font-bold text-[33px] leading-[39px] text-[#E9FF8F] text-center justify-center'>
              0:00:00
            </p>
          ) : (
            <p className='flex h-[39px] mb-[8px] font-bold text-[33px] leading-[39px] text-[#E9FF8F] text-center justify-center'>
              {timeString}
            </p>
          )}

          <p className='mb-[16px] text-white text-[16px] leading-[22px] font-bold text-center justify-center break-words line-clamp-2'>
            {clubData?.book_title}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SaveBookInfo;
