import { Leaf } from 'lucide-react';
import { Button } from '@/src/components/ui/button';
import Link from 'next/link';

export function Header() {
  return (
    <header className="border-border/40 bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="container mx-auto flex h-14 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Leaf className="h-6 w-6" />
          <span className="inline-block font-bold">Craftolio</span>
        </Link>
        <nav className="flex items-center space-x-6">
          <Link
            href="/#features"
            className="text-muted-foreground hover:text-primary text-sm font-medium transition-colors"
          >
            Features
          </Link>
          <Link
            href="/#pricing"
            className="text-muted-foreground hover:text-primary text-sm font-medium transition-colors"
          >
            Pricing
          </Link>
          <Button>Get Started</Button>
        </nav>
      </div>
    </header>
  );
}
