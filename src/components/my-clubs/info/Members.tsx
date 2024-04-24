import React from 'react';

import MemberCard from './MemberCard';
const Members = async ({ member, index }: { member: any; index: number }) => {
  return (
    <MemberCard
      index={index}
      photoURL={member.profiles?.photo_URL || '/defaultImage.svg'}
      displayName={member.profiles?.display_name || ''}
      progress={member.progress}
      isAdmin={member.role === 'admin'}
    />
  );
};

export default Members;
