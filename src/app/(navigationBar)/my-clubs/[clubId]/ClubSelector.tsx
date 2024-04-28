'use client';

import { IoIosArrowDown } from 'react-icons/io';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';
import ResignModal from '@/components/my-clubs/info/ResignModal';
import { useState } from 'react';
import SelectModal from '@/components/my-clubs/info/SelectModal';

type Props = {
  clubs: { id: string; name: string }[];
  currentClubId: string;
};
const ClubSelector = ({ clubs, currentClubId }: Props) => {
  const router = useRouter();
  const [resignModalOpen, setResignModalOpen] = useState(false); // ResignModal 상태 추가
  const [selectModalOpen, setSelectModalOpen] = useState(false); // SelectModal 상태 추가
  // TODO: hook으로 만들어서 재사용하던지... 음... 최상단에서 한번만 호출해서 props로 나리던지... memoization을 하던지...
  // const { clubs, isLoading } = useMyClubInfo();
  const handleClubSelect = (clubId: string) => {
    router.push(`/my-clubs/${clubId}/info`);
    setSelectModalOpen(false); // 선택 후 모달 닫기
  };
  if (!clubs || clubs.length === 0) {
    return <div className='h-[49px]'></div>;
  }
  return (
    <div className='font-bold text-[22px] whitespace-nowrap '>
      <div className='px-4 py-2 cursor-pointer flex max-w-[350px] '>
        <div
          className='flex flex-row items-center overflow-hidden'
          onClick={() => {
            if (clubs.length > 1) {
              setSelectModalOpen(true);
            }
          }}>
          <span className='font-bold truncate'>
            {clubs.find((club) => club.id === currentClubId)?.name}
          </span>
          {clubs.length > 1 && (
            <div className='w-5 h-5 ml-1'>
              <IoIosArrowDown />
            </div>
          )}
        </div>
      </div>

      <div
        className='absolute top-0 right-0 h-full flex items-center mr-2'
        onClick={() => {
          setResignModalOpen(true);
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
      <ResignModal
        clubId={currentClubId}
        isModal={resignModalOpen}
        onClose={() => {
          setResignModalOpen(false);
        }}
      />
      <SelectModal
        isModal={selectModalOpen}
        onClose={() => {
          setSelectModalOpen(false);
        }}
        clubs={clubs}
        currentClubId={currentClubId}
        onSelectClub={handleClubSelect}
      />
    </div>
  );
};

export default ClubSelector;
