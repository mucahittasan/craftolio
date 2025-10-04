export interface FeatureItem {
  iconName: string;
  title: string;
  description: string;
  header: React.ReactNode;
  className: string;
}

export const FEATURES_CONFIG = {
  title: 'Everything You Need to Shine',
  description:
    'Craftolio provides powerful features to make your portfolio stand out from the crowd.',
} as const;

export const FEATURES_DATA = [
  {
    iconName: 'Palette',
    title: 'Easy Customization',
    description: 'Choose themes, colors, and fonts that represent you.',
    className: 'md:col-span-2',
  },
  {
    iconName: 'Blocks',
    title: 'Structured Sections',
    description: 'Easily add and manage your experience, projects, and skills.',
    className: 'md:col-span-1',
  },
  {
    iconName: 'LayoutTemplate',
    title: 'Responsive Templates',
    description:
      'Your portfolio looks great on all devices, from desktop to mobile.',
    className: 'md:col-span-1',
  },
  {
    iconName: 'Gem',
    title: 'AI-Powered Assistance',
    description:
      'Leverage AI to get suggestions for your descriptions and showcase your skills.',
    className: 'md:col-span-2',
  },
] as const;
