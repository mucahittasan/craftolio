import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/features/shared/styles/globals.css';
import '@/features/shared/styles/nprogress.css';
import { Toaster } from 'sonner';
import { AppProviders } from '@/features/shared/providers';
import { NavigationProgress } from '@/features/shared/components/navigation-progress';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Craftolio - AI-Powered Portfolio Builder',
  description: 'Create your professional portfolio in minutes.',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <AppProviders>
          <NavigationProgress />
          {children}
          <Toaster position="top-center" richColors />
        </AppProviders>
      </body>
    </html>
  );
}
