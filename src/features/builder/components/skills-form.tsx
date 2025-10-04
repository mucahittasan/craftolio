'use client';

import { usePortfolioStore } from '@/features/builder/store/portfolio.store';
import { SavePortfolioButton } from '@/features/builder/components/save-portfolio-button';
import { Button } from '@/features/shared/components/ui/button';
import { Input } from '@/features/shared/components/ui/input';
import { Badge } from '@/features/shared/components/ui/badge';
import { X, ArrowLeft } from 'lucide-react';
import { Label } from '@/features/shared/components/ui/label';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export function SkillsForm() {
  const router = useRouter();
  const { skills, addSkill, removeSkill } = usePortfolioStore();

  const [currentSkill, setCurrentSkill] = useState('');

  const handleAddSkill = () => {
    if (currentSkill.trim() !== '') {
      addSkill(currentSkill.trim());
      setCurrentSkill('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
    }
  };

  return (
    <div>
      <div className="rounded-2xl border border-black/10 bg-white/10 p-6 shadow-lg backdrop-blur-lg dark:border-white/10 dark:bg-black/10">
        <div className="space-y-2">
          <Label htmlFor="skill-input">Add a skill</Label>
          <div className="flex gap-2">
            <Input
              id="skill-input"
              value={currentSkill}
              onChange={(e) => setCurrentSkill(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="e.g., TypeScript"
            />
            <Button type="button" onClick={handleAddSkill}>
              Add
            </Button>
          </div>
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          {skills.map((skill) => (
            <Badge
              key={skill.id}
              variant="secondary"
              className="flex items-center gap-2 text-base"
            >
              {skill.name}
              <button
                onClick={() => removeSkill(skill.id)}
                className="rounded-full hover:bg-muted-foreground/20"
              >
                <X className="h-4 w-4" />
              </button>
            </Badge>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3 pt-8 sm:flex-row sm:justify-start">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push('/dashboard/projects')}
          className="group w-full sm:w-auto"
        >
          <ArrowLeft className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:-translate-x-1" />
          Back: Projects
        </Button>
        <SavePortfolioButton className="w-full bg-green-600 hover:bg-green-700 sm:w-auto" />
      </div>
    </div>
  );
}
