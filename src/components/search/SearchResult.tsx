'use client';

import { getBookInfoAPI, searchBookKeywords } from '@/utils/bookAPIs/bookAPI';
import { useEffect, useState } from 'react';

import { BookInfo, BookResponse } from '@/lib/types/BookAPI';
import Image from 'next/image';

const SearchResult = ({
  searchKeyword,
  setBookInfo
}: {
  searchKeyword: string;
  setBookInfo: React.Dispatch<React.SetStateAction<BookInfo>>;
}) => {
  const [bookItems, setBookItems] = useState<BookResponse[]>([]);

  //책 검색 로직
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      performSearch(searchKeyword);
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [searchKeyword]);

  const performSearch = async (keyword: string) => {
    const response = await searchBookKeywords(keyword);
    setBookItems(response.item);
  };

  //책 상세정보 로직
  const handleSelectBook = async (isbn13: string) => {
    const response = await getBookInfoAPI(isbn13);
    setBookInfo({
      title: response.item[0].title,
      cover: response.item[0].cover,
      isbn13: response.item[0].isbn13,
      itemPage: response.item[0].subInfo.itemPage,
      categoryName: response.item[0].categoryName,
      author: response.item[0].author
    });
  };

  return (
    <div className='flex flex-col items-center'>
      <p>검색 결과 : {searchKeyword}</p>
      {bookItems?.map((item) => (
        <div
          key={item.isbn13}
          className='flex items-center w-full pb-2 pt-2 border-b-2 gap-2'>
          <Image src={item.cover} alt='책 이미지' width={75} height={100} />
          <div className='w-7/12'>
            <p className='truncate'>{item.title}</p>
            <p className='truncate'>{item.author}</p>
            <p className='truncate'>{item.categoryName}</p>
          </div>
          <button onClick={() => handleSelectBook(item.isbn13)}>선택</button>
        </div>
      ))}
    </div>
  );
};

export default SearchResult;
