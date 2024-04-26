'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Tables } from '@/lib/types/supabase';
import Image from 'next/image';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ProgressBar from '../readbook/ProgressBar';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { getUserId } from '@/utils/userAPIs/authAPI';
interface AllClubData {
  club_id: string;
  club: {
    archive: boolean | null;
    book_author: string | null;
    book_category: string | null;
    book_cover: string | null;
    book_id: string | null;
    book_page: number | null;
    book_title: string | null;
    created_at: string;
    description: string | null;
    id: string;
    last_read: boolean | null;
    max_member_count: number | null;
    name: string | null;
    thumbnail: string | null;
    weekday: string | null;
  } | null;
  club_activities: Tables<'club_activities'>[];
}
const ClubList = ({
  allClubData,
  user_id
}: {
  allClubData: AllClubData[] | null;
  user_id: string;
}) => {
  const supabase = createClient();
  const [clubActivities, setClubActivities] = useState<
    Tables<'club_activities'>[] | null
  >(null);
  const router = useRouter();
  useEffect(() => {
    const fetchClubActivities = async () => {
      try {
        const { data: clubActivities, error: activitiesError } = await supabase
          .from('club_activities')
          .select('*')
          .eq('user_id', user_id)
          .order('last_read', { ascending: false });
        setClubActivities(clubActivities);

        if (activitiesError) {
          throw activitiesError;
        }
      } catch (error) {
        console.error(
          '클럽 활동 데이터를 가져오는 도중 오류가 발생했습니다:',
          error
        );
      }
    };
    fetchClubActivities();
  }, [user_id, supabase]);

  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    vertical: false,
    centerMode: true, // 가운데 정렬 모드 활성화
    centerPadding: '30px' // 좌우 패딩 추가
  };

  const handleBookRead = async (clubId: string) => {
    localStorage.removeItem('timerSeconds');
    localStorage.removeItem('timerStarted');
    try {
      const userId = await getUserId();
      const { data: member, error: getMemberError } = await supabase
        .from('members')
        .select()
        .eq('club_id', clubId)
        .eq('user_id', userId as string)
        .single();

      if (!user_id || !clubId || !member) return;
      const existingActivity = clubActivities?.find(
        (activity) =>
          activity.user_id === user_id && activity.club_id === clubId
      );

      if (existingActivity) {
        await supabase
          .from('club_activities')
          .update({
            time: 3600
          })
          .eq('user_id', user_id);
        return;
      }

      if (getMemberError || !member) {
        return;
      }

      await supabase.from('club_activities').insert([
        {
          user_id: user_id,
          club_id: clubId,
          progress: 0,
          member_id: member.id,
          time: 3600, // 기본 1시간으로 제한,
          read_page: 0
        }
      ]);

      localStorage.removeItem('timerStarted');
      localStorage.removeItem('timerSeconds');
    } catch (error) {
      console.error('클럽 활동 추가 중 오류:', error);
    }
  };

  return (
    <>
      <Slider className='custom-slider h-auto' {...settings}>
        {allClubData
          ?.filter((club) => club.club?.archive === false)
          .map((club) => (
            <div
              key={club.club?.id}
              className='flex cursor-pointer'
              onClick={() => {
                handleBookRead(club.club?.id as string);
                router.push(`/readbook/${club.club?.id}`);
              }}>
              {/* onClick={() => handleClickSlide(index)}>
              <Link
                href={`/readbook/${
                  allClubData?.filter((id) => id.club?.archive === false)[
                    currentSlide
                  ].club?.id
                }`}> */}
              <div className='flex flex-col bg-white mb-[3px] w-[92%] h-[60%] rounded-[20px] shadow-md mx-auto items-center justify-center'>
                <div className=' w-[196px] h-[48px] text-center font-bold text-[18px] leading-6 text-[#3F3E4E] mx-auto mt-[34px] justify-center break-words line-clamp-2'>
                  {club.club?.name}
                </div>
                <Image
                  width={144}
                  height={225}
                  src={club.club?.book_cover || ''}
                  alt='북이미지'
                  priority={true}
                  className='mx-auto w-[144px] h-[225px] object-contain rounded  border border-solid border-blue-200/40'
                />
                <p className='text-[14px] leading-[20px] text-center font-medium text-[#3F3E4E] mt-[26px]'>
                  독서 상황
                </p>
                <p className='text-[16px] leading-[22px] text-center font-bold text-[#3F3E4E] mt-[16px]'>
                  {club.club_activities[0]?.read_page &&
                  club.club_activities[0].read_page > 0
                    ? `p.${club.club_activities[0]?.read_page}`
                    : 'p.0'}
                </p>
                <ProgressBar
                  progress={
                    clubActivities?.find(
                      (activity) => activity.club_id === club.club?.id
                    )?.progress || 0
                  }
                  backgroundColor='#EDEEF2'
                />
                {/* </div> */}
              </div>
              {/* </Link> */}
            </div>
          ))}
      </Slider>
    </>
  );
};

export default ClubList;
