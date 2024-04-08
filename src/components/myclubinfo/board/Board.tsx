import PostCard from './PostCard';
import { Tables } from '@/lib/types/supabase';
import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';

type Posts = Tables<'posts'>[]; //타입 처리 어카지

const Board = async ({ clubId }: { clubId: string | null }) => {
  // const id = '9c9d13c8-6645-4d2a-9ba9-77697af05f96';
  const id = clubId || '';
  const supabaseClient = createClient();
  const { data: posts, error } = await supabaseClient
    .from('posts')
    .select('*, user: user_id (*), club : club_id (*)')
    .eq('club_id', id);

  console.log(posts);

  if (!posts) return <div>로딩중</div>;

  return (
    <div>
      {posts.map((post) => (
        <Link href={`/myclubinfo/board/${post.id}`}>
          <PostCard key={post.id} posts={post} id={id} />
        </Link>
      ))}
      <Link href={'/myclubinfo/board/posting'}>글 쓰러가기</Link>
    </div>
  );
};

export default Board;

// { clubId }: { clubId: string | null }
