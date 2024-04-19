import React from 'react';
import { IoIosSearch } from 'react-icons/io';
import { IoCloseOutline } from 'react-icons/io5';

const SearchInput = ({
  searchText,
  handleSearchText,
  handleSearchEnter,
  handleSearchClose,
  placeholder
}: {
  searchText: string;
  handleSearchText(e: any): void;
  handleSearchEnter(): void;
  handleSearchClose(): void;
  placeholder: string;
}) => {
  return (
    <div className='w-full flex bg-white  rounded-md justify-center items-center px-3'>
      <IoIosSearch
        className='flex items-center text=[#3F3E4E] opacity-60 justify-center'
        size={22}
        color='#3F3E4E'
      />
      <input
        className='w-full py-3 text-[#3F3E4E]  outline-none flex-1 placeholder-thin font-bold '
        placeholder={placeholder}
        onChange={(e) => {
          handleSearchText(e);
        }}
        value={searchText}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSearchEnter();
          }
        }}
      />
      {searchText && (
        <IoCloseOutline
          onClick={() => {
            handleSearchClose();
          }}
          className='rounded-full w-[22px] h-[22px] text-fontGray bg-grayBg'
        />
      )}
    </div>
  );
};

export default SearchInput;
