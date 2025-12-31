import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SidebarState {
  isExpanded: boolean;
  isMobileOpen: boolean;
  isBreakpoint: boolean;
  setExpanded: (expanded: boolean) => void;
  setMobileOpen: (open: boolean) => void;
  setBreakpoint: (isBreakpoint: boolean) => void;
  toggle: () => void;
  toggleMobile: () => void;
}

export const useSidebarStore = create<SidebarState>()(
  persist(
    (set) => ({
      isExpanded: true,
      isMobileOpen: false,
      isBreakpoint: false,
      setExpanded: (expanded) => set({ isExpanded: expanded }),
      setMobileOpen: (open) => set({ isMobileOpen: open }),
      setBreakpoint: (isBreakpoint) => set({ isBreakpoint }),
      toggle: () => set((state) => ({ isExpanded: !state.isExpanded })),
      toggleMobile: () =>
        set((state) => ({ isMobileOpen: !state.isMobileOpen })),
    }),
    {
      name: 'sidebar-storage',
      version: 2,
      partialize: (state) => ({ isExpanded: state.isExpanded }),
      migrate: (persistedState: unknown, version) => {
        const state = (persistedState as Record<string, unknown>) || {};
        if (version < 2) {
          return {
            isExpanded: (state.isExpanded as boolean) ?? true,
          } as unknown as SidebarState;
        }
        return {
          isExpanded: (state.isExpanded as boolean) ?? true,
        } as unknown as SidebarState;
      },
    },
  ),
);
