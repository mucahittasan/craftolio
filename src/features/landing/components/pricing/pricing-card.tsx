'use client';

import { Button } from '@/features/shared/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/features/shared/components/ui/card';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';
import { MotionDiv } from '@/features/shared/utils/motions/motions.util';
import { fadeUpVariant } from '@/features/shared/utils/motions/variants.util';
import { SpotlightEffect } from '@/features/landing/components/pricing/spotlight-effect';
import { useMousePosition } from '@/features/landing/hooks/use-mouse-position.hook';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import {
  PricingPlan,
  PRICING_SECTION_CONFIG,
} from '@/features/landing/constants/pricing.constant';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/features/shared/components/ui/dialog';

interface PricingCardProps {
  plan: PricingPlan;
  index: number;
  isYearly: boolean;
}

export const PricingCard: React.FC<PricingCardProps> = ({
  plan,
  index,
  isYearly,
}) => {
  const { mousePosition, handleMouseMove } = useMousePosition();
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <MotionDiv
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
            {PRICING_SECTION_CONFIG.featuredLabel}
          </div>
        </div>
      )}

      <Card
        className={cn(
          'relative flex h-full flex-col overflow-hidden rounded-2xl border shadow-lg backdrop-blur-md transition-all duration-300 ease-in-out',
          // Base background with gradient
          'bg-gradient-to-br from-white/80 via-white/60 to-white/40 dark:from-zinc-900/80 dark:via-zinc-900/60 dark:to-zinc-900/40',
          // Featured card styling
          plan.isFeatured
            ? 'border-purple-200/50 shadow-[0_0_60px_rgba(168,85,247,0.5)] dark:border-purple-500/40 dark:bg-gradient-to-br dark:from-purple-900/20 dark:via-zinc-900/60 dark:to-purple-900/10 dark:shadow-[0_0_80px_rgba(168,85,247,0.7)]'
            : 'border-black/10 dark:border-white/20 dark:shadow-[0_0_20px_rgba(0,0,0,0.3)]',
        )}
      >
        {/* Animated background gradient overlay */}
        <div className="absolute inset-0 opacity-30 dark:opacity-20">
          <div
            className={cn(
              'absolute inset-0 bg-gradient-to-br transition-opacity duration-500',
              plan.isFeatured
                ? 'from-purple-500/20 via-transparent to-pink-500/20'
                : 'from-blue-500/10 via-transparent to-indigo-500/10',
            )}
          />
          <div
            className={cn(
              'absolute inset-0 bg-gradient-to-tl transition-opacity duration-700',
              plan.isFeatured
                ? 'from-transparent via-purple-600/10 to-transparent'
                : 'from-transparent via-blue-600/5 to-transparent',
            )}
          />
        </div>

        {/* Subtle animated pattern overlay */}
        <div className="absolute inset-0 opacity-5 dark:opacity-10">
          <div className="h-full w-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05),transparent_50%)]" />
        </div>

        {/* Animated floating particles effect for featured card */}
        {plan.isFeatured && (
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -left-4 -top-4 h-8 w-8 animate-pulse rounded-full bg-purple-400/20" />
            <div className="absolute -right-2 top-1/4 h-4 w-4 animate-pulse rounded-full bg-pink-400/20 delay-300" />
            <div className="absolute -bottom-2 left-1/3 h-6 w-6 animate-pulse rounded-full bg-blue-400/20 delay-700" />
            <div className="absolute right-1/4 top-3/4 h-3 w-3 animate-pulse rounded-full bg-purple-300/30 delay-1000" />
          </div>
        )}

        {/* Enhanced glow effect for featured card */}
        {plan.isFeatured && (
          <div className="absolute -inset-1 animate-pulse rounded-2xl bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-purple-500/20 opacity-60 blur-sm" />
        )}

        {/* Subtle border glow for non-featured cards */}
        {!plan.isFeatured && (
          <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-blue-500/5 via-transparent to-indigo-500/5 opacity-50" />
        )}

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
                <span className="text-sm text-muted-foreground">{feature}</span>
              </li>
            ))}
          </ul>
        </CardContent>

        <CardFooter className="z-10">
          {plan.isFeatured ? (
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  className={cn(
                    'group/button relative w-full overflow-hidden',
                    'bg-foreground text-background hover:bg-foreground/90',
                  )}
                  size="lg"
                  variant="default"
                >
                  <span className="absolute h-0 w-0 rounded-full bg-white opacity-10 transition-all duration-300 ease-out group-hover/button:h-32 group-hover/button:w-32"></span>
                  <span className="relative">Get Pro</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Coming soon</DialogTitle>
                  <DialogDescription>
                    Pro features are in the works. Stay tuned!
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Close</Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          ) : (
            <Button
              className={cn('group/button relative w-full overflow-hidden')}
              size="lg"
              variant="outline"
              onClick={() => router.push('/register')}
            >
              <span className="absolute h-0 w-0 rounded-full bg-white opacity-10 transition-all duration-300 ease-out group-hover/button:h-32 group-hover/button:w-32"></span>
              <span className="relative">Get Started</span>
            </Button>
          )}
        </CardFooter>
      </Card>
    </MotionDiv>
  );
};
