'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { usePortfolioStore } from '@/features/builder/store/portfolio-store';
import { SavePortfolioButton } from '@/features/builder/components/save-portfolio-button';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function ProfileForm() {
  const router = useRouter();
  const { profile, setProfile } = usePortfolioStore();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setProfile({ [name]: value });
  };

  const handleNext = () => {
    router.push('/dashboard/experience');
  };

  return (
    // DEĞİŞİKLİK: Kartı "cam" efektli hale getirdik
    <div className="rounded-2xl border border-black/10 bg-white/10 p-8 shadow-2xl backdrop-blur-lg dark:border-white/10 dark:bg-black/10">
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="title">Your Title</Label>
            <Input
              id="title"
              name="title"
              placeholder="e.g., Senior Frontend Engineer"
              value={profile.title}
              onChange={handleChange}
              className="bg-background/50 dark:bg-black/50"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              name="location"
              placeholder="e.g., Istanbul, Turkey"
              value={profile.location}
              onChange={handleChange}
              className="bg-background/50 dark:bg-black/50"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="bio">Short Bio</Label>
          <Textarea
            id="bio"
            name="bio"
            placeholder="Tell us a little bit about yourself..."
            value={profile.bio}
            onChange={handleChange}
            className="min-h-[120px] bg-background/50 dark:bg-black/50"
          />
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="website">Website</Label>
            <Input
              id="website"
              name="website"
              placeholder="https://your-website.com"
              value={profile.website}
              onChange={handleChange}
              className="bg-background/50 dark:bg-black/50"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="github">GitHub</Label>
            <Input
              id="github"
              name="github"
              placeholder="https://github.com/username"
              value={profile.github}
              onChange={handleChange}
              className="bg-background/50 dark:bg-black/50"
            />
          </div>
        </div>
        <div className="flex justify-between pt-4">
          <SavePortfolioButton variant="outline" />
          <Button onClick={handleNext} className="group">
            Next Step: Experience
            <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </div>
  );
}
