'use client';

import { usePortfolioStore } from '@/features/builder/store/portfolio.store';
import { SavePortfolioButton } from '@/features/builder/components/save-portfolio-button';
import { Button } from '@/features/shared/components/ui/button';
import { Input } from '@/features/shared/components/ui/input';
import { Badge } from '@/features/shared/components/ui/badge';
import {
  X,
  ArrowLeft,
  Plus,
  ChevronDown,
  ChevronUp,
  Search,
} from 'lucide-react';
import { Label } from '@/features/shared/components/ui/label';
import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';

const POPULAR_SKILLS = {
  Frontend: [
    'React',
    'Vue.js',
    'Angular',
    'Next.js',
    'Nuxt.js',
    'Svelte',
    'TypeScript',
    'JavaScript',
    'HTML5',
    'CSS3',
    'Tailwind CSS',
    'SASS/SCSS',
    'Bootstrap',
    'Redux',
    'Zustand',
    'React Query',
    'GraphQL',
    'REST API',
  ],
  Backend: [
    'Node.js',
    'Express.js',
    'NestJS',
    'Python',
    'Django',
    'FastAPI',
    'Flask',
    'Java',
    'Spring Boot',
    'Go',
    'Rust',
    'Ruby on Rails',
    'PHP',
    'Laravel',
    'C#',
    '.NET',
    'Kotlin',
  ],
  Database: [
    'PostgreSQL',
    'MySQL',
    'MongoDB',
    'Redis',
    'SQLite',
    'Oracle',
    'SQL Server',
    'Prisma',
    'Mongoose',
    'Firebase',
    'Supabase',
    'DynamoDB',
  ],
  'DevOps & Cloud': [
    'Docker',
    'Kubernetes',
    'AWS',
    'Google Cloud',
    'Azure',
    'Vercel',
    'Netlify',
    'CI/CD',
    'GitHub Actions',
    'Jenkins',
    'Terraform',
    'Linux',
    'Nginx',
  ],
  Mobile: [
    'React Native',
    'Flutter',
    'Swift',
    'SwiftUI',
    'Kotlin',
    'iOS',
    'Android',
    'Expo',
    'Ionic',
  ],
  'Design & Tools': [
    'Figma',
    'Adobe XD',
    'Photoshop',
    'Illustrator',
    'Git',
    'GitHub',
    'GitLab',
    'Jira',
    'Notion',
    'VS Code',
    'Postman',
  ],
  'AI & Data Science': [
    'Machine Learning',
    'Deep Learning',
    'TensorFlow',
    'PyTorch',
    'OpenAI',
    'LangChain',
    'Pandas',
    'NumPy',
    'Scikit-learn',
    'Data Analysis',
    'NLP',
  ],
  Other: [
    'Agile',
    'Scrum',
    'Problem Solving',
    'Communication',
    'Leadership',
    'Project Management',
    'Technical Writing',
    'Testing',
    'Jest',
    'Cypress',
  ],
} as const;

export function SkillsForm() {
  const router = useRouter();
  const { skills, addSkill, removeSkill } = usePortfolioStore();

  const [currentSkill, setCurrentSkill] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<string[]>([
    'Frontend',
    'Backend',
  ]);
  const [searchQuery, setSearchQuery] = useState('');

  const existingSkillNames = useMemo(
    () => skills.map((s) => s.name.toLowerCase()),
    [skills],
  );

  const filteredSkills = useMemo(() => {
    if (!searchQuery.trim()) return null;

    const query = searchQuery.toLowerCase();
    const results: string[] = [];

    Object.values(POPULAR_SKILLS).forEach((categorySkills) => {
      categorySkills.forEach((skill) => {
        if (
          skill.toLowerCase().includes(query) &&
          !existingSkillNames.includes(skill.toLowerCase())
        ) {
          results.push(skill);
        }
      });
    });

    return results;
  }, [searchQuery, existingSkillNames]);

  const handleAddSkill = () => {
    if (
      currentSkill.trim() !== '' &&
      !existingSkillNames.includes(currentSkill.trim().toLowerCase())
    ) {
      addSkill(currentSkill.trim());
      setCurrentSkill('');
    }
  };

  const handleAddPopularSkill = (skillName: string) => {
    if (!existingSkillNames.includes(skillName.toLowerCase())) {
      addSkill(skillName);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
    }
  };

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
    );
  };

  const isSkillAdded = (skillName: string) =>
    existingSkillNames.includes(skillName.toLowerCase());

  return (
    <div>
      <div className="rounded-2xl border border-black/10 bg-white/10 p-6 shadow-lg backdrop-blur-lg dark:border-white/10 dark:bg-black/10">
        <div className="space-y-2">
          <Label htmlFor="skill-input">Add a custom skill</Label>
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

        {skills.length > 0 && (
          <div className="mt-6">
            <Label className="mb-3 block">Your Skills ({skills.length})</Label>
            <div className="flex flex-wrap gap-2">
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
        )}

        <div className="mt-8 border-t border-black/10 pt-6 dark:border-white/10">
          <Label className="mb-4 block text-lg font-semibold">
            Popular Skills
          </Label>

          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search popular skills..."
              className="pl-10"
            />
          </div>

          {filteredSkills && filteredSkills.length > 0 && (
            <div className="mb-4 rounded-lg border border-primary/20 bg-primary/5 p-3">
              <Label className="mb-2 block text-sm text-muted-foreground">
                Search Results
              </Label>
              <div className="flex flex-wrap gap-2">
                {filteredSkills.slice(0, 10).map((skill) => (
                  <Badge
                    key={skill}
                    variant="outline"
                    className="cursor-pointer transition-colors hover:bg-primary hover:text-primary-foreground"
                    onClick={() => handleAddPopularSkill(skill)}
                  >
                    <Plus className="mr-1 h-3 w-3" />
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-3">
            {Object.entries(POPULAR_SKILLS).map(
              ([category, categorySkills]) => (
                <div
                  key={category}
                  className="rounded-lg border border-black/5 bg-white/5 dark:border-white/5 dark:bg-black/5"
                >
                  <button
                    type="button"
                    onClick={() => toggleCategory(category)}
                    className="flex w-full items-center justify-between p-3 text-left font-medium transition-colors hover:bg-black/5 dark:hover:bg-white/5"
                  >
                    <span>{category}</span>
                    {expandedCategories.includes(category) ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </button>

                  {expandedCategories.includes(category) && (
                    <div className="flex flex-wrap gap-2 border-t border-black/5 p-3 dark:border-white/5">
                      {categorySkills.map((skill) => {
                        const added = isSkillAdded(skill);
                        return (
                          <Badge
                            key={skill}
                            variant={added ? 'secondary' : 'outline'}
                            className={
                              added
                                ? 'cursor-default opacity-50'
                                : 'cursor-pointer transition-colors hover:bg-primary hover:text-primary-foreground'
                            }
                            onClick={() =>
                              !added && handleAddPopularSkill(skill)
                            }
                          >
                            {!added && <Plus className="mr-1 h-3 w-3" />}
                            {skill}
                            {added && <span className="ml-1 text-xs">✓</span>}
                          </Badge>
                        );
                      })}
                    </div>
                  )}
                </div>
              ),
            )}
          </div>
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
        <SavePortfolioButton className="w-full sm:w-auto" />
      </div>
    </div>
  );
}
