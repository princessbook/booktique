'use client';

import NonMyClub from '@/components/my-clubs/info/NonMyClub';
import useClubInfo from '@/hooks/info/useClubInfo';
import { Tables } from '@/lib/types/supabase';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import useMyClubInfo from '@/hooks/info/useMyClubInfo';
type Clubs = Tables<'clubs'>;

type Props = {};

const Page = (props: Props) => {
  // TODO: 내 북클럽 찾아서 첫번째 녀석으로 리다이렉션

  const router = useRouter();
  //getOrCreateUserProfile없는 코드, 푸터의 내 북클럽 누르면 /my-clubs로 가서 렌더링 지연.
  // const { clubs, isLoading } = useMyClubInfo();
  const { clubs, isLoading } = useClubInfo();
  const club = clubs[0];

  useEffect(() => {
    if (club) {
      router.push(`/my-clubs/${club.id}/info`);
    }
  }, [club, router]);

  if (isLoading) {
    return <div>로딩중...</div>;
  }

  if (!club) {
    return (
      <>
        <div className='flex items-center h-[56px] '>
          <p className='px-4 text-[22px] font-bold text-[#292929]'>내 북클럽</p>
        </div>
        <div className='border-b-2 h-[40px] flex'>
          <div className='flex-1 text-center py-2 border-gray-200'>
            <span className='text-[16px] text-[#3A3B42] text-opacity-50'>
              정보
            </span>
          </div>
          <div className='flex-1 text-center py-2 border-gray-200'>
            <span className='text-[16px] text-[#3A3B42] text-opacity-50'>
              문장 저장소
            </span>
          </div>
          <div className='flex-1 text-center py-2 border-gray-200'>
            <span className='text-[16px] text-[#3A3B42] text-opacity-50'>
              퀴즈
            </span>
          </div>
          <div className='flex-1 text-center py-2'>
            <span className='text-[16px] text-[#3A3B42] text-opacity-50'>
              자유 게시판
            </span>
          </div>
        </div>
        <NonMyClub />
      </>
    );
  }

  return null;
};

export default Page;
