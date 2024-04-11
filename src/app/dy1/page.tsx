// 'use client';
// import React, { useState, useEffect, useRef } from 'react';
// import { createClient } from '@/utils/supabase/client';
// import { getUserId } from '@/utils/userAPIs/authAPI';
// import { Tables } from '@/lib/types/supabase';

// const Timer = ({ clubId }: { clubId: string }) => {
//   const [isActive, setIsActive] = useState(false);
//   const [isPaused, setIsPaused] = useState(false);
//   const intervalRef = useRef<number | NodeJS.Timeout | null>(null); // 이렇게 써야만
//   //   intervalRef.current = setInterval(() => { 여기서 빨간줄이 안뜸
//   const [userId, setUserId] = useState<string | null>(null);
//   const [clubActivity, setClubActivity] = useState<Tables<'club_activities'>>(); // club_activity 정보를 저장할 state
//   const [seconds, setSeconds] = useState<number>(clubActivity?.time || 3600);

//   const supabase = createClient(); // Supabase 클라이언트 인스턴스 생성
//   console.log('clubId', clubId);
//   // Supabase에 남은 시간 저장하는 함수
//   const saveTimeToSupabase = async (timeInSeconds: number) => {
//     try {
//       // Supabase에 남은 시간 업데이트
//       await supabase
//         .from('club_activities')
//         .update({ time: timeInSeconds })
//         .eq('user_id', userId as string) // 사용자 ID에 따라 업데이트
//         .eq('club_id', clubId);

//       console.log('남은 시간이 Supabase에 저장되었습니다.');
//     } catch (error) {
//       console.error(
//         'Supabase에 시간을 저장하는 도중 오류가 발생했습니다:',
//         error
//       );
//     }
//   };

//   const toggleTimer = () => {
//     setIsActive(!isActive);
//     setIsPaused(false);
//   };

//   const resetTimer = async () => {
//     setIsActive(false);
//     setIsPaused(false);
//     setSeconds(3600);

//     await saveTimeToSupabase(3600); // 리셋 버튼눌러도 table에 저장
//   };

//   const formatTime = (timeInSeconds: number) => {
//     const hours = Math.floor(timeInSeconds / 3600);
//     const minutes = Math.floor((timeInSeconds % 3600) / 60);
//     const seconds = timeInSeconds % 60;
//     return `${hours.toString().padStart(2, '0')}:${minutes
//       .toString()
//       .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
//   };
//   useEffect(() => {
//     const fetchUserId = async () => {
//       try {
//         const id = await getUserId();
//         console.log('id', id);
//         setUserId(id);
//       } catch (error) {
//         console.error('사용자 ID를 가져오는 도중 오류가 발생했습니다:', error);
//       }
//     };

//     fetchUserId();
//   }, []); // 컴포넌트가 마운트될 때 한 번만 실행됨
//   useEffect(() => {
//     const fetchClubActivity = async () => {
//       try {
//         // club_activities 테이블에서 clubId와 user_id가 일치하는 데이터 가져오기
//         const { data: test, error } = await supabase
//           .from('club_activities')
//           .select('*')
//           .eq('club_id', clubId)
//           .eq('user_id', userId as string)
//           .single();
//         console.log('test', test);
//         if (error) {
//           throw error;
//         }

//         setClubActivity(test);
//       } catch (error) {
//         console.error(
//           '클럽 활동 데이터를 가져오는 도중 오류가 발생했습니다:',
//           error
//         );
//       }
//     };

//     if (userId && clubId) {
//       fetchClubActivity();
//     }
//   }, [userId, clubId, supabase]);

//   useEffect(() => {
//     if (isActive && !isPaused) {
//       intervalRef.current = setInterval(() => {
//         setSeconds((prevSeconds: number) => {
//           // 남은 시간을 Supabase에 저장
//           saveTimeToSupabase(prevSeconds - 1);
//           return prevSeconds - 1;
//         });
//       }, 1000);
//     } else {
//       if (intervalRef.current !== null) {
//         clearInterval(intervalRef.current);
//       }
//     }
//     return () => {
//       if (intervalRef.current !== null) {
//         clearInterval(intervalRef.current);
//       }
//     };
//   }, [isActive, isPaused]);

//   //클린업 함수
//   useEffect(() => {
//     const cleanup = () => {
//       if (intervalRef.current !== null) {
//         clearInterval(intervalRef.current);
//       }
//     };

//     return cleanup;
//   }, []);
//   //메모리 누수를 방지하고, 컴포넌트의 생명주기에 따라 적절히 interval을 관리할 수 있습니다.
//   ////////////////////////////////////////////////보기////////////////////////////////////////////////////////////////////////
//   useEffect(() => {
//     if (clubActivity && clubActivity.time !== null) {
//       const settingTime = Math.min(clubActivity.time, 3600);
//       setSeconds(settingTime);
//     } else {
//       setSeconds(3600);
//     }
//   }, [clubActivity]);
//   ////////////////////////////////////////////////보기////////////////////////////////////////////////////////////////////////

//   return (
//     <div className='timer-container'>
//       <div className='timer'>
//         <p>{formatTime(seconds)}</p>
//         <button onClick={toggleTimer}>
//           {isActive && !isPaused ? '일시정지' : '시작'}
//         </button>
//         <button onClick={resetTimer}>타이머 리셋</button>
//       </div>
//     </div>
//   );
// };

// export default Timer;
