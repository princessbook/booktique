'use client';

import { useEffect } from 'react';

const SearchForm = () => {
  const keyword = '미움';
  const id = 9788958285342;

  const getBookInfoAPI = async () => {
    const response = await fetch(`/api/getBookInfo/${id}`);
    if (response.ok) {
      const data = response.json();
      console.log(data);
    } else {
      console.error('책 상세정보 불러오기 실패', response.statusText);
    }
  };

  const getBookAPI = async () => {
    const response = await fetch(`/api/${keyword}`);
    if (response.ok) {
      const data = await response.json();
      console.log(data);
    } else {
      console.error('Failed to fetch data:', response.statusText);
    }
  };

  useEffect(() => {
    getBookAPI();
    getBookInfoAPI();
  }, []);

  return (
    <div>
      <input placeholder='책 제목' />
    </div>
  );
};

export default SearchForm;
