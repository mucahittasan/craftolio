'use client';

import {
  Leaf,
  User,
  Briefcase,
  GraduationCap,
  Lightbulb,
  Star,
  LogOut,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { logout } from '@/features/auth/actions/logout';

const sidebarNavItems = [
  { title: 'Profile', href: '/dashboard', icon: User },
  { title: 'Experience', href: '/dashboard/experience', icon: Briefcase },
  { title: 'Education', href: '/dashboard/education', icon: GraduationCap },
  { title: 'Projects', href: '/dashboard/projects', icon: Lightbulb },
  { title: 'Skills', href: '/dashboard/skills', icon: Star },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex w-64 flex-col border-r bg-background">
      <div className="border-b p-4">
        <Link href="/" className="flex items-center space-x-2">
          <Leaf className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold">Craftolio</span>
        </Link>
      </div>
      <nav className="flex-1 space-y-2 p-4">
        {sidebarNavItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex items-center gap-3 rounded-lg px-3 py-2 font-medium text-muted-foreground transition-all hover:text-primary',
              pathname === item.href && 'bg-muted text-primary',
            )}
          >
            <item.icon className="h-5 w-5" />
            {item.title}
          </Link>
        ))}
      </nav>
      <div className="border-t p-4">
        <Button
          className="border border-red-500 hover:bg-white hover:text-red-500"
          onClick={logout}
          variant="destructive"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    </aside>
  );
}
