'use client';

import { useState } from 'react';
import { PricingHeader } from '@/features/landing/components/pricing/pricing-header';
import { PricingCard } from '@/features/landing/components/pricing/pricing-card';
import { PRICING_PLANS } from '@/features/landing/constants/pricing.constant';

export function Pricing() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section
      id="pricing"
      className="container relative mx-auto overflow-hidden px-4 py-24"
    >
      {/* Enhanced background gradients */}
      <div
        className="absolute inset-x-0 top-0 -z-10 m-auto h-[358px] max-w-sm animate-pulse blur-[118px]"
        style={{
          background:
            'linear-gradient(106.89deg, rgba(192, 132, 252, 0.11) 15.73%, rgba(14, 165, 233, 0.06) 15.74%, rgba(232, 121, 249, 0.08) 56.49%, rgba(79, 70, 229, 0.09) 87.91%)',
        }}
      />

      {/* Additional background effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-1/4 h-64 w-64 animate-pulse rounded-full bg-purple-500/5 blur-3xl delay-1000" />
        <div className="absolute bottom-1/4 right-1/4 h-48 w-48 animate-pulse rounded-full bg-blue-500/5 blur-2xl delay-500" />
        <div className="delay-1500 absolute left-1/2 top-3/4 h-32 w-32 animate-pulse rounded-full bg-pink-500/5 blur-xl" />
      </div>

      <PricingHeader isYearly={isYearly} setIsYearly={setIsYearly} />

      <div className="mx-auto grid max-w-4xl items-center gap-8 md:grid-cols-2">
        {PRICING_PLANS.map((plan, index) => (
          <PricingCard
            key={plan.title}
            plan={plan}
            index={index}
            isYearly={isYearly}
          />
        ))}
      </div>
    </section>
  );
}
