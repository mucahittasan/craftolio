import React from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Sparkles,
  MapPin,
  Mail,
  Briefcase,
  GraduationCap,
  Wrench,
  Github,
  Linkedin,
  ExternalLink,
} from 'lucide-react';

export const Hero = () => {
  return (
    <section className="relative z-20 overflow-hidden pb-20 pt-32 md:pb-32 md:pt-40">
      {/* Dot pattern background */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(139, 92, 246, 0.15) 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />

      {/* Background gradient */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-violet-500/20 via-purple-500/10 to-transparent blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[400px] w-[400px] translate-x-1/2 translate-y-1/2 rounded-full bg-gradient-to-tl from-blue-500/20 via-cyan-500/10 to-transparent blur-3xl" />
      </div>

      <div className="container mx-auto px-4">
        {/* Badge */}
        <div className="mb-8 flex justify-center">
          <Link
            href="#pdf-showcase"
            className="group inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-4 py-1.5 text-sm font-medium text-violet-700 transition-all hover:border-violet-300 hover:bg-violet-100 dark:border-violet-800 dark:bg-violet-950/50 dark:text-violet-300 dark:hover:border-violet-700 dark:hover:bg-violet-900/50"
          >
            <Sparkles className="h-4 w-4" />
            <span>New: Export your portfolio as PDF</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Title */}
        <h1 className="mx-auto max-w-4xl text-center text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl lg:text-7xl">
          Build your professional{' '}
          <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
            portfolio
          </span>{' '}
          in minutes
        </h1>

        {/* Description */}
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg text-gray-600 dark:text-gray-400 md:text-xl">
          Create a stunning portfolio website without any coding. Showcase your
          work, skills, and experience with beautiful, professional templates.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/register"
            className="group relative inline-flex h-12 items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-8 text-base font-semibold text-white shadow-lg shadow-violet-500/25 transition-all hover:shadow-xl hover:shadow-violet-500/30"
          >
            <span className="relative z-10 flex items-center gap-2">
              Get Started Free
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-violet-700 to-indigo-700 opacity-0 transition-opacity group-hover:opacity-100" />
          </Link>
          <Link
            href="#features"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-gray-200 bg-white/80 px-8 text-base font-semibold text-gray-700 backdrop-blur-sm transition-all hover:border-gray-300 hover:bg-white dark:border-gray-700 dark:bg-gray-800/80 dark:text-gray-300 dark:hover:border-gray-600 dark:hover:bg-gray-800"
          >
            See Features
          </Link>
        </div>

        {/* Subtext */}
        <p className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
          No credit card required · Free forever for basic use
        </p>

        {/* Browser Mockup with Real Portfolio Preview */}
        <div className="relative mx-auto mt-16 max-w-5xl md:mt-20">
          {/* Glow effect */}
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-violet-500/20 via-purple-500/20 to-indigo-500/20 blur-2xl" />

          {/* Browser frame */}
          <div className="relative overflow-hidden rounded-2xl border border-gray-200/50 bg-white shadow-2xl dark:border-gray-700/50 dark:bg-gray-900">
            {/* Browser header */}
            <div className="flex items-center gap-2 border-b border-gray-200 bg-gray-100 px-4 py-3 dark:border-gray-800 dark:bg-gray-800">
              <div className="flex gap-1.5">
                <div className="h-3 w-3 rounded-full bg-red-400" />
                <div className="h-3 w-3 rounded-full bg-yellow-400" />
                <div className="h-3 w-3 rounded-full bg-green-400" />
              </div>
              <div className="ml-4 flex-1">
                <div className="mx-auto max-w-sm rounded-lg bg-white px-4 py-1.5 text-center text-sm text-gray-500 dark:bg-gray-700 dark:text-gray-400">
                  craftolio.com/portfolio/johndoe
                </div>
              </div>
            </div>

            {/* Real Portfolio Preview */}
            <div className="bg-gray-50 p-6 dark:bg-gray-950 md:p-8">
              {/* Header Section */}
              <div className="flex flex-col items-center gap-6 text-center md:flex-row md:items-start md:gap-8 md:text-left">
                {/* Avatar */}
                <div className="h-24 w-24 flex-shrink-0 rounded-2xl bg-gradient-to-br from-violet-400 to-purple-600 shadow-lg md:h-28 md:w-28" />

                {/* Info */}
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white md:text-3xl">
                    John Doe
                  </h2>
                  <p className="mt-1 text-lg text-gray-600 dark:text-gray-400">
                    Frontend Developer
                  </p>

                  <div className="mt-3 flex flex-wrap items-center justify-center gap-4 text-sm text-gray-500 dark:text-gray-400 md:justify-start">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="h-4 w-4" />
                      San Francisco, CA
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Mail className="h-4 w-4" />
                      john@example.com
                    </span>
                  </div>

                  {/* Social Links */}
                  <div className="mt-4 flex items-center justify-center gap-2 md:justify-start">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400">
                      <Linkedin className="h-4 w-4" />
                    </div>
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400">
                      <Github className="h-4 w-4" />
                    </div>
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400">
                      <ExternalLink className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Skills Section */}
              <div className="mt-8">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-100 dark:bg-violet-900/30">
                    <Wrench className="h-4 w-4 text-violet-600 dark:text-violet-400" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    Skills
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {[
                    'React',
                    'TypeScript',
                    'Next.js',
                    'Tailwind CSS',
                    'Node.js',
                    'GraphQL',
                  ].map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Experience & Education Grid */}
              <div className="mt-8 grid gap-4 md:grid-cols-2">
                {/* Experience Card */}
                <div className="rounded-xl border border-gray-100 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
                  <div className="mb-3 flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
                      <Briefcase className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      Experience
                    </h3>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 flex-shrink-0 rounded-lg bg-gray-100 dark:bg-gray-800" />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        Senior Frontend Dev
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Tech Company · 2022 - Present
                      </p>
                    </div>
                  </div>
                </div>

                {/* Education Card */}
                <div className="rounded-xl border border-gray-100 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
                  <div className="mb-3 flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30">
                      <GraduationCap className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      Education
                    </h3>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 flex-shrink-0 rounded-lg bg-gray-100 dark:bg-gray-800" />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        Computer Science
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Stanford University · 2018 - 2022
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating elements for visual interest */}
          <div className="absolute -left-32 top-12 hidden rounded-xl border border-gray-200 bg-white p-3 shadow-lg dark:border-gray-700 dark:bg-gray-800 lg:block">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900/30">
                <div className="flex h-full w-full items-center justify-center text-green-600 dark:text-green-400">
                  ✓
                </div>
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Live in seconds
              </span>
            </div>
          </div>

          <div className="absolute -right-6 bottom-1/4 hidden rounded-xl border border-gray-200 bg-white p-3 shadow-lg dark:border-gray-700 dark:bg-gray-800 lg:block">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-violet-100 dark:bg-violet-900/30">
                <div className="flex h-full w-full items-center justify-center text-violet-600 dark:text-violet-400">
                  ⚡
                </div>
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                No coding needed
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
