import React, { Suspense } from 'react';
import ReadBookLayout from '../readbook/layout';
import Image from 'next/image';
import readbook_noclub from '../../../../public/readbook_noclub.png';
import blue from '../../../../public/booktiquereadblue.png';
import { createClient } from '@/utils/supabase/server';
import ClubList from './ClubList';
import { redirect } from 'next/navigation';
// import { revalidatePath } from 'next/cache';
// import { Database } from '@/lib/types/supabase';

const ReadBookPage = async () => {
  // revalidatePath('/', 'layout');
  const supabase = createClient();

  const {
    data: { user }
  } = await supabase.auth.getUser();
  if (!user?.id) {
    redirect('/login');
  }
  // promise로 가져오기: 166.931ms
  // promise로 가져오기: 168.49ms
  // promise로 가져오기: 191.214ms
  // promise로 가져오기: 197.752ms
  // promise로 가져오기: 143.268ms
  // 평균 173.531
  // const { data: memberData, error: memberError } = await supabase
  //   .from('members')
  //   .select('club_id')
  //   .eq('user_id', user?.id as string);

  // if (memberError) {
  //   throw new Error(
  //     '해당 회원이 등록된 클럽정보를 가져오는 도중 오류가 발생했습니다.'
  //   );
  // }

  // const clubDataPromises = memberData.map(async (member) => {
  //   const clubId = member.club_id;
  //   const { data: clubData, error: clubError } = await supabase
  //     .from('clubs')
  //     .select('*')
  //     .eq('id', clubId)
  //     .single();
  //   if (clubError) {
  //     throw new Error('클럽 정보를 가져오는 도중 오류가 발생했습니다.');
  //   }
  //   return clubData;
  // });

  // const allClubData = await Promise.all(clubDataPromises);

  // join으로 가져오기: 53.627ms
  // join으로 가져오기: 96.903ms
  // join으로 가져오기: 56.521ms
  // join으로 가져오기: 74.183ms
  // join으로 가져오기: 75.683ms
  // 평균 71.3834ms
  const { data: members, error: memberError } = await supabase
    .from('members')
    .select('club_id, club:clubs(*),club_activities(*)')
    .eq('user_id', user?.id as string);
  // console.log('members', members);
  const { data: members1, error: memberErro1 } = await supabase
    .from('members')
    .select('club_id, club:clubs(*),club_activities(*)')
    .eq('user_id', user?.id as string);
  // members데이터값은 {club_id:'',club:{id:"",name:"",archive:"", ----max_member_count:""}} 이런식으로
  // const allClubData: Database['public']['Tables']['clubs']['Row'][] = members1
  //   ?.map((member) => member.club)
  //   ?.filter(Boolean) as Database['public']['Tables']['clubs']['Row'][];

  if (!members) {
    return null;
  }
  return (
    <ReadBookLayout>
      <Suspense fallback={<></>}>
        {members
          ?.map((club) => club?.club?.archive)
          .filter((item) => item === false).length > 0 ? (
          <>
            <div></div>
            <Image
              src={blue}
              width={134}
              height={26}
              alt={'booktique'}
              className='pt-[38px] mx-auto mb-[24px]'
              priority={true}
            />
            <ClubList user_id={user?.id as string} allClubData={members} />
          </>
        ) : (
          /* 가입한 북클럽이 없습니다. 북클럽에 가입해서 책 읽어보세요 */
          <div className='flex flex-col'>
            <div></div>
            <Image
              src={blue}
              width={134}
              height={26}
              alt={'booktique'}
              className='pt-[38px] mx-auto'
              priority={true}
            />
            <div className='flex flex-row'>
              <div className='bg-[#DBE3EB] mb-[40px] w-[302px] h-[464px] rounded-[20px]  mx-auto mt-[24px]'>
                <div className='flex mt-[134px] mb-[24px] w-[196px] h-[48px] text-center font-medium text-[14px] leading-[20px] text-[#3F3E4E] mx-auto justify-center items-center'>
                  가입한 북클럽이 없습니다.
                  <br /> 북클럽을 찾고 함께 책 읽어보세요.
                </div>
                <Image
                  src={readbook_noclub}
                  width={138}
                  height={124}
                  alt={'noclub'}
                  priority={true}
                  className=' w-[138px] h-[124px] mx-auto'
                />
              </div>
            </div>

            <button className='bg-[#DBE3EB] w-[302px] h-[56px] rounded-full text-white mx-auto'>
              북클럽 책읽기
            </button>
          </div>
        )}
      </Suspense>
    </ReadBookLayout>
  );
};

export default ReadBookPage;
