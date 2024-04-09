import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import fail from '../../public/fail.svg';
import success from '../../public/success.svg';

interface Props {
  message: string;
  onClose: () => void;
  isSuccess: boolean;
}

const ToastUi: React.FC<Props> = ({ message, onClose, isSuccess }) => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    if (message) {
      setIsVisible(true);
      const timeout = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timeout);
    } else {
      setIsVisible(false);
    }
  }, [message, onClose]);

  return (
    <div
      className={`flex items-center toast-container absolute z-50 bottom-32 bg-[#5e5e5e] w-full py-4 rounded-[10px] ${
        isVisible ? 'block' : 'hidden'
      }`}>
      {isSuccess ? (
        <Image
          className='ml-4'
          src={success}
          alt='fail'
          width={16}
          height={16}
        />
      ) : (
        <Image className='ml-4' src={fail} alt='fail' width={16} height={16} />
      )}
      <div className='ml-[6px] toast text-white text-[14px]'>{message}</div>
    </div>
  );
};

export default ToastUi;
