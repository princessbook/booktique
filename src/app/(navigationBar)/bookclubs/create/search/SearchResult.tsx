'use client';

import { getBookInfoAPI, searchBookKeywords } from '@/utils/bookAPIs/bookAPI';
import { useEffect, useState } from 'react';

import { BookInfo, BookResponse } from '@/lib/types/BookAPI';
import Image from 'next/image';
import NoContentMessage from '@/components/common/NoContentMessage';

const SearchResult = ({
  searchKeyword,
  setBookInfo,
  setIsModalOpen,
  setSearchKeyword,
  bookItems
}: {
  searchKeyword: string;
  setBookInfo: React.Dispatch<React.SetStateAction<BookInfo | undefined>>;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSearchKeyword: React.Dispatch<React.SetStateAction<string>>;
  bookItems: Array<any>;
}) => {
  //책 검색 로직
  // useEffect(() => {
  //   const delayDebounceFn = setTimeout(() => {
  //     performSearch(searchKeyword);
  //   }, 100);

  //   return () => clearTimeout(delayDebounceFn);
  // }, [searchKeyword]);

  //책 상세정보 로직
  const handleSelectBook = async (isbn13: string) => {
    const response = await getBookInfoAPI(isbn13);
    setSearchKeyword('');
    setBookInfo({
      title: response.item[0].title,
      cover: response.item[0].cover,
      isbn13: response.item[0].isbn13,
      itemPage: response.item[0].subInfo.itemPage,
      categoryName: response.item[0].categoryName,
      author: response.item[0].author
    });
    setIsModalOpen(false);
  };

  if (bookItems && bookItems.length === 0) {
    console.log('bookItems', bookItems);
    return (
      <div className='flex flex-col items-center justify-center mt-10'>
        <NoContentMessage width={125} imgUrl='/no_book.png'>
          검색 결과가 없습니다
        </NoContentMessage>
      </div>
    );
  }

  return (
    <div className=' text-left bg-white p-4'>
      {searchKeyword && (
        <p className='text-left font-bold mb-4 text-[#292929] text[16px]'>
          &apos;{searchKeyword}&apos;으로 찾은 검색 결과
        </p>
      )}
      <div className='flex flex-col items-center'>
        {bookItems?.map((item, index) => {
          const isLastItem = index === bookItems.length - 1;
          return (
            <div
              onClick={() => handleSelectBook(item.isbn13)}
              key={item.isbn13}
              className={`flex w-full justify-between items-center py-4 ${
                isLastItem ? '' : 'border-b'
              } gap-2`}>
              <div className='w-[75px] h-[100px] flex items-center justify-center'>
                <Image
                  src={item.cover}
                  alt='책 이미지'
                  width='0'
                  height='0'
                  sizes='100vw'
                  className='w-auto h-auto'
                />
              </div>
              <div className='flex-1'>
                <p className=' text-[#3F3E4E] font-bold text-[14px] mb-2'>
                  {item.title}
                </p>
                <p className=' text-[#3F3E4E] text-[14px] mb-2'>
                  {item.author}
                </p>

                <p className='text-[#3F3E4E] text-[14px]'>
                  {item.categoryName}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SearchResult;
