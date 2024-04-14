import { createClient } from '@/utils/supabase/client';

//댓글 로딩 함수
export const fetchPostComments = async ({
  queryKey
}: {
  queryKey: [string, string];
}) => {
  const [, postId] = queryKey;
  const supabase = createClient();
  const { data, error } = await supabase
    .from('post_comments')
    .select('*, profile:profiles (*)')
    .eq('id', postId);

  if (error) throw new Error(error.message);
  return data;
};

// 댓글 추가 함수
type NewComment = {
  content: string;
  post_id: string;
  user_id: string;
};

export const createPostComment = async (newComment: NewComment) => {
  const supabase = createClient();
  const { data, error } = await supabase.from('post_comments').insert([
    {
      content: newComment.content,
      post_id: newComment.post_id,
      user_id: newComment.user_id
    }
  ]);
  if (error) throw error;
  return data;
};
