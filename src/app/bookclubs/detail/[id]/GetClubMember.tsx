'use client';

import { PROFILES_TABLE } from '@/common/constants/tableNames';
import { createClient } from '@/utils/supabase/client';
import React, { PropsWithChildren, useEffect, useState } from 'react';

const GetClubMember = ({
  member
}: {
  member: {
    id: string;
    club_id: string;
    user_id: string;
    role: 'admin' | 'member';
  };
}) => {
  console.log('member', member);
  const [userProfile, setUserProfile] = useState<{
    id: string;
    display_name: string;
    interestes: string;
    photo_URL: string;
    introduction: string;
  }>();
  useEffect(() => {
    const getUserProfile = async (userId: string) => {
      console.log('userId', userId);
      try {
        // profiles 테이블에서 해당 userId와 일치하는 행을 조회합니다.
        const supabase = createClient();
        const { data, error } = await supabase
          .from(PROFILES_TABLE)
          .select('*')
          .eq('id', userId)
          .single(); // 여러 개의 결과가 아닌 하나의 결과만 필요하므로 single()을 사용합니다.

        console.log('userData', data);
        if (error) {
          throw error;
        }
        console.log('userProfile', data);
        // 조회된 데이터 반환
        return data;
      } catch (error) {
        console.error('error');
        return null; // 에러 발생 시 null 반환 또는 다른 처리를 수행할 수 있습니다.
      }
    };
    getUserProfile(member.user_id).then((res: any) => {
      console.log('userProfile', res);
      setUserProfile(res);
    });
  }, [member.user_id]);
  return (
    <div className='flex flex-col justify-center items-center'>
      <div className='w-10 h-10 bg-gray-500 rounded-full'></div>
      <p>{member.role === 'admin' ? '방장' : '일반멤버'}</p>
      <div>{userProfile?.display_name}</div>
    </div>
  );
};

export default GetClubMember;
