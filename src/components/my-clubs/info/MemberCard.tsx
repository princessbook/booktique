import React from 'react';
import Image from 'next/image';
type MemberCardProps = {
  index: number;
  photoURL: string;
  displayName: string;
  progress?: number | null;
  isAdmin: boolean;
  height?: string;
};

const MemberCard: React.FC<MemberCardProps> = ({
  index,
  photoURL,
  displayName,
  progress,
  isAdmin,
  height
}) => {
  return (
    <div
      className={` bg-[#F6F7F9] rounded-lg p-2 w-[108px] h-[${
        height ? height : '146px'
      }]`}>
      <div className='flex flex-col items-center'>
        <div className='mt-1 mr-3 relative flex justify-center align-middle max-w-full max-h-auto rounded-full'>
          <p className='text-[#B3C1CC] flex mr-1 text-[18px] font-bold'>
            {index + 1}
          </p>
          <Image
            src={photoURL || '/booktique.png'}
            alt='Profile'
            width={56}
            height={56}
            className='rounded-full object-cover w-[56px] h-[56px]'
          />
          {isAdmin && (
            <div className='absolute bottom-0 right-0 z-5'>
              <Image src={'/badge.png'} alt='뱃지' width={16} height={16} />
            </div>
          )}
        </div>

        <div className='w-full h-full flex flex-col items-center justify-center mt-1'>
          <div className='w-[68px] h-[36px]'>
            <p className='font-bold text-[12px] text-center text-fontMain'>
              {displayName}
            </p>
          </div>
          {progress !== undefined && (
            <div className=''>
              <p className='text-subblue text-[18px] font-bold text-center'>
                {progress !== null ? `${progress}%` : '0%'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MemberCard;
