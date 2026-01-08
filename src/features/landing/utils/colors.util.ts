export type ColorVariant = 'teal' | 'violet' | 'blue' | 'emerald' | 'amber';

interface ColorClasses {
  bg: string;
  text: string;
  badge: string;
  border: string;
}

const COLOR_MAP: Record<ColorVariant, ColorClasses> = {
  teal: {
    bg: 'bg-[#3BC1A8]/20 dark:bg-[#0C7779]/30',
    text: 'text-[#005461] dark:text-[#3BC1A8]',
    badge:
      'bg-[#3BC1A8]/20 text-[#005461] dark:bg-[#0C7779]/30 dark:text-[#3BC1A8]',
    border: 'border-[#249E94]/40 dark:border-[#249E94]/30',
  },
  violet: {
    bg: 'bg-violet-100 dark:bg-violet-900/30',
    text: 'text-violet-600 dark:text-violet-400',
    badge:
      'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400',
    border: 'border-violet-200 dark:border-violet-800',
  },
  blue: {
    bg: 'bg-blue-100 dark:bg-blue-900/30',
    text: 'text-blue-600 dark:text-blue-400',
    badge: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    border: 'border-blue-200 dark:border-blue-800',
  },
  emerald: {
    bg: 'bg-emerald-100 dark:bg-emerald-900/30',
    text: 'text-emerald-600 dark:text-emerald-400',
    badge:
      'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
    border: 'border-emerald-200 dark:border-emerald-800',
  },
  amber: {
    bg: 'bg-amber-100 dark:bg-amber-900/30',
    text: 'text-amber-600 dark:text-amber-400',
    badge:
      'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    border: 'border-amber-200 dark:border-amber-800',
  },
};

export function getColorClasses(color: ColorVariant): ColorClasses {
  return COLOR_MAP[color];
}
