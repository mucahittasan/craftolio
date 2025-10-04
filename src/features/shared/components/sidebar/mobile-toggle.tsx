'use client';

import { Button } from '@/features/shared/components/ui/button';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSidebar } from '@/features/shared/hooks/use-sidebar.hook';

export function MobileToggle() {
  const { isMobileOpen, isBreakpoint, toggle } = useSidebar();

  if (!isBreakpoint) return null;

  return (
    <Button
      size="icon"
      variant="outline"
      className={cn(
        'fixed right-4 top-4 z-[60] h-11 w-11 rounded-xl border-2 shadow-lg transition-all duration-300',
        isMobileOpen && 'border-primary bg-primary text-primary-foreground',
      )}
      onClick={toggle}
    >
      {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
    </Button>
  );
}
