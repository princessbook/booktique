'use client';

import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { MdAddPhotoAlternate } from 'react-icons/md';

const PhotoSection = ({
  setThumbnail,
  prev,
  isModify,
  setIsPosting
}: {
  setThumbnail: Dispatch<SetStateAction<File | null>>;
  prev: string;
  isModify: boolean;
  setIsPosting: Dispatch<SetStateAction<boolean>>;
}) => {
  const [previewPhoto, setPreviewPhoto] = useState('');
  const photoInput = useRef<HTMLInputElement>(null);

  const handleChangePhoto = async () => {
    if (photoInput.current?.files) {
      const yaho = URL.createObjectURL(photoInput.current?.files[0]);
      setPreviewPhoto(yaho);
      setThumbnail(photoInput.current?.files[0]);
      setIsPosting(true);
    }
  };

  useEffect(() => {
    const setThumbnail = async () => {
      if (isModify) {
        setPreviewPhoto(prev);
        console.log(previewPhoto);
      }
    };
    setThumbnail();
  }, []);

  return (
    <div className='min-h-10'>
      <div className='w-full flex flex-col items-center'>
        <input
          type='file'
          className=' hidden'
          ref={photoInput}
          onChange={handleChangePhoto}
        />
        <div className='w-full flex items-center'>
          <MdAddPhotoAlternate
            className='w-8 h-8 text-fontGray '
            onClick={() => photoInput.current?.click()}
          />
          <p className='text-fontGray text-xs'>썸네일 추가</p>
        </div>
      </div>
      {previewPhoto ? (
        <img className='max-w-10/12' src={`${previewPhoto}`} alt='사진' />
      ) : (
        <></>
      )}
    </div>
  );
};

export default PhotoSection;
