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
    .eq('post_id', postId);

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
  // insertTotalOfComments(newComment.post_id);
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

//댓글 삭제 함수
export const deletePostComment = async (id: string) => {
  // deleteTotalOfComments(id);
  const supabase = createClient();
  const { data, error } = await supabase
    .from('post_comments')
    .delete()
    .match({ id: id });
  if (error) throw error;
  return data;
};

//댓글 수 관련 로직

const deleteTotalOfComments = async (id: string) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('posts')
    .update({ comments: 2000 })
    .match({ id: id });
  if (error) throw error;
  return data;
};

const insertTotalOfComments = async (id: string) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('posts')
    .update({ comments: 2002 })
    .match({ id: id });
  if (error) throw error;
  return data;
};
