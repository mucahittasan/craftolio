'use client';

import { ReactQueryProvider } from '@/features/shared/providers/react-query.provider';
import { ThemeProvider } from '@/features/shared/providers/theme.provider';

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange={false}
    >
      <ReactQueryProvider>{children}</ReactQueryProvider>
    </ThemeProvider>
  );
}
