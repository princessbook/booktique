'use client';

import { useRouter } from 'next/navigation';
import { SetStateAction, useState } from 'react';

const SearchForm = () => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const router = useRouter();

  const id = 9788958285342;

  const handleSearchInputChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setSearchKeyword(e.target.value);
  };

  const handleSearchSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    router.push(`/search/${searchKeyword}`);
  };

  return (
    <div>
      <form onSubmit={handleSearchSubmit}>
        <input
          placeholder='책 제목 또는 저자.'
          type='text'
          value={searchKeyword}
          onChange={handleSearchInputChange}
        />
      </form>
    </div>
  );
};

export default SearchForm;
