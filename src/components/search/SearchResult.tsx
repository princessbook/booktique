'use client';

import { searchBookKeywords } from '@/utils/bookAPIs/bookAPI';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { BookResponse } from '@/lib/types/BookAPI';
import Image from 'next/image';

const SearchResult = ({ keyword }: { keyword: string }) => {
  const params = decodeURIComponent(keyword);
  const router = useRouter();

  const [bookItems, setBookItems] = useState<BookResponse[]>([]);

  const performSearch = async (params: string) => {
    const response = await searchBookKeywords(params);
    console.log(response);
    setBookItems(response.item);
  };

  useEffect(() => {
    performSearch(params);
  }, [params]);

  return (
    <div>
      <p>검색 결과 : {params}</p>
      {bookItems?.map((item) => (
        <div
          key={item.isbn13}
          className=' border-t-2 border-gray-400 flex pt-4 pb-4 items-center m-5'>
          <Image src={item.cover} alt='책 이미지' width={75} height={100} />
          <div className='ml-3'>
            <p className='text-[1.1667rem]'>{item.title}</p>
            <p className='text-base'>{item.author}</p>
            <p className='text-base'>{item.categoryName}</p>
          </div>
          <button
            onClick={() => router.push(`/search/${params}/${item.isbn13}`)}>
            북클럽 찾기
          </button>
        </div>
      ))}
    </div>
  );
};

export default SearchResult;
