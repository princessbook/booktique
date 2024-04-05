import { useEffect, useState } from 'react';
import {
  getUserId,
  getClubActivityProgress,
  getBookPage
} from '@/utils/userAPIs/authAPI';
const ProgressBar = ({ clubId }: { clubId: string | null }) => {
  const [progress, setProgress] = useState<number | null>(null);

  useEffect(() => {
    const fetchProgressData = async () => {
      try {
        const userId = await getUserId();
        if (!userId) {
          console.error('유저아이디 없음.');
          return;
        }
        // 클럽의 책 페이지 가져오기
        if (clubId) {
          const TotalBookPage = await getBookPage(clubId ?? '');
          if (TotalBookPage === null) {
            console.error('전체 페이지 쪽수가 없으면 안될거같긴한데 없음');
            return;
          }
          // 클럽 활동에서 오늘까지 읽은 페이지 수 가져오기
          const activityProgress = await getClubActivityProgress(
            clubId,
            userId
          );
          // 오늘까지 읽은 페이지 수와 전체 책 페이지 수를 기반으로 진행률 계산
          const percentage = ((activityProgress ?? 0) / TotalBookPage) * 100;
          setProgress(percentage);
        }
      } catch (error) {
        console.error('Error fetching progress data:', error);
      }
    };
    fetchProgressData();
  }, [clubId]);

  return (
    <div className='w-full'>
      <p className='flex flex-row font-bold mb-3'>
        내 독서 진행률{' '}
        <p className=' text-subblue ml-2'>
          {progress !== null ? progress.toFixed(2) : 'Loading...'}%
        </p>
      </p>
      <div className='w-full h-3 bg-white rounded-full overflow-hidden'>
        <div
          className='h-full bg-subblue rounded-full'
          style={{
            width: `${progress !== null ? progress : 0}%`
          }}></div>
      </div>
    </div>
  );
};

export default ProgressBar;
