import React, { useEffect, useState } from 'react';
import { Tables } from '@/lib/types/supabase';
import { useRouter } from 'next/navigation';
import { getAllSentences, getSentenceComments } from '@/utils/userAPIs/authAPI';
import { createClient } from '@/utils/supabase/client';

type Sentences = Tables<'sentences'>;

const SentenceStorage = ({ clubId }: { clubId: string | null }) => {
  const router = useRouter();
  const [sentences, setSentences] = useState<Sentences[]>([]);
  const [commentCounts, setCommentCounts] = useState<{
    [sentenceId: string]: number;
  }>({});
  console.log('clubid', clubId);
  useEffect(() => {
    const fetchData = async () => {
      if (clubId) {
        const sentences = await getAllSentences(clubId); // clubId를 사용하여 문장 리스트를 가져옴
        setSentences(sentences);

        // 각 문장에 대한 댓글 수 가져오기
        const commentCountsMap: { [sentenceId: string]: number } = {};
        for (const sentence of sentences) {
          const comments = await getSentenceComments(sentence.id); // 문장에 대한 댓글 가져오기
          commentCountsMap[sentence.id] = comments ? comments.length : 0; // 댓글 수를 저장
        }
        setCommentCounts(commentCountsMap); // 댓글 수 상태 업데이트
      }
    };
    fetchData();
  }, [clubId]);

  const fetchCommentCounts = async (sentences: Sentences[]) => {
    const newCommentCountMap: { [sentenceId: string]: number } = {};
    for (const sentence of sentences) {
      const comments = await getSentenceComments(sentence.id);
      newCommentCountMap[sentence.id] = comments !== null ? comments.length : 0;
    }
    setCommentCounts(newCommentCountMap);
  };
  console.log('fetchCommentCounts', fetchCommentCounts);

  const handleSentenceClick = (id: string) => {
    router.push(`/sentences/${id}`);
  };

  return (
    <div>
      <ul className='p-4'>
        {sentences.map((sentence) => (
          <li
            key={sentence.id}
            className='mb-2 p-4 bg-gray-100 rounded-md shadow-md cursor-pointer'
            onClick={() => handleSentenceClick(sentence.id)}>
            <div className='text-lg overflow-hidden overflow-ellipsis whitespace-nowrap'>
              {sentence.sentence_content}
            </div>
            <div className='text-sm text-gray-500'>
              {sentence.created_at}, {sentence.user_id}
            </div>
            <div className='text-sm text-gray-500'>
              댓글 수: {commentCounts[sentence.id] || 0}
            </div>
          </li>
        ))}
      </ul>

      <div className='fixed bottom-32 right-8'>
        <button className='bg-lime text-black p-2 px-4 rounded-full shadow-lg hover:shadow-xl transition duration-300 font-bold cursor-pointer'>
          문장 공유하기
        </button>
      </div>
    </div>
  );
};

export default SentenceStorage;
