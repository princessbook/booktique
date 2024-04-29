// useClubInfo.ts
'use client';
import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Tables } from '@/lib/types/supabase';
import { getUser, getUserId } from '@/utils/userAPIs/authAPI';
import { useQuery } from '@tanstack/react-query';
type Club = Tables<'clubs'>;
const useMyClubInfo = () => {
  const [clubs, setClubs] = useState<
    { id: string; name: string; archive: string }[]
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { data: user, isError } = useQuery({
    queryKey: ['user_id'],
    queryFn: getUserId,
    staleTime: 1000 * 5
  });

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const supabase = createClient();

        if (user) {
          const { data, error } = await supabase
            .from('members')
            .select('*,clubs(name,archive)')
            .eq('user_id', user);

          if (error) throw error;

          const clubList =
            data?.map((item: any) => ({
              id: item.club_id,
              name: item.clubs.name,
              archive: item.clubs.archive
            })) || [];

          setClubs(clubList);
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error fetching club info:', error);
        setIsLoading(false);
      }
    };

    fetchClubs();
  }, [user]);

  return { clubs, isLoading };
};

export default useMyClubInfo;
