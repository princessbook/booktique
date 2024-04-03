'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import white from '../../../public/booktiquereadwhite.png';
import blue from '../../../public/booktique.png';
import Button from '@/common/Button';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import LoadingOverlay from '../../common/LoadingOverlay';
import MyClubLayout from './layout';

const MyBookClub = () => {
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [clubsData, setClubsData] = useState<any[]>([]);
  const [membersData, setMembersData] = useState<any[]>([]);
  const [profilesData, setProfilesData] = useState<any[]>([]);
  // const [clubActivityData, setClubActivityData] = useState<any[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const supabase = createClient();
        // profiles 테이블 데이터 가져오기
        let profilesTableData = await supabase.from('profiles').select('*');
        const { data: profiles, error: profilesError } = profilesTableData;
        if (profilesError) {
          throw new Error('프로필 데이터를 불러오는 도중 오류가 발생했습니다.');
        }
        const imageUrl = profiles[0]?.photo_URL;
        console.log('imageUrl', imageUrl);
        setImageUrl(imageUrl);
        setProfilesData(profiles);
        console.log(profiles);
        console.log(profilesTableData);

        let clubsTableData = await supabase.from('clubs').select('*');
        const { data: clubs, error: clubsError } = clubsTableData;
        if (clubsError) {
          throw new Error('클럽 데이터를 불러오는 도중 오류가 발생했습니다.');
        }
        setClubsData(clubs);

        // let clubActivitiesData = await supabase
        //   .from('club_activities')
        //   .select('progress');
        // const { data: clubActivities, error: clubActivitiesError } =
        //   clubActivitiesData;
        // if (clubActivitiesError) {
        //   throw new Error('멤버 데이터를 불러오는 도중 오류가 발생했습니다.');
        // }
        // setMembersData(clubActivities);
        // setLoading(false);
        // console.log('clubActivitiesData', clubActivitiesData);

        let membersTableData = await supabase.from('members').select('*');
        const { data: members, error: membersError } = membersTableData;
        if (membersError) {
          throw new Error('멤버 데이터를 불러오는 도중 오류가 발생했습니다.');
        }
        setLoading(false);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : '알 수 없는 오류가 발생했습니다.'
        );
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>에러가 발생했습니다: {error}</div>;
  }

  // 일치하는 데이터가 없을 경우를 확인하는 로직 추가
  const hasMatchedData = membersData.some((member) => {
    const userProfileId = member.user_id;
    const userClubId = member.club_id;
    const hasProfile = profilesData.some(
      (profile) => profile.id === userProfileId
    );
    console.log('hasProfile', hasProfile);
    const hasClub = clubsData.some((club) => club.id === userClubId);
    console.log('hasClub', hasClub);
    return hasProfile && hasClub;
  });
  console.log('hasMatchedData', hasMatchedData);
  return (
    <MyClubLayout>
      <LoadingOverlay show={loading} />{' '}
      <div className={` ${loading ? 'hidden' : 'block'} `}>
        {hasMatchedData ? (
          <div className='bg-subblue h-screen'>
            <label className='flex justify-center'>
              <Image
                src={white}
                width={134}
                height={26}
                alt={'booktique'}
                className='mt-[80px]'
                priority={true}
              />
            </label>
            {imageUrl && (
              <Image
                src={imageUrl}
                width={302}
                height={464}
                alt={'my_club_book'}
                className='mt-[24px] mx-auto mb-[40px] object-cover w-[302px] h-[464px]'
                priority={true}
              />
            )}
            <Button
              onClick={() => {
                router.push('/');
              }}
              small
              text='북클럽 책읽기'
            />
          </div>
        ) : (
          <div className='h-screen'>
            <label className='flex justify-center'>
              <Image
                src={blue}
                width={134}
                height={26}
                alt={'my_club_book'}
                className='mt-[38px]'
                priority={true}
              />
            </label>
            <div className='flex flex-col items-center mt-[26px] mb-[98px]'>
              <div className='w-[216px] mx-auto'>
                <div className='text-center'>
                  <span className='font-wantedSans font-bold text-gray-700 text-[17px] leading-[26px]'>
                    아직 가입한 북클럽이 없어요.
                  </span>
                  <br />
                  <span className='font-wantedSans font-bold text-blue-500 text-[17px] leading-[26px]'>
                    북티크에서 취향에 맞는 책을 같이 읽을 북클럽을 찾아보세요.
                  </span>
                </div>
              </div>
            </div>

            <Button
              onClick={() => {
                router.push('/bookclubs');
              }}
              small
              text='북클럽 찾기'
            />
          </div>
        )}
      </div>
    </MyClubLayout>
  );
};

export default MyBookClub;
