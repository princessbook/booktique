import Image from 'next/image';
import React from 'react';

const NoContentMessage = ({
  imgUrl,
  children,
  width
}: {
  imgUrl: string;
  children: React.ReactNode;
  width: number;
}) => {
  return (
    <div className='flex w-full h-full justify-center items-center'>
      <div className='flex flex-col w-full text-center justify-center items-center'>
        <p className='text-fontGrayBlue mb-10  mt-20 text-[14px]'>{children}</p>
        <div className='w-[191px] h-[130px] flex items-center justify-center'>
          <Image src={`${imgUrl}`} alt='no_post' width={width} height='130' />
        </div>
      </div>
    </div>
  );
};

export default NoContentMessage;
