import { createClient } from '@/utils/supabase/server';

const useUserSentences = async (userId: string) => {
  const supabase = createClient();
  const { data: userSentences } = await supabase
    .from('sentences')
    .select('*,clubs(book_title,name,id,book_author)')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  console.log(userSentences);
  if (userSentences) {
    return userSentences;
  }

  return [];
};

export default useUserSentences;
