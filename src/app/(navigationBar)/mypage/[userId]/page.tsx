'use client';
import React from 'react';

import ProfileDetail from '@/components/mypage/profile/ProfileDetail';
import Head from 'next/head';
const ProfilePage = ({
  params: { userId }
}: {
  params: { userId: string | null };
}) => {
  return (
    <>
      <Head>
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no'
        />
      </Head>
      <ProfileDetail userId={userId} />
    </>
  );
};
export default ProfilePage;
