import { SkillsForm } from '@/features/builder/components/skills-form';
import React, { Suspense } from 'react';
import { FormSkeleton } from '@/features/builder/components/form-skeleton';

export default function SkillsPage() {
  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="mb-2 text-2xl font-bold sm:text-3xl">Skills</h1>
      <p className="mb-6 text-sm text-muted-foreground sm:mb-8 sm:text-base">
        List the technologies and skills you are proficient in.
      </p>
      <Suspense fallback={<FormSkeleton />}>
        <SkillsForm />
      </Suspense>
    </div>
  );
}
