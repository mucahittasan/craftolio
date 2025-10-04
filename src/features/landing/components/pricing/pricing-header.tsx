'use client';

import { MotionDiv } from '@/features/shared/utils/motions/motions.util';
import { fadeUpVariant } from '@/features/shared/utils/motions/variants.util';
import { BillingToggle } from '@/features/shared/components/ui/billing-toggle';
import { PRICING_SECTION_CONFIG } from '@/features/landing/constants/pricing.constant';

interface PricingHeaderProps {
  isYearly: boolean;
  setIsYearly: (value: boolean) => void;
}

export const PricingHeader: React.FC<PricingHeaderProps> = ({
  isYearly,
  setIsYearly,
}) => {
  return (
    <MotionDiv
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={fadeUpVariant}
      className="text-center"
    >
      <h2 className="mb-4 text-3xl font-bold tracking-tighter sm:text-4xl">
        {PRICING_SECTION_CONFIG.title}
      </h2>
      <p className="mx-auto mb-8 max-w-2xl text-muted-foreground md:text-lg">
        {PRICING_SECTION_CONFIG.description}
      </p>
      <div className="mb-24 flex items-center justify-center space-x-4">
        <BillingToggle isYearly={isYearly} setIsYearly={setIsYearly} />
      </div>
    </MotionDiv>
  );
};
