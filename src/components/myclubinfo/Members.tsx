import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Tables } from '@/lib/types/supabase';
import Image from 'next/image';
import { PROFILES_TABLE } from '@/common/constants/tableNames';
import { createClient } from '@/utils/supabase/client';

const Members = ({ member }: { member: Tables<'members'> }) => {
  const [userProfile, setUserProfile] = useState<Tables<'profiles'> | null>();
  useEffect(() => {
    const getUserProfile = async (userId: string) => {
      console.log('userId', userId);

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
    if (member.user_id) {
      getUserProfile(member.user_id);
    }
  }, [member.user_id]);

  return (
    <div className='mb-4 w-1/4'>
      <div className='bg-[#EDEEF2] rounded-lg p-2'>
        <div className='flex flex-col items-center space-y-2'>
          <div className='w-20 h-20 max-w-full max-h-full rounded-full overflow-hidden'>
            <Image
              src={userProfile?.photo_URL || '/booktique.png'}
              alt='Profile'
              width={96}
              height={96}
              layout='responsive'
              className='rounded-full'
            />
          </div>
          <div className='member-info w-32 h-16 flex flex-col items-center justify-center mt-2'>
            <p className='font-medium text-center overflow-hidden whitespace-nowrap overflow-ellipsis'>
              {userProfile?.display_name}
            </p>
            <p className='text-center overflow-hidden whitespace-nowrap overflow-ellipsis'>
              {member.role === 'admin' ? '방장' : '일반멤버'}
            </p>
            <p className='text-center overflow-hidden whitespace-nowrap overflow-ellipsis'>
              몇 프로인지?
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Members;
