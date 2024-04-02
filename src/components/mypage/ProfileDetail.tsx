'use client';
import React from 'react';
import { Tables } from '@/lib/types/supabase';
type Profile = Tables<'profiles'>;
import { useState, useRef } from 'react';
import Image from 'next/image';
import { useMutation } from '@tanstack/react-query';
import { updateUserProfile } from '@/utils/userAPIs/Fns';
import { useQueryClient } from '@tanstack/react-query';
import { uploadAvatar } from '@/utils/userAPIs/storageAPI';
const ProfileDetail = ({
  profiles,
  userId
}: {
  profiles: Profile[];
  userId: string | null;
}) => {
  const userProfile = profiles?.find((profile) => profile.id === userId);
  const [isEdit, setIsEdit] = useState(false);
  const [displayName, setDisplayName] = useState(
    userProfile?.display_name || ''
  );
  const [interests, setInterests] = useState(
    userProfile?.interests || '관심있는 분야를 입력해주세요.'
  );
  const [introduction, setIntroduction] = useState(
    userProfile?.introduction || '내 간략한 소개를 해주세요.'
  );
  const [photoUrl, setPhotoUrl] = useState(
    userProfile?.photo_URL || '/default_img.png'
  );
  const [mostFavoriteBook, setMostFavoriteBook] = useState(
    userProfile?.most_favorite_book || '최애 책을 입력해주세요.'
  );
  const [previewImg, setPreviewImg] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();
  const { mutate: mutateToUpdateProfile } = useMutation({
    mutationFn: updateUserProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profiles'] });
      setIsEdit(false);
    }
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreviewImg(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleSave = async () => {
    if (previewImg) {
      const storageImageUrl = await uploadAvatar(
        userProfile?.id || '',
        previewImg
      );
      if (storageImageUrl) {
        setPhotoUrl(storageImageUrl);
      }
    }
    const formData = new FormData();

    formData.append('photo_URL', photoUrl);

    formData.append('id', userProfile?.id || '');
    formData.append('display_name', displayName);
    formData.append('interests', interests);
    formData.append('introduction', introduction);
    formData.append('most_favorite_book', mostFavoriteBook);
    mutateToUpdateProfile(formData);
  };
  return (
    <div className='flex flex-col items-center'>
      {isEdit ? (
        <div className='flex flex-col items-center w-full max-w-md px-4 py-6 bg-white rounded-md shadow-md'>
          <label className='mb-4'>
            {photoUrl && (
              <Image
                src={photoUrl}
                alt='미리보기'
                width={100}
                height={100}
                className='rounded-full'
              />
            )}
            <input type='file' ref={fileInputRef} onChange={handleFileChange} />
          </label>
          <div className='mb-4 w-full'>
            <label className='block mb-2'>닉네임:</label>
            <input
              type='text'
              placeholder='닉네임을 입력해주세요.'
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className='w-full p-2 border rounded-md'
            />
          </div>
          <div className='mb-4 w-full'>
            <label className='block mb-2'>관심분야:</label>
            <input
              type='text'
              placeholder='관심분야를 입력해주세요.'
              value={interests}
              onChange={(e) => setInterests(e.target.value)}
              className='w-full p-2 border rounded-md'
            />
          </div>
          <div className='mb-4 w-full'>
            <label className='block mb-2'>내 소개:</label>
            <textarea
              value={introduction}
              placeholder='간단한 자기소개를 해주세요.'
              onChange={(e) => setIntroduction(e.target.value)}
              className='w-full p-2 border rounded-md'
            />
          </div>
          <div className='mb-4 w-full'>
            <label className='block mb-2'>내 최애 책:</label>
            <input
              type='text'
              placeholder='최애 책을 입력해주세요.'
              value={mostFavoriteBook}
              onChange={(e) => setMostFavoriteBook(e.target.value)}
              className='w-full p-2 border rounded-md'
            />
          </div>
          <div className='flex justify-center w-full'>
            <button className='mr-2 p-2 border rounded-md' onClick={handleSave}>
              저장
            </button>
            <button
              className='p-2 border rounded-md'
              onClick={() => setIsEdit(false)}>
              취소
            </button>
          </div>
        </div>
      ) : (
        <div className='flex flex-col w-full max-w-md px-4 py-6 bg-white rounded-md shadow-md'>
          <Image
            src={photoUrl}
            alt='사진'
            width={100}
            height={100}
            className='rounded-full mb-4'
          />
          <p className='mb-2'>Email: {userProfile?.email}</p>
          <p className='mb-2'>닉네임: {displayName}</p>
          <p className='mb-2'>
            관심 분야: {interests || '관심있는 분야를 입력해주세요.'}
          </p>
          <p className='mb-2'>
            내 소개: {introduction || '간략한 소개를 해주세요.'}
          </p>

          <p className='mb-2'>
            내 최애 책: {mostFavoriteBook || '최애 책을 입력해주세요.'}
          </p>
          <button
            className='w-full border rounded-md'
            onClick={() => setIsEdit(true)}>
            프로필 수정
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileDetail;