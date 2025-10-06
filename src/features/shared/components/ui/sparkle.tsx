'use client';
import React from 'react';
import { cn } from '@/lib/utils';

interface SparklesTextProps {
  text: string;
  className?: string;
  sparklesCount?: number;
}

export const SparklesText: React.FC<SparklesTextProps> = ({
  text,
  className,
}) => {
  return (
    <div
      className={cn(
        'relative inline-block text-4xl font-bold sm:text-5xl md:text-6xl',
        className,
      )}
    >
      <span className="relative bg-gradient-to-r from-[#ff4040] via-[#a640ff] to-[#409cff] bg-clip-text text-transparent">
        {text}
      </span>
    </div>
  );
};
