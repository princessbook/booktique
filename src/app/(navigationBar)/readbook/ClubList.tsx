'use client';
import React, { useEffect, useRef, useState } from 'react';
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
  // 현재 슬라이드 인덱스를 추적
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  // const [loading, setLoading] = useState<boolean>(true);
  const supabase = createClient();
  // const [clickedSlideIndex, setClickedSlideIndex] = useState<number | null>(
  //   null
  // );
  // const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
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
        // setLoading(false);

        if (activitiesError) {
          throw activitiesError;
        }
      } catch (error) {
        console.error(
          '클럽 활동 데이터를 가져오는 도중 오류가 발생했습니다:',
          error
        );
        // setLoading(false);
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
    // 슬라이드가 변경될 때마다 현재 슬라이드 인덱스를 업데이트
    centerMode: true, // 가운데 정렬 모드 활성화
    centerPadding: '30px', // 좌우 패딩 추가
    // 슬라이드가 변경될 때마다 현재 슬라이드 인덱스를 업데이트
    afterChange: (current: number) => {
      setCurrentSlide(current);
      // 슬라이드 변경 후에 버튼 활성화
      // setButtonDisabled(false);
    }
    // beforeChange: () => {
    //   // 슬라이드 변경 중에 버튼 비활성화
    //   // setButtonDisabled(true);
    // }
  };

  const handleBookRead = async (clubId: string) => {
    localStorage.removeItem('timerSeconds');
    localStorage.removeItem('timerStarted');
    try {
      const userId = await getUserId();
      // 클릭된 슬라이드 인덱스가 존재하고, 현재 슬라이드 인덱스와 일치하는지 확인
      // if (clickedSlideIndex !== null && clickedSlideIndex !== currentSlide) {
      //   return; // 클릭된 슬라이드가 변경된 경우 클릭 이벤트를 처리하지 않음
      // }
      const { data: member, error: getMemberError } = await supabase
        .from('members')
        .select()
        .eq('club_id', clubId)
        .eq('user_id', userId as string)
        .single();
      // console.log('member', member);
      if (!user_id || !clubId || !member) return;
      const existingActivity = clubActivities?.find(
        (activity) =>
          activity.user_id === user_id && activity.club_id === clubId
      );
      // console.log('existingActivity', existingActivity);
      if (existingActivity) {
        await supabase
          .from('club_activities')
          .update({
            time: 3600
          })
          .eq('user_id', user_id);
        // .eq('club_id', clubId);
        // console.log('이미 클럽 활동이 있습니다. 시간 업데이트함');
        return;
      }

      if (getMemberError || !member) {
        // console.log('you are not even a member!');
        return;
      }

      await supabase.from('club_activities').insert([
        {
          user_id: user_id,
          club_id: clubId,
          progress: 0,
          member_id: member.id,
          time: 3600, // 기본 1시간으로 제한,
          // time: 0 // 기본 1시간으로 제한,
          read_page: 0
        }
      ]);

      // console.log('111111', 111111);
      localStorage.removeItem('timerStarted');
      localStorage.removeItem('timerSeconds');
    } catch (error) {
      console.error('클럽 활동 추가 중 오류:', error);
    }
  };
  // const handleReadButtonClick = (clubId: string) => {
  //   handleBookRead(clubId);
  // };
  // if (loading) {
  //   return <LoadingOverlay show={loading} />;
  // }

  // 클릭된 슬라이드 인덱스를 설정하는 함수
  // const handleClickSlide = (index: number) => {
  //   setClickedSlideIndex(index);
  // };

  // 책 읽기 버튼
  //   return (
  //     <div className='flex flex-col h-full'>
  //       <Slider className='custom-slider h-auto' {...settings}>
  //         {allClubData
  //           ?.filter((club) => club.club?.archive === false)
  //           .map((club, index) => (
  //             <div
  //               key={club.club?.id}
  //               className='flex cursor-pointer '
  //               onClick={() => handleClickSlide(index)}>
  //               <div className='flex flex-col bg-white mb-[40px] w-[92%] h-[60%] rounded-[20px] shadow-md mx-auto items-center justify-center'>
  //                 <div className='flex w-[196px] h-[48px] text-center font-bold text-[18px] leading-6 text-[#3F3E4E] mx-auto mt-[34px] justify-center'>
  //                   {club.club?.book_title &&
  //                     (club.club.book_title.length > 25
  //                       ? club.club.book_title.substring(0, 25) + '...'
  //                       : club.club.book_title)}
  //                 </div>

  //                 <div className='relative flex mx-8 mt-4 mb-2 w-48 h-72 rounded-lg overflow-hidden'>
  //                   <Image
  //                     width={196}
  //                     height={304}
  //                     src={club.club?.book_cover || ''}
  //                     alt='북이미지'
  //                     className='flex w-full rounded mb-[8px] object-contain'
  //                   />
  //                 </div>
  //                 {/* <p>{club.club_activities[0].progress}</p> */}
  //                 <ProgressBar
  //                   progress={
  //                     clubActivities?.find(
  //                       (activity) => activity.club_id === club.club?.id
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
  //           prefetch
  //           href={`/readbook/${
  //             allClubData?.filter((id) => id.club?.archive === false)[
  //               currentSlide
  //             ].club?.id
  //           }`}>
  //           <ReadButton
  //             onClick={() =>
  //               handleBookRead(
  //                 allClubData?.filter((id) => id.club?.archive === false)[
  //                   currentSlide
  //                 ].club?.id as string
  //               )
  //             }
  //             disabled={buttonDisabled}
  //           />
  //         </Link>
  //       </div>
  //     </div>
  //   );
  // };

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
              <div className='flex flex-col bg-white mb-[3px] w-[92%] h-[60%] rounded-[20px] shadow-md mx-auto items-center justify-center'>
                {/* <div className='flex flex-col w-[92%] bg-white items-center'> */}
                <div className=' w-[196px] h-[48px] text-center font-bold text-[18px] leading-6 text-[#3F3E4E] mx-auto mt-[34px] justify-center break-words line-clamp-2'>
                  {/* {club.book_title &&
                        (club.book_title.length > 25
                          ? club.book_title.substring(0, 25) + '...'
                          : club.book_title)} */}
                  {club.club?.name}
                </div>
                {/* <div className='mx-8 mt-4 mb-2 w-48 h-72 rounded-lg overflow-hidden'> */}
                <Image
                  width={144}
                  height={225}
                  src={club.club?.book_cover || ''}
                  alt='북이미지'
                  className='mx-auto inset-0 w-[144px] h-[225px] object-cover rounded border-r-4 border border-solid border-blue-200/40'
                />
                {/* </div> */}
                <p className='text-[14px] leading-[20px] text-center font-medium text-[#3F3E4E] mt-[26px]'>
                  독서 상황
                </p>
                <p className='text-[16px] leading-[22px] text-center font-bold text-[#3F3E4E] mt-[16px]'>
                  p.{club.club_activities[0]?.read_page}
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
            </div>
          ))}
      </Slider>
    </>
  );
};

export default ClubList;
