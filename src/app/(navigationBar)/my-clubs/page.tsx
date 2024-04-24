'use client';

import NonMyClub from '@/components/my-clubs/info/NonMyClub';
import { Tables } from '@/lib/types/supabase';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import useMyClubInfo from '@/hooks/info/useMyClubInfo';
import Image from 'next/image';
type Clubs = Tables<'clubs'>;

type Props = {};

const Page = (props: Props) => {
  // TODO: 내 북클럽 찾아서 첫번째 녀석으로 리다이렉션

  const router = useRouter();
  const { clubs, isLoading } = useMyClubInfo();
  const club = clubs[0];

  useEffect(() => {
    if (club) {
      router.push(`/my-clubs/${club.id}/info`);
    }
  }, [club, router]);

  if (isLoading) {
    return (
      <div className='flex justify-center items-center h-screen flex-col'>
        <div>
          <Image
            src={'/readbook_noclub.png'}
            alt='로딩중이미지'
            width={150}
            height={150}
          />
        </div>
        <div className='mt-4 relative h-4 w-40 bg-gray-200 rounded-full overflow-hidden'>
          <div className=' absolute top-0 left-0 h-full bg-gradient-to-r from-secondary500 to-primary400 rounded-full animate-fill'></div>
        </div>
      </div>
    );
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
