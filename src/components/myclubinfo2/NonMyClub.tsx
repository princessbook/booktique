import React from 'react';
import Button from '@/common/Button';
import Image from 'next/image';
import booktiquereadblue from '../../../public/booktiquereadblue.png';
import { useRouter } from 'next/navigation';
const NonMyClub = () => {
  const router = useRouter();
  return (
    <div className='flex items-center justify-center'>
      <div className='flex flex-col items-center justify-center w-[302px] h-[262px]'>
        <label className='flex justify-center'>
          <Image
            src={booktiquereadblue}
            width={134}
            height={26}
            alt={'my_club_book'}
            className='mt-[38px]'
            priority={true}
          />
        </label>

        <div className='text-center mt-6'>
          <span className='font-wantedSans font-medium text-black text-[16px] leading-[26px]'>
            북티크에서 취향에 맞는 책을{' '}
          </span>
          <br />
          <span className='font-wantedSans font-medium text-black text-[16px] leading-[26px]'>
            같이 읽을 북클럽을 찾아보세요.
          </span>
          <br />
          <div
            className='mt-8
            '>
            <span className='font-wantedSans font-medium text-gray-700 text-[14px] leading-[26px]'>
              현재 참여 중인 모임이 없습니다.
            </span>
          </div>
        </div>

        <Button
          onClick={() => {
            router.push('/bookclubs');
          }}
          small
          text='북클럽 책 읽기'
        />
      </div>
    </div>
  );
};

export default NonMyClub;
