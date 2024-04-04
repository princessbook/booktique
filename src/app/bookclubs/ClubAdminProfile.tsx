'use client';
import { Tables } from '@/lib/types/supabase';
import { createClient } from '@/utils/supabase/client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

const ClubAdminProfile = ({ clubId }: { clubId: string }) => {
  const [adminProfile, setAdminProfile] = useState<Tables<'profiles'>>();
  useEffect(() => {
    async function fetchAdminUserProfiles(clubId: string) {
      try {
        const supabase = createClient();
        const { data: adminMembers, error: membersError } = await supabase
          .from('members')
          .select('user_id')
          .eq('club_id', clubId)
          .eq('role', 'admin');

        if (membersError) {
          throw membersError;
        }

        if (!adminMembers || adminMembers.length === 0) {
          console.log('No admin members found for the club.');
          return [];
        }

        const adminUserIds = adminMembers.map((row) => row.user_id);

        const { data: profiles, error: profilesError } = await supabase
          .from('profiles')
          .select('*')
          .in('id', adminUserIds);

        if (profilesError) {
          throw profilesError;
        }
        setAdminProfile(profiles[0]);
        return profiles;
      } catch (error) {
        return [];
      }
    }
    fetchAdminUserProfiles(clubId);
  }, [clubId]);

  if (!adminProfile) {
    return <></>;
  }
  return (
    <div className='flex justify-between items-center mr-2'>
      <span className='bg-gray-300 w-5 h-5 rounded-full flex items-center justify-center '>
        <Image
          src={adminProfile?.photo_URL as string}
          width={100}
          height={100}
          alt='방장프로필'
        />
      </span>
      {adminProfile?.display_name}
    </div>
  );
};

export default ClubAdminProfile;
