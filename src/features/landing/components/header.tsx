import { LogOut } from 'lucide-react';
import { Button } from '@/features/shared/components/ui/button';
import Link from 'next/link';
import { auth } from '@/auth';
import { logout } from '@/features/auth/actions/logout.action';
import { ThemeToggle } from '@/features/shared/components/ui/theme-toggle';
import { Logo } from '@/features/shared/components/logo';
import { MobileNav } from '@/features/shared/components/mobile/mobile-nav';
import { ViewPortfolioButton } from '@/features/shared/components/view-portfolio-button';

export async function Header() {
  const session = await auth();

  return (
    <header className="glass-panel fixed top-0 z-50 w-full">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/">
          <Logo size={40} />
        </Link>
        <nav className="hidden items-center space-x-1 md:flex">
          <Button asChild variant="ghost">
            <Link href="/#features">Features</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link href="/#how-it-works">How It Works</Link>
          </Button>
          <ThemeToggle />
          {session?.user ? (
            <div className="flex items-center gap-2">
              <ViewPortfolioButton
                userName={session.user.name}
                userUsername={session.user.username}
                userEmail={session.user.email}
              />
              <Button
                className="bg-foreground text-background hover:bg-foreground/90"
                asChild
              >
                <Link href="/dashboard">Dashboard</Link>
              </Button>
              <Button onClick={logout} variant="destructive" size="icon">
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
        <MobileNav session={session} />
      </div>
    </header>
  );
}
