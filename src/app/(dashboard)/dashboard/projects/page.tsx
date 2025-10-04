import { ProjectForm } from '@/features/builder/components/project-form';
import React, { Suspense } from 'react';
import { FormSkeleton } from '@/features/builder/components/form-skeleton';

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="mb-2 text-2xl font-bold sm:text-3xl">Projects</h1>
      <p className="mb-6 text-sm text-muted-foreground sm:mb-8 sm:text-base">
        Showcase your best work by adding your projects.
      </p>
      <Suspense fallback={<FormSkeleton />}>
        <ProjectForm />
      </Suspense>
    </div>
  );
}
