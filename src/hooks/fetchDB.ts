import { createClient } from '@/utils/supabase/server';

const supabase = createClient();
export const fetchUser = async () => {
  const {
    data: { session }
  } = await supabase.auth.getSession();
  const { data: userData } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', session?.user.id!);
  return userData;
};
