'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ClientPortal } from '@/features/shared/components/client-portal';
import { Button } from '@/features/shared/components/ui/button';
import Link from 'next/link';
import { LogOut } from 'lucide-react';
import { ThemeToggle } from '@/features/shared/components/ui/theme-toggle';
import { Session } from 'next-auth';
import { logout } from '@/features/auth/actions/logout.action';
import { ViewPortfolioButton } from '@/features/shared/components/view-portfolio-button';

interface MobileMenuProps {
  isOpen: boolean;
  session: Session | null;
}

export function MobileMenu({ isOpen, session }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <ClientPortal>
          <div className="fixed inset-x-0 top-16 z-[60]">
            <div className="glass-panel px-4 py-6">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                <nav className="flex flex-col space-y-3">
                  <Button
                    asChild
                    variant="ghost"
                    className="w-full justify-start dark:hover:bg-white/20"
                    size="lg"
                  >
                    <Link href="/#features">Features</Link>
                  </Button>
                  <Button
                    asChild
                    variant="ghost"
                    className="w-full justify-start dark:hover:bg-white/20"
                    size="lg"
                  >
                    <Link href="/#how-it-works">How It Works</Link>
                  </Button>

                  <div className="my-2 h-px bg-border/50" />
                  <ThemeToggle showLabel collapsed={false} />
                  <div className="my-2 h-px bg-border/50" />

                  {session?.user ? (
                    <div className="flex flex-col gap-3">
                      <ViewPortfolioButton
                        userName={session.user.name}
                        userUsername={session.user.username}
                        userEmail={session.user.email}
                        size="lg"
                        className="w-full"
                      />
                      <Button
                        className="w-full bg-foreground text-background hover:bg-foreground/90"
                        size="lg"
                        asChild
                      >
                        <Link href="/dashboard">Dashboard</Link>
                      </Button>
                      <Button
                        onClick={logout}
                        variant="destructive"
                        size="lg"
                        className="w-full"
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Log Out
                      </Button>
                    </div>
                  ) : (
                    <Button
                      className="w-full bg-foreground text-background hover:bg-foreground/90"
                      size="lg"
                      asChild
                    >
                      <Link href="/register">Get Started</Link>
                    </Button>
                  )}
                </nav>
              </motion.div>
            </div>
          </div>
        </ClientPortal>
      )}
    </AnimatePresence>
  );
}
