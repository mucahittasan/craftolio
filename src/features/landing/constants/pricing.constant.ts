export interface PricingPlan {
  title: string;
  monthlyPrice: number;
  yearlyPrice: number;
  description: string;
  features: string[];
  isFeatured: boolean;
}

export const PRICING_PLANS: PricingPlan[] = [
  {
    title: 'Free',
    monthlyPrice: 0,
    yearlyPrice: 0,
    description: 'Get started with essential features.',
    features: [
      '1 Portfolio Site',
      'Standard Templates',
      'Community Support',
      'Secure, private portfolios',
    ],
    isFeatured: false,
  },
  {
    title: 'Pro',
    monthlyPrice: 12,
    yearlyPrice: 120,
    description: 'For professionals who want to stand out.',
    features: [
      'Everything in Free, plus:',
      'Unlimited Portfolio Sites',
      'Premium Templates & Fonts',
      'Custom Domain Support',
      'AI-Powered Suggestions',
      'Priority Support Channel',
    ],
    isFeatured: true,
  },
];

export const PRICING_SECTION_CONFIG = {
  title: 'Choose Your Plan',
  description:
    'Start for free and scale up as you grow. We have a plan for everyone.',
  featuredLabel: 'Most Popular',
} as const;
