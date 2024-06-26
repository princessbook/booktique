'use client';

import { getOrCreateUserProfile } from '@/app/auth/authAPI';
import SentenceStorage from '@/components/my-clubs/sentences/SentenceStorage';
import useMyClubInfo from '@/hooks/info/useMyClubInfo';
import { Tables } from '@/lib/types/supabase';
import {
  getUserId,
  getUserClubIds,
  getClubInfo
} from '@/utils/userAPIs/authAPI';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

type Clubs = Tables<'clubs'>;

type Props = {};

const SentencePage = (props: Props) => {
  const params = useParams<{
    clubId: string;
  }>();
  const [clubs, setClubs] = useState<Clubs[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  // const {clubs}=useMyClubInfo();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedUserId = await getUserId();
        setUserId(fetchedUserId);
        if (fetchedUserId) {
          const fetchedClubIds = await getUserClubIds(fetchedUserId);
          const fetchClubInfo = await getClubInfo(fetchedClubIds);
          setClubs(fetchClubInfo);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const club = clubs.find((club) => club.id === params.clubId);

  if (!club) {
    return null;
  }

  return (
    <SentenceStorage
      clubId={params.clubId}
      bookpage={club.book_page}
      userId={userId}
    />
  );
};

export default SentencePage;
