'use client';

import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { MOTION_CONFIG } from '../config';
import { fadeIn, fadeInUp, fadeInDown } from '../variants';

type Direction = 'none' | 'up' | 'down';

interface MotionFadeInProps {
  children: React.ReactNode;
  className?: string;

  direction?: Direction;

  variants?: Variants;

  delay?: number;

  inView?: boolean;

  amount?: number;

  once?: boolean;
  as?: keyof typeof motion;
}

const directionVariants: Record<Direction, Variants> = {
  none: fadeIn,
  up: fadeInUp,
  down: fadeInDown,
};

export function MotionFadeIn({
  children,
  className,
  direction = 'up',
  variants,
  delay = 0,
  inView = true,
  amount = MOTION_CONFIG.viewport.amount,
  once = MOTION_CONFIG.viewport.once,
  as = 'div',
}: MotionFadeInProps) {
  const Component = motion[as] as React.ComponentType<{
    className?: string;
    initial: string;
    animate?: string;
    whileInView?: string;
    viewport?: { once: boolean; amount: number };
    variants: Variants;
    children: React.ReactNode;
  }>;

  const baseVariants = variants || directionVariants[direction];

  const customVariants: Variants = delay
    ? {
        hidden: baseVariants.hidden,
        visible: {
          ...(baseVariants.visible as object),
          transition: {
            ...((baseVariants.visible as { transition?: object })?.transition ||
              {}),
            delay,
          },
        },
      }
    : baseVariants;

  const animationProps = inView
    ? {
        whileInView: 'visible' as const,
        viewport: { once, amount },
      }
    : {
        animate: 'visible' as const,
      };

  return (
    <Component
      className={className}
      initial="hidden"
      variants={customVariants}
      {...animationProps}
    >
      {children}
    </Component>
  );
}
