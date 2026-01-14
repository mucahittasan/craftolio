'use client';

import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { MOTION_CONFIG } from '../config';
import { fadeIn } from '../variants';

interface MotionSectionProps {
  children: React.ReactNode;
  className?: string;
  variants?: Variants;

  amount?: number;

  once?: boolean;

  delay?: number;
  as?: 'section' | 'div' | 'article';
  id?: string;
}

export function MotionSection({
  children,
  className,
  variants = fadeIn,
  amount = MOTION_CONFIG.viewport.amount,
  once = MOTION_CONFIG.viewport.once,
  delay = 0,
  as = 'div',
  id,
}: MotionSectionProps) {
  const Component = motion[as];

  const customVariants: Variants = delay
    ? {
        hidden: variants.hidden,
        visible: {
          ...(variants.visible as object),
          transition: {
            ...((variants.visible as { transition?: object })?.transition ||
              {}),
            delay,
          },
        },
      }
    : variants;

  return (
    <Component
      id={id}
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
