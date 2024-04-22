// 배포확인 toast스타일 변경해야함
'use client';
import ToastUi from '@/common/ToastUi';
import useRealtimePostgresChanges from '@/hooks/useRealtimePostgresChanges';
import { Tables } from '@/lib/types/supabase';
import { createClient } from '@/utils/supabase/client';
import { getUserId } from '@/utils/userAPIs/authAPI';
import React, { useEffect, useState } from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  // 대연 추가
  const supabase = createClient();
  const [userClubs, setUserClubs] = useState<string[]>([]);
  //   console.log('userClubs', userClubs);
  const [userId, setUserId] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [alarm, setAlarm] = useState<
    {
      content: string | null;
      created_at: string;
      id: string;
      isRead: boolean | null;
      post_id: string | null;
      target_user_id: string | null;
    }[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchUserId = await getUserId();
        setUserId(fetchUserId as string);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [userId]);

  useEffect(() => {
    const fetchData = async () => {
      if (!userId) return; // userId가 null인 경우에는 실행하지 않음
      const { data: members, error } = await supabase
        .from('members')
        .select('club_id')
        .eq('user_id', userId as string);
      //   console.log('members', members);
      if (error) {
        // 오류 처리
        console.error(
          '멤버 정보를 가져오는 중 오류가 발생했습니다:',
          error.message
        );
      } else {
        // 사용자가 가입한 클럽 id만 배열로
        const clubIds = members.map((membership) => membership.club_id);
        setUserClubs(clubIds);
        // 사용자가 가입한 클럽 정보 배열
        const { data: userClubs, error: clubError } = await supabase
          .from('clubs')
          .select('*')
          .in('id', clubIds);
        // console.log('clubIds', clubIds);
        if (clubError) {
          console.error(
            '클럽 정보를 가져오는 중 오류가 발생했습니다:',
            clubError.message
          );
        } else {
          //   console.log('사용자가 가입한 클럽:', userClubs);
        }
      }
    };
    fetchData();
  }, [supabase, userId]);
  const toastStyle = {
    width: '343px',
    height: '50px',
    top: '48px', // 헤더 48이라 임시로 해놓음
    left: '50%', // 화면 중앙
    transform: 'translateX(-50%)',
    fontSize: '8px'
  };
  useRealtimePostgresChanges(
    'post',
    userClubs.length > 0 ? `club_id=in.(${userClubs})` : '', // userId가 null인 경우를 처리
    (payload) => {
      if (payload) {
        // console.log('payload11111111111', payload);
        setTimeout(async () => {
          if (!userId) return; // userId가 null인 경우에는 실행하지 않음
          const { data: alarm } = await supabase
            .from('alarm')
            .select('*')
            // .eq('target_user_id', userId)
            .order('created_at', { ascending: true });
          //   console.log('alarm', alarm);
          if (alarm) {
            setAlarm(alarm); // alarm 상태 업데이트
            setShowToast(true);
            // alert(alarm[alarm.length - 1]?.content);
          }
        }, 3000); //  1초에서 3초로 바꾸고 테스트 지연걸기  지연을 걸지 않았을 때 alarm테이블을 제대로 받아오지 못했음
      }
    }
  );

  return (
    <div>
      {children}
      {showToast && (
        <ToastUi
          message={`${alarm[alarm.length - 1]?.content}`}
          onClose={() => setShowToast(false)}
          isSuccess={false}
          style={toastStyle}
          duration={10000}
        />
      )}
    </div>
  );
};

export default Layout;
