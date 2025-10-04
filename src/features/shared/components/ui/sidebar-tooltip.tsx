'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface SidebarTooltipProps {
  children: React.ReactNode;
  content: string;
  show?: boolean;
  position?: 'right' | 'left';
  className?: string;
}

export function SidebarTooltip({
  children,
  content,
  show = true,
  position = 'right',
  className,
}: SidebarTooltipProps) {
  return (
    <div className="group relative">
      {children}
      {show && (
        <div
          className={cn(
            'pointer-events-none absolute top-1/2 z-50 -translate-y-1/2 whitespace-nowrap rounded-lg bg-popover px-3 py-2 text-sm font-medium text-popover-foreground shadow-lg ring-1 ring-border/50 backdrop-blur-sm',
            'scale-95 opacity-0 transition-all duration-200 ease-out',
            'group-hover:scale-100 group-hover:opacity-100',
            position === 'right' ? 'left-full ml-3' : 'right-full mr-3',
            className,
          )}
        >
          {content}
          {/* Arrow */}
          <div
            className={cn(
              'absolute top-1/2 h-2 w-2 -translate-y-1/2 rotate-45 bg-popover ring-1 ring-border/50',
              position === 'right' ? '-left-1' : '-right-1',
            )}
          />
        </div>
      )}
    </div>
  );
}
