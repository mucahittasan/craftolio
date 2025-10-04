import React from 'react';
import { Blocks, Gem, Paintbrush, Sparkles } from 'lucide-react';

export const CustomizationPreview = () => (
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

export const SectionsPreview = () => (
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

export const ResponsivePreview = () => (
  <div className="flex h-full min-h-[6rem] w-full items-center justify-center gap-4 rounded-xl bg-gradient-to-br from-rose-50 via-white to-pink-100 p-4 dark:from-rose-900/50 dark:via-gray-950 dark:to-pink-900/50">
    <div className="h-20 w-1/2 rounded-lg border-2 border-gray-300 bg-white/50 dark:border-gray-700 dark:bg-black/20" />
    <div className="h-24 w-1/4 rounded-md border-2 border-gray-300 bg-white/50 dark:border-gray-700 dark:bg-black/20" />
  </div>
);

export const AIPoweredPreview = () => (
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
