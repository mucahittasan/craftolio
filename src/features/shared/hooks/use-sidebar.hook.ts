import { useEffect } from 'react';
import { useMediaQuery } from '@/features/shared/hooks/use-media-query.hook';
import { useSidebarStore } from '@/features/shared/store/sidebar.store';

export const SIDEBAR_BREAKPOINT = 870;

export function useSidebar() {
  const {
    isExpanded,
    isMobileOpen,
    isBreakpoint,
    setExpanded,
    setMobileOpen,
    setBreakpoint,
    toggle,
    toggleMobile,
  } = useSidebarStore();

  const isMobile = useMediaQuery(`(max-width: ${SIDEBAR_BREAKPOINT}px)`);

  useEffect(() => {
    setBreakpoint(isMobile);
    if (!isMobile && isMobileOpen) {
      setMobileOpen(false);
    }
  }, [isMobile, isMobileOpen, setBreakpoint, setMobileOpen]);

  const handleToggle = () => {
    if (isBreakpoint) {
      toggleMobile();
    } else {
      toggle();
    }
  };

  return {
    isExpanded,
    isMobileOpen,
    isBreakpoint,
    toggle: handleToggle,
    setExpanded,
    setMobileOpen,
  };
}
