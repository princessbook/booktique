'use client';
import React, { useState } from 'react';
import ProgressBar from './ProgressBar';
import { Tables } from '@/lib/types/supabase';
// import Image from 'next/image';
import Slider from 'react-slick';
import ReadButton from './ReadButton';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ClubList = ({
  handleBookRead,
  clubActivities,
  filteredBookClubsData
}: {
  handleBookRead: (clubId: string) => void;
  clubActivities: Tables<'club_activities'>[];
  filteredBookClubsData: Tables<'clubs'>[];
}) => {
  // 현재 슬라이드 인덱스를 추적
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
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
          onClick={() =>
            handleBookRead(filteredBookClubsData[currentSlide]?.id)
          }
        />
      </div>
    </>
  );
};

export default ClubList;
