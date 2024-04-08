import PostCard from './PostCard';
import { Tables } from '@/lib/types/supabase';
import { createClient } from '@/utils/supabase/server';
import Image from 'next/image';
import Link from 'next/link';

type Posts = Tables<'posts'>[]; //타입 처리 어카지

const Board = async ({ clubId }: { clubId: string | null }) => {
  const id = clubId || '';
  const supabaseClient = createClient();
  const { data: posts, error } = await supabaseClient
    .from('posts')
    .select('*, profile:profiles (*), clubs (*)')
    .eq('club_id', id);

  console.log(posts);

  if (!posts) return <div>로딩중</div>;

  return (
    <div>
      {posts.map((post) => (
        <Link href={`/myclubinfo/board/${post.id}`}>
          {/* <PostCard
            key={post.id}
            post={post}
            id={id}
            display_name={post.profile?.display_name}
            photo_URL={post.profile?.photo_URL}
          /> */}
          <div key={post.id} className='border'>
            <p>{post.title}</p>
            <p>{post.content}</p>
            <p>{post.profile?.display_name}</p>
            {post.profile?.photo_URL ? (
              <Image
                src={post.profile?.photo_URL}
                alt='유저프로필'
                width={20}
                height={20}
              />
            ) : (
              <></>
            )}
          </div>
        </Link>
      ))}
      <Link href={'/myclubinfo/board/posting'}>글 쓰러가기</Link>
    </div>
  );
};

export default Board;

// { clubId }: { clubId: string | null }

// async function fetchData(id: string) {
//   const supabaseClient = createClient();
//   const query = supabaseClient
//     .from('posts')
//     .select(
//       `
//     id,
//     title,
//     content,
//     profiles: user_id (id, photo_URL, display_name)
//   `
//     )
//     .eq('club_id', id);

//   type PostsWithProfiles = QueryData<typeof query>;

//   const { data, error } = await query;

//   if (error) {
//     console.error(error);
//     return [];
//   }

//   const postsWithProfiles: PostsWithProfiles = data;
//   return postsWithProfiles;
// }
