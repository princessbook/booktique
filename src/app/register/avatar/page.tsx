'use client';
import React, { useState, useEffect } from 'react';
import { useRef } from 'react';
import { createClient } from '@/utils/supabase/client';

const AvatarPage = () => {
  const [photoUrl, setPhotoUrl] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const imgRef = useRef<HTMLInputElement>(null);
  const supabase = createClient();

  const uploadImageStorage = async (file: File) => {
    const fileExt = file?.name.split('.').pop();
    const fileName = `${crypto.randomUUID()}.${fileExt}`;

    try {
      const { data, error } = await supabase.storage
        .from('profileAvatars')
        .upload(`${fileName}`, file);

      if (error) {
        throw new Error('이미지 업로드 실패', error);
      }
      console.log('fileExt', fileExt);
      console.log('fileName', fileName);
      console.log(data);
      return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/profileAvatars/${fileName}`;
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
  const insertProfile = async (storageImg: string | undefined) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .upsert({ photo_URL: storageImg });
      console.log('insertFile', data);
    } catch (error) {
      console.error(error);
    }
  };
  const saveImgFile = async () => {
    const storageImg = await uploadImageStorage(selectedImage!);
    console.log('storage이미지', storageImg);
    await insertProfile(storageImg);
  };
  const handleSkip = () => {
    window.location.href = '/myclub'; // '/myclub' 페이지로 이동
  };
  // const saveImgFile = async () => {
  //   const file = imgRef.current?.files?.[0];
  //   if (!file) {
  //     console.error('No file selected.');
  //     return;
  //   }
  //   try {
  //     const supabase = createClient();
  //     // Storage에 이미지 업로드
  //     const { data, error } = await supabase.storage
  //       .from('profileAvatars')
  //       .upload(`userAvatar_${new Date().getTime()}`, file);

  //     if (error) {
  //       console.error('Error uploading avatar:', error.message);
  //       return;
  //     }

  //     if (data) {
  //       console.log('Avatar uploaded successfully:', data);

  //       // Storage에 업로드된 이미지 URL 가져오기
  //       const { path } = data;

  //       // Profiles 테이블에서 사용자 프로필 업데이트
  //       const {
  //         data: { user }
  //       } = await supabase.auth.getUser();
  //       if (user) {
  //         const { data: profiles, error: profileError } = await supabase
  //           .from('profiles')
  //           .update({ photo_URL: path })
  //           .eq('id', user.id)
  //           .single();

  //         if (profileError) {
  //           console.error('Error updating profile:', profileError.message);
  //           return;
  //         }

  //         if (profiles && profiles.photo_URL) {
  //           // profileData에 photoUrl이 있는지 확인
  //           console.log('Profile updated successfully:', profiles);
  //           setPhotoUrl(profiles.photo_URL); // 업데이트된 이미지 URL로 상태 업데이트
  //         }
  //       }
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  return (
    <div className='px-4'>
      avatarPage
      {previewUrl !== null ? (
        <img
          src={previewUrl}
          alt='Preview Avatar'
          style={{ maxWidth: '300px' }}
        />
      ) : (
        <img src='/booktique.png' alt='Default Avatar' />
      )}
      <form>
        <input
          type='file'
          accept='image/png , image/jpeg, image/jpg'
          name='images'
          onChange={handleImageChange}
          ref={imgRef}
        />
        <button type='button' onClick={saveImgFile}>
          등록하기
        </button>
        <button
          className='w-full bg-mainblue h-[48px] rounded-[999px] text-[#fff]'
          type='button'
          onClick={handleSkip}>
          건너뛰기
        </button>
      </form>
    </div>
  );
};

export default AvatarPage;
