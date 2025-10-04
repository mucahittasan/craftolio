import {
  Briefcase,
  FolderKanban,
  GraduationCap,
  Sparkles,
  User2,
} from 'lucide-react';

export const navItems = [
  {
    title: 'Profile',
    href: '/dashboard',
    icon: User2,
    exact: true,
  },
  {
    title: 'Experience',
    href: '/dashboard/experience',
    icon: Briefcase,
  },
  {
    title: 'Education',
    href: '/dashboard/education',
    icon: GraduationCap,
  },
  {
    title: 'Projects',
    href: '/dashboard/projects',
    icon: FolderKanban,
  },
  {
    title: 'Skills',
    href: '/dashboard/skills',
    icon: Sparkles,
  },
];
