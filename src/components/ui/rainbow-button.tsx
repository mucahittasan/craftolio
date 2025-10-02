'use client';
import { cn } from '@/lib/utils'; // Projemizdeki doğru yol '@/lib/utils'
import React from 'react';

type RainbowButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
};

const colors = {
  color1: '#ff4040', // hsl(0, 100%, 63%)
  color2: '#a640ff', // hsl(270, 100%, 63%)
  color3: '#409cff', // hsl(210, 100%, 63%)
  color4: '#40e9ff', // hsl(195, 100%, 63%)
  color5: '#8cff40', // hsl(90, 100%, 63%)
};
const colorGradient = `linear-gradient(90deg,${colors.color1},${colors.color5},${colors.color3},${colors.color4},${colors.color2})`;

export const RainbowButton = React.forwardRef<
  HTMLButtonElement,
  RainbowButtonProps
>(({ children, className, ...props }, ref) => {
  return (
    <button
      ref={ref}
      style={
        {
          '--gradient': colorGradient,
        } as React.CSSProperties
      }
      className={cn(
        'animate-rainbow group relative inline-flex h-11 cursor-pointer items-center justify-center rounded-xl border-0 bg-[length:200%] px-8 py-2 font-medium text-white transition-colors [background-clip:padding-box,border-box,border-box] [background-origin:border-box] [border:calc(0.08*1rem)_solid_transparent] focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50',
        'before:animate-rainbow before:absolute before:bottom-[-20%] before:left-1/2 before:z-0 before:h-1/5 before:w-3/5 before:-translate-x-1/2 before:bg-[var(--gradient)] before:[filter:blur(calc(0.8*1rem))]',
        'bg-[linear-gradient(#121213,#121213),linear-gradient(#121213_50%,rgba(18,18,19,0.6)_80%,rgba(18,18,19,0)),var(--gradient)]',
        'dark:bg-[linear-gradient(#fff,#fff),linear-gradient(#fff_50%,rgba(255,255,255,0.6)_80%,rgba(0,0,0,0)),var(--gradient)]',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
});

RainbowButton.displayName = 'RainbowButton';
