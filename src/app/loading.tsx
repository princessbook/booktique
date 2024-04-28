import Image from 'next/image';
import React from 'react';

const loading = () => {
  return (
    <div className='w-full bg-mainblue h-full flex items-center justify-center'>
      <Image
        className=''
        width={170}
        height={45}
        src={'/logo_white.png'}
        alt='스플레쉬 이미지'
      />
    </div>
  );
};
export default loading;
