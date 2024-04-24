import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import QueryProvider from './provider';
// export const dynamic = 'force-dynamic';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Booktique',
  description: '독서진짜배기들을위한 독서커뮤니티',
  icons: { icon: '/favicon.png' },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1
  } //하지만, 이 방식은 안드로이드 유저나 최신 iOS를 사용하지 않는다면 사용자의 모든 확대를 막아버릴 수 있습니다.
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={` ${inter.className} sm:w-full md:w-[375px]  flex flex-col mx-auto h-screen items-center`}>
        <QueryProvider>
          {/* <Header /> */}
          <main className='w-full flex-1'>{children}</main>
        </QueryProvider>
      </body>
    </html>
  );
}
