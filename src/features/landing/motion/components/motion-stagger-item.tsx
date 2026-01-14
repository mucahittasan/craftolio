'use client';

import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { staggerItem, staggerItemScale } from '../variants';

type AnimationType = 'default' | 'scale';

interface MotionStaggerItemProps {
  children: React.ReactNode;
  className?: string;

  type?: AnimationType;

  variants?: Variants;
  as?: keyof typeof motion;
}

const typeVariants: Record<AnimationType, Variants> = {
  default: staggerItem,
  scale: staggerItemScale,
};

export function MotionStaggerItem({
  children,
  className,
  type = 'default',
  variants,
  as = 'div',
}: MotionStaggerItemProps) {
  const Component = motion[as] as React.ComponentType<{
    className?: string;
    variants: Variants;
    children: React.ReactNode;
  }>;

  return (
    <Component className={className} variants={variants || typeVariants[type]}>
      {children}
    </Component>
  );
}
