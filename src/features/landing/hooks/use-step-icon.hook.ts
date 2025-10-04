import React from 'react';
import { UserPlus, FileText, Globe } from 'lucide-react';

export const useStepIcon = () => {
  const getIcon = (iconName: string, className = 'h-8 w-8 text-primary') => {
    const icons = {
      UserPlus,
      FileText,
      Globe,
    };

    const IconComponent = icons[iconName as keyof typeof icons];

    if (!IconComponent) {
      return React.createElement(UserPlus, { className });
    }

    return React.createElement(IconComponent, { className });
  };

  return { getIcon };
};
