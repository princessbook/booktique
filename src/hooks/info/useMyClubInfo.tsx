// useClubInfo.ts
import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Tables } from '@/lib/types/supabase';
type Club = Tables<'clubs'>;

const useMyClubInfo = () => {
  const [clubs, setClubs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const supabase = createClient();
        const {
          data: { user }
        } = await supabase.auth.getUser();

        if (user) {
          let { data, error } = await supabase
            .from('members')
            .select('*,clubs(name,archive)')
            .eq('user_id', user.id);
          // .eq('clubs(archive)', false);
          // .filter('clubs(archive)', 'eq', false);

          if (error) throw error;

          // const clubList = data?.map((item: any) => ({
          //   id: item.club_id,
          //   name: item.clubs.name
          // }));

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
  }, []);

  return { clubs, isLoading };
};

export default useMyClubInfo;
