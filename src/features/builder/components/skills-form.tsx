'use client';

import { usePortfolioStore } from '@/features/builder/store/portfolio-store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { X, ArrowRight, ArrowLeft } from 'lucide-react';
import { Label } from '@/components/ui/label';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export function SkillsForm() {
  const router = useRouter();
  const { skills, addSkill, removeSkill } = usePortfolioStore();
  const [currentSkill, setCurrentSkill] = useState('');

  const handleAddSkill = () => {
    if (currentSkill.trim() !== '') {
      addSkill(currentSkill.trim());
      setCurrentSkill(''); // Input'u temizle
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Formun submit olmasını engelle
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

      <div className="flex justify-between pt-8">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push('/dashboard/projects')}
          className="group"
        >
          <ArrowLeft className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:-translate-x-1" />
          Back: Projects
        </Button>
        {/* Şimdilik bu buton bir sonraki adıma yönlendiriyor, yakında veritabanına kaydetme işlevini ekleyeceğiz */}
        <Button
          type="button"
          onClick={() => alert('All steps completed!')}
          className="group bg-green-600 text-white hover:bg-green-700"
        >
          Finish & Save
          <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
        </Button>
      </div>
    </div>
  );
}
