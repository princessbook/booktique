import React from 'react';
import BackBtn from '../../app/(navigationBar)/bookclubs/[id]/BackBtn';

const HeaderWithBack = ({ title }: { title: string }) => {
  return (
    <h1 className='h-[54px] mb-8 font-bold border border-b border-lineGray relative flex text-[17px] items-center justify-center'>
      <BackBtn />
      <div className='font-bold text-[#292929]'>{title}</div>
    </h1>
  );
};

export default HeaderWithBack;
