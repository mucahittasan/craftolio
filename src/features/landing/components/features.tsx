import { BentoGrid, BentoGridItem } from '@/components/ui/bento-grid';
import {
  Blocks,
  Gem,
  Palette,
  LayoutTemplate,
  Sparkles,
  Paintbrush,
} from 'lucide-react';
import React from 'react';

const CustomizationPreview = () => (
  <div className="flex h-full min-h-[6rem] w-full justify-between rounded-xl bg-gradient-to-br from-indigo-50 via-white to-blue-100 p-4 dark:from-indigo-900/50 dark:via-gray-950 dark:to-blue-900/50">
    <div className="flex flex-col justify-between">
      <div className="flex items-center gap-2">
        <div className="h-4 w-4 rounded-full bg-blue-500" />
        <div className="h-4 w-4 rounded-full bg-pink-500" />
        <div className="h-4 w-4 rounded-full bg-teal-500" />
      </div>
      <div className="font-sans text-4xl font-bold text-gray-400 dark:text-gray-600">
        Aa
      </div>
    </div>
    <Paintbrush className="h-12 w-12 text-gray-300 dark:text-gray-700" />
  </div>
);

const SectionsPreview = () => (
  <div className="flex h-full min-h-[6rem] w-full flex-col gap-2 rounded-xl bg-gradient-to-br from-amber-50 via-white to-yellow-100 p-4 dark:from-amber-900/50 dark:via-gray-950 dark:to-yellow-900/50">
    <div className="flex items-center gap-2 rounded-md bg-white/50 p-2 dark:bg-black/20">
      <Blocks className="h-4 w-4 text-gray-500" />
      <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">
        Experience
      </span>
    </div>
    <div className="flex items-center gap-2 rounded-md bg-white/50 p-2 dark:bg-black/20">
      <Gem className="h-4 w-4 text-gray-500" />
      <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">
        Projects
      </span>
    </div>
  </div>
);

const ResponsivePreview = () => (
  <div className="flex h-full min-h-[6rem] w-full items-center justify-center gap-4 rounded-xl bg-gradient-to-br from-rose-50 via-white to-pink-100 p-4 dark:from-rose-900/50 dark:via-gray-950 dark:to-pink-900/50">
    <div className="h-20 w-1/2 rounded-lg border-2 border-gray-300 bg-white/50 dark:border-gray-700 dark:bg-black/20" />
    <div className="h-24 w-1/4 rounded-md border-2 border-gray-300 bg-white/50 dark:border-gray-700 dark:bg-black/20" />
  </div>
);

const AIPoweredPreview = () => (
  <div className="flex h-full min-h-[6rem] w-full flex-col items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-fuchsia-50 via-white to-purple-100 p-4 dark:from-fuchsia-900/50 dark:via-gray-950 dark:to-purple-900/50">
    <p className="text-center text-sm text-gray-500 dark:text-gray-400">
      Describe your role...
    </p>
    <div className="relative w-full">
      <div className="h-8 w-full rounded-lg bg-white/50 dark:bg-black/20" />
      <Sparkles className="absolute right-1 top-1 h-6 w-6 text-purple-500" />
    </div>
  </div>
);

const features = [
  {
    icon: (
      <Palette className="h-6 w-6 text-neutral-500 dark:text-neutral-400" />
    ),
    title: 'Easy Customization',
    description: 'Choose themes, colors, and fonts that represent you.',
    header: <CustomizationPreview />,
    className: 'md:col-span-2',
  },
  {
    icon: <Blocks className="h-6 w-6 text-neutral-500 dark:text-neutral-400" />,
    title: 'Structured Sections',
    description: 'Easily add and manage your experience, projects, and skills.',
    header: <SectionsPreview />,
    className: 'md:col-span-1',
  },
  {
    icon: (
      <LayoutTemplate className="h-6 w-6 text-neutral-500 dark:text-neutral-400" />
    ),
    title: 'Responsive Templates',
    description:
      'Your portfolio looks great on all devices, from desktop to mobile.',
    header: <ResponsivePreview />,
    className: 'md:col-span-1',
  },
  {
    icon: <Gem className="h-6 w-6 text-neutral-500 dark:text-neutral-400" />,
    title: 'AI-Powered Assistance',
    description:
      'Leverage AI to get suggestions for your descriptions and showcase your skills.',
    header: <AIPoweredPreview />,
    className: 'md:col-span-2',
  },
];

export function Features() {
  return (
    <section id="features" className="container mx-auto px-4 py-20">
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
          Everything You Need to Shine
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground md:text-lg">
          Craftolio provides powerful features to make your portfolio stand out
          from the crowd.
        </p>
      </div>
      <BentoGrid className="md:auto-rows-[20rem]">
        {features.map((feature, i) => (
          <BentoGridItem
            key={i}
            title={feature.title}
            description={feature.description}
            header={feature.header}
            icon={feature.icon}
            className={feature.className}
          />
        ))}
      </BentoGrid>
    </section>
  );
}
