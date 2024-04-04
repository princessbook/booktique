import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { getBookClubMembers, getUserProfile } from '@/utils/userAPIs/authAPI';
const Members = ({ clubId }: { clubId: string | null }) => {
  const [membersInfo, setMembersInfo] = useState([]);
  useEffect(() => {
    const fetchMembersInfo = async () => {
      try {
        const clubMemberIds = await getBookClubMembers(clubId ?? '');
        const promises = clubMemberIds.map((member) =>
          getUserProfile(member.user_id)
        );
        const profiles = await Promise.all(promises);
        console.log('profiles:', profiles);
        setMembersInfo(profiles);
        console.log(membersInfo);
      } catch (error) {
        console.error('에러 발생:', error);
      }
    };

    fetchMembersInfo();
  }, [clubId]);
  return (
    <div className='members-container'>
      {membersInfo?.map((member: any) => (
        <div key={member.id} className='member-card'>
          <img src={member.photo_URL} alt='Profile' className='profile-image' />
          <span className='nickname'>{member.display_name}</span>
        </div>
      ))}
    </div>
  );
};

export default Members;
