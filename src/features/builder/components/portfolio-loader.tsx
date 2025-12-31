'use client';

import { usePortfolioData } from '@/features/builder/hooks/use-portfolio-data.hook';
import { FormSkeleton } from '@/features/builder/components/form-skeleton';
import { memo } from 'react';

function PortfolioLoaderComponent({ children }: { children: React.ReactNode }) {
  const { isLoading } = usePortfolioData();

  if (isLoading) {
    return <FormSkeleton />;
  }

  return <>{children}</>;
}

export const PortfolioLoader = memo(PortfolioLoaderComponent);
