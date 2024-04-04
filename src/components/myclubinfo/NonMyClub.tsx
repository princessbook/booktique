import React from 'react';
import Button from '@/common/Button';
import Image from 'next/image';
import blue from '../../../public/booktique.png';
import { useRouter } from 'next/navigation';
const NonMyClub = () => {
  const router = useRouter();
  return (
    <div className='h-screen'>
      <label className='flex justify-center'>
        <Image
          src={blue}
          width={134}
          height={26}
          alt={'my_club_book'}
          className='mt-[38px]'
          priority={true}
        />
      </label>
      <div className='flex flex-col items-center mt-[26px] mb-[98px]'>
        <div className='w-[216px] mx-auto'>
          <div className='text-center'>
            <span className='font-wantedSans font-bold text-gray-700 text-[17px] leading-[26px]'>
              아직 가입한 북클럽이 없어요.
            </span>
            <br />
            <span className='font-wantedSans font-bold text-blue-500 text-[17px] leading-[26px]'>
              북티크에서 취향에 맞는 책을 같이 읽을 북클럽을 찾아보세요.
            </span>
          </div>
        </div>
      </div>

      <Button
        onClick={() => {
          router.push('/bookclubs');
        }}
        small
        text='북클럽 찾기'
      />
    </div>
  );
};

export default NonMyClub;
