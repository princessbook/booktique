import AllMySentences from '@/components/mypage/sentences/AllMySentences';
import React from 'react';
import { createClient } from '@/utils/supabase/server';
import BackBtn from '../../bookclubs/[id]/BackBtn';
const MySentencesPage = async () => {
  const supabase = createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();
  if (!user) {
    return null;
  }
  return (
    <div>
      <div className='w-full flex-row sticky top-0 left-0 right-0 z-10 flex items-center mb-6 border-b-[1px] border-[#DBE3EB] h-[58px] p-4 bg-white'>
        <BackBtn />
        <p className='items-center flex-grow text-center font-bold text-[17px] mr-4 text-fontTitle'>
          내가 작성한 문장
        </p>
      </div>
      <div className='p-4 mb-[78px] overflow-y-auto'>
        <AllMySentences userId={user.id} />
      </div>
    </div>
  );
};

export default MySentencesPage;
