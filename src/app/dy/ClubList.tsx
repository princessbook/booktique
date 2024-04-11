'use client';
import React, { useState } from 'react';

import { Tables } from '@/lib/types/supabase';
// import Image from 'next/image';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ProgressBar from '../readbook/ProgressBar';
import ReadButton from '../readbook/ReadButton';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';

const ClubList = ({
  //   handleBookRead,
  //   clubData,
  clubActivities,
  filteredBookClubsData,
  id
}: {
  //   handleBookRead: (clubId: string) => void;
  //   clubData: Tables<'club_activities'>[];
  clubActivities: Tables<'club_activities'>[];
  filteredBookClubsData: Tables<'clubs'>[];
  id: string;
}) => {
  // 현재 슬라이드 인덱스를 추적
  console.log('id', id);
  console.log('clubActivities', clubActivities);
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const supabase = createClient();
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

  const handleBookRead = async (clubId: string) => {
    console.log('1', 1);
    try {
      if (!id || !clubId) return;

      const existingActivity = clubActivities.find(
        (activity) => activity.user_id === id && activity.club_id === clubId
      );
      if (existingActivity) {
        router.push(`/readbook/${clubId}`);
        console.log('이미 클럽 활동이 있습니다.');
        return;
      }
      const validClubId = clubActivities.find((club) => club.id === clubId);
      if (!validClubId) {
        console.error('유효하지 않은 클럽 ID입니다.');
        return;
      }
      console.log('2', 2);
      await supabase.from('club_activities').insert([
        {
          user_id: id,
          club_id: clubId,
          progress: 0,
          time: 3600
        }
      ]);
      router.push(`/readbook/${clubId}`);
      console.log('클럽 활동 추가되었습니다.');
    } catch (error) {
      console.error('클럽 활동 추가 중 오류:', error);
    }
  };

  //   if (loading) {
  //     return <LoadingOverlay show={loading} />;
  //   }

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
                className='mx-[53px] mt-[15.84px] mb-[16px] w-[196px] h-[304px]'
              />
              <ProgressBar
                progress={
                  clubActivities.find(
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
