import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Layout } from '@/components/layout';
import '@/styles/globals.css';
import { Header } from '@/features/landing/components/header';
import { Footer } from '@/features/landing/components/footer';

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
          <Footer />
        </Layout>
      </body>
    </html>
  );
}
