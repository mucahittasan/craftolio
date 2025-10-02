import { EducationForm } from '@/features/builder/components/education-form';
import React from 'react';

export default function EducationPage() {
  return (
    <div>
      <h1 className="mb-2 text-3xl font-bold">Education</h1>
      <p className="mb-8 text-muted-foreground">
        Add, edit, and manage your educational background.
      </p>
      <EducationForm />
    </div>
  );
}
