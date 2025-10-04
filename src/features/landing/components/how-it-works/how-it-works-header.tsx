import React from 'react';
import { MotionDiv } from '@/features/shared/utils/motions/motions.util';
import { fadeUpVariant } from '@/features/shared/utils/motions/variants.util';

interface HowItWorksHeaderProps {
  title: string;
  description: string;
}

export const HowItWorksHeader: React.FC<HowItWorksHeaderProps> = ({
  title,
  description,
}) => {
  return (
    <MotionDiv
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={fadeUpVariant}
      custom={0.1}
    >
      <h2 className="mb-4 text-3xl font-bold tracking-tighter sm:text-4xl">
        {title}
      </h2>
      <p className="mx-auto mb-16 max-w-2xl text-muted-foreground md:text-lg">
        {description}
      </p>
    </MotionDiv>
  );
};
