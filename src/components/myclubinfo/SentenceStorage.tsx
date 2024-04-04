import React, { useEffect } from 'react';
import { Tables } from '@/lib/types/supabase';
type Sentences = Tables<'sentences'>;
import { useState } from 'react';
import { getAllSentences } from '@/utils/userAPIs/authAPI';
import { useRouter } from 'next/navigation';
const SentenceStorage = ({ clubId }: { clubId: string | null }) => {
  const router = useRouter();
  // console.log(clubId);
  const [sentences, setSentences] = useState<Sentences[]>([]);
  useEffect(() => {
    const fetchSentences = async () => {
      if (clubId) {
        const sentences = await getAllSentences(clubId);
        setSentences(sentences);
      }
    };
    fetchSentences();
  }, [clubId]);
  const handleSentenceClick = (id: string) => {
    // 클릭한 문장의 id를 기반으로 다른 탭으로 이동하는 로직 추가
    router.push(`/sentences/${id}`); // 예시 URL
  };
  return (
    <div>
      <ul className='p-4 mt-16'>
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
          </li>
        ))}
      </ul>

      <div className='fixed bottom-32 right-8'>
        <button className='bg-lime text-black p-2 px-4 rounded-full shadow-lg hover:shadow-xl transition duration-300 font-bold'>
          문장 공유하기
        </button>
      </div>
    </div>
  );
};

export default SentenceStorage;
