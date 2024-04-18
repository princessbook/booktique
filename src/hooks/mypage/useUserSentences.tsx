import { createClient } from '@/utils/supabase/server';

const useUserSentences = async (userId: string) => {
  const supabase = createClient();
  const { data: userSentences } = await supabase
    .from('sentences')
    .select('*')
    .eq('user_id', userId);

  if (userSentences) {
    const clubIds = userSentences.map((sentence) => sentence.club_id);
    const { data: clubsData } = await supabase
      .from('clubs')
      .select('book_title,name,id,book_author')
      .in('id', clubIds);

    return { userSentences, clubsData };
  }

  return { userSentences: [], clubsData: [] };
};

export default useUserSentences;
