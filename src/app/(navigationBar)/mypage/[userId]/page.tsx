'use client';
import React from 'react';

import ProfileDetail from '@/components/mypage/profile/ProfileDetail';
const ProfilePage = ({
  params: { userId }
}: {
  params: { userId: string | null };
}) => {
  return <ProfileDetail userId={userId} />;
};
export default ProfilePage;
