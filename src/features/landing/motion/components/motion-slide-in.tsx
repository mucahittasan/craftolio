'use client';

import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { MOTION_CONFIG } from '../config';
import { slideInLeft, slideInRight } from '../variants';

type Direction = 'left' | 'right';

interface MotionSlideInProps {
  children: React.ReactNode;
  className?: string;

  direction?: Direction;

  variants?: Variants;

  delay?: number;

  amount?: number;

  once?: boolean;
  as?: keyof typeof motion;
}

const directionVariants: Record<Direction, Variants> = {
  left: slideInLeft,
  right: slideInRight,
};

export function MotionSlideIn({
  children,
  className,
  direction = 'left',
  variants,
  delay = 0,
  amount = MOTION_CONFIG.viewport.amount,
  once = MOTION_CONFIG.viewport.once,
  as = 'div',
}: MotionSlideInProps) {
  const Component = motion[as] as React.ComponentType<{
    className?: string;
    initial: string;
    whileInView: string;
    viewport: { once: boolean; amount: number };
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

  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={customVariants}
    >
      {children}
    </Component>
  );
}
