'use client';

import { motion } from 'framer-motion';
import { SectionBadge } from './section-badge';
import { type ColorVariant } from '../../utils/colors.util';
import {
  sectionHeader,
  sectionBadge,
  sectionTitle,
  sectionDescription,
} from '../../motion';

interface SectionHeaderProps {
  badge: string;
  badgeColor?: ColorVariant;
  title: string;
  description: string;
}

export function SectionHeader({
  badge,
  badgeColor = 'teal',
  title,
  description,
}: SectionHeaderProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={sectionHeader}
      className="mx-auto mb-16 max-w-2xl text-center"
    >
      <motion.div variants={sectionBadge}>
        <SectionBadge color={badgeColor}>{badge}</SectionBadge>
      </motion.div>
      <motion.h2
        variants={sectionTitle}
        className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl"
      >
        {title}
      </motion.h2>
      <motion.p
        variants={sectionDescription}
        className="mt-4 text-lg text-gray-600 dark:text-gray-400"
      >
        {description}
      </motion.p>
    </motion.div>
  );
}
