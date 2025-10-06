import React from 'react';
import {
  MotionDiv,
  MotionH1,
} from '@/features/shared/utils/motions/motions.util';
import { headingVariants } from '@/features/shared/utils/motions/variants.util';
import { SparklesText } from '@/features/shared/components/ui/sparkle';

interface HeroTitleProps {
  part1: string;
  part2: string;
  part3: string;
  brandName: string;
}

export const HeroTitle: React.FC<HeroTitleProps> = ({
  part1,
  part2,
  part3,
  brandName,
}) => {
  return (
    <MotionH1
      className="mt-6 max-w-[640px] text-center text-4xl font-semibold leading-tight text-foreground sm:text-5xl md:text-6xl"
      initial="hidden"
      animate="visible"
    >
      <MotionDiv variants={headingVariants} custom={0.4} className="block">
        {part1}
      </MotionDiv>
      <MotionDiv variants={headingVariants} custom={0.7} className="block">
        {part2} <br />
      </MotionDiv>
      <MotionDiv variants={headingVariants} custom={1} className="block">
        {part3} <SparklesText text={brandName} />
      </MotionDiv>
    </MotionH1>
  );
};
