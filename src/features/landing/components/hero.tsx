import React from 'react';
import { cn } from '@/src/lib/utils';
import { MotionDiv, MotionH1, MotionP } from '@/src/utils/motions/motions';
import { AnimatedGradientText } from '@/src/components/ui/animated-gradient-text';
import { fadeUpVariant, headingVariants } from '@/src/utils/motions/variants';
import { RainbowButton } from '@/src/components/ui/rainbow-button';
import { SparklesText } from '@/src/components/ui/sparkle';

export const Hero = () => {
  return (
    <section className="relative z-20 flex min-h-[calc(100vh-70px)] flex-col items-center justify-center text-center">
      <MotionDiv
        initial="hidden"
        animate="visible"
        variants={fadeUpVariant}
        custom={0.1}
      >
        <AnimatedGradientText>
          <span
            className={cn(
              'animate-gradient inline bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-sm text-transparent sm:text-base',
            )}
          >
            ✨ Big News → Craftolio is Here!
          </span>
          <hr className="mx-2 h-4 w-px shrink-0 bg-gray-300" /> 🎉
        </AnimatedGradientText>
      </MotionDiv>

      <MotionH1
        className="text-foreground mt-6 max-w-[640px] text-center text-4xl font-semibold leading-tight sm:text-5xl md:text-6xl"
        initial="hidden"
        animate="visible"
      >
        <MotionDiv variants={headingVariants} custom={0.4} className="block">
          Showcase Your Work,
        </MotionDiv>
        <MotionDiv variants={headingVariants} custom={0.7} className="block">
          Grow Your Career <br />
        </MotionDiv>
        <MotionDiv variants={headingVariants} custom={1} className="block">
          with <SparklesText text="Craftolio" />
        </MotionDiv>
      </MotionH1>

      <MotionP
        className="text-muted-foreground mx-auto my-6 max-w-xl text-balance text-center text-sm leading-7 sm:text-base sm:leading-9 md:text-lg"
        variants={fadeUpVariant}
        custom={1.4}
        initial="hidden"
        animate="visible"
      >
        More than a resume, your portfolio is your digital identity. Let the
        world see what you can do.
      </MotionP>

      <MotionDiv
        className="mt-4 flex gap-4"
        variants={fadeUpVariant}
        custom={1.7}
        initial="hidden"
        animate="visible"
      >
        <RainbowButton className="text-sm transition duration-200 hover:scale-[1.02] sm:text-base">
          🚀 <span className="ml-3">Launch Your Portfolio Today!</span>
        </RainbowButton>
      </MotionDiv>

      <MotionP
        className="text-muted-foreground mx-auto mt-10 text-sm font-medium sm:text-base"
        variants={fadeUpVariant}
        custom={2}
        initial="hidden"
        animate="visible"
      >
        Create in minutes. No coding, no limits.
      </MotionP>
    </section>
  );
};
