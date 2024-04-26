import React from 'react';

const Loading = () => {
  return (
    <div className='flex justify-center items-center h-screen flex-col'>
      <div>
        <img src={'/로딩.gif'} alt='로딩중이미지' />
      </div>
    </div>
  );
};

export default Loading;
