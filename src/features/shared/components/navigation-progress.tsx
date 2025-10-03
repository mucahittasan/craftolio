'use client';

import NProgress from 'nprogress';
import { useNavigationProgress } from '@/features/shared/hooks';

NProgress.configure({
  showSpinner: false,
  trickleSpeed: 100,
  minimum: 0.3,
});

export function NavigationProgress() {
  useNavigationProgress();
  return null;
}
