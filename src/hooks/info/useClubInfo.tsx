import { useEffect, useState } from 'react';
import { getOrCreateUserProfile } from '@/app/auth/authAPI';
import {
  getClubInfo,
  getUserClubIds,
  getUserId
} from '@/utils/userAPIs/authAPI';
import { Tables } from '@/lib/types/supabase';

type Clubs = Tables<'clubs'>;

const useClubInfo = () => {
  const [clubs, setClubs] = useState<Clubs[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedUserId = await getUserId();
        if (fetchedUserId) {
          const fetchedUserProfile = await getOrCreateUserProfile();
          if (fetchedUserProfile) {
            const fetchedClubIds = await getUserClubIds(fetchedUserId);
            const fetchClubInfo = await getClubInfo(
              fetchedClubIds.filter(
                (id) => !clubs.find((club) => club.id === id)?.archive
              )
            );
            setClubs(fetchClubInfo);
            setIsLoading(false);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return { clubs, isLoading };
};

export default useClubInfo;
