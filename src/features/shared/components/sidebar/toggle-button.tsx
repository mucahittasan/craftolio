'use client';

import { Button } from '@/features/shared/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MotionDiv } from '@/features/shared/utils/motions/motions.util';

interface ToggleButtonProps {
  isExpanded: boolean;
  onClick: () => void;
}

export function ToggleButton({ isExpanded, onClick }: ToggleButtonProps) {
  return (
    <MotionDiv
      initial={false}
      animate={{ opacity: [0, 1], scale: [0.8, 1] }}
      className="absolute -right-3 top-6 z-[100]"
    >
      <Button
        size="icon"
        variant="outline"
        className={cn(
          'h-6 w-6 rounded-full border border-border/50 bg-background p-0 shadow-md transition-transform duration-200',
          !isExpanded && 'rotate-180',
        )}
        onClick={onClick}
      >
        <ChevronLeft className="h-3.5 w-3.5" />
      </Button>
    </MotionDiv>
  );
}
