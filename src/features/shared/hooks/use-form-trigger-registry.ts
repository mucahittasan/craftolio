'use client';

import { useEffect } from 'react';

type FormTriggerKey =
  | '__profileFormTrigger'
  | '__experienceFormTrigger'
  | '__educationFormTrigger'
  | '__projectFormTrigger';

/**
 * Hook to register form validation trigger globally
 * This allows SavePortfolioButton to trigger validation from any form
 */
export function useFormTriggerRegistry(
  key: FormTriggerKey,
  trigger: () => Promise<boolean>,
) {
  useEffect(() => {
    window[key] = trigger;
    return () => {
      delete window[key];
    };
  }, [key, trigger]);
}
