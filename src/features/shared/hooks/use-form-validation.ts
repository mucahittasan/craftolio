'use client';

import { useEffect } from 'react';

/**
 * Hook to trigger form validation on mount when ?validate=true is in URL
 * Removes the query parameter after triggering validation
 */
export function useFormValidation(trigger: () => Promise<boolean>) {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('validate') === 'true') {
      setTimeout(() => {
        trigger();
      }, 100);

      const newUrl = window.location.pathname;
      window.history.replaceState({}, '', newUrl);
    }
  }, [trigger]);
}
