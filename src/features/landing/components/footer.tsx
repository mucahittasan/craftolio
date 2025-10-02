import { Github, Linkedin, Twitter } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <div className="text-muted-foreground text-sm">
          © {new Date().getFullYear()} Craftolio. All rights reserved.
        </div>
        <div className="flex items-center space-x-4">
          <Link
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Twitter className="text-muted-foreground hover:text-primary h-5 w-5 transition-colors" />
            <span className="sr-only">Twitter</span>
          </Link>
          <Link
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github className="text-muted-foreground hover:text-primary h-5 w-5 transition-colors" />
            <span className="sr-only">GitHub</span>
          </Link>
          <Link
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin className="text-muted-foreground hover:text-primary h-5 w-5 transition-colors" />
            <span className="sr-only">LinkedIn</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
