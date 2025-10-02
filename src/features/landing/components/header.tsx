import { Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
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
            className="bg-foreground text-background hover:bg-foreground/90"
            asChild
          >
            <Link href="/register">Get Started</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
