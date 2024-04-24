'use client';

import useMyClubInfo from '@/hooks/info/useMyClubInfo';
import { IoIosArrowDown } from 'react-icons/io';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';
import Image from 'next/image';

const ClubSelector = () => {
  const params = useParams<{
    clubId: string;
  }>();
  const router = useRouter();
  // TODO: hook으로 만들어서 재사용하던지... 음... 최상단에서 한번만 호출해서 props로 나리던지... memoization을 하던지...
  const { clubs, isLoading } = useMyClubInfo();
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
  if (!clubs || clubs.length === 0) {
    return <div className='h-[49px]'></div>;
  }
  return (
    <div className='font-bold text-[22px] whitespace-nowrap '>
      <select
        value={params.clubId || ''}
        onChange={(event) => {
          router.push(`/my-clubs/${event.target.value}/info`);
        }}
        className=' p-2 custom-select'>
        {clubs.map((club) => {
          const displayText =
            club.name!.length > 20
              ? club.name!.substring(0, 16) + '...'
              : club.name;
          return (
            <option key={club.id} value={club.id}>
              {displayText}
            </option>
          );
        })}
      </select>
      {clubs.length > 1 && <IoIosArrowDown className='arrow-icon' />}
    </div>
  );
};

export default ClubSelector;
