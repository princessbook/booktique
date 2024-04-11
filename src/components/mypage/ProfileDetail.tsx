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
import { useQuery } from '@tanstack/react-query';
import { getUserProfile } from '@/utils/userAPIs/Fns';
import Link from 'next/link';

const ProfileDetail = ({ userId }: { userId: string | null }) => {
  const {
    data: profiles,
    isLoading,
    isError
  } = useQuery({
    queryKey: ['profiles'],
    queryFn: getUserProfile
  });
  const userProfile = profiles?.find((profile) => profile.id === userId);
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
  const handleEditProfile = () => {
    setDisplayName(userProfile?.display_name ?? '');
    // setInterests(userProfile?.interests ?? '');
    setIntroduction(userProfile?.introduction ?? '');
    // setMostFavoriteBook(userProfile?.most_favorite_book ?? '');
    setPhotoUrl(userProfile?.photo_URL ?? '');
    // setPreviewImg(null);
    setIsEdit(true);
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
    const formData = new FormData();
    if (previewImg) {
      const storageImageUrl = await uploadAvatar(
        userProfile?.id || '',
        previewImg
      );
      if (storageImageUrl) {
        console.log('storageUrl', storageImageUrl);
        setPhotoUrl(storageImageUrl);
        formData.append('photo_URL', storageImageUrl);
      }
    } else {
      // 사진 변경이 없을 경우, 기존의 photoUrl을 사용
      formData.append('photo_URL', userProfile?.photo_URL || '');
    }
    formData.append('id', userProfile?.id || '');
    formData.append('display_name', displayName);
    formData.append('interests', interests);
    formData.append('introduction', introduction);
    formData.append('most_favorite_book', mostFavoriteBook);
    mutateToUpdateProfile(formData);
  };
  return (
    <div className='flex flex-col w-full p-4 items-center '>
      <div className='w-full flex flex-row items-center cursor-pointer'>
        <Link href='/mypage'>
          <svg
            width='23'
            height='24'
            viewBox='0 0 23 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M14.4546 18.9439L7.56158 12.087L14.6059 5.00591'
              stroke='#292929'
              strokeWidth='1.6'
              strokeLinecap='round'
            />
          </svg>
        </Link>
        <p className='flex-grow text-center font-bold'>프로필 수정</p>
      </div>
      {isEdit ? (
        <div className='flex flex-col w-full p-2 items-center mt-12'>
          <label
            htmlFor='fileInput'
            className='mb-4 flex flex-col items-center'>
            {photoUrl && (
              <img
                src={photoUrl}
                alt='미리보기'
                width={96}
                height={96}
                className='rounded-full cursor-pointer'
              />
            )}
            <input
              id='fileInput'
              type='file'
              ref={fileInputRef}
              onChange={handleFileChange}
              className='hidden '
            />
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
          {/* <div className='mb-4 w-full'>
            <label className='block mb-2'>관심분야:</label>
            <input
              type='text'
              placeholder='관심분야를 입력해주세요.'
              value={interests}
              onChange={(e) => setInterests(e.target.value)}
              className='w-full p-2 border rounded-md'
            />
          </div> */}
          <div className='mb-4 w-full'>
            <label className='block mb-2'>내 소개:</label>
            <textarea
              style={{ height: '200px', width: '100%' }}
              value={introduction}
              placeholder='간단한 자기소개를 해주세요.'
              onChange={(e) => setIntroduction(e.target.value)}
              className='w-full p-2 border rounded-md'
            />
          </div>
          {/* <div className='mb-4 w-full'>
            <label className='block mb-2'>내 최애 책:</label>
            <input
              type='text'
              placeholder='최애 책을 입력해주세요.'
              value={mostFavoriteBook}
              onChange={(e) => setMostFavoriteBook(e.target.value)}
              className='w-full p-2 border rounded-md'
            />
          </div> */}
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
        <div className='flex flex-col items-center p-2 mt-12'>
          <div className='flex justify-center align-middle w-20 h-20 max-w-full max-h-auto rounded-full'>
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
                alt='프로필사진 없음'
                width={96}
                height={96}
                className='rounded-full'
              />
            )}
          </div>

          {/* <img
            src={userProfile?.photo_URL ?? '/booktique.png'}
            alt='사진'
            width={100}
            height={100}
            className='rounded-full mb-4'
          /> */}
          {/* <p className='mb-2'>Email: {userProfile?.email}</p> */}
          <div className='ml-4 mt-6'>
            <p className='mb-2 font-bold font-xl'>
              닉네임 : {userProfile?.display_name}
            </p>
            {/* <p className='mb-2'>관심 분야: {userProfile?.interests}</p> */}
            <p className='mb-2 font-bold font-xl'>
              내 소개: {userProfile?.introduction}
            </p>
            {/* <p className='mb-2'>내 최애 책: {userProfile?.most_favorite_book}</p> */}
            <button
              className='w-full text-[#3F3E4E]'
              onClick={handleEditProfile}>
              프로필 수정
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default ProfileDetail;
