'use client';

import { useNavigationProgress } from '@/features/shared/hooks/use-navigation-progress.hook';
import NProgress from 'nprogress';

NProgress.configure({
  showSpinner: false,
  trickleSpeed: 100,
  minimum: 0.3,
});

export function NavigationProgress() {
  useNavigationProgress();
  return null;
}
