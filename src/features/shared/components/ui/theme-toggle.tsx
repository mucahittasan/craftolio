'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/features/shared/components/ui/button';
import { cn } from '@/lib/utils';

interface ThemeToggleProps {
  showLabel?: boolean;
  collapsed?: boolean;
  className?: string;
}

export function ThemeToggle({
  showLabel = false,
  collapsed = false,
  className,
}: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size={collapsed ? 'icon' : 'default'}
        className={cn(
          'relative h-10 overflow-hidden rounded-lg border border-border/40 bg-muted/50',
          collapsed ? 'w-[47px]' : 'w-full justify-start',
          className,
        )}
      >
        <Sun className="h-[1.1rem] w-[1.1rem] flex-shrink-0" />
        {showLabel && !collapsed && <span className="ml-3">Theme</span>}
        <span className="sr-only">Toggle theme</span>
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size={collapsed ? 'icon' : 'default'}
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className={cn(
        'group relative h-10 overflow-hidden rounded-lg border border-border/40 bg-muted/50 transition-all duration-300 hover:border-[#9c40ff]/30 hover:bg-gradient-to-tr hover:from-[#9c40ff]/10 hover:to-[#ffaa40]/10',
        collapsed ? 'w-[47px]' : 'w-full justify-start',
        className,
      )}
    >
      <div className="relative flex items-center gap-3">
        <Sun className="h-[1.1rem] w-[1.1rem] flex-shrink-0 rotate-0 scale-100 text-[#ffaa40] transition-all duration-500 group-hover:rotate-180 group-hover:scale-110 dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute left-0 h-[1.1rem] w-[1.1rem] flex-shrink-0 rotate-90 scale-0 text-[#9c40ff] transition-all duration-500 group-hover:-rotate-180 group-hover:scale-110 dark:rotate-0 dark:scale-100" />
        {showLabel && !collapsed && (
          <span className="text-sm font-medium">
            {theme === 'dark' ? 'Dark' : 'Light'}
          </span>
        )}
      </div>
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
