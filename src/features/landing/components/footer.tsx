import { Github, Linkedin } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <div className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Craftolio. All rights reserved.
        </div>
        <div className="flex items-center space-x-4">
          <Link
            href="https://github.com/mucahittasan"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github className="h-5 w-5 text-muted-foreground transition-colors hover:text-primary" />
            <span className="sr-only">GitHub</span>
          </Link>
          <Link
            href="https://linkedin.com/in/mucahittasan"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin className="h-5 w-5 text-muted-foreground transition-colors hover:text-primary" />
            <span className="sr-only">LinkedIn</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
