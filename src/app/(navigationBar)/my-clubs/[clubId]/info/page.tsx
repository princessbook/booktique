'use client';

import HomeTab from '@/components/my-clubs/info/HomeTab';
import useClubInfo from '@/hooks/info/useClubInfo';

import { useParams } from 'next/navigation';
import React from 'react';

type Props = {};

const InfoPage = (props: Props) => {
  const params = useParams<{
    clubId: string;
  }>();

  const { clubs } = useClubInfo();

  const club = clubs.find((club) => club.id === params.clubId);

  if (!club) {
    return null;
  }

  return <HomeTab club={club} />;
};

export default InfoPage;
