import Image from 'next/image';
import React from 'react';

const JoinPopUp = ({
  isOpen,
  onClose,
  onConfirm
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) => {
  return (
    <>
      {isOpen && (
        <div className='fixed z-10 inset-0 overflow-y-auto'>
          <div className='flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
            <div
              className='fixed inset-0 transition-opacity'
              aria-hidden='true'>
              <div className='absolute inset-0 bg-black opacity-60'></div>
            </div>

            <span
              className='hidden sm:inline-block sm:align-middle sm:h-screen'
              aria-hidden='true'>
              &#8203;
            </span>

            <div className='inline-block align-center bg-white rounded-[20px] text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full w-[327px] '>
              <div className='bg-white px-4 pt-5 '>
                <div className='mt-3 text-center'>
                  <h3
                    className='text-[16px] font-medium text-fontMain'
                    id='modal-title'></h3>
                  <div className='mt-2 flex items-center justify-center pb-4'>
                    <Image
                      src='/join_success.png'
                      alt='가입성공'
                      width={160}
                      height={160}
                    />
                  </div>
                  <p className=' text-fontTitle text-[16px]'>
                    북클럽 가입이 완료되었습니다.
                    <br />내 북클럽으로 이동할까요?
                  </p>
                </div>
              </div>
              <div className='bg-gray-50 mt-4 flex flex-col px-6 pb-8'>
                <button
                  onClick={onConfirm}
                  type='button'
                  className='w-full h-[44px] inline-flex justify-center rounded-full border-none px-4 py-2 bg-mainblue text-[14px] text-white'>
                  내 북클럽 가기
                </button>
                <button
                  onClick={onClose}
                  type='button'
                  className='mt-3 w-full h-[44px] inline-flex justify-center rounded-full border border-[#DBE3EB] px-4 py-2 bg-white text-base text-[14px] text-[#8A9DB3]'>
                  취소
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default JoinPopUp;
