import React from 'react';
import ProgressBar from './ProgressBar';
import { Tables } from '@/lib/types/supabase';
import Image from 'next/image';
import white from '../../../public/booktiquereadwhite.png';
import Slider from 'react-slick';
import ReadButton from './ReadButton';

const ClubList = ({
  allClubData,
  handleBookRead,
  clubActivities
}: {
  allClubData: Tables<'clubs'>[];
  handleBookRead: (clubId: string) => void;
  clubActivities: Tables<'club_activities'>[];
}) => {
  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    vertical: false // 좌우로 스크롤 가능하도록 설정
  };
  return (
    <>
      {/* <Slider {...settings}> */}
      <div className='flex bg-yellow-200 '>
        {/* Flexbox 설정 */}

        {allClubData.map((club) => (
          <div key={club.id} className='flex flex-col w-full h-full mr-4'>
            {/* Flexbox 설정 및 가로로 나열되도록 스타일 추가 */}

            <div className='h-[204px] bg-red-400' />
            {/* 클럽 설명을 표시합니다. */}
            {club.description}
            <ProgressBar
              progress={
                clubActivities.find((activity) => activity.club_id === club.id)
                  ?.progress || 0
              }
            />
            <ReadButton
              clubId={club.id}
              onClick={() => handleBookRead(club.id)}
            />
          </div>
        ))}
      </div>
      {/* </Slider> */}
    </>
  );
};

export default ClubList;
