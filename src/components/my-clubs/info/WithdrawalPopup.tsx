import React from 'react';

const WithdrawalPopup = ({
  isOpen,
  onClose,
  onWithdraw
}: {
  isOpen: boolean;
  onClose: () => void;
  onWithdraw: () => void;
}) => {
  return (
    <>
      {isOpen && (
        <div className='fixed z-10 inset-0 overflow-y-auto'>
          <div className='flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
            <div
              className='fixed inset-0 transition-opacity'
              aria-hidden='true'>
              <div className='absolute inset-0 bg-gray-500 opacity-75'></div>
            </div>

            <span
              className='hidden sm:inline-block sm:align-middle sm:h-screen'
              aria-hidden='true'>
              &#8203;
            </span>

            <div className='inline-block align-center bg-white rounded-[20px] text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full w-[327px] h-[224px]'>
              <div className='bg-white px-4 pt-5 '>
                <div className='sm:flex sm:items-start'>
                  <div className='mt-3 text-center'>
                    <h3
                      className='text-lg font-medium leading-6 text-fontMain'
                      id='modal-title'>
                      북클럽을 정말 탈퇴할까요?
                    </h3>
                    <div className='mt-2'>
                      <p className='text-sm text-fontGray'>
                        탈퇴하시면 모든 데이터가 삭제됩니다.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className='bg-gray-50 mt-4 flex flex-col px-6'>
                <button
                  onClick={onWithdraw}
                  type='button'
                  className='w-full h-[44px] inline-flex justify-center rounded-full border-none shadow-sm px-4 py-2 bg-[#FF645A] text-base text-[14px] text-white sm:ml-3 sm:w-auto sm:text-sm'>
                  탈퇴하기
                </button>
                <button
                  onClick={onClose}
                  type='button'
                  className='mt-3 w-full h-[44px] inline-flex justify-center rounded-full border border-[#DBE3EB] shadow-sm px-4 py-2 bg-white text-base text-[14px] sm:mt-0 sm:w-auto sm:text-sm text-[#8A9DB3]'>
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

export default WithdrawalPopup;
