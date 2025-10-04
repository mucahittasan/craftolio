import React from 'react';
import { MotionDiv } from '@/features/shared/utils/motions/motions.util';
import { fadeUpVariant } from '@/features/shared/utils/motions/variants.util';

interface FeaturesHeaderProps {
  title: string;
  description: string;
}

export const FeaturesHeader: React.FC<FeaturesHeaderProps> = ({
  title,
  description,
}) => {
  return (
    <MotionDiv
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.7 }}
      variants={fadeUpVariant}
      className="mb-12 text-center"
    >
      <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
        {title}
      </h2>
      <p className="mx-auto mt-4 max-w-2xl text-muted-foreground md:text-lg">
        {description}
      </p>
    </MotionDiv>
  );
};
