import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import '@/features/shared/styles/globals.css';
import '@/features/shared/styles/nprogress.css';
import { Toaster } from 'sonner';
import { AppProviders } from '@/features/shared/providers';
import { NavigationProgress } from '@/features/shared/components/navigation-progress';
import { Suspense } from 'react';

const inter = Inter({ subsets: ['latin'] });

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://craftolio.vercel.app/';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Craftolio - Build Your Professional Portfolio in Minutes',
    template: '%s | Craftolio',
  },
  description:
    'Create a stunning portfolio website without any coding. Showcase your work, skills, and experience with beautiful, professional templates. Free to use.',
  keywords: [
    'portfolio',
    'portfolio builder',
    'professional portfolio',
    'online resume',
    'cv builder',
    'developer portfolio',
    'designer portfolio',
    'career',
    'job search',
    'personal website',
    'no-code',
  ],
  authors: [{ name: 'Craftolio' }],
  creator: 'Craftolio',
  publisher: 'Craftolio',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Craftolio',
    title: 'Craftolio - Build Your Professional Portfolio in Minutes',
    description:
      'Create a stunning portfolio website without any coding. Showcase your work, skills, and experience with beautiful, professional templates.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Craftolio - Professional Portfolio Builder',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Craftolio - Build Your Professional Portfolio in Minutes',
    description:
      'Create a stunning portfolio website without any coding. Showcase your work, skills, and experience.',
    images: ['/og-image.png'],
    creator: '@craftolio',
  },
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
    apple: '/icon.svg',
  },
  alternates: {
    canonical: siteUrl,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <AppProviders>
          <Suspense fallback={null}>
            <NavigationProgress />
          </Suspense>
          {children}
          <Toaster position="top-center" richColors />
        </AppProviders>
      </body>
    </html>
  );
}
