import React from 'react';
import { MotionP } from '@/features/shared/utils/motions/motions.util';
import { fadeUpVariant } from '@/features/shared/utils/motions/variants.util';

interface HeroDescriptionProps {
  description: string;
}

export const HeroDescription: React.FC<HeroDescriptionProps> = ({
  description,
}) => {
  return (
    <MotionP
      className="mx-auto my-6 max-w-xl text-balance text-center text-sm leading-7 text-muted-foreground sm:text-base sm:leading-9 md:text-lg"
      variants={fadeUpVariant}
      custom={1.4}
      initial="hidden"
      animate="visible"
    >
      {description}
    </MotionP>
  );
};
