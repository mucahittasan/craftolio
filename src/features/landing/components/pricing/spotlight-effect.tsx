'use client';

import React from 'react';
import { MotionDiv } from '@/features/shared/utils/motions/motions.util';

interface SpotlightEffectProps {
  mousePosition: { x: number; y: number };
  isDark?: boolean;
}

export const SpotlightEffect: React.FC<SpotlightEffectProps> = ({
  mousePosition,
  isDark = false,
}) => {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render until mounted to prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  const getBackgroundStyle = () => {
    const color = isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.08)';
    const x = mousePosition.x;
    const y = mousePosition.y;

    return `radial-gradient(400px circle at ${x}px ${y}px, ${color}, transparent 40%)`;
  };

  return (
    <MotionDiv
      className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      style={{
        background: getBackgroundStyle(),
      }}
      aria-hidden="true"
    />
  );
};
