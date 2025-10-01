import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Layout } from '@/src/components/layout';
import { ThemeProvider } from '@/src/providers/theme-provider';
import '@/src/styles/globals.css';

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
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Layout>{children}</Layout>
        </ThemeProvider>
      </body>
    </html>
  );
}
