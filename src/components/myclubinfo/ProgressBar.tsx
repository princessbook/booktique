// import { useEffect, useState } from 'react';
// import { getClubActivityProgress, getUserId } from '@/utils/userAPIs/authAPI';
// import { createClient } from '@/utils/supabase/client';
// import { CLUB_ACTIVITIES_TABLE } from '@/common/constants/tableNames';
// const ProgressBar = async ({ clubId }: { clubId: string }) => {
//   const userId = await getUserId();
//   //   const percentage = await getClubActivityProgress(clubId, userId);
//   const supabase = createClient();
//   const { data: activity, error: activityError } = await supabase
//     .from(CLUB_ACTIVITIES_TABLE)
//     .select('progress')
//     .eq('user_id', userId)
//     .eq('club_id', clubId)
//     .order('progress', { ascending: false })
//     .single();
//   if (activityError) {
//     throw activityError;
//   }
//   const percentage = activity?.progress || 0;
//    const { data: activity } = await supabase
//      .from(CLUB_ACTIVITIES_TABLE)
//       .select('progress')
//       .eq('user_id', userId)
//      .eq('club_id', clubId)
//       .single();
//    if (activity) {
//      const percentage = activity;
//       setProgress(percentage);
//     }
//     useEffect(() => {
//       const fetchProgressData = async () => {
//         try {
//           const userId = await getUserId();
//          if (!userId) {
//            console.error('유저아이디 없음.');
//             return;
//        }
//           // 클럽의 책 페이지 가져오기
//            if (clubId) {
//              // 클럽 활동에서 오늘까지 읽은 페이지 수 가져오기
//             const supabase = createClient();
//              const { data: activity } = await supabase
//                .from(CLUB_ACTIVITIES_TABLE)
//                .select('progress')
//                .eq('user_id', userId)
//                .eq('club_id', clubId)
//                .single();
//              if (activity) {
//                const percentage = activity.progress;
//                setProgress(percentage);
//              }
//            }
//          } catch (error) {
//            console.error('Error fetching progress data:', error);
//          }
//        };
//        fetchProgressData();
//      }, [clubId]);

//   return (
//     <div className='w-full'>
//       <p className='flex flex-row font-bold mb-3'>
//         내 독서 진행률{' '}
//         <p className=' text-subblue ml-2'>
//           {percentage !== null ? percentage : 'Loading...'}%
//         </p>
//       </p>
//       <div className='w-full h-3 bg-white rounded-full overflow-hidden'>
//         <div
//           className='h-full bg-subblue rounded-full'
//           style={{
//             width: `${percentage !== null ? percentage : 0}%`
//           }}></div>
//       </div>
//     </div>
//   );
// };

// export default ProgressBar;
