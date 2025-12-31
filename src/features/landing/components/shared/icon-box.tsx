import { type LucideIcon } from 'lucide-react';
import { type ColorVariant, getColorClasses } from '../../utils/colors.util';

interface IconBoxProps {
  icon: LucideIcon;
  color: ColorVariant;
  size?: 'sm' | 'md' | 'lg';
}

const SIZE_CLASSES = {
  sm: { box: 'h-8 w-8', icon: 'h-4 w-4' },
  md: { box: 'h-10 w-10', icon: 'h-5 w-5' },
  lg: { box: 'h-12 w-12', icon: 'h-6 w-6' },
};

export function IconBox({ icon: Icon, color, size = 'md' }: IconBoxProps) {
  const colors = getColorClasses(color);
  const sizes = SIZE_CLASSES[size];

  return (
    <div
      className={`flex items-center justify-center rounded-lg ${sizes.box} ${colors.bg}`}
    >
      <Icon className={`${sizes.icon} ${colors.text}`} />
    </div>
  );
}
