'use client';

import React from 'react';
import {
  HOW_IT_WORKS_CONFIG,
  HOW_IT_WORKS_STEPS,
} from '@/features/landing/constants/how-it-works.constant';
import { HowItWorksHeader } from '@/features/landing/components/how-it-works/how-it-works-header';
import { StepCard } from '@/features/landing/components/how-it-works/step-card';

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="container mx-auto px-4 py-24 text-center"
    >
      <HowItWorksHeader
        title={HOW_IT_WORKS_CONFIG.title}
        description={HOW_IT_WORKS_CONFIG.description}
      />

      <div className="grid gap-8 md:grid-cols-3 md:gap-12">
        {HOW_IT_WORKS_STEPS.map((step, index) => (
          <StepCard key={index} step={step} index={index} />
        ))}
      </div>
    </section>
  );
}
