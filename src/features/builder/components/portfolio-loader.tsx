'use client';

import { usePortfolioData } from '@/features/builder/hooks/use-portfolio-data';
import { FormSkeleton } from './form-skeleton';
import { memo } from 'react';

/**
 * This component loads the user's portfolio data using React Query
 * and shows a skeleton while loading.
 * Memoized to prevent unnecessary re-renders during navigation.
 */
function PortfolioLoaderComponent({ children }: { children: React.ReactNode }) {
  const { isLoading } = usePortfolioData();

  if (isLoading) {
    return <FormSkeleton />;
  }

  return <>{children}</>;
}

export const PortfolioLoader = memo(PortfolioLoaderComponent);
