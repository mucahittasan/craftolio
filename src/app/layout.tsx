import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Layout } from '@/src/components/layout';
import '@/src/styles/globals.css';
import { Header } from '@/src/features/landing/components/header';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'Craftolio - AI-Powered Portfolio Builder',
  description: 'Create your professional portfolio in minutes.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.variable}>
        <Layout>
          <Header />
          {children}
        </Layout>
      </body>
    </html>
  );
}
