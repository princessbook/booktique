// 잠깐 가져다 버렸습니다

import { Tables } from '@/lib/types/supabase';
import Image from 'next/image';

type Posts = Tables<'posts'>;
type Profile = Tables<'profiles'>;

type ExtendedPost = Tables<'posts'>;
const PostCard = ({
  post,
  id,
  display_name,
  photo_URL
}: {
  post: ExtendedPost;
  id: string;
  display_name: string | null | undefined;
  photo_URL: string | null | undefined;
}) => {
  if (!post && !display_name && photo_URL) return <>로딩중</>;

  return (
    <div className='border'>
      <p>{post.title}</p>
      <p>{post.content}</p>
      <p>{post.created_at}</p>
      <p>{display_name}</p>
      {/* <Image src={`${photo_URL}`} alt='유저 프로필' /> */}
    </div>
  );
};

export default PostCard;
