'use client';
import React, { useState, useEffect } from 'react';
import { useRef } from 'react';
import { createClient } from '@/utils/supabase/client';

const AvatarPage = () => {
  const [photoUrl, setPhotoUrl] = useState('');
  const imgRef = useRef<HTMLInputElement>(null);
  const saveImgFile = async () => {
    const file = imgRef.current?.files?.[0];
    if (!file) {
      console.error('No file selected.');
      return;
    }
    try {
      const supabase = createClient();
      // Storage에 이미지 업로드
      const { data, error } = await supabase.storage
        .from('profileAvatars')
        .upload(`userAvatar_${new Date().getTime()}`, file);

      if (error) {
        console.error('Error uploading avatar:', error.message);
        return;
      }

      if (data) {
        console.log('Avatar uploaded successfully:', data);

        // Storage에 업로드된 이미지 URL 가져오기
        const { path } = data;

        // Profiles 테이블에서 사용자 프로필 업데이트
        const {
          data: { user }
        } = await supabase.auth.getUser();
        if (user) {
          const { data: profiles, error: profileError } = await supabase
            .from('profiles')
            .update({ photo_URL: path })
            .eq('id', user.id)
            .single();

          if (profileError) {
            console.error('Error updating profile:', profileError.message);
            return;
          }

          if (profiles && profiles.photo_URL) {
            // profileData에 photoUrl이 있는지 확인
            console.log('Profile updated successfully:', profiles);
            setPhotoUrl(profiles.photo_URL); // 업데이트된 이미지 URL로 상태 업데이트
          }
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      avatarPage
      {photoUrl ? (
        <img src={photoUrl} alt='Uploaded Avatar' />
      ) : (
        <img src='/booktique.png' alt='df' />
      )}
      <form>
        <input
          type='file'
          accept='image/png , image/jpeg, image/jpg'
          name='images'
          onChange={saveImgFile}
          ref={imgRef}
        />
        <button type='button' onClick={saveImgFile}>
          등록하기
        </button>
      </form>
    </div>
  );
};

export default AvatarPage;
