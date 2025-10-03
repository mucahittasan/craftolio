'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Avoid hydration mismatch
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="h-9 w-9 rounded-lg border border-border/40 bg-muted/50"
      >
        <Sun className="h-[1.1rem] w-[1.1rem]" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="group relative h-9 w-9 overflow-hidden rounded-lg border border-border/40 bg-muted/50 transition-all duration-300 hover:border-[#9c40ff]/30 hover:bg-gradient-to-tr hover:from-[#9c40ff]/10 hover:to-[#ffaa40]/10"
    >
      <Sun className="absolute h-[1.1rem] w-[1.1rem] rotate-0 scale-100 text-[#ffaa40] transition-all duration-500 group-hover:rotate-180 group-hover:scale-110 dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.1rem] w-[1.1rem] rotate-90 scale-0 text-[#9c40ff] transition-all duration-500 group-hover:-rotate-180 group-hover:scale-110 dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
