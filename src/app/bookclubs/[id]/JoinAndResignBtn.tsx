'use client';
import React, { useState } from 'react';
import JoinBtn from './JoinBtn';
import ResignBtn from './ResignBtn';

const JoinAndResignBtn = ({
  isMember,
  clubId,
  setIsJoinOrResign
}: {
  isMember: boolean;
  clubId: string;
  setIsJoinOrResign: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [userIsClubMember, setUserIsClubMember] = useState(isMember);

  return (
    <>
      <JoinBtn
        isMember={userIsClubMember}
        clubId={clubId}
        setUserIsClubMember={setUserIsClubMember}
        setIsJoinOrResign={setIsJoinOrResign}
      />
      <ResignBtn
        isMember={userIsClubMember}
        clubId={clubId}
        setUserIsClubMember={setUserIsClubMember}
        setIsJoinOrResign={setIsJoinOrResign}
      />
    </>
  );
};

export default JoinAndResignBtn;
