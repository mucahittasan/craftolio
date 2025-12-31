import { SectionBadge } from './section-badge';
import { type ColorVariant } from '../../utils/colors.util';

interface SectionHeaderProps {
  badge: string;
  badgeColor?: ColorVariant;
  title: string;
  description: string;
}

export function SectionHeader({
  badge,
  badgeColor = 'violet',
  title,
  description,
}: SectionHeaderProps) {
  return (
    <div className="mx-auto mb-16 max-w-2xl text-center">
      <SectionBadge color={badgeColor}>{badge}</SectionBadge>
      <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
        {title}
      </h2>
      <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
        {description}
      </p>
    </div>
  );
}
