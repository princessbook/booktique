'use client';

import useClubInfo from '@/hooks/info/useClubInfo';

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

  const getSelectClasses = () => {
    if (clubs.length <= 1) {
      return 'appearance-none text-[22px] font-bold p-2';
    }
    return ' p-2 font-bold text-[22px] max-w-[350px] overflow-hidden whitespace-nowrap';
  };

  return (
    <select
      value={params.clubId || ''}
      onChange={(event) => {
        router.push(`/my-clubs/${event.target.value}/info`);
      }}
      className={getSelectClasses()}>
      {/* {clubInfo.length === 0 && <option value=''>내 북클럽</option>} */}
      {clubs.map((club) => {
        const displayText =
          club.name!.length > 20
            ? club.name!.substring(0, 17) + '...'
            : club.name;
        return (
          <option key={club.id} value={club.id} className=''>
            {displayText}
          </option>
        );
      })}
    </select>
  );
};

export default ClubSelector;
