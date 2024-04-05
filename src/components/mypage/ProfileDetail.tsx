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
import { createClient } from '@/utils/supabase/client';
const ProfileDetail = ({
  profiles,
  userId
}: {
  profiles: Profile[];
  userId: string | null;
}) => {
  const userProfile = profiles?.find((profile) => profile.id === userId);
  // console.log('?????', userProfile);
  const [isEdit, setIsEdit] = useState(false);
  const [displayName, setDisplayName] = useState(
    userProfile?.display_name ?? ''
  );
  const [interests, setInterests] = useState(userProfile?.interests ?? '');
  const [introduction, setIntroduction] = useState(
    userProfile?.introduction ?? ''
  );
  const [photoUrl, setPhotoUrl] = useState<string | null>(
    userProfile?.photo_URL ?? ''
  );
  const [mostFavoriteBook, setMostFavoriteBook] = useState(
    userProfile?.most_favorite_book ?? ''
  );
  const [previewImg, setPreviewImg] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();
  const { mutate: mutateToUpdateProfile } = useMutation({
    mutationFn: updateUserProfile,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['profiles'] });
      setIsEdit(false);
    }
  });
  const supabase = createClient();
  const handleSignout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/login';
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files?.[0];
      setPreviewImg(selectedFile);
      const reader = new FileReader();
      console.log(reader);
      reader.onloadend = () => {
        setPhotoUrl(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };
  const handleSave = async () => {
    setPhotoUrl(null);
    if (previewImg) {
      const storageImageUrl = await uploadAvatar(
        userProfile?.id || '',
        previewImg
      );
      if (storageImageUrl) {
        console.log('storageUrl', storageImageUrl);
        setPhotoUrl(storageImageUrl);
        const formData = new FormData();
        formData.append('photo_URL', storageImageUrl);
        formData.append('id', userProfile?.id || '');
        formData.append('display_name', displayName);
        formData.append('interests', interests);
        formData.append('introduction', introduction);
        formData.append('most_favorite_book', mostFavoriteBook);
        mutateToUpdateProfile(formData);
        // console.log(photoUrl);
      }
    }
    // const formData = new FormData();
    // if (photoUrl) {
    //   formData.append('photo_URL', photoUrl);
    // }

    const formData = new FormData();
    if (photoUrl) {
      formData.append('photo_URL', photoUrl);
    }
    formData.append('id', userProfile?.id || '');
    formData.append('display_name', displayName);
    formData.append('interests', interests);
    formData.append('introduction', introduction);
    formData.append('most_favorite_book', mostFavoriteBook);
    mutateToUpdateProfile(formData);
  };
  return (
    <div className='flex flex-col items-center w-full'>
      {isEdit ? (
        <div className='flex flex-col items-center w-full px-4 py-6 bg-white rounded-md shadow-md'>
          <label className='mb-4'>
            {photoUrl && (
              <Image
                src={photoUrl}
                alt='미리보기'
                width={96}
                height={96}
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
        <div className='flex flex-col w-full max-w-md px-3 py-6 bg-white rounded-md shadow-md items-center'>
          {userProfile?.photo_URL ? (
            <img
              src={`${userProfile.photo_URL}?${new Date().getTime()}`}
              alt='미리보기'
              width={96}
              height={96}
              className='rounded-full'
            />
          ) : (
            <img
              src='/booktique.png'
              alt='미리보기'
              width={96}
              height={96}
              className='rounded-full'
            />
          )}
          {/* <img
            src={userProfile?.photo_URL ?? '/booktique.png'}
            alt='사진'
            width={100}
            height={100}
            className='rounded-full mb-4'
          /> */}
          <p className='mb-2'>Email: {userProfile?.email}</p>
          <p className='mb-2'>닉네임: {userProfile?.display_name}</p>
          <p className='mb-2'>관심 분야: {userProfile?.interests}</p>
          <p className='mb-2'>내 소개: {userProfile?.introduction}</p>
          <p className='mb-2'>내 최애 책: {userProfile?.most_favorite_book}</p>
          <button
            className='w-full border rounded-md'
            onClick={() => setIsEdit(true)}>
            프로필 수정
          </button>
          <button className='w-full border rounded-md' onClick={handleSignout}>
            로그아웃
          </button>
        </div>
      )}
    </div>
  );
};
export default ProfileDetail;
