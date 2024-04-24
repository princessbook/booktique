import { useMemo } from 'react';

const useRelativeTime = (isoDateString: string) => {
  //memo의 의존성 배열에 timeOut 넣으면 실시간 갱신도 가능할 듯 함
  return useMemo(() => {
    const eventDate = new Date(isoDateString).getTime();
    const now = new Date().getTime();
    const diffMs = now - eventDate;
    const diffHours = diffMs / (1000 * 60 * 60);

    if (diffHours < 0.5) {
      return '방금';
    } else if (diffHours < 1) {
      return '30분 전';
    } else if (diffHours < 12) {
      return `${Math.floor(diffHours)}시간 전`;
    } else {
      return new Date(eventDate).toISOString().split('T')[0];
    }
  }, []);
};

export default useRelativeTime;
