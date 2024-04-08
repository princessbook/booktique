'use client';
import React, { useEffect, useState } from 'react';

import { Tables } from '@/lib/types/supabase';
import Image from 'next/image';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ProgressBar from '../readbook/ProgressBar';
import ReadButton from '../readbook/ReadButton';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';

// export const revalidate = 0;
const ClubList = ({
  //   handleBookRead,
  //   clubData,
  // clubActivities,
  filteredBookClubsData,
  id
}: {
  //   handleBookRead: (clubId: string) => void;
  //   clubData: Tables<'club_activities'>[];
  // clubActivities: Tables<'club_activities'>[];
  filteredBookClubsData: Tables<'clubs'>[];
  id: string;
}) => {
  // 현재 슬라이드 인덱스를 추적
  // console.log('id', id);
  // console.log('clubActivities', clubActivities);
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const supabase = createClient();
  const [clubActivities1, setClubActivities1] = useState<
    Tables<'club_activities'>[] | null
  >(null);

  useEffect(() => {
    const fetchClubActivities = async () => {
      try {
        const { data: clubActivities1, error: activitiesError } = await supabase
          .from('club_activities')
          .select('*')
          .eq('user_id', id);
        // console.log('clubActivities1', clubActivities1);
        // 클럽 활동 데이터를 가져오는 비동기 요청
        // 이 부분을 실제 데이터를 가져오는 API 호출로 대체해야 합니다.
        // 예시: const response = await fetch('URL');
        // const data = await response.json();
        // 클럽 활동 데이터를 가져오는 로직이 완성되면, setLoading(false);로 로딩 상태 변경
        setClubActivities1(clubActivities1);
        setLoading(false);
      } catch (error) {
        console.error(
          '클럽 활동 데이터를 가져오는 도중 오류가 발생했습니다:',
          error
        );
        setLoading(false); // 에러 발생 시에도 로딩 상태 변경
      }
    };

    fetchClubActivities();
  }, []); // 컴포넌트가 마운트될 때 한 번만 실행됨

  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    vertical: false,
    // 슬라이드가 변경될 때마다 현재 슬라이드 인덱스를 업데이트
    afterChange: (current: number) => setCurrentSlide(current)
  };
  if (!id) {
    router.push('/login');
  }
  const handleBookRead = async (clubId: string) => {
    // console.log('1', 1);

    try {
      // console.log('id', id);
      // console.log('clubId', clubId);
      if (!id || !clubId) return;

      const existingActivity = clubActivities1?.find(
        (activity) => activity.user_id === id && activity.club_id === clubId
      );
      // console.log('existingActivity', existingActivity);
      if (existingActivity) {
        router.push(`/readbook/${clubId}`);
        console.log('이미 클럽 활동이 있습니다.');
        return;
      }
      const validClubId = clubActivities1?.find((club) => club.id === clubId);
      // console.log('validClubId', validClubId);
      if (!validClubId) {
        console.error('유효하지 않은 클럽 ID입니다.');
        // return;
      }
      // console.log('2', 2);
      await supabase.from('club_activities').insert([
        {
          user_id: id,
          club_id: clubId,
          progress: 0,
          time: Date.now()
        }
      ]);
      router.push(`/readbook/${clubId}`);
      console.log('클럽 활동 추가되었습니다.');
    } catch (error) {
      console.error('클럽 활동 추가 중 오류:', error);
    }
  };

  // if (loading) {
  //   return <LoadingOverlay show={loading} />;
  // }

  return (
    <>
      <Slider {...settings}>
        {filteredBookClubsData.map((club) => (
          <div key={club.id} className='h-full'>
            <div className='bg-white mb-[40px] w-[302px] h-[464px] text-center mx-auto rounded-[20px] font-bold text-gray-700'>
              <div className='pt-[32px]'>
                {club.book_title &&
                  (club.book_title.length > 15
                    ? club.book_title.substring(0, 15) + '...'
                    : club.book_title)}
              </div>
              <img
                src={club.book_cover || ''}
                alt='북이미지'
                //넥스트 이미지쓰면 height가 제대로 안먹힘
                // width={196}
                // height={304}
                className='mx-[53px] mt-[15.84px] mb-[16px] w-[196px] h-[304px] rounded'
              />
              <ProgressBar
                progress={
                  clubActivities1?.find(
                    (activity) => activity.club_id === club.id
                  )?.progress || 0
                }
              />
            </div>
          </div>
        ))}
      </Slider>

      <div className='mb-[40px] justify-center flex'>
        {/* 현재 슬라이드의 클럽 정보를 가져와서 버튼을 생성 */}
        <ReadButton
          clubId={filteredBookClubsData[currentSlide]?.id}
          //   onClick={() => {}}
          onClick={() =>
            handleBookRead(filteredBookClubsData[currentSlide]?.id)
          }
        />
      </div>
    </>
  );
};

export default ClubList;
