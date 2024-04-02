import React from 'react';
import { Tables } from '@/lib/types/supabase';
type Profile = Tables<'profiles'>;
import { useState, useRef } from 'react';
import Image from 'next/image';
import { useMutation } from '@tanstack/react-query';
import { updateUserProfile } from '@/lib/api/Fns';
import { useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { uploadAvatar } from '@/lib/api/storageAPI';
const ProfileDetail: React.FC<{ userProfile?: Profile }> = ({
  userProfile
}) => {
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
    userProfile?.most_favorite_book || '최에 책을 선택해주세요.'
  );
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
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
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleSave = async () => {
    if (selectedFile) {
      const photoUrl = await uploadAvatar(userProfile?.id || '', selectedFile);
      if (photoUrl) {
        setPhotoUrl(photoUrl);
      }
    }
    const formData = new FormData();
    if (selectedFile) {
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
    <div>
      {isEdit ? (
        <div>
          <label>
            Photo URL:
            <input type='file' ref={fileInputRef} onChange={handleFileChange} />
            {photoUrl && (
              <Image
                src={photoUrl}
                alt='미리보기'
                width={96}
                height={96}
                className='rounded-full'
              />
            )}
          </label>
          <label>
            닉네임:
            <input
              type='text'
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
          </label>
          <label>
            관심분야:
            <input
              type='text'
              value={interests}
              onChange={(e) => setInterests(e.target.value)}
            />
          </label>
          <label>
            내 소개:
            <textarea
              value={introduction}
              onChange={(e) => setIntroduction(e.target.value)}
            />
          </label>
          <label>
            내 최애 책:
            <input
              type='text'
              value={mostFavoriteBook}
              onChange={(e) => setMostFavoriteBook(e.target.value)}
            />
          </label>
          <label>
            이메일:
            {userProfile?.email}
          </label>
          <button onClick={handleSave}>Save</button>
        </div>
      ) : (
        <div>
          <Image
            src={photoUrl}
            alt='사진'
            width={96}
            height={96}
            className='rounded-full'
          />
          <p>Display Name: {displayName}</p>
          <p>Interests: {interests}</p>
          <p>Introduction: {introduction}</p>
          <p>Email: {userProfile?.email}</p>
          <button onClick={() => setIsEdit(true)}>Edit</button>
        </div>
      )}
    </div>
  );
};

export default ProfileDetail;
