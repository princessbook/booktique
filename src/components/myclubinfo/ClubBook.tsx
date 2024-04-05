import React from 'react';
import { Tables } from '@/lib/types/supabase';
type Club = Tables<'clubs'>;
import Image from 'next/image';
const ClubBook = ({ club }: { club: Club | null }) => {
  console.log(club);
  return (
    <div>
      ClubBook
      <Image
        src={club?.book_cover || '/booktiquereadblue.png'} // 클럽의 imageURL 필드를 사용
        alt='책 사진' // 이미지의 대체 텍스트
        width={100} // 이미지의 너비
        height={100} // 이미지의 높이
      />
      <p>{club?.book_title}</p>
      <p>{club?.book_author}</p>
      <p>{club?.book_category}</p>
      <p>{club?.book_title}</p>
    </div>
  );
};

export default ClubBook;
