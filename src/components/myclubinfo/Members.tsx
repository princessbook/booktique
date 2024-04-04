import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Tables } from '@/lib/types/supabase';
type Profiles = Tables<'profiles'>;
import Image from 'next/image';
import { getBookClubMembers, getUserProfile } from '@/utils/userAPIs/authAPI';
const Members = ({ clubId }: { clubId: string | null }) => {
  const [membersInfo, setMembersInfo] = useState<Profiles[]>([]);
  const [showMore, setShowMore] = useState<boolean>(false);
  useEffect(() => {
    const fetchMembersInfo = async () => {
      try {
        const clubMemberIds = await getBookClubMembers(clubId ?? '');

        const promises = clubMemberIds.map(
          async (member) => await getUserProfile(member.user_id)
        );
        const profiles = await Promise.all(promises || []);
        const flattenedProfiles = profiles.flat().filter(Boolean);

        // 각 프로필을 배열로 감싸서 저장합니다.
        const wrappedProfiles = flattenedProfiles.map((profile) => [profile]);

        console.log('profiles:', wrappedProfiles);
        setMembersInfo(flattenedProfiles);
      } catch (error) {
        console.error('에러 발생:', error);
      }
    };
    fetchMembersInfo();
  }, [clubId]);
  const handleShowMore = () => {
    setShowMore(true);
  };
  return (
    <div className='flex flex-wrap justify-center gap-2 '>
      {membersInfo
        .slice(0, showMore ? membersInfo.length : 6)
        .map((member, index) => (
          <div
            key={index}
            className='w-1/4 p-2 bg-[#EDEEF2] rounded-lg flex-shrink-0'>
            <div className='flex flex-col items-center'>
              <div className='w-20 h-20 max-w-full max-h-full rounded-full overflow-hidden'>
                <Image
                  src={member?.photo_URL || ''}
                  alt='Profile'
                  width={96}
                  height={96}
                  layout='responsive'
                  className='rounded-full'
                />
              </div>
              <span className='font-bold'>
                {member?.display_name || 'Unknown'}
              </span>
              <p className=''>시간</p>
            </div>
          </div>
        ))}
      {!showMore && membersInfo.length > 6 && (
        <button
          onClick={handleShowMore}
          className='bg-subblue text-white px-4 py-1 rounded-md'>
          더 보기
        </button>
      )}
    </div>
  );
};

export default Members;
