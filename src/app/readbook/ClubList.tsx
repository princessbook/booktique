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
import { useRouter } from 'next/navigation';

const ClubList = ({
  filteredBookClubsData,
  id
}: {
  filteredBookClubsData: Tables<'clubs'>[];
  id: string;
}) => {
  // 현재 슬라이드 인덱스를 추적
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const supabase = createClient();
  const [clubActivities, setClubActivities1] = useState<
    Tables<'club_activities'>[] | null
  >(null);
  const router = useRouter();
  useEffect(() => {
    const fetchClubActivities = async () => {
      try {
        const { data: clubActivities, error: activitiesError } = await supabase
          .from('club_activities')
          .select('*')
          .eq('user_id', id);
        setClubActivities1(clubActivities);
        setLoading(false);

        if (activitiesError) {
          throw activitiesError;
        }
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
    vertical: false,
    // 슬라이드가 변경될 때마다 현재 슬라이드 인덱스를 업데이트
    centerMode: true, // 가운데 정렬 모드 활성화
    centerPadding: '30px', // 좌우 패딩 추가
    // 슬라이드가 변경될 때마다 현재 슬라이드 인덱스를 업데이트
    afterChange: (current: number) => setCurrentSlide(current)
  };

  const handleBookRead = async (clubId: string) => {
    try {
      if (!id || !clubId) return;
      const existingActivity = clubActivities?.find(
        (activity) => activity.user_id === id && activity.club_id === clubId
      );
      if (existingActivity) {
        localStorage.removeItem('timerSeconds');
        localStorage.removeItem('timerStarted');
        // console.log('이미 클럽 활동이 있습니다. 시간 업데이트함');
        return;
      }

      await supabase.from('club_activities').insert([
        {
          user_id: id,
          club_id: clubId,
          progress: 0,
          // time: 3600 // 기본 1시간으로 제한
          time: 0 // 기본 1시간으로 제한
        }
      ]);
      // console.log('111111', 111111);
      localStorage.removeItem('timerStarted');
      localStorage.removeItem('timerSeconds');
    } catch (error) {
      console.error('클럽 활동 추가 중 오류:', error);
    }
  };

  // if (loading) {
  //   return <LoadingOverlay show={loading} />;
  // }

  return (
    <div className='flex flex-col'>
      <Slider className='custom-slider h-auto' {...settings}>
        {filteredBookClubsData
          .filter((club) => !club.archive)
          .map((club) => (
            <div key={club.id}>
              <div
                className='flex cursor-pointer'
                onClick={() => router.push(`/readbook/${club.id}`)}>
                <div className='flex flex-col bg-white mb-[40px] w-[92%] h-[60%] rounded-[20px] shadow-md mx-auto items-center justify-center '>
                  <div className='flex w-[196px] h-[48px] text-center font-bold text-[18px] leading-6 text-[#3F3E4E] mx-auto mt-[34px] justify-center break-words line-clamp-2'>
                    {/* {club.book_title &&
                      (club.book_title.length > 25
                        ? club.book_title.substring(0, 25) + '...'
                        : club.book_title)} */}
                    {club.book_title}
                  </div>
                  <div className='relative mx-8 mt-4 mb-2 w-48 h-72 rounded-lg overflow-hidden'>
                    <Image
                      width={111}
                      height={161}
                      src={club.book_cover || ''}
                      alt='북이미지'
                      className='absolute inset-0 w-full h-full object-cover rounded'
                    />
                  </div>
                  <ProgressBar
                    progress={
                      clubActivities?.find(
                        (activity) => activity.club_id === club.id
                      )?.progress || 0
                    }
                    backgroundColor='#EDEEF2'
                  />
                </div>
              </div>
            </div>
          ))}
      </Slider>
    </div>
  );
};

// 책 읽기 버튼
//   return (
//     <div className='flex flex-col'>
//       <Slider className='custom-slider h-auto' {...settings}>
//         {filteredBookClubsData
//           .filter((club) => !club.archive)
//           .map((club) => (
//             <div key={club.id} className='flex '>
//               <div className='flex flex-col bg-white mb-[40px] w-[92%] h-[60%] rounded-[20px] shadow-md mx-auto items-center justify-center '>
//                 <div className='flex w-[196px] h-[48px] text-center font-bold text-[18px] leading-6 text-[#3F3E4E] mx-auto mt-[34px] justify-center'>
//                   {club.book_title &&
//                     (club.book_title.length > 25
//                       ? club.book_title.substring(0, 25) + '...'
//                       : club.book_title)}
//                 </div>

//                 <div className='relative mx-8 mt-4 mb-2 w-48 h-72 rounded-lg overflow-hidden'>
//                   <Image
//                     width={111}
//                     height={161}
//                     src={club.book_cover || ''}
//                     alt='북이미지'
//                     className='absolute inset-0 w-full h-full object-cover rounded'
//                   />
//                 </div>
//                 <ProgressBar
//                   progress={
//                     clubActivities?.find(
//                       (activity) => activity.club_id === club.id
//                     )?.progress || 0
//                   }
//                   backgroundColor='#EDEEF2'
//                 />
//               </div>
//             </div>
//           ))}
//       </Slider>

//       <div className='mb-[40px] justify-center flex'>
//         {/* 현재 슬라이드의 클럽 정보를 가져와서 버튼을 생성 */}
//         <Link
//           href={`/readbook/${filteredBookClubsData[currentSlide]?.id}`}
//           passHref>
//           <ReadButton
//             clubId={filteredBookClubsData[currentSlide]?.id}
//             onClick={() =>
//               handleBookRead(filteredBookClubsData[currentSlide]?.id)
//             }
//           />
//         </Link>
//       </div>
//     </div>
//   );
// };

export default ClubList;
