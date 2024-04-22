import { useEffect } from 'react';
import { RealtimePostgresInsertPayload } from '@supabase/supabase-js';
import { Tables } from '@/lib/types/supabase';

const usePostDataEffect = (
  postData: RealtimePostgresInsertPayload<any> | null,
  userId: string | null,
  clubMembers: Tables<'members'>[],
  supabase: any
) => {
  useEffect(() => {
    if (postData) {
      const writerId = postData.new.user_id;
      const postAlarm = async () => {
        try {
          const { data: user } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', writerId)
            .single();

          if (user) {
            const writerName = user.display_name;

            const newAlarm = {
              created_at: postData.commit_timestamp,
              target_user_id: userId,
              content: `${writerName}님이${postData.new.title}모임을 시작하셨습니다: `,
              post_id: postData.new.id
            };

            // 모든 멤버에게 알림을 보내기
            const memberUserIds = clubMembers.map((member) => member.user_id);
            await supabase
              .from('alarm')
              .insert(newAlarm)
              .in('target_user_id', memberUserIds);

            // console.log('알람 테이블에 추가되었습니다.');

            const { data: alarm } = await supabase
              .from('alarm')
              .select('*')
              .eq('target_user_id', writerId)
              .order('created_at', { ascending: true });
            // console.log('alarm', alarm);

            const isAdmin = clubMembers.some(
              (member) => member.user_id === userId && member.role === 'admin'
            );
            if (isAdmin) {
              // console.log('방장은 알럿을 받지 않습니다.');
              return;
            }
            if (alarm) {
              alert(alarm[alarm.length - 1]?.content);
            }
          }
        } catch (error) {
          console.error('알림을 생성하는 도중 오류가 발생했습니다:', error);
        }
      };
      postAlarm();
    }
  }, [postData, userId, clubMembers, supabase]);
};

export default usePostDataEffect;
