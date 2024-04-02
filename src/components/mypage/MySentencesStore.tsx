import React from 'react';
import { Tables } from '@/lib/types/supabase';
import { useState } from 'react';
type Sentences = Tables<'sentences'>;
import { getMySentences, getUserId } from '@/lib/api/authAPI';
import { useEffect } from 'react';

const MAX_CONTENT_LENGTH = 100;

const MySentencesStore = () => {
  const [showFullContent, setShowFullContent] = useState<boolean>(false);
  const [userSentences, setUserSentences] = useState<Sentences[]>([]);
  useEffect(() => {
    const fetchSentences = async () => {
      const userId = await getUserId();
      if (userId) {
        const sentences = await getMySentences(userId);
        setUserSentences(sentences); // 가져온 문자를 상태에 저장한다.
      }
    };

    fetchSentences();
  }, []);
  const toggleContent = () => {
    setShowFullContent(!showFullContent);
  };
  return (
    <div>
      <h2>내가 작성한 문장</h2>
      <ul>
        {userSentences.map((sentence) => (
          <li key={sentence.id} className='border'>
            {sentence.sentence_content && ( // sentence_content가 null이 아닌 경우에만 표시
              <>
                {showFullContent ? (
                  <>
                    {sentence.sentence_content}
                    <p className='text-xs'>{sentence.created_at}</p>
                  </>
                ) : (
                  <>
                    {sentence.sentence_content.length > MAX_CONTENT_LENGTH
                      ? `${sentence.sentence_content.slice(
                          0,
                          MAX_CONTENT_LENGTH
                        )}...`
                      : sentence.sentence_content}
                    <button onClick={toggleContent}>
                      {showFullContent ? '간략히 보기' : '더 보기'}
                    </button>
                  </>
                )}
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MySentencesStore;
