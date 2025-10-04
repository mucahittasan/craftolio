'use client';

import { cn } from '@/lib/utils';
import { Logo } from '@/features/shared/components/logo';
import { ThemeToggle } from '@/features/shared/components/ui/theme-toggle';
import { useSidebar } from '@/features/shared/hooks/use-sidebar.hook';
import { ToggleButton } from '@/features/shared/components/sidebar/toggle-button';
import { MobileBackdrop } from '@/features/shared/components/sidebar/mobile-backdrop';
import { MotionDiv } from '@/features/shared/utils/motions/motions.util';
import { LogOut } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/features/shared/components/ui/button';
import { logout } from '@/features/auth/actions/logout.action';
import { AnimatePresence } from 'framer-motion';
import { navItems } from '@/features/builder/constants/sidebar.constant';
import { ViewPortfolioButton } from '@/features/shared/components/view-portfolio-button';
import { SidebarTooltip } from '@/features/shared/components/ui/sidebar-tooltip';

interface SidebarProps {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    username?: string | null;
  };
}

export function Sidebar({ user }: SidebarProps) {
  const { isExpanded, isMobileOpen, isBreakpoint, toggle, setMobileOpen } =
    useSidebar();
  const pathname = usePathname();

  const sidebarPosition = isBreakpoint
    ? `fixed left-0 top-0 h-screen z-50 ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}`
    : 'sticky top-0 h-screen';

  const getInitials = (name?: string | null) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <>
      <AnimatePresence>
        {isBreakpoint && isMobileOpen && (
          <MobileBackdrop
            isOpen={isMobileOpen}
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      <MotionDiv
        layout
        initial={false}
        animate={{
          width: isBreakpoint ? '256px' : isExpanded ? '256px' : '80px',
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className={cn(
          'relative z-50 flex flex-col border-r border-border/40 bg-background transition-transform duration-300 ease-in-out',
          sidebarPosition,
        )}
      >
        <div className="relative flex h-full flex-col p-4">
          <Link href="/" className="mb-8 flex items-center justify-center">
            <Logo withWordmark={isExpanded || isBreakpoint} size={48} />
          </Link>

          {!isBreakpoint && (
            <ToggleButton isExpanded={isExpanded} onClick={toggle} />
          )}

          <nav className="mb-auto flex flex-col space-y-2">
            {navItems.map((item) => {
              const isActive = item.exact
                ? pathname === item.href
                : pathname.startsWith(item.href);

              return (
                <SidebarTooltip
                  key={item.href}
                  content={item.title}
                  show={!isExpanded && !isBreakpoint}
                >
                  <Link
                    href={item.href}
                    onClick={() => isBreakpoint && setMobileOpen(false)}
                    className={cn(
                      'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all',
                      isActive
                        ? 'bg-primary text-primary-foreground shadow-sm'
                        : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
                      !isExpanded && !isBreakpoint && 'justify-center px-2',
                    )}
                  >
                    <item.icon className={cn('h-5 w-5 flex-shrink-0')} />
                    {(isExpanded || isBreakpoint) && (
                      <span className="truncate">{item.title}</span>
                    )}
                  </Link>
                </SidebarTooltip>
              );
            })}
          </nav>

          <div className="mt-auto space-y-3 border-t border-border/40 pt-4">
            <SidebarTooltip
              content="View Portfolio"
              show={!isExpanded && !isBreakpoint}
            >
              <ViewPortfolioButton
                userName={user.name}
                userUsername={user.username}
                userEmail={user.email}
                showLabel={isExpanded || isBreakpoint}
                showIcon={true}
                className="w-full"
              />
            </SidebarTooltip>

            <SidebarTooltip
              content="Toggle Theme"
              show={!isExpanded && !isBreakpoint}
            >
              <ThemeToggle
                showLabel={isExpanded || isBreakpoint}
                collapsed={!isExpanded && !isBreakpoint}
              />
            </SidebarTooltip>

            <SidebarTooltip
              content={user.name || 'User Profile'}
              show={!isExpanded && !isBreakpoint}
            >
              <div
                className={cn(
                  'flex items-center gap-3',
                  !isExpanded && !isBreakpoint && 'flex-col',
                )}
              >
                <div
                  className={cn(
                    'flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground',
                  )}
                >
                  {getInitials(user.name)}
                </div>
                {(isExpanded || isBreakpoint) && (
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{user.name}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                )}
              </div>
            </SidebarTooltip>

            <SidebarTooltip
              content="Log Out"
              show={!isExpanded && !isBreakpoint}
            >
              <Button
                onClick={logout}
                variant="destructive"
                size={isExpanded || isBreakpoint ? 'default' : 'icon'}
                className={cn(
                  'w-full',
                  !isExpanded && !isBreakpoint && 'h-10 px-0',
                )}
              >
                <LogOut className="h-4 w-4" />
                {(isExpanded || isBreakpoint) && (
                  <span className="ml-2">Log Out</span>
                )}
              </Button>
            </SidebarTooltip>
          </div>
        </div>
      </MotionDiv>
    </>
  );
}
