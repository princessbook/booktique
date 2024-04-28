import React from 'react';

const SelectModal = ({
  isModal,
  clubs,
  currentClubId,
  onSelectClub,
  onClose
}: {
  isModal: boolean;
  clubs: { id: string; name: string }[];
  currentClubId: string;
  onSelectClub: (clubId: string) => void;
  onClose: () => void;
}) => {
  return (
    <div
      className={`fixed w-[375px] mx-auto inset-0 z-50 flex items-end justify-center ${
        isModal ? '' : 'hidden'
      }`}>
      <div
        className='absolute inset-0 bg-black opacity-50'
        onClick={onClose}></div>
      <div className='bg-white rounded-t-[20px] z-10 relative w-full px-4 py-6'>
        <div className='flex mb-6'>
          {/* 닫기 버튼 */}
          <button onClick={onClose} className=' text-fontTitle absolute'>
            <div className='w-[22px] h-[22px] relative'>
              <div className='absolute top-1/2 left-0 w-full h-[2px] bg-fontTitle transform -translate-y-1/2 rotate-45'></div>
              <div className='absolute top-1/2 left-0 w-full h-[2px] bg-fontTitle transform -translate-y-1/2 -rotate-45'></div>
            </div>
          </button>
          <span className='w-full text-center font-bold text-[16px] text-fontTitle'>
            북클럽 이동하기
          </span>
        </div>
        {/* 모달 내용 */}
        <div className='relative'>
          <div className='space-y-2 text-[14px] flex flex-col'>
            {clubs.map((club) => (
              <button
                key={club.id}
                onClick={() => onSelectClub(club.id)}
                className={`${
                  club.id === currentClubId ? 'bg-[#DBE3EB]' : 'bg-[#F6F7F9]'
                } w-full py-2 px-4 rounded-[10px] text-left  overflow-hidden`}>
                <p className='truncate text-fontTitle font-bold'>{club.name}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectModal;
