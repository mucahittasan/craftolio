'use client';

import { Button } from '@/features/shared/components/ui/button';
import { ExternalLink, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface ViewPortfolioButtonProps {
  userName?: string | null;
  userUsername?: string | null;
  userEmail?: string | null;
  enabled?: boolean;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  showIcon?: boolean;
  showLabel?: boolean;
  className?: string;
}

export function ViewPortfolioButton({
  userUsername,
  enabled = true,
  variant = 'default',
  size = 'default',
  showIcon = true,
  showLabel = true,
  className,
}: ViewPortfolioButtonProps) {
  // Use username if available, otherwise fallback to email
  const username = userUsername?.toLowerCase();

  const portfolioUrl = `/portfolio/${username}`;

  if (!enabled || !username) {
    return null;
  }

  return (
    <Button
      asChild
      variant={variant}
      size={showLabel ? size : 'icon'}
      className={cn(
        'group relative overflow-hidden',
        variant === 'default' &&
          'bg-gradient-to-r from-[var(--brand-dark)] to-[var(--brand-accent)] text-white shadow-[#0C7779]/25 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-[#0C7779]/30',
        !showLabel && 'h-10 w-10',
        className,
      )}
    >
      <Link
        href={portfolioUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center"
      >
        {showLabel ? (
          <>
            {showIcon && <Sparkles className="mr-2 h-4 w-4 animate-pulse" />}
            <span className="font-semibold">View Portfolio</span>
            <ExternalLink className="ml-2 h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </>
        ) : (
          <Sparkles className="h-4 w-4 animate-pulse" />
        )}
      </Link>
    </Button>
  );
}
