import React from 'react';
import { HeroAnnouncement } from '@/features/landing/components/hero/hero-announcement';
import { HeroTitle } from '@/features/landing/components/hero/hero-title';
import { HeroDescription } from '@/features/landing/components/hero/hero-description';
import { HeroCta } from '@/features/landing/components/hero/hero-cta';
import { HERO_CONFIG } from '@/features/landing/constants/hero.constant';

export const Hero = () => {
  return (
    <section className="relative z-20 flex min-h-screen flex-col items-center justify-center text-center">
      {/* Background pattern */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] dark:bg-[radial-gradient(#ffffff33_1px,transparent_1px)]"></div>

      <HeroAnnouncement
        text={HERO_CONFIG.announcement.text}
        emoji={HERO_CONFIG.announcement.emoji}
      />

      <HeroTitle
        part1={HERO_CONFIG.title.part1}
        part2={HERO_CONFIG.title.part2}
        part3={HERO_CONFIG.title.part3}
        brandName={HERO_CONFIG.title.brandName}
      />

      <HeroDescription description={HERO_CONFIG.description} />

      <HeroCta
        ctaText={`${HERO_CONFIG.cta.text}`}
        subtext={HERO_CONFIG.cta.subtext}
      />
    </section>
  );
};
