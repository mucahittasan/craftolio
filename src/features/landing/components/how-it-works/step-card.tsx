'use client';

import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/features/shared/components/ui/card';
import { MotionDiv } from '@/features/shared/utils/motions/motions.util';
import { fadeUpVariant } from '@/features/shared/utils/motions/variants.util';
import { HowItWorksStep } from '@/features/landing/constants/how-it-works.constant';
import { useStepIcon } from '@/features/landing/hooks/use-step-icon.hook';
import Tilt from 'react-parallax-tilt';

interface StepCardProps {
  step: HowItWorksStep;
  index: number;
}

export const StepCard: React.FC<StepCardProps> = ({ step, index }) => {
  const { getIcon } = useStepIcon();

  return (
    <MotionDiv
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      variants={fadeUpVariant}
      custom={0.2 * (index + 1)}
    >
      <Tilt
        tiltMaxAngleX={10}
        tiltMaxAngleY={10}
        glareEnable={true}
        glareMaxOpacity={0.1}
        glarePosition="all"
        className="h-full w-full rounded-2xl"
      >
        <Card className="group relative h-full overflow-hidden rounded-2xl border bg-card/60 text-left shadow-xl shadow-black/[0.04] backdrop-blur-sm transition-all duration-300 dark:bg-card/40 dark:shadow-white/[0.02]">
          {/* Shine Effect */}
          <div className="absolute left-[-100%] top-0 h-full w-1/2 bg-gradient-to-r from-transparent to-white/10 opacity-50 transition-all duration-700 group-hover:left-[150%]" />

          {/* Step Number */}
          <div className="pointer-events-none absolute -right-6 -top-8 select-none text-[9rem] font-bold text-primary/5 opacity-80">
            0{index + 1}
          </div>

          <CardHeader className="relative z-10">
            <div className="mb-4 w-fit rounded-full border bg-background p-4 shadow-sm">
              {getIcon(step.iconName)}
            </div>
            <CardTitle className="text-balance text-xl">{step.title}</CardTitle>
          </CardHeader>

          <CardContent className="relative z-10">
            <p className="text-balance text-sm text-muted-foreground">
              {step.description}
            </p>
          </CardContent>
        </Card>
      </Tilt>
    </MotionDiv>
  );
};
