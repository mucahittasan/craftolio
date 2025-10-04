export interface HowItWorksStep {
  iconName: string;
  title: string;
  description: string;
}

export const HOW_IT_WORKS_CONFIG = {
  title: 'Get Your Professional Site in 3 Easy Steps',
  description:
    'From signing up to going live, the entire process is designed to be quick, easy, and intuitive.',
} as const;

export const HOW_IT_WORKS_STEPS: HowItWorksStep[] = [
  {
    iconName: 'UserPlus',
    title: 'Sign Up & Provide Info',
    description:
      'Create your account and fill out a simple form with your experience, education, and projects.',
  },
  {
    iconName: 'FileText',
    title: 'Choose Your Template',
    description:
      'Select from a variety of professional templates and customize colors and fonts to match your style.',
  },
  {
    iconName: 'Globe',
    title: 'Publish & Share',
    description:
      'Publish your portfolio to a unique URL and share it with the world.',
  },
];
