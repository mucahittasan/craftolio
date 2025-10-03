'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';
import React, { useState, MouseEvent } from 'react';
import { MotionDiv } from '@/features/shared/utils/motions/motions';
import { fadeUpVariant } from '@/features/shared/utils/motions/variants';
import { BillingToggle } from '@/components/ui/billing-toggle';
import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { useTheme } from 'next-themes';

const plans = [
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

const SpotlightEffect = ({
  mousePosition,
  isDark = false,
}: {
  mousePosition: { x: number; y: number };
  isDark?: boolean;
}) => (
  <MotionDiv
    className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
    style={{
      background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, ${isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.08)'}, transparent 40%)`,
    }}
    aria-hidden="true"
  />
);

export function Pricing() {
  const [isYearly, setIsYearly] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { theme } = useTheme();

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <section id="pricing" className="container relative mx-auto px-4 py-24">
      <div
        className="absolute inset-x-0 top-0 -z-10 m-auto h-[358px] max-w-sm blur-[118px]"
        style={{
          background:
            'linear-gradient(106.89deg, rgba(192, 132, 252, 0.11) 15.73%, rgba(14, 165, 233, 0.06) 15.74%, rgba(232, 121, 249, 0.08) 56.49%, rgba(79, 70, 229, 0.09) 87.91%)',
        }}
      ></div>

      <MotionDiv
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeUpVariant}
        className="text-center"
      >
        <h2 className="mb-4 text-3xl font-bold tracking-tighter sm:text-4xl">
          Choose Your Plan
        </h2>
        <p className="mx-auto mb-8 max-w-2xl text-muted-foreground md:text-lg">
          Start for free and scale up as you grow. We have a plan for everyone.
        </p>
        <div className="mb-24 flex items-center justify-center space-x-4">
          {/* Yeni BillingToggle bileşenini burada kullanıyoruz */}
          <BillingToggle isYearly={isYearly} setIsYearly={setIsYearly} />
        </div>
      </MotionDiv>
      <div className="mx-auto grid max-w-4xl items-center gap-8 md:grid-cols-2">
        {plans.map((plan, index) => (
          <MotionDiv
            key={index}
            onMouseMove={handleMouseMove}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={fadeUpVariant}
            custom={0.2 * (index + 1)}
            className={cn(
              'group relative h-full transition-all duration-300',
              plan.isFeatured && 'md:!scale-110',
              !plan.isFeatured && 'md:!scale-95',
            )}
          >
            {plan.isFeatured && (
              <div className="absolute -top-5 left-1/2 z-10 -translate-x-1/2">
                <div className="rounded-full bg-gradient-to-r from-pink-500 to-purple-500 px-4 py-2 text-xs font-semibold text-white shadow-lg">
                  Most Popular
                </div>
              </div>
            )}

            <Card
              className={cn(
                'relative flex h-full flex-col overflow-hidden rounded-2xl border bg-white/60 shadow-lg backdrop-blur-md transition-all duration-300 ease-in-out dark:bg-zinc-900/60',
                plan.isFeatured
                  ? 'border-purple-200 shadow-[0_0_40px_rgba(168,85,247,0.4)] dark:border-purple-500/30 dark:shadow-[0_0_50px_rgba(168,85,247,0.6)]'
                  : 'border-black/5 dark:border-white/10 dark:shadow-none',
              )}
            >
              <SpotlightEffect
                mousePosition={mousePosition}
                isDark={theme === 'dark'}
              />
              <CardHeader className="z-10 pt-12">
                <CardTitle className="text-2xl font-bold text-foreground">
                  {plan.title}
                </CardTitle>
                <div className="flex items-baseline gap-2 pt-4">
                  <span className="text-5xl font-extrabold tracking-tighter text-foreground">
                    ${isYearly ? plan.yearlyPrice / 12 : plan.monthlyPrice}
                  </span>
                  <span className="text-muted-foreground">/ month</span>
                </div>
                <CardDescription className="h-10 pt-2">
                  {plan.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="z-10 flex-1">
                <ul className="space-y-4 pt-4">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="mt-1 h-5 w-5 flex-shrink-0 text-green-500" />
                      <span className="text-sm text-muted-foreground">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="z-10">
                <Button
                  className={cn(
                    'group/button relative w-full overflow-hidden',
                    plan.isFeatured
                      ? 'bg-foreground text-background hover:bg-foreground/90'
                      : '',
                  )}
                  size="lg"
                  variant={plan.isFeatured ? 'default' : 'outline'}
                >
                  <span className="absolute h-0 w-0 rounded-full bg-white opacity-10 transition-all duration-300 ease-out group-hover/button:h-32 group-hover/button:w-32"></span>
                  <span className="relative">
                    {plan.isFeatured ? 'Get Pro' : 'Get Started'}
                  </span>
                </Button>
              </CardFooter>
            </Card>
          </MotionDiv>
        ))}
      </div>
    </section>
  );
}
