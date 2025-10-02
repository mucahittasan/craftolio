import { SkillsForm } from '@/features/builder/components/skills-form';
import React from 'react';

export default function SkillsPage() {
  return (
    <div>
      <h1 className="mb-2 text-3xl font-bold">Skills</h1>
      <p className="mb-8 text-muted-foreground">
        List the technologies and skills you are proficient in.
      </p>
      <SkillsForm />
    </div>
  );
}
