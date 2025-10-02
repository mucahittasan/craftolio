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
import type { User as AuthUser } from 'next-auth'; // NextAuth'un User tipini import ediyoruz

const sidebarNavItems = [
  { title: 'Profile', href: '/dashboard', icon: User },
  { title: 'Experience', href: '/dashboard/experience', icon: Briefcase },
  { title: 'Education', href: '/dashboard/education', icon: GraduationCap },
  { title: 'Projects', href: '/dashboard/projects', icon: Lightbulb },
  { title: 'Skills', href: '/dashboard/skills', icon: Star },
];

// Bileşenin props'larına kullanıcı bilgisini ekliyoruz
export function Sidebar({ user }: { user: AuthUser }) {
  const pathname = usePathname();

  return (
    <aside className="flex w-64 flex-col border-r bg-background">
      <div className="flex h-20 items-center border-b p-4">
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
              'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-muted hover:text-primary',
              pathname === item.href && 'bg-muted font-semibold text-primary',
            )}
          >
            <item.icon className="h-5 w-5" />
            {item.title}
          </Link>
        ))}
      </nav>
      <div className="border-t p-4">
        {/* DEĞİŞİKLİK: Kullanıcı bilgileri ve Logout butonu */}
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted font-bold text-primary">
            {user.name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="text-sm font-semibold">{user.name}</p>
            <p className="text-xs text-muted-foreground">{user.email}</p>
          </div>
        </div>
        <form action={logout}>
          <Button
            type="submit"
            variant="ghost"
            className="w-full justify-start gap-3 text-muted-foreground hover:text-destructive"
          >
            <LogOut className="h-5 w-5" />
            Log Out
          </Button>
        </form>
      </div>
    </aside>
  );
}
