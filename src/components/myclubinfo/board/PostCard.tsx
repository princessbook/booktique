import { Tables } from '@/lib/types/supabase';

type Posts = Tables<'posts'>;

const PostCard = ({ posts, id }: { posts: Posts; id: string }) => {
  return (
    <div className='border'>
      <p>{posts.title}</p>
      <p>{posts.content}</p>
      <p>{posts.created_at}</p>
      <p>{}</p>
    </div>
  );
};

export default PostCard;
