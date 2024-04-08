import React from 'react';
import { Tables } from '@/lib/types/supabase';

type Sentences = Tables<'sentences'>;

import { createClient } from '@/utils/supabase/server';

const MySentencesStore = async ({ userId }: { userId: string }) => {
  const supabase = createClient();
  const { data: userSentences, error } = await supabase
    .from('sentences')
    .select('*')
    .eq('user_id', userId);

  if (userSentences) {
    const clubIds = userSentences.map((sentence) => sentence.club_id);

    const { data: clubsData, error: clubsError } = await supabase
      .from('clubs')
      .select('book_title,name,id')
      .in('id', clubIds);
    const formattedDate = (dateString: string) => {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');

      return `${year}-${month}-${day} ${hours}:${minutes}`;
    };
    return (
      <div className='mt-6'>
        <div className='flex flex-row mb-4'>
          <h2 className='font-bold'>내가 작성한 문장</h2>
        </div>
        <ul>
          {userSentences.map((sentence) => {
            const club = clubsData?.find(
              (club) => club.id === sentence.club_id
            );
            return (
              <li key={sentence.id} className='border'>
                {sentence.sentence_content && (
                  <div>
                    {sentence.sentence_content}
                    <p className='text-xs'>
                      {formattedDate(sentence.created_at)}
                    </p>
                    {club && (
                      <p className='text-xs'>
                        {club.name} - {club.book_title}
                      </p>
                    )}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
};
export default MySentencesStore;
