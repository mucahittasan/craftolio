import { EducationForm } from '@/features/builder/components/education-form';
import React, { Suspense } from 'react';
import { FormSkeleton } from '@/features/builder/components/form-skeleton';

export default function EducationPage() {
  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="mb-2 text-2xl font-bold sm:text-3xl">Education</h1>
      <p className="mb-6 text-sm text-muted-foreground sm:mb-8 sm:text-base">
        Add, edit, and manage your educational background.
      </p>
      <Suspense fallback={<FormSkeleton />}>
        <EducationForm />
      </Suspense>
    </div>
  );
}
