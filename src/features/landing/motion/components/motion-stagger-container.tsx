'use client';

import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { MOTION_CONFIG } from '../config';
import {
  staggerContainer,
  staggerContainerFast,
  staggerContainerSlow,
} from '../variants';

type StaggerSpeed = 'fast' | 'normal' | 'slow';

interface MotionStaggerContainerProps {
  children: React.ReactNode;
  className?: string;

  speed?: StaggerSpeed;

  variants?: Variants;

  delay?: number;

  amount?: number;

  once?: boolean;
  as?: keyof typeof motion;
}

const speedVariants: Record<StaggerSpeed, Variants> = {
  fast: staggerContainerFast,
  normal: staggerContainer,
  slow: staggerContainerSlow,
};

export function MotionStaggerContainer({
  children,
  className,
  speed = 'normal',
  variants,
  delay = 0,
  amount = MOTION_CONFIG.viewport.amount,
  once = MOTION_CONFIG.viewport.once,
  as = 'div',
}: MotionStaggerContainerProps) {
  const Component = motion[as] as React.ComponentType<{
    className?: string;
    initial: string;
    whileInView: string;
    viewport: { once: boolean; amount: number };
    variants: Variants;
    children: React.ReactNode;
  }>;

  const baseVariants = variants || speedVariants[speed];

  const customVariants: Variants = delay
    ? {
        hidden: baseVariants.hidden,
        visible: {
          ...(baseVariants.visible as object),
          transition: {
            ...((baseVariants.visible as { transition?: object })?.transition ||
              {}),
            delayChildren: delay,
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
