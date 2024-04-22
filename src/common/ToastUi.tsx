import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import fail from '../../public/fail.svg';
import success from '../../public/success.svg';

interface Props {
  message: string;
  onClose: () => void;
  isSuccess: boolean;
  style: React.CSSProperties;
  duration: number;
}

const ToastUi: React.FC<Props> = ({
  message,
  onClose,
  isSuccess,
  style,
  duration
}) => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    if (message) {
      setIsVisible(true);
      const timeout = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timeout);
    } else {
      setIsVisible(false);
    }
  }, [message, onClose, duration]);

  return (
    <div
      className={`flex items-center toast-container absolute z-50 bottom-32 bg-[#5e5e5e] w-full py-4 rounded-[10px] ${
        isVisible ? 'block' : 'hidden'
      }`}
      style={style}>
      {isSuccess ? (
        <svg
          width='16'
          height='16'
          viewBox='0 0 16 16'
          fill='none'
          className='ml-4'
          xmlns='http://www.w3.org/2000/svg'>
          <circle cx='8' cy='8' r='7' fill='#00DA71' />
          <path
            d='M4.5 7.5L7.38414 10.2998L11.5 5.5'
            stroke='white'
            strokeLinecap='round'
          />
        </svg>
      ) : (
        <svg
          width='14'
          height='14'
          viewBox='0 0 14 14'
          fill='none'
          className='ml-4'
          xmlns='http://www.w3.org/2000/svg'>
          <circle cx='7' cy='7' r='7' fill='#FF645A' />
          <path
            d='M9.75195 4.24707L4.24609 9.75293'
            stroke='white'
            strokeLinecap='round'
          />
          <path
            d='M4.24805 4.24707L9.75391 9.75293'
            stroke='white'
            strokeLinecap='round'
          />
        </svg>
      )}
      <div
        className={`ml-[6px] toast text-white text-[14px] ${
          !isSuccess ? 'vibrate' : ''
        }`}>
        {message}
      </div>
    </div>
  );
};

export default ToastUi;
