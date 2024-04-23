// useClubInfo.ts
'use client';
import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Tables } from '@/lib/types/supabase';
import { getUser, getUserId } from '@/utils/userAPIs/authAPI';
import { useQuery } from '@tanstack/react-query';
type Club = Tables<'clubs'>;

const useMyClubInfo = () => {
  const [clubs, setClubs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  //바꾼 유저 데이터 get
  const {
    data: user,
    isError,
    isLoading: loading
  } = useQuery({
    queryKey: ['user_id'],
    queryFn: getUserId,
    staleTime: 1000 * 5
  });
  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const supabase = createClient();
        //기존의 유저 데이터 get
        // const { data: user } = await getUser();

        if (user) {
          let { data, error } = await supabase
            .from('members')
            .select('*,clubs(name,archive)')
            .eq('user_id', user);

          if (error) throw error;

          //archive false인것만 가져오기
          const clubList = data
            ?.filter((item: any) => item.clubs?.archive === false)
            .map((item: any) => ({
              id: item.club_id,
              name: item.clubs.name
            }));
          setClubs(clubList || []);
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error fetching club info:', error);
      }
    };

    fetchClubs();
  }, [user]);

  return { clubs, isLoading };
};

export default useMyClubInfo;
