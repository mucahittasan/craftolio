'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Download,
  FileText,
  Printer,
  Share2,
  MapPin,
  Mail,
  Briefcase,
  GraduationCap,
} from 'lucide-react';
import { SectionHeader } from './shared';
import {
  slideInLeft,
  slideInRight,
  staggerContainer,
  staggerItem,
  floatingElement,
} from '../motion';

export function PdfShowcase() {
  return (
    <section id="pdf-showcase" className="relative py-24">
      <div className="container mx-auto px-4">
        <SectionHeader
          badge="New Feature"
          badgeColor="amber"
          title="Export your portfolio as PDF"
          description="Download a beautifully formatted PDF version of your portfolio. Perfect for job applications, email attachments, or printing."
        />

        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={slideInLeft}
            className="relative"
          >
            <div className="absolute -inset-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-red-500/10 blur-2xl" />

            <div className="relative">
              <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl dark:border-gray-800 dark:bg-gray-900">
                <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-800 dark:bg-gray-800">
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-red-500" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      john-doe-portfolio.pdf
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="rounded-lg p-2 transition-colors hover:bg-gray-200 dark:hover:bg-gray-700">
                      <Printer className="h-4 w-4 text-gray-500" />
                    </button>
                    <button className="rounded-lg p-2 transition-colors hover:bg-gray-200 dark:hover:bg-gray-700">
                      <Download className="h-4 w-4 text-gray-500" />
                    </button>
                  </div>
                </div>

                <div className="bg-gray-100 p-6 dark:bg-gray-950">
                  <div className="mx-auto aspect-[8.5/11] max-w-sm overflow-hidden rounded-lg bg-white shadow-lg dark:bg-gray-900">
                    <div className="p-5">
                      <div className="flex items-start gap-3">
                        <div className="h-12 w-12 flex-shrink-0 rounded-lg bg-gradient-to-br from-[var(--brand-primary)] to-[var(--brand-accent)]" />
                        <div className="min-w-0 flex-1">
                          <h4 className="text-base font-bold text-gray-900 dark:text-white">
                            John Doe
                          </h4>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            Frontend Developer
                          </p>
                          <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[10px] text-gray-500 dark:text-gray-500">
                            <span className="flex items-center gap-0.5">
                              <MapPin className="h-2.5 w-2.5" />
                              San Francisco
                            </span>
                            <span className="flex items-center gap-0.5">
                              <Mail className="h-2.5 w-2.5" />
                              john@example.com
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-3">
                        <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                          Skills
                        </p>
                        <div className="mt-1.5 flex flex-wrap gap-1">
                          {['React', 'TypeScript', 'Next.js', 'Tailwind'].map(
                            (skill) => (
                              <span
                                key={skill}
                                className="rounded-full border border-gray-200 bg-gray-50 px-2 py-0.5 text-[9px] font-medium text-gray-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400"
                              >
                                {skill}
                              </span>
                            ),
                          )}
                        </div>
                      </div>

                      <div className="mt-3">
                        <div className="flex items-center gap-1">
                          <Briefcase className="h-2.5 w-2.5 text-emerald-600 dark:text-emerald-400" />
                          <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                            Experience
                          </p>
                        </div>
                        <div className="mt-1.5 space-y-1.5">
                          <div className="rounded-md border border-gray-100 p-2 dark:border-gray-800">
                            <p className="text-[10px] font-semibold text-gray-900 dark:text-white">
                              Senior Frontend Developer
                            </p>
                            <p className="text-[9px] text-gray-500 dark:text-gray-400">
                              Tech Company · 2022 - Present
                            </p>
                          </div>
                          <div className="rounded-md border border-gray-100 p-2 dark:border-gray-800">
                            <p className="text-[10px] font-semibold text-gray-900 dark:text-white">
                              Frontend Developer
                            </p>
                            <p className="text-[9px] text-gray-500 dark:text-gray-400">
                              Startup Inc · 2020 - 2022
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="mt-3">
                        <div className="flex items-center gap-1">
                          <GraduationCap className="h-2.5 w-2.5 text-blue-600 dark:text-blue-400" />
                          <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                            Education
                          </p>
                        </div>
                        <div className="mt-1.5">
                          <div className="rounded-md border border-gray-100 p-2 dark:border-gray-800">
                            <p className="text-[10px] font-semibold text-gray-900 dark:text-white">
                              B.S. Computer Science
                            </p>
                            <p className="text-[9px] text-gray-500 dark:text-gray-400">
                              Stanford University · 2016 - 2020
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={floatingElement}
                className="absolute -bottom-4 -right-4 rounded-xl border border-gray-200 bg-white p-3 shadow-lg dark:border-gray-700 dark:bg-gray-800"
              >
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/30">
                    <Download className="h-4 w-4 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-900 dark:text-white">
                      Ready to download
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      PDF generated
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          <div>
            <h3 className="mb-6 text-xl font-semibold text-gray-900 dark:text-white">
              Why you&apos;ll love it
            </h3>
            <div className="space-y-4">
              {[
                {
                  icon: FileText,
                  title: 'Professional format',
                  desc: 'Clean, ATS-friendly layout that recruiters love',
                },
                {
                  icon: Printer,
                  title: 'Print ready',
                  desc: 'Optimized for A4 paper size with perfect margins',
                },
                {
                  icon: Share2,
                  title: 'Easy sharing',
                  desc: 'Send via email or upload to job applications',
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 rounded-xl border border-gray-100 bg-white p-4 dark:border-gray-800 dark:bg-gray-900"
                >
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-amber-100 dark:bg-amber-900/30">
                    <item.icon className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {item.title}
                    </p>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
