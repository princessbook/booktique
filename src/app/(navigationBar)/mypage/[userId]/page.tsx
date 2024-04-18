'use client';
import React from 'react';
import { Tables } from '@/lib/types/supabase';
type Profile = Tables<'profiles'>;

import ProfileDetail from '@/components/mypage/profile/ProfileDetail';

const ProfilePage = ({
  params: { userId }
}: {
  params: { userId: string | null };
}) => {
  return <ProfileDetail userId={userId} />;
};
export default ProfilePage;
