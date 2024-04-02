import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

const supabase = createClientComponentClient();
export const fetchUser = async () => {
  const {
    data: { session }
  } = await supabase.auth.getSession();
  const { data: userData } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', session?.user.id);
  return userData;
};
