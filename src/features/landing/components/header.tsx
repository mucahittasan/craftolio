import { Leaf } from 'lucide-react';
import { Button } from '@/src/components/ui/button';
import Link from 'next/link';

export function Header() {
  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <Leaf className="h-6 w-6" />
          <span className="inline-block text-2xl font-bold">Craftolio</span>
        </Link>
        <nav className="hidden items-center space-x-2 md:flex">
          <Button asChild variant="ghost">
            <Link href="/#features">Features</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link href="/#pricing">Pricing</Link>
          </Button>

          <Button
            className="bg-foreground hover:bg-foreground/90 text-background"
            asChild
          >
            <Link href="/register">Get Started</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
