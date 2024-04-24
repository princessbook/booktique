import NavigationBar from '@/components/navigationBar/page';

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
      <NavigationBar />
    </>
  );
}
