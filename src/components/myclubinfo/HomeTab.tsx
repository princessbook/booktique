import React from 'react';
import ProgressBar from './ProgressBar';
import Members from './Members';
import { useState } from 'react';
import { useEffect } from 'react';
import ClubBook from './ClubBook';
import { Tables } from '@/lib/types/supabase';
import { getBookClubMembers } from '@/utils/userAPIs/authAPI';
type Clubs = Tables<'clubs'>;
const HomeTab = ({ club }: { club: Clubs | null }) => {
  const [showMore, setShowMore] = useState(false);
  const [clubMembers, setClubMembers] = useState<Tables<'members'>[]>([]);
  useEffect(() => {
    const fetchClubMembers = async () => {
      if (club?.id) {
        const clubMem = await getBookClubMembers(club.id);
        setClubMembers(clubMem);
      }
    };
    fetchClubMembers();
  }, [club]);

  return (
    <div>
      <div>
        <div className='bg-[#EEEFF3] m-4 p-5 rounded-xl'>
          <ProgressBar clubId={club?.id} />
        </div>

        <div>
          <p className='px-5 mb-2 font-medium'>전체 독서 진행률</p>
          <div className='flex flex-wrap justify-center gap-2'>
            {clubMembers &&
              clubMembers.map((member, index) => {
                return <Members member={member} key={index} />;
              })}
          </div>
          {!showMore && clubMembers.length > 6 && (
            <button
              onClick={() => setShowMore(true)}
              className='bg-subblue text-white px-4 py-1 rounded-md mt-2'>
              더 보기
            </button>
          )}
        </div>
        <div>
          <ClubBook club={club} />
        </div>
      </div>
    </div>
  );
};

export default HomeTab;
