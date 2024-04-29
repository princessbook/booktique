'use client';
import React, { useState, useEffect } from 'react';
import { useRef } from 'react';
import { createClient } from '@/utils/supabase/client';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const AvatarPage = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const imgRef = useRef<HTMLInputElement>(null);
  const supabase = createClient();
  const router = useRouter();
  const uploadImageStorage = async (file: File) => {
    const {
      data: { user }
    } = await supabase.auth.getUser();
    // console.log(user?.id);
    const fileExt = file?.name.split('.').pop();
    const fileName = `${crypto.randomUUID()}.${fileExt}`;

    try {
      const { data, error } = await supabase.storage
        .from('profileAvatars')
        .upload(`${user?.id}/${fileName}`, file);

      if (error) {
        throw new Error('이미지 업로드 실패', error);
      }
      return `${
        process.env.NEXT_PUBLIC_SUPABASE_URL
      }/storage/v1/object/public/profileAvatars/${data.path}?${Math.random()}`;
    } catch (error) {
      console.log(error);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setSelectedImage(selectedFile);
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };
  const handleImageClick = () => {
    imgRef.current?.click();
  };
  const insertProfile = async (storageImg: string | undefined) => {
    try {
      await supabase.from('profiles').upsert({ photo_URL: storageImg });
    } catch (error) {
      console.error(error);
    }
  };
  const saveImgFile = async () => {
    const storageImg = await uploadImageStorage(selectedImage!);
    await insertProfile(storageImg);
    router.push('/bookclubs');
  };
  return (
    <div className='mx-4 relative h-full '>
      <div className='w-full mx-auto pt-[87px]'>
        <div className='relative w-40 h-40 flex rounded-full overflow-hidden border-2 mx-auto'>
          {previewUrl !== null ? (
            <Image
              src={previewUrl}
              alt='Preview Avatar'
              style={{ objectFit: 'cover', cursor: 'pointer' }}
              fill={true}
              sizes='160px'
              onClick={handleImageClick}
            />
          ) : (
            <Image
              src='/defaultImage.svg'
              alt='Default Avatar'
              style={{ objectFit: 'cover', cursor: 'pointer' }}
              fill={true}
              sizes='160px'
              onClick={handleImageClick}
            />
          )}
        </div>
        <form>
          <input
            type='file'
            accept='image/png , image/jpeg, image/jpg'
            name='images'
            onChange={handleImageChange}
            ref={imgRef}
            className='hidden'
          />
          <button
            className='block mx-auto pt-[107px] text-[17px] font-bold'
            type='button'
            onClick={saveImgFile}>
            프로필 사진을 추가해보세요
          </button>
        </form>
      </div>
      <Link
        href={`/bookclubs`}
        className='w-full bg-mainblue py-3 text-center rounded-[999px] text-[#fff] absolute bottom-14 left-0'
        type='button'>
        건너뛰기
      </Link>
    </div>
  );
};

export default AvatarPage;
