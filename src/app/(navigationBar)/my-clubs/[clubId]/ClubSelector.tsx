'use client';

import useMyClubInfo from '@/hooks/info/useMyClubInfo';
import { IoIosArrowDown } from 'react-icons/io';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';
import Image from 'next/image';
import ResignBtn from '@/components/my-clubs/info/ResignBtn';
import Modal from '@/components/my-clubs/info/Modal';
import { useState } from 'react';

type Props = {
  clubs: { id: string; name: string }[];
  currentClubId: string;
};
const ClubSelector = ({ clubs, currentClubId }: Props) => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  // TODO: hook으로 만들어서 재사용하던지... 음... 최상단에서 한번만 호출해서 props로 나리던지... memoization을 하던지...
  // const { clubs, isLoading } = useMyClubInfo();

  if (!clubs || clubs.length === 0) {
    return <div className='h-[49px]'></div>;
  }
  return (
    <div className='font-bold text-[22px] whitespace-nowrap '>
      <select
        value={currentClubId || ''}
        onChange={(event) => {
          router.push(`/my-clubs/${event.target.value}/info`);
        }}
        className=' px-4 py-2 custom-select'>
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
      <div
        className='absolute top-0 right-0 h-full flex items-center mr-2'
        onClick={() => {
          setModalOpen(true);
        }}>
        <svg
          width='22'
          height='22'
          viewBox='0 0 22 22'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'>
          <circle cx='11' cy='5' r='2' fill='#8A9DB3' />
          <circle cx='11' cy='11' r='2' fill='#8A9DB3' />
          <circle cx='11' cy='17' r='2' fill='#8A9DB3' />
        </svg>
      </div>
      <Modal
        clubId={currentClubId}
        isModal={modalOpen}
        onClose={() => {
          setModalOpen(false);
        }}
      />
    </div>
  );
};

export default ClubSelector;
