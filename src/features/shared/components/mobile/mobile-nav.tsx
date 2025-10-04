'use client';

import { useState } from 'react';
import { HamburgerMenu } from './hamburger-menu';
import { MobileMenu } from './mobile-menu';
import type { Session } from 'next-auth';

interface MobileNavProps {
  session: Session | null;
}

export function MobileNav({ session }: MobileNavProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <div className="md:hidden">
        <HamburgerMenu
          isOpen={isMenuOpen}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        />
      </div>
      <MobileMenu isOpen={isMenuOpen} session={session} />
    </>
  );
}
