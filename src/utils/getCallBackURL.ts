export const getCallbackURL = () => {
  let url = '';

  // NEXT_PUBLIC_SITE_URL 환경 변수가 존재하고 유효한 경우
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    url = process.env.NEXT_PUBLIC_SITE_URL;
  }
  // NEXT_PUBLIC_PRODUCTION_URL 환경 변수가 존재하고 유효한 경우
  else if (process.env.NEXT_PUBLIC_PRODUCTION_URL) {
    url = process.env.NEXT_PUBLIC_PRODUCTION_URL;
  }
  // 기본값으로 localhost:3000을 사용
  else {
    url = 'http://localhost:3000/';
  }

  // URL이 'http' 또는 'https'로 시작하는지 확인하고, 아니라면 'https://'를 추가
  url = url.includes('http') ? url : `https://${url}`;

  // URL이 '/'로 끝나는지 확인하고, 아니라면 '/'를 추가
  url = url.charAt(url.length - 1) === '/' ? url : `${url}/`;

  // 최종적으로 리디렉션 URL에 '/auth/callback'을 추가하여 반환
  return `${url}auth/callback`;
};
