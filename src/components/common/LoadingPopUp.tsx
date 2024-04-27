import React from 'react';
import LoadingAnimation from './LoadingAnimation';

const LoadingPopUp = () => {
  return (
    <div className='fixed z-10 inset-0 overflow-y-auto flex items-center justify-center'>
      <div className='flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
        <div className='fixed inset-0 transition-opacity' aria-hidden='true'>
          <div className='absolute inset-0 bg-gray-500 opacity-75'></div>
        </div>

        <span
          className='hidden sm:inline-block sm:align-middle sm:h-screen'
          aria-hidden='true'>
          &#8203;
        </span>

        <div className='inline-block w-[308px] h-[244px] align-center bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full relative'>
          <div className='bg-white relative  flex items-center justify-center'>
            <div className='w-[200px]'>
              <LoadingAnimation />
              <p className='items-center text-[16px] text-center relative bottom-3 text-fontMain'>
                잠시만 기다려 주세요:-)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingPopUp;
