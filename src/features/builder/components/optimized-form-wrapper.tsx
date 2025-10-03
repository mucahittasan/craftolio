'use client';

import { memo, ReactNode } from 'react';

/**
 * Wrapper component to prevent unnecessary re-renders of forms during navigation
 */
function FormWrapperComponent({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export const OptimizedFormWrapper = memo(FormWrapperComponent);
