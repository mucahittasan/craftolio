import { ProjectForm } from '@/features/builder/components/project-form';
import React from 'react';

export default function ProjectsPage() {
  return (
    <div>
      <h1 className="mb-2 text-3xl font-bold">Projects</h1>
      <p className="mb-8 text-muted-foreground">
        Showcase your best work by adding your projects.
      </p>
      <ProjectForm />
    </div>
  );
}
