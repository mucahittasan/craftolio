import { ExperienceForm } from '@/features/builder/components/experience-form';
import React from 'react';

export default function ExperiencePage() {
  return (
    <div>
      <h1 className="mb-2 text-3xl font-bold">Work Experience</h1>
      <p className="mb-8 text-muted-foreground">
        Add, edit, and manage your professional work experiences.
      </p>
      <ExperienceForm />
    </div>
  );
}
