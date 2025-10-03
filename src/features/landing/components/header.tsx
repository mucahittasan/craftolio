import { Leaf, ArrowRightFromLine, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { auth } from '@/auth';
import { logout } from '@/features/auth/actions/logout';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Logo } from '@/components/logo';

export async function Header() {
  const session = await auth();

  return (
    <header className="fixed top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/">
          <Logo />
        </Link>
        <nav className="hidden items-center space-x-2 md:flex">
          <Button asChild variant="ghost">
            <Link href="/#features">Features</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link href="/#pricing">Pricing</Link>
          </Button>
          <ThemeToggle />
          {session?.user ? (
            <div className="flex items-center gap-2">
              <Button
                className="bg-foreground text-background hover:bg-foreground/90"
                asChild
              >
                <Link href="/dashboard">Dashboard</Link>
              </Button>
              <Button onClick={logout} variant="destructive">
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <Button
              className="bg-foreground text-background hover:bg-foreground/90"
              asChild
            >
              <Link href="/register">Get Started</Link>
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
}
