'use client';
import { Tables } from '@/lib/types/supabase';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import close from '../../../../../public/close_read.png';
import Link from 'next/link';
// import Timer from './Timer';
import { createClient } from '@/utils/supabase/client';
import { getUserId } from '@/utils/userAPIs/authAPI';
// import LoadingOverlay from '@/common/LoadingOverlay';

const supabase = createClient();
const SaveBookInfo = ({
  clubData,
  clubId
}: {
  clubData: Tables<'clubs'>;
  clubId: string;
}) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [clubActivity, setClubActivity] = useState<Tables<'club_activities'>>();
  const [loading, setLoading] = useState<boolean>(true);

  // console.log('clubActivity', clubActivity);
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const id = await getUserId();
        // console.log('id', id);
        setUserId(id);
      } catch (error) {
        console.error('사용자 ID를 가져오는 도중 오류가 발생했습니다:', error);
      }
    };

    fetchUserId();
  }, []);

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
        // console.log('test', test);
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
      fetchClubActivity();
    }
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
    // 시간, 분, 초 각각에 대해 0을 붙여서 문자열로 만듭니다.
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
  // if (loading) {
  //   return <LoadingOverlay show={loading} />;
  // }

  return (
    <div className='flex flex-col bg-mainblue'>
      <div className='h-[42px]'></div>
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
      <div className='flex justify-center bg-mainblue h-[101px] my-[16px]'>
        {/* <figure>
          <img src={clubData.book_cover || ''} />
        </figure> */}
        <div className='flex flex-col'>
          <div className='w-[295px] h-[69px] mx-auto'>
            {loading ? (
              <p className='h-[39px] mt-[16px] mb-[8px]'></p>
            ) : (
              <p className='h-[39px] mt-[16px] mb-[8px] font-bold text-[33px] leading-[39px] text-[#E9FF8F] text-center'>
                {/* <Timer clubId={clubId} /> */}
                {timeString}
                {/* 타이머타이머타이머타이머타이머타이머타이머타이머타이머타이머타이머타이머타이머타이머타이머타이머타이머타이머타이머타이머타이머타이머타이머 */}
              </p>
            )}

            <div className='mb-[16px] text-white text-[16px] leading-[22px] font-bold text-center'>
              {clubData.book_title?.length && clubData.book_title?.length > 40
                ? clubData.book_title?.substring(0, 40) + '...'
                : clubData.book_title}
            </div>
          </div>
          {/* <div>{clubData.book_author}</div>
          <div>{clubData.book_page}</div>
          <div>{clubData.book_category}</div> */}
        </div>
      </div>
    </div>
  );
};

export default SaveBookInfo;

// 타이머만 로딩해놨는데
// 전체를 로딩해야하나 고민
