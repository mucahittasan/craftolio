import React from 'react';
import {
  MotionDiv,
  MotionP,
} from '@/features/shared/utils/motions/motions.util';
import { fadeUpVariant } from '@/features/shared/utils/motions/variants.util';
import { RainbowButton } from '@/features/shared/components/ui/rainbow-button';
import Link from 'next/link';

interface HeroCtaProps {
  ctaText: string;
  subtext: string;
}

export const HeroCta: React.FC<HeroCtaProps> = ({ ctaText, subtext }) => {
  return (
    <>
      <MotionDiv
        className="mt-4 flex gap-4"
        variants={fadeUpVariant}
        custom={1.7}
        initial="hidden"
        animate="visible"
      >
        <Link href="/register">
          <RainbowButton className="text-sm transition duration-200 hover:scale-[1.02] sm:text-base">
            {ctaText}
          </RainbowButton>
        </Link>
      </MotionDiv>

      <MotionP
        className="mx-auto mt-10 text-sm font-medium text-muted-foreground sm:text-base"
        variants={fadeUpVariant}
        custom={2}
        initial="hidden"
        animate="visible"
      >
        {subtext}
      </MotionP>
    </>
  );
};
