const withPWA = require('@ducanh2912/next-pwa').default({
  dest: 'public'
});

module.exports = withPWA({
  reactStrictMode: true,
  images: {
    domains: [
      'nusuohpkttzgjfrjzsop.supabase.co',
      'dvrhyvnpyhxiliofhhqk.supabase.co',
      'image.aladin.co.kr'
    ] // 외부 호스트를 여기에 추가합니다.
  }
});
