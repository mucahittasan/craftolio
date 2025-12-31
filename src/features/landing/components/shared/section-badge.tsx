import { type ColorVariant, getColorClasses } from '../../utils/colors.util';

interface SectionBadgeProps {
  children: React.ReactNode;
  color?: ColorVariant;
}

export function SectionBadge({ children, color = 'violet' }: SectionBadgeProps) {
  const colors = getColorClasses(color);

  return (
    <span
      className={`mb-4 inline-block rounded-full px-4 py-1.5 text-sm font-medium ${colors.badge}`}
    >
      {children}
    </span>
  );
}
