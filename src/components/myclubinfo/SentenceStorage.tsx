import React from 'react';
import { Tables } from '@/lib/types/supabase';
type Clubs = Tables<'clubs'>;
import { createClient } from '@/utils/supabase/server';
const SentenceStorage = async ({ id }: { id: string }) => {
  // const id = props.params.id;
  const supabase = createClient();
  const { data: clubSentences, error: Error } = await supabase
    .from('sentences')
    .select('*')
    .eq('club_id', id);

  const newCommentCountMap: { [sentenceId: string]: number } = {};
  if (clubSentences && !Error) {
    for (const sentence of clubSentences) {
      const { data: comments, error } = await supabase
        .from('sentence_comments')
        .select('*')
        .eq('sentence_id', sentence.id);
      if (error) {
        console.error('문장의 댓글들 불러오기 실패', error.message);
        return [];
      }
      newCommentCountMap[sentence.id] = comments !== null ? comments.length : 0;
    }
  }

  return (
    <div>
      <ul className='p-4'>
        {clubSentences?.map((sentence) => (
          //Link로 디테일 페이지 보내기.
          <li
            key={sentence.id}
            className='mb-2 p-4 bg-gray-100 rounded-md shadow-md cursor-pointer'
            // onClick={() => handleSentenceClick(sentence.id)}
          >
            <div className='text-lg overflow-hidden overflow-ellipsis whitespace-nowrap'>
              {sentence.sentence_content}
            </div>
            <div className='text-sm text-gray-500'>
              {sentence.created_at}, {sentence.user_id}
            </div>
            <div className='text-sm text-gray-500'>
              댓글 수: {newCommentCountMap[sentence.id] || 0}
            </div>
          </li>
        ))}
      </ul>

      <div className='fixed bottom-32 right-8'>
        <button className='bg-[#269AED] text-white p-2 px-4 rounded-full shadow-lg hover:shadow-xl transition duration-300 font-bold cursor-pointer'>
          문장 공유하기
        </button>
      </div>
    </div>
  );
};

export default SentenceStorage;
