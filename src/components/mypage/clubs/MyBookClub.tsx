import React from 'react';
import useUserClubs from '@/hooks/mypage/useUserClubs';

import Link from 'next/link';
const MyBookClub = async ({ userId }: { userId: string }) => {
  const clubsData = await useUserClubs(userId);
  const limitedClubs = clubsData.slice(0, 3);
  return (
    <div className='mt-6'>
      <ul>
        {limitedClubs.map((club) => (
          <li
            key={club.id}
            className='bg-[#F6F7F9] rounded-lg p-4 mt-2 flex flex-row items-center'>
            <div className='flex flex-col'>
              {club.archive ? (
                <p className='text-center w-[37px] h-[17px] px-1 border text-[10px] text-white bg-[#B3C1CC] rounded-md'>
                  종료
                </p>
              ) : (
                <p className='text-center px-1 border w-[37px] h-[17px] text-[10px] text-white bg-subblue rounded-md'>
                  진행중
                </p>
              )}
              <div className='w-[178px] text-[#3F3E4E]'>{club.name}</div>
            </div>

            <div className='ml-auto'>
              <Link href={`/my-clubs/${club.id}/info`}>
                <svg
                  width='22'
                  height='22'
                  viewBox='0 0 22 22'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'>
                  <path
                    d='M7.56294 4.03125L14.4379 10.9062L7.375 17.9688'
                    stroke='#B3C1CC'
                    strokeWidth='1.6'
                    strokeLinecap='round'
                  />
                </svg>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyBookClub;
