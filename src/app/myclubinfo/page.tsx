'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useState } from 'react';
const MyClubInfo = () => {
  const router = useRouter();
  const [clubId, setClubId] = useState<string | null>(null);
  //   useEffect(() => {
  //     // 현재 경로가 "/myclubinfo"일 때 리다이렉트
  //     const { pathname } = window.location;
  //     if (pathname === '/myclubinfo') {
  //       // 여기서 필요한 clubId를 가져와야 할 수도 있습니다.
  //       // 실제로는 이 값을 동적으로 설정해야 할 수도 있습니다.

  //       router.replace(`/myclub/${clubId}/home`);
  //     }
  //   }, []);

  // 나머지 컴포넌트 코드
  // …
};

export default MyClubInfo;
