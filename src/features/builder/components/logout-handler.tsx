'use client';

import { useEffect } from 'react';
import { usePortfolioStore } from '@/features/builder/store/portfolio.store';

/**
 * This component handles clearing the Zustand store on logout
 */
export function LogoutHandler() {
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'logout-event') {
        // Clear store on logout
        usePortfolioStore.getState().hydrateStore({
          username: null,
          profile: {
            title: '',
            bio: '',
            location: '',
            website: '',
            linkedin: '',
            github: '',
          },
          experiences: [],
          educations: [],
          projects: [],
          skills: [],
        });
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return null;
}
