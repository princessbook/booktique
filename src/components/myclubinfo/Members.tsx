import React from 'react';
import { Tables } from '@/lib/types/supabase';
import Image from 'next/image';
import {
  CLUB_ACTIVITIES_TABLE,
  PROFILES_TABLE
} from '@/common/constants/tableNames';
import { createClient } from '@/utils/supabase/server';
type MembersType = {
  club_id: string;
  id: string;
  role: 'admin' | 'member' | null;
  user_id: string;
  progress?: number | null; // progress 필드 추가
};
const Members = async ({ member }: { member: MembersType }) => {
  const supabase = createClient();
  const { data: profileData, error } = await supabase
    .from(PROFILES_TABLE)
    .select('*')
    .eq('id', member.user_id)
    .single();
  if (error) {
    throw error;
  }
  const { data: activity, error: activityError } = await supabase
    .from(CLUB_ACTIVITIES_TABLE)
    .select('progress')
    .eq('user_id', member.user_id)
    .eq('club_id', member.club_id)
    .order('progress', { ascending: false })
    .single();

  return (
    <div className='mb-4 w-1/4'>
      <div className='bg-[#EDEEF2] rounded-lg p-2 '>
        <div className='flex flex-col items-center space-y-2'>
          <div className='w-20 h-20 max-w-full max-h-full rounded-full overflow-hidden'>
            <Image
              src={profileData?.photo_URL || '/booktique.png'}
              alt='Profile'
              width={96}
              height={96}
              layout='responsive'
              className='rounded-full'
            />
          </div>
          <div className='member-info w-32 h-16 flex flex-col items-center justify-center mt-2'>
            <p className='font-medium text-center overflow-hidden whitespace-nowrap overflow-ellipsis'>
              {profileData?.display_name}
            </p>
            <p className='text-center overflow-hidden overflow-ellipsis'>
              {member.role === 'admin' ? '방장' : '일반멤버'}
            </p>
            <p className='text-subblue font-bold text-center overflow-hidden whitespace-nowrap overflow-ellipsis'>
              {activity?.progress !== undefined
                ? `${activity?.progress}%`
                : '0%'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Members;
