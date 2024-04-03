'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import booktiqueread from '../../../public/booktiqueread.png';
import Button from '@/common/Button';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import LoadingOverlay from '../../common/LoadingOverlay';

const MyBookClub = () => {
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const supabase = createClient();
        let supabaseTableData = supabase.from('profiles').select('*');
        const { data, error } = await supabaseTableData;
        if (error) {
          throw new Error('데이터를 불러오는 도중 오류가 발생했습니다.');
        }
        if (data && data.length > 0) {
          setImageUrl(data[0]?.photo_URL || '');
          setLoading(false);
        }
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : '알 수 없는 오류가 발생했습니다.'
        );
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (error) {
    return <div>에러가 발생했습니다: {error}</div>;
  }

  return (
    <>
      <LoadingOverlay show={loading} />{' '}
      <div style={{ visibility: loading ? 'hidden' : 'visible' }}>
        <label className='flex justify-center'>
          <Image
            src={booktiqueread}
            width={134}
            height={26}
            alt={'my_club_book'}
            className='mt-[80px]'
            priority={true}
          />
        </label>
        {!loading && (
          <Image
            src={imageUrl}
            width={302}
            height={464}
            alt={'my_club_book'}
            className='mt-[24px] mx-auto mb-[40px] object-cover w-[302px] h-[464px]'
            priority={true}
          />
        )}
        <Button
          onClick={() => {
            router.replace('/');
          }}
          small
          text='북클럽 책읽기'
        />
      </div>
    </>
  );
};

export default MyBookClub;
