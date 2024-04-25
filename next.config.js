module.exports = {
  reactStrictMode: false,
  images: {
    domains: [
      'nusuohpkttzgjfrjzsop.supabase.co',
      'dvrhyvnpyhxiliofhhqk.supabase.co',
      'image.aladin.co.kr'
    ] // 외부 호스트를 여기에 추가합니다.
  }
};

const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD
} = require('next/constants');

/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true
};

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER || phase === PHASE_PRODUCTION_BUILD) {
    const withPWA = require('@ducanh2912/next-pwa').default({
      dest: 'public'
    });
    return withPWA(nextConfig);
  }
  return nextConfig;
};
