'use client';

import { useForm } from 'react-hook-form';
import { Button } from '@/features/shared/components/ui/button';
import { Input } from '@/features/shared/components/ui/input';
import { Label } from '@/features/shared/components/ui/label';
import { usePortfolioStore } from '@/features/builder/store/portfolio.store';
import { SavePortfolioButton } from '@/features/builder/components/save-portfolio-button';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { RichTextEditor } from '@/features/shared/components/ui/rich-text-editor';

export function ProfileForm() {
  const router = useRouter();
  const { profile, setProfile } = usePortfolioStore();

  const form = useForm<{
    title: string;
    location: string;
    bio: string;
    website: string;
    linkedin: string;
    github: string;
  }>({
    mode: 'onBlur',
    defaultValues: {
      title: profile.title,
      location: profile.location,
      bio: profile.bio,
      website: profile.website,
      linkedin: profile.linkedin,
      github: profile.github,
    },
  });

  // Keep store in sync when form fields change
  form.watch((values) => setProfile(values));

  const handleNext = () => {
    router.push('/dashboard/experience');
  };

  return (
    <div>
      <div className="rounded-2xl border border-black/10 bg-white/10 p-8 shadow-2xl backdrop-blur-lg dark:border-white/10 dark:bg-black/10">
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="title">Your Title</Label>
              <Input
                id="title"
                {...form.register('title')}
                placeholder="e.g., Senior Frontend Engineer"
                defaultValue={profile.title}
                className="bg-background/50 dark:bg-black/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                {...form.register('location')}
                placeholder="e.g., Istanbul, Turkey"
                defaultValue={profile.location}
                className="bg-background/50 dark:bg-black/50"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="bio">Short Bio</Label>
            <RichTextEditor
              value={form.watch('bio') || ''}
              onChange={(value: string) => {
                // Sync RHF state
                form.setValue('bio', value ?? '', {
                  shouldDirty: true,
                  shouldTouch: true,
                });
                // Immediately sync store for savePortfolio
                setProfile({ bio: value ?? '' });
              }}
              placeholder="Tell us a little bit about yourself..."
              className="bg-background/50 dark:bg-black/50"
            />
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                {...form.register('website')}
                placeholder="https://your-website.com"
                defaultValue={profile.website}
                className="bg-background/50 dark:bg-black/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="linkedin">LinkedIn</Label>
              <Input
                id="linkedin"
                {...form.register('linkedin')}
                placeholder="https://linkedin.com/in/username"
                defaultValue={profile.linkedin}
                className="bg-background/50 dark:bg-black/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="github">GitHub</Label>
              <Input
                id="github"
                {...form.register('github')}
                placeholder="https://github.com/username"
                defaultValue={profile.github}
                className="bg-background/50 dark:bg-black/50"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3 pt-8 sm:flex-row sm:justify-between">
        <SavePortfolioButton variant="outline" className="w-full sm:w-auto" />
        <Button onClick={handleNext} className="group w-full sm:w-auto">
          Next Step: Experience
          <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
        </Button>
      </div>
    </div>
  );
}
