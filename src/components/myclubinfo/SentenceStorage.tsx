import React, { useEffect, useState } from 'react';
import { Tables } from '@/lib/types/supabase';
import { useRouter } from 'next/navigation';
import { getAllSentences, getSentenceComments } from '@/utils/userAPIs/authAPI';
type Clubs = Tables<'clubs'>;
type Sentences = Tables<'sentences'>;

const SentenceStorage = ({ club }: { club: Clubs }) => {
  const router = useRouter();
  const [sentences, setSentences] = useState<Sentences[]>([]);
  const [commentCounts, setCommentCounts] = useState<{
    [sentenceId: string]: number;
  }>({});

  useEffect(() => {
    const fetchData = async () => {
      if (club.id) {
        const sentences = await getAllSentences(club.id);
        setSentences(sentences);
        fetchCommentCounts(sentences);
      }
    };
    fetchData();
  }, [club.id]);

  const fetchCommentCounts = async (sentences: Sentences[]) => {
    const newCommentCountMap: { [sentenceId: string]: number } = {};
    for (const sentence of sentences) {
      const comments = await getSentenceComments(sentence.id);
      newCommentCountMap[sentence.id] = comments !== null ? comments.length : 0;
    }
    setCommentCounts(newCommentCountMap);
  };

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
