import React from 'react';

const ReadBookLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='h-screen w-full m-auto bg-red-50 justify-center items-center'>
      {children}
    </div>
  );
};

export default ReadBookLayout;
