'use client';
import React, { useEffect, useState } from 'react';
import ClubMemberProfile from './ClubMemberProfile';
import JoinAndResignBtn from './JoinAndResignBtn';
import { MEMBERS_TABLE } from '@/common/constants/tableNames';
import { createClient } from '@/utils/supabase/client';
import { Tables } from '@/lib/types/supabase';

const BookClubDetailCSR = ({
  id,
  isMember
}: {
  id: string;
  isMember: boolean;
}) => {
  const [clubMembers, setClubMembers] = useState<Tables<'members'>[]>();
  const [bookclub, setBookClub] = useState<Tables<'clubs'>>();
  const supabase = createClient();
  const [isJoinOrResign, setIsJoinOrResign] = useState(false);
  useEffect(() => {
    const fetchClubMembers = async () => {
      const { data, error: membersError } = await supabase
        .from(MEMBERS_TABLE)
        .select('*')
        .eq('club_id', id);
      if (data) {
        setClubMembers(data);
      }
    };
    fetchClubMembers();
  }, [id, supabase, isJoinOrResign]);

  useEffect(() => {
    const fetchBookClub = async () => {
      const { data, error } = await supabase
        .from('clubs')
        .select('*')
        .eq('id', id)
        .single();
      if (data) {
        setBookClub(data);
      }
      if (error) {
        throw error;
      }
    };
    fetchBookClub();
  }, [id, supabase, isJoinOrResign]);
  if (!clubMembers || !bookclub) {
    return <div>loading...</div>;
  }
  return (
    <>
      <section className='p-3'>
        <h2 className='mb-4 font-bold'>{`참여인원(${
          clubMembers ? clubMembers.length : 0
        }/${bookclub?.max_member_count})`}</h2>
        <div className='grid grid-cols-4 gap-3'>
          {clubMembers &&
            clubMembers.map((member, index) => {
              return <ClubMemberProfile member={member} key={index} />;
            })}
        </div>
      </section>
      <div className='flex'>
        {clubMembers && clubMembers!.length === bookclub?.max_member_count
          ? '모집인원꽉참'
          : ''}
        <JoinAndResignBtn
          setIsJoinOrResign={setIsJoinOrResign}
          isMember={isMember}
          clubId={id}
        />
      </div>
    </>
  );
};

export default BookClubDetailCSR;
