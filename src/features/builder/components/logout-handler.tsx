'use client';

import { useEffect } from 'react';
import { usePortfolioStore } from '@/features/builder/store/portfolio.store';

export function LogoutHandler() {
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'logout-event') {
        usePortfolioStore.getState().hydrateStore({
          username: null,
          profile: {
            title: '',
            bio: '',
            location: '',
            website: '',
            linkedin: '',
            github: '',
            email: '',
            phone: '',
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
