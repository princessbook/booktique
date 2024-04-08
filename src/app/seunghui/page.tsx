import Board from '@/components/myclubinfo/board/Board';
import { Tables } from '@/lib/types/supabase';

type Posts = Tables<'posts'>;

const page = async () => {
  const id = '9c9d13c8-6645-4d2a-9ba9-77697af05f96';
  return (
    <div>
      <Board clubId={id} />
    </div>
  );
};

export default page;
