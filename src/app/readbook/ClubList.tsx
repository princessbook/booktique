import React from 'react';
import ProgressBar from './ProgressBar';
import { Tables } from '@/lib/types/supabase';
import Image from 'next/image';
import white from '../../../public/booktiquereadwhite.png';
import Slider from 'react-slick';
import ReadButton from './ReadButton';
import blue from '../../../public/booktiquereadblue.png';
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
  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    vertical: false
  };
  return (
    <>
      {/* <div className='flex flex-col'> */}
      <Slider {...settings}>
        {filteredBookClubsData.map((club) => (
          <div key={club.id}>
            <Image
              src={blue}
              width={134}
              height={26}
              alt={'booktique'}
              className='mt-[80px] mx-auto mb-[24px]'
              priority={true}
            />
            <div className='bg-white mb-[40px] w-[302px] h-[464px] text-center mx-auto rounded-[20px] font-bold text-gray-700'>
              {club.book_title && (
                // null or undefined
                <div className='pt-[32px]'>
                  {club.book_title.length > 15
                    ? club.book_title.substring(0, 15) + '...'
                    : club.book_title}
                </div>
              )}
              <img
                src={club.book_cover || ''}
                alt='북이미지'
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
            <div className='mb-[40px] justify-center flex'>
              <ReadButton
                clubId={club.id}
                onClick={() => handleBookRead(club.id)}
              />
            </div>
          </div>
        ))}
      </Slider>
      {/* </div> */}
    </>
  );
};

export default ClubList;
