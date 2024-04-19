'use client';
import { useEffect, useState } from 'react';
import SearchForm from './SearchForm';
import SearchResult from './SearchResult';
import { BookInfo } from '@/lib/types/BookAPI';
import { IoClose } from 'react-icons/io5';
import HeaderWithBack from '../../HeaderWithBack';
import { IoIosArrowBack } from 'react-icons/io';
type SearchModalProps = {
  setBookInfo: React.Dispatch<React.SetStateAction<BookInfo | undefined>>;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isModalOpen: boolean;
};
const SearchModal = ({
  setBookInfo,
  setIsModalOpen,
  isModalOpen
}: SearchModalProps) => {
  const [searchKeyword, setSearchKeyword] = useState('');

  if (!isModalOpen) {
    return;
  }
  return (
    <div className='fixed z-3 inset-0 flex items-center justify-center mb-[78px] overflow-y-auto'>
      <div className='absolute z-10 w-full h-full bg-gray-900 opacity-50'></div>
      <div className=' bg-white w-full h-full shadow-lg z-50 overflow-y-auto relative'>
        <div className='relative bg-grayBg'>
          <h1 className='h-[54px] font-bold border border-b border-lineGray relative flex text-[17px] items-center justify-center'>
            <IoIosArrowBack
              onClick={() => {
                setIsModalOpen(false);
                setSearchKeyword('');
              }}
              size={25}
              className='absolute left-3'
            />
            <div className='font-bold'>북클럽 책 고르기</div>
          </h1>
          {/* <div
            onClick={() => {
              setIsModalOpen(false);
              setSearchKeyword('');
            }}
            className='absolute top-[14px] right-5'>
            완료
          </div> */}
        </div>
        {/* <IoClose
          onClick={() => {
            setIsModalOpen(false);
          }}
          className='absolute right-1'
        /> */}

        <div className=''>
          <div>
            <div className='p-4 bg-grayBg'>
              <SearchForm
                searchKeyword={searchKeyword}
                setSearchKeyword={setSearchKeyword}
              />
            </div>
            <SearchResult
              setSearchKeyword={setSearchKeyword}
              setIsModalOpen={setIsModalOpen}
              searchKeyword={searchKeyword}
              setBookInfo={setBookInfo}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
