'use client';

import useClubInfo from '@/hooks/info/useClubInfo';
import { IoIosArrowDown } from 'react-icons/io';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';

type Props = {};

const ClubSelector = (props: Props) => {
  const params = useParams<{
    clubId: string;
  }>();

  const router = useRouter();
  const { clubs } = useClubInfo();
  // TODO: hook으로 만들어서 재사용하던지... 음... 최상단에서 한번만 호출해서 props로 나리던지... memoization을 하던지...

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
