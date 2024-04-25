import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import QueryProvider from './provider';
// export const dynamic = 'force-dynamic';

const inter = Inter({ subsets: ['latin'] });

// export const metadata: Metadata = {
//   title: 'Booktique',
//   description: '독서진짜배기들을위한 독서커뮤니티',
//   icons: { icon: '/favicon.png' }
//   // viewport: {
//   //   width: 'device-width',
//   //   initialScale: 1,
//   //   maximumScale: 1,
//   // }, //하지만, 이 방식은 안드로이드 유저나 최신 iOS를 사용하지 않는다면 사용자의 모든 확대를 막아버릴 수 있습니다.
// };
// import type { Metadata, Viewport } from 'next';

const APP_NAME = 'Booktique';
const APP_DEFAULT_TITLE = 'Booktique';
const APP_TITLE_TEMPLATE = '%s - PWA App';
const APP_DESCRIPTION = '독서진짜배기들을위한 독서커뮤니티';

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE
  },
  icons: { icon: '/favicon.png' },
  description: APP_DESCRIPTION,
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: APP_DEFAULT_TITLE
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false
  },
  openGraph: {
    type: 'website',
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE
    },
    description: APP_DESCRIPTION
  },
  twitter: {
    card: 'summary',
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE
    },
    description: APP_DESCRIPTION
  }
};

export const viewport: Viewport = {
  themeColor: '#FFFFFF'
};
export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <head>
        {/* 모바일 테스트 */}
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        {/* 모바일 테스트 */}
      </head>
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
