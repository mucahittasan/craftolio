'use client';

import { useQuery } from '@tanstack/react-query';
import { loadPortfolio } from '@/features/builder/actions/load-portfolio.action';
import { usePortfolioStore } from '@/features/builder/store/portfolio.store';
import { useEffect, useRef } from 'react';

export function usePortfolioData() {
  const hydrateStore = usePortfolioStore((state) => state.hydrateStore);
  const username = usePortfolioStore((state) => state.username);
  const hasHydrated = useRef(false);

  const { data, isLoading, isError, error, isFetching } = useQuery({
    queryKey: ['portfolio'],
    queryFn: async () => {
      const data = await loadPortfolio();
      if (!data) {
        throw new Error('Failed to load portfolio');
      }
      return data;
    },
    enabled: username === null && !hasHydrated.current,
    staleTime: Infinity,
    gcTime: 1000 * 60 * 30,
  });

  useEffect(() => {
    if (data && username === null && !hasHydrated.current) {
      hydrateStore(data);
      hasHydrated.current = true;
    }
  }, [data, hydrateStore, username]);

  const shouldShowLoading =
    username === null && isLoading && !hasHydrated.current;

  return {
    isLoading: shouldShowLoading,
    isError,
    error,
    data,
    isFetching,
  };
}
