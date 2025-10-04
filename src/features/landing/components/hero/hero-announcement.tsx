import React from 'react';
import { cn } from '@/lib/utils';
import { MotionDiv } from '@/features/shared/utils/motions/motions.util';
import { fadeUpVariant } from '@/features/shared/utils/motions/variants.util';
import { AnimatedGradientText } from '@/features/shared/components/ui/animated-gradient-text';

interface HeroAnnouncementProps {
  text: string;
  emoji: string;
}

export const HeroAnnouncement: React.FC<HeroAnnouncementProps> = ({
  text,
  emoji,
}) => {
  return (
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
          {text}
        </span>
        <hr className="mx-2 h-4 w-px shrink-0 bg-gray-300" />
        {emoji}
      </AnimatedGradientText>
    </MotionDiv>
  );
};
