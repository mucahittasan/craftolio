'use client';

import Link from 'next/link';
import { ArrowRight, ExternalLink } from 'lucide-react';

export function Cta() {
  return (
    <section className="relative py-24">
      {/* Subtle gradient background */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950" />

      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl md:text-5xl">
            Ready to showcase your work?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-gray-600 dark:text-gray-400">
            Join thousands of professionals who have built their portfolio with
            Craftolio. It takes just a few minutes to get started.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/register"
              className="group relative inline-flex h-12 items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-8 font-semibold text-white shadow-lg shadow-violet-500/25 transition-all hover:shadow-xl hover:shadow-violet-500/30"
            >
              <span className="relative z-10 flex items-center gap-2">
                Create Your Portfolio
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-violet-700 to-indigo-700 opacity-0 transition-opacity group-hover:opacity-100" />
            </Link>
            <Link
              href="/portfolio/mucahittasan"
              className="group inline-flex h-12 items-center justify-center gap-2 rounded-full border border-gray-200 bg-white/80 px-8 font-semibold text-gray-700 backdrop-blur-sm transition-all hover:border-gray-300 hover:bg-white dark:border-gray-700 dark:bg-gray-800/80 dark:text-gray-300 dark:hover:border-gray-600 dark:hover:bg-gray-800"
            >
              View Example
              <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          <p className="mt-6 text-sm text-gray-500 dark:text-gray-500">
            Free to use · No credit card required
          </p>
        </div>
      </div>
    </section>
  );
}
