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
import closeInput from '../../public/closeInput.svg';

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
  const displayNameInputRef = useRef<HTMLInputElement>(null);
  const [displayName, setDisplayName] = useState(
    userProfile?.display_name ?? ''
  );
  const [introduction, setIntroduction] = useState(
    userProfile?.introduction ?? ''
  );
  const [photoUrl, setPhotoUrl] = useState<string | null>(
    userProfile?.photo_URL ?? ''
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
    setIntroduction(userProfile?.introduction ?? '');
    setPhotoUrl(userProfile?.photo_URL ?? '');
    setPreviewImg(null);
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
    // formData.append('interests', interests);
    formData.append('introduction', introduction);
    // formData.append('most_favorite_book', mostFavoriteBook);
    mutateToUpdateProfile(formData);
  };
  return (
    <div className='flex flex-col w-full items-center '>
      <div className='w-full flex flex-row items-center border-b-2 p-3 h-[58px]'>
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
        <p className='items-center flex-grow text-center font-bold text-[17px] mr-4'>
          프로필 수정
        </p>
      </div>
      <div className='flex flex-col p-6 items-center w-full'>
        {isEdit ? (
          <>
            <label
              htmlFor='fileInput'
              className='mb-4 flex flex-col justify-center align-middle w-[72px] h-[72px] max-w-full max-h-auto rounded-full'>
              {photoUrl ? (
                <img
                  src={photoUrl}
                  alt='미리보기'
                  width={72}
                  height={72}
                  className='rounded-full w-[72px] h-[72px] cursor-pointer object-cover'
                />
              ) : (
                <img
                  src='/booktique.png'
                  alt='미리보기'
                  width={72}
                  height={72}
                  className='rounded-full w-[72px] h-[72px] cursor-pointer object-cover'
                />
              )}
              <svg
                width='30'
                height='30'
                viewBox='0 0 30 30'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'>
                <circle
                  cx='15'
                  cy='15'
                  r='13.5'
                  fill='#8A9DB3'
                  stroke='white'
                />
                <path
                  d='M22.06 10.92H19.16L18.83 9.14C18.71 8.49 18.01 8 17.26 8H13.15C12.4 8 11.7 8.49 11.58 9.14L11.25 10.92H8.36C7.61 10.92 7 11.53 7 12.28V20.67C7 21.42 7.61 22.03 8.36 22.03H22.07C22.82 22.03 23.43 21.42 23.43 20.67V12.28C23.43 11.53 22.82 10.92 22.07 10.92H22.06Z'
                  stroke='white'
                  strokeMiterlimit='10'
                />
                <path
                  d='M15.21 19.8898C17.1099 19.8898 18.65 18.3496 18.65 16.4498C18.65 14.5499 17.1099 13.0098 15.21 13.0098C13.3102 13.0098 11.77 14.5499 11.77 16.4498C11.77 18.3496 13.3102 19.8898 15.21 19.8898Z'
                  stroke='white'
                  strokeMiterlimit='10'
                />
                <path
                  d='M20.2002 13.3008H21.3602'
                  stroke='white'
                  strokeMiterlimit='10'
                  strokeLinecap='round'
                />
              </svg>

              <input
                id='fileInput'
                type='file'
                ref={fileInputRef}
                onChange={handleFileChange}
                className='hidden '
              />
            </label>

            <div className='mb-4 w-full relative'>
              <label className='block mb-2 mr-4 font-bold'>닉네임</label>
              <div className='relative flex items-center'>
                <input
                  type='text'
                  placeholder='닉네임을 입력해주세요.'
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className='w-full p-2 border rounded-lg bg-grayBg text-[#3F3E4E] text-opacity-60 pr-10' // pr-10 추가하여 오른쪽 여백을 확보
                />
                {displayName && (
                  <Image
                    className='absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer' // right-2 추가하여 오른쪽 여백을 조정하고, top 값을 조정하여 높이 중앙에 위치
                    onClick={() => setDisplayName('')} // 이미지 클릭 시 displayName 초기화
                    src='/closeInput.svg'
                    width={20}
                    height={20}
                    alt='closeInput'
                  />
                )}
              </div>
            </div>

            <div className='mb-4 w-full'>
              <label className='block mb-2 mr-4 font-bold'>내 소개</label>
              <textarea
                style={{ height: '200px', width: '100%' }}
                value={introduction}
                placeholder='간단한 자기소개를 해주세요.'
                onChange={(e) => setIntroduction(e.target.value)}
                className='w-full p-2 border rounded-lg bg-grayBg text-opacity-60'
              />
            </div>

            <div className='flex justify-center w-full'>
              <button
                className='mr-2 p-2 border rounded-md'
                onClick={handleSave}>
                저장
              </button>
              <button
                className='p-2 border rounded-md'
                onClick={() => setIsEdit(false)}>
                취소
              </button>
            </div>
          </>
        ) : (
          <div className='flex flex-col items-center w-full'>
            <div className='flex justify-center align-middle w-20 h-20 max-w-full max-h-auto rounded-full'>
              {userProfile?.photo_URL ? (
                <img
                  src={`${userProfile.photo_URL}?${new Date().getTime()}`}
                  alt='미리보기'
                  width={96}
                  height={96}
                  className='rounded-full object-cover'
                />
              ) : (
                <img
                  src='/booktique.png'
                  alt='프로필사진 없음'
                  width={96}
                  height={96}
                  className='rounded-full object-cover'
                />
              )}
            </div>

            {/* <p className='mb-2'>Email: {userProfile?.email}</p> */}

            <div className='p-4 mb-4 w-full mt-6'>
              <div className='flex flex-row p-1'>
                <label className='block mr-4 font-bold'>닉네임</label>
                <p className='ml-auto'>수정</p>
              </div>
              <div className='w-full p-2 border rounded-lg bg-grayBg text-opacity-60 pr-10'>
                {userProfile?.display_name}
              </div>
            </div>

            <div className='p-4 mb-4 w-full'>
              <div className='flex flex-row p-1'>
                <label className='block mr-4 font-bold'>내 소개</label>
                <p className='ml-auto'>수정</p>
              </div>
              <div
                className='w-full p-2 border rounded-lg bg-grayBg text-opacity-60 pr-10'
                style={{ height: '200px', width: '100%' }}>
                {userProfile?.introduction}
              </div>
            </div>

            <div className='mt-12 w-full'>
              <button
                className=' text-white bg-primary400 rounded-lg py-2 w-full'
                onClick={handleEditProfile}>
                프로필 수정
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default ProfileDetail;
