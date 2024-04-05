import { MEMBERS_TABLE } from '@/common/constants/tableNames';
import { createClient } from '@/utils/supabase/server';

const ClubMembersCount = async ({ clubId }: { clubId: string }) => {
  //얘를 use client 없앤 다음에 useEffect 없애고//
  const supabase = createClient();
  const { data: clubMembers, error } = await supabase
    .from(MEMBERS_TABLE)
    .select('*')
    .eq('club_id', clubId);
  if (error) {
    throw new Error('멤버 정보를 가져오는 도중 오류가 발생했습니다.');
  }
  return <span>{clubMembers.length}</span>;
};

export default ClubMembersCount;
