import React from 'react';
import { Blocks, Gem, Palette, LayoutTemplate } from 'lucide-react';

export const useFeatureIcon = () => {
  const getIcon = (
    iconName: string,
    className = 'h-6 w-6 text-neutral-500 dark:text-neutral-400',
  ) => {
    const icons = {
      Palette,
      Blocks,
      LayoutTemplate,
      Gem,
    };

    const IconComponent = icons[iconName as keyof typeof icons];

    if (!IconComponent) {
      return React.createElement(Palette, { className });
    }

    return React.createElement(IconComponent, { className });
  };

  return { getIcon };
};
