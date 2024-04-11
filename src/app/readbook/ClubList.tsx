'use client';
import React, { useEffect, useState } from 'react';

import { Tables } from '@/lib/types/supabase';
import Image from 'next/image';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ProgressBar from '../readbook/ProgressBar';
import ReadButton from '../readbook/ReadButton';
import { createClient } from '@/utils/supabase/client';
import Link from 'next/link';

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
  const supabase = createClient();
  const [clubActivities, setClubActivities1] = useState<
    Tables<'club_activities'>[] | null
  >(null);

  useEffect(() => {
    const fetchClubActivities = async () => {
      try {
        const { data: clubActivities, error: activitiesError } = await supabase
          .from('club_activities')
          .select('*')
          .eq('user_id', id);
        setClubActivities1(clubActivities);
        setLoading(false);
      } catch (error) {
        console.error(
          '클럽 활동 데이터를 가져오는 도중 오류가 발생했습니다:',
          error
        );
        setLoading(false);
      }
    };

    fetchClubActivities();
  }, []);

  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    centerMode: true, // 가운데 정렬 모드 활성화
    centerPadding: '25px', // 좌우 패딩 추가
    vertical: false,
    // 슬라이드가 변경될 때마다 현재 슬라이드 인덱스를 업데이트
    afterChange: (current: number) => setCurrentSlide(current)
  };
  if (!id) {
    // router.push('/login');
    <Link href={'login'} />;
  }
  const handleBookRead = async (clubId: string) => {
    // console.log('1', 1);

    try {
      // console.log('id', id);
      // console.log('clubId', clubId);
      if (!id || !clubId) return;

      const existingActivity = clubActivities?.find(
        (activity) => activity.user_id === id && activity.club_id === clubId
      );
      // console.log('existingActivity', existingActivity);
      if (existingActivity) {
        console.log('이미 클럽 활동이 있습니다. 시간 업데이트함');
        await supabase
          .from('club_activities')
          .update({ time: 3600 })
          .eq('user_id', id)
          .eq('club_id', clubId);
        return;
      }

      // const validClubId = clubActivities?.find((club) => club.id === clubId);
      // // console.log('validClubId', validClubId);
      // if (!validClubId) {
      //   console.error('유효하지 않은 클럽 ID입니다.');
      //   // return;
      // }
      // console.log('2', 2);
      await supabase.from('club_activities').insert([
        {
          user_id: id,
          club_id: clubId,
          progress: 0,
          // time: Date.now()
          time: 3600 // 기본 1시간으로 제한
        }
      ]);
      // router.push(`/readbook/${clubId}`);
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
      <Slider className='custom-slider' {...settings}>
        {filteredBookClubsData.map((club) => (
          <div key={club.id}>
            <div className='flex flex-row'>
              <div className='bg-white mb-[40px] w-[302px] h-[464px] rounded-[20px] shadow-md mx-auto mt-[24px]'>
                <div className='flex mt-[34px] w-[196px] h-[48px] text-center font-bold text-[18px] leading-6 text-[#3F3E4E] mx-auto justify-center'>
                  {club.book_title &&
                    (club.book_title.length > 25
                      ? club.book_title.substring(0, 25) + '...'
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
                    clubActivities?.find(
                      (activity) => activity.club_id === club.id
                    )?.progress || 0
                  }
                />
              </div>
            </div>
          </div>
        ))}
      </Slider>

      <div className='mb-[40px] justify-center flex'>
        {/* 현재 슬라이드의 클럽 정보를 가져와서 버튼을 생성 */}
        <Link
          href={`/readbook/${filteredBookClubsData[currentSlide]?.id}`}
          passHref>
          <ReadButton
            clubId={filteredBookClubsData[currentSlide]?.id}
            onClick={() =>
              handleBookRead(filteredBookClubsData[currentSlide]?.id)
            }
          />
        </Link>
        {/* <Link href={`/readbook/${clubId}`} passHref>
          <ReadButton
            clubId={filteredBookClubsData[currentSlide]?.id}
            //   onClick={() => {}}
            onClick={() =>
              handleBookRead(filteredBookClubsData[currentSlide]?.id)
            }
          />
        </Link> */}
      </div>
    </>
  );
};

export default ClubList;
