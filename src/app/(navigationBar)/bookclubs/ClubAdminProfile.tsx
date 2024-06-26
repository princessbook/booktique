import { createClient } from '@/utils/supabase/client';
import Image from 'next/image';

const ClubAdminProfile = ({ clubs }: { clubs: any }) => {
  const supabase = createClient();
  // const { data: adminMembers, error: membersError } = await supabase
  //   .from('members')
  //   .select('user_id')
  //   .eq('club_id', clubId)
  //   .eq('role', 'admin');

  // if (membersError) {
  //   throw membersError;
  // }

  // if (!adminMembers || adminMembers.length === 0) {
  //   const { data: members } = await supabase
  //     .from('members')
  //     .select('*')
  //     .eq('club_id', clubId);

  //   if (members && members.length > 0) {
  //     await supabase
  //       .from('members')
  //       .update({ role: 'admin' })
  //       .eq('club_id', clubId)
  //       .eq('user_id', members[0].user_id as string);
  //   }

  //   return [];
  // }

  // const adminUserIds = adminMembers.map((row) => row.user_id);

  // const { data: profiles, error: profilesError } = await supabase
  //   .from('profiles')
  //   .select('*')
  //   .in('id', adminUserIds);

  // if (profilesError) {
  //   throw profilesError;
  // }

  if (!clubs[0] || !clubs[0].profiles) {
    return;
  }
  const adminMember = clubs.find((member: any) => member.role === 'admin');
  const adminProfile = adminMember.profiles;
  return (
    <div className='flex text-[#3F3E4E] justify-between items-center mr-2 rounded-full overflow-hidden'>
      <span className='bg-gray-300 w-5 h-5 rounded-full flex items-center justify-center mr-1 overflow-hidden'>
        <Image
          unoptimized={true}
          src={
            adminProfile && adminProfile.photo_URL
              ? (adminProfile.photo_URL as string)
              : '/defaultImage.svg'
          }
          width={20}
          height={20}
          alt='방장프로필'
          className='w-[20px] h-[20px] object-cover'
        />
      </span>
      {adminProfile ? adminProfile.display_name : ''}
    </div>
  );
};

export default ClubAdminProfile;
