'use client';
import { MEMBERS_TABLE } from '@/common/constants/tableNames';
import { createClient } from '@/utils/supabase/client';
import React, { useEffect, useState } from 'react';

const ClubMembersCount = ({ clubId }: { clubId: string }) => {
  const [clubMembers, setClubMembers] = useState<number | undefined>(0);

  useEffect(() => {
    const getBookClubMembers = async (clubId: string) => {
      const supabase = createClient();
      const { data: clubMembers, error } = await supabase
        .from(MEMBERS_TABLE)
        .select('*')
        .eq('club_id', clubId);
      return clubMembers?.length;
    };
    getBookClubMembers(clubId).then((res: number | undefined) => {
      setClubMembers(res);
    });
  }, [clubId]);

  return <span>{clubMembers}</span>;
};

export default ClubMembersCount;
