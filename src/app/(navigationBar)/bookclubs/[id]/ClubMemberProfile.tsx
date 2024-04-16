'use client';
import { PROFILES_TABLE } from '@/common/constants/tableNames';
import { Tables } from '@/lib/types/supabase';
import { createClient } from '@/utils/supabase/client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

const ClubMemberProfile = ({ member }: { member: Tables<'members'> }) => {
  const supabase = createClient();
  const [profile, setProfile] = useState<Tables<'profiles'>>();
  useEffect(() => {
    const fetchProfile = async () => {
      const { data, error } = await supabase
        .from(PROFILES_TABLE)
        .select('*')
        .eq('id', member.user_id as string)
        .single();
      if (data) {
        setProfile(data);
      }

      if (error) {
        throw error;
      }
    };
    fetchProfile();
  }, [member.user_id, supabase]);

  if (!profile) {
    return <div>loading...</div>;
  }
  const imgPath = profile.photo_URL ? profile.photo_URL : '/booktique.png';

  return (
    <div className='flex flex-col justify-center items-center'>
      <div className='w-10 h-10  relative flex items-center '>
        {profile && (
          <Image
            unoptimized={true}
            key={imgPath}
            src={imgPath}
            width={40}
            height={40}
            // objectFit='cover'
            alt={imgPath}
            className='w-[40px] h-[40px] object-cover rounded-full'
          />
        )}
        {member.role === 'admin' && (
          <Image
            src='/badge.png'
            alt='badge'
            width={16}
            height={16}
            className='absolute bottom-[5px] right-[-5px]'
          />
        )}
      </div>

      <p>{member.role === 'admin' ? '방장' : '일반멤버'}</p>
      <div className='text-[12px]'>{profile?.display_name}</div>
    </div>
  );
};

export default ClubMemberProfile;
