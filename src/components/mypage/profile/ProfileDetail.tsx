'use client';
import React from 'react';
import { useState, useRef } from 'react';
import Image from 'next/image';
import { useMutation } from '@tanstack/react-query';
import { updateUserProfile } from '@/utils/userAPIs/Fns';
import { useQueryClient } from '@tanstack/react-query';
import { uploadAvatar } from '@/utils/userAPIs/storageAPI';
import { useQuery } from '@tanstack/react-query';
import { getUserProfile } from '@/utils/userAPIs/Fns';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const ProfileDetail = ({ userId }: { userId: string | null }) => {
  const router = useRouter();

  const {
    data: profiles,
    isLoading,
    isError
  } = useQuery({
    queryKey: ['profiles'],
    queryFn: getUserProfile
  });

  const userProfile = profiles?.find((profile) => profile.id === userId);
  const [isModified, setIsModified] = useState(false); // 변경 여부를 저장하는 상태
  const [isEdit, setIsEdit] = useState(false);
  const [displayName, setDisplayName] = useState(
    userProfile?.display_name ?? ''
  );
  const [introduction, setIntroduction] = useState(
    userProfile?.introduction ?? ''
  );
  const [photoUrl, setPhotoUrl] = useState<string | null>(
    userProfile?.photo_URL ?? ''
  );
  const [displayNameError, setDisplayNameError] = useState<string | null>(null);
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
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files?.[0];
      setPreviewImg(selectedFile);
      const reader = new FileReader();
      // console.log(reader);
      reader.onloadend = () => {
        setPhotoUrl(reader.result as string);
        setIsModified(true);
      };
      reader.readAsDataURL(selectedFile);
    }
  };
  const handleSave = async () => {
    if (!displayName.trim()) {
      setDisplayNameError('닉네임은 필수입니다.');
      return; // 함수 종료
    }
    // setDisplayNameError(null);
    const formData = new FormData();
    if (previewImg) {
      const storageImageUrl = await uploadAvatar(
        userProfile?.id || '',
        previewImg
      );
      if (storageImageUrl) {
        // console.log('storageUrl', storageImageUrl);
        setPhotoUrl(storageImageUrl);
        formData.append('photo_URL', storageImageUrl);
      }
    } else {
      // 사진 변경이 없을 경우, 기존의 photoUrl을 사용
      formData.append('photo_URL', userProfile?.photo_URL || '');
    }
    formData.append('id', userProfile?.id || '');
    formData.append('display_name', displayName);
    formData.append('introduction', introduction);
    mutateToUpdateProfile(formData);
    setIsModified(false);
    router.push('/mypage');
  };

  return (
    <div className='flex flex-col w-full items-center '>
      <div className='w-full flex flex-row items-center border-b-2 p-3 h-[58px]'>
        <Link href='/mypage' onClick={() => setIsEdit(false)}>
          <svg
            width='22'
            height='22'
            viewBox='0 0 22 22'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M3.4375 4.125L17.875 18.5625'
              stroke='#292929'
              strokeWidth='1.6'
              strokeLinecap='round'
            />
            <path
              d='M17.875 4.125L3.4375 18.5625'
              stroke='#292929'
              strokeWidth='1.6'
              strokeLinecap='round'
            />
          </svg>
        </Link>
        <p className='items-center flex-grow text-center font-bold text-[17px] ml-4 text-fontTitle'>
          프로필 수정
        </p>
        <button
          className={isModified ? 'text-fontMain' : 'text-[#939393]'}
          onClick={handleSave}>
          완료
        </button>
      </div>
      <div className='flex flex-col p-6 items-center w-full mb-[78px] overflow-y-auto'>
        {!isLoading && userProfile ? (
          <>
            <label
              htmlFor='fileInput'
              className='flex flex-col justify-center align-middle w-[72px] h-[72px] max-w-full max-h-auto rounded-full relative'>
              {photoUrl ? (
                <img
                  src={photoUrl}
                  alt='미리보기'
                  width={72}
                  height={72}
                  className='rounded-full w-[72px] h-[72px] cursor-pointer object-cover'
                />
              ) : (
                <Image
                  src='/defaultImage.svg'
                  alt='미리보기'
                  width={72}
                  height={72}
                  className='rounded-full w-[72px] h-[72px] cursor-pointer object-cover'
                />
              )}
              <div className='absolute bottom-0 right-0 ml-1 mt-2 cursor-pointer'>
                <Image
                  src='/camera.svg'
                  alt='Camera Icon'
                  width={25}
                  height={25}
                />
              </div>

              <input
                id='fileInput'
                type='file'
                accept='.jpg, .png, .jpeg'
                ref={fileInputRef}
                onChange={handleFileChange}
                className='hidden '
              />
            </label>

            <div className='w-full relative'>
              <div className='relative flex items-center mt-8'>
                <input
                  type='text'
                  placeholder='닉네임을 입력해주세요.'
                  value={displayName}
                  onChange={(e) => {
                    setDisplayName(e.target.value);
                    setDisplayNameError(null); // 에러 메시지 초기화
                    setIsModified(true);
                  }}
                  className={`w-full p-2 border rounded-lg ${
                    displayNameError ? 'border-primary400' : 'border-grayBg'
                  } bg-grayBg text-fontMain pr-10 text-[14px]`} // pr-10 추가하여 오른쪽 여백을 확보
                  // ref={(input) => {
                  //   if (input && displayNameError) {
                  //     input.focus();
                  //   }
                  // }}
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
              {displayNameError && (
                <p className='text-[#939393] text-[12px] ml-2'>
                  {displayNameError}
                </p>
              )}
            </div>

            <div className='mt-[11px] mb-4 w-full'>
              <textarea
                style={{ height: '240px', width: '100%' }}
                value={introduction}
                placeholder='소개글을 입력해주세요.'
                onChange={(e) => {
                  setIntroduction(e.target.value);
                  setIsModified(true);
                }}
                className='w-full p-2 border rounded-lg bg-grayBg text-[14px] text-fontMain'
              />
            </div>
          </>
        ) : (
          <p>로딩 중...</p>
        )}
      </div>
    </div>
  );
};
export default ProfileDetail;
