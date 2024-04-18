'use client';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Tables } from '@/lib/types/supabase';
import Image from 'next/image';
import { PROFILES_TABLE } from '@/common/constants/tableNames';
import { createClient } from '@/utils/supabase/client';
type MembersType = {
  height?: string;
  club_id: string;
  id: string;
  role: 'admin' | 'member' | null;
  user_id: string | null;
  progress?: number | null; // progress 필드 추가
};
const Members = ({
  member,
  index,
  height
}: {
  member: MembersType;
  index: number;
  height?: string;
}) => {
  const [userProfile, setUserProfile] = useState<Tables<'profiles'> | null>();

  const getUserProfile = async (userId: string) => {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from(PROFILES_TABLE)
        .select('*')
        .eq('id', userId)
        .single();

      setUserProfile(data);
      if (error) {
        throw error;
      }
      return data;
    } catch (error) {
      console.error('error');
      return null;
    }
  };

  useEffect(() => {
    if (member.user_id) {
      getUserProfile(member.user_id);
    }
  }, [member.user_id]);
  return (
    <div
      key={index}
      className={` bg-grayBg rounded-lg p-2 w-[108px] h-[${
        height ? height : '146px'
      }]`}>
      <div className='flex flex-col items-center'>
        <div className='mt-1 mr-3 relative flex justify-center align-middle max-w-full max-h-auto rounded-full'>
          <p className='text-[#B3C1CC] flex mr-1 text-[18px] font-bold'>
            {index + 1}
          </p>
          <img
            src={userProfile?.photo_URL || '/booktique.png'}
            alt='Profile'
            width={56}
            height={56}
            className='rounded-full object-cover w-[56px] h-[56px]'
          />
          {member.role === 'admin' && (
            <svg
              className='absolute bottom-0 right-0 z-5'
              width='16'
              height='16'
              viewBox='0 0 16 16'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M13.2635 2.95164L12.1935 1.85059C10.3554 3.68863 7.99794 1.85059 7.99794 1.85059C7.99794 1.85059 5.64044 3.68863 3.8024 1.85059L2.73242 2.95164C2.73242 2.95164 3.93559 4.75861 3.21635 6.5789C2.49712 8.39918 1.71128 12.3683 7.99794 14.5438C14.2846 12.3727 13.4943 8.39918 12.7795 6.5789C12.0603 4.75861 13.2635 2.95164 13.2635 2.95164Z'
                fill='#59B9FF'
              />
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M14.6421 2.82497L14.1627 3.54488C14.1623 3.54558 14.1617 3.54655 14.1609 3.54779C14.1571 3.55376 14.1496 3.56587 14.139 3.58371C14.1177 3.6195 14.0845 3.67761 14.0449 3.75466C13.9651 3.91023 13.8635 4.13473 13.7805 4.40235C13.6103 4.95034 13.5449 5.58509 13.7813 6.18331L13.7821 6.18543C14.1762 7.1889 14.6527 8.92657 14.0358 10.7717C13.3994 12.6753 11.702 14.4045 8.34944 15.5623L7.99744 15.6839L7.64551 15.5621C4.29364 14.4022 2.59535 12.6732 1.95826 10.7705C1.34052 8.92546 1.81718 7.1884 2.21431 6.18331C2.45069 5.58509 2.38526 4.95034 2.21513 4.40235C2.13204 4.13473 2.03051 3.91023 1.95066 3.75466C1.9111 3.67761 1.87792 3.6195 1.85664 3.58371C1.84603 3.56588 1.83848 3.55376 1.83471 3.54779C1.83393 3.54655 1.83331 3.54558 1.83287 3.54488L1.35352 2.82497L3.79127 0.316406L4.564 1.08913C5.12194 1.64707 5.72062 1.66495 6.29836 1.5029C6.59772 1.41894 6.86606 1.28912 7.06373 1.17546C7.16067 1.11972 7.23577 1.07067 7.28364 1.03784C7.30746 1.0215 7.32418 1.00943 7.33311 1.00287L7.33959 0.998053L7.99779 0.48488L8.65599 0.998051L8.66248 1.00287C8.67141 1.00943 8.68813 1.0215 8.71195 1.03784C8.75982 1.07067 8.83492 1.11972 8.93186 1.17546C9.12953 1.28912 9.39787 1.41894 9.69723 1.5029C10.275 1.66495 10.8737 1.64707 11.4316 1.08913L12.2043 0.316406L14.6421 2.82497ZM3.87149 1.91816C5.69893 3.64321 7.99779 1.85087 7.99779 1.85087C7.99779 1.85087 10.2967 3.64321 12.1241 1.91816C12.1473 1.8963 12.1703 1.87387 12.1933 1.85087L13.2633 2.95193C13.2633 2.95193 12.0601 4.7589 12.7794 6.57918C13.4942 8.39947 14.2844 12.373 7.99779 14.5441C1.71114 12.3686 2.49697 8.39947 3.21621 6.57918C3.93544 4.7589 2.73228 2.95193 2.73228 2.95193L3.80225 1.85087C3.82525 1.87387 3.84833 1.8963 3.87149 1.91816Z'
                fill='#35A5F6'
              />
              <path
                d='M8.00195 14.5438C14.2886 12.3727 13.4983 8.39918 12.7835 6.5789C12.0643 4.75861 13.2675 2.95164 13.2675 2.95164L12.1975 1.85059C10.3594 3.68863 8.00195 1.85059 8.00195 1.85059V14.5438Z'
                fill='#269AED'
              />
              <path
                d='M8.02549 4.59863L9.11041 7.08838L11.8088 7.3457L9.77805 9.14694L10.3622 11.7966L8.02549 10.4196L5.68874 11.7966L6.27293 9.14694L4.24219 7.3457L6.94057 7.08838L8.02549 4.59863Z'
                fill='#D8FA8E'
              />
            </svg>
          )}
        </div>

        <div className='w-full h-full flex flex-col items-center justify-center mt-1'>
          <div className='w-[68px] h-[36px]'>
            <p className='font-bold text-[12px] text-center'>
              {userProfile?.display_name}
            </p>
          </div>
          {member.progress !== undefined && (
            <div className=''>
              <p className='text-subblue text-[18px] font-bold text-center'>
                {member.progress !== null ? `${member.progress}%` : '0%'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Members;
