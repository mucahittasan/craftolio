'use client';

import { useForm } from 'react-hook-form';
import { Button } from '@/features/shared/components/ui/button';
import { Input } from '@/features/shared/components/ui/input';
import { Label } from '@/features/shared/components/ui/label';
import { usePortfolioStore } from '@/features/builder/store/portfolio.store';
import { SavePortfolioButton } from '@/features/builder/components/save-portfolio-button';
import {
  ArrowRight,
  Globe,
  Linkedin,
  Github,
  Mail,
  Phone,
  MapPin,
  Briefcase,
} from 'lucide-react';
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
    email: string;
    phone: string;
  }>({
    mode: 'onBlur',
    defaultValues: {
      title: profile.title,
      location: profile.location,
      bio: profile.bio,
      website: profile.website,
      linkedin: profile.linkedin,
      github: profile.github,
      email: profile.email || '',
      phone: profile.phone || '',
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
          {/* Basic Info */}
          <div>
            <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-foreground">
              <Briefcase className="h-5 w-5" />
              Basic Information
            </h3>
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
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="location"
                    {...form.register('location')}
                    placeholder="e.g., Istanbul, Turkey"
                    defaultValue={profile.location}
                    className="bg-background/50 pl-10 dark:bg-black/50"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="space-y-2">
            <Label htmlFor="bio">Short Bio</Label>
            <RichTextEditor
              value={form.watch('bio') || ''}
              onChange={(value: string) => {
                form.setValue('bio', value ?? '', {
                  shouldDirty: true,
                  shouldTouch: true,
                });
                setProfile({ bio: value ?? '' });
              }}
              placeholder="Tell us a little bit about yourself..."
              className="bg-background/50 dark:bg-black/50"
            />
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-foreground">
              <Mail className="h-5 w-5" />
              Contact Information
            </h3>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="email">Email (Public)</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    {...form.register('email')}
                    placeholder="contact@example.com"
                    defaultValue={profile.email || ''}
                    className="bg-background/50 pl-10 dark:bg-black/50"
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  This email will be visible on your public portfolio
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone (Optional)</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel"
                    {...form.register('phone')}
                    placeholder="+90 555 123 4567"
                    defaultValue={profile.phone || ''}
                    className="bg-background/50 pl-10 dark:bg-black/50"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-foreground">
              <Globe className="h-5 w-5" />
              Social Links
            </h3>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="website"
                    {...form.register('website')}
                    placeholder="https://your-website.com"
                    defaultValue={profile.website}
                    className="bg-background/50 pl-10 dark:bg-black/50"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="linkedin">LinkedIn</Label>
                <div className="relative">
                  <Linkedin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="linkedin"
                    {...form.register('linkedin')}
                    placeholder="https://linkedin.com/in/username"
                    defaultValue={profile.linkedin}
                    className="bg-background/50 pl-10 dark:bg-black/50"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="github">GitHub</Label>
                <div className="relative">
                  <Github className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="github"
                    {...form.register('github')}
                    placeholder="https://github.com/username"
                    defaultValue={profile.github}
                    className="bg-background/50 pl-10 dark:bg-black/50"
                  />
                </div>
              </div>
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
