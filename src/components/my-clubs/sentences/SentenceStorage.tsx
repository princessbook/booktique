'use client';
import React, { useEffect, useState } from 'react';
import { Tables } from '@/lib/types/supabase';
import { useRouter } from 'next/navigation';
import { getAllSentences, getSentenceComments } from '@/utils/userAPIs/authAPI';
import { createClient } from '@/utils/supabase/client';
import SentenceUser from './SentenceUser';
import SentenceModal from './SentenceModal';
import Image from 'next/image';
import NoContentMessage from '@/components/common/NoContentMessage';

type Sentences = Tables<'sentences'>;

const SentenceStorage = ({
  clubId,
  userId,
  bookpage
}: {
  clubId: string;
  userId: string | null;
  bookpage: number | null;
}) => {
  const router = useRouter();
  const supabase = createClient();
  const [sentences, setSentences] = useState<Sentences[]>([]);
  const [commentCounts, setCommentCounts] = useState<{
    [sentenceId: string]: number;
  }>({});
  const [isModal, setIsModal] = useState(false);
  const [nonArchiveClub, setNonArchiveClub] = useState<boolean | null>(false);
  const [selectedSentences, setSelectedSentences] = useState<string[]>([]);

  useEffect(() => {
    fetchData();
    fetchNonArchiveClub();
  }, [clubId]);

  const fetchData = async () => {
    if (clubId) {
      const sentences = await getAllSentences(clubId);
      setSentences(sentences);
      fetchCommentCounts(sentences);
    }
  };
  const fetchNonArchiveClub = async () => {
    if (clubId) {
      const { data: nonArchiveClubData, error } = await supabase
        .from('clubs')
        .select('archive')
        .eq('id', clubId)
        .single();

      if (error) {
        console.error('Error fetching non-archive club data:', error);
        return;
      }

      if (nonArchiveClubData) {
        setNonArchiveClub(nonArchiveClubData?.archive);
      }
    }
  };
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

  const handleSentenceSaveBtn = () => {
    setIsModal(true);
  };
  const handleCloseModal = () => {
    setIsModal(false);
    fetchData();
  };
  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    sentenceId: string
  ) => {
    if (event.target.checked) {
      setSelectedSentences([...selectedSentences, sentenceId]);
    } else {
      setSelectedSentences(selectedSentences.filter((id) => id !== sentenceId));
    }
  };

  const handleDeleteSelected = async () => {
    // 로그인한 사용자와 문장 작성자의 ID가 일치하는 경우에만 삭제 수행
    try {
      await Promise.all(
        selectedSentences.map(async (sentenceId) => {
          const { data: sentenceData, error: sentenceError } = await supabase
            .from('sentences')
            .select('user_id')
            .eq('id', sentenceId)
            .single();
          if (sentenceError) {
            throw new Error('Error fetching sentence data');
          }
          if (sentenceData && sentenceData.user_id === userId) {
            await supabase.from('sentences').delete().eq('id', sentenceId);
          }
        })
      );
      fetchData(); //삭제후 데이터 렌더링
      setSelectedSentences([]); //문장초기화
    } catch (error) {
      console.error('Error deleting sentences:', error);
    }
  };

  return (
    <div className='px-4'>
      {sentences.length === 0 ? (
        <NoContentMessage imgUrl='/no_sentence.png' width={191}>
          {' '}
          책을 읽고 좋았던 문장을 저장해 <br />
          클럽원들과 함께 나눠 보세요.
        </NoContentMessage>
      ) : (
        <ul className='relative'>
          {sentences?.map((sentence) => (
            //Link로 디테일 페이지 보내기.
            <li key={sentence.id} className=' my-4 relative'>
              {userId === sentence.user_id && ( // 로그인한 사용자와 문장 작성자의 ID가 일치하는 경우에만 체크박스 표시
                <input
                  type='checkbox'
                  className='absolute right-3'
                  checked={selectedSentences.includes(sentence.id)}
                  onChange={(event) => handleCheckboxChange(event, sentence.id)}
                />
              )}
              <SentenceUser sentenceId={sentence.user_id || ''} />
              <div
                className='bg-gray-100 rounded-md ml-7 px-4 py-2'
                style={{ wordWrap: 'break-word' }}>
                <div className='text-sm'>{sentence.sentence_content}</div>
                <div className='text-[11px] text-[#3F3E4E] overflow-hidden overflow-ellipsis whitespace-nowrap mt-1'>
                  {sentence.sentence_page}p
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
      <div className='flex justify-end'>
        {nonArchiveClub ? null : (
          <button
            onClick={
              selectedSentences.length > 0
                ? handleDeleteSelected
                : handleSentenceSaveBtn
            }
            className={`py-[15px] px-[20px] bottom-[110px] fixed text-white rounded-full shadow-lg hover:shadow-xl transition duration-300 font-bold cursor-pointer ${
              selectedSentences.length > 0 ? 'bg-red-500' : 'bg-mainblue'
            }`}>
            {selectedSentences.length > 0
              ? '선택된 문장 삭제'
              : '문장 공유하기'}
          </button>
        )}
      </div>
      <SentenceModal
        bookpage={bookpage}
        isModal={isModal}
        onClose={handleCloseModal}
        clubId={clubId}
        userId={userId}
      />
    </div>
  );
};

export default SentenceStorage;
