'use client';
import React, { useEffect, useState } from 'react';
import JoinAndResignBtn from './JoinAndResignBtn';
import { MEMBERS_TABLE } from '@/common/constants/tableNames';
import { createClient } from '@/utils/supabase/client';
import { Tables } from '@/lib/types/supabase';
import Members from './Members';
import JoinPopUp from './joinPopUp';
import { useRouter } from 'next/navigation';

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
        // role이 admin인 유저를 첫 번째로 정렬
        const sortedData = data.sort((a, b) => {
          if (a.role === 'admin') return -1;
          if (b.role === 'admin') return 1;
          return 0;
        });
        setClubMembers(sortedData);
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
        <h2 className='mb-4 font-bold text-[16px] text-[#292929]'>{`참여인원(${
          clubMembers ? clubMembers.length : 0
        }/${bookclub?.max_member_count})`}</h2>
        <div className='grid grid-cols-3 gap-6'>
          {clubMembers &&
            clubMembers.map((member, index) => {
              return (
                <Members
                  height={'118px'}
                  member={member}
                  index={index}
                  key={index}
                />
              );
            })}
        </div>
      </section>
      <div className='flex'>
        {clubMembers && clubMembers!.length === bookclub?.max_member_count
          ? ''
          : ''}
        {clubMembers.length < bookclub?.max_member_count! && (
          <JoinAndResignBtn
            setIsJoinOrResign={setIsJoinOrResign}
            isMember={isMember}
            clubId={id}
          />
        )}
      </div>
    </>
  );
};

export default BookClubDetailCSR;
