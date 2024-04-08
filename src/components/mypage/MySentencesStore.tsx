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

  return (
    <div>
      <h2>내가 작성한 문장</h2>
      <ul>
        {userSentences?.map((sentence) => (
          <li key={sentence.id} className='border'>
            {sentence.sentence_content && ( // sentence_content가 null이 아닌 경우에만 표시
              <div>
                {sentence.sentence_content}
                <p className='text-xs'>{sentence.created_at}</p>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MySentencesStore;
