'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import ClubSelector from './ClubSelector';
import useMyClubInfo from '@/hooks/info/useMyClubInfo';
import Animation from '@/components/common/LoadingAnimation';
type Props = {
  children: React.ReactNode;
  params: {
    clubId: string;
    postId: string;
  };
};

const Layout = ({ children, params }: Props) => {
  const pathname = usePathname();
  const isSelected = (path: string) => pathname.includes(path);
  const { clubs, isLoading } = useMyClubInfo();
  if (isLoading) {
    return (
      <div className='h-screen flex justify-center items-center align-middle '>
        <div className='w-[250px]'>
          <Animation />
        </div>
      </div>
    );
  }
  return (
    <div>
      <div className='sticky top-0 left-0 right-0 z-10 bg-white flex flex-col justify-between'>
        {/* 북클럽 셀렉트 박스 */}
        <div className='relative inline-block'>
          <ClubSelector clubs={clubs} currentClubId={params.clubId} />
        </div>
        <div className='flex flex-row justify-between w-full font-bold'>
          <Link
            href={`/my-clubs/${params.clubId}/info`}
            className={`flex flex-1 px-2 py-2 focus:outline-none justify-center ${
              isSelected('info')
                ? 'border-b-2 border-[#3A3B42] text-[#3A3B42]'
                : 'border-b-2 border-[#DBE3EB] text-[#3A3B42] opacity-50 font-medium'
            }`}>
            <span>정보</span>
          </Link>

          <Link
            href={`/my-clubs/${params.clubId}/sentences`}
            className={`flex flex-1 px-2 py-2 focus:outline-none justify-center ${
              isSelected('sentences')
                ? 'border-b-2 border-[#3A3B42] text-[#3A3B42]'
                : 'border-b-2 border-[#DBE3EB] text-[#3A3B42] opacity-50 font-medium'
            }`}>
            <span>문장 저장소</span>
          </Link>

          <Link
            href={`/my-clubs/${params.clubId}/quizzes`}
            className={`flex flex-1 px-2 py-2 focus:outline-none justify-center ${
              isSelected('quizzes')
                ? 'border-b-2 border-[#3A3B42] text-[#3A3B42]'
                : 'border-b-2 border-[#DBE3EB] text-[#3A3B42] opacity-50 font-medium'
            }`}>
            <span>퀴즈</span>
          </Link>

          <Link
            href={`/my-clubs/${params.clubId}/posts`}
            className={`flex flex-1 px-2 py-2 focus:outline-none justify-center ${
              isSelected('posts')
                ? 'border-b-2 border-[#3A3B42] text-[#3A3B42]'
                : 'border-b-2 border-[#DBE3EB] text-[#3A3B42] opacity-50 font-medium'
            }`}>
            <span>자유 게시판</span>
          </Link>
        </div>
      </div>
      <div>
        {/* 탭 컨텐츠 */}
        {children}
      </div>
    </div>
  );
};

export default Layout;
