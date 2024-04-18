import { createClient } from '@/utils/supabase/server';
import { Tables } from '@/lib/types/supabase';
type Club = Tables<'clubs'>;
const useUserClubs = async (userId: string): Promise<Club[]> => {
  const supabase = createClient();

  const { data } = await supabase
    .from('members')
    .select('club_id')
    .eq('user_id', userId);

  const clubIds = data?.map((row: any) => row.club_id) || [];
  let clubData: Club[] = [];

  if (clubIds.length > 0) {
    const { data: clubs } = await supabase
      .from('clubs')
      .select('*')
      .in('id', clubIds)
      .order('created_at', { ascending: false });

    clubData = clubs || [];
  }

  return clubData;
};

export default useUserClubs;
