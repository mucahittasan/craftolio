'use client';

import { MotionDiv } from '@/features/shared/utils/motions/motions.util';

interface MobileBackdropProps {
  isOpen: boolean;
  onClick: () => void;
}

export function MobileBackdrop({ isOpen, onClick }: MobileBackdropProps) {
  if (!isOpen) return null;

  return (
    <MotionDiv
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.4 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-40 bg-black"
      onClick={onClick}
    />
  );
}
