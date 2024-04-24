import { createClient } from '@/utils/supabase/server';

const useUserClubs = async (userId: string) => {
  const supabase = createClient();

  const { data: clubData } = await supabase
    .from('members')
    .select('club_id,clubs(name,archive,created_at)')
    .eq('user_id', userId)
    .order('clubs(created_at)', { ascending: false });

  return clubData;
};

export default useUserClubs;
