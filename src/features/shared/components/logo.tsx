'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import * as React from 'react';

export type LogoProps = {
  size?: 20 | 24 | 28 | 32 | 40 | 48 | 56;
  withWordmark?: boolean;
  asLink?: boolean;
  className?: string;
  compact?: boolean;
};

export function Logo({
  size = 32,
  withWordmark = true,
  asLink = false,
  className,
  compact = false,
}: LogoProps) {
  const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) =>
    asLink ? (
      <Link
        href="/"
        aria-label="Craftolio Home"
        className={cn('group inline-flex items-center gap-2', className)}
      >
        {children}
      </Link>
    ) : (
      <span className={cn('group inline-flex items-center gap-2', className)}>
        {children}
      </span>
    );

  return (
    <Wrapper>
      <span
        className={cn(
          'relative inline-grid place-items-center rounded-xl p-[1px]',
          '[background:linear-gradient(135deg,hsl(var(--border))_0%,transparent_100%)]',
          'dark:[background:linear-gradient(135deg,rgba(255,255,255,0.18)_0%,transparent_100%)]',
        )}
        style={{ width: size, height: size }}
      >
        <span className="pointer-events-none inline-grid h-full w-full place-items-center rounded-[10px] bg-muted/60">
          <CraftolioGlyph className="h-[70%] w-[70%]" />
        </span>
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              'radial-gradient(120px 40px at 10% -10%, rgba(255,255,255,.25), transparent 60%), radial-gradient(120px 40px at 90% 120%, rgba(255,255,255,.12), transparent 60%)',
          }}
        />
      </span>

      {withWordmark && (
        <span
          className={cn(
            'select-none font-semibold leading-none tracking-tight',
            compact ? 'text-[1.05rem]' : 'text-[1.15rem]',
          )}
        >
          <span className="bg-gradient-to-r from-[var(--brand-dark)] via-[var(--brand-primary)] to-[var(--brand-accent)] bg-clip-text text-2xl text-transparent">
            Craftol
          </span>
          <span className="text-2xl text-foreground">io</span>
        </span>
      )}
    </Wrapper>
  );
}

export function CraftolioGlyph({ className }: { className?: string }) {
  const id = React.useId();
  const gradId = `craftolio-grad-${id}`;
  const glowId = `craftolio-glow-${id}`;

  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('text-foreground', className)}
      role="img"
      aria-label="Craftolio icon"
    >
      <defs>
        <linearGradient
          id={gradId}
          x1="8"
          y1="8"
          x2="56"
          y2="56"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="var(--brand-dark, #005461)" />
          <stop offset="50%" stopColor="var(--brand-primary, #0C7779)" />
          <stop offset="100%" stopColor="var(--brand-accent, #3BC1A8)" />
        </linearGradient>
        <filter id={glowId} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <circle
        cx="32"
        cy="32"
        r="24"
        stroke={`url(#${gradId})`}
        strokeWidth="4"
        opacity="0.9"
      />

      <path
        d="M47 26.5c-2.8-6.2-9-10.5-16.2-10.5C20.8 16 14 22.8 14 31.1S20.8 46.2 30.8 46.2c6.9 0 12.9-4 15.9-9.8"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.85"
        filter={`url(#${glowId})`}
      />

      <path
        d="M46 19c-2.5 0-5 .9-6.9 2.6 1.7 1.9 2.6 4.4 2.6 6.9 2.5 0 5-0.9 6.9-2.6A10 10 0 0 0 46 19z"
        fill={`url(#${gradId})`}
      />
    </svg>
  );
}
